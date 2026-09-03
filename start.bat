@echo off
echo =======================================================
echo    Iniciando RL Tech Enterprise Platform
echo =======================================================
echo.

echo [1/2] Iniciando Backend Python (FastAPI) na porta 8000...
start "RL Tech - Backend FastAPI" cmd /k "cd backend && python run.py"

timeout /t 2 /nobreak >nul

echo [2/2] Iniciando Frontend React (Vite) na porta 5173...
start "RL Tech - Frontend React" cmd /k "cd frontend && npm run dev"

echo.
echo Tudo pronto!
echo Backend:  http://localhost:8000 (Docs: http://localhost:8000/docs)
echo Frontend: http://localhost:5173
echo.
pause
