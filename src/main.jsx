import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Toaster } from 'react-hot-toast';

// Main application component and global styles
import App from './App.jsx';
import './index.css';

// Redux store configuration - combines all reducers
import rootReducer from './reducer/index';

/**
 * Configure Redux store with combined reducers
 * Enables Redux DevTools in development and sets up middleware
 */
const store = configureStore({
  reducer: rootReducer,
});

/**
 * Main application entry point
 * Sets up React application with routing, state management, and global providers
 * Renders the App component with all necessary context providers
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <Provider store={store}>
      <App />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            marginTop: '4rem',
            background: '#1f2937',
            color: '#f9fafb',
            border: '1px solid #374151',
          },
        }}
      />
    </Provider>
  </BrowserRouter>
);





