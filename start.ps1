Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host "   Iniciando RL Tech Enterprise Platform" -ForegroundColor Green
Write-Host "=======================================================" -ForegroundColor Cyan

Write-Host "`n[1/2] Iniciando Backend Python (FastAPI)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; python run.py"

Start-Sleep -Seconds 2

Write-Host "[2/2] Iniciando Frontend React (Vite)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host "`nServiços iniciados com sucesso!" -ForegroundColor Green
Write-Host "Backend:  http://localhost:8000 (Swagger: http://localhost:8000/docs)" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Cyan
