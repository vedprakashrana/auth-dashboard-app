# MongoDB Setup Instructions

Since MongoDB is not installed on your system, you have two options:

## Option 1: MongoDB Atlas (Recommended - FREE & Easy)

MongoDB Atlas is a free cloud database. No installation needed!

### Steps:
1. **Go to**: https://www.mongodb.com/cloud/atlas/register
2. **Sign up** for a free account
3. **Create a cluster** (choose FREE tier - M0)
4. **Create a database user**:
   - Click "Database Access"
   - Add new user with password
   - Remember the password!
5. **Whitelist your IP**:
   - Click "Network Access"
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" (for development)
6. **Get connection string**:
   - Click "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/`
7. **Update backend/.env**:
   - Replace `MONGODB_URI` with your connection string
   - Replace `<password>` with your actual password
   - Add `/auth-dashboard` at the end: `...mongodb.net/auth-dashboard?retryWrites=true&w=majority`

**Example:**
```
MONGODB_URI=mongodb+srv://myuser:mypassword123@cluster0.ab12cd.mongodb.net/auth-dashboard?retryWrites=true&w=majority
```

## Option 2: Install MongoDB Locally

### For Windows:
1. Download MongoDB Community Server from:
   https://www.mongodb.com/try/download/community
   
2. Run the installer (choose "Complete" installation)

3. During installation:
   - Check "Install MongoDB as a Service"
   - Keep default data directory

4. After installation, MongoDB will run automatically

5. Or manually start: Open Command Prompt as Admin and run:
   ```
   net start MongoDB
   ```

## After MongoDB Setup

Once MongoDB is ready:

```bash
cd backend
npm run seed    # Create demo user and tasks
npm run dev     # Start backend server
```

Then in another terminal:
```bash
cd frontend
npm run dev     # Already running if you started it
```

## Quick Test
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Demo Login: demo@example.com / demo123
