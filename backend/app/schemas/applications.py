from pydantic import BaseModel, ConfigDict
from datetime import datetime


class Application(BaseModel):
    job_title: str
    company_name: str | None = None
    source: str
    application_platform: str
    job_url: str
    status: str = "saved"
    applied_at: datetime | None = None
    notes: str | None = None


class ApplicationCreate(Application):
    pass


class ApplicationUpdate(BaseModel):
    job_title: str | None = None
    company_name: str | None = None
    source: str | None = None
    application_platform: str | None = None
    job_url: str | None = None
    status: str | None = None
    applied_at: datetime | None = None
    notes: str | None = None


class ApplicationResponse(BaseModel):
    id: int
    user_id: int
    job_title: str
    company_name: str | None = None
    source: str
    status: str
    applied_at: datetime | None = None
    created_at: datetime
    updated_at: datetime | None = None

    model_config = ConfigDict(from_attributes=True)