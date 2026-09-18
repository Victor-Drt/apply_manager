import './App.css'
import HomePage from './pages/Home'
import Login from './pages/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ApplicationsPage from './pages/Applications'
import ApplicationDetailPage from './pages/ApplicationDetail'
import ApplicationCreatePage from './pages/ApplicationCreate'
import AppLayout from './layouts/AppLayout'
import PrivateRoute from './components/PrivateRoute'

function AppShell() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<PrivateRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route
            path="/application/create"
            element={<ApplicationCreatePage />}
          />
          <Route
            path="/application/:id"
            element={<ApplicationDetailPage />}
          />
        </Route>
      </Route>
    </Routes>
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
