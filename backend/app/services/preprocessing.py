"""
Preprocessing teks untuk inferensi sentiment.
Replikasi urutan Notebooks/sentiment_analyst.ipynb:
clean -> normalisasi slang -> stopword (Sastrawi) -> tokenize (nltk) -> stem (Sastrawi).
"""
import re
from functools import lru_cache
from pathlib import Path

import nltk
import pandas as pd
from nltk.tokenize import word_tokenize
from Sastrawi.Stemmer.StemmerFactory import StemmerFactory
from Sastrawi.StopWordRemover.StopWordRemoverFactory import StopWordRemoverFactory

ROOT = Path(__file__).resolve().parents[3]  # project root
_SLANG_CSV = ROOT / "dataset" / "data_text_informal_to_formal.csv"

# pastikan tokenizer nltk tersedia (butuh online sekali)
for _pkg in ("punkt_tab", "punkt"):
    try:
        nltk.data.find(f"tokenizers/{_pkg}")
    except LookupError:
        nltk.download(_pkg, quiet=True)

# singleton level modul — dibuat sekali saat import
_slang_df = pd.read_csv(_SLANG_CSV, sep=";")
_slang = dict(zip(_slang_df["transformed"].astype(str), _slang_df["original-for"].astype(str)))
_stopword_remover = StopWordRemoverFactory().create_stop_word_remover()
_stemmer = StemmerFactory().create_stemmer()

_re_url = re.compile(r"http\S+|www\S+")
_re_mention = re.compile(r"[@#]\w+")
_re_nonalpha = re.compile(r"[^a-z\s]")
_re_ws = re.compile(r"\s+")


@lru_cache(maxsize=50_000)
def _stem_word(word: str) -> str:
    # Sastrawi lambat (~ms per kata); vocab review repetitif -> cache efektif
    return _stemmer.stem(word)


def _clean(text: str) -> str:
    t = text.lower()
    t = _re_url.sub(" ", t)
    t = _re_mention.sub(" ", t)
    t = _re_nonalpha.sub(" ", t)
    return _re_ws.sub(" ", t).strip()


def clean_for_keywords(text: str) -> str:
    """Langkah 1-3 saja (tanpa stemming) — untuk ekstraksi keyword yang tetap terbaca."""
    t = _clean(text)
    t = " ".join(_slang.get(w, w) for w in t.split())
    return _stopword_remover.remove(t)


def preprocess(text: str) -> str:
    """Pipeline penuh -> teks ter-stem, siap masuk model TF-IDF."""
    t = clean_for_keywords(text)
    tokens = word_tokenize(t)
    return " ".join(_stem_word(w) for w in tokens)


if __name__ == "__main__":
    out = preprocess("Aplikasinya bagus bgt! Pemesanan cepat http://x.co @admin #promo")
    print(repr(out))
    assert out, "preprocess kosong"
    assert "http" not in out and "admin" not in out and "promo" not in out
    assert "bagus" in out  # 'bgt' slang -> 'banget' -> mungkin tersapu stopword; 'bagus' harus bertahan
    assert preprocess("!!! 123 ???") == ""
    print("self-check OK")
