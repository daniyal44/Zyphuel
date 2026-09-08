# Zyphuel React App

[![GitHub Commits](https://img.shields.io/github/commit-activity/m/daniyal44/Zyphuel?style=for-the-badge&color=0284c7&label=Monthly%20Changes)](https://github.com/daniyal44/Zyphuel/commits/main)
[![Last Commit](https://img.shields.io/github/last-commit/daniyal44/Zyphuel?style=for-the-badge&color=10b981)](https://github.com/daniyal44/Zyphuel/commits/main)
[![Website Status](https://img.shields.io/website?url=https%3A%2F%2Fzyphuel.netlify.app&style=for-the-badge&label=zyphuel.netlify.app)](https://zyphuel.netlify.app/)

A high-performance React.js + Vite platform for Zyphuel — on-demand doorstep fuel and clean energy delivery in Lahore, Pakistan.

### 📊 Development Activity & Changes Graph (Auto-Updates on Push)

<p align="center">
  <img src="./public/images/github-changes-graph.svg" alt="Zyphuel Platform Architecture — Monthly & Yearly Development Changes" width="100%" />
</p>

### 🟩 GitHub Contribution Calendar
<p align="center">
  <img src="https://ghchart.rshah.org/0284c7/daniyal44" alt="Muhammad Daniyal GitHub Contributions Chart" width="100%" />
</p>


## Project Structure

```
zyphuel-react/
├── index.html               # Vite entry with Google Fonts, Font Awesome, GSAP CDN
├── package.json
├── vite.config.js
├── public/
│   └── images/              # Logo and static assets
└── src/
    ├── main.jsx             # React DOM entry
    ├── App.jsx              # Router + layout
    ├── index.css            # All styles (ported from style.css)
    ├── context/
    │   └── ToastContext.jsx # Global toast state
    ├── hooks/
    │   └── useScrollReveal.js
    ├── components/
    │   ├── Header.jsx       # Sticky nav + hamburger
    │   ├── Footer.jsx       # 4-column footer
    │   ├── InterestModal.jsx
    │   └── Toast.jsx
    └── pages/
        ├── HomePage.jsx
        ├── AboutPage.jsx
        ├── ServicesPage.jsx
        ├── OrderPage.jsx    # Complex: fuel selector, canvas map, GSAP truck btn
        ├── ContactPage.jsx
        ├── PrivacyPolicyPage.jsx
        └── TermsOfUsePage.jsx
```

## Getting Started

> **Prerequisite:** Node.js v18+ must be installed. Download from https://nodejs.org

### 1. Install dependencies

```bash
cd "d:\Games\New folder-web\zyphuel-react"
npm install
```

### 2. Start development server

```bash
npm run dev
```

The app will open at **http://localhost:5173**

### 3. Build for production

```bash
npm run build
```

Output will be in the `dist/` folder.

## Routes

| URL | Page |
|-----|------|
| `/` | Home |
| `/about` | About Us |
| `/services` | Services |
| `/order` | Order Fuel |
| `/contact` | Contact |
| `/privacy-policy` | Privacy Policy |
| `/terms-of-use` | Terms of Use |

## Key Features

- ⚡ **Vite + React 18** — Fast HMR development
- 🗺️ **React Router v6** — Client-side SPA routing
- 🎨 **Identical CSS** — All original styles preserved
- 🚛 **GSAP Truck Button** — Animated order submission
- 🗺️ **Canvas Radar Map** — Delivery radius visualization
- 💰 **Live Price Ticker** — Real-time fuel price updates
- 🔔 **Toast Notifications** — Global via Context API
- 📱 **Responsive** — Full mobile support
