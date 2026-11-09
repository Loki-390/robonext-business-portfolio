@echo off
title RoboNext STEM Technologies - Dev Mode
color 0A
echo ====================================================================
echo   ROBONEXT STEM TECHNOLOGIES - DEVELOPMENT MODE (HOT RELOAD)
echo ====================================================================
echo.

cd /d "%~dp0backend"
start "RoboNext Backend API (:5000)" cmd /k "npm start"

cd /d "%~dp0frontend"
start "RoboNext Frontend Vite (:5173)" cmd /k "npm run dev"

timeout /t 3 /nobreak >nul
start http://localhost:5173
echo.
echo Application started in development mode!
echo Public Frontend: http://localhost:5173
echo Backend API:     http://localhost:5000/api/health
echo Admin Login:     http://localhost:5173/admin/login
echo.
pause
