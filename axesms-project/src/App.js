// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SiteConfigProvider } from './context/SiteConfigContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminPanel from './admin/AdminPanel';
import {
  VirtualNumbers,
  Wallet,
  Docs,
  Contact,
} from './pages/OtherPages';

// ---- Protected Route ----
function ProtectedRoute({ children, adminOnly = false }) {
  const { isLoggedIn, isAdmin } = useAuth();
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (adminOnly && !isAdmin) return <Navigate to="/dashboard" replace />;
  return children;
}

// ---- Layout (with Navbar + Footer) ----
function Layout({ children, noFooter = false }) {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: '100vh' }}>{children}</div>
      {!noFooter && <Footer />}
    </>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public pages */}
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
      <Route path="/virtual-numbers" element={<Layout><VirtualNumbers /></Layout>} />
      <Route path="/docs" element={<Layout noFooter><Docs /></Layout>} />
      <Route path="/contact" element={<Layout><Contact /></Layout>} />
      <Route path="/login" element={<Login />} />

      {/* Protected: wallet visible to logged-in users */}
      <Route path="/wallet" element={
        <ProtectedRoute>
          <Layout><Wallet /></Layout>
        </ProtectedRoute>
      } />

      {/* Protected: user dashboard */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Layout noFooter><Dashboard /></Layout>
        </ProtectedRoute>
      } />

      {/* Protected: admin only */}
      <Route path="/admin" element={
        <ProtectedRoute adminOnly>
          <Layout noFooter><AdminPanel /></Layout>
        </ProtectedRoute>
      } />

      {/* Fallback */}
      <Route path="*" element={
        <Layout>
          <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: 80 }}>
            <div>
              <div style={{ fontSize: 72, marginBottom: 16 }}>🔍</div>
              <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 32, fontWeight: 700, marginBottom: 12 }}>404 – Page Not Found</h1>
              <p style={{ color: '#64748b', marginBottom: 24 }}>The page you're looking for doesn't exist.</p>
              <a href="/" style={{ background: 'linear-gradient(135deg,#3b82f6,#1d4ed8)', color: '#fff', padding: '12px 24px', borderRadius: 10, fontWeight: 600, fontSize: 15 }}>← Go Home</a>
            </div>
          </div>
        </Layout>
      } />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SiteConfigProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </SiteConfigProvider>
    </BrowserRouter>
  );
}
