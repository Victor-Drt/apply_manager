from urllib.parse import urlencode

import httpx
from fastapi import HTTPException, status

from .config import (
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI,
    LINKEDIN_CLIENT_ID,
    LINKEDIN_CLIENT_SECRET,
    LINKEDIN_REDIRECT_URI,
)

PROVIDERS = {
    "google": {
        "authorize_url": "https://accounts.google.com/o/oauth2/v2/auth",
        "token_url": "https://oauth2.googleapis.com/token",
        "userinfo_url": "https://openidconnect.googleapis.com/v1/userinfo",
        "scope": "openid email profile",
        "client_id": lambda: GOOGLE_CLIENT_ID,
        "client_secret": lambda: GOOGLE_CLIENT_SECRET,
        "redirect_uri": lambda: GOOGLE_REDIRECT_URI,
    },
    "linkedin": {
        "authorize_url": "https://www.linkedin.com/oauth/v2/authorization",
        "token_url": "https://www.linkedin.com/oauth/v2/accessToken",
        "userinfo_url": "https://api.linkedin.com/v2/userinfo",
        "scope": "openid profile email",
        "client_id": lambda: LINKEDIN_CLIENT_ID,
        "client_secret": lambda: LINKEDIN_CLIENT_SECRET,
        "redirect_uri": lambda: LINKEDIN_REDIRECT_URI,
    },
}


def get_provider_config(provider: str) -> dict:
    if provider not in PROVIDERS:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Provedor OAuth não suportado: {provider}",
        )
    return PROVIDERS[provider]


def require_provider_credentials(provider: str) -> dict:
    config = get_provider_config(provider)
    client_id = config["client_id"]()
    client_secret = config["client_secret"]()
    if not client_id or not client_secret:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=(
                f"Credenciais do {provider} ainda não configuradas. "
                f"Defina {provider.upper()}_CLIENT_ID e {provider.upper()}_CLIENT_SECRET."
            ),
        )
    return {
        "authorize_url": config["authorize_url"],
        "token_url": config["token_url"],
        "userinfo_url": config["userinfo_url"],
        "scope": config["scope"],
        "client_id": client_id,
        "client_secret": client_secret,
        "redirect_uri": config["redirect_uri"](),
    }


def build_authorize_url(provider: str, state: str) -> str:
    config = require_provider_credentials(provider)
    params = {
        "client_id": config["client_id"],
        "redirect_uri": config["redirect_uri"],
        "response_type": "code",
        "scope": config["scope"],
        "state": state,
    }
    if provider == "google":
        params["access_type"] = "offline"
        params["prompt"] = "consent"
    return f"{config['authorize_url']}?{urlencode(params)}"


def exchange_code_for_tokens(provider: str, code: str) -> dict:
    config = require_provider_credentials(provider)
    with httpx.Client(timeout=15.0) as client:
        response = client.post(
            config["token_url"],
            data={
                "code": code,
                "client_id": config["client_id"],
                "client_secret": config["client_secret"],
                "redirect_uri": config["redirect_uri"],
                "grant_type": "authorization_code",
            },
            headers={"Accept": "application/json"},
        )
    if response.status_code >= 400:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Falha ao trocar o código OAuth do {provider}.",
        )
    return response.json()


def fetch_userinfo(provider: str, access_token: str) -> dict:
    config = require_provider_credentials(provider)
    with httpx.Client(timeout=15.0) as client:
        response = client.get(
            config["userinfo_url"],
            headers={"Authorization": f"Bearer {access_token}"},
        )
    if response.status_code >= 400:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Falha ao obter o perfil do usuário no {provider}.",
        )
    return response.json()


def normalize_userinfo(provider: str, userinfo: dict) -> dict:
    provider_user_id = userinfo.get("sub")
    email = userinfo.get("email")
    name = userinfo.get("name") or userinfo.get("given_name") or email
    picture = userinfo.get("picture")

    if not provider_user_id or not email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"O {provider} não retornou id e e-mail do usuário.",
        )
    return {
        "name": name,
        "email": email,
        "provider": provider,
        "provider_user_id": str(provider_user_id),
        "picture": picture,
    }
