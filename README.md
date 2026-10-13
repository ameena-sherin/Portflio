# Ameena Sherin — Premium Interactive 3D Developer Portfolio

A creative developer portfolio built for **Ameena Sherin**, B.Tech Computer Science Engineering student at AWH Engineering College, Kerala (Class of 2028), aspiring software developer.

Inspired by top-tier creative developer portfolios (such as [moncy.dev](https://www.moncy.dev/)), featuring an original visual identity, real Three.js WebGL 3D character, dynamic lighting moods, floating 3D tech elements, and interactive project experiences.

---

## ✨ Features & Architecture

### 1. 🌟 Cinematic Hero Section with 3D Character
- **Stylized 3D Female Developer Character** built directly in Three.js WebGL:
  - **Blinking Eyes**: Biologically timed eyelid blinking mechanism with subtle double-blink variation.
  - **Gaze Tracking**: Eyes independently track the cursor / touch position across the screen.
  - **Head Movement**: Damped rotation (yaw, pitch, roll) following the user's cursor.
  - **Breathing Animation**: Torso expansion/contraction at human resting breath frequency.
  - **Idle Organic Movement**: Micro-sway and tilt ensuring the scene feels alive even when idle.
  - **Interactive Waving Gesture**: Click the character or tap "Wave to Ameena 👋" to trigger an animated hand wave, smile, and cheerful greeting!
  - **Lighting Mood Selector**: Switch live between **Cyber Lavender**, **Midnight Aurora**, and **Sunset Rose**.
  - **Floating 3D Technology Objects**:
    - Slim 3D laptop hovering in front, open at 112°, backlit keyboard, trackpad, and a dynamic canvas screen displaying syntax-highlighted TypeScript code with a blinking terminal cursor.
    - Floating 3D extruded `</>` tag in glowing lavender.
    - Floating 3D `{ }` curly braces in glowing pink.
    - Floating metallic Octahedron, translucent glass Icosahedron, Torus Knot, and glowing Halo ring.
    - Interactive 450+ particle constellation with mouse parallax.
- **Hero Typography & Actions**:
  - `HELLO, I'M`
  - `AMEENA SHERIN`
  - `B.TECH COMPUTER SCIENCE ENGINEERING STUDENT`
  - `ASPIRING SOFTWARE DEVELOPER`
  - Description: *"Building my skills through software development, data analytics, UI/UX, cloud and AI."*
  - Buttons: **VIEW MY WORK** (scrolls smoothly to `#work`) and **DOWNLOAD RESUME** (opens interactive resume modal).

### 2. 🧭 Navigation
- `ABOUT` → `#about`
- `WORK` → `#work`
- `SKILLS` → `#skills`
- `EXPERIENCE` → `#experience`
- `CONTACT` → `#contact`
- Responsive mobile drawer menu and resume launch action.

### 3. 🎯 Content Sections (Authentic & Verified)
1. **About**: Academic profile, engineering pillars, verified credentials at AWH Engineering College, Kozhikode.
2. **Skills & Tooling**: Clean categories (Programming, Web, Data Analytics, Tools, Design) with **zero arbitrary percentages**. Includes an interactive skill inspector explaining practical application for every technology.
3. **Selected Works (Projects)** with live interactive in-browser simulators:
   - **College Placement Data Analytics** ([GitHub](https://github.com/ameena-sherin/BuildX-Analytics-Ameena_Sherin)): Interactive Power BI simulation with department breakdown (CSE, ECE, MECH) and live metrics.
   - **Web Calculator** ([GitHub](https://github.com/ameena-sherin/web-calculator)): Fully functional live in-browser arithmetic calculator with keyboard/click evaluation.
   - **Simple Chatbot** ([GitHub](https://github.com/ameena-sherin/chat-box-project)): Working conversational interface with suggested quick-prompt chips.
   - **KTU Website UI Redesign** ([Figma](https://www.figma.com/design/3AxbPV6HSIYEMY0Thxjj)): University portal UI/UX overhaul concept.
4. **Experience**: Cognilearn, Metaloop Ethical Hacking Program, Freston Analytics Python Internship.
5. **Certifications**: IBM SkillsBuild Cloud, Microsoft Copilot / LinkedIn Interview, NASSCOM Digital 101, IEEE Infoguard, IEEE Level Up with AI, BuildX Data Analytics Bootcamp.
6. **Career Journey**: Interactive roadmap from 2024 to 2028+ graduation.
7. **Contact**: Working message composer, 1-click email copy (`ameenasherin.dev@gmail.com`), GitHub & LinkedIn coordinates.
8. **Resume Modal**: Printable, recruiter-ready curriculum vitae.

---

## 🛠️ Tech Stack
- **Framework**: React 18 + TypeScript + Vite
- **3D Graphics**: Three.js (WebGL, PBR materials, custom procedural geometries, procedural canvas texture)
- **Styling**: Tailwind CSS + Custom CSS glassmorphism
- **Icons**: Lucide React
- **Animations**: Three.js RAF animation loop, CSS transitions, Framer Motion

---

## 🚀 Running the Project

```bash
# Navigate to the project directory
cd "C:\Users\Ameena Sherin\.gemini\antigravity\scratch\ameena-portfolio"

# Start the development server
npm run dev

# Build for production
npm run build
```

The dev server will run at: **http://127.0.0.1:5173/**
