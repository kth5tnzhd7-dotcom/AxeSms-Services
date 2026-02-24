// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSiteConfig } from '../context/SiteConfigContext';

export default function Footer() {
  const { config } = useSiteConfig();
  const { links } = config;

  const socialLinks = [
    { icon: '✈️', label: 'Telegram', href: links.telegram },
    { icon: '🟢', label: 'WhatsApp', href: links.whatsapp },
    { icon: '▶️', label: 'YouTube', href: links.youtube },
    { icon: '🐦', label: 'Twitter', href: links.twitter },
    { icon: '📷', label: 'Instagram', href: links.instagram },
  ];

  return (
    <footer style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border2)', padding: '60px 5% 32px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 48 }}>
        {/* Brand */}
        <div>
          <Link to="/" style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>⚡</div>
            Axe<span style={{ color: '#3b82f6' }}>SMS</span>
          </Link>
          <p style={{ color: '#475569', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
            India's most affordable bulk messaging platform. SMS, WhatsApp, Email & Virtual Numbers — all in one place.
          </p>
          {/* Social Icons */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
            {socialLinks.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)'; e.currentTarget.style.transform = 'scale(1.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.12)'; e.currentTarget.style.transform = ''; }}
                title={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['PayU', 'UPI', 'SSL', 'DLT'].map(b => (
              <span key={b} style={{ padding: '3px 10px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, fontSize: 11, fontWeight: 600, color: '#475569' }}>{b}</span>
            ))}
          </div>
        </div>

        {/* Product */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#64748b', marginBottom: 16 }}>Product</div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[['Pricing', '/pricing'], ['Virtual Numbers', '/virtual-numbers'], ['Wallet', '/wallet'], ['API Docs', '/docs'], ['Dashboard', '/dashboard']].map(([l, p]) => (
              <li key={l}><Link to={p} style={{ fontSize: 14, color: '#475569', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#94a3b8'}
                onMouseLeave={e => e.currentTarget.style.color = '#475569'}>{l}</Link></li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#64748b', marginBottom: 16 }}>Company</div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[['Home', '/'], ['Contact', '/contact'], ['Blog', '/'], ['Careers', '/']].map(([l, p]) => (
              <li key={l}><Link to={p} style={{ fontSize: 14, color: '#475569', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#94a3b8'}
                onMouseLeave={e => e.currentTarget.style.color = '#475569'}>{l}</Link></li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#64748b', marginBottom: 16 }}>Legal</div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[['Privacy Policy', '/'], ['Terms of Service', '/'], ['Refund Policy', '/'], ['DLT Compliance', '/']].map(([l, p]) => (
              <li key={l}><Link to={p} style={{ fontSize: 14, color: '#475569', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#94a3b8'}
                onMouseLeave={e => e.currentTarget.style.color = '#475569'}>{l}</Link></li>
            ))}
          </ul>
          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 12, color: '#475569', marginBottom: 4 }}>📧 {links.supportEmail}</div>
            <div style={{ fontSize: 12, color: '#475569' }}>📞 {links.supportPhone}</div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--border2)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ fontSize: 13, color: '#334155' }}>© 2026 AxeSMS Services. All rights reserved.</div>
        <div style={{ fontSize: 13, color: '#334155' }}>Made with ❤️ in India 🇮🇳</div>
      </div>
    </footer>
  );
}
