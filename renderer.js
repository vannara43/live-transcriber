// const { ipcRenderer } = require("electron");

// document.getElementById("start").addEventListener("click", () => {
//     ipcRenderer.send("start-transcription");
// });

// document.getElementById("stop").addEventListener("click", () => {
//     ipcRenderer.send("stop-transcription");
// });

// ipcRenderer.on("transcription-result", (event, transcription) => {
//     const log = document.getElementById("transcription-log");
//     log.innerText += transcription + "\n";
//     log.scrollTop = log.scrollHeight; // Auto-scroll to the bottom
// });

document.getElementById("start").addEventListener("click", () => {
    window.electronAPI.startTranscription();
});

document.getElementById("stop").addEventListener("click", () => {
    window.electronAPI.stopTranscription();
});

window.electronAPI.onTranscriptionResult((transcription) => {
    const log = document.getElementById("transcription-log");
    log.innerText += transcription + "\n";
    log.scrollTop = log.scrollHeight; // Auto-scroll
});