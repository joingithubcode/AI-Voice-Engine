# # import re
# # import io
# # import os
# # import numpy as np
# # import soundfile as sf
# # from kokoro import KPipeline
# # from app.config import settings
# # import logging
# # import warnings

# # warnings.filterwarnings("ignore")
# # logger = logging.getLogger(__name__)

# # # ✅ VOICE_CATALOG - Sab se pehle define karo
# # VOICE_CATALOG = {
# #     # 🇺🇸 American English — Female
# #     "af_alloy": ("Alloy", "American English", "🇺🇸", "Female"),
# #     "af_aoede": ("Aoede", "American English", "🇺🇸", "Female"),
# #     "af_bella": ("Bella", "American English", "🇺🇸", "Female"),
# #     "af_heart": ("Heart", "American English", "🇺🇸", "Female"),
# #     "af_jessica": ("Jessica", "American English", "🇺🇸", "Female"),
# #     "af_kore": ("Kore", "American English", "🇺🇸", "Female"),
# #     "af_nicole": ("Nicole", "American English", "🇺🇸", "Female"),
# #     "af_nova": ("Nova", "American English", "🇺🇸", "Female"),
# #     "af_river": ("River", "American English", "🇺🇸", "Female"),
# #     "af_sarah": ("Sarah", "American English", "🇺🇸", "Female"),
# #     "af_sky": ("Sky", "American English", "🇺🇸", "Female"),

# #     # 🇺🇸 American English — Male
# #     "am_adam": ("Adam", "American English", "🇺🇸", "Male"),
# #     "am_echo": ("Echo", "American English", "🇺🇸", "Male"),
# #     "am_eric": ("Eric", "American English", "🇺🇸", "Male"),
# #     "am_fenrir": ("Fenrir", "American English", "🇺🇸", "Male"),
# #     "am_liam": ("Liam", "American English", "🇺🇸", "Male"),
# #     "am_michael": ("Michael", "American English", "🇺🇸", "Male"),
# #     "am_onyx": ("Onyx", "American English", "🇺🇸", "Male"),
# #     "am_puck": ("Puck", "American English", "🇺🇸", "Male"),
# #     "am_santa": ("Santa", "American English", "🇺🇸", "Male"),

# #     # 🇬🇧 British English — Female
# #     "bf_alice": ("Alice", "British English", "🇬🇧", "Female"),
# #     "bf_emma": ("Emma", "British English", "🇬🇧", "Female"),
# #     "bf_isabella": ("Isabella", "British English", "🇬🇧", "Female"),
# #     "bf_lily": ("Lily", "British English", "🇬🇧", "Female"),

# #     # 🇬🇧 British English — Male
# #     "bm_daniel": ("Daniel", "British English", "🇬🇧", "Male"),
# #     "bm_fable": ("Fable", "British English", "🇬🇧", "Male"),
# #     "bm_george": ("George", "British English", "🇬🇧", "Male"),
# #     "bm_lewis": ("Lewis", "British English", "🇬🇧", "Male"),

# #     # 🇪🇸 Spanish — Female
# #     "ef_dora": ("Dora", "Spanish", "🇪🇸", "Female"),
# #     "ff_siwis": ("Siwis", "French", "🇫🇷", "Female"),

# #     # 🇪🇸 Spanish — Male
# #     "em_alex": ("Alex", "Spanish", "🇪🇸", "Male"),
# #     "em_santa": ("Santa", "Spanish", "🇪🇸", "Male"),

# #     # 🇯🇵 Japanese — Female
# #     "jf_alpha": ("Alpha", "Japanese", "🇯🇵", "Female"),
# #     "jf_gongitsune": ("Gongitsune", "Japanese", "🇯🇵", "Female"),
# #     "jf_nezumi": ("Nezumi", "Japanese", "🇯🇵", "Female"),
# #     "jf_tebukuro": ("Tebukuro", "Japanese", "🇯🇵", "Female"),

