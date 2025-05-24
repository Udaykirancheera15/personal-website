import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  // REMOVE React.StrictMode to prevent double mount
  <App />
);
