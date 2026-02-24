// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSiteConfig } from '../context/SiteConfigContext';
import { Button } from './UI';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout, isAdmin, isLoggedIn } = useAuth();
  const { config } = useSiteConfig();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Pricing', to: '/pricing' },
    config.features.virtualNumbers && { label: 'Virtual Numbers', to: '/virtual-numbers' },
    config.features.apiDocs && { label: 'Docs', to: '/docs' },
    { label: 'Contact', to: '/contact' },
  ].filter(Boolean);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isDashboard = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/admin');

  return (
    <>
      {/* Announcement Banner */}
      {config.announcement.enabled && !isDashboard && (
        <div style={{
          background: 'linear-gradient(90deg,rgba(59,130,246,0.15),rgba(6,182,212,0.15))',
          borderBottom: '1px solid rgba(59,130,246,0.2)',
          padding: '8px 5%', textAlign: 'center', fontSize: 13, color: '#94a3b8',
          position: 'relative', zIndex: 101,
        }}>
          {config.announcement.text}
          {config.announcement.link && (
            <Link to={config.announcement.link} style={{ color: '#60a5fa', marginLeft: 8, fontWeight: 600 }}>
              {config.announcement.linkText} →
            </Link>
          )}
        </div>
      )}

      <nav style={{
        position: 'fixed', top: config.announcement.enabled && !isDashboard ? 37 : 0,
        left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 5%',
        background: scrolled ? 'rgba(8,12,20,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(59,130,246,0.1)' : '1px solid transparent',
        transition: 'all 0.3s',
      }}>
        {/* Logo */}
        <Link to="/" style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>⚡</div>
          Axe<span style={{ color: '#3b82f6' }}>SMS</span>
        </Link>

        {/* Desktop Links */}
        <ul style={{ display: 'flex', gap: 2, listStyle: 'none', alignItems: 'center' }}>
          {navLinks.map(l => (
            <li key={l.to}>
              <Link to={l.to} style={{
                padding: '7px 14px', borderRadius: 8, fontSize: 14, fontWeight: 500, display: 'block',
                color: location.pathname === l.to ? '#fff' : '#64748b',
                background: location.pathname === l.to ? 'rgba(59,130,246,0.12)' : 'transparent',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = location.pathname === l.to ? '#fff' : '#64748b'}
              >{l.label}</Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {isLoggedIn ? (
            <>
              <span style={{ fontSize: 13, color: '#64748b' }}>Hi, {user.name.split(' ')[0]}</span>
              {isAdmin && (
                <Link to="/admin">
                  <Button variant="warning" size="sm">⚙️ Admin</Button>
                </Link>
              )}
              <Link to="/dashboard">
                <Button variant="secondary" size="sm">Dashboard</Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Link to="/login"><Button variant="ghost" size="sm">Login</Button></Link>
              <Link to="/login?tab=signup"><Button size="sm">Get Started →</Button></Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
