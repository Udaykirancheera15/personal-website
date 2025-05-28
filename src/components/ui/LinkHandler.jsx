// src/components/ui/LinkHandler.jsx
import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import './LinkHandler.scss';

const LinkHandler = ({ url, children, type = "link" }) => {
  const handleClick = (e) => {
    e.preventDefault();
    
    // Check if it's a GitHub link
    if (url.includes('github.com')) {
      showNotification('Repository Unavailable', 'This repository has been made private. Sorry for the trouble');
    }
    // Check if it's a YouTube link
    else if (url.includes('youtu.be') || url.includes('youtube.com')) {
      showNotification('Video Unavailable', 'This video has been removed or made private by the administrator.');
    }
    // Internal project details
    else if (url.startsWith('/projects/')) {
      showNotification('Content Under Development', 'Detailed project documentation is currently being prepared.');
    }
    else {
      showNotification('Link Unavailable', 'Video has been removed.');
    }
  };

  const showNotification = (title, message) => {
    // Create a modal-like notification
    const notification = document.createElement('div');
    notification.className = 'link-notification-overlay';
    notification.innerHTML = `
      <div class="link-notification-modal">
        <div class="notification-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <h3>${title}</h3>
        <p>${message}</p>
        <button class="notification-close" onclick="this.closest('.link-notification-overlay').remove()">
          Understood
        </button>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);
  };

  return (
    <a href="#" onClick={handleClick} className="handled-link">
      {children}
    </a>
  );
};

export default LinkHandler;
