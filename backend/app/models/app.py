from datetime import datetime
from typing import List
from sqlalchemy import String, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database import Base

class App(Base):
    __tablename__ = "apps"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    app_id: Mapped[str] = mapped_column(String(255), unique=True, index=True) # e.g. com.traveloka.android
    name: Mapped[str] = mapped_column(String(255))
    developer: Mapped[str] = mapped_column(String(255), nullable=True)
    icon_url: Mapped[str] = mapped_column(String(1000), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    # Relationship to reviews
    reviews: Mapped[List["Review"]] = relationship("Review", back_populates="app", cascade="all, delete-orphan")
