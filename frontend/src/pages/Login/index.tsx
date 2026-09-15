import { startGoogleLogin } from '../../services/auth'
import { useEffect, useState } from 'react'
import { consumeOAuthCallback, type OAuthCallbackResult } from '../../services/auth'
import { Navigate } from 'react-router-dom'
import './styles.css'

const Login = () => {

    const [oauthResult, setOauthResult] = useState<OAuthCallbackResult>({ status: 'idle' })
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    useEffect(() => {
        const callbackTimer = window.setTimeout(() => {
            setOauthResult(consumeOAuthCallback())
        }, 0)

        return () => window.clearTimeout(callbackTimer)
    }, [])

    if (oauthResult.status === 'success') {
        return <Navigate to="/home" replace />;
    }

    if (oauthResult.status === 'error') {
        setErrorMessage(oauthResult.message)
    }

    return (
        <main className="login">
            <div className="login-card">
                {errorMessage ? <span className="login-error">{errorMessage}</span> : null}

                <span className="login-title">Faça Login com Google</span>
                <button type="button" className="login-google" onClick={startGoogleLogin}>
                    <img src="https://download.logo.wine/logo/Google/Google-Logo.wine.png" alt="" />
                    Google
                </button>
            </div>
        </main>
    )
}

export default Login