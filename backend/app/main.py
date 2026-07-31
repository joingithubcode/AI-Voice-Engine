# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from app.database import engine, Base
# from app.api.v1 import auth_router, admin_router, tts_router  # ✅ TTS import karo
# from app.config import settings

# Base.metadata.create_all(bind=engine)

# app = FastAPI(
#     title=settings.APP_NAME,
#     description="AI Voice Platform",
#     version="1.0.0"
# )

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# app.include_router(auth_router, prefix="/api/v1/auth", tags=["Authentication"])
# app.include_router(admin_router, prefix="/api/v1/admin", tags=["Admin"])
# app.include_router(tts_router, prefix="/api/v1/tts", tags=["TTS"])  # ✅ Add karo

# @app.get("/")
# def root():
#     return {"message": f"Welcome to {settings.APP_NAME} API", "docs": "/docs"}

# @app.get("/health")
# def health():
#     return {"status": "ok"}

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.api.v1 import auth_router, admin_router, tts_router
from app.config import settings

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.APP_NAME,
    description="AI Voice Platform",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(admin_router, prefix="/api/v1/admin", tags=["Admin"])
app.include_router(tts_router, prefix="/api/v1/tts", tags=["TTS"])

@app.get("/")
def root():
    return {"message": f"Welcome to {settings.APP_NAME} API", "docs": "/docs"}

@app.get("/health")
def health():
    return {"status": "ok"}