from typing import Annotated

from fastapi import APIRouter, Depends

from app.api.deps import get_current_user
from app.models.users import User
from app.schemas.users import UserResponse
from app.services.auth import to_user_response

router = APIRouter()


@router.get("/me", response_model=UserResponse)
def read_users_me(
    current_user: Annotated[User, Depends(get_current_user)],
):
    return to_user_response(current_user)
