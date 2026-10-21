# Michael Murphy — Personal Portfolio & Engineering Showcase

> **Computer Science @ Villanova University** · **Vice President, Software Development Club**  
> Native iOS Architecture · Full-Stack Distributed Systems · Empirical Machine Learning

[![Next.js 16](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

An Apple-inspired, high-fidelity portfolio website engineered to showcase production software systems, native mobile applications, academic research publications, and open-source contributions.

---

##  Featured Engineering Projects

### 1. [Simple Surveys — iOS (Mobile Application)](https://github.com/michaelMurphy819/Simple-Surveys-iOS)
* **Tagline**: Research-grade Experience Sampling Method (ESM) iOS application with HealthKit & BLE Beacons
* **Stack**: `Swift`, `SwiftUI`, `HealthKit`, `CoreBluetooth`, `CoreLocation`, `Combine`, `AVFoundation`
* **Highlights**:
  - Enforces strict Institutional Review Board (IRB) anonymity (zero persistent device identifiers, phone numbers, or advertising IDs).
  - Granular participant permission controls for HealthKit biometrics (steps, distance, heart rate).
  - Background CoreBluetooth scanning for micro-location beacon proximity.
  - Offline-first disk queue buffering submissions with automatic retry synchronization.

### 2. [ORDSS Writing Challenge](https://github.com/michaelMurphy819/ORDSS-Writing-Challenge) · [Live App](https://ordss-writing-challenge.vercel.app/)
* **Tagline**: Scholarly writing productivity & reporting platform for Villanova University's Office of Research Development
* **Stack**: `React 19`, `TypeScript`, `Vite`, `Tailwind CSS v4`, `Firebase`, `TanStack Query`, `jsPDF`, `XLSX`
* **Highlights**:
  - Deployed in production for university scholars and faculty members.
  - Interactive milestone heatmaps, real-time streak trackers, and optimistic UI mutations.
  - Automated institutional reporting engine producing executive PDF summaries and raw Excel spreadsheets.

### 3. [Pet Loyalty Dashboard](https://github.com/michaelMurphy819/pet-loyalty-dashboard) · [Live App](https://pet-loyalty-dashboard.vercel.app)
* **Tagline**: High-performance veterinary analytics & customer retention intelligence platform
* **Stack**: `Next.js 16`, `React 19`, `TypeScript`, `Drizzle ORM`, `PostgreSQL`, `Recharts`, `D3.js`, `React Simple Maps`
* **Highlights**:
  - Interactive geographical client distribution maps built with React Simple Maps and D3-scale.
  - Low-latency type-safe relational data layer orchestrated via Drizzle ORM and PostgreSQL.
  - Vector/canvas executive report screenshot export (`html-to-image`) and multi-locale internationalization (`next-intl`).

### 4. [Easy Eats V2](https://github.com/michaelMurphy819/Easy-Eats-V2) · [Live App](https://easy-eats-v2.vercel.app)
* **Tagline**: Recipe discovery platform with dynamic scaling & real-time USDA nutritional calculation
* **Stack**: `Next.js 16`, `React 19`, `TypeScript`, `Tailwind CSS`, `Framer Motion`, `USDA FoodData API`
* **Highlights**:
  - Dynamic algorithmic recipe scaling with instantaneous macro and micronutrient recalculations via the USDA FoodData Central API.
  - Fluid micro-interactions and animated sheet drawers powered by Framer Motion.

### 5. [Systems Arcade Engine](https://github.com/michaelMurphy819/Arcade) · [Live App](https://arcade-blush.vercel.app)
* **Tagline**: Retro gaming portal celebrating core computer systems & networking simulations
* **Stack**: `JavaScript`, `React`, `HTML5 Canvas`, `Vite`, `CSS3`
* **Highlights**:
  - Custom 60 FPS HTML5 Canvas engine with zero bloated external dependencies.
  - Features systems simulations: *Defrag* (file system clusters), *Protocol* (TCP ACK/SYN sequence timing), and *PacketTrace* (firewall packet routing).

### 6. [PDF-to-Audio Pipeline](https://github.com/michaelMurphy819/PDF-to-Audio)
* **Tagline**: Intelligent document-to-speech converter & neural audiobook synthesis pipeline
* **Stack**: `Python`, `Streamlit`, `gTTS`, `pyttsx3`, `PyPDF2`, `pdfplumber`, `NLP`
* **Highlights**:
  - Automated pipeline stripping running headers, footers, and citation markers.
  - Dual-mode architecture: interactive Streamlit GUI with waveform preview and headless CLI for batch conversions.

### 7. [NVIDIA Stock Price ML Benchmark](https://github.com/michaelMurphy819/Portfolio) · [Read Paper](https://portfolio-blond-gamma-w9nhs3rzr1.vercel.app/research)
* **Tagline**: 17-page comparative research paper evaluating 6 ML algorithms on NVIDIA daily price directions
* **Stack**: `Python`, `Scikit-learn`, `Pandas`, `NumPy`, `Matplotlib`, `LaTeX`
* **Highlights**:
  - Authored across Villanova University, IES Abroad, and Universidad Complutense de Madrid.
  - Benchmarked 6 classifiers (Random Forest, Logistic Regression, SVM, KNN, Naive Bayes, Decision Trees) across 20+ engineered indicators.
  - Top performer: Random Forest with 53.7% accuracy and 0.527 ROC-AUC, empirically evaluating the Efficient Market Hypothesis.

---

## 🛠 Tech Stack & Architecture

* **Framework**: [Next.js 16](https://nextjs.org/) (App Router, SSG & Static Generation)
* **UI & Styling**: [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/)
* **Design Philosophy**: Apple UI/UX aesthetics (dynamic island navigation, frosted glass vibrancy, titanium typography, segmented controls)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Fonts**: [Geist Sans](https://vercel.com/font)
* **Deployment**: [Vercel](https://vercel.com/)

---

## 🚀 Development Setup

```bash
# Clone the repository
git clone https://github.com/michaelMurphy819/Portfolio.git

# Navigate into the project
cd Portfolio/portfolio

# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build production bundle
pnpm build
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

---

## 📬 Contact & Connect

* **University Email**: [mmurph104@villanova.edu](mailto:mmurph104@villanova.edu)
* **Personal Email**: [mikeymurph2005@yahoo.com](mailto:mikeymurph2005@yahoo.com)
* **LinkedIn**: [linkedin.com/in/michael-murphy-12a594222](https://www.linkedin.com/in/michael-murphy-12a594222)
* **GitHub**: [@michaelMurphy819](https://github.com/michaelMurphy819)
