from sqlalchemy.orm import Session
from sqlalchemy import or_, update
from ..models.applications import Application
from ..models.users import User
from ..models.applications import ApplicationStatus


def _applications_query(
    db: Session, user_id: int, status: str | None, search: str | None
):
    query = db.query(Application).filter(Application.user_id == user_id)

    if status:
        query = query.filter(Application.status == status)

    term = search.strip() if search else ""
    if term:
        escaped = term.replace("\\", "\\\\").replace("%", "\\%").replace("_", "\\_")
        pattern = f"%{escaped}%"
        query = query.filter(
            or_(
                Application.job_title.ilike(pattern, escape="\\"),
                Application.company_name.ilike(pattern, escape="\\"),
                Application.location.ilike(pattern, escape="\\"),
            )
        )

    return query


def create_application(db: Session, application: Application) -> Application:
    db.add(application)
    db.commit()
    db.refresh(application)
    return application


def get_applications(
    db: Session,
    user_id: int,
    offset: int,
    limit: int,
    status: str | None = None,
    search: str | None = None,
) -> list[Application]:

    query = _applications_query(db, user_id, status, search)

    items = (
        query.order_by(
            Application.updated_at.desc().nullslast(),
            Application.applied_at.desc().nullslast(),
            Application.created_at.desc(),
        )
        .offset(offset)
        .limit(limit)
        .all()
    )

    return items


def count_applications(
    db: Session,
    user_id: int,
    status: str | None = None,
    search: str | None = None,
) -> int:
    return _applications_query(db, user_id, status, search).count()



def get_application(
    db: Session, application_id: int, user_id: int
) -> Application | None:
    return (
        db.query(Application)
        .filter(Application.id == application_id, Application.user_id == user_id)
        .first()
    )


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


def get_latest_applications(db: Session, user_id: int, limit: int) -> list[Application]:
    return (
        db.query(Application)
        .filter(Application.user_id == user_id)
        .order_by(Application.applied_at.desc())
        .limit(limit)
        .all()
    )


def get_total_applications(db: Session, user_id: int) -> int:
    return db.query(Application).filter(Application.user_id == user_id).count()


def get_saved_applications(db: Session, user_id: int) -> int:
    return (
        db.query(Application)
        .filter(
            Application.user_id == user_id,
            Application.status == ApplicationStatus.SAVED,
        )
        .count()
    )


def get_applied_applications(db: Session, user_id: int) -> int:
    return (
        db.query(Application)
        .filter(
            Application.user_id == user_id,
            Application.status == ApplicationStatus.APPLIED,
        )
        .count()
    )


def get_interviews_applications(db: Session, user_id: int) -> int:
    return (
        db.query(Application)
        .filter(
            Application.user_id == user_id,
            Application.status == ApplicationStatus.INTERVIEW,
        )
        .count()
    )


def get_rejected_applications(db: Session, user_id: int) -> int:
    return (
        db.query(Application)
        .filter(
            Application.user_id == user_id,
            Application.status == ApplicationStatus.REJECTED,
        )
        .count()
    )
