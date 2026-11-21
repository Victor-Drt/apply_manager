export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'apply_manager_theme'

export function getStoredTheme(): Theme {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    return stored === 'dark' ? 'dark' : 'light'
}

export function applyTheme(theme: Theme) {
    document.documentElement.dataset.theme = theme
    localStorage.setItem(THEME_STORAGE_KEY, theme)
}
