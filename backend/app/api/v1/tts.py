# # from fastapi import APIRouter, Depends, HTTPException, Response
# # from pydantic import BaseModel
# # import uuid
# # import traceback
# # from app.core.tts_engine import tts_engine, VOICE_CATALOG
# # from app.api.v1.auth import get_current_active_user
# # from app.models.user import User
# # from app.database import get_db
# # from sqlalchemy.orm import Session

# # router = APIRouter()

# # class TTSRequest(BaseModel):
# #     text: str
# #     voice: str = "af_heart"
# #     format: str = "wav"  # "wav" or "mp3"

# # @router.post("/generate")
# # async def generate_speech(
# #     request: TTSRequest,
# #     current_user: User = Depends(get_current_active_user),
# #     db: Session = Depends(get_db)
# # ):
# #     try:
# #         if not request.text or len(request.text.strip()) == 0:
# #             raise HTTPException(status_code=400, detail="Text cannot be empty")

# #         if current_user.characters_used >= current_user.characters_limit:
# #             raise HTTPException(status_code=403, detail="Character limit exceeded")

# #         fmt = request.format.lower().strip()
# #         if fmt not in ("wav", "mp3"):
# #             raise HTTPException(status_code=400, detail="format must be 'wav' or 'mp3'")

# #         audio_bytes, sample_rate, duration = tts_engine.generate(
# #             text=request.text,
# #             voice=request.voice,
# #             output_format=fmt
# #         )

# #         char_count = len(request.text)
# #         current_user.characters_used += char_count
# #         db.commit()

# #         media_type = "audio/mpeg" if fmt == "mp3" else "audio/wav"

# #         return Response(
# #             content=audio_bytes,
# #             media_type=media_type,
# #             headers={
# #                 "Content-Disposition": f"attachment; filename=speech_{uuid.uuid4().hex[:8]}.{fmt}",
# #                 "X-Duration": str(duration),
# #                 "X-Characters-Used": str(char_count)
# #             }
# #         )

# #     except HTTPException:
# #         raise
# #     except ValueError as e:
# #         raise HTTPException(status_code=400, detail=str(e))
# #     except RuntimeError as e:
# #         raise HTTPException(status_code=400, detail=str(e))
# #     except Exception as e:
# #         traceback.print_exc()
# #         raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")

# # @router.get("/voices")
# # async def get_voices():
# #     """
# #     Returns every voice in the model, matching the .pt files in your
# #     kokoro-82m/voices/ folder. category combines the language flag,
# #     language name, and gender for easy grouping in the frontend dropdown.
# #     """
# #     voices = []
# #     for voice_id, (name, language, flag, gender) in VOICE_CATALOG.items():
# #         voices.append({
# #             "id": voice_id,
# #             "name": f"{name} ({gender})",
# #             "category": f"{flag} {language} — {gender}"
# #         })
# #     # Sort so English (most reliable) appears first, then alphabetically by category
# #     voices.sort(key=lambda v: (v["category"] != "🇺🇸 American English — Female",
# #                                 v["category"] != "🇺🇸 American English — Male",
# #                                 v["category"], v["name"]))
# #     return {"voices": voices}

# from fastapi import APIRouter, Depends, HTTPException, Response
# from pydantic import BaseModel
# import uuid
# import traceback
# import logging

# logger = logging.getLogger(__name__)
# router = APIRouter()

# # ✅ TTS engine ko safe load karo
# try:
#     from app.core.tts_engine import tts_engine, VOICE_CATALOG
#     TTS_AVAILABLE = tts_engine is not None and tts_engine.model is not None
#     logger.info(f"✅ TTS Engine loaded: {TTS_AVAILABLE}")
# except Exception as e:
#     logger.error(f"⚠️ TTS Engine failed to load: {e}")
#     TTS_AVAILABLE = False
#     tts_engine = None
#     VOICE_CATALOG = {}

