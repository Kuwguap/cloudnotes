import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowSize, useLocalStorage } from 'react-use';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  CloudIcon,
  StarIcon as StarIconSolid,
  SunIcon,
  MoonIcon,
  ChartBarIcon,
  LockClosedIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import { Note, Folder, Level } from '../types';
import FolderTree from '../components/FolderTree';
import FolderModal from '../components/FolderModal';
import {
  getNotes,
  createNote,
  updateNote,
  connectSocket,
  disconnectSocket,
  joinNoteSession,
  shareNote,
  deleteNote as deleteNoteApi,
  getFolders,
  createFolder,
  deleteFolder as deleteFolderApi
} from '../services/api';
import { lockNote, unlockNote } from '../services/api';
import debounce from 'lodash/debounce';
import LockModal from '../components/LockModal';
import ShareModal from '../components/ShareModal';
import AdminDashboard from '../components/AdminDashboard';
import CloudView from './CloudView';
import { Image as TiptapImage } from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import CodeBlock from '@tiptap/extension-code-block';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Youtube from '@tiptap/extension-youtube';
import { FontFamily } from '@tiptap/extension-font-family';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import { Socket } from 'socket.io-client';

const stripHtmlTags = (html: string) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

// Add ErrorBoundary component
class EditorErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('Editor error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-red-500">
          Something went wrong with the editor. Please refresh the page.
        </div>
      );
    }

    return this.props.children;
  }
}

// Add image compression function
const compressImage = async (file: File, maxWidth = 800, maxHeight = 800, quality = 0.5): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions while maintaining aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        // Further reduce dimensions if the image is still large
        const MAX_PIXELS = 400000; // e.g., 632x632
        if (width * height > MAX_PIXELS) {
          const scale = Math.sqrt(MAX_PIXELS / (width * height));
          width = Math.round(width * scale);
          height = Math.round(height * scale);
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        // Use better image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        // Draw image with white background to handle transparency
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to JPEG with quality setting
        let compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        
        // If still too large, reduce quality until it's under 100KB
        let currentQuality = quality;
        while (compressedDataUrl.length > 100 * 1024 && currentQuality > 0.1) {
          currentQuality *= 0.8;
          compressedDataUrl = canvas.toDataURL('image/jpeg', currentQuality);
        }

        resolve(compressedDataUrl);
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
  });
};

