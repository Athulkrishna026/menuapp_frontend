import React from 'react'
import './MenuCatalog.css'

const MenuCatalog = ({ menu, onMenuClick }) => {
  if (!menu) {
    return (
      <section className="menu-catalog section-padding">
        <div className="container">
          <p>Select a menu at the top or create a new one.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="menu-catalog section-padding">
      <div className="container">
        <h2 className="category-title">{menu.name}</h2>
        {menu.description && <p className="category-desc">{menu.description}</p>}

        {menu.children?.length > 0 && (
          <div className="submenu-list">
            <h3>Sub-menus</h3>
            <ul>
              {menu.children.map((child) => (
                <li key={child.id}>
                  <button className="submenu-btn" onClick={() => onMenuClick(child.id)}>
                    {child.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {menu.items?.length > 0 ? (
          <div className="menu-items">
            {menu.items.map((item) => (
              <div className="menu-item-row" key={item.id}>
                <div className="item-header">
                  <h3 className="item-name">{item.name}</h3>
                  <div className="item-dots" />
                  <span className="item-price">{item.price != null ? `${item.price.toFixed(2)}` : 'N/A'}</span>
                </div>
                {item.description && <p className="item-desc">{item.description}</p>}
              </div>
            ))}
          </div>
        ) : (
          <p>No items yet in this menu.</p>
        )}
      </div>
    </section>
  )
}

export default MenuCatalog
