import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="footer-section">
              <h5 className="footer-title">
                <i className="fas fa-boxes me-2"></i>
                InventoryPro
              </h5>
              <p className="footer-description">
                Smart inventory management system designed for modern businesses. 
                Streamline your operations with powerful tools and intuitive interface.
              </p>
              <div className="social-links">
                <a href="#" className="social-link">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-6 mb-4">
            <div className="footer-section">
              <h6 className="footer-subtitle">Quick Links</h6>
              <ul className="footer-links">
                <li><a href="/products">Products</a></li>
                <li><a href="/customers">Customers</a></li>
                <li><a href="/orders">Orders</a></li>
                <li><a href="/payments">Payments</a></li>
              </ul>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-6 mb-4">
            <div className="footer-section">
              <h6 className="footer-subtitle">Features</h6>
              <ul className="footer-links">
                <li><a href="#">Inventory Tracking</a></li>
                <li><a href="#">Order Management</a></li>
                <li><a href="#">Payment Processing</a></li>
                <li><a href="#">Analytics</a></li>
              </ul>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-6 mb-4">
            <div className="footer-section">
              <h6 className="footer-subtitle">Support</h6>
              <ul className="footer-links">
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Documentation</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">System Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-6 mb-4">
            <div className="footer-section">
              <h6 className="footer-subtitle">Contact Info</h6>
              <div className="contact-info">
                <div className="contact-item">
                  <i className="fas fa-envelope me-2"></i>
                  <span>support@inventorypro.com</span>
                </div>
                <div className="contact-item">
                  <i className="fas fa-phone me-2"></i>
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="contact-item">
                  <i className="fas fa-map-marker-alt me-2"></i>
                  <span>123 Business Ave, Suite 100</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <hr className="footer-divider" />
        
        <div className="row">
          <div className="col-md-6">
            <p className="copyright">
              &copy; {currentYear} InventoryPro. All rights reserved.
            </p>
          </div>
          <div className="col-md-6">
            <div className="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
