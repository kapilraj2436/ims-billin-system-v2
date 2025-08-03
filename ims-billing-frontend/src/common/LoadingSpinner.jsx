import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 'md', text = 'Loading...', overlay = false }) => {
  const spinnerSizes = {
    sm: '1.5rem',
    md: '2.5rem',
    lg: '4rem'
  };

  if (overlay) {
    return (
      <div className="loading-overlay">
        <div className="loading-content">
          <div 
            className="spinner-border text-primary" 
            role="status"
            style={{ width: spinnerSizes[size], height: spinnerSizes[size] }}
          >
            <span className="visually-hidden">{text}</span>
          </div>
          <p className="loading-text mt-3">{text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="loading-container text-center py-5">
      <div 
        className="spinner-border text-primary" 
        role="status"
        style={{ width: spinnerSizes[size], height: spinnerSizes[size] }}
      >
        <span className="visually-hidden">{text}</span>
      </div>
      <p className="loading-text mt-3">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
