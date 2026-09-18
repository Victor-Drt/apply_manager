from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session

import app.services.applications as applications_service
from app.api.deps import get_current_user, get_db
from app.models.users import User
from app.schemas.applications import (
    ApplicationCreate,
    ApplicationUpdate,
    ApplicationResponse,
    DashboardResponse,
)


router = APIRouter()


@router.post("/")
def create_application(
    application: ApplicationCreate,
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
):
    return applications_service.create_application(db, current_user, application)


@router.get("/")
def get_applications(
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
    offset: int = 0,
    limit: int = 10,
) -> list[ApplicationResponse]:
    return applications_service.get_applications(db, current_user.id, offset, limit)


@router.get("/dashboard")
def get_dashboard(
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
) -> DashboardResponse:
    return applications_service.get_dashboard(db, current_user.id)


@router.get("/{application_id}")
def get_application(
    application_id: int,
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
) -> ApplicationResponse:
    application = applications_service.get_application(
        db, application_id, current_user.id
    )
    if application is None:
        raise HTTPException(status_code=404, detail="Candidatura não encontrada.")
    return application


@router.put("/{application_id}")
def update_application(
    application_id: int,
    application: ApplicationUpdate,
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
):
    result = applications_service.update_application(
        db, application_id, current_user.id, application
    )
    if result:
        return Response(status_code=204)
    return Response(status_code=404)


@router.delete("/{application_id}")
def delete_application(
    application_id: int,
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
):
    result = applications_service.delete_application(
        db, application_id, current_user.id
    )
    if result:
        return Response(status_code=204)
    return Response(status_code=404)
