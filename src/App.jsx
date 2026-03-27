import { useEffect, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import MenuTabs from './components/MenuTabs'
import MenuCatalog from './components/MenuCatalog'
import OpeningHours from './components/OpeningHours'
import Footer from './components/Footer'
import './App.css'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5001/api'

const flattenMenus = (menus, depth = 0) =>
  menus.reduce((acc, menu) => {
    acc.push({ ...menu, depth })
    if (menu.children?.length > 0) {
      acc.push(...flattenMenus(menu.children, depth + 1))
    }
    return acc
  }, [])

const findMenu = (menus, id) => {
  for (const menu of menus) {
    if (menu.id === id) return menu
    if (menu.children?.length > 0) {
      const found = findMenu(menu.children, id)
      if (found) return found
    }
  }
  return null
}

function App() {
  const [menus, setMenus] = useState([])
  const [activeMenuId, setActiveMenuId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [newMenuName, setNewMenuName] = useState('')
  const [newMenuDesc, setNewMenuDesc] = useState('')
  const [newMenuParentId, setNewMenuParentId] = useState('')
  const [newItemName, setNewItemName] = useState('')
  const [newItemDesc, setNewItemDesc] = useState('')
  const [newItemPrice, setNewItemPrice] = useState('')

  const loadMenus = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_BASE}/menus`)
      const data = await res.json()
      setMenus(data)
      if (!activeMenuId && data.length > 0) {
        setActiveMenuId(data[0].id)
      }
    } catch (err) {
      setError('Unable to load menus')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMenus()
  }, [])

  const addMenu = async (e) => {
    e.preventDefault()
    if (!newMenuName.trim()) {
      setError('Menu name is required')
      return
    }

    try {
      setLoading(true)
      const res = await fetch(`${API_BASE}/menus`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newMenuName,
          description: newMenuDesc,
          parentId: newMenuParentId ? Number(newMenuParentId) : null,
        }),
      })

      if (!res.ok) {
        const body = await res.json()
        throw new Error(body.error || 'Failed to create menu')
      }

      setNewMenuName('')
      setNewMenuDesc('')
      setNewMenuParentId('')
      await loadMenus()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const addItem = async (e) => {
    e.preventDefault()
    if (!activeMenuId) {
      setError('Select a menu first')
      return
    }
    if (!newItemName.trim()) {
      setError('Item name is required')
      return
    }

    try {
      setLoading(true)
      const res = await fetch(`${API_BASE}/menus/${activeMenuId}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newItemName,
          description: newItemDesc,
          price: newItemPrice ? Number(newItemPrice) : null,
        }),
      })

      if (!res.ok) {
        const body = await res.json()
        throw new Error(body.error || 'Failed to create item')
      }

      setNewItemName('')
      setNewItemDesc('')
      setNewItemPrice('')
      await loadMenus()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const activeMenu = findMenu(menus, activeMenuId)
  const topMenus = menus

  return (
    <div className="app-container">
      <Header />
      <main>
        <Hero />

        <section className="controls section-padding">
          <div className="container">
            <h3>Create Menu (supports nested parent menus)</h3>
            <form className="form-row" onSubmit={addMenu}>
              <input
                placeholder="Menu name"
                value={newMenuName}
                onChange={(e) => setNewMenuName(e.target.value)}
              />
              <input
                placeholder="Description"
                value={newMenuDesc}
                onChange={(e) => setNewMenuDesc(e.target.value)}
              />
              <select value={newMenuParentId} onChange={(e) => setNewMenuParentId(e.target.value)}>
                <option value="">Top-level menu</option>
                {flattenMenus(menus).map((menu) => (
                  <option key={menu.id} value={menu.id}>
                    {Array(menu.depth).fill('  ').join('')}{menu.name}
                  </option>
                ))}
              </select>
              <button type="submit" disabled={loading}>Create Menu</button>
            </form>

            <h3>Add Item to selected menu</h3>
            <form className="form-row" onSubmit={addItem}>
              <input
                placeholder="Item name"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
              />
              <input
                placeholder="Item description"
                value={newItemDesc}
                onChange={(e) => setNewItemDesc(e.target.value)}
              />
              <input
                placeholder="Price"
                type="number"
                step="0.01"
                value={newItemPrice}
                onChange={(e) => setNewItemPrice(e.target.value)}
              />
              <button type="submit" disabled={loading || !activeMenu}>Add Item</button>
            </form>

            {error && <p className="error-message">{error}</p>}
            {loading && <p>Loading...</p>}
          </div>
        </section>

        <MenuTabs menus={topMenus} activeMenuId={activeMenuId} setActiveMenuId={setActiveMenuId} />
        <MenuCatalog menu={activeMenu} onMenuClick={setActiveMenuId} />
        <OpeningHours />
      </main>
      <Footer />
    </div>
  )
}

export default App
