import './App.css'
import HomePage from './pages/Home'
import Login from './pages/Login'
import { getStoredAccessToken } from './services/auth'
import { BrowserRouter, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import ApplicationsPage from './pages/Applications'
import { useEffect, useState } from 'react'
import { getUser } from './services/users'
import type { User } from './types/users'
import ApplicationDetailPage from './pages/ApplicationDetail'
import ApplicationCreatePage from './pages/ApplicationCreate'

function AppShell() {
  const location = useLocation()
  const isLoggedIn = Boolean(getStoredAccessToken())

  // const [user, setUser] = useState<User | null>(null)
  // const [isLoading, setIsLoading] = useState(true)
  // const [error, setError] = useState<Error | null>(null)

  // useEffect(() => {
  //   getUser().then(setUser).catch(setError).finally(() => setIsLoading(false))
  // }, [])

  // console.log(user)

  // if (isLoading) return <div>Loading...</div>
  // if (error) return <div>Error: {error.message}</div>

  return (
    <>
      {isLoggedIn ? (
        <aside className="navbar">
          <div className="profile-card-row">
            <img className="profile-image" src="https://ui-avatars.com/api/?name=User+Name" alt="Profile" />
            <h2 className="profile-name">User Name</h2>
            <p className="profile-email">user@example.com</p>
            <button className="profile-button"><i className="fa-solid fa-bars">:</i></button>
          </div>
          <nav className="navbar-list">
            <h2 className="navbar-title">Menu</h2>
            <ul className="navbar-list-items">
              <li><NavLink to="/home">Home</NavLink></li>
              <li><NavLink to="/applications">Applications</NavLink></li>
            </ul>
          </nav>
        </aside>
      ) : null}

      <Routes location={location}>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/applications" element={<ApplicationsPage />} />
        <Route path="/application/create" element={<ApplicationCreatePage />} />
        <Route path="/application/:id" element={<ApplicationDetailPage />} />
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
