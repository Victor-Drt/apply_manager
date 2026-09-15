from datetime import timedelta

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.core.config import ACCESS_TOKEN_EXPIRE_MINUTES
from app.core.oauth import exchange_code_for_tokens, fetch_userinfo, normalize_userinfo
from app.core.security import create_access_token
from app.repositories import users as users_repository
from app.schemas.auth import Token
from app.schemas.users import UserCreate, UserResponse


def login_with_oauth_code(db: Session, provider: str, code: str) -> Token:
    tokens = exchange_code_for_tokens(provider, code)
    provider_access_token = tokens.get("access_token")
    if not provider_access_token:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="O provedor não retornou access_token.",
        )

    userinfo = fetch_userinfo(provider, provider_access_token)
    profile = normalize_userinfo(provider, userinfo)
    user = users_repository.get_user_by_provider(
        db, profile["provider"], profile["provider_user_id"]
    )
    if user is None:
        user = users_repository.get_user_by_email(db, profile["email"])
    if user is None:
        user = users_repository.create_user(db, UserCreate(**profile))
    else:
        user = users_repository.update_user_profile(
            db, user, name=profile["name"], email=profile["email"]
        )

    access_token = create_access_token(
        data={"sub": str(user.id)},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
    )
    return Token(access_token=access_token, token_type="bearer")


def to_user_response(user) -> UserResponse:
    return UserResponse.model_validate(user)
