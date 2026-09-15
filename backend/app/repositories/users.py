from datetime import datetime

from sqlalchemy.orm import Session

from ..models.users import User
from ..schemas.users import UserCreate


def get_user_by_id(db: Session, user_id: int) -> User | None:
    return db.query(User).filter(User.id == user_id).first()


def get_user_by_email(db: Session, email: str) -> User | None:
    return db.query(User).filter(User.email == email).first()


def get_user_by_provider(
    db: Session, provider: str, provider_user_id: str
) -> User | None:
    return (
        db.query(User)
        .filter(
            User.provider == provider,
            User.provider_user_id == provider_user_id,
        )
        .first()
    )


def create_user(db: Session, user_in: UserCreate) -> User:
    user = User(**user_in.model_dump())
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def update_user_profile(db: Session, user: User, name: str, email: str) -> User:
    user.name = name
    user.email = email
    user.updated_at = datetime.now()
    db.commit()
    db.refresh(user)
    return user
