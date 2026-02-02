# 🚀 Live Demo Guide

## Application is Running!

✅ **Frontend Server**: http://localhost:5173  
⚠️ **Backend Server**: Not started yet (needs MongoDB)

## To See the Application RIGHT NOW:

### 1. Open Your Browser
- Open any browser (Chrome, Firefox, Edge)
- Go to: **http://localhost:5173**
- You should see a beautiful landing page with gradients!

### 2. What You Can See (Without Backend):

You can explore the **entire UI**:
- ✅ Home page with hero section
- ✅ Beautiful Login page design
- ✅ Beautiful Signup page design
- ✅ Dashboard page layout (without live data)

Just click around the navigation buttons!

### 3. To Get FULL Functionality (Backend + Database):

You need MongoDB. Choose the easiest option:

#### 🌟 EASIEST: MongoDB Atlas (5 minutes, FREE)

1. **Go to**: https://www.mongodb.com/cloud/atlas/register
2. **Sign up** (free, no credit card needed)
3. **Create FREE cluster** (M0 tier)
4. **Create database user**:
   - Username: `demo`
   - Password: `demo123` (or anything you want)
5. **Allow network access**:
   - Click "Network Access"
   - "Add IP Address" → "Allow from anywhere"
6. **Get connection string**:
   - Click "Database" → "Connect"
   - "Connect your application"
   - Copy the string (looks like `mongodb+srv://...`)
7. **Update backend/.env file**:
   ```
   MONGODB_URI=mongodb+srv://demo:demo123@cluster0.xxxxx.mongodb.net/auth-dashboard?retryWrites=true&w=majority
   ```
   (Replace with YOUR connection string)

8. **Start the backend**:
   ```bash
   cd backend
   npm run seed    # Creates demo user
   npm run dev     # Starts backend
   ```

Now everything works! Login with: `demo@example.com` / `demo123`

---

## 📸 What to Expect:

### Home Page
- Beautiful gradient background (blue to cyan to purple)
- Large heading: "Manage Your Tasks Efficiently"
- Feature cards with icons
- "Get Started Free" and "Sign In" buttons

### Login Page
- Centered login form with gradient blue card
- Email and password fields
- Beautiful blue gradient button
- Demo credentials shown at bottom

### Signup Page
- Similar design with purple gradient
- Name, email, password, confirm password fields
- Form validation messages
- Purple gradient button

### Dashboard Page
- Left sidebar with profile
- Task statistics (pending, in-progress, completed)
- Main area with task cards
- Search and filter options
- Create task button
- Beautiful card-based layout

---

## 🎯 Quick Test After MongoDB Setup:

1. **Signup**: Create account
2. **Login**: Use your credentials
3. **Dashboard**: See your profile
4. **Create Task**: Click "New Task" button
5. **Search**: Type in search box
6. **Filter**: Use status/priority dropdowns
7. **Edit Task**: Click edit icon
8. **Delete Task**: Click delete icon
9. **Update Profile**: Click "Edit Profile"

---

## 🐛 Troubleshooting:

**Frontend not loading?**
- Make sure you're at http://localhost:5173
- Check if `npm run dev` is running in the frontend folder

**Backend connection error?**
- Make sure MongoDB is set up (Atlas or local)
- Check if backend/.env has correct MONGODB_URI
- Start backend with `npm run dev` in backend folder

**"Network Error" on login?**
- Backend is not running
- Set up MongoDB first, then start backend

---

## 💡 Pro Tips:

- Frontend auto-refreshes when you make changes
- Backend needs restart after .env changes
- Use Postman collection to test API directly
- Check browser console (F12) for errors

Enjoy exploring your application! 🎉
