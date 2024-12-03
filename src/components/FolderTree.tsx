import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FolderIcon,
  ChevronRightIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  FolderOpenIcon,
} from '@heroicons/react/24/outline';
import { Folder } from '../types';

interface FolderTreeProps {
  folders: Folder[];
  selectedFolderId: string | null;
  onFolderSelect: (folderId: string | null) => void;
  onCreateFolder: (parentId?: string) => void;
  onEditFolder: (folder: Folder) => void;
  onDeleteFolder: (folderId: string) => void;
}

interface FolderNodeProps extends FolderTreeProps {
  folder: Folder;
  level: number;
}

const FolderNode: React.FC<FolderNodeProps> = ({
  folder,
  level,
  folders,
  selectedFolderId,
  onFolderSelect,
  onCreateFolder,
  onEditFolder,
  onDeleteFolder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showActions, setShowActions] = useState(false);
  
  const subfolders = folders.filter(f => f.parentId === folder.id);
  const hasSubfolders = subfolders.length > 0;
  const isSelected = selectedFolderId === folder.id;

  return (
    <div className="select-none">
      <motion.div
        className={`flex items-center py-1 px-2 rounded-lg cursor-pointer ${
          isSelected ? 'bg-purple-100 dark:bg-purple-900' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
        style={{ marginLeft: `${level * 16}px` }}
      >
        <motion.button
          className={`w-5 h-5 mr-1 flex items-center justify-center rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
            !hasSubfolders ? 'invisible' : ''
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <ChevronRightIcon
            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-90' : ''}`}
          />
        </motion.button>

        <div
          className="flex-1 flex items-center gap-2 py-1"
          onClick={() => onFolderSelect(folder.id)}
        >
          {isOpen ? (
            <FolderOpenIcon className="w-5 h-5 text-purple-500" />
          ) : (
            <FolderIcon className="w-5 h-5 text-purple-500" />
          )}
          <span className={`truncate ${isSelected ? 'font-medium' : ''}`}>
            {folder.name}
          </span>
        </div>

        <AnimatePresence>
          {showActions && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={() => onCreateFolder(folder.id)}
              >
                <PlusIcon className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={() => onEditFolder(folder)}
              >
                <PencilIcon className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={() => onDeleteFolder(folder.id)}
              >
                <TrashIcon className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {isOpen && hasSubfolders && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {subfolders.map(subfolder => (
              <FolderNode
                key={subfolder.id}
                folder={subfolder}
                level={level + 1}
                folders={folders}
                selectedFolderId={selectedFolderId}
                onFolderSelect={onFolderSelect}
                onCreateFolder={onCreateFolder}
                onEditFolder={onEditFolder}
                onDeleteFolder={onDeleteFolder}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FolderTree: React.FC<FolderTreeProps> = ({
  folders,
  selectedFolderId,
  onFolderSelect,
  onCreateFolder,
  onEditFolder,
  onDeleteFolder,
}) => {
  const rootFolders = folders.filter(folder => !folder.parentId);

  return (
    <div className="py-2">
      <div className="flex items-center justify-between px-2 mb-2">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Folders</h3>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={() => onCreateFolder()}
        >
          <PlusIcon className="w-4 h-4" />
        </motion.button>
      </div>
      
      {rootFolders.map(folder => (
        <FolderNode
          key={folder.id}
          folder={folder}
          level={0}
          folders={folders}
          selectedFolderId={selectedFolderId}
          onFolderSelect={onFolderSelect}
          onCreateFolder={onCreateFolder}
          onEditFolder={onEditFolder}
          onDeleteFolder={onDeleteFolder}
        />
      ))}
    </div>
  );
};

export default FolderTree; 