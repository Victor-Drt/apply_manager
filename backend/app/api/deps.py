from typing import Annotated

from fastapi import Depends, HTTPException, status
from jwt.exceptions import InvalidTokenError
from sqlalchemy.orm import Session

from app.core.security import decode_access_token, oauth2_scheme
from app.db.session import SessionLocal
from app.models.users import User
from app.repositories import users as users_repository
from app.schemas.auth import TokenData


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)],
    db: Annotated[Session, Depends(get_db)],
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = decode_access_token(token)
        user_id = payload.get("sub")
        if user_id is None:
            raise credentials_exception
        token_data = TokenData(user_id=int(user_id))
    except (InvalidTokenError, ValueError, TypeError):
        raise credentials_exception

    user = users_repository.get_user_by_id(db, token_data.user_id)
    if user is None:
        raise credentials_exception
    return user
