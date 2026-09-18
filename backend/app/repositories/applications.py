from sqlalchemy.orm import Session
from sqlalchemy import update
from ..models.applications import Application
from ..models.users import User


def create_application(db: Session, application: Application) -> Application:
    db.add(application)
    db.commit()
    db.refresh(application)
    return application


def get_applications(db: Session, user_id: int, offset: int, limit: int) -> list[Application]:
    return db.query(Application).filter(Application.user_id == user_id).offset(offset).limit(limit).all()


def get_application(db: Session, application_id: int, user_id: int) -> Application | None:
    return db.query(Application).filter(Application.id == application_id, Application.user_id == user_id).first()


def update_application(
    db: Session, application_id: int, user_id: int, data: dict
) -> Application | None:
    db_application = (
        db.query(Application)
        .filter(Application.id == application_id, Application.user_id == user_id)
        .first()
    )
    if db_application is None:
        return None

    for key, value in data.items():
        setattr(db_application, key, value)

    db.commit()
    db.refresh(db_application)
    return db_application


def delete_application(db: Session, application_id: int, user_id: int) -> None:
    db_application = (
        db.query(Application)
        .filter(Application.id == application_id, Application.user_id == user_id)
        .first()
    )
    if db_application is None:
        return None
    db.delete(db_application)
    db.commit()
    return db_application
