# 🛡️ CyberSafe Hub

A comprehensive cybersecurity education web app for everyone — learn about threats, Indian cyber laws, DIY security tools, and test your knowledge with an interactive quiz.

---

## 📁 Project Structure

```
cyberSafe/
├── index.html            # Main HTML — single-page app shell
├── app.js                # JS entry point — imports & wires all modules
├── style.css             # CSS entry point — @imports all stylesheets
│
├── js/                   # JavaScript modules (ES Modules)
│   ├── data.js           # Static data: threats, laws, quiz questions, videos
│   ├── storage.js        # localStorage: save/load/reset learning progress
│   ├── navigation.js     # Navbar, smooth scrolling, mobile menu toggle
│   ├── learning.js       # Learning modules, progress bars, video tracking
│   ├── threats.js        # Crime cards, news ticker, trending threats list
│   ├── laws.js           # IT Act table, laws grid, tabs, search filter
│   ├── tools.js          # Password checker, 2FA guide, reporting checklist
│   ├── quiz.js           # Quiz modal: questions, scoring, recommendations
│   └── utils.js          # Helpers: form validation, tooltips, scroll animations
│
└── css/                  # Stylesheets (imported in order by style.css)
    ├── tokens.css         # Design tokens: colors, spacing, typography, dark mode
    ├── base.css           # Reset, headings, links, code, accessibility
    ├── components.css     # Buttons, forms, cards, status badges, utilities
    ├── sections.css       # Page-level styles: navbar, hero, sections, quiz, footer
    └── responsive.css     # Media queries, reduced motion, high contrast, print
```

---

## 🚀 Running Locally

> ⚠️ **Must be served over HTTP** — ES Modules don't work with `file://` paths.

```bash
# Option 1 — Node.js (no install needed)
npx serve .

# Option 2 — Python
python -m http.server 8080

# Option 3 — VS Code
# Install the "Live Server" extension and click "Go Live"
```

Then open `http://localhost:3000` (or whichever port is shown).

---

## ✨ Features

| Section | Description |
|---|---|
| **Learning Hub** | Three modules (Beginner → Advanced) with progress tracking and YouTube video tutorials |
| **Cyber Crime Awareness** | Expandable cards covering Phishing, Identity Theft, Ransomware, DDoS |
| **Indian Cyber Laws** | IT Act 2000 reference — tabbed grid view and searchable table |
| **DIY Tools** | Password strength checker, 2FA setup guide, device protection checklist |
| **News & Alerts** | Live threat ticker and trending cybersecurity alerts |
| **Report a Crime** | Direct links to cybercrime.gov.in and helpline 1930, plus evidence checklist |
| **Quiz** | 10-question interactive quiz with personalised recommendations |

---

## 🏗️ Architecture

- **Vanilla JS (ES Modules)** — no framework, no bundler required
- **CSS Custom Properties** — fully themeable design system with automatic dark-mode support
- **localStorage** — progress is persisted across sessions automatically
- **`window.*` bindings** — `app.js` exposes functions used by HTML `onclick` attributes

### Adding a New Feature

1. Create `js/myfeature.js` and export a `setup*` function
2. `import` and call it inside `app.js`'s `DOMContentLoaded` block
3. Add styles to `css/sections.css` (or a new `css/myfeature.css` and `@import` it in `style.css`)

---

## 📚 Data & Content

All editable content lives in **`js/data.js`**:

- `appData.threats` — crime cards
- `appData.laws` — IT Act table rows
- `appData.quizQuestions` — quiz Q&A
- `appData.newsAlerts` — ticker messages
- `appData.videoData` — YouTube video IDs per learning level
- `platformInstructions` — 2FA guide content per platform

---

## 🔗 External Resources

- [National Cybercrime Reporting Portal](https://cybercrime.gov.in/)
- [CERT-In](https://www.cert-in.org.in/)
- [Ministry of Electronics & IT](https://www.meity.gov.in/)
- Helpline: **1930**
