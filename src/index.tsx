import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');

const root = createRoot(container);

const render = () => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

render();

// Handle hot module replacement
if (process.env.NODE_ENV === 'development') {
  // @ts-ignore
  if (module.hot) {
    // @ts-ignore
    module.hot.accept('./App', () => {
      render();
    });
  }
} 