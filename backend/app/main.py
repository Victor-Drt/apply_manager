from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware

from .api.router import api_router
from .core.config import FRONTEND_ORIGINS, SECRET_KEY
from .db.base import Base
from .db.session import engine
from .models.applications import Application  # noqa: F401
from .models.users import User  # noqa: F401

app = FastAPI()

app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY)
app.add_middleware(
    CORSMiddleware,
    allow_origins=FRONTEND_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(api_router, prefix="/api/v1")
