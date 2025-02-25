const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    startTranscription: (youtubeURL) => ipcRenderer.send('start-transcription', youtubeURL),
    stopTranscription: () => ipcRenderer.send('stop-transcription'),
    onTranscriptionUpdate: (callback) => ipcRenderer.on('transcription-update', (event, data) => callback(data))
});
