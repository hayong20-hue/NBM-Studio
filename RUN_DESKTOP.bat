@echo off
setlocal
cd /d "%~dp0"
title NBM Studio Pro Desktop Alpha 2
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js 20 LTS is required.
  pause
  exit /b 1
)
if not exist node_modules (
  call npm install
  if errorlevel 1 (
    echo npm install failed.
    pause
    exit /b 1
  )
)
call npm start
pause
