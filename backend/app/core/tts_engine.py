import os
import glob

# ---------------------------------------------------------------------------
# Auto-locate espeak-ng and configure phonemizer BEFORE importing kokoro.
# Using print() here (not logging) so this ALWAYS shows in the terminal,
# regardless of whether logging.basicConfig() was ever called anywhere else
# in the app. Without basicConfig, Python's default log level is WARNING,
# so logger.info(...) calls are silently dropped — that's why previous
# diagnostic lines never showed up in your uvicorn terminal.
# ---------------------------------------------------------------------------
_ESPEAK_SEARCH_DIRS = [
    r"C:\Program Files\eSpeak NG",
    r"C:\Program Files (x86)\eSpeak NG",
]

def _configure_espeak():
    for _dir in _ESPEAK_SEARCH_DIRS:
        if not os.path.isdir(_dir):
            continue
        dll_candidates = glob.glob(os.path.join(_dir, "*espeak*.dll"))
        data_dir = os.path.join(_dir, "espeak-ng-data")
        if dll_candidates:
            os.environ["PHONEMIZER_ESPEAK_LIBRARY"] = dll_candidates[0]
            print(f"✅ [tts_engine] Found espeak library: {dll_candidates[0]}")
        if os.path.isdir(data_dir):
            os.environ["ESPEAK_DATA_PATH"] = data_dir
            print(f"✅ [tts_engine] Found espeak data: {data_dir}")
        os.environ["PATH"] = _dir + os.pathsep + os.environ.get("PATH", "")
        if dll_candidates:
            return True
    print("⚠️ [tts_engine] Could not auto-locate espeak-ng under Program Files.")
    return False

print("🔧 [tts_engine] Configuring espeak-ng...")
_configure_espeak()

import io
import numpy as np
import soundfile as sf
from kokoro import KPipeline
import re
import warnings

warnings.filterwarnings("ignore")

