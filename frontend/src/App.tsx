import './App.css'
import HomePage from './pages/Home'
import TesteRouter from './pages/TesteRouter'
import Login from './pages/Login'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>

      {/* navigation */}
      <nav>
        <Link to="/home">Home</Link>
      </nav>

      {/* routes */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/teste-router" element={<TesteRouter />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
