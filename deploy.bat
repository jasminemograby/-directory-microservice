@echo off
echo 🚀 Directory Microservice - Deployment Helper
echo ==============================================

REM Check if git is initialized
if not exist ".git" (
    echo 📁 Initializing Git repository...
    git init
    git add .
    git commit -m "Initial commit: Directory Microservice with full stack"
    echo ✅ Git repository initialized
) else (
    echo ✅ Git repository already exists
)

REM Check if all dependencies are installed
echo 📦 Checking dependencies...
if not exist "node_modules" (
    echo Installing root dependencies...
    npm install
)

if not exist "frontend\node_modules" (
    echo Installing frontend dependencies...
    cd frontend
    npm install
    cd ..
)

if not exist "backend\node_modules" (
    echo Installing backend dependencies...
    cd backend
    npm install
    cd ..
)

echo ✅ All dependencies installed

REM Build frontend
echo 🔨 Building frontend...
cd frontend
npm run build
cd ..
echo ✅ Frontend built successfully

REM Test backend
echo 🧪 Testing backend...
cd backend
start /B npm run dev
timeout /t 5 /nobreak > nul
curl -f http://localhost:3001/health > nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Backend is working
) else (
    echo ❌ Backend test failed
    exit /b 1
)
cd ..

echo.
echo 🎉 Setup Complete! Ready for deployment.
echo.
echo Next steps:
echo 1. Create GitHub repository
echo 2. Set up Vercel, Railway, and Supabase accounts
echo 3. Add secrets to GitHub repository
echo 4. Push to GitHub to trigger automatic deployment
echo.
echo For detailed instructions, see DEPLOYMENT_SETUP.md
echo.
echo Quick commands:
echo   git remote add origin ^<your-github-repo-url^>
echo   git push -u origin main
echo.
pause
