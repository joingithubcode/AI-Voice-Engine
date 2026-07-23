from fastapi import FastAPI, HTTPException
from fastapi.responses import Response
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from app.core.tts_engine import tts_engine
import uuid
import traceback

app = FastAPI(title="AI Voice Platform API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TTSRequest(BaseModel):
    text: str
    voice: str = "af_heart"
    emotion: str | None = None

@app.get("/")
def root():
    return {"message": "AI Voice API is running. Use /tts/generate"}

@app.post("/tts/generate")
async def generate_speech(request: TTSRequest):
    try:
        if not request.text or len(request.text.strip()) == 0:
            raise HTTPException(status_code=400, detail="Text cannot be empty")

        audio_bytes, sample_rate, duration = tts_engine.generate(
            text=request.text,
            voice=request.voice,
            emotion=request.emotion
        )

        return Response(
            content=audio_bytes,
            media_type="audio/wav",
            headers={
                "Content-Disposition": f"attachment; filename=speech_{uuid.uuid4().hex[:8]}.wav",
                "X-Duration": str(duration)
            }
        )
    except HTTPException:
        raise
    except Exception as e:
        traceback.print_exc()  # poora error terminal mein print hoga
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)