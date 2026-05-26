# 🕸️ Nostr-SEO: The Decentralized Content Pipeline

[![Live Demo](https://img.shields.io/badge/Live_Demo-kheai.com-00C7B7?style=for-the-badge)](https://www.kheai.com/)
[![Built with Astro](https://img.shields.io/badge/Built_with-Astro-FF5D01?style=for-the-badge&logo=astro)](https://astro.build/)
[![Powered by Nostr](https://img.shields.io/badge/Powered_by-Nostr-8241F8?style=for-the-badge)](https://nostr.com/)

A zero-maintenance Web3-to-Web2 bridge that fetches decentralized Nostr articles (Kind 30023) at build time and compiles them into a blazingly fast, SEO-perfect static website. 

Write once on Nostr clients like Yakihonne, Habla, or Primal. Read everywhere via Google, Baidu, and AI Search Agents.

## 🧠 The Philosophy

Traditional blogging platforms trap your content in centralized databases. Nostr fixes content ownership, but single-page application (SPA) Web3 clients often struggle with Web2 SEO and algorithmic discovery. 

**This pipeline solves both:**

1. **Absolute Ownership:** You write natively on Nostr, retaining full control of your cryptographic keys and data.
2. **Maximum Reach:** The pipeline statically renders your thoughts into lightweight HTML, optimizing them for traditional search spiders and modern AI web scrapers.

## ✨ Core Features

* **100% Static HTML:** Articles are fetched during the build step, resulting in zero client-side fetching delays and perfect Lighthouse scores.
* **Automated Sync:** A GitHub Actions CRON job taps a Vercel deploy hook every 6 hours to pull fresh content automatically. 
* **AI-Agent Ready:** Includes a dedicated `/llm.txt` endpoint providing a semantic layer for SearchGPT, Perplexity, and Claude to instantly understand the site's architecture and niche.
* **Global SEO Patch:** Hardcoded `zh-CN` language targeting and regex markdown-stripping to ensure clean metadata summaries for Baidu and Google.
* **Built on AstroPaper:** Inherits a minimal, accessible, and highly responsive UI theme with built-in dark mode.

## 🏗️ System Architecture

1. **Input:** Author publishes a long-form note (Kind 30023) to Nostr relays (`wss://relay.damus.io`, `wss://nos.lol`, etc.).
2. **Trigger:** GitHub Actions runs a scheduled workflow every 6 hours.
3. **Build:** Vercel receives the webhook, spins up a Node.js environment, and uses `@nostr-dev-kit/ndk` to query the author's specific Hex Public Key.
4. **Compile:** Astro maps the raw markdown to dynamic `[id].astro` routes, parses it to HTML via `marked`, and statically generates the site.
5. **Serve:** High-speed static files are distributed globally via Vercel's Edge Network.

## 🚀 Quick Start (Fork & Deploy)

Want to build your own decentralized mind-dump? 

### 1. Prerequisites

* Node.js (v18+)
* Your Nostr Hex Public Key (Convert your `npub` using a tool like [damus.io/key](https://damus.io/key)).

### 2. Local Setup

Clone this repository and install the dependencies:

```bash
git clone [https://github.com/kafechew/nostr-seo.git](https://github.com/kafechew/nostr-seo.git)
cd nostr-seo
npm install
```

### 3. Connect Your Identity

Open `src/pages/index.astro` and `src/pages/nostr/[id].astro`. Find the NDK filter block and replace the placeholder with your own Hex Key:

```typescript
const filter = { 
  kinds: [30023], 
  authors: ["YOUR_HEX_KEY_HERE"] 
};
```

### 4. Test Locally

Run the Astro dev server. It will fetch your latest articles from the relays and render them on `localhost`.

```bash
npm run dev
```

### 5. Automate the Pipeline

1. Deploy your forked repository to **Vercel** (override the build command to `npm install` if necessary).
2. In Vercel, navigate to Settings > Git > Deploy Hooks. Create a hook named `Nostr-Sync` and copy the URL.
3. In your GitHub repository, update the URL inside `.github/workflows/nostr-sync.yml` to point to your new Vercel webhook.

## 📜 Credits & Stack

- Framework: [Astro](https://astro.build/)
- UI Theme: [AstroPaper](https://github.com/satnaing/astro-paper) by satnaing
- Nostr Integration: [@nostr-dev-kit/ndk](https://github.com/nostr-dev-kit/ndk)
- Markdown Parsing: [marked](https://marked.js.org/)

*Write once, syndicate everywhere. Welcome to the future of content publishing.