# #     # 🇯🇵 Japanese — Male
# #     "jm_kumo": ("Kumo", "Japanese", "🇯🇵", "Male"),

# #     # 🇨🇳 Chinese — Female
# #     "zf_xiaobei": ("Xiaobei", "Chinese", "🇨🇳", "Female"),
# #     "zf_xiaoni": ("Xiaoni", "Chinese", "🇨🇳", "Female"),
# #     "zf_xiaoxiao": ("Xiaoxiao", "Chinese", "🇨🇳", "Female"),
# #     "zf_xiaoyi": ("Xiaoyi", "Chinese", "🇨🇳", "Female"),

# #     # 🇨🇳 Chinese — Male
# #     "zm_yunjian": ("Yunjian", "Chinese", "🇨🇳", "Male"),
# #     "zm_yunxi": ("Yunxi", "Chinese", "🇨🇳", "Male"),
# #     "zm_yunxia": ("Yunxia", "Chinese", "🇨🇳", "Male"),
# #     "zm_yunyang": ("Yunyang", "Chinese", "🇨🇳", "Male"),
# # }

# # class TTSEngine:
# #     def __init__(self):
# #         self.pipeline = None
# #         self.default_voice = 'af_heart'
# #         self._load_pipeline()

# #     def _load_pipeline(self):
# #         try:
# #             model_path = settings.KOKORO_PATH
# #             if os.path.exists(model_path):
# #                 logger.info(f"Loading Kokoro from: {model_path}")
# #                 self.pipeline = KPipeline(lang_code='a', model=model_path)
# #             else:
# #                 logger.warning("Local model not found, loading default...")
# #                 self.pipeline = KPipeline(lang_code='a')
# #             logger.info("✅ Kokoro pipeline loaded successfully.")
# #         except Exception as e:
# #             logger.error(f"Failed to load Kokoro: {e}")
# #             self.pipeline = KPipeline(lang_code='a')

# #     def _voice_exists(self, voice: str) -> bool:
# #         voices_dir = os.path.join(settings.KOKORO_PATH, "voices")
# #         voice_file = os.path.join(voices_dir, f"{voice}.pt")
# #         return os.path.exists(voice_file)

# #     def generate(self, text: str, voice: str = None, output_format: str = "wav"):
# #         if self.pipeline is None:
# #             self._load_pipeline()

# #         if voice is None:
# #             voice = self.default_voice

# #         if not self._voice_exists(voice):
# #             logger.warning(f"Voice '{voice}' not found. Falling back to '{self.default_voice}'")
# #             voice = self.default_voice

# #         clean_text = re.sub(r'\[.*?\]', '', text).strip()
# #         if not clean_text:
# #             raise ValueError("Text is empty after removing tags.")

# #         logger.info(f"Generating with voice: {voice}")

# #         try:
# #             generator = self.pipeline(clean_text, voice=voice, speed=1.0)
# #             audio_chunks = []
# #             for audio, _, _ in generator:
# #                 audio = np.asarray(audio)
# #                 if audio.ndim == 0 or audio.size == 0:
# #                     continue
# #                 if audio.ndim > 1:
# #                     audio = audio.flatten()
# #                 audio_chunks.append(audio)

# #             if not audio_chunks:
# #                 raise RuntimeError(f"No audio chunks generated for voice '{voice}'. Try a different voice.")

# #             full_audio = np.concatenate(audio_chunks)
# #             sample_rate = 24000
# #             duration = len(full_audio) / sample_rate

# #             wav_buffer = io.BytesIO()
# #             sf.write(wav_buffer, full_audio, sample_rate, format='WAV')
# #             wav_bytes = wav_buffer.getvalue()

# #             logger.info(f"✅ Audio generated: {duration:.2f}s")
# #             return wav_bytes, sample_rate, duration

# #         except Exception as e:
# #             logger.error(f"Audio generation error: {e}")
# #             raise

