import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChartBarIcon, XMarkIcon, UserGroupIcon, DocumentTextIcon, FolderIcon, ShareIcon } from '@heroicons/react/24/outline';

interface AdminStats {
  overview: {
    totalUsers: number;
    totalNotes: number;
    totalFolders: number;
    totalShares: number;
    activeUsers: number;
    notesCreatedToday: number;
    notesThisWeek: number;
  };
  noteDetails: {
    categoryBreakdown: Array<{
      category: string;
      _count: number;
    }>;
    lockedCount: number;
    starredCount: number;
    topShared: Array<{
      id: string;
      title: string;
      author: {
        name: string;
        email: string;
      };
      shareCount: number;
    }>;
  };
  userDetails: {
    recentUsers: Array<{
      id: string;
      name: string;
      email: string;
      notesCount: number;
      foldersCount: number;
      sharesCount: number;
      joinedAt: string;
    }>;
  };
  folderDetails: {
    topFolders: Array<{
      id: string;
      name: string;
      noteCount: number;
    }>;
    lockedCount: number;
  };
  recentActivity: Array<{
    id: string;
    title: string;
    updatedAt: string;
    author: {
      name: string;
      email: string;
    };
    lastSharedWith: {
      name: string;
      email: string;
    } | null;
    lastSharedAt: string | null;
  }>;
}

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/stats', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch admin stats');
        }

        const data = await response.json();
        setStats(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchStats();
    }
  }, [isOpen]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 overflow-y-auto py-4">
          <div className="min-h-screen py-6 flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-6xl w-full mx-4 shadow-xl relative"
            >
              {/* Sticky Header */}
              <div className="sticky top-0 bg-white dark:bg-gray-800 z-10 pb-4 border-b border-gray-200 dark:border-gray-700 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ChartBarIcon className="h-6 w-6 text-purple-600" />
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Admin Dashboard
                    </h2>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin h-8 w-8 border-4 border-purple-500 rounded-full border-t-transparent"></div>
                </div>
              ) : error ? (
                <div className="text-red-500 text-center p-4">
                  {error}
                </div>
              ) : stats && (
                <div className="space-y-6 overflow-y-auto">
                  {/* Quick Navigation */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <button
                      onClick={() => document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })}
                      className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-100"
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => document.getElementById('note-details')?.scrollIntoView({ behavior: 'smooth' })}
                      className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100"
                    >
                      Note Details
                    </button>
                    <button
                      onClick={() => document.getElementById('recent-users')?.scrollIntoView({ behavior: 'smooth' })}
                      className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full hover:bg-green-200 dark:bg-green-900 dark:text-green-100"
                    >
                      Recent Users
                    </button>
                    <button
                      onClick={() => document.getElementById('recent-activity')?.scrollIntoView({ behavior: 'smooth' })}
                      className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded-full hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-100"
                    >
                      Recent Activity
                    </button>
                  </div>

                  {/* Overview Section */}
                  <section id="overview" className="scroll-mt-20">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Overview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-purple-50 dark:bg-gray-700 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <UserGroupIcon className="h-5 w-5 text-purple-600" />
                          <h3 className="font-medium text-gray-900 dark:text-white">Users</h3>
                        </div>
                        <p className="text-2xl font-bold text-purple-600">{stats.overview.totalUsers}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {stats.overview.activeUsers} active today
                        </p>
                      </div>

                      <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <DocumentTextIcon className="h-5 w-5 text-blue-600" />
                          <h3 className="font-medium text-gray-900 dark:text-white">Notes</h3>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">{stats.overview.totalNotes}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {stats.overview.notesCreatedToday} today, {stats.overview.notesThisWeek} this week
                        </p>
                      </div>

                      <div className="bg-green-50 dark:bg-gray-700 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <FolderIcon className="h-5 w-5 text-green-600" />
                          <h3 className="font-medium text-gray-900 dark:text-white">Folders</h3>
                        </div>
                        <p className="text-2xl font-bold text-green-600">{stats.overview.totalFolders}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {stats.folderDetails.lockedCount} locked
                        </p>
                      </div>

                      <div className="bg-yellow-50 dark:bg-gray-700 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <ShareIcon className="h-5 w-5 text-yellow-600" />
                          <h3 className="font-medium text-gray-900 dark:text-white">Shares</h3>
                        </div>
                        <p className="text-2xl font-bold text-yellow-600">{stats.overview.totalShares}</p>
                      </div>
                    </div>
                  </section>

                  {/* Note Details Section */}
                  <section id="note-details" className="scroll-mt-20">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Note Details</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow">
                        <h3 className="font-medium text-gray-900 dark:text-white mb-4">Note Statistics</h3>
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Category Breakdown</h4>
                            {stats.noteDetails.categoryBreakdown.map((cat) => (
                              <div key={cat.category} className="flex justify-between items-center py-1">
                                <span className="text-gray-700 dark:text-gray-300">{cat.category || 'Uncategorized'}</span>
                                <span className="text-gray-600 dark:text-gray-400">{cat._count}</span>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Locked Notes: {stats.noteDetails.lockedCount}</span>
                            <span>Starred Notes: {stats.noteDetails.starredCount}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow">
                        <h3 className="font-medium text-gray-900 dark:text-white mb-4">Most Shared Notes</h3>
                        <div className="space-y-2">
                          {stats.noteDetails.topShared.map((note) => (
                            <div key={note.id} className="flex justify-between items-center py-2 border-b dark:border-gray-600">
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">{note.title}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">by {note.author.name}</p>
                              </div>
                              <span className="text-purple-600 dark:text-purple-400">{note.shareCount} shares</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Recent Users Section */}
                  <section id="recent-users" className="scroll-mt-20">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recent Users</h3>
                    <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow">
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead>
                            <tr className="text-left text-sm text-gray-500 dark:text-gray-400">
                              <th className="py-2 px-4">User</th>
                              <th className="py-2 px-4">Notes</th>
                              <th className="py-2 px-4">Folders</th>
                              <th className="py-2 px-4">Shares</th>
                              <th className="py-2 px-4">Joined</th>
                            </tr>
                          </thead>
                          <tbody>
                            {stats.userDetails.recentUsers.map((user) => (
                              <tr key={user.id} className="border-t dark:border-gray-600">
                                <td className="py-2 px-4">
                                  <div>
                                    <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                                  </div>
                                </td>
                                <td className="py-2 px-4">{user.notesCount}</td>
                                <td className="py-2 px-4">{user.foldersCount}</td>
                                <td className="py-2 px-4">{user.sharesCount}</td>
                                <td className="py-2 px-4">{formatDate(user.joinedAt)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </section>

                  {/* Recent Activity Section */}
                  <section id="recent-activity" className="scroll-mt-20">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recent Activity</h3>
                    <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow">
                      <div className="space-y-4">
                        {stats.recentActivity.map((activity) => (
                          <div key={activity.id} className="flex items-start gap-4 border-b dark:border-gray-600 pb-4">
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 dark:text-white">{activity.title}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Updated by {activity.author.name} at {formatDate(activity.updatedAt)}
                              </p>
                              {activity.lastSharedWith && (
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Shared with {activity.lastSharedWith.name} at {formatDate(activity.lastSharedAt!)}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AdminDashboard; 