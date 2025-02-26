# YouTube Live Transcriber

A desktop application that transcribes live YouTube audio streams using OpenAI Whisper and Electron.js. This tool captures audio in real-time and continuously displays the transcription in an intuitive interface.

---

## 🎯 **Features**

- Real-time transcription from YouTube live streams
- Continuous transcription without cutting off
- Automatically scrolls through live transcription
- Simple and responsive user interface
- Easy start and stop controls

---

## 🚀 **Tech Stack & Frameworks**

### 🎛️ Main Frameworks & Libraries

- **Electron.js** - Framework for building cross-platform desktop apps using web technologies.
- **Node.js** - Runtime for executing JavaScript server-side.
- **Python** - Handles transcription logic and Whisper integration.

### 🎙️ Transcription & Audio Libraries

- **OpenAI Whisper** - Speech recognition AI for converting audio into text.
- **FFmpeg** - Command-line tool to capture and process audio streams.
- **yt-dlp** - YouTube video and audio downloader for stream extraction.
- **Virtual Audio Capturer** - Captures system audio output for FFmpeg.

### 🎨 Frontend Libraries

- **HTML5 & CSS3** - Structuring and styling the user interface.
- **Vanilla JavaScript** - Manages DOM manipulation and event handling.

### 📦 Node.js Modules & Tools

- **Electron IPC** - Enables communication between Electron's main and renderer processes.
- **Child Process Module** - Executes external Python scripts from Node.js.

### 💻 Development Tools

- **Visual Studio Code (VSCode)** - Primary code editor.
- **NPM (Node Package Manager)** - Manages project dependencies.
- **Python Virtual Environment (venv)** - Manages Python package dependencies.

---

## 🔧 **Installation Guide**

### 1. **Clone the Repository**
```bash
https://github.com/your-username/yt-live-transcriber.git
cd yt-live-transcriber
```

### 2. **Install Dependencies**

#### For Node.js (Electron App):
```bash
npm install
```

#### For Python Environment:
```bash
python -m venv whisper_env
source whisper_env/bin/activate  # On Windows: whisper_env\Scripts\activate
pip install -r requirements.txt
```

### 3. **Install FFmpeg**
Make sure FFmpeg is installed and accessible via system PATH.
- Download: [FFmpeg Official Site](https://ffmpeg.org/download.html)

### 4. **Install Virtual Audio Capturer**
- Download: [Virtual Audio Capturer](https://github.com/rdp/screen-capture-recorder-to-video-windows-free)

---

## 🎮 **Usage Instructions**

### 1. **Run the Application**
```bash
npm start
```

### 2. **Controls**
- **Start Transcription:** Begins live transcription from the captured audio.
- **Stop Transcription:** Stops the ongoing transcription.

### 3. **Output**
The transcribed text will display automatically and scroll in the transcription window.

---

## 🛠️ **Troubleshooting**

- **FFmpeg Error:** Ensure FFmpeg is properly installed and available in your system PATH.
- **No Audio Captured:** Make sure the correct audio device (e.g., `virtual-audio-capturer`) is selected.
- **Python Environment Error:** Check that the virtual environment is activated.

---

## 📄 **License**

This project is licensed under the MIT License. See the LICENSE file for more information.

---

## 🙌 **Credits**

- [OpenAI Whisper](https://github.com/openai/whisper)
- [Electron.js](https://www.electronjs.org/)
- [yt-dlp](https://github.com/yt-dlp/yt-dlp)
- [FFmpeg](https://ffmpeg.org/)

