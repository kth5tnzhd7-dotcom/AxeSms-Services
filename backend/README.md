# AxeSMS Backend API

A Node.js/Express backend for AxeSMS platform with JWT authentication, user management, and admin panel support.

## Features

✅ User authentication (login/signup)
✅ JWT token-based authorization
✅ Role-based access (user/admin)
✅ User profile management
✅ Transaction tracking
✅ Campaign management
✅ Admin dashboard API
✅ CORS enabled

## Quick Start

```bash
npm install
npm run dev
```

Server runs on `http://localhost:5000`

## Project Structure

```
backend/
├── server.js              # Main server entry point
├── db.js                  # In-memory database
├── middleware/
│   └── auth.js            # JWT verification middleware
├── routes/
│   ├── auth.js            # Authentication routes
│   └── users.js           # User & admin routes
├── .env                   # Environment variables
├── .gitignore             # Git ignore file
└── package.json           # Dependencies
```

## API Routes

### Authentication
- `POST /api/auth/login`
- `POST /api/auth/signup`
- `POST /api/auth/logout`

### Users (Protected)
- `GET /api/users/profile`
- `PUT /api/users/profile`
- `GET /api/users/transactions`
- `GET /api/users/campaigns`

### Admin (Protected - Admin only)
- `GET /api/users/admin/users`
- `GET /api/users/admin/transactions`

## Demo Credentials

```
Admin: admin@axesms.services / admin@123
User: demo@axesms.services / demo@123
```

## Environment Variables

```
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
```

## Technologies

- Express.js
- JWT (jsonwebtoken)
- CORS
- dotenv