# ---------------------------------------------------------------------------
# Full voice catalog, matching every .pt file in your kokoro-82m/voices/ folder.
# id -> (display_name, language_name, flag_emoji, gender)
# The first letter of each voice id IS the Kokoro lang_code for that voice.
# ---------------------------------------------------------------------------
VOICE_CATALOG = {
    "af_alloy":   ("Alloy",   "American English", "🇺🇸", "Female"),
    "af_aoede":   ("Aoede",   "American English", "🇺🇸", "Female"),
    "af_bella":   ("Bella",   "American English", "🇺🇸", "Female"),
    "af_heart":   ("Heart",   "American English", "🇺🇸", "Female"),
    "af_jessica": ("Jessica", "American English", "🇺🇸", "Female"),
    "af_kore":    ("Kore",    "American English", "🇺🇸", "Female"),
    "af_nicole":  ("Nicole",  "American English", "🇺🇸", "Female"),
    "af_nova":    ("Nova",    "American English", "🇺🇸", "Female"),
    "af_river":   ("River",   "American English", "🇺🇸", "Female"),
    "af_sarah":   ("Sarah",   "American English", "🇺🇸", "Female"),
    "af_sky":     ("Sky",     "American English", "🇺🇸", "Female"),
    "am_adam":    ("Adam",    "American English", "🇺🇸", "Male"),
    "am_echo":    ("Echo",    "American English", "🇺🇸", "Male"),
    "am_eric":    ("Eric",    "American English", "🇺🇸", "Male"),
    "am_fenrir":  ("Fenrir",  "American English", "🇺🇸", "Male"),
    "am_liam":    ("Liam",    "American English", "🇺🇸", "Male"),
    "am_michael": ("Michael", "American English", "🇺🇸", "Male"),
    "am_onyx":    ("Onyx",    "American English", "🇺🇸", "Male"),
    "am_puck":    ("Puck",    "American English", "🇺🇸", "Male"),
    "am_santa":   ("Santa",   "American English", "🇺🇸", "Male"),

    "bf_alice":    ("Alice",    "British English", "🇬🇧", "Female"),
    "bf_emma":     ("Emma",     "British English", "🇬🇧", "Female"),
    "bf_isabella": ("Isabella", "British English", "🇬🇧", "Female"),
    "bf_lily":     ("Lily",     "British English", "🇬🇧", "Female"),
    "bm_daniel":   ("Daniel",   "British English", "🇬🇧", "Male"),
    "bm_fable":    ("Fable",    "British English", "🇬🇧", "Male"),
    "bm_george":   ("George",   "British English", "🇬🇧", "Male"),
    "bm_lewis":    ("Lewis",    "British English", "🇬🇧", "Male"),

    "ef_dora":  ("Dora",  "Spanish", "🇪🇸", "Female"),
    "em_alex":  ("Alex",  "Spanish", "🇪🇸", "Male"),
    "em_santa": ("Santa", "Spanish", "🇪🇸", "Male"),

    "ff_siwis": ("Siwis", "French", "🇫🇷", "Female"),

    "hf_alpha": ("Alpha", "Hindi", "🇮🇳", "Female"),
    "hf_beta":  ("Beta",  "Hindi", "🇮🇳", "Female"),
    "hm_omega": ("Omega", "Hindi", "🇮🇳", "Male"),
    "hm_psi":   ("Psi",   "Hindi", "🇮🇳", "Male"),

    "if_sara":   ("Sara",   "Italian", "🇮🇹", "Female"),
    "im_nicola": ("Nicola", "Italian", "🇮🇹", "Male"),

    "jf_alpha":      ("Alpha",      "Japanese", "🇯🇵", "Female"),
    "jf_gongitsune": ("Gongitsune", "Japanese", "🇯🇵", "Female"),
    "jf_nezumi":     ("Nezumi",     "Japanese", "🇯🇵", "Female"),
    "jf_tebukuro":   ("Tebukuro",   "Japanese", "🇯🇵", "Female"),
    "jm_kumo":       ("Kumo",       "Japanese", "🇯🇵", "Male"),

    "pf_dora":  ("Dora",  "Brazilian Portuguese", "🇧🇷", "Female"),
    "pm_alex":  ("Alex",  "Brazilian Portuguese", "🇧🇷", "Male"),
    "pm_santa": ("Santa", "Brazilian Portuguese", "🇧🇷", "Male"),

    "zf_xiaobei":  ("Xiaobei",  "Mandarin Chinese", "🇨🇳", "Female"),
    "zf_xiaoni":   ("Xiaoni",   "Mandarin Chinese", "🇨🇳", "Female"),
    "zf_xiaoxiao": ("Xiaoxiao", "Mandarin Chinese", "🇨🇳", "Female"),
    "zf_xiaoyi":   ("Xiaoyi",   "Mandarin Chinese", "🇨🇳", "Female"),
    "zm_yunjian":  ("Yunjian",  "Mandarin Chinese", "🇨🇳", "Male"),
    "zm_yunxi":    ("Yunxi",    "Mandarin Chinese", "🇨🇳", "Male"),
    "zm_yunxia":   ("Yunxia",   "Mandarin Chinese", "🇨🇳", "Male"),
    "zm_yunyang":  ("Yunyang",  "Mandarin Chinese", "🇨🇳", "Male"),
}

KNOWN_VOICES = set(VOICE_CATALOG.keys())


