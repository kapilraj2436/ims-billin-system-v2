import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/products', label: 'Products', icon: 'fas fa-box', color: '#3498db' },
    { path: '/customers', label: 'Customers', icon: 'fas fa-users', color: '#27ae60' },
    { path: '/orders', label: 'Orders', icon: 'fas fa-shopping-cart', color: '#f39c12' },
    { path: '/payments', label: 'Payments', icon: 'fas fa-credit-card', color: '#e74c3c' },
    { path: '/addresses', label: 'Addresses', icon: 'fas fa-map-marker-alt', color: '#9b59b6' },
    { path: '/cities', label: 'Cities', icon: 'fas fa-city', color: '#1abc9c' },
    { path: '/discounts', label: 'Discounts', icon: 'fas fa-percentage', color: '#e67e22' },
    { path: '/bank-details', label: 'Bank Details', icon: 'fas fa-university', color: '#34495e' },
  ];

  return (
    <nav className="app-navbar">
      <div className="container-fluid">
        <div className="navbar-scroll">
          <div className="nav-items">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                style={{ '--item-color': item.color }}
              >
                <div className="nav-icon">
                  <i className={item.icon}></i>
                </div>
                <span className="nav-label">{item.label}</span>
                <div className="nav-indicator"></div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
