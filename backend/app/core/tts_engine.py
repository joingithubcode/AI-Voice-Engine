import re
import soundfile as sf
import numpy as np
from kokoro import KPipeline
import io

# Emotion tags mapping to Kokoro's style tokens (approximated)
EMOTION_MAP = {
    "[happy]": "happy",
    "[sad]": "sad",
    "[angry]": "angry",
    "[fearful]": "fear",
    "[surprised]": "surprise",
    "[disgusted]": "disgust"
}

class TTSEngine:
    def __init__(self):
        # Load the fastest English model (Kokoro-82M) - CPU only
        self.pipeline = KPipeline(lang_code='a')  # 'a' = American English
        self.current_voice = 'af_heart'  # Default female voice

    def clean_text(self, text: str):
        """Remove emotion tags from the raw text for TTS engine"""
        for tag in EMOTION_MAP.keys():
            text = text.replace(tag, "").strip()
        # Remove any other bracket tags like [laugh], [sigh]
        text = re.sub(r'\[.*?\]', '', text).strip()
        return text

    def generate(self, text: str, voice: str = None, emotion: str = None):
        """
        Generate speech audio
        Returns: tuple (audio_bytes, sample_rate, duration_seconds)
        """
        if voice is None:
            voice = self.current_voice

        clean_text = self.clean_text(text)

        if not clean_text:
            raise ValueError("Text is empty after removing tags — likely only [tags] were sent")

        generator = self.pipeline(
            clean_text,
            voice=voice,
            speed=1.0,
            split_pattern=r'\n+'
        )

        audio_chunks = []
        sample_rate = 24000

        for result in generator:
            # Kokoro can return (gs, ps, audio) OR an object with .audio depending on version
            if isinstance(result, tuple):
                audio = result[-1]
            else:
                audio = getattr(result, "audio", result)

            if audio is None:
                continue
            if hasattr(audio, "detach"):
                audio = audio.detach().cpu().numpy()
            audio = np.asarray(audio, dtype=np.float32)

            # Skip scalar / empty results — this was the crash cause
            if audio.ndim == 0 or audio.size == 0:
                continue

            audio_chunks.append(audio)

        if not audio_chunks:
            raise ValueError("No valid audio generated — Kokoro returned empty output for this text/voice")

        full_audio = np.concatenate(audio_chunks)
        duration = len(full_audio) / sample_rate

        wav_buffer = io.BytesIO()
        sf.write(wav_buffer, full_audio, sample_rate, format='WAV')
        wav_bytes = wav_buffer.getvalue()

        return wav_bytes, sample_rate, duration


# Singleton instance
tts_engine = TTSEngine()