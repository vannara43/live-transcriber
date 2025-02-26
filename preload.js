// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electronAPI', {
//     startTranscription: (url) => ipcRenderer.send('start-transcription', url),
//     stopTranscription: () => ipcRenderer.send('stop-transcription'),
//     onTranscriptionResult: (callback) => ipcRenderer.on('transcription-result', (event, transcription) => callback(transcription))
// });

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    startTranscription: () => ipcRenderer.send("start-transcription"),
    stopTranscription: () => ipcRenderer.send("stop-transcription"),
    onTranscriptionResult: (callback) => ipcRenderer.on("transcription-result", (event, data) => callback(data))
});
