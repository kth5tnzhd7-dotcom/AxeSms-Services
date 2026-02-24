// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSiteConfig } from '../context/SiteConfigContext';
import { Button, Badge, Card, SectionHeader } from '../components/UI';

export default function Home() {
  const { config } = useSiteConfig();
  const [counted, setCounted] = useState(false);

  const features = [
    { icon: '💬', color: 'blue',   title: 'Bulk SMS',         desc: 'Send millions of SMS in seconds with 99.9% delivery rate. DLT compliant, all operators.' },
    { icon: '🟢', color: 'green',  title: 'WhatsApp Bulk',    desc: 'Official WhatsApp Business API. Rich media, buttons, and templates at India\'s lowest price.' },
    { icon: '📧', color: 'purple', title: 'Bulk Email',        desc: 'Transactional & marketing emails with open/click tracking and advanced analytics.' },
    { icon: '📱', color: 'cyan',   title: 'Virtual Numbers',  desc: 'Receive SMS/OTPs from 30+ countries. Perfect for app verification like Bird, TextNow.' },
    { icon: '💳', color: 'orange', title: 'Pay As You Go',    desc: 'No monthly commitment. Top up wallet via PayU. Credits never expire. Full control.' },
    { icon: '🔌', color: 'blue',   title: 'REST API',         desc: 'Developer-friendly API with webhooks, PHP/Node/Python SDKs. Integrate in minutes.' },
  ];

  const testimonials = [
    { name: 'Amit Patel', company: 'RetailXpress', text: 'Switched from Textlocal to AxeSMS and saving 40% every month. Delivery rate is fantastic!', rating: 5 },
    { name: 'Priya Singh', company: 'FinTech Startup', text: 'The WhatsApp API integration took us just 2 hours. Best support team ever!', rating: 5 },
    { name: 'Ravi Kumar', company: 'D2C Brand', text: 'Virtual numbers helped us verify accounts internationally. Exactly what we needed.', rating: 5 },
  ];

  return (
    <div>
      {/* HERO */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '130px 5% 80px', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', width: 800, height: 800, borderRadius: '50%', background: 'radial-gradient(circle,rgba(59,130,246,0.07) 0%,transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(6,182,212,0.05) 0%,transparent 70%)', top: '15%', right: '5%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(139,92,246,0.04) 0%,transparent 70%)', bottom: '10%', left: '5%', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 820, position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 100, padding: '6px 18px', fontSize: 13, color: '#60a5fa', marginBottom: 28, fontWeight: 500 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e', display: 'inline-block', animation: 'pulse 2s infinite' }} />
            {config.site.tagline}
          </div>

          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(36px,6vw,78px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, marginBottom: 24 }}>
            Send SMS, WhatsApp<br />& Email at{' '}
            <span style={{ background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Scale</span>
          </h1>

          <p style={{ color: '#64748b', fontSize: 18, lineHeight: 1.7, maxWidth: 580, margin: '0 auto 40px' }}>
            Bulk messaging platform starting at {config.pricing.smsRate}/SMS. PayU payments. Virtual numbers for OTP verification from 30+ countries.
          </p>

          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 64 }}>
            <Link to="/login?tab=signup"><Button size="lg">🚀 Start Free – Get {config.site.freeCredits} Credits</Button></Link>
            <Link to="/pricing"><Button size="lg" variant="ghost">View Pricing →</Button></Link>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 48, justifyContent: 'center', flexWrap: 'wrap', paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            {[
              [config.stats.messagesSent, 'Messages Sent'],
              [config.stats.deliveryRate, 'Delivery Rate'],
              [config.stats.happyClients, 'Happy Clients'],
              [config.stats.uptime, 'Uptime SLA'],
            ].map(([n, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 28, fontWeight: 700, color: '#3b82f6' }}>{n}</div>
                <div style={{ fontSize: 13, color: '#475569', marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: '80px 5%', borderTop: '1px solid var(--border2)' }}>
        <SectionHeader tag="Features" title="Everything you need to communicate" sub="One platform for all your messaging — SMS, WhatsApp, Email & more." center />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20 }}>
          {features.map(f => (
            <Card key={f.title} hover>
              <div style={{ fontSize: 28, marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 600, marginBottom: 10 }}>{f.title}</h3>
              <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: '80px 5%', background: 'var(--bg2)', borderTop: '1px solid var(--border2)', borderBottom: '1px solid var(--border2)' }}>
        <SectionHeader tag="How It Works" title="Up and running in 3 steps" center />
        <div style={{ display: 'flex', gap: 0, maxWidth: 900, margin: '0 auto', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 28, left: '16%', right: '16%', height: 2, background: 'linear-gradient(to right,#3b82f6,#06b6d4)', opacity: 0.25 }} />
          {[
            ['1', 'Sign Up Free', 'Create account in seconds, no credit card required. Get ₹50 free credits instantly.'],
            ['2', 'Add Wallet Balance', 'Add money via PayU — UPI, Debit/Credit Cards, Net Banking, Wallets.'],
            ['3', 'Send Messages', 'Use the dashboard or REST API to send bulk SMS, WhatsApp & Emails.'],
          ].map(([num, title, desc]) => (
            <div key={num} style={{ flex: 1, textAlign: 'center', padding: '0 24px', position: 'relative', zIndex: 1 }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--surface)', border: '2px solid #3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 700, color: '#3b82f6' }}>{num}</div>
              <h4 style={{ fontWeight: 600, marginBottom: 8 }}>{title}</h4>
              <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING TEASER */}
      <section style={{ padding: '80px 5%', textAlign: 'center' }}>
        <SectionHeader tag="Pricing" title="India's Lowest Prices" sub="Transparent pricing with no hidden charges. Choose a plan or pay as you go." center />
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
          {[
            [config.pricing.smsRate + '/msg', 'SMS', 'blue'],
            [config.pricing.whatsappRate + '/msg', 'WhatsApp', 'green'],
            [config.pricing.emailRate + '/msg', 'Email', 'purple'],
          ].map(([price, channel, col]) => (
            <div key={channel} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '22px 36px', minWidth: 180, textAlign: 'center' }}>
              <div style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>Starting at</div>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 26, fontWeight: 700, color: col === 'green' ? '#4ade80' : col === 'purple' ? '#a78bfa' : '#60a5fa' }}>{price}</div>
              <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 6 }}>{channel}</div>
            </div>
          ))}
        </div>
        <Link to="/pricing"><Button size="lg">See All Plans & Compare →</Button></Link>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '80px 5%', background: 'var(--bg2)', borderTop: '1px solid var(--border2)' }}>
        <SectionHeader tag="Testimonials" title="Trusted by 10,000+ businesses" center />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>
          {testimonials.map(t => (
            <Card key={t.name}>
              <div style={{ display: 'flex', gap: 2, marginBottom: 16 }}>
                {Array(t.rating).fill(0).map((_, i) => <span key={i} style={{ color: '#facc15', fontSize: 14 }}>★</span>)}
              </div>
              <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6, marginBottom: 20, fontStyle: 'italic' }}>"{t.text}"</p>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#fff' }}>{t.name[0]}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: '#475569' }}>{t.company}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 5%', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(59,130,246,0.07) 0%,transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(28px,4vw,52px)', fontWeight: 700, letterSpacing: -1, marginBottom: 20 }}>
            Ready to scale your<br /><span style={{ color: '#3b82f6' }}>messaging?</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: 16, marginBottom: 36 }}>
            Join 10,000+ businesses. Get {config.site.freeCredits} free credits on signup. No credit card required.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/login?tab=signup"><Button size="lg">Create Free Account →</Button></Link>
            <a href={config.links.telegram} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="ghost">✈️ Join Telegram Community</Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
