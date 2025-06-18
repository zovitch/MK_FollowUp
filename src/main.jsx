/**
 * Main entry point for the React application.
 * This file initializes the React application and mounts it to the DOM.
 *
 * @module main
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Create and render the root React component
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
