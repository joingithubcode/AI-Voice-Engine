import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    APP_NAME: str = os.getenv("APP_NAME", "AI Voice Platform")
    DEBUG: bool = os.getenv("DEBUG", "True").lower() == "true"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "change_me")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 1440))
    
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./app.db")
    FRONTEND_URL: str = os.getenv("FRONTEND_URL", "http://localhost:3000")
    
    # Resend Email
    RESEND_API_KEY: str = os.getenv("RESEND_API_KEY", "")
    EMAIL_FROM: str = os.getenv("EMAIL_FROM", "onboarding@resend.dev")
    
    # Google OAuth
    GOOGLE_CLIENT_ID: str = os.getenv("GOOGLE_CLIENT_ID", "")
    GOOGLE_CLIENT_SECRET: str = os.getenv("GOOGLE_CLIENT_SECRET", "")
    GOOGLE_REDIRECT_URI: str = os.getenv("GOOGLE_REDIRECT_URI", "http://localhost:8000/api/v1/auth/google-callback")
    
    # ==========================================
    # MODEL PATHS - TTS ke liye zaroori
    # ==========================================
    BASE_DIR: str = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    MODELS_BASE: str = os.path.join(BASE_DIR, "models_data")
    
    # TTS Models
    KOKORO_PATH: str = os.path.join(MODELS_BASE, "tts", "kokoro-82m")
    KITTEN_PATH: str = os.path.join(MODELS_BASE, "tts", "kitten-tts")
    MELOTTS_PATH: str = os.path.join(MODELS_BASE, "tts", "melotts-en")
    VOXCPM_PATH: str = os.path.join(MODELS_BASE, "tts", "voxcpm-0.5b")
    
    # Cloning Models
    POCKET_PATH: str = os.path.join(MODELS_BASE, "cloning", "pocket-tts")
    SOPRO_PATH: str = os.path.join(MODELS_BASE, "cloning", "sopro")
    NEUTTS_PATH: str = os.path.join(MODELS_BASE, "cloning", "neutts-air")
    
    # Translation Model
    TRANSLATION_PATH: str = os.path.join(MODELS_BASE, "translation", "opus-mt-ur-en")
    
    # Upload/Output Directories
    UPLOAD_DIR: str = os.path.join(BASE_DIR, "uploads")
    OUTPUT_DIR: str = os.path.join(BASE_DIR, "outputs")

settings = Settings()

# Create directories if they don't exist
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
os.makedirs(settings.OUTPUT_DIR, exist_ok=True)

# Print model path for debugging
print(f"🔍 KOKORO_PATH: {settings.KOKORO_PATH}")
print(f"🔍 Models exist: {os.path.exists(settings.KOKORO_PATH)}")