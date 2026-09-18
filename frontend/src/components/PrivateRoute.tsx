import { Navigate, Outlet } from "react-router-dom"
import { getStoredAccessToken } from "../services/auth"

const PrivateRoute = () => {
  const accessToken = getStoredAccessToken()

  if (!accessToken) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default PrivateRoute