from fastapi import APIRouter, Query, HTTPException
from google_play_scraper import search
from typing import List, Dict, Any

router = APIRouter()

@router.get("/search")
def search_app(
    q: str = Query(..., description="App name to search for"),
    lang: str = Query("id", description="Language code"),
    country: str = Query("id", description="Country code"),
    limit: int = Query(5, description="Number of results to return")
) -> List[Dict[str, Any]]:
    """
    Search for apps on Google Play Store by name.
    """
    try:
        results = search(
            q,
            lang=lang,
            country=country,
            n_hits=limit
        )
        # hasil pertama search() kadang tanpa appId (quirk google-play-scraper) — buang
        return [r for r in results if r.get("appId")]
    except Exception as e:
        print(f"Search error for query '{q}': {e}")
        return []