class TTSEngine:
    def __init__(self):
        self.pipelines = {}
        self.default_voice = "af_heart"
        self.default_lang = "a"
        print("🔧 [tts_engine] Initializing TTSEngine, loading default English pipeline...")
        self._get_pipeline(self.default_lang)
        print("🔧 [tts_engine] TTSEngine ready.")

    def _get_pipeline(self, lang_code: str):
        if lang_code in self.pipelines:
            return self.pipelines[lang_code]
        try:
            print(f"🔄 [tts_engine] Loading Kokoro pipeline for lang_code='{lang_code}'...")
            pipeline = KPipeline(lang_code=lang_code)
            self.pipelines[lang_code] = pipeline
            print(f"✅ [tts_engine] Kokoro pipeline loaded for '{lang_code}'")
            return pipeline
        except Exception as e:
            print(f"❌ [tts_engine] Failed to load pipeline for lang '{lang_code}': {e}")
            import traceback
            traceback.print_exc()
            raise RuntimeError(
                f"This voice's language isn't available on the server yet. "
                f"It may need extra packages installed for that language."
            )

    def generate(self, text: str, voice: str = "af_heart", output_format: str = "wav"):
        if not text or not text.strip():
            raise ValueError("Text cannot be empty")

        output_format = (output_format or "wav").lower().strip()
        if output_format not in ("wav", "mp3"):
            raise ValueError("output_format must be 'wav' or 'mp3'")

        clean_text = re.sub(r'\[.*?\]', '', text).strip()
        if not clean_text:
            clean_text = text.strip()

        if voice not in KNOWN_VOICES:
            print(f"⚠️ [tts_engine] Unknown voice '{voice}', falling back to '{self.default_voice}'")
            voice = self.default_voice

        lang_code = voice[0]
        pipeline = self._get_pipeline(lang_code)

        print(f"🎤 [tts_engine] Generating with voice: {voice} (lang='{lang_code}'), text length={len(clean_text)}")

        try:
            generator = pipeline(clean_text, voice=voice, speed=1.0)
            audio_chunks = []
            chunk_count = 0

            # ✅ FIX: Kokoro's KPipeline yields (graphemes, phonemes, audio) —
            # in that order. The audio is the THIRD element, not the first.
            for graphemes, phonemes, audio in generator:
                chunk_count += 1
                print(f"   [tts_engine] chunk {chunk_count}: phonemes={phonemes!r}")
                audio = np.asarray(audio)
                print(f"   [tts_engine] chunk {chunk_count}: audio shape={audio.shape}, dtype={audio.dtype}")
                if audio.ndim == 0 or audio.size == 0:
                    print(f"   [tts_engine] chunk {chunk_count}: SKIPPED (empty)")
                    continue
                if audio.ndim > 1:
                    audio = audio.flatten()
                audio_chunks.append(audio)

            print(f"🔎 [tts_engine] Total chunks generated: {chunk_count}, usable chunks: {len(audio_chunks)}")

            if not audio_chunks:
                raise RuntimeError(
                    "No audio generated. This usually means espeak-ng isn't "
                    "configured correctly, or the phonemizer produced empty "
                    "phonemes for this text/voice combination."
                )

            full_audio = np.concatenate(audio_chunks)
            sample_rate = 24000
            duration = len(full_audio) / sample_rate

            wav_buffer = io.BytesIO()
            sf.write(wav_buffer, full_audio, sample_rate, format='WAV')
            wav_bytes = wav_buffer.getvalue()

            if output_format == "wav":
                print(f"✅ [tts_engine] Audio generated: {duration:.2f}s (wav)")
                return wav_bytes, sample_rate, duration

            try:
                from pydub import AudioSegment
            except ImportError as e:
                raise RuntimeError(
                    "MP3 output requires 'pydub' and ffmpeg installed on the server "
                    "(pip install pydub, plus the ffmpeg binary)."
                ) from e

            wav_buffer.seek(0)
            segment = AudioSegment.from_wav(wav_buffer)
            mp3_buffer = io.BytesIO()
            segment.export(mp3_buffer, format="mp3", bitrate="192k")
            mp3_bytes = mp3_buffer.getvalue()

            print(f"✅ [tts_engine] Audio generated: {duration:.2f}s (mp3)")
            return mp3_bytes, sample_rate, duration

        except RuntimeError:
            raise
        except Exception as e:
            print(f"❌ [tts_engine] Generation error: {e}")
            import traceback
            traceback.print_exc()
            raise RuntimeError(f"TTS failed: {str(e)}")


tts_engine = TTSEngine()