# # # ✅ Singleton instance
# # tts_engine = TTSEngine()

# import re
# import io
# import numpy as np
# import soundfile as sf
# import logging
# import warnings
# import os

# warnings.filterwarnings("ignore")
# logger = logging.getLogger(__name__)

# # ✅ MeloTTS use karo
# try:
#     from melo.api import TTS
#     MELO_AVAILABLE = True
#     logger.info("✅ MeloTTS available")
# except ImportError as e:
#     logger.error(f"❌ MeloTTS not installed: {e}")
#     MELO_AVAILABLE = False

# VOICE_CATALOG = {
#     "en_f1": ("F1 (EN)", "American English", "🇺🇸", "Female"),
#     "en_f2": ("F2 (EN)", "American English", "🇺🇸", "Female"),
#     "en_f3": ("F3 (EN)", "American English", "🇺🇸", "Female"),
#     "en_m1": ("M1 (EN)", "American English", "🇺🇸", "Male"),
#     "en_m2": ("M2 (EN)", "American English", "🇺🇸", "Male"),
#     "en_m3": ("M3 (EN)", "American English", "🇺🇸", "Male"),
# }

# class TTSEngine:
#     def __init__(self):
#         self.model = None
#         self.default_voice = 'en_f1'
#         self.language_map = {
#             'en_f1': ('EN', 0),
#             'en_f2': ('EN', 1),
#             'en_f3': ('EN', 2),
#             'en_m1': ('EN', 3),
#             'en_m2': ('EN', 4),
#             'en_m3': ('EN', 5),
#         }
#         self._load_model()

#     def _load_model(self):
#         if not MELO_AVAILABLE:
#             logger.error("❌ MeloTTS not available")
#             self.model = None
#             return
            
#         try:
#             logger.info("🔄 Loading MeloTTS model...")
#             model_path = "/app/models_data/tts/melotts-en"
            
#             if os.path.exists(model_path):
#                 self.model = TTS(language='EN', device='cpu', model_path=model_path)
#                 logger.info("✅ MeloTTS loaded successfully from local model!")
#             else:
#                 logger.warning("Local model not found, downloading default...")
#                 self.model = TTS(language='EN', device='cpu')
#                 logger.info("✅ MeloTTS loaded successfully!")
#         except Exception as e:
#             logger.error(f"❌ Failed to load MeloTTS: {e}")
#             self.model = None

#     def generate(self, text: str, voice: str = None, output_format: str = "wav"):
#         if self.model is None:
#             raise RuntimeError("TTS engine not initialized")

#         if voice is None:
#             voice = self.default_voice

#         clean_text = re.sub(r'\[.*?\]', '', text).strip()
#         if not clean_text:
#             raise ValueError("Text is empty")

#         logger.info(f"🎤 Generating with voice: {voice}")

#         try:
#             lang, speaker_id = self.language_map.get(voice, ('EN', 0))
#             audio = self.model.tts_to_file(
#                 text=clean_text,
#                 speaker_id=speaker_id,
#                 output_path=None
#             )
            
#             # Agar audio numpy array hai toh
#             if isinstance(audio, np.ndarray):
#                 audio_array = audio
#             else:
#                 audio_array, sample_rate = sf.read(audio)
#                 os.remove(audio)
            
#             sample_rate = 24000
#             duration = len(audio_array) / sample_rate

#             wav_buffer = io.BytesIO()
#             sf.write(wav_buffer, audio_array, sample_rate, format='WAV')
#             wav_bytes = wav_buffer.getvalue()

#             logger.info(f"✅ Audio generated: {duration:.2f}s")
#             return wav_bytes, sample_rate, duration

#         except Exception as e:
#             logger.error(f"❌ Generation error: {e}")
#             raise

# # ✅ Singleton instance
# try:
#     tts_engine = TTSEngine()
# except Exception as e:
#     logger.error(f"❌ Failed to initialize TTSEngine: {e}")
#     tts_engine = None

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