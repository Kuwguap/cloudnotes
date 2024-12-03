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
  description?: string;
  content: string;
  color?: string;
  category?: string;
  tags: string[];
  starred: boolean;
  isArchived: boolean;
  isPinned: boolean;
  isLocked: boolean;
  lockHash?: string;
  createdAt: Date;
  updatedAt: Date;
  lastAccessed: Date;
  authorId: string;
  folderId?: string;
  folder?: Folder;
  author?: User;
  sharedWith?: NoteShare[];
  version: number;
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