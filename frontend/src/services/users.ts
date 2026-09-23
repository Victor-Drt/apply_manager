import { axiosClient } from "./client"

export async function getUser() {
    const response = await axiosClient.get('/users/me')

    if (response.status !== 200) {
        throw new Error('Não foi possível carregar os dados do usuário.')
    }

    return response.data
}