const Notes: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory] = useState<string | null>(null);
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');
  const { } = useWindowSize();
  const navigate = useNavigate();
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [folderModalOpen, setFolderModalOpen] = useState(false);
  const [editingFolder, setEditingFolder] = useState<Folder | null>(null);
  const [folderDeleteConfirmation, setFolderDeleteConfirmation] = useState<{
    isOpen: boolean;
    folderId: string | null;
    folderName: string;
  }>({
    isOpen: false,
    folderId: null,
    folderName: '',
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    noteId: string | null;
    noteTitle: string;
  }>({
    isOpen: false,
    noteId: null,
    noteTitle: '',
  });
  const [lockModal, setLockModal] = useState<{
    isOpen: boolean;
    mode: 'lock' | 'unlock';
    type: 'note' | 'folder';
    id: string | null;
    title: string;
  }>({
    isOpen: false,
    mode: 'lock',
    type: 'note',
    id: null,
    title: '',
  });
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [shareModal, setShareModal] = useState<{
    isOpen: boolean;
    noteId: string | null;
    noteTitle: string;
  }>({
    isOpen: false,
    noteId: null,
    noteTitle: '',
  });
  const [viewFilter, setViewFilter] = useState<'all' | 'owned' | 'shared'>('all');
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [showCloudView, setShowCloudView] = useState(false);
  const editorRef = useRef<ReturnType<typeof useEditor> | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  // Initialize socket connection
  useEffect(() => {
    const initSocket = async () => {
      try {
        const newSocket = await connectSocket();
        setSocket(newSocket);

        return () => {
          if (newSocket) {
            newSocket.disconnect();
          }
        };
      } catch (err) {
        console.error('Failed to connect socket:', err);
        setError('Failed to establish real-time connection');
      }
    };

    initSocket();
  }, []);

  // Join note session when note is selected
  useEffect(() => {
    if (socket && selectedNote) {
      socket.emit('join_note', selectedNote.id);
    }
  }, [socket, selectedNote]);

  // Update note content handler
  const handleNoteUpdate = useCallback(
    debounce(async (noteId: string, data: Partial<Note>) => {
      const editor = editorRef.current;
      if (!editor || editor.isDestroyed) return;

      try {
        const noteToUpdate = notes.find(note => note.id === noteId);
        if (!noteToUpdate) return;

        if (noteToUpdate.isLocked) {
          console.log('Preventing update of locked note:', noteId);
          setError('Cannot edit a locked note');
          editor.commands.setContent(noteToUpdate.content || '');
          return;
        }

        const response = await updateNote(noteId, data);
        console.log('Note updated successfully:', response.data.id);

        // Update notes list with updated note
        setNotes(prevNotes => 
          prevNotes.map(note => 
            note.id === noteId ? response.data : note
          )
        );

        // Update selected note if it's the one being edited
        if (selectedNote?.id === noteId) {
          setSelectedNote(response.data);
        }

        // Only send real-time updates if content doesn't contain images
        if (socket && !data.content?.includes('data:image')) {
          socket.emit('note_change', { 
            noteId, 
            data: {
              ...data,
              // Strip out any image data from real-time updates
              content: data.content?.replace(/<img[^>]+>/g, '[image]')
            }
          });
        }
      } catch (err: any) {
        console.error('Error updating note:', err);
        setError(err.response?.data?.error || 'Failed to update note');
      }
    }, 500),
    [notes, selectedNote, socket]
  );

  // Handle image upload
  const handleImageUpload = useCallback(async (file: File) => {
    const editor = editorRef.current;
    if (!selectedNote || !editor || editor.isDestroyed || !isEditorReady) return;

    try {
      if (!file.type.startsWith('image/')) {
        throw new Error('Please select an image file');
      }

      setLoading(true);

      // Compress image
      const compressedImage = await compressImage(file);
      
      // Check final size
      if (compressedImage.length > 100 * 1024) {
        throw new Error('Image is too large. Please use a smaller image.');
      }

      // Insert image using insertContent
      editor.commands.insertContent({
        type: 'image',
        attrs: {
          src: compressedImage,
          alt: file.name.split('.')[0],
        }
      });

      // Wait for next tick to ensure content is updated
      await new Promise(resolve => setTimeout(resolve, 0));

      // Save the updated content
      const updatedContent = editor.getHTML();
      
      // Save directly without real-time updates for image content
      await updateNote(selectedNote.id, {
        content: updatedContent,
        updatedAt: new Date()
      });

      // Update local state
      setNotes(prevNotes => 
        prevNotes.map(note => 
          note.id === selectedNote.id 
            ? { ...note, content: updatedContent, updatedAt: new Date() }
            : note
        )
      );
    } catch (error) {
      console.error('Error uploading image:', error);
      setError(typeof error === 'string' ? error : 'Failed to upload image');
    } finally {
      setLoading(false);
    }
  }, [selectedNote, isEditorReady, notes]);

  // Update editor configuration
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
        dropcursor: false,
      }),
      Placeholder.configure({
        placeholder: () => {
          if (selectedNote?.isLocked) {
            return 'This note is locked';
          }
          return 'Start writing...';
        },
      }),
      TiptapImage.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto my-4',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Highlight.configure({
        multicolor: true,
      }),
      Typography,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Youtube.configure({
        width: 640,
        height: 480,
        HTMLAttributes: {
          class: 'rounded-lg',
        },
      }),
      FontFamily.configure({
        types: ['textStyle'],
      }),
      TextStyle,
      Color,
      Subscript,
      Superscript,
      CodeBlock.configure({
        HTMLAttributes: {
          class: 'rounded-lg bg-green-50 dark:bg-green-900/20 p-4 font-mono text-sm my-4 text-green-800 dark:text-green-200',
        },
      }),
    ],
    editable: !selectedNote?.isLocked,
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert max-w-none focus:outline-none min-h-[200px]',
      },
      handleDrop: (_, event) => {
        if (event.dataTransfer?.files.length) {
          const file = event.dataTransfer.files[0];
          if (file.type.startsWith('image/')) {
            event.preventDefault();
            handleImageUpload(file);
            return true;
          }
        }
        return false;
      },
      handlePaste: (_, event) => {
        const items = Array.from(event.clipboardData?.items || []);
        const imageItem = items.find(item => item.type.startsWith('image/'));
        
        if (imageItem) {
          event.preventDefault();
          const file = imageItem.getAsFile();
          if (file) {
            handleImageUpload(file);
            return true;
          }
        }
        return false;
      },
    },
    onCreate: ({ editor }) => {
      editorRef.current = editor;
      setIsEditorReady(true);
    },
    onDestroy: () => {
      editorRef.current = null;
      setIsEditorReady(false);
    },
    content: selectedNote?.content || '',
  });

  // Update content when note changes
  useEffect(() => {
    if (editor && selectedNote && !editor.isDestroyed) {
      editor.commands.setContent(selectedNote.content || '');
    }
  }, [selectedNote, editor]);

  // Add editor content update handler
  const handleEditorUpdate = useCallback(({ editor }: { editor: any }) => {
    if (!selectedNote || !isEditorReady || loading || !editor || editor.isDestroyed) return;
    
    if (selectedNote.isLocked) {
      editor.commands.setContent(selectedNote.content || '');
      return;
    }

    const content = editor.getHTML();
    handleNoteUpdate(selectedNote.id, {
      content,
      updatedAt: new Date(),
    });
  }, [selectedNote, isEditorReady, loading, handleNoteUpdate]);

  // Update editor event handlers
  useEffect(() => {
    if (editor && !editor.isDestroyed) {
      editor.on('update', handleEditorUpdate);
      return () => {
        editor.off('update', handleEditorUpdate);
      };
    }
  }, [editor, handleEditorUpdate]);

  // Add editor cleanup effect
  useEffect(() => {
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor]);

  // Update sanitizeLockedNote helper
  const sanitizeLockedNote = (note: Note): Note => {
    if (note.isLocked) {
      return {
        ...note,
        content: '',
        description: '',
        tags: [],
        category: '',
        color: '',
      };
    }
    return note;
  };

  // Update handleNoteSelect to handle locked notes
  const handleNoteSelect = useCallback(async (note: Note) => {
    if (loading || !isEditorReady) return;

    try {
      // Clear editor content before any state changes
      if (editor && !editor.isDestroyed) {
        editor.commands.clearContent();
      }

      // If note is locked, show unlock modal
      if (note.isLocked) {
        setLockModal({
          isOpen: true,
          mode: 'unlock',
          type: 'note',
          id: note.id,
          title: note.title,
        });
        return;
      }

      // Save the selected note ID to localStorage
      localStorage.setItem('lastSelectedNoteId', note.id);
      
      setSelectedNote(note);

      // Set editor content and editable state
      requestAnimationFrame(() => {
        if (editor && !editor.isDestroyed && isEditorReady) {
          editor.commands.setContent(note.content || '');
          editor.setEditable(!note.isLocked);
        }
      });

      // Join note session if user is authenticated
      if (user?.id) {
        joinNoteSession(note.id, user.id);
      }
    } catch (error) {
      console.error('Error selecting note:', error);
      setError('Failed to select note');
    }
  }, [editor, loading, isEditorReady, user?.id]);

  // Update handleLockNote to handle unlocking
  const handleLockNote = useCallback(async (passcode: string) => {
    if (!lockModal.id) return;
    
    try {
      setLoading(true);
      console.log('Processing lock operation:', lockModal.mode, 'for note:', lockModal.id);

      if (lockModal.mode === 'lock') {
        // Lock note
        const response = await lockNote(lockModal.id, passcode);
        console.log('Note locked successfully:', response.data);
        
        // Update notes list with locked note
        setNotes(prevNotes => prevNotes.map(note => 
          note.id === lockModal.id ? sanitizeLockedNote(response.data) : note
        ));
        
        // Clear editor and deselect note if it was locked
        if (selectedNote?.id === lockModal.id) {
          setSelectedNote(null);
          if (editor && !editor.isDestroyed) {
            editor.commands.setContent('');
            editor.setEditable(false);
          }
          localStorage.removeItem('lastSelectedNoteId');
        }
      } else {
        // Unlock note
        const response = await unlockNote(lockModal.id, passcode);
        console.log('Note unlocked successfully:', response.data);
        
        // Update notes list with unlocked note
        setNotes(prevNotes => prevNotes.map(note => 
          note.id === lockModal.id ? response.data : note
        ));
        
        // Update selected note and editor content
        setSelectedNote(response.data);
        if (editor && !editor.isDestroyed) {
          editor.commands.setContent(response.data.content || '');
          editor.setEditable(true);
        }
      }

      // Reset lock modal state
      setLockModal({ isOpen: false, mode: 'lock', type: 'note', id: null, title: '' });
      setError(null);
    } catch (err: any) {
      console.error('Lock operation failed:', err);
      setError(err.response?.data?.error || 'Failed to process lock operation');
    } finally {
      setLoading(false);
    }
  }, [lockModal.id, lockModal.mode, selectedNote?.id, editor]);

  // Update filtered notes computation
  const filteredNotes = useMemo(() => {
    let filtered = notes.map(note => sanitizeLockedNote(note));

    // Filter by folder
    if (selectedFolderId) {
      filtered = filtered.filter(note => note.folderId === selectedFolderId);
    } else {
      filtered = filtered.filter(note => !note.folderId);
    }

    // Filter by view type
    switch (viewFilter) {
      case 'owned':
        filtered = filtered.filter(note => note.authorId === user?.id);
        break;
      case 'shared':
        filtered = filtered.filter(note => note.authorId !== user?.id);
        break;
      // 'all' shows everything
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(note =>
        note.title.toLowerCase().includes(query) ||
        (!note.isLocked && note.content?.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [notes, selectedFolderId, viewFilter, searchQuery, user?.id]);

  const handleFolderDelete = async (folderId: string) => {
    try {
      await deleteFolderApi(folderId);
      setFolders(folders.filter(folder => folder.id !== folderId));
      if (selectedFolderId === folderId) {
        setSelectedFolderId(null);
        const response = await getNotes();
        setNotes(response.data);
      }
    } catch (err: any) {
      console.error('Error deleting folder:', err);
      setError(err.response?.data?.error || 'Failed to delete folder');
    }
  };

  const handleFolderSelect = useCallback(async (folderId: string | null) => {
    if (loading || !isEditorReady) return;

    try {
      // Clear editor content before changing folder
      if (editor && !editor.isDestroyed) {
        editor.commands.clearContent();
      }

      setSelectedFolderId(folderId);
      setSelectedNote(null);
      
      if (folderId) {
        const response = await getNotes({ folderId });
        setNotes(response.data);
      } else {
        const response = await getNotes();
        setNotes(response.data);
      }
    } catch (err: any) {
      console.error('Error selecting folder:', err);
      setError(err.response?.data?.error || 'Failed to load notes for folder');
    }
  }, [loading, isEditorReady, editor]);

  // Add note action handlers
  const handleShareNote = useCallback(async (data: { email: string; canEdit: boolean }) => {
    try {
      if (!shareModal.noteId) return;
      await shareNote(shareModal.noteId, data);
      setShareModal({
        isOpen: false,
        noteId: null,
        noteTitle: ''
      });
    } catch (err: any) {
      console.error('Error sharing note:', err);
      throw err;
    }
  }, [shareModal.noteId]);

  // @ts-ignore - Used in JSX
  const showLockNoteModal = useCallback((note: Note) => {
    setLockModal({
      isOpen: true,
      mode: note.isLocked ? 'unlock' : 'lock',
      type: 'note',
      id: note.id,
      title: note.title,
    });
  }, []);

  // @ts-ignore - Used in JSX
  const handleStarNote = useCallback(async (note: Note) => {
    try {
      await toggleStar(note.id);
    } catch (error) {
      console.error('Error starring note:', error);
      setError('Failed to star note');
    }
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deleteConfirmation.noteId) return;

    try {
      setDeleteLoading(true);
      await deleteNoteApi(deleteConfirmation.noteId);
      
      setNotes(prevNotes => 
        prevNotes.filter(note => note.id !== deleteConfirmation.noteId)
      );
      
      if (selectedNote?.id === deleteConfirmation.noteId) {
        setSelectedNote(null);
        if (editor && !editor.isDestroyed) {
          editor.commands.clearContent();
        }
      }
      
      setDeleteConfirmation({
        isOpen: false,
        noteId: null,
        noteTitle: '',
      });
    } catch (err: any) {
      console.error('Error deleting note:', err);
      setError(err.response?.data?.error || 'Failed to delete note');
    } finally {
      setDeleteLoading(false);
    }
  }, [deleteConfirmation.noteId, selectedNote?.id, editor]);

  // @ts-ignore - Used in JSX for share button click handler
  const handleConfirmShare = useCallback(async (data: { email: string; canEdit: boolean }) => {
    if (!shareModal.noteId) return;
    try {
      await shareNote(shareModal.noteId, data);
      setShareModal({
        isOpen: false,
        noteId: null,
        noteTitle: ''
      });
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to share note');
    }
  }, [shareModal.noteId]);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/auth');
  };

  // Join note session when a note is selected
  useEffect(() => {
    if (selectedNote?.id && user?.id) {
      joinNoteSession(selectedNote.id, user.id);
    }
  }, [selectedNote?.id, user?.id]);

  const createNewNote = async () => {
    try {
      const response = await createNote({
        title: 'Untitled Note',
        content: '',
        description: '',
        category: selectedCategory || undefined,
        tags: [],
        folderId: selectedFolderId || undefined,
        isLocked: false,
        isArchived: false,
        isPinned: false,
        starred: false
      });
      
      console.log('Created note:', response.data);
      setNotes(prevNotes => [response.data, ...prevNotes]);
      setSelectedNote(response.data);
      
      // Set editor content after a small delay to ensure it's ready
      setTimeout(() => {
        editor?.commands.setContent('');
        editor?.commands.focus();
      }, 100);
    } catch (err: any) {
      console.error('Error creating note:', err);
      setError(err.response?.data?.error || 'Failed to create note');
    }
  };

  const toggleStar = async (noteId: string) => {
    try {
      const noteToUpdate = notes.find(note => note.id === noteId);
      if (!noteToUpdate) return;

      const response = await updateNote(noteId, {
        starred: !noteToUpdate.starred
      });

      setNotes(prevNotes =>
        prevNotes.map(note =>
          note.id === noteId ? response.data : note
        )
      );

      if (selectedNote?.id === noteId) {
        setSelectedNote(response.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update note');
    }
  };

  // Update editor content effect
  useEffect(() => {
    if (!editor || !selectedNote || loading || !isEditorReady) return;

    const content = selectedNote.content || '';
    if (content !== editor.getHTML()) {
      const timeoutId = setTimeout(() => {
        if (editor && !editor.isDestroyed && isEditorReady) {
          editor.commands.setContent(content);
        }
      }, 0);

      return () => clearTimeout(timeoutId);
    }
  }, [selectedNote, editor, loading, isEditorReady]);

  // Update cleanup effect
  useEffect(() => {
    return () => {
      if (editor && !editor.isDestroyed) {
        setIsEditorReady(false);
        editor.destroy();
      }
    };
  }, [editor]);

  // Add folder fetching effect
  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await getFolders();
        setFolders(response.data);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to fetch folders');
        if (err.response?.status === 401) {
          navigate('/auth');
        }
      }
    };

    fetchFolders();
  }, [navigate]);

  // Update filtered notes effect
  useEffect(() => {
    if (!editor || filteredNotes.length === 0 || loading || !isEditorReady) return;

    // If no note is selected but we have filtered notes
    if (!selectedNote && filteredNotes.length > 0) {
      const firstNote = filteredNotes[0];
      
      // Don't auto-select locked notes that user doesn't own
      if (firstNote.isLocked && firstNote.authorId !== user?.id) {
        return;
      }

      setSelectedNote(firstNote);
      requestAnimationFrame(() => {
        if (editor && !editor.isDestroyed && isEditorReady) {
          editor.commands.setContent(firstNote.content || '');
        }
      });
    }
  }, [filteredNotes, selectedNote, editor, loading, isEditorReady, user?.id]);

  const handleCreateFolder = async () => {
    setEditingFolder(null);
    setFolderModalOpen(true);
  };

  const handleSubmitFolder = async (folderData: {
    name: string;
    description?: string;
    color?: string;
    icon?: string;
    parentId?: string;
  }) => {
    try {
      if (!folderData.name || !folderData.name.trim()) {
        setError('Folder name is required');
        return;
      }

      await createFolder(folderData);
      const foldersResponse = await getFolders();
      setFolders(foldersResponse.data);
      setFolderModalOpen(false);
      setEditingFolder(null);
      setError(null);
    } catch (err: any) {
      console.error('Error creating folder:', err);
      setError(err.response?.data?.error || 'Failed to create folder');
    }
  };

  const handleEditFolder = (folder: Folder) => {
    setEditingFolder(folder);
    setFolderModalOpen(true);
  };

  const handleConfirmFolderDelete = async () => {
    if (!folderDeleteConfirmation.folderId) return;
    
    try {
      await deleteFolderApi(folderDeleteConfirmation.folderId);
      setFolders(prevFolders => prevFolders.filter(folder => folder.id !== folderDeleteConfirmation.folderId));
      if (selectedFolderId === folderDeleteConfirmation.folderId) {
        setSelectedFolderId(null);
      }
      setFolderDeleteConfirmation({
        isOpen: false,
        folderId: null,
        folderName: ''
      });
    } catch (err: any) {
      console.error('Error deleting folder:', err);
      setError(err.response?.data?.error || 'Failed to delete folder');
    }
  };

  // Theme effect
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Update cleanup when note is deselected
  useEffect(() => {
    if (!selectedNote) {
      localStorage.removeItem('lastSelectedNoteId');
    }
  }, [selectedNote]);

  // Add initialization effect
  useEffect(() => {
    let isSubscribed = true;

    const initializeData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (!token || !userData) {
          console.log('No auth tokens found, redirecting to login');
          navigate('/auth');
          return;
        }

        try {
          const parsedUser = JSON.parse(userData);
          if (!parsedUser.id || !parsedUser.name || !parsedUser.email) {
            throw new Error('Invalid user data');
          }

          if (isSubscribed) {
            setUser(parsedUser);
            
            // Fetch initial data
            const [notesResponse, foldersResponse] = await Promise.all([
              getNotes(),
              getFolders()
            ]);

            if (isSubscribed) {
              setNotes(notesResponse.data);
              setFolders(foldersResponse.data);
              setLoading(false);
            }
          }
        } catch (error) {
          console.error('Error initializing:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/auth');
        }
      } catch (err: any) {
        console.error('Error:', err);
        if (isSubscribed) {
          setError(err.response?.data?.error || 'Failed to initialize');
          setLoading(false);
        }
      }
    };

    initializeData();

    return () => {
      isSubscribed = false;
    };
  }, [navigate]);

  // Add socket connection effect
  useEffect(() => {
    if (!user?.id) return;

    const socket = connectSocket();
    
    if (socket) {
      socket.on('error', (error: any) => {
        console.error('Socket error:', error);
      });

      socket.on('note:update', (updatedNote: Note) => {
        setNotes(prevNotes => 
          prevNotes.map(note => 
            note.id === updatedNote.id ? updatedNote : note
          )
        );
        
        if (selectedNote?.id === updatedNote.id) {
          setSelectedNote(updatedNote);
          if (editor && !editor.isDestroyed) {
            editor.commands.setContent(updatedNote.content || '');
            editor.setEditable(!updatedNote.isLocked);
          }
        }
      });

      socket.on('note:delete', (deletedNoteId: string) => {
        setNotes(prevNotes => prevNotes.filter(note => note.id !== deletedNoteId));
        if (selectedNote?.id === deletedNoteId) {
          setSelectedNote(null);
          if (editor && !editor.isDestroyed) {
            editor.commands.setContent('');
            editor.setEditable(true);
          }
        }
      });
    }

    return () => {
      if (socket) {
        socket.off('error');
        socket.off('note:update');
        socket.off('note:delete');
        disconnectSocket();
      }
    };
  }, [user?.id, selectedNote?.id, editor]);

  const confirmDelete = (note: Note) => {
    setDeleteConfirmation({
      isOpen: true,
      noteId: note.id,
      noteTitle: note.title || 'Untitled'
    });
  };

  // @ts-ignore - Used in JSX for share button click handler
  const handleShareClick = useCallback((note: Note) => {
    setShareModal({
      isOpen: true,
      noteId: note.id,
      noteTitle: note.title || 'Untitled'
    });
  }, []);

  // @ts-ignore - Used in JSX for delete button click handler
  const handleDeleteNote = useCallback((note: Note) => {
    confirmDelete(note);
  }, []);

  // Update the loading screen render
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your notes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => {
              setError(null);
              window.location.reload();
            }}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-white dark:bg-gray-900">
      {showCloudView ? (
        <CloudView 
          notes={filteredNotes} 
          onBack={() => setShowCloudView(false)} 
        />
      ) : (
        <div className="flex">
          {/* Sidebar */}
          <div 
            className={`${
              sidebarOpen ? 'w-64' : 'w-0'
            } transition-all duration-300 ease-in-out overflow-hidden border-r border-gray-200 dark:border-gray-700`}
          >
            {/* CloudNotes Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <CloudIcon className="h-6 w-6 text-purple-600" />
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                  CloudNotes
                </span>
              </div>
            </div>

            {/* User Profile */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <UserCircleIcon className="h-8 w-8 text-gray-600 dark:text-gray-300" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{user?.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* View Filters */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-medium text-gray-900 dark:text-white">Views</h2>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => setViewFilter('all')}
                  className={`w-full text-left px-3 py-2 rounded-lg ${
                    viewFilter === 'all'
                      ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  All Notes
                </button>
                <button
                  onClick={() => setViewFilter('owned')}
                  className={`w-full text-left px-3 py-2 rounded-lg ${
                    viewFilter === 'owned'
                      ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  My Notes
                </button>
                <button
                  onClick={() => setViewFilter('shared')}
                  className={`w-full text-left px-3 py-2 rounded-lg ${
                    viewFilter === 'shared'
                      ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  Shared with Me
                </button>
              </div>
            </div>

            {/* Folders */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <FolderTree
                folders={folders}
                selectedFolderId={selectedFolderId}
                onSelect={handleFolderSelect}
                onCreateFolder={handleCreateFolder}
                onEditFolder={handleEditFolder}
                onDeleteFolder={handleFolderDelete}
              />
            </div>

            {/* Notes List */}
            <div className="p-4 flex-1 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-medium text-gray-900 dark:text-white">Notes</h2>
                <button
                  onClick={createNewNote}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                >
                  <PlusIcon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
              <div className="space-y-2">
                {filteredNotes.map((note) => (
                  <button
                    key={note.id}
                    onClick={() => handleNoteSelect(note)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedNote?.id === note.id
                        ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium truncate text-gray-900 dark:text-white">
                          {note.title || 'Untitled Note'}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {note.isLocked ? '🔒 This note is locked' : stripHtmlTags(note.content || '')}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 ml-2">
                        {note.isLocked && (
                          <LockClosedIcon className="h-3.5 w-3.5 text-purple-500" />
                        )}
                        {note.starred && (
                          <StarIconSolid className="h-3.5 w-3.5 text-yellow-500" />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
            {/* Top Bar */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
              <div className="flex flex-col px-4 py-3">
                <div className="flex items-center gap-4">
                  {/* Cloud View Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowCloudView(true)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    title="Cloud view"
                  >
                    <CloudIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  </motion.button>

                  {/* Sidebar Toggle */}
                  {!sidebarOpen && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSidebarOpen(true)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                      title="Expand sidebar"
                    >
                      <Bars3Icon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    </motion.button>
                  )}

                  {/* Search */}
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Search notes..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>

                  {/* Theme Toggle */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    title="Toggle theme"
                  >
                    {theme === 'light' ? (
                      <MoonIcon className="h-5 w-5 text-gray-600" />
                    ) : (
                      <SunIcon className="h-5 w-5 text-gray-300" />
                    )}
                  </motion.button>

                  {/* Settings/Admin */}
                  {user?.email === 'richierodney434@gmail.com' ? (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowAdminDashboard(true)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                      title="Admin Dashboard"
                    >
                      <ChartBarIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    </motion.button>
                  ) : null}

                  {/* Sign Out */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSignOut}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    title="Sign out"
                  >
                    <ArrowLeftOnRectangleIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Editor Area */}
            <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-900">
              <div className="max-w-4xl mx-auto p-6">
                {selectedNote ? (
                  <>
                    {/* Note Title */}
                    <input
                      type="text"
                      value={selectedNote.title}
                      onChange={(e) => handleNoteUpdate(selectedNote.id, { title: e.target.value })}
                      disabled={selectedNote.isLocked}
                      className={`w-full text-3xl font-bold mb-4 bg-transparent border-none focus:outline-none focus:ring-0 text-gray-900 dark:text-white ${
                        selectedNote.isLocked ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      placeholder="Note title..."
                    />

                    {/* Editor */}
                    <div className={`prose dark:prose-invert max-w-none ${
                      selectedNote.isLocked ? 'opacity-50 pointer-events-none' : ''
                    }`}>
                      {editor && (
                        <EditorErrorBoundary>
                          <div className="relative">
                            {/* Formatting Toolbar */}
                            <div className="flex items-center gap-2 p-2 mb-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 overflow-x-auto">
                              <button
                                onClick={() => editor.chain().focus().toggleBold().run()}
                                className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                  editor.isActive('bold') ? 'bg-purple-100 dark:bg-purple-900 text-purple-600' : ''
                                }`}
                                title="Bold (Ctrl+B)"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                  <path d="M8 11h4.5a2.5 2.5 0 1 0 0-5H8v5Zm10 4.5a4.5 4.5 0 0 1-4.5 4.5H6V4h6.5a4.5 4.5 0 0 1 3.256 7.606A4.498 4.498 0 0 1 18 15.5ZM8 13v5h5.5a2.5 2.5 0 1 0 0-5H8Z"/>
                                </svg>
                              </button>
                              <button
                                onClick={() => editor.chain().focus().toggleItalic().run()}
                                className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                  editor.isActive('italic') ? 'bg-purple-100 dark:bg-purple-900 text-purple-600' : ''
                                }`}
                                title="Italic (Ctrl+I)"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                  <path d="M15 20H7v-2h2.927l2.116-12H9V4h8v2h-2.927l-2.116 12H15z"/>
                                </svg>
                              </button>
                              <button
                                onClick={() => editor.chain().focus().toggleUnderline().run()}
                                className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                  editor.isActive('underline') ? 'bg-purple-100 dark:bg-purple-900 text-purple-600' : ''
                                }`}
                                title="Underline (Ctrl+U)"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                  <path d="M8 3v9a4 4 0 1 0 8 0V3h2v9a6 6 0 1 1-12 0V3h2zM4 20h16v2H4v-2z"/>
                                </svg>
                              </button>
                              <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />
                              <select
                                onChange={(e) => {
                                  const level = parseInt(e.target.value);
                                  level ? editor.chain().focus().toggleHeading({ level: level as Level }).run() :
                                          editor.chain().focus().setParagraph().run();
                                }}
                                value={
                                  [1, 2, 3].find(level => editor.isActive('heading', { level }))?.toString() || ''
                                }
                                className="p-2 rounded bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                              >
                                <option value="">Normal</option>
                                <option value="1">Heading 1</option>
                                <option value="2">Heading 2</option>
                                <option value="3">Heading 3</option>
                              </select>
                              <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />
                              <button
                                onClick={() => editor.chain().focus().toggleBulletList().run()}
                                className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                  editor.isActive('bulletList') ? 'bg-purple-100 dark:bg-purple-900 text-purple-600' : ''
                                }`}
                                title="Bullet List"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                  <path d="M8 4h13v2H8V4zM4.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 6.9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM8 11h13v2H8v-2zm0 7h13v2H8v-2z"/>
                                </svg>
                              </button>
                              <button
                                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                                className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                  editor.isActive('orderedList') ? 'bg-purple-100 dark:bg-purple-900 text-purple-600' : ''
                                }`}
                                title="Numbered List"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                  <path d="M8 4h13v2H8V4zM5 3v3h1v1H3V6h1V4H3V3h2zm-2 7h3.5v1H3v-1zm2 3v3h1v1H3v-1h1v-2H3v-1h2zm-2 7h3.5v1H3v-1zm2 3v3h1v1H3v-1h1v-2H3v-1h2zM8 11h13v2H8v-2zm0 7h13v2H8v-2z"/>
                                </svg>
                              </button>
                              <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />
                              <button
                                onClick={() => {
                                  if (selectedNote?.isLocked) return;
                                  const input = document.createElement('input');
                                  input.type = 'file';
                                  input.accept = 'image/*';
                                  input.onchange = async (e) => {
                                    const file = (e.target as HTMLInputElement).files?.[0];
                                    if (file) {
                                      await handleImageUpload(file);
                                    }
                                  };
                                  input.click();
                                }}
                                className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                                title="Insert Image"
                                disabled={selectedNote?.isLocked}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                  <path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                                className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                  editor.isActive('codeBlock') ? 'bg-purple-100 dark:bg-purple-900 text-purple-600' : ''
                                }`}
                                title="Code Block"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                  <path d="M8.5 3.5l-6.8 6.8c-.3.3-.3.7 0 1l6.8 6.8 1.5-1.5L4.3 11l5.7-5.7-1.5-1.8zm7 0l6.8 6.8c.3.3.3.7 0 1l-6.8 6.8-1.5-1.5L19.7 11 14 5.3l1.5-1.8z"/>
                                </svg>
                              </button>
                              <button
                                onClick={() => editor.chain().focus().toggleCode().run()}
                                className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                  editor.isActive('code') ? 'bg-purple-100 dark:bg-purple-900 text-purple-600' : ''
                                }`}
                                title="Inline Code"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                  <path d="M24 12l-5.657 5.657-1.414-1.414L21.172 12l-4.243-4.243 1.414-1.414L24 12zM2.828 12l4.243 4.243-1.414 1.414L0 12l5.657-5.657L7.07 7.757 2.828 12zm6.96 9H7.66l6.552-18h2.128L9.788 21z"/>
                                </svg>
                              </button>
                            </div>
                            
                            <EditorContent editor={editor} />
                            
                            {editor.isFocused && !editor.state.selection.empty && (
                              <BubbleMenu 
                                editor={editor} 
                                tippyOptions={{ 
                                  duration: 100,
                                  placement: 'top',
                                  appendTo: () => document.body,
                                }}
                                className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2 flex items-center gap-1"
                              >
                                <button
                                  onClick={() => editor.chain().focus().toggleBold().run()}
                                  className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                    editor.isActive('bold') ? 'bg-purple-100 dark:bg-purple-900 text-purple-600' : ''
                                  }`}
                                >
                                  B
                                </button>
                                <button
                                  onClick={() => editor.chain().focus().toggleItalic().run()}
                                  className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                    editor.isActive('italic') ? 'bg-purple-100 dark:bg-purple-900 text-purple-600' : ''
                                  }`}
                                >
                                  I
                                </button>
                                <button
                                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                                  className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                    editor.isActive('underline') ? 'bg-purple-100 dark:bg-purple-900 text-purple-600' : ''
                                  }`}
                                >
                                  U
                                </button>
                              </BubbleMenu>
                            )}
                          </div>
                        </EditorErrorBoundary>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
                    <DocumentTextIcon className="h-12 w-12 mb-4" />
                    <p>Select a note or create a new one</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {/* Lock Modal */}
      <LockModal
        isOpen={lockModal.isOpen}
        onClose={() => {
          setLockModal({ isOpen: false, mode: 'lock', type: 'note', id: null, title: '' });
        }}
        onSubmit={handleLockNote}
        title={`${lockModal.mode === 'lock' ? 'Lock' : 'Unlock'} ${lockModal.title}`}
        mode={lockModal.mode}
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={shareModal.isOpen}
        onClose={() => setShareModal({ isOpen: false, noteId: null, noteTitle: '' })}
        onSubmit={handleShareNote}
        title={`Share "${shareModal.noteTitle}"`}
        noteId={shareModal.noteId}
        noteTitle={shareModal.noteTitle}
      />

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmation.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4"
            >
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Delete Note
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Are you sure you want to delete "{deleteConfirmation.noteTitle}"? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeleteConfirmation({ isOpen: false, noteId: null, noteTitle: '' })}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg"
                >
                  {deleteLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Deleting...
                    </span>
                  ) : (
                    'Delete Note'
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Folder Modal */}
      <FolderModal
        isOpen={folderModalOpen}
        onClose={() => {
          setFolderModalOpen(false);
          setEditingFolder(null);
        }}
        onSubmit={handleSubmitFolder}
        folders={folders}
        editingFolder={editingFolder}
        title={editingFolder ? 'Edit Folder' : 'Create Folder'}
      />

      {/* Folder Delete Confirmation */}
      <AnimatePresence>
        {folderDeleteConfirmation.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4"
            >
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Delete Folder
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Are you sure you want to delete "{folderDeleteConfirmation.folderName}"? All notes in this folder will be moved to the root level.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setFolderDeleteConfirmation({ isOpen: false, folderId: null, folderName: '' })}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmFolderDelete}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg"
                >
                  Delete Folder
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Dashboard */}
      <AdminDashboard
        isOpen={showAdminDashboard}
        onClose={() => setShowAdminDashboard(false)}
      />
    </div>
  );
};

export default Notes; 