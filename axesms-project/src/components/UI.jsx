// src/components/UI.jsx
import React from 'react';

export function Badge({ children, color = 'blue' }) {
  const colors = {
    blue:   { bg: 'rgba(59,130,246,0.1)',  border: 'rgba(59,130,246,0.25)',  text: '#60a5fa' },
    green:  { bg: 'rgba(34,197,94,0.1)',   border: 'rgba(34,197,94,0.25)',   text: '#4ade80' },
    cyan:   { bg: 'rgba(6,182,212,0.1)',   border: 'rgba(6,182,212,0.25)',   text: '#22d3ee' },
    orange: { bg: 'rgba(249,115,22,0.1)',  border: 'rgba(249,115,22,0.25)',  text: '#fb923c' },
    purple: { bg: 'rgba(139,92,246,0.1)',  border: 'rgba(139,92,246,0.25)', text: '#a78bfa' },
    red:    { bg: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.25)',   text: '#f87171' },
    yellow: { bg: 'rgba(234,179,8,0.1)',   border: 'rgba(234,179,8,0.25)',   text: '#facc15' },
  };
  const c = colors[color] || colors.blue;
  return (
    <span style={{
      background: c.bg, border: `1px solid ${c.border}`, color: c.text,
      padding: '3px 10px', borderRadius: 100, fontSize: 12, fontWeight: 600,
      display: 'inline-flex', alignItems: 'center', gap: 4,
    }}>
      {children}
    </span>
  );
}

export function Button({ children, variant = 'primary', size = 'md', onClick, style: s = {}, to, href, disabled, type = 'button' }) {
  const sizes = {
    xs: { padding: '5px 12px', fontSize: 12 },
    sm: { padding: '7px 16px', fontSize: 13 },
    md: { padding: '10px 22px', fontSize: 14 },
    lg: { padding: '13px 28px', fontSize: 16 },
  };
  const variants = {
    primary:  { background: 'linear-gradient(135deg,#3b82f6,#1d4ed8)', color: '#fff', border: 'none', boxShadow: '0 4px 20px rgba(59,130,246,0.3)' },
    secondary:{ background: 'rgba(59,130,246,0.08)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.2)' },
    ghost:    { background: 'transparent', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.08)' },
    danger:   { background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' },
    success:  { background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: '#fff', border: 'none' },
    warning:  { background: 'rgba(234,179,8,0.1)', color: '#facc15', border: '1px solid rgba(234,179,8,0.2)' },
  };
  const base = {
    ...sizes[size], ...variants[variant],
    borderRadius: 10, fontWeight: 600, fontFamily: 'inherit',
    transition: 'all 0.2s', cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: 8,
    opacity: disabled ? 0.5 : 1, ...s,
  };
  return (
    <button type={type} style={base} onClick={disabled ? undefined : onClick}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.transform = 'translateY(-1px)'; }}
      onMouseLeave={e => e.currentTarget.style.transform = ''}>
      {children}
    </button>
  );
}

export function Card({ children, style: s = {}, glow = false, hover = false }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => hover && setHovered(true)}
      onMouseLeave={() => hover && setHovered(false)}
      style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 16, padding: 28, position: 'relative', overflow: 'hidden',
        transition: 'all 0.3s',
        ...(glow ? { boxShadow: '0 0 40px rgba(59,130,246,0.08)' } : {}),
        ...(hover && hovered ? { borderColor: 'rgba(59,130,246,0.3)', transform: 'translateY(-4px)' } : {}),
        ...s,
      }}>
      {children}
    </div>
  );
}

