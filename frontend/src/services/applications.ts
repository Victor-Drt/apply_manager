import type { ApplicationCreate, ApplicationResponse, ApplicationUpdate, DashboardResponse } from "../types/application"
import { apiFetch, getErrorMessage } from "./api"



export async function getApplications(
    offset: number = 0,
    limit: number = 10
) {
    const response = await apiFetch(`/applications/?offset=${offset}&limit=${limit}`)

    if (!response.ok) {
        const payload = await response.json().catch(() => null)

        throw new Error(
            getErrorMessage(
                payload,
                "Não foi possível carregar as candidaturas."
            )
        )
    }
    return response.json()
}

export async function createApplication(
    application: ApplicationCreate
) {
    const response = await apiFetch('/applications/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(application)
    })

    if (!response.ok) {
        const payload = await response.json().catch(() => null)
        throw new Error(
            getErrorMessage(
                payload,
                'Não foi possível criar a candidatura.'
            )
        )
    }

    return response.json()
}

export async function getApplication(
    id: number
): Promise<ApplicationResponse> {
    const response = await apiFetch(`/applications/${id}`)

    if (!response.ok) {
        const payload = await response.json().catch(() => null)
        throw new Error(
            getErrorMessage(
                payload,
                'Não foi possível carregar a candidatura.'
            )
        )
    }

    return response.json()
}

export async function updateApplication(
    id: number,
    application: ApplicationUpdate
) {
    const response = await apiFetch(`/applications/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(application)
    })

    if (response.status === 204) {
        return
    }

    if (!response.ok) {
        const payload = await response.json().catch(() => null)
        throw new Error(
            getErrorMessage(
                payload,
                'Não foi possível atualizar a candidatura.'
            )
        )
    }
}

export async function deleteApplication(
    id: number
) {
    const response = await apiFetch(`/applications/${id}`, {
        method: 'DELETE'
    })

    if (!response.ok) {
        const payload = await response.json().catch(() => null)
        throw new Error(
            getErrorMessage(
                payload,
                'Não foi possível excluir a candidatura.'
            )
        )
    }

    return
}

export async function getDashboard(): Promise<DashboardResponse> {
    const response = await apiFetch('/applications/dashboard')

    if (!response.ok) {
        const payload = await response.json().catch(() => null)
        throw new Error(
            getErrorMessage(
                payload,
                'Não foi possível carregar o dashboard.'
            )
        )
    }

    return response.json()
}