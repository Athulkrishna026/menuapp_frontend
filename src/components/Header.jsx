import React, { useState } from 'react'
import './Header.css'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="header">
      <div className="container header-content">
        <div className="logo-area">
          <span className="logo-text">
            <span className="logo-deep">DEEP</span>
            <span className="logo-net">NET</span>
            <span className="logo-soft">SOFT</span>
          </span>
        </div>
        
        <nav className={`desktop-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <a href="#home" onClick={toggleMenu}>HOME</a>
          <a href="#menu" className="active" onClick={toggleMenu}>MENU</a>
          <a href="#reservation" onClick={toggleMenu}>MAKE A RESERVATION</a>
          <a href="#contact" onClick={toggleMenu}>CONTACT US</a>
        </nav>
        
        <button className="mobile-menu-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}

export default Header
