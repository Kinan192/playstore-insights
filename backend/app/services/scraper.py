from google_play_scraper import search, app, reviews, Sort
from typing import List, Dict, Any, Tuple

def search_apps(query: str, lang: str = "id", country: str = "id", limit: int = 5) -> List[Dict[str, Any]]:
    """Search Google Play Store for apps matching the query."""
    return search(query, lang=lang, country=country, n_hits=limit)

def get_app_details(app_id: str, lang: str = "id", country: str = "id") -> Dict[str, Any]:
    """Get details for a specific app."""
    return app(app_id, lang=lang, country=country)

def fetch_reviews(app_id: str, count: int = 1000, lang: str = "id", country: str = "id") -> Tuple[List[Dict[str, Any]], Any]:
    """Fetch reviews for a specific app."""
    result, continuation_token = reviews(
        app_id,
        lang=lang,
        country=country,
        sort=Sort.NEWEST,
        count=count
    )
    return result, continuation_token
