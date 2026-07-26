from datetime import datetime
from sqlalchemy import String, Integer, Text, DateTime, ForeignKey, Index
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database import Base

class Review(Base):
    __tablename__ = "reviews"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    app_id: Mapped[int] = mapped_column(ForeignKey("apps.id", ondelete="CASCADE"), index=True)
    playstore_review_id: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    
    user_name: Mapped[str] = mapped_column(String(255))
    user_avatar: Mapped[str] = mapped_column(String(1000), nullable=True)
    content: Mapped[str] = mapped_column(Text)
    score: Mapped[int] = mapped_column(Integer) # 1 to 5
    sentiment: Mapped[str] = mapped_column(String(50), nullable=True) # POSITIVE, NEUTRAL, NEGATIVE
    date: Mapped[datetime] = mapped_column(DateTime)
    
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    # Relationship to App
    app: Mapped["App"] = relationship("App", back_populates="reviews")

    # Add composite index if needed for common filtering
    __table_args__ = (
        Index('idx_app_sentiment', 'app_id', 'sentiment'),
    )
