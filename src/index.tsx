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

declare global {
  interface NodeModule {
    hot?: {
      accept(path: string, callback: () => void): void;
    };
  }
}

if (module.hot) {
  module.hot.accept('./App', () => {
    render();
  });
} 