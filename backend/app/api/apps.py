from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.app import App as AppModel
from app.schemas.app import AppCreate, AppResponse
import datetime

router = APIRouter()

@router.get("/", response_model=List[AppResponse])
def get_apps(db: Session = Depends(get_db)):
    """Get all tracked apps."""
    return db.query(AppModel).all()

@router.post("/", response_model=AppResponse)
def create_app(app: AppCreate, db: Session = Depends(get_db)):
    """Register a new app to track."""
    db_app = db.query(AppModel).filter(AppModel.app_id == app.app_id).first()
    if db_app:
        raise HTTPException(status_code=400, detail="App already registered")
    
    new_app = AppModel(
        app_id=app.app_id,
        name=app.name,
        developer=app.developer,
        icon_url=app.icon_url,
        created_at=datetime.datetime.utcnow()
    )
    db.add(new_app)
    db.commit()
    db.refresh(new_app)
    return new_app
