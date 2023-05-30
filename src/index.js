import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import {App} from './components/index';
import { AuthProvider } from './providers/AuthProvider';
import { PostProvider } from './providers/PostsProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
        <PostProvider>
          <App />
        </PostProvider>
      </AuthProvider> 
  </React.StrictMode>
);

