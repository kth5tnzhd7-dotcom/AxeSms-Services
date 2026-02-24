// src/pages/Pricing.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSiteConfig } from '../context/SiteConfigContext';
import { Button, Badge, Card, SectionHeader } from '../components/UI';

export default function Pricing() {
  const { config } = useSiteConfig();
  const [channel, setChannel] = useState('sms');
  const [billing, setBilling] = useState('monthly');

  const plans = {
    sms: [
      { name: 'Starter',    price: { monthly: config.pricing.starterMonthly, yearly: config.pricing.starterYearly }, msgs: '50,000',   rate: config.pricing.smsRate, features: ['50K SMS/month','Basic Analytics','REST API Access','Email Support','99% Delivery','DLT Registered'], missing: ['WhatsApp','Virtual Numbers','Dedicated Manager','White Label'] },
      { name: 'Growth',     price: { monthly: config.pricing.growthMonthly,  yearly: config.pricing.growthYearly  }, msgs: '2,00,000',  rate: '₹0.075',  popular: true, features: ['2L SMS/month','Advanced Analytics','API + Webhooks','Priority Support','Custom Sender ID','DLT Pre-reg','Scheduled Campaigns'], missing: ['Virtual Numbers','White Label'] },
      { name: 'Pro',        price: { monthly: config.pricing.proMonthly,     yearly: config.pricing.proYearly     }, msgs: '6,00,000',  rate: '₹0.067',  features: ['6L SMS/month','Full Analytics Suite','Dedicated IP','24/7 Phone Support','Custom Sender ID','DLT Support','Dedicated Manager','White Label Reports'] },
      { name: 'Enterprise', price: { monthly: null },                                                                msgs: 'Unlimited', rate: 'Custom',  features: ['Unlimited Volume','Custom Rate','99.99% SLA','On-site Support','Custom Integrations','Dedicated Infra'] },
    ],
    whatsapp: [
      { name: 'Starter',    price: { monthly: 999,  yearly: 799  }, msgs: '10,000',  rate: '₹0.10', features: ['10K Messages/month','Template Messages','API Access','Email Support','Media Messages'], missing: ['Catalog','Chatbot','Click-to-WA Ads'] },
      { name: 'Growth',     price: { monthly: 2499, yearly: 1999 }, msgs: '50,000',  rate: '₹0.05', popular: true, features: ['50K Msgs/month','Rich Media','API + Webhooks','Analytics Dashboard','Priority Support','Catalog Support','Broadcast Lists'], missing: ['Chatbot'] },
      { name: 'Pro',        price: { monthly: 5999, yearly: 4799 }, msgs: '1,50,000', rate: '₹0.04', features: ['1.5L Msgs/month','Chatbot Builder','Full Analytics','24/7 Support','Catalog','Click-to-WA Ads','Auto-reply'] },
      { name: 'Enterprise', price: { monthly: null },               msgs: 'Unlimited', rate: 'Custom', features: ['Unlimited','Custom Solutions','SLA','Priority Routing','Dedicated CSM'] },
    ],
    email: [
      { name: 'Starter',    price: { monthly: 299,  yearly: 239  }, msgs: '1,00,000',  rate: '₹0.003',  features: ['1L Emails/month','Basic Templates','SMTP Access','Open/Click Tracking','Bounce Management'], missing: ['Dedicated IP','A/B Testing','Advanced Segmentation'] },
      { name: 'Growth',     price: { monthly: 799,  yearly: 639  }, msgs: '5,00,000',  rate: '₹0.0016', popular: true, features: ['5L Emails/month','A/B Testing','Advanced Templates','Segmentation','Priority Queue','Dedicated IP Trial','Sub-accounts'] },
      { name: 'Pro',        price: { monthly: 1999, yearly: 1599 }, msgs: '20,00,000', rate: '₹0.001',  features: ['20L Emails/month','Dedicated IP','Full Suite','24/7 Support','IP Warmup','Custom Domain','DMARC Setup'] },
      { name: 'Enterprise', price: { monthly: null },               msgs: 'Unlimited',  rate: 'Custom',  features: ['Unlimited Volume','Custom IP Pool','SLA','Dedicated CSM'] },
    ],
  };

  const active = plans[channel];

  return (
    <div style={{ paddingTop: 80 }}>
      <section style={{ padding: '80px 5%' }}>
        <SectionHeader tag="Pricing" title="Simple, transparent pricing" sub="No hidden fees. No setup charges. Cancel anytime. Save 20% with annual billing." center />

        {/* Channel Toggle */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 28 }}>
          {[['sms','💬 SMS'], ['whatsapp','🟢 WhatsApp'], ['email','📧 Email']].map(([c, label]) => (
            <button key={c} onClick={() => setChannel(c)} style={{ padding: '9px 22px', borderRadius: 10, fontSize: 14, fontWeight: 600, background: channel === c ? 'linear-gradient(135deg,#3b82f6,#1d4ed8)' : 'var(--surface)', color: channel === c ? '#fff' : '#64748b', border: '1px solid ' + (channel === c ? 'transparent' : 'var(--border)'), cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}>
              {label}
            </button>
          ))}
        </div>

        {/* Billing Toggle */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 48 }}>
          <div style={{ display: 'flex', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 3 }}>
            {['monthly', 'yearly'].map(b => (
              <button key={b} onClick={() => setBilling(b)} style={{ padding: '8px 24px', borderRadius: 8, fontSize: 14, fontWeight: 600, background: billing === b ? 'linear-gradient(135deg,#3b82f6,#1d4ed8)' : 'transparent', color: billing === b ? '#fff' : '#64748b', border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s', display: 'flex', gap: 8, alignItems: 'center' }}>
                {b.charAt(0).toUpperCase() + b.slice(1)}
                {b === 'yearly' && <span style={{ fontSize: 11, background: 'rgba(34,197,94,0.15)', color: '#4ade80', padding: '1px 8px', borderRadius: 6, fontWeight: 700 }}>Save 20%</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Plans Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20, marginBottom: 48 }}>
          {active.map(plan => (
            <div key={plan.name}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-6px)'}
              onMouseLeave={e => e.currentTarget.style.transform = ''}
              style={{ background: plan.popular ? 'linear-gradient(160deg,rgba(59,130,246,0.09),var(--surface))' : 'var(--surface)', border: '1px solid ' + (plan.popular ? 'rgba(59,130,246,0.4)' : 'var(--border)'), borderRadius: 20, padding: 28, position: 'relative', transition: 'transform 0.25s' }}>
              {plan.popular && <div style={{ position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg,#3b82f6,#1d4ed8)', color: '#fff', fontSize: 12, fontWeight: 700, padding: '3px 18px', borderRadius: 100, whiteSpace: 'nowrap' }}>⭐ Most Popular</div>}
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#64748b', marginBottom: 12 }}>{plan.name}</div>
              {plan.price.monthly ? (
                <>
                  <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 44, fontWeight: 700, lineHeight: 1, marginBottom: 4 }}>
                    ₹{billing === 'monthly' ? plan.price.monthly : plan.price.yearly}
                    <span style={{ fontSize: 14, fontWeight: 400, color: '#64748b' }}>/mo</span>
                  </div>
                  <div style={{ fontSize: 13, color: '#475569', marginBottom: 20 }}>{plan.msgs} msgs • {plan.rate}/msg</div>
                </>
              ) : (
                <>
                  <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 40, fontWeight: 700, lineHeight: 1, marginBottom: 4 }}>Custom</div>
                  <div style={{ fontSize: 13, color: '#475569', marginBottom: 20 }}>Unlimited volume • Custom rate</div>
                </>
              )}
              <Link to={plan.price.monthly ? '/login?tab=signup' : '/contact'} style={{ display: 'block', textDecoration: 'none' }}>
                <Button style={{ width: '100%', justifyContent: 'center', marginBottom: 24 }} variant={plan.popular ? 'primary' : 'secondary'}>
                  {plan.price.monthly ? 'Get Started →' : 'Contact Sales'}
                </Button>
              </Link>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {plan.features.map(f => <li key={f} style={{ display: 'flex', gap: 10, fontSize: 14, color: '#94a3b8' }}><span style={{ color: '#22c55e', fontWeight: 700, flexShrink: 0 }}>✓</span>{f}</li>)}
                {(plan.missing || []).map(f => <li key={f} style={{ display: 'flex', gap: 10, fontSize: 14, color: 'rgba(255,255,255,0.18)' }}><span style={{ color: 'rgba(255,255,255,0.15)', flexShrink: 0 }}>✕</span>{f}</li>)}
              </ul>
            </div>
          ))}
        </div>

        {/* PAYG Section */}
        <div style={{ background: 'linear-gradient(135deg,rgba(6,182,212,0.06),rgba(59,130,246,0.06))', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 20, padding: '40px 5%', display: 'flex', gap: 40, alignItems: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
          <div style={{ flex: 1, minWidth: 260 }}>
            <Badge color="cyan">Pay As You Go</Badge>
            <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 28, fontWeight: 700, marginTop: 16, marginBottom: 12 }}>No subscription? No problem.</h3>
            <p style={{ color: '#64748b', lineHeight: 1.7 }}>Add money to your wallet via PayU — UPI, Debit/Credit Cards, Net Banking, Wallets. Pay only for what you send. Credits never expire. Perfect for low-volume senders.</p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {[['₹100','1,000 SMS'], ['₹500','5,500 SMS'], ['₹1,000','11,500 SMS'], ['₹5,000','60,000 SMS']].map(([a, s]) => (
              <div key={a} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '16px 20px', textAlign: 'center', minWidth: 100 }}>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 700, color: '#3b82f6' }}>{a}</div>
                <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{s}</div>
              </div>
            ))}
          </div>
          <Link to="/wallet"><Button>Add Wallet Balance →</Button></Link>
        </div>

        {/* FAQ */}
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <SectionHeader tag="FAQ" title="Common Questions" center />
          {[
            ['Is there a free trial?', `Yes! Get ${config.site.freeCredits} free credits on signup. No credit card required.`],
            ['Do credits expire?', 'No, wallet credits never expire. Use them whenever you want.'],
            ['Is DLT registration required?', 'Yes, DLT registration is mandatory for promotional & transactional SMS in India. We help with this.'],
            ['What payment methods do you accept?', 'We accept UPI, Debit Cards, Credit Cards, Net Banking, Paytm, Mobikwik via PayU gateway.'],
            ['Can I upgrade or downgrade plans?', 'Yes, you can upgrade or downgrade your plan at any time from the dashboard.'],
            ['Do you offer refunds?', 'Wallet credits are non-refundable once used. Unused balance can be refunded within 7 days.'],
          ].map(([q, a]) => (
            <div key={q} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '18px 22px', marginBottom: 10 }}>
              <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 15 }}>Q: {q}</div>
              <div style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6 }}>A: {a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
