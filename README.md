# ⚡ Nostr-SEO: The Decentralized Content Bridge

[![Live Demo](https://img.shields.io/badge/Live_Demo-kheai.com-00C7B7?style=for-the-badge)](https://www.kheai.com/)
[![Built with Astro](https://img.shields.io/badge/Built_with-Astro-FF5D01?style=for-the-badge&logo=astro)](https://astro.build/)
[![Powered by Nostr](https://img.shields.io/badge/Powered_by-Nostr-8241F8?style=for-the-badge)](https://nostr.com/)

**Nostr-SEO** is a high-performance, SEO-first bridge that transforms decentralized Nostr Long-form content (**Kind 30023**) into a lightning-fast, search-engine-optimized website.

Built on top of the refined [Astro-Paper](https://github.com/satnaing/astro-paper) template, this project allows creators to use Nostr as a decentralized CMS while maintaining total ownership of their web presence and search engine rankings.

---

## 📖 The Problem & Solution

### The Problem

Decentralized protocols like Nostr are amazing for censorship resistance, but their content is often "invisible" to traditional search engines. If you publish only on relays, you lose the benefits of **SEO (Search Engine Optimization)** and **AEO (Answer Engine Optimization)** for AI agents like Perplexity and ChatGPT.

### The Solution

`nostr-seo` acts as a **Static Site Generator (SSG) for the Nostr protocol**.

1. **Fetch:** It pulls your articles from decentralized relays at build-time.
2. **Process:** It cleans the Markdown, renders complex Math (LaTeX) and Diagrams (Mermaid).
3. **Deploy:** It generates static HTML files that Google can index perfectly.
4. **Automated Sync:** A GitHub Actions CRON job taps a Vercel deploy hook every 6 hours to pull fresh content automatically.

---

## 🚀 Key Features

### 🛠 Technical Upgrades (v2.0)

- **Mathematical Precision:** Full **LaTeX** support using KaTeX. Perfect for technical, financial, or scientific writing.
- **Visual Logic:** Native **Mermaid.js** support. Render flowcharts and sequence diagrams directly from your Nostr notes.
- **GFM Tables:** Professional, responsive styling for GitHub Flavored Markdown tables.
- **NIP-19 Native:** Automatic generation of `naddr` identifiers for every post, enabling deep-linking back to the Nostr ecosystem.
- **Web3 Social Proof:** Built-in "Open in App" links for **Damus**, **Amethyst**, **Yakihonne**, and **Primal**.

### 🎨 Performance & Design

- **100/100 Lighthouse Score:** Optimized for speed, accessibility, and SEO.
- **Dynamic Content Pipeline:** Uses a custom `Unified` pipeline (`Remark` + `Rehype`) to process raw Nostr strings into secure HTML.
- **Enhanced Readability:** Custom CSS contrast overrides for Dark Mode to ensure long-form content is easy on the eyes.
- **Cover Image Support:** Automatic extraction and display of header images from Yakihonne/Nostr metadata.

---

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- A Nostr Hex Pubkey

### 1. Clone & Install

```bash
git clone https://github.com/kafechew/nostr-seo.git
cd nostr-seo
npm install --legacy-peer-deps
```

_Note: We use `--legacy-peer-deps` to handle specific version requirements of the Astro-Paper template._

### 2. Configure Your Feed

Open `src/pages/nostr/[id].astro` (for individual posts) and `src/pages/index.astro` (for the homepage list).

Find the `NDK` filter and replace the `authors` array with your **Hex Pubkey**:

```typescript
const filter = {
  kinds: [30023],
  authors: ["YOUR_HEX_PUBKEY_HERE"],
};
```

### 3. Local Development

```bash
npm run dev
```

### 4. Automate the Pipeline

1. Deploy your forked repository to **Vercel** (override the build command to `npm install` if necessary).
2. In Vercel, navigate to Settings > Git > Deploy Hooks. Create a hook named `Nostr-Sync` and copy the URL.
3. In your GitHub repository, update the URL inside `.github/workflows/nostr-sync.yml` to point to your new Vercel webhook.

---

## 🏗️ Technical Architecture

- **Framework:** [Astro 4.x/5.x](https://astro.build/)
- **Protocol Layer:** [NDK (Nostr Dev Kit)](https://github.com/nostr-dev-kit/ndk) for relay communication.
- **Markdown Engine:** Custom pipeline using `remark-math`, `remark-gfm`, and `rehype-katex`.
- **Identity:** Support for NIP-01 (Metadata) and NIP-19 (Identifiers).
- **Deployment:** Optimized for Vercel/Netlify with **Incremental Static Regeneration (ISR)** support.

---

## 🗺️ Roadmap: The Future of Sovereign Marketing

We are moving toward a full "Marketing Harness" for the value-for-value economy.

### Phase 1: AI & Discovery (AEO)

- [x] **JSON-LD Injection:** Automatic Schema.org metadata for every post to improve indexing by AI Answer Engines.
- [ ] **NIP-05 Verification:** Displaying "Verified" badges directly from the protocol.

### Phase 2: Monetization & Automation

- [ ] **L402 / Lightning Paywalls:** Gating high-value technical content (LaTeX/Research) behind small Sat payments for AI Agents.
- [ ] **Zap-powered Comments:** Integrating Kind 9735 (Zaps) as a global, decentralized comment and "Like" system.

### Phase 3: Workflow Harness

- [ ] **Cross-Platform Syndication:** Automatically generating "Teaser" posts for X/Twitter and LinkedIn when a new Nostr post is detected.

---

## 🤝 Contributing

This is an open-source project. If you find a bug or have a feature request for the Nostr ecosystem, please open an issue or a PR!

## 📜 License

MIT License - Created by [kafechew](https://github.com/kafechew)
