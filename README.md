# Directory Microservice

A company directory & HR training orchestrator built with React, Node.js, and PostgreSQL.

## 🚀 **Live URLs**
- **Frontend**: https://directory-microservice-frontend.vercel.app/
- **Backend**: https://directory-microservice-backend-production.up.railway.app/

## Architecture

This project follows the Onion Architecture pattern:

```
/src
 ├── domain/          # Core entities and business rules
 ├── application/     # Use cases, workflows, coordination
 ├── infrastructure/  # DB, APIs, integrations
 ├── presentation/    # Controllers, routes, UI entry
 ├── frontend/        # React app
 ├── database/
 │     ├── migrations/
 │     └── mocks/
 └── tests/
```

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS (deployed on Vercel)
- **Backend**: Node.js + Express.js (deployed on Railway)
- **Database**: PostgreSQL (hosted on Supabase)
- **Language**: JavaScript (ES6)

## Features

- 🏢 Organization & Company Management
- 👤 Employee Profile Creation & Enrichment
- 🧑‍🏫 HR Training Requests
- 👩‍💼 HR Role & Permissions
- 🧱 Integrations Layer (mock-first with rollback)

## Development

```bash
# Install dependencies
npm install

# Start development servers
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Deploy
npm run deploy
```

## Environment Variables

See `.env.example` files in frontend and backend directories for required environment variables.

## 🚀 **Deployment Status**
✅ Frontend deployed to Vercel  
✅ Backend deployed to Railway  
✅ GitHub Actions configured  
✅ API integration working  

**Last updated**: 2025-10-26 - Fixed routing and deployment issues
