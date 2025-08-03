import React, { useEffect } from 'react';
import './Modal.css';

const Modal = ({ 
  title, 
  children, 
  onClose, 
  size = 'lg', 
  showCloseButton = true,
  backdrop = true 
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    // Only close if clicking directly on the backdrop (not on modal content)
    if (backdrop && e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleModalContentClick = (e) => {
    // Prevent event from bubbling up to backdrop
    e.stopPropagation();
  };

  return (
    <div 
      className="modal fade show d-block" 
      tabIndex="-1"
      onClick={handleBackdropClick}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
    >
      <div className={`modal-dialog modal-${size} modal-dialog-centered`}>
        <div 
          className="modal-content shadow-lg"
          onClick={handleModalContentClick}
        >
          <div className="modal-header">
            <h5 className="modal-title">
              <i className="fas fa-edit me-2"></i>
              {title}
            </h5>
            {showCloseButton && (
              <button 
                type="button" 
                className="btn-close btn-close-white" 
                onClick={onClose}
                aria-label="Close"
              ></button>
            )}
          </div>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
