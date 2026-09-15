import './App.css'
import HomePage from './pages/Home'
import Login from './pages/Login'
import { getStoredAccessToken } from './services/auth'
import { BrowserRouter, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import ApplicationsPage from './pages/Applications'
import { useEffect, useState } from 'react'
import { getUser } from './services/users'
import type { User } from './types/users'


function AppShell() {
  const location = useLocation()
  const isLoggedIn = Boolean(getStoredAccessToken())

  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    getUser().then(setUser).catch(setError).finally(() => setIsLoading(false))
  }, [])

  console.log(user)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <>
      {isLoggedIn ? (
        <aside className="navbar">
          <div className="profile-card-row">
            <img className="profile-image" src={user?.image} alt="Profile" />
            <h2 className="profile-name">{user?.name}</h2>
            <p className="profile-email">{user?.email}</p>
            <button className="profile-button"><i className="fa-solid fa-bars">:</i></button>
          </div>
          <nav className="navbar-list">
            <h2 className="navbar-title">Menu</h2>
            <ul className="navbar-list-items">
              <li><NavLink to="/home">Home</NavLink></li>
              <li><NavLink to="/teste-router">Teste Router</NavLink></li>
              <li><NavLink to="/applications">Applications</NavLink></li>
            </ul>
          </nav>
        </aside>
      ) : null}

      <Routes location={location}>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/applications" element={<ApplicationsPage />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}

export default App
