import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { CloudArrowUpIcon, LockClosedIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import Auth from './pages/Auth';
import Notes from './pages/Notes';
import ErrorBoundary from './components/ErrorBoundary';

// Separate Landing component
const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="fixed w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md z-50 border-b border-gray-100 dark:border-gray-800">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              CloudNotes
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/auth')} 
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Sign in
            </button>
            <button 
              onClick={() => {
                navigate('/auth');
              }} 
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
            >
              Get Started
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="dark:bg-gray-900">
        <div className="relative isolate pt-32">
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-purple-600 to-blue-500 opacity-30"></div>
          </div>

          <div className="py-24 sm:py-32 lg:pb-40">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                  Your Notes, Everywhere
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                  Access your notes from any device, anytime. Seamlessly sync between platforms with our cloud-based note-taking solution.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <button 
                    onClick={() => navigate('/auth')}
                    className="rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800"
                  >
                    Start Taking Notes
                  </button>
                  <a 
                    href="https://github.com/Kuwguap" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100 flex items-center"
                  >
                    Learn more <span aria-hidden="true" className="ml-1">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-purple-600">Everything you need</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Powerful features for modern note-taking
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <CloudArrowUpIcon className="h-5 w-5 flex-none text-purple-600" />
                  Sync Everywhere
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">Access your notes from any device with real-time synchronization.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <LockClosedIcon className="h-5 w-5 flex-none text-purple-600" />
                  Secure Storage
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">Your notes are encrypted and stored securely in the cloud.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <ArrowPathIcon className="h-5 w-5 flex-none text-purple-600" />
                  Real-time Updates
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">Changes sync instantly across all your devices.</p>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative isolate mt-32 px-6 py-32 sm:mt-56 sm:py-40 lg:px-8">
          <div className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl">
            <div className="ml-[max(50%,38rem)] aspect-[1313/771] w-[82.0625rem] bg-gradient-to-tr from-purple-600 to-blue-500"></div>
          </div>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-300">
              Join thousands of users who are already enjoying seamless note-taking across all their devices.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button 
                onClick={() => navigate('/auth')}
                className="rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800"
              >
                Create Free Account
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-gray-500 dark:text-gray-400">
              &copy; 2024 CloudNotes. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Main App component with routing
const App: React.FC = () => {
  // Get initial theme from localStorage or system preference
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  useEffect(() => {
    // Apply theme class to html element
    const theme = getInitialTheme();
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Log environment variables in development
    if (process.env.NODE_ENV === 'development') {
      const env = {
        API_URL: import.meta.env.VITE_API_URL || window.env?.VITE_API_URL || 'http://localhost:5000/api',
        SOCKET_URL: import.meta.env.VITE_SOCKET_URL || window.env?.VITE_SOCKET_URL || 'http://localhost:5000',
        CLOUDINARY_CLOUD_NAME: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || window.env?.VITE_CLOUDINARY_CLOUD_NAME,
        CLOUDINARY_API_KEY: import.meta.env.VITE_CLOUDINARY_API_KEY || window.env?.VITE_CLOUDINARY_API_KEY
      };
      console.log('Environment:', env);
    }
  }, []);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/notes" element={<Notes />} />
          </Routes>
        </Router>
      </div>
    </ErrorBoundary>
  );
};

export default App; 