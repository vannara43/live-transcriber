const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;
let transcriptionProcess;

// Create the main window
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true, // Important for security
        }
    });

    mainWindow.loadFile('index.html');
}

// Initialize the app
app.whenReady().then(createWindow);

// Close app on all windows closed (except macOS)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Handle re-creation for macOS
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// ✅ Start Transcription Process
ipcMain.on('start-transcription', () => {
    if (transcriptionProcess) {
        console.log("Transcription is already running.");
        return;
    }

    const pythonPath = path.join(__dirname, 'whisper_env', 'Scripts', 'python.exe'); // ✅ Correct path for Python executable
    const scriptPath = path.join(__dirname, 'transcribe.py'); // Path to your Python transcription script

    transcriptionProcess = spawn(pythonPath, [scriptPath]);

    console.log("Started transcription process...");

    transcriptionProcess.stdout.on("data", (data) => {
        const output = data.toString();
        console.log("Transcription: ", output);
        mainWindow.webContents.send("transcription-result", output);
    });

    transcriptionProcess.stderr.on("data", (data) => {
        console.error("Transcription Error:", data.toString());
    });

    transcriptionProcess.on('close', (code) => {
        console.log(`Transcription process exited with code ${code}`);
        transcriptionProcess = null;
    });
});

// ✅ Stop Transcription Process
ipcMain.on('stop-transcription', () => {
    if (transcriptionProcess) {
        transcriptionProcess.kill();
        transcriptionProcess = null;
        console.log("Stopped transcription process.");
    }
});
