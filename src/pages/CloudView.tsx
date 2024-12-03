import React from 'react';
import { motion } from 'framer-motion';
import { CloudIcon, ArrowLeftIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { Note } from '../types';
import { format } from 'date-fns';

interface CloudViewProps {
  notes: Note[];
  onBack: () => void;
}

const CloudView: React.FC<CloudViewProps> = ({ notes, onBack }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-12">
          {notes.map((note) => (
            <article
              key={note.id}
              className="prose prose-purple dark:prose-invert max-w-none bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-8">
                <h2 className="mt-0 mb-4">{note.title}</h2>
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
                <div 
                  className="prose dark:prose-invert max-w-none"
                >
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
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CloudView; 