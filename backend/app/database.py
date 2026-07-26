"""
Koneksi dan session database menggunakan SQLAlchemy.
Terhubung ke MySQL via FlyEnv (localhost:3306).
"""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from app.config import get_settings

settings = get_settings()

engine = create_engine(
    settings.DATABASE_URL,
    echo=settings.DEBUG,  # Log SQL queries saat DEBUG=true
    pool_pre_ping=True,   # Cek koneksi sebelum digunakan
    pool_recycle=3600,     # Recycle koneksi setiap 1 jam (penting untuk MySQL)
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    """Base class untuk semua model SQLAlchemy."""
    pass


def get_db():
    """Dependency injection untuk mendapatkan session database."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
