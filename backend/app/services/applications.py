from app.schemas.applications import (
    Application,
    ApplicationCreate,
    ApplicationResponse,
    ApplicationUpdate,
    DashboardResponse,
)
import app.repositories.applications as applications_repository
from datetime import datetime
from sqlalchemy.orm import Session
from app.models.applications import Application as ApplicationModel
from app.models.users import User


def create_application(
    db: Session, current_user: User, application: ApplicationCreate
) -> ApplicationResponse:
    db_application = ApplicationModel(
        **application.model_dump(), user_id=current_user.id
    )
    created = applications_repository.create_application(db, db_application)
    return ApplicationResponse.model_validate(created)


def get_applications(
    db: Session, user_id: int, offset: int, limit: int
) -> list[Application]:
    return applications_repository.get_applications(db, user_id, offset, limit)


def get_application(
    db: Session, application_id: int, user_id: int
) -> ApplicationResponse | None:
    application = applications_repository.get_application(db, application_id, user_id)
    if application is None:
        return None
    return ApplicationResponse.model_validate(application)


def update_application(
    db: Session,
    application_id: int,
    user_id: int,
    application: ApplicationUpdate,
) -> ApplicationResponse | None:
    update_data = application.model_dump(exclude_unset=True)
    updated = applications_repository.update_application(
        db, application_id, user_id, update_data
    )
    if updated is None:
        return None
    return ApplicationResponse.model_validate(updated)


def delete_application(db: Session, application_id: int, user_id: int) -> None:
    deleted = applications_repository.delete_application(db, application_id, user_id)
    if deleted is None:
        return None
    return deleted


def get_dashboard(db: Session, user_id: int) -> DashboardResponse:

    latest_applications = applications_repository.get_latest_applications(
        db, user_id, 5
    )
    total_applications = applications_repository.get_total_applications(db, user_id)
    applied_applications = applications_repository.get_applied_applications(db, user_id)
    interviews_applications = applications_repository.get_interviews_applications(
        db, user_id
    )
    rejected_applications = applications_repository.get_rejected_applications(
        db, user_id
    )

    return DashboardResponse(
        total_applications=total_applications,
        applied_applications=applied_applications,
        interviews_applications=interviews_applications,
        rejected_applications=rejected_applications,
        last_applications=latest_applications,
    )
