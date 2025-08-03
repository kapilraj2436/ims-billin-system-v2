import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="logo-section">
              <h1 className="logo-title">
                <i className="fas fa-boxes me-3"></i>
                InventoryPro
              </h1>
              <p className="logo-subtitle">Smart Inventory Management System</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="header-actions d-flex justify-content-end align-items-center">
              <div className="notification-bell me-3">
                <i className="fas fa-bell"></i>
                <span className="badge bg-danger notification-count">3</span>
              </div>
              <div className="user-profile d-flex align-items-center">
                <div className="user-info me-3 text-end">
                  <div className="user-name">Admin User</div>
                  <div className="user-role">System Administrator</div>
                </div>
                <div className="user-avatar">
                  <i className="fas fa-user"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
