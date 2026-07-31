FROM python:3.11-slim-bookworm

ENV DEBIAN_FRONTEND=noninteractive

# System dependencies (C++ compiler, ffmpeg, espeak)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    gcc \
    g++ \
    ffmpeg \
    espeak-ng \
    libsndfile1 \
    libespeak-ng-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# ✅ Timeout increase + retries
COPY requirements.txt .
RUN pip install --no-cache-dir --default-timeout=300 --retries=10 -r requirements.txt

# Baqi code copy karo
COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]