# class TTSRequest(BaseModel):
#     text: str
#     voice: str = "en_f1"
#     format: str = "wav"

# @router.get("/status")
# async def tts_status():
#     """Check if TTS engine is ready"""
#     return {
#         "available": TTS_AVAILABLE,
#         "voices": list(VOICE_CATALOG.keys()) if VOICE_CATALOG else []
#     }

# @router.post("/generate")
# async def generate_speech(request: TTSRequest):
#     if not TTS_AVAILABLE:
#         raise HTTPException(status_code=503, detail="TTS service is currently unavailable. Please try again later.")
    
#     try:
#         if not request.text or len(request.text.strip()) == 0:
#             raise HTTPException(status_code=400, detail="Text cannot be empty")

#         fmt = request.format.lower().strip()
#         if fmt not in ("wav", "mp3"):
#             raise HTTPException(status_code=400, detail="format must be 'wav' or 'mp3'")

#         voice = request.voice
#         try:
#             audio_bytes, sample_rate, duration = tts_engine.generate(
#                 text=request.text,
#                 voice=voice,
#                 output_format=fmt
#             )
#         except Exception as e:
#             logger.warning(f"Voice '{voice}' failed: {e}. Falling back to 'en_f1'")
#             voice = "en_f1"
#             audio_bytes, sample_rate, duration = tts_engine.generate(
#                 text=request.text,
#                 voice=voice,
#                 output_format=fmt
#             )

#         media_type = "audio/mpeg" if fmt == "mp3" else "audio/wav"

#         return Response(
#             content=audio_bytes,
#             media_type=media_type,
#             headers={
#                 "Content-Disposition": f"attachment; filename=speech_{uuid.uuid4().hex[:8]}.{fmt}",
#                 "X-Duration": str(duration),
#                 "X-Voice-Used": voice
#             }
#         )

#     except HTTPException:
#         raise
#     except ValueError as e:
#         raise HTTPException(status_code=400, detail=str(e))
#     except RuntimeError as e:
#         raise HTTPException(status_code=400, detail=str(e))
#     except Exception as e:
#         traceback.print_exc()
#         raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")

# @router.get("/voices")
# async def get_voices():
#     if not VOICE_CATALOG:
#         return {"voices": []}
    
#     voices = []
#     for voice_id, (name, language, flag, gender) in VOICE_CATALOG.items():
#         voices.append({
#             "id": voice_id,
#             "name": f"{name} ({gender})",
#             "category": f"{flag} {language} — {gender}"
#         })
#     return {"voices": voices}

# from fastapi import APIRouter, Depends, HTTPException, Response
# from pydantic import BaseModel
# import uuid
# import traceback
# from app.core.tts_engine import tts_engine, VOICE_CATALOG
# from app.api.v1.auth import get_current_active_user
# from app.models.user import User
# from app.database import get_db
# from sqlalchemy.orm import Session

# router = APIRouter()

# class TTSRequest(BaseModel):
#     text: str
#     voice: str = "af_heart"
#     format: str = "wav"  # "wav" or "mp3"

# @router.post("/generate")
# async def generate_speech(
#     request: TTSRequest,
#     current_user: User = Depends(get_current_active_user),
#     db: Session = Depends(get_db)
# ):
#     try:
#         if not request.text or len(request.text.strip()) == 0:
#             raise HTTPException(status_code=400, detail="Text cannot be empty")

#         if current_user.characters_used >= current_user.characters_limit:
#             raise HTTPException(status_code=403, detail="Character limit exceeded")

#         fmt = request.format.lower().strip()
#         if fmt not in ("wav", "mp3"):
#             raise HTTPException(status_code=400, detail="format must be 'wav' or 'mp3'")

#         audio_bytes, sample_rate, duration = tts_engine.generate(
#             text=request.text,
#             voice=request.voice,
#             output_format=fmt
#         )

#         char_count = len(request.text)
#         current_user.characters_used += char_count
#         db.commit()

