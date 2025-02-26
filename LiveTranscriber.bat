@echo off
call whisper_env\Scripts\activate
start cmd /k "powershell Get-Content transcription_log.txt -Wait"
python transcribe.py
pause
