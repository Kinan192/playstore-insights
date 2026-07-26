from fastapi import APIRouter, Depends, BackgroundTasks
from sqlalchemy.orm import Session
from typing import Optional
import datetime

from app.database import get_db, SessionLocal
from app.models.review import Review as ReviewModel
from app.models.app import App as AppModel
from app.schemas.review import ReviewListResponse
from app.services.scraper import fetch_reviews, get_app_details
from app.services.nlp import analyze_sentiment

router = APIRouter()


@router.get("/", response_model=ReviewListResponse)
def get_reviews(
    app_id: Optional[int] = None,
    sentiment: Optional[str] = None,
    score: Optional[int] = None,
    q: Optional[str] = None,
    offset: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    """Get reviews with filtering + pagination envelope."""
    query = db.query(ReviewModel)
    if app_id:
        query = query.filter(ReviewModel.app_id == app_id)
    if sentiment:
        query = query.filter(ReviewModel.sentiment == sentiment.lower())
    if score:
        query = query.filter(ReviewModel.score == score)
    if q:
        query = query.filter(ReviewModel.content.like(f"%{q}%"))

    total = query.count()
    items = query.order_by(ReviewModel.date.desc()).offset(offset).limit(limit).all()
    return {"total": total, "items": items}


@router.get("/scrape-status")
def scrape_status(app_id: int, db: Session = Depends(get_db)):
    """Cheap poll target: jumlah review tersimpan untuk satu app."""
    count = db.query(ReviewModel).filter(ReviewModel.app_id == app_id).count()
    return {"review_count": count}


def process_scraping_task(app_pk: int, count: int, lang: str, country: str):
    """Background task: fetch, prediksi sentiment, simpan. Session dibuat di dalam task."""
    db = SessionLocal()
    try:
        db_app = db.query(AppModel).filter(AppModel.id == app_pk).first()
        if not db_app:
            return
        raw_reviews, _ = fetch_reviews(app_id=db_app.app_id, count=count, lang=lang, country=country)

        existing_ids = {
            r[0]
            for r in db.query(ReviewModel.playstore_review_id)
            .filter(ReviewModel.app_id == db_app.id)
            .all()
        }

        new_reviews = []
        for r in raw_reviews:
            if r["reviewId"] in existing_ids:
                continue
            new_reviews.append(
                ReviewModel(
                    app_id=db_app.id,
                    playstore_review_id=r["reviewId"],
                    user_name=r["userName"],
                    user_avatar=r.get("userImage"),
                    content=r["content"] or "",
                    score=r["score"],
                    sentiment=analyze_sentiment(r["content"] or "", r["score"]),
                    date=r["at"],
                    created_at=datetime.datetime.utcnow(),
                )
            )

        if new_reviews:
            db.add_all(new_reviews)
            db.commit()
            print(f"Saved {len(new_reviews)} new reviews for {db_app.name}")
    except Exception as e:
        db.rollback()
        print(f"Error during scraping: {e}")
    finally:
        db.close()


@router.post("/scrape")
def trigger_scrape(
    app_id: str,
    title: str,
    count: int,
    region: str,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    """Trigger background scraping untuk satu play store app_id."""
    db_app = db.query(AppModel).filter(AppModel.app_id == app_id).first()
    if not db_app:
        db_app = AppModel(app_id=app_id, name=title, created_at=datetime.datetime.utcnow())
        db.add(db_app)
        db.commit()
        db.refresh(db_app)

    # lengkapi icon/developer dari Play Store bila kosong
    if not db_app.icon_url or not db_app.developer:
        try:
            details = get_app_details(app_id)
            db_app.icon_url = details.get("icon") or db_app.icon_url
            db_app.developer = details.get("developer") or db_app.developer
            db.commit()
        except Exception as e:
            print(f"Gagal ambil detail app {app_id}: {e}")

    country, lang = ("us", "en") if "US" in region else ("id", "id")

    background_tasks.add_task(process_scraping_task, db_app.id, count, lang, country)
    return {"message": f"Scraping started for {title} in background.", "app_id": db_app.id}
