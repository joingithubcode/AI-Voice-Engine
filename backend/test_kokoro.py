from kokoro import KModel, KPipeline
import soundfile as sf
import torch
import os

# Path kokoro model folder ka
KOKORO_DIR = os.path.join("models_data", "tts", "kokoro-82m")

device = 'cuda' if torch.cuda.is_available() else 'cpu'
print(f"Using device: {device}")

# Model load karo
model = KModel(
    config=os.path.join(KOKORO_DIR, "config.json"),
    model=os.path.join(KOKORO_DIR, "kokoro-v1_0.pth")
).to(device).eval()

pipeline = KPipeline(lang_code='a', model=model)

# Test text
text = "Hello, this is a test of Kokoro voice generation."

generator = pipeline(text, voice='af_heart', speed=1.0)

for i, (gs, ps, audio) in enumerate(generator):
    sf.write(f'test_output_{i}.wav', audio, 24000)
    print(f"✅ Saved test_output_{i}.wav")

print("🎉 Done!")