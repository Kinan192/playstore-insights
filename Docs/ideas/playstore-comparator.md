# Play Store Sentiment Comparator

## Problem Statement
Bagaimana kita bisa menyediakan alat bagi Data Analyst untuk membandingkan sentimen pengguna di berbagai aplikasi Play Store secara dinamis guna mendapatkan *insight* kompetitif?

## Recommended Direction
Aplikasi web dengan **Frontend Next.js (Desain Minimalis & Interaktif)** dan **Backend FastAPI (Python)**. 

Namun, ada **koreksi krusial pada arsitektur "Live Scraping"**. Aplikasi tidak akan melakukan *scraping* secara *synchronous* (menunggu langsung). Sebagai gantinya, kita akan menggunakan **Sistem Antrean (Asynchronous Background Jobs)**. Saat analis memasukkan nama aplikasi, sistem akan memprosesnya di latar belakang.

## Key Assumptions to Validate (Asumsi yang Harus Dites)
- [ ] **Asumsi:** *Scraping* Play Store secara *live* tidak akan diblokir/rate-limited oleh Google. *(Cara tes: Coba scrape 5 aplikasi berturut-turut dari server cloud untuk melihat apakah IP kita diblokir).*
- [ ] **Asumsi:** Menyimpan ulasan ke Database akan memakan ruang "Big Data". *(Kenyataan: 1 Juta ulasan teks di database PostgreSQL biasanya hanya memakan ruang kurang dari 500 MB. Ini sangat kecil dan murah, bukan level Big Data).*
- [ ] **Asumsi:** Data Analyst bersedia menunggu 5-10 menit untuk satu laporan perbandingan selesai diproses jika aplikasinya belum pernah di-*scrape* sebelumnya.

## MVP Scope (Ruang Lingkup Versi Awal)
- **Yang Dibuat:** 
  - Backend FastAPI dengan fitur *Background Tasks* untuk *scraping* dan NLP.
  - Frontend Next.js dengan grafik interaktif minimalis (menggunakan Recharts/Chart.js).
  - Database (PostgreSQL/SQLite) **HANYA** untuk menyimpan hasil aplikasi yang sudah pernah dicari (sebagai *cache*), agar analis berikutnya tidak perlu menunggu 10 menit untuk aplikasi yang sama.
- **Yang Tidak Dibuat:** Menyediakan seluruh jutaan aplikasi Play Store sejak hari pertama.

## Not Doing (and Why)
- **[TIDAK] Menunggu Hasil Scraping Secara *Real-time/Live* di Layar Loading.**
  - *Alasan:* Mengambil ribuan data ulasan dan menjalankan model NLP memakan waktu menit hingga jam. Browser pengguna (Chrome/Safari) akan mengalami *Timeout Error* (terputus otomatis) jika dibiarkan *loading* lebih dari 1 menit. Kita harus pakai sistem "Tinggalkan dan kembali lagi nanti saat selesai".
- **[TIDAK] Grafik Gambar Statis (PNG).**
  - *Alasan:* Karena targetnya adalah Data Analyst, grafik harus interaktif (bisa melihat angka detail saat di-hover) menggunakan JSON dari backend.

## Open Questions
- Apakah Anda setuju dengan sistem "Antrean/Background Task" untuk mengatasi masalah *Timeout* pada *Live Scraping*?
- Jika ya, apakah *stack* Next.js + FastAPI ini sudah bisa kita tetapkan?
