// src/pages/VirtualNumbers.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Badge, SectionHeader } from '../components/UI';

const numbers = [
  { flag: '🇮🇳', country: 'India',       number: '+91 98765 XXXXX', sms: true,  wa: true,  call: false, price: '₹199' },
  { flag: '🇺🇸', country: 'USA',          number: '+1 (555) XXX-XXXX', sms: true, wa: false, call: true,  price: '₹299' },
  { flag: '🇬🇧', country: 'UK',           number: '+44 7XXX XXXXXX',  sms: true,  wa: true,  call: true,  price: '₹349' },
  { flag: '🇦🇺', country: 'Australia',   number: '+61 4XX XXX XXX',   sms: true,  wa: false, call: false, price: '₹399' },
  { flag: '🇨🇦', country: 'Canada',       number: '+1 (604) XXX-XXXX', sms: true, wa: false, call: true,  price: '₹279' },
  { flag: '🇩🇪', country: 'Germany',      number: '+49 1XX XXXXXXX',  sms: true,  wa: true,  call: false, price: '₹399' },
  { flag: '🇸🇬', country: 'Singapore',   number: '+65 8XXX XXXX',     sms: true,  wa: true,  call: true,  price: '₹449' },
  { flag: '🇦🇪', country: 'UAE',          number: '+971 5X XXX XXXX', sms: true,  wa: true,  call: false, price: '₹499' },
  { flag: '🇫🇷', country: 'France',       number: '+33 7XX XXX XXX',  sms: true,  wa: false, call: false, price: '₹349' },
  { flag: '🇯🇵', country: 'Japan',        number: '+81 8X XXXX XXXX', sms: true,  wa: false, call: false, price: '₹549' },
  { flag: '🇧🇷', country: 'Brazil',       number: '+55 11 9XXXX XXXX', sms: true, wa: true,  call: false, price: '₹329' },
  { flag: '🇿🇦', country: 'South Africa', number: '+27 8X XXX XXXX',  sms: true,  wa: true,  call: false, price: '₹379' },
];

