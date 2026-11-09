@echo off
title RoboNext STEM Technologies - Full-Stack Local Launcher
color 0B
echo ====================================================================
echo   ROBONEXT STEM TECHNOLOGIES - LOCAL WEB APPLICATION LAUNCHER
echo ====================================================================
echo.
echo Starting RoboNext Backend and Web Application on port 5000...
echo.

cd /d "%~dp0backend"
start "RoboNext Backend & Web Server" cmd /k "node server.js"

echo Waiting for server to initialize...
timeout /t 3 /nobreak >nul

echo.
echo Opening your browser to http://localhost:5000 ...
start http://localhost:5000

echo.
echo ====================================================================
echo   WEB APPLICATION RUNNING!
echo   - Public Website: http://localhost:5000
echo   - Admin Portal:   http://localhost:5000/admin/login
echo   - Default Admin:  admin@robonext.com / Admin@123
echo ====================================================================
echo.
pause
