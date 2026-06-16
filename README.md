# Off-World Robot Architect 🚀
**Planetary Robotics CAD Workbench & Teaming Simulator**  
*A NASA-SME Guided Undergraduate Internship Research Project*

Welcome to the **Off-World Robot Architect** workbench. This full-stack interactive application was developed under the guidance and guidelines of the NASA Space Habitat Exploration and Communications Outreach initiative. The platform empowers students, scientists, and designers to conceptualize, simulate, and mathematically evaluate robotic assistant systems for lunar and Martian human settlements (~100-person habitats).

---

## 🌌 Project Overview & Theme

Sustaining human life on rocky worlds like the Moon and Mars demands **creativity driven by physical and technological restraint**. Rather than relying on simple speculative fiction, this workbench operates under real-world constraints as dictated by NASA Subject Matter Experts (SMEs):
* **Electrostatic Lunar Dust**: Micro-fractured, sharp glass-like regolith particles that destroy rotary gears and solar connections.
* **Martian Atmosphere Convection**: A thin, low-density $CO_2$ atmosphere subject to global dust storms and minimal solar irradiance.
* **Extreme Thermal Gradients**: Nighttime plunges to $-130^\circ\text{C}$ (Moon) or $-153^\circ\text{C}$ (Mars) requiring deep insulation loops and active radioisotope thermal decay.
* **Cognitive Team Burden**: Designing intuitive Human-Robot Symbiosis modes to lower crew psychological fatigue in pressurized cabins.

---

## 🛠️ Tech Stack & Architecture

This application is built as a highly performant, type-safe full-stack application using:
- **Frontend**: React 18 with TypeScript, powered by **Vite** and styled using **Tailwind CSS**. Custom SVG canvas matrices dynamically compile engineering vectors based on user configurations.
- **Backend Service**: **Express** Node.js runtime handles real-time REST request handshakes with security measures.
- **AI Integration**: High-density server-side connection to the modern **Google Gemini API** (`@google/genai` TypeScript SDK) to run engineering viability assessments and host real-time advisor consultations.

---

## 🎮 Core Features

1. **Planetary Customizer Deck**: Instantly toggle target bodies (Moon vs. Mars), custom power architectures (GaAs Regenerative solar buffers vs. Plutonium RTG cores), mobility frameworks (continuous titanium treads vs. Rocker-Bogie suspensions), and core AI directives.
2. **Interactive CAD Vector HUD**: Real-time reactive SVG renderer matches actual custom specifications, lighting warning glows, mounted payloads, and active environments in full vector detail.
3. **NASA Qualification Audit**: Submit your chassis blueprints to the NASA SME Desk. The Gemini engine processes thermal loops, mass weight budgets, and dust ingress pathways, scoring designs out of 100 with detailed grading logs.
4. **Operations Emergency Simulator**: Stress-test your prototype in dynamic interactive textbook anomalies (hydroponic leaks, nighttime freezes, lava tube structural collapses). Mated modules yield high safety spikes; design gaps force dangerous manual spacewalks.
5. **NASA E-Poster Portfolios**: Composes clean high-fidelity A4-optimized outreach sheets pairing vector schematics, custom narrative logs, generative photorealistic surface portraits, and SME verdicts. Ready for physical printing or PDF distribution!

---

## 🌐 How to Run This App Live

