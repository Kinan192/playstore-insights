from datetime import datetime
from pydantic import BaseModel, ConfigDict
from typing import Optional

class AppBase(BaseModel):
    app_id: str
    name: str
    developer: Optional[str] = None
    icon_url: Optional[str] = None

class AppCreate(AppBase):
    pass

class AppResponse(AppBase):
    id: int
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)
