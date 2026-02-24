// src/admin/AdminPanel.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSiteConfig } from '../context/SiteConfigContext';
import { Button, Badge, Card, Alert, Toggle, Input } from '../components/UI';

function AdminSidebar({ active, setActive }) {
  const sections = [
    { key: 'overview',      icon: '📊', label: 'Overview'         },
    { key: 'social',        icon: '🔗', label: 'Social Links'     },
    { key: 'pricing',       icon: '💰', label: 'Pricing Control'  },
    { key: 'announcement',  icon: '📢', label: 'Announcement'     },
    { key: 'stats',         icon: '📈', label: 'Homepage Stats'   },
    { key: 'features',      icon: '🎛️', label: 'Feature Flags'    },
    { key: 'site',          icon: '🌐', label: 'Site Settings'    },
    { key: 'users',         icon: '👥', label: 'Users'            },
  ];
  return (
    <aside style={{ width: 240, background: 'var(--bg2)', borderRight: '1px solid var(--border2)', padding: '24px 0', flexShrink: 0, height: '100%' }}>
      <div style={{ padding: '0 16px 20px', borderBottom: '1px solid var(--border2)', marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#ef4444', marginBottom: 4 }}>⚙️ Admin Panel</div>
        <div style={{ fontSize: 12, color: '#475569' }}>Full site control</div>
      </div>
      {sections.map(s => (
        <button key={s.key} onClick={() => setActive(s.key)} style={{ display: 'flex', gap: 12, alignItems: 'center', width: '100%', padding: '11px 20px', fontSize: 14, fontWeight: 500, color: active === s.key ? '#60a5fa' : '#64748b', background: active === s.key ? 'rgba(59,130,246,0.08)' : 'transparent', borderLeft: '3px solid ' + (active === s.key ? '#3b82f6' : 'transparent'), border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s', textAlign: 'left' }}>
          <span>{s.icon}</span>{s.label}
        </button>
      ))}
      <div style={{ padding: '20px 16px 0', borderTop: '1px solid var(--border2)', marginTop: 12 }}>
        <Link to="/"><Button variant="ghost" size="sm" style={{ width: '100%', justifyContent: 'center' }}>← View Site</Button></Link>
      </div>
    </aside>
  );
}

export default function AdminPanel() {
  const { user, isAdmin, logout } = useAuth();
  const { config, updateSection, resetConfig } = useSiteConfig();
  const navigate = useNavigate();
  const [active, setActive] = useState('overview');
  const [saved, setSaved] = useState(false);
  const [localLinks, setLocalLinks] = useState({ ...config.links });
  const [localPricing, setLocalPricing] = useState({ ...config.pricing });
  const [localAnnouncement, setLocalAnnouncement] = useState({ ...config.announcement });
  const [localStats, setLocalStats] = useState({ ...config.stats });
  const [localSite, setLocalSite] = useState({ ...config.site });
  const [localFeatures, setLocalFeatures] = useState({ ...config.features });

  if (!isAdmin) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🚫</div>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Access Denied</h2>
          <p style={{ color: '#64748b', marginBottom: 24 }}>You don't have admin access.</p>
          <Link to="/login"><Button>Go to Login</Button></Link>
        </div>
      </div>
    );
  }

  const showSaved = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const saveLinks = () => { updateSection('links', localLinks); showSaved(); };
  const savePricing = () => { updateSection('pricing', localPricing); showSaved(); };
  const saveAnnouncement = () => { updateSection('announcement', localAnnouncement); showSaved(); };
  const saveStats = () => { updateSection('stats', localStats); showSaved(); };
  const saveSite = () => { updateSection('site', localSite); showSaved(); };
  const saveFeatures = () => { updateSection('features', localFeatures); showSaved(); };

  const fieldRow = (label, value, onChange, type = 'text', hint) => (
    <div key={label} style={{ marginBottom: 16 }}>
      <label style={{ fontSize: 13, fontWeight: 500, color: '#94a3b8', display: 'block', marginBottom: 5 }}>{label}</label>
      {hint && <div style={{ fontSize: 12, color: '#475569', marginBottom: 4 }}>{hint}</div>}
      <input type={type} value={value} onChange={e => onChange(e.target.value)}
        style={{ width: '100%', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 14px', color: '#e8edf5', fontSize: 14 }}
        onFocus={e => e.target.style.borderColor = 'rgba(59,130,246,0.4)'}
        onBlur={e => e.target.style.borderColor = 'rgba(59,130,246,0.12)'}
      />
    </div>
  );

  const demoUsers = [
    { name: 'Rahul Sharma', email: 'demo@axesms.services', role: 'User', balance: '₹2,450', joined: 'Feb 10, 2026', status: 'Active' },
    { name: 'Priya Singh',  email: 'priya@test.com',       role: 'User', balance: '₹8,200', joined: 'Jan 25, 2026', status: 'Active' },
    { name: 'Amit Patel',   email: 'amit@brand.com',       role: 'User', balance: '₹150',   joined: 'Feb 15, 2026', status: 'Active' },
    { name: 'Admin',        email: 'admin@axesms.services', role: 'Admin', balance: '—',    joined: 'Jan 1, 2026',  status: 'Active' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', paddingTop: 80 }}>
      <AdminSidebar active={active} setActive={setActive} />
      <main style={{ flex: 1, padding: '32px 36px', overflowY: 'auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 24, fontWeight: 700, marginBottom: 4 }}>
              {active === 'overview' ? '📊 Admin Overview' :
               active === 'social' ? '🔗 Social & Support Links' :
               active === 'pricing' ? '💰 Pricing Control' :
               active === 'announcement' ? '📢 Announcement Banner' :
               active === 'stats' ? '📈 Homepage Stats' :
               active === 'features' ? '🎛️ Feature Flags' :
               active === 'site' ? '🌐 Site Settings' : '👥 Users'}
            </h1>
            <p style={{ color: '#64748b', fontSize: 14 }}>Changes save instantly and reflect on the live site.</p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {saved && <Alert type="success" style={{ margin: 0 }}>✅ Saved!</Alert>}
            <Button variant="danger" size="sm" onClick={() => { resetConfig(); showSaved(); }}>Reset All</Button>
          </div>
        </div>

        {/* ---- OVERVIEW ---- */}
        {active === 'overview' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16, marginBottom: 28 }}>
              {[['👥','Total Users','4 users'],['💬','SMS Today','12,480'],['💰','Revenue Today','₹24,500'],['🟢','Platform Status','All Systems Go']].map(([icon,label,val]) => (
                <Card key={label}>
                  <div style={{ fontSize: 24, marginBottom: 10 }}>{icon}</div>
                  <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>{label}</div>
                  <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 700 }}>{val}</div>
                </Card>
              ))}
            </div>
            <Alert type="info">Welcome to the Admin Panel. Use the sidebar to manage site links, pricing, announcements, and more. All changes are saved to browser localStorage and reflect instantly.</Alert>
            <Card>
              <h3 style={{ fontWeight: 600, marginBottom: 16 }}>Quick Actions</h3>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {[['Edit Social Links','social'],['Update Pricing','pricing'],['Edit Announcement','announcement'],['Manage Features','features']].map(([label, key]) => (
                  <Button key={key} variant="secondary" size="sm" onClick={() => setActive(key)}>{label}</Button>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* ---- SOCIAL LINKS ---- */}
        {active === 'social' && (
          <Card>
            <p style={{ color: '#64748b', fontSize: 14, marginBottom: 24 }}>These links appear in the footer, CTA section, and contact page. Update them whenever you change your handles.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
              {fieldRow('✈️ Telegram Link', localLinks.telegram, v => setLocalLinks({...localLinks, telegram: v}), 'url', 'e.g. https://t.me/yourchannel')}
              {fieldRow('🟢 WhatsApp Link', localLinks.whatsapp, v => setLocalLinks({...localLinks, whatsapp: v}), 'url', 'e.g. https://wa.me/919876543210')}
              {fieldRow('▶️ YouTube Channel', localLinks.youtube, v => setLocalLinks({...localLinks, youtube: v}), 'url', 'e.g. https://youtube.com/@yourchannel')}
              {fieldRow('🐦 Twitter / X', localLinks.twitter, v => setLocalLinks({...localLinks, twitter: v}), 'url')}
              {fieldRow('📷 Instagram', localLinks.instagram, v => setLocalLinks({...localLinks, instagram: v}), 'url')}
              {fieldRow('📘 Facebook', localLinks.facebook, v => setLocalLinks({...localLinks, facebook: v}), 'url')}
              {fieldRow('📧 Support Email', localLinks.supportEmail, v => setLocalLinks({...localLinks, supportEmail: v}), 'email')}
              {fieldRow('📞 Support Phone', localLinks.supportPhone, v => setLocalLinks({...localLinks, supportPhone: v}), 'tel')}
            </div>
            <Button onClick={saveLinks}>💾 Save Social Links</Button>
          </Card>
        )}

        {/* ---- PRICING ---- */}
        {active === 'pricing' && (
          <Card>
            <p style={{ color: '#64748b', fontSize: 14, marginBottom: 24 }}>These values appear on Pricing page, Home page teaser, and wallet page. Update rates anytime.</p>
            <div style={{ marginBottom: 20 }}>
              <h4 style={{ fontWeight: 600, color: '#94a3b8', marginBottom: 16, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>Per Message Rates (shown on homepage)</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0 20px' }}>
                {fieldRow('SMS Rate', localPricing.smsRate, v => setLocalPricing({...localPricing, smsRate: v}), 'text', 'e.g. ₹0.10')}
                {fieldRow('WhatsApp Rate', localPricing.whatsappRate, v => setLocalPricing({...localPricing, whatsappRate: v}), 'text', 'e.g. ₹0.35')}
                {fieldRow('Email Rate', localPricing.emailRate, v => setLocalPricing({...localPricing, emailRate: v}), 'text', 'e.g. ₹0.02')}
              </div>
            </div>
            <div style={{ borderTop: '1px solid var(--border2)', paddingTop: 20, marginBottom: 20 }}>
              <h4 style={{ fontWeight: 600, color: '#94a3b8', marginBottom: 16, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>Starter Plan Price</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
                {fieldRow('Monthly Price (₹)', localPricing.starterMonthly, v => setLocalPricing({...localPricing, starterMonthly: Number(v)}), 'number')}
                {fieldRow('Yearly Price (₹)', localPricing.starterYearly, v => setLocalPricing({...localPricing, starterYearly: Number(v)}), 'number')}
              </div>
            </div>
            <div style={{ borderTop: '1px solid var(--border2)', paddingTop: 20, marginBottom: 20 }}>
              <h4 style={{ fontWeight: 600, color: '#94a3b8', marginBottom: 16, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>Growth Plan Price</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
                {fieldRow('Monthly Price (₹)', localPricing.growthMonthly, v => setLocalPricing({...localPricing, growthMonthly: Number(v)}), 'number')}
                {fieldRow('Yearly Price (₹)', localPricing.growthYearly, v => setLocalPricing({...localPricing, growthYearly: Number(v)}), 'number')}
              </div>
            </div>
            <div style={{ borderTop: '1px solid var(--border2)', paddingTop: 20, marginBottom: 24 }}>
              <h4 style={{ fontWeight: 600, color: '#94a3b8', marginBottom: 16, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>Pro Plan Price</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
                {fieldRow('Monthly Price (₹)', localPricing.proMonthly, v => setLocalPricing({...localPricing, proMonthly: Number(v)}), 'number')}
                {fieldRow('Yearly Price (₹)', localPricing.proYearly, v => setLocalPricing({...localPricing, proYearly: Number(v)}), 'number')}
              </div>
            </div>
            <Button onClick={savePricing}>💾 Save Pricing</Button>
          </Card>
        )}

        {/* ---- ANNOUNCEMENT ---- */}
        {active === 'announcement' && (
          <Card>
            <p style={{ color: '#64748b', fontSize: 14, marginBottom: 24 }}>The announcement banner appears at the very top of the website. Use it for promotions, new features, or important notices.</p>
            <div style={{ marginBottom: 20 }}>
              <Toggle checked={localAnnouncement.enabled} onChange={v => setLocalAnnouncement({...localAnnouncement, enabled: v})} label="Show announcement banner" />
            </div>
            {fieldRow('📢 Announcement Text', localAnnouncement.text, v => setLocalAnnouncement({...localAnnouncement, text: v}))}
            {fieldRow('🔗 Link URL (optional)', localAnnouncement.link, v => setLocalAnnouncement({...localAnnouncement, link: v}), 'url', 'e.g. /pricing')}
            {fieldRow('🏷️ Link Label (optional)', localAnnouncement.linkText, v => setLocalAnnouncement({...localAnnouncement, linkText: v}))}
            <div style={{ background: 'linear-gradient(90deg,rgba(59,130,246,0.15),rgba(6,182,212,0.15))', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 10, padding: '12px 16px', marginBottom: 20, fontSize: 13, color: '#94a3b8' }}>
              <strong style={{ color: '#60a5fa' }}>Preview: </strong>{localAnnouncement.text} <span style={{ color: '#60a5fa', fontWeight: 600 }}>{localAnnouncement.linkText} →</span>
            </div>
            <Button onClick={saveAnnouncement}>💾 Save Announcement</Button>
          </Card>
        )}

        {/* ---- STATS ---- */}
        {active === 'stats' && (
          <Card>
            <p style={{ color: '#64748b', fontSize: 14, marginBottom: 24 }}>These stats are displayed on the homepage hero section to build trust with visitors.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
              {fieldRow('Messages Sent', localStats.messagesSent, v => setLocalStats({...localStats, messagesSent: v}), 'text', 'e.g. 500M+')}
              {fieldRow('Delivery Rate', localStats.deliveryRate, v => setLocalStats({...localStats, deliveryRate: v}), 'text', 'e.g. 99.9%')}
              {fieldRow('Happy Clients', localStats.happyClients, v => setLocalStats({...localStats, happyClients: v}), 'text', 'e.g. 10,000+')}
              {fieldRow('Uptime SLA', localStats.uptime, v => setLocalStats({...localStats, uptime: v}), 'text', 'e.g. 99.99%')}
            </div>
            <Button onClick={saveStats}>💾 Save Stats</Button>
          </Card>
        )}

        {/* ---- FEATURES ---- */}
        {active === 'features' && (
          <Card>
            <p style={{ color: '#64748b', fontSize: 14, marginBottom: 24 }}>Toggle features on/off across the entire website. Disabled features are hidden from the navbar and pages.</p>
            {[
              ['virtualNumbers', '📱 Virtual Numbers page', 'Shows/hides Virtual Numbers in nav and pages'],
              ['whatsapp', '🟢 WhatsApp messaging', 'Shows WhatsApp option across dashboard and pricing'],
              ['email', '📧 Email messaging', 'Shows Email option across dashboard and pricing'],
              ['sms', '💬 SMS messaging', 'Shows SMS option across dashboard and pricing'],
              ['apiDocs', '🔌 API Docs page', 'Shows/hides Docs in navigation'],
              ['blog', '📝 Blog section', 'Coming soon - currently hidden by default'],
            ].map(([key, label, hint]) => (
              <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid var(--border2)' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{label}</div>
                  <div style={{ fontSize: 12, color: '#475569', marginTop: 2 }}>{hint}</div>
                </div>
                <Toggle checked={localFeatures[key]} onChange={v => setLocalFeatures({...localFeatures, [key]: v})} />
              </div>
            ))}
            <div style={{ marginTop: 20 }}>
              <Button onClick={saveFeatures}>💾 Save Features</Button>
            </div>
          </Card>
        )}

        {/* ---- SITE SETTINGS ---- */}
        {active === 'site' && (
          <Card>
            <p style={{ color: '#64748b', fontSize: 14, marginBottom: 24 }}>Core site configuration values used throughout the website.</p>
            {fieldRow('Site Name', localSite.name, v => setLocalSite({...localSite, name: v}))}
            {fieldRow('Tagline', localSite.tagline, v => setLocalSite({...localSite, tagline: v}), 'text', 'Shown in hero announcement badge')}
            {fieldRow('Free Credits Amount', localSite.freeCredits, v => setLocalSite({...localSite, freeCredits: v}), 'text', 'e.g. ₹50 — shown on signup CTA buttons')}
            {fieldRow('Support Hours', localSite.supportHours, v => setLocalSite({...localSite, supportHours: v}), 'text', 'e.g. Mon–Sat, 9 AM – 8 PM IST')}
            <Button onClick={saveSite}>💾 Save Site Settings</Button>
          </Card>
        )}

        {/* ---- USERS ---- */}
        {active === 'users' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <p style={{ color: '#64748b', fontSize: 14 }}>Demo user list — connect to real backend for full CRUD.</p>
              <Button size="sm">+ Add User</Button>
            </div>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: 'rgba(0,0,0,0.2)' }}>
                      {['Name','Email','Role','Balance','Joined','Status','Actions'].map(h => (
                        <th key={h} style={{ padding: '11px 18px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: 0.5 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {demoUsers.map((u, i) => (
                      <tr key={i} style={{ borderTop: '1px solid var(--border2)' }}>
                        <td style={{ padding: '12px 18px', fontSize: 14, fontWeight: 500 }}>
                          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                            <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{u.name[0]}</div>
                            {u.name}
                          </div>
                        </td>
                        <td style={{ padding: '12px 18px', fontSize: 13, color: '#64748b' }}>{u.email}</td>
                        <td style={{ padding: '12px 18px' }}><Badge color={u.role === 'Admin' ? 'red' : 'blue'}>{u.role}</Badge></td>
                        <td style={{ padding: '12px 18px', fontSize: 14, color: '#4ade80', fontWeight: 600 }}>{u.balance}</td>
                        <td style={{ padding: '12px 18px', fontSize: 13, color: '#475569' }}>{u.joined}</td>
                        <td style={{ padding: '12px 18px' }}><Badge color="green">{u.status}</Badge></td>
                        <td style={{ padding: '12px 18px' }}>
                          <div style={{ display: 'flex', gap: 6 }}>
                            <Button variant="secondary" size="xs">Edit</Button>
                            {u.role !== 'Admin' && <Button variant="danger" size="xs">Ban</Button>}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
