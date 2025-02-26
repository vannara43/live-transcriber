# 📖 **Step-by-Step Instructions to Run Live Transcriber**

This guide will walk you through setting up and running the **Live Transcriber** application on your system.

---

## ⚡ **1. Prerequisites**
Before you begin, ensure you have the following installed:

1. **Node.js & npm** – [Download & Install](https://nodejs.org/)
2. **Python (3.8 or later)** – [Download & Install](https://www.python.org/)
3. **FFmpeg** – [Download & Install](https://ffmpeg.org/download.html)
4. **Git** – [Download & Install](https://git-scm.com/)
5. **Virtual Audio Cable or Stereo Mix** (For audio capturing)

---

## 🛠 **2. Clone the Repository**
If you haven't downloaded the project yet, open **Command Prompt (cmd)** or **Git Bash** and run:

```bash
git clone https://github.com/vannara43/live-transcriber.git
cd live-transcriber
```

---

## 📦 **3. Install Dependencies**
Run the following commands to install required packages:

### **🔹 Install Node.js dependencies**
```bash
npm install
```

### **🔹 Set up Python Virtual Environment**
```bash
python -m venv whisper_env
```

### **🔹 Activate the Virtual Environment**
- **Windows (cmd/PowerShell)**
  ```bash
  whisper_env\Scripts\activate
  ```

- **Git Bash**
  ```bash
  source whisper_env/Scripts/activate
  ```

### **🔹 Install Python Dependencies**
```bash
pip install -r requirements.txt
```

---

## 🎙 **4. Configure Audio Input**
Ensure you have **Virtual Audio Capturer** or **Stereo Mix** enabled for recording:

1. **Windows Sound Settings** → Recording Devices
2. Enable **Stereo Mix** or **Virtual Audio Capturer**
3. Set it as the **default recording device**

---

## 🚀 **5. Run the Application**
Once everything is set up, you can start the transcription:

### **🔹 Option 1: Run Electron App**
```bash
npm start
```

### **🔹 Option 2: Run Transcription Directly**
If you just want to run `transcribe.py` and log the output:
```bash
python transcribe.py
```

To log live transcription to a text file:
```bash
python transcribe.py >> transcription_log.txt
```

---

## 📄 **6. Checking the Live Transcription**
- If running **Electron App**, transcription will appear in the UI.
- If running **`transcribe.py` directly**, the transcript will be printed in the terminal and logged in `transcription_log.txt`.

---

## 🛑 **7. Stopping the Transcription**
- **If using Electron App:** Click the **Stop Transcription** button.
- **If running `transcribe.py` manually:** Press `Ctrl + C` to stop.

---

## 🎯 **8. Additional Notes**
- If you face **"Permission Denied"** errors, try running the terminal as **Administrator**.
- If `ffmpeg` is not recognized, add it to the system **PATH**.
- If there's **no audio recording**, ensure **Virtual Audio Capturer** is set as the **default recording device**.

---

## 🎉 **You're Ready!**
You have successfully set up and run the **Live Transcriber**! If you encounter issues, refer to the **troubleshooting** section in the GitHub repository.

🔥 **Enjoy Real-time Transcription!** 🚀
