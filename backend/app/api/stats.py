"""
Endpoint agregasi statistik untuk dashboard, insights, dan competitors.
"""
import datetime
from collections import Counter
from typing import Optional

from fastapi import APIRouter, Depends
from sqlalchemy import case, func
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.app import App
from app.models.review import Review

router = APIRouter()

_pos = func.sum(case((Review.sentiment == "positif", 1), else_=0))
_neu = func.sum(case((Review.sentiment == "netral", 1), else_=0))
_neg = func.sum(case((Review.sentiment == "negatif", 1), else_=0))


@router.get("/overview")
def overview(db: Session = Depends(get_db)):
    """KPI global: total apps, total reviews, avg score, breakdown sentiment."""
    total_apps = db.query(func.count(App.id)).scalar()
    total, avg_score, pos, neu, neg = db.query(
        func.count(Review.id), func.avg(Review.score), _pos, _neu, _neg
    ).one()
    return {
        "total_apps": total_apps or 0,
        "total_reviews": total or 0,
        "avg_score": round(float(avg_score), 2) if avg_score is not None else 0,
        "sentiment": {"positif": int(pos or 0), "netral": int(neu or 0), "negatif": int(neg or 0)},
    }


@router.get("/apps")
def app_stats(db: Session = Depends(get_db)):
    """Statistik per app: counts, avg score, breakdown — untuk list app, tabel competitor, market share."""
    rows = (
        db.query(
            App,
            func.count(Review.id),
            func.avg(Review.score),
            _pos,
            _neu,
            _neg,
        )
        .outerjoin(Review, Review.app_id == App.id)
        .group_by(App.id)
        .all()
    )
    result = []
    for app_obj, count, avg_score, pos, neu, neg in rows:
        count = int(count or 0)
        pos = int(pos or 0)
        result.append(
            {
                "id": app_obj.id,
                "app_id": app_obj.app_id,
                "name": app_obj.name,
                "developer": app_obj.developer,
                "icon_url": app_obj.icon_url,
                "review_count": count,
                "avg_score": round(float(avg_score), 2) if avg_score is not None else 0,
                "sentiment": {"positif": pos, "netral": int(neu or 0), "negatif": int(neg or 0)},
                "positive_ratio": round(pos * 100 / count, 1) if count else 0,
            }
        )
    return result


@router.get("/sentiment-trend")
def sentiment_trend(
    app_ids: Optional[str] = None,
    days: int = 30,
    db: Session = Depends(get_db),
):
    """Jumlah review per tanggal per sentiment, days terakhir. app_ids = CSV id internal."""
    since = datetime.datetime.utcnow() - datetime.timedelta(days=days)
    query = db.query(
        func.date(Review.date), Review.sentiment, func.count(Review.id)
    ).filter(Review.date >= since)
    if app_ids:
        ids = [int(i) for i in app_ids.split(",") if i.strip().isdigit()]
        if ids:
            query = query.filter(Review.app_id.in_(ids))
    rows = query.group_by(func.date(Review.date), Review.sentiment).all()

    by_date: dict = {}
    for d, sent, cnt in rows:
        key = d.isoformat() if hasattr(d, "isoformat") else str(d)
        entry = by_date.setdefault(key, {"date": key, "positif": 0, "netral": 0, "negatif": 0})
        if sent in ("positif", "netral", "negatif"):
            entry[sent] = cnt
    return sorted(by_date.values(), key=lambda e: e["date"])


@router.get("/keywords")
def top_keywords(
    app_id: Optional[int] = None,
    sentiment: Optional[str] = None,
    limit: int = 15,
    db: Session = Depends(get_db),
):
    """Top keywords dari content review (clean + slang + stopword, tanpa stemming).
    ponytail: hitung ulang per request atas max 2000 review terbaru — cukup di skala ini;
    tambah cache/kolom token bila review > ~50k."""
    from app.services.preprocessing import clean_for_keywords

    query = db.query(Review.content, Review.sentiment)
    if app_id:
        query = query.filter(Review.app_id == app_id)
    if sentiment:
        query = query.filter(Review.sentiment == sentiment.lower())
    rows = query.order_by(Review.date.desc()).limit(2000).all()

    counter: Counter = Counter()
    word_sentiments: dict = {}
    for content, sent in rows:
        if not content:
            continue
        for w in set(clean_for_keywords(content).split()):
            if len(w) < 3:
                continue
            counter[w] += 1
            word_sentiments.setdefault(w, Counter())[sent] += 1

    return [
        {
            "keyword": w,
            "count": c,
            "sentiment": sentiment.lower() if sentiment else word_sentiments[w].most_common(1)[0][0],
        }
        for w, c in counter.most_common(limit)
    ]
