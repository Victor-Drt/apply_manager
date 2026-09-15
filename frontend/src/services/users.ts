import { getStoredAccessToken } from "./auth"

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'


export async function getUser() {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
        headers: {
            'Authorization': `Bearer ${getStoredAccessToken()}`
        }
    })
    return response.json()
}