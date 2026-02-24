// src/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSiteConfig } from '../context/SiteConfigContext';
import { Button, Alert, Input } from '../components/UI';

export default function Login() {
  const [params] = useSearchParams();
  const [mode, setMode] = useState(params.get('tab') === 'signup' ? 'signup' : 'login');
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup, isLoggedIn, user } = useAuth();
  const { config } = useSiteConfig();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate(user?.role === 'admin' ? '/admin' : '/dashboard');
  }, [isLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    if (mode === 'login') {
      const result = login(form.email, form.password);
      if (result.success) navigate(result.role === 'admin' ? '/admin' : '/dashboard');
      else setError(result.error);
    } else {
      if (!form.name || !form.email || !form.password) {
        setError('Please fill all required fields.');
      } else {
        signup(form.name, form.email, form.phone, form.password);
        navigate('/dashboard');
      }
    }
    setLoading(false);
  };

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 20px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(59,130,246,0.06) 0%,transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 460, position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Link to="/" style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 26, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>⚡</div>
            Axe<span style={{ color: '#3b82f6' }}>SMS</span>
          </Link>
          <p style={{ fontSize: 13, color: '#64748b' }}>
            {mode === 'login' ? 'Welcome back! Sign in to your account.' : `Create free account. Get ${config.site.freeCredits} credits instantly.`}
          </p>
        </div>

        {/* Mode Toggle */}
        <div style={{ display: 'flex', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 4, marginBottom: 24 }}>
          {[['login', 'Login'], ['signup', 'Sign Up']].map(([m, label]) => (
            <button key={m} onClick={() => { setMode(m); setError(''); }} style={{ flex: 1, padding: 10, borderRadius: 9, fontSize: 14, fontWeight: 600, background: mode === m ? 'linear-gradient(135deg,#3b82f6,#1d4ed8)' : 'transparent', color: mode === m ? '#fff' : '#64748b', border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}>
              {label}
            </button>
          ))}
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 28 }}>
          {error && <Alert type="error">{error}</Alert>}

          {/* Demo creds hint */}
          <div style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 12, color: '#64748b', lineHeight: 1.6 }}>
            <strong style={{ color: '#60a5fa' }}>Demo Login:</strong><br />
            User: demo@axesms.services / demo@123<br />
            Admin: admin@axesms.services / admin@123
          </div>

          <form onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <>
                <Input label="Full Name" placeholder="Rahul Sharma" value={form.name} onChange={update('name')} required icon="👤" />
                <Input label="Phone Number" placeholder="+91 98765 43210" type="tel" value={form.phone} onChange={update('phone')} icon="📱" />
              </>
            )}
            <Input label="Email Address" placeholder="you@example.com" type="email" value={form.email} onChange={update('email')} required icon="📧" />
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: '#94a3b8' }}>Password <span style={{ color: '#ef4444' }}>*</span></label>
                {mode === 'login' && <span style={{ fontSize: 13, color: '#3b82f6', cursor: 'pointer' }}>Forgot password?</span>}
              </div>
              <input type="password" value={form.password} onChange={update('password')} placeholder="••••••••" required
                style={{ width: '100%', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 10, padding: '11px 14px', color: '#e8edf5', fontSize: 14, marginBottom: 20 }}
                onFocus={e => e.target.style.borderColor = 'rgba(59,130,246,0.4)'}
                onBlur={e => e.target.style.borderColor = 'rgba(59,130,246,0.12)'}
              />
            </div>
            <Button type="submit" style={{ width: '100%', justifyContent: 'center' }} size="lg" disabled={loading}>
              {loading ? '⏳ Please wait...' : mode === 'login' ? 'Login to Dashboard →' : 'Create Free Account →'}
            </Button>
            {mode === 'signup' && (
              <p style={{ fontSize: 12, color: '#475569', textAlign: 'center', marginTop: 14, lineHeight: 1.5 }}>
                By signing up, you agree to our <Link to="/" style={{ color: '#3b82f6' }}>Terms of Service</Link> & <Link to="/" style={{ color: '#3b82f6' }}>Privacy Policy</Link>.
              </p>
            )}
          </form>
        </div>

        {mode === 'signup' && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 20, flexWrap: 'wrap' }}>
            {['✅ Free ₹50 Credits', '🔒 No Credit Card', '⚡ Instant Access'].map(t => (
              <span key={t} style={{ fontSize: 12, color: '#475569' }}>{t}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
