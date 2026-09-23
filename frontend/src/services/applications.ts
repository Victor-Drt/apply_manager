import type { ApplicationCreate, ApplicationUpdate } from "../types/application"
import { axiosClient } from "./client"

export async function getApplications(
    offset: number = 0,
    limit: number = 10
) {
    const response = await axiosClient.get(`/applications/?offset=${offset}&limit=${limit}`)
    return response.data
}

export async function createApplication(
    application: ApplicationCreate
) {
    const response = await axiosClient.post('/applications/', application)
    if (response.status === 201) {
        return response.data
    }
    throw new Error('Não foi possível criar a candidatura.')
}

export async function getApplication(
    id: number
) {
    const response = await axiosClient.get(`/applications/${id}`)
    if (response.status === 200) {
        return response.data
    }
    throw new Error('Não foi possível carregar a candidatura.')
}

export async function updateApplication(
    id: number,
    application: ApplicationUpdate
) {
    const response = await axiosClient.put(`/applications/${id}`, application)
    if (response.status === 204) {
        return
    }
    throw new Error('Não foi possível atualizar a candidatura.')
}


export async function deleteApplication(
    id: number
) {
    const response = await axiosClient.delete(`/applications/${id}`)
    if (response.status === 204) {
        return
    }
    throw new Error('Não foi possível excluir a candidatura.')
}


export async function getDashboard() {
    const response = await axiosClient.get('/applications/dashboard')
    if (response.status === 200) {
        return response.data
    }
    throw new Error('Não foi possível carregar o dashboard.');
}
