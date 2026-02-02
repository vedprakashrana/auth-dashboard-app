# Quick Start Guide

## Prerequisites
- Node.js (v16+)
- MongoDB installed locally OR MongoDB Atlas account

## Setup Steps

### 1. Install MongoDB (Choose ONE option)

**Option A: Local MongoDB (Windows)**
```bash
# Download from: https://www.mongodb.com/try/download/community
# Or use chocolatey:
choco install mongodb

# Start MongoDB
mongod
```

**Option B: MongoDB Atlas (Cloud - Recommended)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update `backend/.env` with your connection string

### 2. Backend Setup
```bash
cd auth-dashboard-app/backend
npm install

# Update .env file if using MongoDB Atlas
# Then seed the database
npm run seed

# Start backend server
npm run dev
```

Backend runs on: http://localhost:5000

### 3. Frontend Setup
```bash
cd auth-dashboard-app/frontend
npm install

# Start frontend dev server
npm run dev
```

Frontend runs on: http://localhost:5173

### 4. Test the Application

**Demo Credentials:**
- Email: demo@example.com
- Password: demo123

**Test Flow:**
1. Open http://localhost:5173
2. Click "Sign Up" to create account OR
3. Click "Login" and use demo credentials
4. Access dashboard to manage tasks
5. Try creating, editing, deleting tasks
6. Test search and filters

## Troubleshooting

**MongoDB Connection Error:**
- Make sure MongoDB is running (`mongod` command)
- Or verify MongoDB Atlas connection string in `.env`

**Port Already in Use:**
- Backend: Change PORT in `backend/.env`
- Frontend: Change port in `frontend/vite.config.js`

**Module Not Found:**
- Run `npm install` in both backend and frontend directories

## Docker (Alternative)

```bash
# Start all services with Docker
docker-compose up

# Access:
# Frontend: http://localhost:5173
# Backend: http://localhost:5000
```

## Testing with Postman

1. Import `postman_collection.json` into Postman
2. Test authentication endpoints
3. Copy JWT token from login response
4. Use token for protected endpoints
