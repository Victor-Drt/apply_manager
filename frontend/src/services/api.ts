import { getStoredAccessToken, logout } from "./auth"


export function getErrorMessage(payload: unknown, fallback: string) {
    if (payload && typeof payload === 'object' && 'detail' in payload) {
        const detail = (payload as { detail: unknown }).detail
        if (typeof detail === 'string') {
            return detail
        }
    }
    return fallback
}


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