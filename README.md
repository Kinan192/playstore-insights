# Play Store Insights: Tiket.com vs Traveloka

Platform analitik dan pipeline *Data Science* untuk mengekstrak, menganalisis, dan membandingkan sentimen pengguna aplikasi Google Play Store. Saat ini, proyek difokuskan untuk mengkomparasi sentimen ulasan antara **Tiket.com** dan **Traveloka** (total 7.200 ulasan).

## Deskripsi Proyek

Proyek ini menggunakan teknik *Natural Language Processing* (NLP) untuk membersihkan ulasan teks mentah dari Play Store dan memberikan label sentimen (Positif/Negatif/Netral) menggunakan pendekatan Leksikon dan *Machine Learning*.

Tujuan akhir dari repositori ini adalah untuk dikembangkan menjadi aplikasi web interaktif (dashboard) yang memungkinkan pengguna untuk membandingkan sentimen berbagai aplikasi secara dinamis.

## Struktur Direktori

- **\Notebooks/\**: Berisi sekumpulan Jupyter Notebooks untuk pipeline data:
  - \Scrap_data.ipynb\: Script untuk melakukan *scraping* ulasan dari Google Play Store.
  - \sentiment_analyst.ipynb\: Pemrosesan teks dan pelabelan sentimen berbasis Leksikon.
  - \predict_model.ipynb\: Pelatihan model *Machine Learning* untuk memprediksi sentimen.
  - \isualisasi_sentiment.ipynb\: Visualisasi data dan *Exploratory Data Analysis* (EDA).
- **\dataset/\**: Kumpulan dataset mentah dan bersih (masing-masing 3.600 ulasan per aplikasi) beserta kamus Leksikon (InSet).
- **\Docs/\**: Dokumentasi dan laporan mini proyek.

## Cara Penggunaan

1. Aktifkan *virtual environment* Python Anda.
2. Pastikan pustaka utama (*libraries*) seperti \pandas\, \scikit-learn\, \matplotlib\, dan \seaborn\ sudah terpasang.
3. Jalankan *notebook* secara berurutan mulai dari *scraping*, analisis sentimen, hingga visualisasi dan pemodelan.

---
*Repositori ini sedang dalam tahap pengembangan aktif untuk diubah menjadi aplikasi web.*
