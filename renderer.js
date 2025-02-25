document.getElementById('start-button').addEventListener('click', () => {
    const url = document.getElementById('youtube-url').value;
    if (window.electronAPI && window.electronAPI.startTranscription) {
        window.electronAPI.startTranscription(url);
    }
});

document.getElementById('stop-button').addEventListener('click', () => {
    if (window.electronAPI && window.electronAPI.stopTranscription) {
        window.electronAPI.stopTranscription();
    }
});

if (window.electronAPI && window.electronAPI.onTranscriptionUpdate) {
    window.electronAPI.onTranscriptionUpdate((text) => {
        const transcriptArea = document.getElementById('transcript');
        transcriptArea.textContent += text + '\n';
    });
}
