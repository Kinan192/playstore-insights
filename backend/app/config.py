"""
Konfigurasi aplikasi backend.
Membaca variabel lingkungan dari file .env
"""
from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    APP_NAME: str = "Sentiment Analytics API"
    DEBUG: bool = True
    DATABASE_URL: str = "mysql+pymysql://root:root@localhost:3306/playstore_insights"
    CORS_ORIGINS: str = "http://localhost:3000,http://localhost:3001"

    @property
    def cors_origins_list(self) -> list[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache()
def get_settings() -> Settings:
    return Settings()
