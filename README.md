<div align="center">
  <img src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" width="1200" alt="BuildFlow AI Banner" />
  
  # ⚡ BUILDFLOW AI
  **The Neural-Linked Startup Architect**
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-cyan.svg)](https://opensource.org/licenses/MIT)
  [![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC.svg)](https://tailwindcss.com/)
  [![Firebase](https://img.shields.io/badge/Firebase-v12-FFCA28.svg)](https://firebase.google.com/)
  [![Gemini AI](https://img.shields.io/badge/Gemini_AI-Pro-purple.svg)](https://deepmind.google/technologies/gemini/)
</div>

---

## 🚀 Overview
BuildFlow AI is a high-performance technical blueprint generator designed for founders and engineers. It transforms natural language product visions into comprehensive, production-ready technical manifests using Gemini Pro AI and a sleek, cyber-architect aesthetic.

**Live Demo:** [aibuildflow.netlify.app](https://aibuildflow.netlify.app/)

## ✨ Key Features
- **Neural Core Engine**: Leverages Google Gemini Pro to parse technical requirements from simple ideas.
* **System Architect UI**: A premium, dark-mode dashboard with neon cyber-aesthetics.
* **Dynamic Visualization**:
  * Interactive Flowcharts (User Journeys, Admin Orchestration).
  * System Architecture Diagrams.
  * ER Diagrams (Database Schemas).
* **Technical Manifest Export**: Generate and download professional PDFs containing:
  * Full Tech Stack & Infrastructure strategy.
  * SQL Database Schemas.
  * API Definitions & MVP Roadmaps.
  * Investor-ready Business Intelligence.
* **Image Export**: Download any generated flowchart as a high-resolution PNG.
* **Experience System**: Track your progress with a Level/XP-based blueprinting system.

## 🛠️ Tech Stack
- **Frontend**: React 19, Vite, Tailwind CSS 4.0
- **Animation**: Motion (formerly Framer Motion)
- **Database/Auth**: Firebase (Firestore & Google Auth)
- **AI Integration**: Google Generative AI (Gemini Pro)
- **Diagramming**: Mermaid.js
- **State Management**: Zustand
- **Exporting**: jsPDF, html-to-image

## 📦 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- A Google AI Studio API Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Devaguru11/buildflow-ai.git
   cd buildflow-ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add your keys:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_GEMINI_API_KEY=your_gemini_key
   ```

4. **Launch Development Server:**
   ```bash
   npm run dev
   ```

## 🌐 Deployment
This project is optimized for deployment on **Netlify** or **Vercel**.
> **Important**: Ensure you add your Netlify/Vercel URL to the "Authorized Domains" section in your Firebase Console Settings to enable Google Authentication.

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

---
<p align="center">Built with ⚡ by <a href="https://github.com/Devaguru11">Devaguru</a></p>
