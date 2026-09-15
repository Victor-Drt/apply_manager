from ..db.base import Base
from sqlalchemy import Integer, String, DateTime, Text, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime


class Application(Base):
    __tablename__ = "applications"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False,
    )
    job_title: Mapped[str] = mapped_column(String(255))
    company_name: Mapped[str] = mapped_column(String(100), nullable=True)
    source: Mapped[str] = mapped_column(String(100))
    application_platform: Mapped[str] = mapped_column(String(100))
    job_url: Mapped[str] = mapped_column(String(2048))
    status: Mapped[str] = mapped_column(String(100))
    applied_at: Mapped[datetime] = mapped_column(DateTime, nullable=True)
    notes: Mapped[str] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=True,
        default=datetime.now,
        onupdate=datetime.now,
    )

    user: Mapped["User"] = relationship(
        back_populates="applications"
    )