#         media_type = "audio/mpeg" if fmt == "mp3" else "audio/wav"

#         return Response(
#             content=audio_bytes,
#             media_type=media_type,
#             headers={
#                 "Content-Disposition": f"attachment; filename=speech_{uuid.uuid4().hex[:8]}.{fmt}",
#                 "X-Duration": str(duration),
#                 "X-Characters-Used": str(char_count)
#             }
#         )

#     except HTTPException:
#         raise
#     except ValueError as e:
#         raise HTTPException(status_code=400, detail=str(e))
#     except RuntimeError as e:
#         raise HTTPException(status_code=400, detail=str(e))
#     except Exception as e:
#         traceback.print_exc()
#         raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")

# @router.get("/voices")
# async def get_voices():
#     """
#     Returns every voice in the model, matching the .pt files in your
#     kokoro-82m/voices/ folder. category combines the language flag,
#     language name, and gender for easy grouping in the frontend dropdown.
#     """
#     voices = []
#     for voice_id, (name, language, flag, gender) in VOICE_CATALOG.items():
#         voices.append({
#             "id": voice_id,
#             "name": f"{name} ({gender})",
#             "category": f"{flag} {language} — {gender}"
#         })
#     # Sort so English (most reliable) appears first, then alphabetically by category
#     voices.sort(key=lambda v: (v["category"] != "🇺🇸 American English — Female",
#                                 v["category"] != "🇺🇸 American English — Male",
#                                 v["category"], v["name"]))
#     return {"voices": voices}

from fastapi import APIRouter, Depends, HTTPException, Response
from pydantic import BaseModel
import uuid
import traceback
from app.core.tts_engine import tts_engine, VOICE_CATALOG
from app.api.v1.auth import get_current_active_user
from app.models.user import User
from app.database import get_db
from sqlalchemy.orm import Session

router = APIRouter()

class TTSRequest(BaseModel):
    text: str
    voice: str = "af_heart"
    format: str = "wav"  # "wav" or "mp3"

@router.post("/generate")
async def generate_speech(
    request: TTSRequest,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    try:
        if not request.text or len(request.text.strip()) == 0:
            raise HTTPException(status_code=400, detail="Text cannot be empty")

        # ✅ Character limit check removed — generation is now unlimited.

        fmt = request.format.lower().strip()
        if fmt not in ("wav", "mp3"):
            raise HTTPException(status_code=400, detail="format must be 'wav' or 'mp3'")

        audio_bytes, sample_rate, duration = tts_engine.generate(
            text=request.text,
            voice=request.voice,
            output_format=fmt
        )

        char_count = len(request.text)
        current_user.characters_used += char_count
        db.commit()

        media_type = "audio/mpeg" if fmt == "mp3" else "audio/wav"

        return Response(
            content=audio_bytes,
            media_type=media_type,
            headers={
                "Content-Disposition": f"attachment; filename=speech_{uuid.uuid4().hex[:8]}.{fmt}",
                "X-Duration": str(duration),
                "X-Characters-Used": str(char_count)
            }
        )

    except HTTPException:
        raise
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except RuntimeError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")

@router.get("/voices")
async def get_voices():
    """
    Returns every voice in the model, matching the .pt files in your
    kokoro-82m/voices/ folder. category combines the language flag,
    language name, and gender for easy grouping in the frontend dropdown.
    """
    voices = []
    for voice_id, (name, language, flag, gender) in VOICE_CATALOG.items():
        voices.append({
            "id": voice_id,
            "name": f"{name} ({gender})",
            "category": f"{flag} {language} — {gender}"
        })
    # Sort so English (most reliable) appears first, then alphabetically by category
    voices.sort(key=lambda v: (v["category"] != "🇺🇸 American English — Female",
                                v["category"] != "🇺🇸 American English — Male",
                                v["category"], v["name"]))
    return {"voices": voices}