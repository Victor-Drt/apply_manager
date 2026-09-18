import type { ApplicationCreate } from "../types/application"
import { getStoredAccessToken } from "./auth"

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'


export async function getApplications(offset: number = 0, limit: number = 10) {
    const response = await fetch(`${API_BASE_URL}/applications/?offset=${offset}&limit=${limit}`, {
        headers: {
            'Authorization': `Bearer ${getStoredAccessToken()}`
        }
    })
    return response.json()
}

export async function createApplication(application: ApplicationCreate) {
    const response = await fetch(`${API_BASE_URL}/applications/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${getStoredAccessToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(application)
    })

    if (!response.ok) {
        const payload = await response.json().catch(() => null)
        const detail = payload?.detail
        const message = typeof detail === 'string'
            ? detail
            : 'Não foi possível criar a candidatura.'
        throw new Error(message)
    }

    return response.json()
}

export async function getApplication(id: number) {
    const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
        headers: {
            'Authorization': `Bearer ${getStoredAccessToken()}`
        }
    })
    return response.json()
}