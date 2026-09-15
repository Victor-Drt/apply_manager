import './App.css'
import HomePage from './pages/Home'
import Login from './pages/Login'
import { getStoredAccessToken } from './services/auth'
import { BrowserRouter, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import ApplicationsPage from './pages/Applications'

function AppShell() {
  const location = useLocation()
  const isLoggedIn = Boolean(getStoredAccessToken())

  return (
    <>
      {isLoggedIn ? (
        <aside className="navbar">
          <div className="profile-card-row">
            <img className="profile-image" src="https://ui-avatars.com/api/?name=Jhon+Doe" alt="Profile" />
            <h2 className="profile-name">John Doe</h2>
            <p className="profile-email">john.doe@example.com</p>
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