### Option 1: Live Web Preview (Automatic Built-In)
This applet is pre-configured and fully containerized! It is currently running in your AI Studio sandbox at these URLs:
* **Development Workspace**: [View Dev Workspace](https://ais-dev-sofzyfjsuxlpkhi4lmfodp-918384041588.asia-east1.run.app)
* **Outreach Share Copy**: [View Shared Copy](https://ais-pre-sofzyfjsuxlpkhi4lmfodp-918384041588.asia-east1.run.app)

Simply open these in your browser! The platform automatically manages secret keys and serves production bundles.

---

### Option 2: Running Locally (On Your Desktop)

To host this workbench on your local computer, follow these terminal steps:

#### 1. Prerequisites
Ensure you have **Node.js (v18 or higher)** installed on your machine.

#### 2. Download and Extract
* Open the **Settings Menu** in the AI Studio Build UI.
* Click **Export Project** and select **Download as ZIP**, or select **Export to GitHub**.
* Extract the downloaded folder and open it inside your favorite code editor (e.g., VS Code).

#### 3. Install Dependencies
Open your terminal in the extracted folder's root directory and run:
```bash
npm install
```

#### 4. Configure Your API Secrets
To communicate with the NASA SME Consultation Chatbot and the automated Engineering Assessment Matrix, you need a Gemini API Key.
* Go to the [Google AI Studio Console](https://aistudio.google.com/) and grab a free API Key.
* In your local root directory, copy `.env.example` into a new file named `.env`:
  ```bash
  cp .env.example .env
  ```
* Open `.env` and assign your key:
  ```env
  GEMINI_API_KEY="AIzaSyYourActualKeyGoesHere..."
  ```

#### 5. Launch the Development Server
Execute the custom dev runner command:
```bash
npm run dev
```
The console will log:
```text
[Off-World Habitat Lab] Server listening on http://localhost:3000
```
Open **`http://localhost:3000`** in any browser to interact with the workbench!

#### 6. Build and Start for Production
To bundle and compile the application for a public static production release:
```bash
# Compile client-side Vite files and CJS bundle the Express server 
npm run build

# Start the optimized server
npm run start
```

---

## 🐙 Step-by-Step GitHub Publishing Guide

Want to share this internship project on your GitHub profile to showcase to future recruiters or NASA supervisors? Follow this comprehensive roadmap:

### Step A: Creating a New Repository on GitHub
1. Sign in to your [GitHub Account](https://github.com/).
2. In the top-right corner, click the **`+`** icon and select **New repository**.
3. Fill out the repository settings:
   * **Repository name**: `off-world-robot-architect` *(or any technical name you prefer)*
   * **Description**: `Interactive planetary robotics CAD mockup and human-robot teaming simulator designed for Lunar/Martian habitats with real-time AI NASA SME evaluations.`
   * **Public/Private**: Select **Public** so supervisors and peers can view your elegant codebase!
   * **Initialize repository with**: Leave all unchecked (**Do NOT** add a README, `.gitignore`, or license, as they are already included inside your AI Studio files).
4. Click **Create repository**. Keep this page open; you will need the command-lines under the heading: **"…or push an existing repository from the command line"**.

---

### Step B: Syncing Your Files via Git Command Line
If you downloaded the code as a ZIP file, open your computer's terminal inside the project folder and execute these commands:

1. **Initialize Local Git Repository**:
   ```bash
   git init
   ```
2. **Stage All Project Files**:
   *(Our `.gitignore` is already preconfigured to ignore compiled files and local secrets, keeping your repository clean!)*
   ```bash
   git add .
   ```
3. **Draft Your Code Commit**:
   ```bash
   git commit -m "feat: initial commit of the NASA off-world robot architect internship workbench"
   ```
4. **Set Your Primary Branch**:
   ```bash
   git branch -M main
   ```
5. **Connect Your Local Folder to GitHub**:
   *Replace the URL with your actual repository link from Step A:*
   ```bash
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/off-world-robot-architect.git
   ```
6. **Push Your Project to the Web**:
   ```bash
   git push -u origin main
   ```

*(Refresh your GitHub repository browser tab, and you will see your customized CAD tool layout, Express backend, and this elaborative markdown README beautifully rendered!)*

---

### Step C: Enhancing Your Repository Assets
To make your repository stand out to other developers, configure these elements in the sidebar:

1. **Tags / Topics (Optimize Discovery)**:
   On your GitHub repository homepage, click the ⚙️ gear icon next to "About" and add these keywords:
   `nasa-internship`, `space-habitat`, `planetary-science`, `robotics-simulator`, `typescript`, `react-vite`, `express-api`, `gemini-api`, `google-ai-studio`, `human-robot-teaming`
2. **Add a Live URL**:
   Provide your public sandbox link inside the **Website** field of the About modal:
   `https://ais-pre-sofzyfjsuxlpkhi4lmfodp-918384041588.asia-east1.run.app`
3. **Repository Title & Layout**:
   Make sure the repository headline matches:  
   *`Off-World Robot Architect: Lunar & Martian Mechanical Assistant Simulator`*

---

## 🎨 Creative Constraints & Future Scope
As you progress through your internship, you can build upon this project:
- **Phase II Visuals**: Expand the interactive SVG module to render dynamic 3D WebGL meshes using Three.js libraries.
- **Deeper NASA Outpost Integration**: Connect with real telemetry indexes or historical Mars rover environmental wind datasets using NASA Open APIs.

***

**"Inspiration driven by creativity, guided with mathematical restraint."**  
*Space Habitat & Human Assistance Systems Engineering, NASA Outreach and Education Core.*
