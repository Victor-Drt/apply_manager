import { startGoogleLogin, consumeOAuthCallback, getStoredAccessToken, type OAuthCallbackResult } from '../../services/auth'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import './styles.css'

const Login = () => {
    const [oauthResult, setOauthResult] = useState<OAuthCallbackResult>({ status: 'idle' })
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    useEffect(() => {
        const callbackTimer = window.setTimeout(() => {
            const result = consumeOAuthCallback()
            setOauthResult(result)

            if (result.status === 'error') {
                setErrorMessage(result.message)
            }
        }, 0)

        return () => window.clearTimeout(callbackTimer)
    }, [])

    if (getStoredAccessToken() || oauthResult.status === 'success') {
        return <Navigate to="/home" replace />;
    }

    return (
        <main className="login">
            <header className="login-topbar">
                <div className="login-brand">
                    <span className="login-brand-mark" aria-hidden="true">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                    Apply Manager
                </div>

                <button type="button" className="login-topbar-button" onClick={startGoogleLogin}>
                    Entrar com Google
                </button>
            </header>

            <section className="login-hero">
                <div className="login-float login-float-note" aria-hidden="true">
                    <p>Anote o que importa em cada vaga e avance sem perder o fio da meada.</p>
                </div>

                <div className="login-float login-float-check" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M5 12.5 9.5 17 19 7.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                <div className="login-float login-float-reminder" aria-hidden="true">
                    <div className="login-float-reminder-icon">
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle cx="12" cy="13" r="7" stroke="currentColor" strokeWidth="1.8" />
                            <path d="M12 10v3.2l2 1.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                            <path d="M9 5h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                    </div>
                    <strong>Lembretes</strong>
                    <span>Entrevista hoje</span>
                    <em>14:00 – 14:45</em>
                </div>

                <div className="login-float login-float-list" aria-hidden="true">
                    <strong>Candidaturas de hoje</strong>
                    <div className="login-float-row">
                        <span className="login-float-dot login-float-dot--applied"></span>
                        <div>
                            <p>Desenvolvedor Backend</p>
                            <small>Empresa Alpha</small>
                        </div>
                    </div>
                    <div className="login-float-row">
                        <span className="login-float-dot login-float-dot--interview"></span>
                        <div>
                            <p>Full Stack Pleno</p>
                            <small>Empresa Beta</small>
                        </div>
                    </div>
                </div>

                <div className="login-float login-float-status" aria-hidden="true">
                    <strong>Status em um olhar</strong>
                    <div className="login-float-pills">
                        <span>Salva</span>
                        <span>Aplicada</span>
                        <span>Entrevista</span>
                    </div>
                </div>

                <div className="login-hero-copy">
                    <div className="login-hero-mark" aria-hidden="true">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <h1>
                        Organize, acompanhe e avance
                        <span>tudo em um só lugar</span>
                    </h1>
                    <p>
                        Gerencie vagas, empresas, status e anotações da busca por emprego — sem planilha.
                    </p>

                    {errorMessage ? (
                        <p className="login-error" role="alert">{errorMessage}</p>
                    ) : null}

                    <button type="button" className="login-cta" onClick={startGoogleLogin}>
                        <svg className="login-cta-icon" viewBox="0 0 24 24" aria-hidden="true">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continuar com Google
                    </button>

                    <p className="login-hint">
                        Sem senha e sem formulário extra: se for sua primeira vez, a conta é criada na hora.
                    </p>
                </div>
            </section>
        </main>
    )
}

export default Login
