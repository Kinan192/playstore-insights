from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import get_settings
from app.api.scraper import router as scraper_router
from app.api.apps import router as apps_router
from app.api.reviews import router as reviews_router
from app.api.stats import router as stats_router
from app.database import Base, engine
import app.models  # ensure models are loaded before create_all

settings = get_settings()

# Initialize Database Tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.APP_NAME,
    description="Backend API for Google Play Store Sentiment Analysis",
    version="1.0.0",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(scraper_router, prefix="/api/scraper", tags=["scraper"])
app.include_router(apps_router, prefix="/api/apps", tags=["apps"])
app.include_router(reviews_router, prefix="/api/reviews", tags=["reviews"])
app.include_router(stats_router, prefix="/api/stats", tags=["stats"])

@app.get("/health")
def health_check():
    return {"status": "ok", "app": settings.APP_NAME}
