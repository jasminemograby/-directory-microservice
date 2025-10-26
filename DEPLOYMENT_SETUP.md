# GitHub Deployment Setup Guide

## Prerequisites
Before deploying, you need to set up accounts and get API tokens:

### 1. Vercel Setup (Frontend)
1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Create a new project
3. Get your tokens:
   - Go to Settings → Tokens → Create Token
   - Copy the token (you'll need this for `VERCEL_TOKEN`)
   - Go to your project settings and copy:
     - Organization ID (`VERCEL_ORG_ID`)
     - Project ID (`VERCEL_PROJECT_ID`)

### 2. Railway Setup (Backend)
1. Go to [railway.app](https://railway.app) and sign up/login
2. Create a new project
3. Get your token:
   - Go to Account Settings → Tokens → Create Token
   - Copy the token (you'll need this for `RAILWAY_TOKEN`)

### 3. Supabase Setup (Database)
1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Create a new project
3. Get your database URL:
   - Go to Settings → Database
   - Copy the connection string (you'll need this for `DATABASE_URL`)

## GitHub Repository Setup

### Step 1: Initialize Git Repository
```bash
# In your LOTUS directory
git init
git add .
git commit -m "Initial commit: Directory Microservice with full stack"
```

### Step 2: Create GitHub Repository
1. Go to [github.com](https://github.com) and create a new repository
2. Name it: `directory-microservice`
3. Make it public or private (your choice)
4. Don't initialize with README (we already have files)

### Step 3: Connect Local Repository to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/directory-microservice.git
git branch -M main
git push -u origin main
```

### Step 4: Set up GitHub Secrets
Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these secrets:
- `VERCEL_TOKEN` - Your Vercel API token
- `VERCEL_ORG_ID` - Your Vercel organization ID
- `VERCEL_PROJECT_ID` - Your Vercel project ID
- `RAILWAY_TOKEN` - Your Railway API token
- `DATABASE_URL` - Your Supabase database URL
- `BACKEND_URL` - Will be set after Railway deployment
- `FRONTEND_URL` - Will be set after Vercel deployment

## Deployment Process

### Automatic Deployment
Once you push to the `main` branch, GitHub Actions will automatically:
1. Build and deploy frontend to Vercel
2. Deploy backend to Railway
3. Run health checks

### Manual Deployment (Alternative)

#### Deploy Frontend to Vercel:
```bash
cd frontend
npx vercel --prod
```

#### Deploy Backend to Railway:
```bash
cd backend
npx @railway/cli@latest login
npx @railway/cli@latest up
```

## Environment Variables Setup

### Frontend Environment Variables
Create `frontend/.env.production`:
```
VITE_API_URL=https://your-backend-url.railway.app/api
```

### Backend Environment Variables
Set these in Railway dashboard:
```
NODE_ENV=production
PORT=3001
DATABASE_URL=your-supabase-url
JWT_SECRET=your-jwt-secret
CORS_ORIGIN=https://your-frontend-url.vercel.app
```

## Post-Deployment Steps

### 1. Update GitHub Secrets
After deployment, update these secrets with actual URLs:
- `BACKEND_URL` = `https://your-backend-url.railway.app`
- `FRONTEND_URL` = `https://your-frontend-url.vercel.app`

### 2. Configure CORS
Update backend CORS settings to allow your frontend domain.

### 3. Database Setup
Run the migration script in Supabase:
```sql
-- Copy and run the contents of src/database/migrations/001_initial_schema.sql
```

## Troubleshooting

### Common Issues:
1. **Build Failures**: Check Node.js version compatibility
2. **CORS Errors**: Verify CORS_ORIGIN environment variable
3. **Database Connection**: Check DATABASE_URL format
4. **API Timeouts**: Increase Railway timeout settings

### Debug Commands:
```bash
# Test backend locally
cd backend
npm run dev

# Test frontend locally
cd frontend
npm run dev

# Check build
cd frontend
npm run build
```

## Monitoring
- **Vercel**: Check deployment logs in Vercel dashboard
- **Railway**: Check deployment logs in Railway dashboard
- **GitHub Actions**: Check workflow runs in GitHub Actions tab

## Success Indicators
- ✅ Frontend accessible at Vercel URL
- ✅ Backend health check responding
- ✅ API endpoints working
- ✅ Database connected
- ✅ GitHub Actions workflow passing
