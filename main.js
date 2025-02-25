const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;
let transcriptionProcess = null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 600,
        height: 650,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    mainWindow.loadFile('index.html');

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// Start Electron app
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

// Handle transcription events
ipcMain.on("start-transcription", (event) => {
    if (transcriptionProcess) {
        console.log("Transcription already running.");
        return;
    }

    // Start the transcription process
    console.log("Transcription: Starting...");
    transcriptionProcess = spawn('python', ['transcribe.py']);

    // Capture standard output from the Python script
    transcriptionProcess.stdout.on('data', (data) => {
        event.sender.send('transcription-result', data.toString());
    });

    // Capture any errors
    transcriptionProcess.stderr.on('data', (data) => {
        console.error(`Transcription Error: ${data}`);
    });

    // Handle process exit
    transcriptionProcess.on('close', (code) => {
        console.log(`Transcription process ended with code ${code}`);
        transcriptionProcess = null; // Reset for future starts
    });
});

// Handle stopping the transcription process
ipcMain.on("stop-transcription", () => {
    if (transcriptionProcess) {
        console.log("Transcription: Stopping...");
        transcriptionProcess.kill(); // Kill the running transcription process
        transcriptionProcess = null; // Reset for future starts
    }
});
