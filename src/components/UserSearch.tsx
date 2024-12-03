import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { searchUsers } from '../services/api';
import { UserIcon } from '@heroicons/react/24/outline';

interface UserSearchProps {
  onSelect: (user: User) => void;
  excludeEmails?: string[];
}

const UserSearch: React.FC<UserSearchProps> = ({ onSelect, excludeEmails = [] }) => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchForUsers = async () => {
      if (!query.trim()) {
        setUsers([]);
        return;
      }

      console.log('UserSearch: Starting search with query:', query);
      setLoading(true);
      setError(null);

      try {
        console.log('UserSearch: Calling searchUsers API...');
        const response = await searchUsers(query);
        console.log('UserSearch: Received response:', response);
        
        // Filter out excluded emails
        const filteredUsers = response.data.filter(
          (user: User) => !excludeEmails.includes(user.email)
        );
        console.log('UserSearch: Filtered users:', filteredUsers);
        setUsers(filteredUsers);
      } catch (err: any) {
        console.error('UserSearch: Error searching users:', err);
        setError(err.response?.data?.error || 'Failed to search users');
      } finally {
        setLoading(false);
      }
    };

    console.log('UserSearch: Query changed to:', query);
    const timeoutId = setTimeout(searchForUsers, 300);
    return () => clearTimeout(timeoutId);
  }, [query, excludeEmails]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log('UserSearch: Input changed to:', value);
    setQuery(value);
  };

  const handleUserSelect = (user: User) => {
    console.log('UserSearch: User selected:', user);
    onSelect(user);
    setQuery('');
    setUsers([]);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search users by email or name..."
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
      />

      {loading && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin h-4 w-4 border-2 border-purple-500 rounded-full border-t-transparent"></div>
        </div>
      )}

      {error && (
        <div className="mt-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {users.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-auto">
          {users.map((user) => (
            <button
              key={user.id}
              onClick={() => handleUserSelect(user)}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
            >
              <UserIcon className="h-5 w-5 text-gray-400" />
              <div>
                <div className="font-medium">{user.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserSearch; 