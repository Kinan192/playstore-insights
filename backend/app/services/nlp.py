"""
Prediksi sentiment via model ML (LinearSVC + TF-IDF, artifact joblib).
Fallback rule-based dari score bila artifact hilang atau teks kosong.
Label: 'positif' | 'netral' | 'negatif' (lowercase).
"""
from pathlib import Path

import joblib

_MODEL_PATH = Path(__file__).resolve().parents[1] / "ml" / "model.joblib"
_model = None
_model_checked = False


def _get_model():
    global _model, _model_checked
    if not _model_checked:
        _model_checked = True
        if _MODEL_PATH.exists():
            _model = joblib.load(_MODEL_PATH)
    return _model


def analyze_sentiment(content: str, score: int) -> str:
    model = _get_model()
    if model is not None and content and content.strip():
        # import lazy agar startup API tidak menunggu Sastrawi/nltk
        from app.services.preprocessing import preprocess

        text = preprocess(content)
        if text:
            return str(model.predict([text])[0])
    # fallback rule-based
    if score >= 4:
        return "positif"
    if score == 3:
        return "netral"
    return "negatif"


if __name__ == "__main__":
    assert analyze_sentiment("Aplikasi sangat bagus, pemesanan mudah dan cepat", 5) == "positif"
    assert analyze_sentiment("Aplikasi jelek, refund susah, uang saya hilang", 4) == "negatif"
    assert analyze_sentiment("", 3) == "netral"
    print("self-check OK")
