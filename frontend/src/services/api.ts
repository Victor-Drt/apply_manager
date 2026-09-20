import { getStoredAccessToken, logout } from "./auth"

const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1"

export async function apiFetch(
    endpoint: string,
    options: RequestInit = {}
) {
    const token = getStoredAccessToken()

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            ...options.headers,
            ...(token && {
                Authorization: `Bearer ${token}`,
            }),
        },
    })

    if (response.status === 401) {
        logout();
    }

    return response
}