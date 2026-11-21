import { MoonIcon, SunIcon } from '../Icons'
import { useTheme } from '../../theme/useTheme'

interface ThemeToggleProps {
    compact?: boolean
}

const ThemeToggle = ({ compact = false }: ThemeToggleProps) => {
    const { theme, toggleTheme } = useTheme()
    const isDark = theme === 'dark'

    return (
        <button
            type="button"
            className={`theme-switch${isDark ? ' is-dark' : ''}${compact ? ' theme-switch--compact' : ''}`}
            onClick={toggleTheme}
            role="switch"
            aria-checked={isDark}
            aria-label={isDark ? 'Ativar tema claro' : 'Ativar tema escuro'}
        >
            {compact ? null : <span className="theme-switch__label">Tema escuro</span>}
            <span className="theme-switch__track">
                <span className="theme-switch__thumb">
                    {isDark ? <MoonIcon /> : <SunIcon />}
                </span>
            </span>
        </button>
    )
}

export default ThemeToggle
