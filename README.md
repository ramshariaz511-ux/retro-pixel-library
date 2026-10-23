# 📚 retroZen Pixel Library Store

A vintage, pixelated online educational library & bookstore featuring an integrated **Ambient Lo-Fi Sound Studio** (Vinyl crackle, 6 Lo-Fi beat tracks, Cozy Rain, CRT scanlines) and a secure **Google Gemini AI Companion & Librarian**.

---

## ✨ Key Features

- **Comprehensive Library Genres & Subcategories**:
  - **🎓 Educational**:
    - *Science* (Quantum Physics, Organic Chemistry, Molecular Biology)
    - *Mathematics* (Multivariable Calculus, Linear Algebra, Discrete Math)
    - *History* (Silk Road & Ancient Civilizations, Industrial & Silicon Revolutions)
    - *Literature* (Literary Criticism, World Mythology & Epic Poetics)
    - *Business* (Macroeconomics, Venture Strategy & Product Design)
    - *Computing* (Algorithms & Systems Architecture, Deep Learning & Generative AI)
    - *Test Guides* (Digital SAT 1600, GRE Super Power Pack, MCAT 7-Subject Box, Cambridge IGCSE & A-Levels, Uniform Bar Exam)
    - *Exam Flashcard Companies* (*AnkiPixel Co.* SAT Deck, *Magoosh RetroVault* GRE Deck, *MemoraMed* MCAT 3,000-Card Box, *Cambridge FlashMaster* IGCSE Deck, *Oxford PixelCards* A-Level Deck, *BarBri PixelPrep* Bar Exam Law Cards, *Kaplan RetroCards* Bundle)
  - **🦉 Philosophy**: Stoicism (*Marcus Aurelius*), Existentialism, Plato's *Republic*, Eastern Zen & Taoism.
  - **📖 Fictional / Non-Fictional Story Books**: Cozy short story anthologies, true biographies (*Ada Lovelace & Alan Turing*), polar exploration logs, illustrated fables.
  - **🌌 Novels**: Cyberpunk Sci-Fi, Victorian Mystery Noir, High Fantasy, Historical Fiction.
  - **🕹️ Game Guide Books**: *Minecraft* Redstone & Survival Architecture guides, *Roblox Studio* Luau Scripting & World-Building guides, 16-Bit Retro Arcade Compendiums.
  - **🧭 Academic Reference, Languages & Study Skills**: World Encyclopedia & Atlas, Polyglot Language Handbook, Memory Palace & Deep Work Protocol, Pixel Art Mastery.
- **🎧 Side Navbar with RetroZen Ambient Sound Studio**:
  - 💽 **Analog Vinyl Crackle** + volume slider
  - 🎵 **6 Procedural Lo-Fi Study Beats** + Play/Pause + volume slider
  - 🌧️ **Stereo Rain Ambience & Pixel Raindrop Overlay** + volume slider
  - 📺 **CRT Scanlines** toggle + custom yellow pixel cursor from *retroZen driving*
- **🤖 Secure Google Gemini API Integration**:
  - Backend routes (`/api/gemini`, `/api/set-key`, `/api/status`) read `process.env.GEMINI_API_KEY` from an isolated `.env` file.
  - Zero hardcoded keys in frontend files.
  - Talk to Google Gemini about **anything** (science, math, coding, philosophy, trivia, stories) or ask for book & exam prep recommendations!

---

## 🚀 How to Run Locally (VS Code)

1. Open the folder `retro-pixel-library` in **Visual Studio Code**.
2. Ensure your `.env` file contains your key:
   ```env
   GEMINI_API_KEY=your_actual_gemini_api_key
   PORT=3005
   ```
3. In the VS Code terminal, run:
   ```bash
   npm start
   ```
4. Open **`http://localhost:3005`** in your browser!

---

## 🌐 Moving to GitHub & Deploying to Vercel

1. **GitHub Safety**:
   - `.gitignore` already excludes `.env` and `node_modules/`, so your `GEMINI_API_KEY` will never be leaked when you commit and push to GitHub.
2. **Deploy to Vercel**:
   - Import your GitHub repository on [vercel.com](https://vercel.com).
   - In your Vercel Project Settings -> **Environment Variables**, add:
     - **Name**: `GEMINI_API_KEY`
     - **Value**: *(Your Google Gemini API Key)*
   - Click **Deploy**! Vercel automatically serves the static frontend and maps `/api/gemini`, `/api/set-key`, and `/api/status` as serverless functions.