export function SectionHeader({ tag, title, sub, center = false }) {
  return (
    <div style={{ textAlign: center ? 'center' : 'left', marginBottom: 56 }}>
      {tag && <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#3b82f6', marginBottom: 12 }}>{tag}</div>}
      <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(26px,4vw,46px)', fontWeight: 700, letterSpacing: -1, lineHeight: 1.1, marginBottom: 14 }}>{title}</h2>
      {sub && <p style={{ color: '#64748b', fontSize: 16, lineHeight: 1.7, maxWidth: center ? 520 : 'none', margin: center ? '0 auto' : 0 }}>{sub}</p>}
    </div>
  );
}

export function Input({ label, placeholder, type = 'text', value, onChange, icon, required, style: s = {} }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && <label style={{ fontSize: 13, fontWeight: 500, color: '#94a3b8', display: 'block', marginBottom: 6 }}>{label}{required && <span style={{ color: '#ef4444' }}> *</span>}</label>}
      <div style={{ position: 'relative' }}>
        {icon && <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 16 }}>{icon}</span>}
        <input
          type={type} value={value} onChange={onChange} placeholder={placeholder} required={required}
          style={{ width: '100%', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 10, padding: icon ? '11px 14px 11px 38px' : '11px 14px', color: '#e8edf5', fontSize: 14, transition: 'border-color 0.2s', ...s }}
          onFocus={e => e.target.style.borderColor = 'rgba(59,130,246,0.4)'}
          onBlur={e => e.target.style.borderColor = 'rgba(59,130,246,0.12)'}
        />
      </div>
    </div>
  );
}

export function Select({ label, children, value, onChange, style: s = {} }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && <label style={{ fontSize: 13, fontWeight: 500, color: '#94a3b8', display: 'block', marginBottom: 6 }}>{label}</label>}
      <select value={value} onChange={onChange}
        style={{ width: '100%', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 10, padding: '11px 14px', color: '#e8edf5', fontSize: 14, cursor: 'pointer', ...s }}>
        {children}
      </select>
    </div>
  );
}

export function Toggle({ checked, onChange, label }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
      <div onClick={() => onChange(!checked)} style={{
        width: 44, height: 24, borderRadius: 12, background: checked ? '#3b82f6' : '#1e293b',
        position: 'relative', transition: 'background 0.2s', border: '1px solid ' + (checked ? '#2563eb' : 'rgba(255,255,255,0.1)'),
      }}>
        <div style={{
          position: 'absolute', top: 2, left: checked ? 22 : 2, width: 18, height: 18,
          borderRadius: '50%', background: '#fff', transition: 'left 0.2s',
        }} />
      </div>
      {label && <span style={{ fontSize: 14, color: '#94a3b8' }}>{label}</span>}
    </label>
  );
}

export function Spinner() {
  return (
    <div style={{ width: 20, height: 20, border: '2px solid rgba(59,130,246,0.2)', borderTop: '2px solid #3b82f6', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
  );
}

export function Alert({ type = 'info', children }) {
  const styles = {
    info:    { bg: 'rgba(59,130,246,0.08)',  border: 'rgba(59,130,246,0.2)',  color: '#60a5fa',  icon: 'ℹ️' },
    success: { bg: 'rgba(34,197,94,0.08)',   border: 'rgba(34,197,94,0.2)',   color: '#4ade80',  icon: '✅' },
    warning: { bg: 'rgba(234,179,8,0.08)',   border: 'rgba(234,179,8,0.2)',   color: '#facc15',  icon: '⚠️' },
    error:   { bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.2)',   color: '#f87171',  icon: '❌' },
  };
  const st = styles[type];
  return (
    <div style={{ background: st.bg, border: `1px solid ${st.border}`, borderRadius: 10, padding: '12px 16px', display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 16 }}>
      <span>{st.icon}</span>
      <span style={{ fontSize: 14, color: st.color, lineHeight: 1.5 }}>{children}</span>
    </div>
  );
}

export function StatCard({ icon, label, value, change, changeUp }) {
  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: 20 }}>{icon}</span>
      </div>
      <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 28, fontWeight: 700, marginBottom: 6 }}>{value}</div>
      {change && <div style={{ fontSize: 12, color: changeUp ? '#4ade80' : '#f87171' }}>{change} vs yesterday</div>}
    </Card>
  );
}
