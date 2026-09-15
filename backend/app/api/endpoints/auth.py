import secrets
from typing import Annotated, Literal
from urllib.parse import urlencode

from fastapi import APIRouter, Depends, HTTPException, Request, status
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.core.config import FRONTEND_REDIRECT_URI
from app.core.oauth import build_authorize_url
from app.schemas.auth import OAuthCode, Token
from app.services import auth as auth_service

router = APIRouter()

Provider = Literal["google", "linkedin"]


def _validate_state(request: Request, state: str | None) -> None:
    expected_state = request.session.get("oauth_state")
    request.session.pop("oauth_state", None)
    if not state or not expected_state or state != expected_state:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="State OAuth inválido.",
        )


def _token_response(token: Token):
    if FRONTEND_REDIRECT_URI:
        query = urlencode(
            {"access_token": token.access_token, "token_type": token.token_type}
        )
        return RedirectResponse(f"{FRONTEND_REDIRECT_URI}?{query}")
    return token


@router.get("/{provider}")
def oauth_login(provider: Provider, request: Request):
    state = secrets.token_urlsafe(32)
    request.session["oauth_state"] = state
    return RedirectResponse(build_authorize_url(provider, state))


@router.get("/{provider}/callback")
def oauth_callback(
    provider: Provider,
    request: Request,
    db: Annotated[Session, Depends(get_db)],
    code: str | None = None,
    state: str | None = None,
):
    if not code:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Código OAuth não informado.",
        )
    _validate_state(request, state)
    token = auth_service.login_with_oauth_code(db, provider, code)
    return _token_response(token)


@router.post("/{provider}", response_model=Token)
def oauth_exchange(
    provider: Provider,
    payload: OAuthCode,
    db: Annotated[Session, Depends(get_db)],
):
    return auth_service.login_with_oauth_code(db, provider, payload.code)
