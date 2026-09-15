import { startGoogleLogin } from '../../services/auth'
import { useEffect, useState } from 'react'
import { consumeOAuthCallback, type OAuthCallbackResult } from '../../services/auth'
import NaoFoiPossivel from '../NaoFoiPossivel'
import { useNavigate, Navigate } from 'react-router-dom'

const Login = () => {

    const [oauthResult, setOauthResult] = useState<OAuthCallbackResult>({ status: 'idle' })
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const navigate = useNavigate()

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
        <div>
            {errorMessage ? <span>{errorMessage}</span> : null}

            <span>Faça Login com Google</span>
            <button type="button" onClick={startGoogleLogin}>
                <img src="https://download.logo.wine/logo/Google/Google-Logo.wine.png" alt="Google Logo" />
            </button>
        </div>
    )
}

export default Login