import { apiFetch, getErrorMessage } from "./api"

export async function getUser() {
    const response = await apiFetch('/users/me')

    if (!response.ok) {
        const payload = await response.json().catch(() => null)
        throw new Error(
            getErrorMessage(
                payload,
                'Não foi possível carregar os dados do usuário.'
            )
        )
    }

    return response.json()
}