export function VirtualNumbers() {
  const [search, setSearch] = useState('');
  const filtered = numbers.filter(n => n.country.toLowerCase().includes(search.toLowerCase()));
  return (
    <div style={{ paddingTop: 80 }}>
      <section style={{ padding: '80px 5%' }}>
        <SectionHeader tag="Virtual Numbers" title="Receive OTPs & Verify Accounts" sub="Rent virtual phone numbers from 30+ countries. Receive SMS, WhatsApp & Calls in your dashboard — like Bird, TextNow & Twilio." center />
        <div style={{ display: 'flex', gap: 16, marginBottom: 48, flexWrap: 'wrap' }}>
          {[['🌍','Choose Country','Pick from 30+ countries'],['📱','Receive Instantly','SMS arrives in dashboard'],['🔄','Auto-Forward','To email or webhook'],['🔒','Private','Dedicated to your account']].map(([icon,title,desc]) => (
            <div key={title} style={{ flex: 1, minWidth: 200, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 20 }}>
              <div style={{ fontSize: 26, marginBottom: 10 }}>{icon}</div>
              <div style={{ fontWeight: 600, marginBottom: 5 }}>{title}</div>
              <div style={{ fontSize: 13, color: '#64748b' }}>{desc}</div>
            </div>
          ))}
        </div>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search country..." style={{ width: '100%', maxWidth: 380, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '11px 16px', color: '#e8edf5', fontSize: 14, marginBottom: 28 }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(270px,1fr))', gap: 16 }}>
          {filtered.map(n => (
            <div key={n.country}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(59,130,246,0.12)'}
              style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, transition: 'all 0.3s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 28, marginBottom: 4 }}>{n.flag}</div>
                  <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 16, fontWeight: 700 }}>{n.country}</div>
                  <div style={{ fontFamily: 'monospace', fontSize: 12, color: '#64748b', marginTop: 2 }}>{n.number}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 700, color: '#3b82f6' }}>{n.price}</div>
                  <div style={{ fontSize: 11, color: '#475569' }}>/month</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
                {n.sms && <Badge color="blue">SMS</Badge>}
                {n.wa && <Badge color="green">WhatsApp</Badge>}
                {n.call && <Badge color="orange">Calls</Badge>}
              </div>
              <Link to="/login?tab=signup" style={{ display: 'block' }}>
                <Button style={{ width: '100%', justifyContent: 'center' }} size="sm">Get This Number</Button>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ============================================================
// WALLET PAGE
// ============================================================
export function Wallet() {
  const [amount, setAmount] = useState(500);
  const [method, setMethod] = useState('upi');
  const presets = [100, 200, 500, 1000, 2000, 5000];
  const txns = [
    { date: 'Feb 23, 2026', desc: 'Wallet Recharge via UPI', amount: '+₹500', type: 'credit' },
    { date: 'Feb 22, 2026', desc: 'Bulk SMS - Diwali Campaign', amount: '-₹245', type: 'debit' },
    { date: 'Feb 21, 2026', desc: 'WhatsApp Messages', amount: '-₹140', type: 'debit' },
    { date: 'Feb 19, 2026', desc: 'Wallet Recharge via Card', amount: '+₹1000', type: 'credit' },
    { date: 'Feb 18, 2026', desc: 'Email Campaign', amount: '-₹85', type: 'debit' },
  ];
  const bonus = amount >= 1000 ? '10%' : amount >= 500 ? '5%' : '0%';
  return (
    <div style={{ paddingTop: 80 }}>
      <section style={{ padding: '60px 5%' }}>
        <SectionHeader tag="Wallet" title="Manage Your Balance" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
          <div>
            <div style={{ background: 'linear-gradient(135deg,#0f2040,#0d1a30)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 20, padding: 28, marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Available Balance</div>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 46, fontWeight: 700, color: '#3b82f6', marginBottom: 16 }}>₹2,450.00</div>
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {[['~24,500','SMS'],['~7,000','WhatsApp'],['~1.2L','Emails']].map(([v,l]) => (
                  <div key={l}><div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 16, fontWeight: 600 }}>{v}</div><div style={{ fontSize: 11, color: '#475569' }}>{l} remaining</div></div>
                ))}
              </div>
            </div>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 28 }}>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 600, marginBottom: 20 }}>Add Money via PayU</h3>
              <div style={{ fontSize: 13, color: '#64748b', marginBottom: 10 }}>Select Amount</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
                {presets.map(p => (
                  <button key={p} onClick={() => setAmount(p)} style={{ padding: '8px 16px', borderRadius: 8, fontSize: 14, fontWeight: 600, background: amount === p ? 'linear-gradient(135deg,#3b82f6,#1d4ed8)' : 'var(--bg3)', color: amount === p ? '#fff' : '#64748b', border: '1px solid ' + (amount === p ? 'transparent' : 'rgba(59,130,246,0.12)'), cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}>₹{p}</button>
                ))}
              </div>
              <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} placeholder="Custom amount..." style={{ width: '100%', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 10, padding: '11px 14px', color: '#e8edf5', fontSize: 14, marginBottom: 14 }} />
              <div style={{ background: 'rgba(59,130,246,0.06)', borderRadius: 10, padding: '12px 14px', marginBottom: 16, display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 13 }}>
                <span>You get: <strong style={{ color: '#3b82f6' }}>~{Math.floor(amount/0.10).toLocaleString()} SMS</strong></span>
                <span>Bonus: <strong style={{ color: '#4ade80' }}>+{bonus} extra</strong></span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 18 }}>
                {[['upi','🔷','UPI','PhonePe, GPay'],['card','💳','Debit/Credit','Visa, Mastercard'],['netbanking','🏦','Net Banking','All banks'],['wallet','📱','Wallets','Paytm, Mobikwik']].map(([k,icon,label,hint]) => (
                  <button key={k} onClick={() => setMethod(k)} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '12px 12px', borderRadius: 10, border: '1px solid ' + (method === k ? 'rgba(59,130,246,0.4)' : 'var(--border)'), background: method === k ? 'rgba(59,130,246,0.08)' : 'var(--bg3)', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
                    <span style={{ fontSize: 18 }}>{icon}</span>
                    <div><div style={{ fontSize: 13, fontWeight: 600, color: '#e8edf5' }}>{label}</div><div style={{ fontSize: 11, color: '#475569' }}>{hint}</div></div>
                  </button>
                ))}
              </div>
              <Button style={{ width: '100%', justifyContent: 'center' }} size="lg">Pay ₹{amount} via PayU →</Button>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 12, flexWrap: 'wrap' }}>
                {['🔒 256-bit SSL','✅ PayU Secured','🏦 RBI Compliant'].map(t => <span key={t} style={{ fontSize: 11, color: '#475569' }}>{t}</span>)}
              </div>
            </div>
          </div>
          <div>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, marginBottom: 16 }}>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 16, fontWeight: 600, marginBottom: 18 }}>Transaction History</h3>
              {txns.map((t, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderBottom: i < txns.length - 1 ? '1px solid var(--border2)' : 'none' }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ width: 34, height: 34, borderRadius: 8, background: t.type === 'credit' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{t.type === 'credit' ? '⬆️' : '⬇️'}</div>
                    <div><div style={{ fontSize: 13, fontWeight: 500 }}>{t.desc}</div><div style={{ fontSize: 11, color: '#475569' }}>{t.date}</div></div>
                  </div>
                  <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 700, color: t.type === 'credit' ? '#4ade80' : '#f87171' }}>{t.amount}</div>
                </div>
              ))}
            </div>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 24 }}>
              <h4 style={{ fontWeight: 600, marginBottom: 14 }}>Per Message Rates</h4>
              {[['SMS (DLT)','₹0.10–₹0.20','blue'],['WhatsApp','₹0.35–₹0.65','green'],['Email','₹0.02–₹0.05','purple'],['Virtual Number','₹199/month','orange']].map(([c,r,col]) => (
                <div key={c} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid var(--border2)' }}>
                  <span style={{ fontSize: 14, color: '#94a3b8' }}>{c}</span>
                  <Badge color={col}>{r}</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================================
// DOCS PAGE
// ============================================================
export function Docs() {
  const [section, setSection] = useState('intro');
  const sections = [
    { key: 'intro',      label: 'Introduction'  },
    { key: 'auth',       label: 'Authentication' },
    { key: 'sms',        label: 'Send SMS'       },
    { key: 'whatsapp',   label: 'WhatsApp'       },
    { key: 'email',      label: 'Email'          },
    { key: 'vnumbers',   label: 'Virtual Numbers'},
    { key: 'webhooks',   label: 'Webhooks'       },
    { key: 'errors',     label: 'Error Codes'    },
  ];
  const code = {
    intro: `// AxeSMS REST API v2.0
// Base URL: https://api.axesms.services/v1
// All requests need Authorization header

curl "https://api.axesms.services/v1/balance" \\
  -H "Authorization: Bearer YOUR_API_KEY"

// Response:
{ "success": true, "balance": 2450.00, "currency": "INR" }`,
    auth: `// Get API Key: Dashboard → API Keys
// Include in every request:

headers: {
  "Authorization": "Bearer axe_live_xxxxxxxxxxxxxxxx",
  "Content-Type": "application/json"
}`,
    sms: `// Send Single SMS
POST /v1/sms/send
{
  "to": "+919876543210",
  "message": "Your OTP is 123456",
  "sender_id": "AXESMS",
  "type": "transactional"  // or "promotional"
}

// Send Bulk SMS
POST /v1/sms/bulk
{
  "numbers": ["+91...", "+91..."],
  "message": "Sale! 50% OFF use SALE50",
  "sender_id": "BRAND",
  "schedule_at": "2026-10-20T10:00:00Z"
}`,
    whatsapp: `// Send WhatsApp Template
POST /v1/whatsapp/send
{
  "to": "+919876543210",
  "template_name": "otp_verification",
  "language": "en_IN",
  "components": [{
    "type": "body",
    "parameters": [{ "type": "text", "text": "123456" }]
  }]
}`,
    email: `// Send Email
POST /v1/email/send
{
  "to": "user@example.com",
  "from": "noreply@yourbrand.com",
  "subject": "Order Confirmed! 🎉",
  "html": "<h1>Thanks!</h1>",
  "track_opens": true,
  "track_clicks": true
}`,
    vnumbers: `// List Available Numbers
GET /v1/virtual-numbers?country=US

// Rent a Number
POST /v1/virtual-numbers/rent
{ "number_id": "vn_us_5551234", "duration": "monthly" }

// Get Received SMS
GET /v1/virtual-numbers/vn_us_5551234/messages`,
    webhooks: `// Configure in Dashboard → Settings → Webhooks
// AxeSMS POSTs to your URL on events:

// Payload:
{
  "event": "sms.delivered",
  "message_id": "msg_abc123",
  "to": "+919876543210",
  "status": "delivered",
  "timestamp": "2026-02-23T10:35:00Z"
}

// Events: sms.delivered, sms.failed,
// whatsapp.read, email.opened, email.bounced`,
    errors: `// HTTP Status Codes:
200 - Success
400 - Bad Request
401 - Invalid API Key
402 - Insufficient Balance
429 - Rate Limited (100 req/sec)
500 - Server Error

// Error Format:
{
  "success": false,
  "error": {
    "code": "INSUFFICIENT_BALANCE",
    "message": "Please recharge your wallet."
  }
}`,
  };
  return (
    <div style={{ paddingTop: 80, display: 'flex', minHeight: '100vh' }}>
      <aside style={{ width: 220, background: 'var(--bg2)', borderRight: '1px solid var(--border2)', padding: '32px 0', flexShrink: 0, position: 'sticky', top: 80, height: 'calc(100vh - 80px)', overflowY: 'auto' }}>
        <div style={{ padding: '0 20px 16px', fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#3b82f6' }}>API Reference</div>
        {sections.map(s => (
          <button key={s.key} onClick={() => setSection(s.key)} style={{ display: 'block', width: '100%', padding: '9px 20px', textAlign: 'left', fontSize: 14, color: section === s.key ? '#60a5fa' : '#64748b', background: section === s.key ? 'rgba(59,130,246,0.08)' : 'transparent', borderLeft: '2px solid ' + (section === s.key ? '#3b82f6' : 'transparent'), border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontWeight: section === s.key ? 600 : 400, transition: 'all 0.15s' }}>
            {s.label}
          </button>
        ))}
        <div style={{ margin: '20px 16px', padding: 14, background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#60a5fa', marginBottom: 4 }}>Need Help?</div>
          <div style={{ fontSize: 12, color: '#475569' }}>support@axesms.services</div>
        </div>
      </aside>
      <main style={{ flex: 1, padding: '48px 5%', maxWidth: 860 }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 30, fontWeight: 700, marginBottom: 12 }}>{sections.find(s => s.key === section)?.label}</h1>
          <div style={{ display: 'flex', gap: 8 }}><Badge color="green">v2.0</Badge><Badge color="blue">REST API</Badge></div>
        </div>
        {section === 'intro' && (
          <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: 24 }}>The AxeSMS API is a RESTful API to send SMS, WhatsApp, Email and manage virtual numbers. Base URL: <code style={{ background: 'rgba(59,130,246,0.1)', padding: '2px 8px', borderRadius: 4, color: '#60a5fa', fontFamily: 'monospace' }}>https://api.axesms.services/v1</code></p>
        )}
        <div style={{ background: '#0a0f1a', border: '1px solid rgba(59,130,246,0.15)', borderRadius: 14, overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 18px', borderBottom: '1px solid rgba(59,130,246,0.1)', background: 'rgba(59,130,246,0.05)' }}>
            <span style={{ fontSize: 12, color: '#475569', fontWeight: 600 }}>EXAMPLE</span>
            <button onClick={() => navigator.clipboard?.writeText(code[section])} style={{ fontSize: 12, color: '#64748b', background: 'none', border: 'none', cursor: 'pointer' }}>📋 Copy</button>
          </div>
          <pre style={{ padding: '22px', overflowX: 'auto', fontSize: 13, lineHeight: 1.7, color: '#a5b4d4', fontFamily: 'monospace', margin: 0 }}>{code[section]}</pre>
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
          {section !== 'intro' && <Button variant="ghost" size="sm" onClick={() => { const i = sections.findIndex(s => s.key === section); if (i > 0) setSection(sections[i-1].key); }}>← Prev</Button>}
          {section !== 'errors' && <Button variant="secondary" size="sm" onClick={() => { const i = sections.findIndex(s => s.key === section); if (i < sections.length-1) setSection(sections[i+1].key); }}>Next →</Button>}
        </div>
      </main>
    </div>
  );
}

// ============================================================
// CONTACT PAGE
// ============================================================
export function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'Pricing & Plans', message: '' });
  const u = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  return (
    <div style={{ paddingTop: 80 }}>
      <section style={{ padding: '80px 5%' }}>
        <SectionHeader tag="Contact" title="We're here to help" sub="Questions about pricing, API, or enterprise? Our team responds within 2 hours." center />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, maxWidth: 1000, margin: '0 auto', alignItems: 'start' }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 28 }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: 52, marginBottom: 16 }}>✅</div>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Message Sent!</h3>
                <p style={{ color: '#64748b' }}>We'll get back to you within 2 hours.</p>
                <Button style={{ marginTop: 20 }} variant="secondary" onClick={() => setSent(false)}>Send Another</Button>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Send us a message</h3>
                {[['Full Name','Rahul Sharma','text','name'],['Email Address','you@example.com','email','email'],['Phone Number','+91 98765 43210','tel','phone']].map(([l,p,t,k]) => (
                  <div key={k} style={{ marginBottom: 14 }}>
                    <label style={{ fontSize: 13, fontWeight: 500, color: '#94a3b8', display: 'block', marginBottom: 5 }}>{l}</label>
                    <input type={t} value={form[k]} onChange={u(k)} placeholder={p} style={{ width: '100%', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 14px', color: '#e8edf5', fontSize: 14 }} />
                  </div>
                ))}
                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#94a3b8', display: 'block', marginBottom: 5 }}>Subject</label>
                  <select value={form.subject} onChange={u('subject')} style={{ width: '100%', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 14px', color: '#e8edf5', fontSize: 14 }}>
                    {['Pricing & Plans','Technical Support','API Integration','Enterprise Sales','Account Issues','Other'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#94a3b8', display: 'block', marginBottom: 5 }}>Message</label>
                  <textarea value={form.message} onChange={u('message')} placeholder="Describe your query..." rows={4} style={{ width: '100%', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 14px', color: '#e8edf5', fontSize: 14, resize: 'vertical' }} />
                </div>
                <Button style={{ width: '100%', justifyContent: 'center' }} size="lg" onClick={() => setSent(true)}>Send Message →</Button>
              </>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[['📧','Email Support','support@axesms.services','Replies within 2 hours'],['💬','Live Chat','Available on dashboard','Mon–Sat, 9 AM – 8 PM IST'],['📞','Phone Support','+91 98765 43210','Enterprise & Pro plans'],['✈️','Telegram','t.me/axesms','Community & announcements']].map(([icon,title,val,note]) => (
              <div key={title} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '18px 20px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(59,130,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{icon}</div>
                <div><div style={{ fontWeight: 600, marginBottom: 2 }}>{title}</div><div style={{ fontSize: 14, color: '#3b82f6' }}>{val}</div><div style={{ fontSize: 12, color: '#475569', marginTop: 2 }}>{note}</div></div>
              </div>
            ))}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '18px 20px' }}>
              <h4 style={{ fontWeight: 600, marginBottom: 12 }}>Quick FAQ</h4>
              {[['Is there a free trial?','Yes! Get ₹50 free credits on signup.'],['Do credits expire?','No, your wallet credits never expire.'],['DLT required?','Yes for promotional SMS in India. We help with setup.']].map(([q,a]) => (
                <div key={q} style={{ marginBottom: 10, paddingBottom: 10, borderBottom: '1px solid var(--border2)' }}>
                  <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 3 }}>Q: {q}</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>A: {a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
