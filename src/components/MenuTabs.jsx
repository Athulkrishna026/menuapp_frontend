import React from 'react'
import './MenuTabs.css'

const MenuTabs = ({ menus = [], activeMenuId, setActiveMenuId }) => {
  return (
    <nav className="menu-tabs-container">
      <div className="container">
        <div className="menu-tabs">
          {menus.map((menu) => (
            <button
              key={menu.id}
              className={`menu-tab-btn ${activeMenuId === menu.id ? 'active' : ''}`}
              onClick={() => setActiveMenuId(menu.id)}
            >
              {menu.name}
            </button>
          ))}
          {menus.length === 0 && <span>No menus yet</span>}
        </div>
      </div>
    </nav>
  )
}

export default MenuTabs
