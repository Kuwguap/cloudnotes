export interface User {
  id: string;
  email: string;
  name: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  id: string;
  userId: string;
  theme: string;
  fontSize: number;
  defaultView: string;
  sidebarOpen: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Folder {
  id: string;
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  parentId?: string;
  parent?: Folder;
  subfolders?: Folder[];
  notes?: Note[];
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  isArchived: boolean;
  isLocked: boolean;
  lockHash?: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  authorId?: string;
  folderId?: string;
  isPublic?: boolean;
  isLocked?: boolean;
  starred?: boolean;
  tags?: string[];
  description?: string;
  category?: string;
  color?: string;
  version?: number;
  sharedWith?: Array<{
    email: string;
    canEdit: boolean;
  }>;
  passcode?: string | null;
}

export interface NoteShare {
  id: string;
  noteId: string;
  userId: string;
  canEdit: boolean;
  createdAt: Date;
  expiresAt?: Date;
  user?: User;
}

export interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { email: string; canEdit: boolean }) => Promise<void>;
  title: string;
  noteTitle: string;
  noteId: string | null;
}

export type Level = 1 | 2 | 3 | 4 | 5 | 6; 