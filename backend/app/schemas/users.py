from datetime import datetime

from pydantic import BaseModel, ConfigDict


class UserCreate(BaseModel):
    name: str
    email: str
    provider: str
    provider_user_id: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    provider: str
    provider_user_id: str
    created_at: datetime
    updated_at: datetime | None = None

    model_config = ConfigDict(from_attributes=True)
