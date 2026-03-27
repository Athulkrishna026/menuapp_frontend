import React from 'react'
import './Hero.css'

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>
      
      {/* Fallback image if background isn't available, but we will mostly rely on CSS background */}
      <div className="hero-content container">
        <h1 className="hero-title">MENU</h1>
        <p className="hero-subtitle">
          Please take a look at our menu featuring food, drinks, and brunch. If you'd like to <br className="desktop-br"/>
          place an order, use the "Order Online" button located below the menu.
        </p>
      </div>
    </section>
  )
}

export default Hero
