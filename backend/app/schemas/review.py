from datetime import datetime
from pydantic import BaseModel, ConfigDict
from typing import Optional

class ReviewBase(BaseModel):
    playstore_review_id: str
    user_name: str
    user_avatar: Optional[str] = None
    content: str
    score: int
    sentiment: Optional[str] = None
    date: datetime

class ReviewCreate(ReviewBase):
    app_id: int

class ReviewResponse(ReviewBase):
    id: int
    app_id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ReviewListResponse(BaseModel):
    total: int
    items: list[ReviewResponse]
