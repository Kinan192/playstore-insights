"""Train sentiment model (winner dari Notebooks/predict_model.ipynb) dan simpan artifact.

Usage: python scripts/train_model.py  (dari folder backend/, venv aktif)
"""
from pathlib import Path

import joblib
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import accuracy_score, classification_report
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.svm import LinearSVC

ROOT = Path(__file__).resolve().parents[2]  # project root
DATASET = ROOT / "dataset" / "data_ready_for_modeling_analist.csv"
OUT = Path(__file__).resolve().parents[1] / "app" / "ml" / "model.joblib"


def main():
    df = pd.read_csv(DATASET).dropna(subset=["stemmed_text", "label_lexicon"])
    X = df["stemmed_text"]
    y = df["label_lexicon"].str.lower()
    print(f"Dataset: {len(df)} baris, label: {y.value_counts().to_dict()}")

    X_tr, X_te, y_tr, y_te = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    pipe = Pipeline([
        ("tfidf", TfidfVectorizer(ngram_range=(1, 2), min_df=2, max_df=0.9, sublinear_tf=True)),
        ("clf", LinearSVC(random_state=42)),
    ])
    pipe.fit(X_tr, y_tr)

    pred = pipe.predict(X_te)
    acc = accuracy_score(y_te, pred)
    print(classification_report(y_te, pred))
    assert acc > 0.85, f"Akurasi {acc:.4f} regresi vs notebook (0.9222)"

    # refit full data untuk artifact produksi
    pipe.fit(X, y)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump(pipe, OUT)
    print(f"Akurasi holdout: {acc:.4f} — model tersimpan: {OUT}")


if __name__ == "__main__":
    main()
