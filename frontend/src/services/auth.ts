const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'
const ACCESS_TOKEN_KEY = 'apply_manager_access_token'
const TOKEN_TYPE_KEY = 'apply_manager_token_type'

export type OAuthCallbackResult =
  | { status: 'success'; accessToken: string; tokenType: string }
  | { status: 'error'; message: string }
  | { status: 'idle' }

export function getGoogleLoginUrl(): string {
  return `${API_BASE_URL}/auth/google`
}

export function startGoogleLogin(): void {
  window.location.assign(getGoogleLoginUrl())
}

export function getStoredAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function logout(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(TOKEN_TYPE_KEY)
}

export function consumeOAuthCallback(): OAuthCallbackResult {
  const url = new URL(window.location.href)
  const accessToken = url.searchParams.get('access_token')
  const tokenType = url.searchParams.get('token_type')
  const error = url.searchParams.get('error')
  const detail = url.searchParams.get('detail')

  if (!accessToken && !error && !detail) {
    return { status: 'idle' }
  }

  window.history.replaceState({}, document.title, url.pathname)

  if (error || detail || !accessToken) {
    return {
      status: 'error',
      message: detail || error || 'Não foi possível concluir o login com o Google.',
    }
  }

  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  localStorage.setItem(TOKEN_TYPE_KEY, tokenType || 'bearer')

  return {
    status: 'success',
    accessToken,
    tokenType: tokenType || 'bearer',
  }
}
