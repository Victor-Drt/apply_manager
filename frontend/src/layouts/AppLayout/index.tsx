import { Outlet } from "react-router-dom"
import Navbar from "../../components/Navbar"
import { useState, useEffect } from "react"
import type { User } from "../../types/users"
import { getUser } from "../../services/users"

function AppLayout() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    getUser()
      .then(setUser)
      .catch(console.error)
  }, [])


  return (
    <>
      <Navbar
        name={user?.name ?? ""}
        email={user?.email ?? ""}
        image={user?.image ?? ""}
      />

      <Outlet context={{ user }} />
    </>
  )
}

export default AppLayout