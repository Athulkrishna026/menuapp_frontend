import React from 'react'
import './OpeningHours.css'

const OpeningHours = () => {
  return (
    <section className="opening-hours-section">
      <div className="container">
        <div className="hours-box">
          <div className="hours-title-area">
            <span className="hours-script">Be there on time</span>
            <h2 className="hours-title">OPENING HOURS</h2>
          </div>
          
          <div className="hours-grid">
            <div className="hours-col">
              <h4 className="day-name">MONDAY-THURSDAY</h4>
              <p className="time">12 PM - 12 AM</p>
            </div>
            <div className="hours-col border-left">
              <h4 className="day-name">FRIDAY-SATURDAY</h4>
              <p className="time">12 PM - 01 AM</p>
            </div>
            <div className="hours-col border-left">
              <h4 className="day-name">SUNDAY</h4>
              <p className="time">12 PM - 11 PM</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OpeningHours
