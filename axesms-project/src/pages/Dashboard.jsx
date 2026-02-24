// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button, Badge, Card, StatCard, Alert } from '../components/UI';

const campaigns = [
  { name: 'Diwali Sale 2026', channel: 'SMS', sent: '50,000', delivered: '49,200', rate: '98.4%', status: 'Completed', date: 'Feb 20' },
  { name: 'OTP Verification', channel: 'SMS', sent: '1,20,000', delivered: '1,18,500', rate: '98.7%', status: 'Running', date: 'Feb 23' },
  { name: 'Newsletter March', channel: 'Email', sent: '25,000', delivered: '24,100', rate: '96.4%', status: 'Completed', date: 'Feb 18' },
  { name: 'Product Launch WA', channel: 'WhatsApp', sent: '8,000', delivered: '7,750', rate: '96.8%', status: 'Scheduled', date: 'Feb 25' },
];

const statusColor = { Running: 'green', Completed: 'blue', Scheduled: 'orange', Failed: 'red' };
const channelColor = { SMS: 'blue', WhatsApp: 'green', Email: 'purple' };

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showSendModal, setShowSendModal] = useState(false);

  const sidebarItems = [
    { icon: '📊', label: 'Overview',        key: 'overview' },
    { icon: '📤', label: 'Send Message',    key: 'send' },
    { icon: '📋', label: 'Campaigns',       key: 'campaigns' },
    { icon: '📱', label: 'Virtual Numbers', key: 'vnums', link: '/virtual-numbers' },
    { icon: '💳', label: 'Wallet',          key: 'wallet', link: '/wallet' },
    { icon: '📈', label: 'Analytics',       key: 'analytics' },
    { icon: '🔑', label: 'API Keys',        key: 'apikeys' },
    { icon: '⚙️', label: 'Settings',        key: 'settings' },
  ];

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', paddingTop: 80 }}>
      {/* Sidebar */}
      <aside style={{ width: 240, background: 'var(--bg2)', borderRight: '1px solid var(--border2)', padding: '24px 0', flexShrink: 0, position: 'sticky', top: 80, height: 'calc(100vh - 80px)', overflowY: 'auto' }}>
        {/* User Info */}
        <div style={{ padding: '0 16px 20px', borderBottom: '1px solid var(--border2)', marginBottom: 12 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14 }}>{user?.name?.[0] || 'U'}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{user?.name}</div>
              <div style={{ fontSize: 12, color: '#475569' }}>₹{user?.balance?.toLocaleString()} balance</div>
            </div>
          </div>
        </div>
        {sidebarItems.map(item => (
          item.link ? (
            <Link key={item.key} to={item.link} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '11px 20px', fontSize: 14, fontWeight: 500, color: '#64748b', textDecoration: 'none', transition: 'all 0.2s', borderLeft: '3px solid transparent' }}
              onMouseEnter={e => e.currentTarget.style.color = '#94a3b8'}
              onMouseLeave={e => e.currentTarget.style.color = '#64748b'}>
              <span>{item.icon}</span>{item.label}
            </Link>
          ) : (
            <button key={item.key} onClick={() => setActiveTab(item.key)} style={{ display: 'flex', gap: 12, alignItems: 'center', width: '100%', padding: '11px 20px', fontSize: 14, fontWeight: 500, color: activeTab === item.key ? '#60a5fa' : '#64748b', background: activeTab === item.key ? 'rgba(59,130,246,0.08)' : 'transparent', borderLeft: '3px solid ' + (activeTab === item.key ? '#3b82f6' : 'transparent'), border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s', textAlign: 'left' }}>
              <span>{item.icon}</span>{item.label}
            </button>
          )
        ))}
        <div style={{ padding: '20px 16px 0', borderTop: '1px solid var(--border2)', marginTop: 12 }}>
          <Button variant="ghost" size="sm" style={{ width: '100%', justifyContent: 'center' }} onClick={handleLogout}>🚪 Logout</Button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '32px 36px', overflowY: 'auto', minHeight: 0 }}>
        {activeTab === 'overview' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
              <div>
                <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 24, fontWeight: 700, marginBottom: 4 }}>Welcome back, {user?.name?.split(' ')[0]} 👋</h1>
                <p style={{ color: '#64748b', fontSize: 14 }}>Here's your messaging overview for today.</p>
              </div>
              <Button onClick={() => setActiveTab('send')}>+ New Campaign</Button>
            </div>

            {/* Low balance alert */}
            {user?.balance < 500 && <Alert type="warning">Your wallet balance is low (₹{user?.balance}). <Link to="/wallet" style={{ color: '#facc15', fontWeight: 600 }}>Add money →</Link></Alert>}

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16, marginBottom: 28 }}>
              <StatCard icon="💬" label="SMS Sent Today" value="12,480" change="+8.2%" changeUp />
              <StatCard icon="🟢" label="WhatsApp Delivered" value="3,220" change="+12.1%" changeUp />
              <StatCard icon="📧" label="Emails Sent" value="45,000" change="-2.3%" changeUp={false} />
              <StatCard icon="💳" label="Wallet Balance" value={`₹${user?.balance?.toLocaleString()}`} />
            </div>

            {/* Campaigns Table */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginBottom: 24 }}>
              <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--border2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 16, fontWeight: 600 }}>Recent Campaigns</h3>
                <Button variant="secondary" size="sm" onClick={() => setActiveTab('campaigns')}>View All</Button>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: 'rgba(0,0,0,0.2)' }}>
                      {['Campaign','Channel','Sent','Delivered','Rate','Status','Date'].map(h => (
                        <th key={h} style={{ padding: '11px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#475569', letterSpacing: 0.5, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.map((c, i) => (
                      <tr key={i} style={{ borderTop: '1px solid var(--border2)', transition: 'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                        onMouseLeave={e => e.currentTarget.style.background = ''}>
                        <td style={{ padding: '13px 20px', fontSize: 14, fontWeight: 500 }}>{c.name}</td>
                        <td style={{ padding: '13px 20px' }}><Badge color={channelColor[c.channel]}>{c.channel}</Badge></td>
                        <td style={{ padding: '13px 20px', fontSize: 14, color: '#94a3b8' }}>{c.sent}</td>
                        <td style={{ padding: '13px 20px', fontSize: 14, color: '#94a3b8' }}>{c.delivered}</td>
                        <td style={{ padding: '13px 20px', fontSize: 14, color: '#4ade80', fontWeight: 600 }}>{c.rate}</td>
                        <td style={{ padding: '13px 20px' }}><Badge color={statusColor[c.status]}>{c.status}</Badge></td>
                        <td style={{ padding: '13px 20px', fontSize: 13, color: '#475569' }}>{c.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Charts Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Card>
                <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16, color: '#94a3b8' }}>📈 Delivery Rate (Last 7 days)</h4>
                <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 70 }}>
                  {[85,92,88,96,91,98,94].map((v,i) => (
                    <div key={i} title={`${v}%`} style={{ flex: 1, background: `rgba(59,130,246,${v/130})`, borderRadius: '3px 3px 0 0', height: `${v*0.72}%`, transition: 'height 0.3s' }} />
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                  {['M','T','W','T','F','S','S'].map((d,i) => <span key={i} style={{ fontSize: 11, color: '#475569', flex: 1, textAlign: 'center' }}>{d}</span>)}
                </div>
              </Card>
              <Card>
                <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16, color: '#94a3b8' }}>📊 Channel Split</h4>
                {[['SMS', 65, '#3b82f6'], ['WhatsApp', 25, '#4ade80'], ['Email', 10, '#a78bfa']].map(([c, p, col]) => (
                  <div key={c} style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 5 }}>
                      <span style={{ color: '#94a3b8' }}>{c}</span><span style={{ color: col, fontWeight: 600 }}>{p}%</span>
                    </div>
                    <div style={{ height: 6, background: 'var(--bg3)', borderRadius: 4 }}>
                      <div style={{ height: '100%', width: `${p}%`, background: col, borderRadius: 4, transition: 'width 0.5s' }} />
                    </div>
                  </div>
                ))}
              </Card>
            </div>
          </>
        )}

        {activeTab === 'send' && (
          <div style={{ maxWidth: 600 }}>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 24 }}>📤 Send New Message</h2>
            <Card>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Channel</label>
                <select style={{ width: '100%', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 10, padding: '11px 14px', color: '#e8edf5', fontSize: 14 }}>
                  <option>💬 Bulk SMS</option>
                  <option>🟢 WhatsApp</option>
                  <option>📧 Email</option>
                </select>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Recipients</label>
                <textarea placeholder="+919876543210&#10;+919876543211&#10;Or upload CSV..." rows={4} style={{ width: '100%', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 10, padding: '11px 14px', color: '#e8edf5', fontSize: 14, resize: 'vertical' }} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Message</label>
                <textarea placeholder="Type your message..." rows={4} style={{ width: '100%', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 10, padding: '11px 14px', color: '#e8edf5', fontSize: 14, resize: 'vertical' }} />
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <Button style={{ flex: 1, justifyContent: 'center' }}>📤 Send Now</Button>
                <Button variant="secondary" style={{ flex: 1, justifyContent: 'center' }}>📅 Schedule</Button>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'apikeys' && (
          <div style={{ maxWidth: 700 }}>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 24 }}>🔑 API Keys</h2>
            <Alert type="warning">Keep your API keys secret. Do not expose them in client-side code.</Alert>
            {[
              { label: 'Live API Key', key: 'axe_live_sk_xxxxxxxxxxxxxxxxxxxxxxxx', active: true },
              { label: 'Test API Key', key: 'axe_test_sk_xxxxxxxxxxxxxxxxxxxxxxxx', active: false },
            ].map(k => (
              <Card key={k.label} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{k.label}</div>
                    <Badge color={k.active ? 'green' : 'orange'}>{k.active ? 'Live' : 'Test'}</Badge>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Button variant="secondary" size="sm">Copy</Button>
                    <Button variant="danger" size="sm">Revoke</Button>
                  </div>
                </div>
                <div style={{ background: 'var(--bg3)', borderRadius: 8, padding: '10px 14px', fontFamily: 'monospace', fontSize: 13, color: '#64748b', letterSpacing: 1 }}>{k.key}</div>
              </Card>
            ))}
            <Button>+ Generate New Key</Button>
          </div>
        )}

        {activeTab === 'settings' && (
          <div style={{ maxWidth: 600 }}>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 24 }}>⚙️ Account Settings</h2>
            <Card style={{ marginBottom: 20 }}>
              <h3 style={{ fontWeight: 600, marginBottom: 20 }}>Profile</h3>
              {[['Full Name', user?.name, 'text'], ['Email', user?.email, 'email'], ['Phone', '+91 98765 43210', 'tel']].map(([l, v, t]) => (
                <div key={l} style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#94a3b8', display: 'block', marginBottom: 6 }}>{l}</label>
                  <input defaultValue={v} type={t} style={{ width: '100%', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 10, padding: '11px 14px', color: '#e8edf5', fontSize: 14 }} />
                </div>
              ))}
              <Button>Save Changes</Button>
            </Card>
            <Card>
              <h3 style={{ fontWeight: 600, marginBottom: 20 }}>Change Password</h3>
              {['Current Password', 'New Password', 'Confirm Password'].map(l => (
                <div key={l} style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#94a3b8', display: 'block', marginBottom: 6 }}>{l}</label>
                  <input type="password" placeholder="••••••••" style={{ width: '100%', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 10, padding: '11px 14px', color: '#e8edf5', fontSize: 14 }} />
                </div>
              ))}
              <Button variant="secondary">Update Password</Button>
            </Card>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 24 }}>📈 Analytics</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16, marginBottom: 24 }}>
              {[['Total Sent','5,82,480','📤'],['Delivered','5,70,000','✅'],['Failed','12,480','❌'],['Cost Saved','₹18,450','💰']].map(([l,v,i]) => (
                <StatCard key={l} icon={i} label={l} value={v} />
              ))}
            </div>
            <Alert type="info">Full analytics with graphs coming soon. Currently showing summary data.</Alert>
          </div>
        )}

        {activeTab === 'campaigns' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 700 }}>📋 All Campaigns</h2>
              <Button onClick={() => setActiveTab('send')}>+ New Campaign</Button>
            </div>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: 'rgba(0,0,0,0.2)' }}>
                      {['Campaign','Channel','Sent','Delivered','Rate','Status','Date'].map(h => (
                        <th key={h} style={{ padding: '11px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#475569', letterSpacing: 0.5, textTransform: 'uppercase' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.map((c, i) => (
                      <tr key={i} style={{ borderTop: '1px solid var(--border2)' }}>
                        <td style={{ padding: '13px 20px', fontSize: 14, fontWeight: 500 }}>{c.name}</td>
                        <td style={{ padding: '13px 20px' }}><Badge color={channelColor[c.channel]}>{c.channel}</Badge></td>
                        <td style={{ padding: '13px 20px', fontSize: 14, color: '#94a3b8' }}>{c.sent}</td>
                        <td style={{ padding: '13px 20px', fontSize: 14, color: '#94a3b8' }}>{c.delivered}</td>
                        <td style={{ padding: '13px 20px', fontSize: 14, color: '#4ade80', fontWeight: 600 }}>{c.rate}</td>
                        <td style={{ padding: '13px 20px' }}><Badge color={statusColor[c.status]}>{c.status}</Badge></td>
                        <td style={{ padding: '13px 20px', fontSize: 13, color: '#475569' }}>{c.date}</td>
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
