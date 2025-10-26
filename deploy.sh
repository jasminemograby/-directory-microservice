#!/bin/bash

# Directory Microservice - Quick Deploy Script
# This script helps you deploy the application step by step

echo "🚀 Directory Microservice - Deployment Helper"
echo "=============================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit: Directory Microservice with full stack"
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Check if all dependencies are installed
echo "📦 Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo "Installing root dependencies..."
    npm install
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "Installing frontend dependencies..."
    cd frontend && npm install && cd ..
fi

if [ ! -d "backend/node_modules" ]; then
    echo "Installing backend dependencies..."
    cd backend && npm install && cd ..
fi

echo "✅ All dependencies installed"

# Build frontend
echo "🔨 Building frontend..."
cd frontend
npm run build
cd ..
echo "✅ Frontend built successfully"

# Test backend
echo "🧪 Testing backend..."
cd backend
timeout 10s npm run dev &
BACKEND_PID=$!
sleep 5
if curl -f http://localhost:3001/health > /dev/null 2>&1; then
    echo "✅ Backend is working"
    kill $BACKEND_PID 2>/dev/null
else
    echo "❌ Backend test failed"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi
cd ..

echo ""
echo "🎉 Setup Complete! Ready for deployment."
echo ""
echo "Next steps:"
echo "1. Create GitHub repository"
echo "2. Set up Vercel, Railway, and Supabase accounts"
echo "3. Add secrets to GitHub repository"
echo "4. Push to GitHub to trigger automatic deployment"
echo ""
echo "For detailed instructions, see DEPLOYMENT_SETUP.md"
echo ""
echo "Quick commands:"
echo "  git remote add origin <your-github-repo-url>"
echo "  git push -u origin main"
echo ""
