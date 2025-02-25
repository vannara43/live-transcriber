import sys
import subprocess
import whisper
import numpy as np
import threading
import time
from datetime import datetime

# Load Whisper model
model = whisper.load_model("base")

# Function to capture audio in real-time
def capture_and_transcribe():
    ffmpeg_command = [
        "ffmpeg",
        "-f", "dshow",
        "-i", "audio=virtual-audio-capturer",
        "-ac", "1",
        "-ar", "16000",
        "-f", "s16le",
        "pipe:1"
    ]

    # Start ffmpeg subprocess for live capture
    process = subprocess.Popen(
        ffmpeg_command, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL
    )

    print("Recording and transcribing in real-time...")

    buffer_size = 16000 * 10 * 2  # 10 seconds of audio (16000 samples/sec * 2 bytes/sample)
    overlap_size = 16000 * 2 * 2  # 2 seconds overlap for continuity

    audio_buffer = b""

    while True:
        # Read small chunks continuously
        audio_chunk = process.stdout.read(buffer_size)
        if not audio_chunk:
            break

        audio_buffer += audio_chunk

        # If enough data is collected, transcribe
        if len(audio_buffer) >= buffer_size:
            # Convert raw audio bytes to NumPy array
            audio_data = np.frombuffer(audio_buffer, np.int16).flatten().astype(np.float32) / 32768.0

            # Transcribe with Whisper
            # print("Transcribing...")
            result = model.transcribe(audio_data)
            transcript = result.get("text", "").strip()

            if transcript:
                current_time = datetime.now().strftime("%H:%M:%S")
                print(f"[{current_time}] {transcript}")

            # Maintain overlap for continuity
            audio_buffer = audio_buffer[-overlap_size:]

# Main function to start transcription
if __name__ == "__main__":
    try:
        print("Starting continuous real-time transcription...")
        capture_and_transcribe()
    except KeyboardInterrupt:
        print("Transcription stopped by user.")
