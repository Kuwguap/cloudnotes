import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloudIcon, ArrowLeftIcon, LockClosedIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Note } from '../types';
import { format } from 'date-fns';

interface CloudViewProps {
  notes: Note[];
  onBack: () => void;
}

const stripHtml = (html: string) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

const NotePreview: React.FC<{ note: Note; onClick: () => void }> = ({ note, onClick }) => (
  <motion.article
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    whileHover={{ scale: 1.02 }}
    onClick={onClick}
    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-all"
  >
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
          {note.title || 'Untitled Note'}
        </h3>
        <ChevronRightIcon className="h-5 w-5 text-gray-400" />
      </div>
      
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
        <time dateTime={note.updatedAt?.toString()}>
          {note.updatedAt ? format(new Date(note.updatedAt), 'MMM d, yyyy') : 'No date'}
        </time>
        {note.isLocked && (
          <>
            <span className="mx-2">•</span>
            <LockClosedIcon className="h-4 w-4" />
          </>
        )}
      </div>

      {note.tags && note.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
        {note.isLocked ? (
          <span className="italic">This note is locked</span>
        ) : (
          stripHtml(note.content || '')
        )}
      </p>
    </div>
  </motion.article>
);

const FullNoteView: React.FC<{ note: Note; onClose: () => void }> = ({ note, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
  >
    <motion.div
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.95 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
    >
      <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {note.title || 'Untitled Note'}
        </h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          <XMarkIcon className="h-6 w-6 text-gray-500" />
        </button>
      </div>
      
      <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 80px)' }}>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
          <time dateTime={note.updatedAt?.toString()}>
            {note.updatedAt ? format(new Date(note.updatedAt), 'MMMM d, yyyy') : 'No date'}
          </time>
          {note.tags && note.tags.length > 0 && (
            <>
              <span className="mx-2">•</span>
              <div className="flex gap-2">
                {note.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
        
        <div className="prose dark:prose-invert max-w-none">
          {note.isLocked ? (
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <LockClosedIcon className="h-5 w-5" />
              <p>This note is locked. Please unlock it to view the content.</p>
            </div>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: note.content || '' }} />
          )}
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const CloudView: React.FC<CloudViewProps> = ({ notes, onBack }) => {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBack}
                className="p-2 rounded-lg text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                <ArrowLeftIcon className="h-6 w-6" />
              </motion.button>
              <div className="flex items-center ml-4">
                <CloudIcon className="h-8 w-8 text-purple-600" />
                <h1 className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">Cloud Notes</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NotePreview
              key={note.id}
              note={note}
              onClick={() => setSelectedNote(note)}
            />
          ))}
        </div>
      </main>

      {/* Full Note View Modal */}
      <AnimatePresence>
        {selectedNote && (
          <FullNoteView
            note={selectedNote}
            onClose={() => setSelectedNote(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CloudView; 