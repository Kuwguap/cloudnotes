import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShareIcon, UserIcon, TrashIcon } from '@heroicons/react/24/outline';
import { User } from '../types';
import UserSearch from './UserSearch';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { email: string; canEdit: boolean }) => Promise<void>;
  title: string;
  noteTitle: string;
  noteId: string | null;
  onRemoveShare?: (userId: string) => Promise<void>;
  onUpdatePermissions?: (userId: string, canEdit: boolean) => Promise<void>;
  sharedWith?: Array<{
    id: string;
    userId: string;
    user?: User;
    canEdit: boolean;
  }>;
}

const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  noteTitle,
  noteId,
  sharedWith = [],
  onRemoveShare,
  onUpdatePermissions,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [canEdit, setCanEdit] = useState(true);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setError(null);
      setLoading(false);
      setCanEdit(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setError(null);
    setLoading(false);
    setCanEdit(true);
    onClose();
  };

  const handleUserSelect = async (user: User) => {
    console.log('User selected:', user);
    if (loading) {
      console.log('Loading in progress, skipping...');
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      console.log('Attempting to share with user:', user.email);
      await onSubmit({ email: user.email, canEdit });
      console.log('Share successful');
    } catch (err: any) {
      console.error('Error sharing note:', err);
      setError(err.response?.data?.error || 'Failed to share note');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveShare = async (userId: string) => {
    if (!onRemoveShare || loading) return;
    
    setLoading(true);
    setError(null);
    
    try {
      await onRemoveShare(userId);
    } catch (err: any) {
      console.error('Error removing share:', err);
      setError(err.response?.data?.error || 'Failed to remove share');
    } finally {
      setLoading(false);
    }
  };

  const handlePermissionChange = async (userId: string, newCanEdit: boolean) => {
    if (!onUpdatePermissions || loading) return;
    
    setLoading(true);
    setError(null);
    
    try {
      await onUpdatePermissions(userId, newCanEdit);
    } catch (err: any) {
      console.error('Error updating permissions:', err);
      setError(err.response?.data?.error || 'Failed to update permissions');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            data-note-id={noteId}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <ShareIcon className="h-6 w-6 text-purple-600" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {title}
                </h3>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {noteTitle}
              </div>
              {loading && (
                <div className="animate-spin h-5 w-5 border-2 border-purple-500 rounded-full border-t-transparent"></div>
              )}
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Share with users
                </label>
                <UserSearch
                  onSelect={handleUserSelect}
                  excludeEmails={sharedWith.map(share => share.user?.email || '')}
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="canEdit"
                  checked={canEdit}
                  onChange={(e) => setCanEdit(e.target.checked)}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="canEdit" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Allow editing for new shares
                </label>
              </div>

              {sharedWith.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Shared with
                  </h4>
                  <div className="space-y-2">
                    {sharedWith.map((share) => (
                      <div
                        key={share.id}
                        className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-md"
                      >
                        <div className="flex items-center gap-2">
                          <UserIcon className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="font-medium">{share.user?.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {share.user?.email}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {onUpdatePermissions && (
                            <div className="flex items-center mr-2">
                              <input
                                type="checkbox"
                                checked={share.canEdit}
                                onChange={(e) => handlePermissionChange(share.userId, e.target.checked)}
                                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                              />
                              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                Can edit
                              </span>
                            </div>
                          )}
                          {onRemoveShare && (
                            <button
                              onClick={() => handleRemoveShare(share.userId)}
                              className="p-1 text-gray-400 hover:text-red-500"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ShareModal; 