import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-grid">
          
          <div className="footer-box">
            <h4 className="footer-box-title">CONNECT WITH US</h4>
            <div className="footer-contact">
              <p><span>☎</span> +91 940 061 3433</p>
              <p><span>✉</span> info@deepnetsoft.com</p>
            </div>
          </div>
          
          <div className="footer-box center-box">
            <div className="footer-logo">
              <span className="logo-deep">DEEP</span>
              <span className="logo-net"> NET </span>
              <span className="logo-soft">SOFT</span>
            </div>
            
          </div>
          
          <div className="footer-box">
            <h4 className="footer-box-title">FIND US</h4>
            <div className="footer-address">
              <p><span>📍</span> First floor, Geo infopark,</p>
              <p>Infopark EXPY, Kakkanad</p>
            </div>
          </div>
          
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container bottom-content">
          <p className="copyright">© 2026 Deepnetsoft Solutions. All rights reserved.</p>
          <div className="bottom-links">
            <a href="#terms">Terms & Conditions</a>
            <a href="#privacy">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
