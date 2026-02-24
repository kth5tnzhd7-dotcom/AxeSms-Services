// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// Demo credentials
const ADMIN_EMAIL = 'admin@axesms.services';
const ADMIN_PASS = 'admin@123';
const USER_EMAIL = 'demo@axesms.services';
const USER_PASS = 'demo@123';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('axesms_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = (email, password) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      const u = { email, name: 'Admin', role: 'admin', balance: 99999 };
      setUser(u);
      localStorage.setItem('axesms_user', JSON.stringify(u));
      return { success: true, role: 'admin' };
    }
    if (email === USER_EMAIL && password === USER_PASS) {
      const u = { email, name: 'Rahul Sharma', role: 'user', balance: 2450 };
      setUser(u);
      localStorage.setItem('axesms_user', JSON.stringify(u));
      return { success: true, role: 'user' };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const signup = (name, email, phone, password) => {
    const u = { email, name, phone, role: 'user', balance: 50 };
    setUser(u);
    localStorage.setItem('axesms_user', JSON.stringify(u));
    return { success: true, role: 'user' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('axesms_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAdmin: user?.role === 'admin', isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
