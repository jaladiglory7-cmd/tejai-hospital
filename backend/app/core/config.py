from pathlib import Path
from pydantic_settings import BaseSettings
from typing import List

BASE_DIR = Path(__file__).parent.parent.parent

class Settings(BaseSettings):
    model_config = {"env_file": BASE_DIR / ".env", "env_file_encoding": "utf-8"}

    SUPABASE_URL: str = ""
    SUPABASE_KEY: str = ""
    SARVAM_API_KEY: str = ""
    WHATSAPP_PHONE_NUMBER: str = "919876543210"
    WHATSAPP_BUSINESS_PHONE: str = "919876543210"
    CORS_ORIGINS: str = "http://localhost:5173,http://localhost:3000"

    @property
    def cors_origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]


settings = Settings()