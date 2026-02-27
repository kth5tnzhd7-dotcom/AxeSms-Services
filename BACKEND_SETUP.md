# Backend Setup Instructions

## 📚 Prerequisites
- Node.js 16+ installed
- npm

## 🚀 Installation & Running Backend

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configuration
The `.env` file is already configured:
- **PORT**: 5000
- **JWT_SECRET**: AxeSMS secret key (change in production!)
- **FRONTEND_URL**: http://localhost:3000

### 3. Start Backend Development Server
```bash
npm run dev
# Or for production:
npm start
```

The backend will start on `http://localhost:5000`

### 🔗 API Endpoints

#### Authentication
- `POST /api/auth/login` - Login user
  ```json
  { "email": "demo@axesms.services", "password": "demo@123" }
  ```
- `POST /api/auth/signup` - Register new user
  ```json
  { "name": "John", "email": "john@axesms.services", "phone": "+919876543210", "password": "pass123", "confirmPassword": "pass123" }
  ```

#### Users (Protected)
- `GET /api/users/profile` - Get user profile (requires token)
- `PUT /api/users/profile` - Update profile
- `GET /api/users/transactions` - Get user transactions
- `GET /api/users/campaigns` - Get user campaigns

#### Admin Only
- `GET /api/users/admin/users` - Get all users
- `GET /api/users/admin/transactions` - Get all transactions

### 🔐 Demo Credentials

**Admin**
- Email: `admin@axesms.services`
- Password: `admin@123`

**User**
- Email: `demo@axesms.services`
- Password: `demo@123`

### 🧪 Testing with cURL

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@axesms.services","password":"demo@123"}'

# Get Profile (use token from login)
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 📝 Frontend Configuration

The frontend is already configured to connect to the backend:
- Create a `.env` file in the frontend folder with:
  ```
  REACT_APP_API_URL=http://localhost:5000/api
  ```

## 🎯 Running Full Stack

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd axesms-project
npm install
npm start
```

Then open http://localhost:3000

## 📦 Database
Currently using in-memory database. For production, integrate:
- PostgreSQL
- MongoDB
- Firebase
- SQLite

## 🔒 Security Notes
- Change `JWT_SECRET` in production
- Use bcryptjs for password hashing (currently just for demo)
- Add rate limiting
- Add input validation with joi/zod
- Use HTTPS in production
