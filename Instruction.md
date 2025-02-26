# 🛠 **Step-by-Step Guide to Setting Up the Live Transcriber Project**

This guide will help you set up the **Live Transcriber** project from scratch, including installing dependencies, configuring Electron, integrating Whisper for transcription, and logging data.

---

## ✅ **Step 1: Install Required Software**

Before setting up the project, install the following:

- [**Node.js**](https://nodejs.org/) (for Electron and npm)
- [**Python 3.x**](https://www.python.org/downloads/) (for Whisper)
- [**FFmpeg**](https://ffmpeg.org/download.html) (for capturing audio)
- [**Git**](https://git-scm.com/) (for version control)

---

## ✅ **Step 2: Set Up the Project Directory**

```sh
cd C:\Users\user\Desktop
mkdir YTLiveTranscribe
cd YTLiveTranscribe
```

---

## ✅ **Step 3: Initialize Node.js & Install Electron**

```sh
npm init -y
npm install electron
```

---

## ✅ **Step 4: Set Up Python Virtual Environment**

```sh
python -m venv whisper_env
```

Activate the virtual environment:

- **Windows (CMD)**: `whisper_env\Scripts\activate`
- **Git Bash**: `source whisper_env/Scripts/activate`

Then, install the required Python packages:

```sh
pip install openai-whisper ffmpeg-python numpy
```

---

## ✅ **Step 5: Install yt-dlp for YouTube Audio**

```sh
pip install yt-dlp
```

---

## ✅ **Step 6: Install Electron Dependencies**

```sh
npm install electron ipc-renderer
```

---

## ✅ **Step 7: Create Project Files**

Navigate to the project folder:

```sh
cd C:\Users\user\Desktop\YTLiveTranscribe
```

Create the following files:

```sh
touch main.js preload.js renderer.js transcribe.py index.html style.css
```

---

## ✅ **Step 8: Set Up **``** (Electron Backend)**

This file manages the Electron app, spawns the Python process, and handles IPC communication.

```javascript
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { spawn } = require("child_process");

let mainWindow;
let transcriptionProcess;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, "preload.js"),
        },
    });

    mainWindow.loadFile("index.html");

    ipcMain.on("start-transcription", () => {
        if (!transcriptionProcess) {
            const pythonPath = path.join(__dirname, "whisper_env", "Scripts", "python.exe");
            transcriptionProcess = spawn(pythonPath, ["transcribe.py"]);

            transcriptionProcess.stdout.on("data", (data) => {
                const transcript = data.toString().trim();
                mainWindow.webContents.send("transcription-result", transcript);
            });

            transcriptionProcess.on("close", () => {
                transcriptionProcess = null;
            });
        }
    });

    ipcMain.on("stop-transcription", () => {
        if (transcriptionProcess) {
            transcriptionProcess.kill();
            transcriptionProcess = null;
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
```

---

## ✅ **Step 9: Set Up **``** (Secure Communication)**

```javascript
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
    startTranscription: () => ipcRenderer.send("start-transcription"),
    stopTranscription: () => ipcRenderer.send("stop-transcription"),
    onTranscriptionResult: (callback) => ipcRenderer.on("transcription-result", (_event, transcript) => callback(transcript)),
});
```

---

## ✅ **Step 10: Set Up **``** (Frontend Logic)**

```javascript
document.getElementById("start").addEventListener("click", () => {
    window.electron.startTranscription();
});

document.getElementById("stop").addEventListener("click", () => {
    window.electron.stopTranscription();
});

window.electron.onTranscriptionResult((transcript) => {
    const log = document.getElementById("transcription-log");
    log.innerText += transcript + "\n";
    log.scrollTop = log.scrollHeight;
});
```

---

## ✅ **Step 11: Set Up **``** (Real-Time Transcription)**

```python
import subprocess
import whisper
import time

FFMPEG_CMD = [
    "ffmpeg", "-f", "dshow", "-i", "audio=virtual-audio-capturer",
    "-t", "10", "-ac", "1", "-ar", "16000", "-vn", "recorded_audio.wav"
]

model = whisper.load_model("base")

print("Starting continuous real-time transcription...")

while True:
    subprocess.run(FFMPEG_CMD, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print("Recording audio and starting transcription...")

    result = model.transcribe("recorded_audio.wav")
    transcript = result["text"].strip()

    if transcript:
        print(transcript)
        with open("transcription_log.txt", "a") as log_file:
            log_file.write(transcript + "\n")

    time.sleep(1)
```

---

## ✅ **Step 12: Create a **``** File for Running the App**

```bat
@echo off
cd /d "%~dp0"
call whisper_env\Scripts\activate
python transcribe.py >> transcription_log.txt
```

---

## 🎉 **Congratulations!**

Your **Live Transcriber** is fully set up! 🚀 Now you can **transcribe audio in real-time**, view it in your Electron app, and save it to a text file.

Let me know if you need any modifications! 🔥

