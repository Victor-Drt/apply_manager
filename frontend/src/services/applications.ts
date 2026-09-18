import type { ApplicationCreate, ApplicationResponse, ApplicationUpdate } from "../types/application"
import { getStoredAccessToken } from "./auth"

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'

function getErrorMessage(payload: unknown, fallback: string) {
    if (payload && typeof payload === 'object' && 'detail' in payload) {
        const detail = (payload as { detail: unknown }).detail
        if (typeof detail === 'string') {
            return detail
        }
    }
    return fallback
}

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
        throw new Error(getErrorMessage(payload, 'Não foi possível criar a candidatura.'))
    }

    return response.json()
}

export async function getApplication(id: number): Promise<ApplicationResponse> {
    const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
        headers: {
            'Authorization': `Bearer ${getStoredAccessToken()}`
        }
    })

    if (!response.ok) {
        const payload = await response.json().catch(() => null)
        throw new Error(getErrorMessage(payload, 'Não foi possível carregar a candidatura.'))
    }

    return response.json()
}

export async function updateApplication(id: number, application: ApplicationUpdate) {
    const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${getStoredAccessToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(application)
    })

    if (response.status === 204) {
        return
    }

    if (!response.ok) {
        const payload = await response.json().catch(() => null)
        throw new Error(getErrorMessage(payload, 'Não foi possível atualizar a candidatura.'))
    }
}

export async function deleteApplication(id: number) {
    const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${getStoredAccessToken()}`
        }
    })
    return response.json()
}