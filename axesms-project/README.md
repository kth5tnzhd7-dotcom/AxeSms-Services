# AxeSMS – Full Website

## 🚀 Setup & Run

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm start

# 3. Build for production
npm run build
```

---

## 📁 Project Structure

```
src/
├── App.js                          # Main router (React Router v6)
├── index.js                        # Entry point
├── index.css                       # Global styles
│
├── context/
│   ├── AuthContext.js              # Login/Signup/Logout state
│   └── SiteConfigContext.js        # All site settings (links, pricing, etc.)
│
├── components/
│   ├── Navbar.jsx                  # Top navigation with announcement banner
│   ├── Footer.jsx                  # Footer with dynamic social links
│   └── UI.jsx                      # Shared components (Button, Card, Badge, etc.)
│
├── pages/
│   ├── Home.jsx                    # Homepage
│   ├── Pricing.jsx                 # Pricing page (SMS/WA/Email plans)
│   ├── Login.jsx                   # Login + Signup
│   ├── Dashboard.jsx               # User dashboard
│   └── OtherPages.jsx              # VirtualNumbers, Wallet, Docs, Contact
│
└── admin/
    └── AdminPanel.jsx              # Full admin control panel
```

---

## 🔐 Demo Login Credentials

| Role  | Email                     | Password   | Redirects to |
|-------|---------------------------|------------|--------------|
| User  | demo@axesms.services      | demo@123   | /dashboard   |
| Admin | admin@axesms.services     | admin@123  | /admin       |

---

## ⚙️ Admin Panel Features (at `/admin`)

The admin panel lets you control the **entire website** without touching code:

| Section          | What you can change                          |
|------------------|----------------------------------------------|
| 🔗 Social Links   | Telegram, WhatsApp, YouTube, Twitter, IG, FB |
| 💰 Pricing        | All plan prices, per-message rates           |
| 📢 Announcement   | Top banner text, link, enable/disable        |
| 📈 Stats          | Homepage hero stats (500M+, 99.9%, etc.)     |
| 🎛️ Feature Flags  | Toggle pages on/off (Virtual Numbers, Docs)  |
| 🌐 Site Settings  | Name, tagline, free credits amount           |
| 👥 Users          | View all users (connect backend for CRUD)    |

All admin changes are saved to localStorage instantly.

---

## 🛣️ Routes

| Path              | Page              | Access        |
|-------------------|-------------------|---------------|
| `/`               | Home              | Public        |
| `/pricing`        | Pricing           | Public        |
| `/virtual-numbers`| Virtual Numbers   | Public        |
| `/docs`           | API Docs          | Public        |
| `/contact`        | Contact           | Public        |
| `/login`          | Login/Signup      | Public        |
| `/wallet`         | Wallet Top-up     | Logged in     |
| `/dashboard`      | User Dashboard    | Logged in     |
| `/admin`          | Admin Panel       | Admin only    |

---

## 💳 PayU Integration (Next Steps)

To enable real payments, replace the Pay button in `Wallet.jsx` with:

```javascript
// Initialize PayU payment
const initiatePayU = async (amount) => {
  const res = await fetch('/api/create-payment', {
    method: 'POST',
    body: JSON.stringify({ amount, userId: user.id })
  });
  const { paymentUrl } = await res.json();
  window.location.href = paymentUrl; // Redirect to PayU
};
```

---

## 🔌 Backend API Integration

Replace localStorage auth in `AuthContext.js` with real API calls:

```javascript
const login = async (email, password) => {
  const res = await fetch('https://api.axesms.services/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (data.token) {
    localStorage.setItem('token', data.token);
    setUser(data.user);
  }
};
```

---

Built with React + React Router v6 | Dark Blue Theme | PayU Ready
