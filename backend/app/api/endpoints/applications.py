from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Response, Request, Query
from sqlalchemy.orm import Session

import app.services.applications as applications_service
from app.api.deps import get_current_user, get_db
from app.models.users import User
from app.schemas.applications import (
    ApplicationCreate,
    ApplicationUpdate,
    ApplicationResponse,
    DashboardResponse,
    ListApplicationResponse,
)
from app.models.applications import ApplicationStatus

router = APIRouter()


@router.post("/", status_code=201)
def create_application(
    application: ApplicationCreate,
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
):
    return applications_service.create_application(db, current_user, application)


@router.get("/", status_code=200)
def get_applications(
    db: Annotated[Session, Depends(get_db)],
    request: Request,
    current_user: Annotated[User, Depends(get_current_user)],
    limit: int = Query(10, ge=1, le=100),
    offset: int = Query(0, ge=0),
    status: ApplicationStatus | None = None,
    search: str | None = Query(None, max_length=100),
) -> ListApplicationResponse:
    return applications_service.list_applications_resume(
        db, request, current_user.id, offset, limit, status, search
    )


@router.get("/dashboard", status_code=200)
def get_dashboard(
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
) -> DashboardResponse:
    return applications_service.get_dashboard(db, current_user.id)


@router.get("/{application_id}", status_code=200)
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


@router.put("/{application_id}", status_code=204)
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


@router.delete("/{application_id}", status_code=204)
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
