# Off-World Robot Architect 🚀
**Planetary Robotics CAD Workbench & Teaming Simulator**  
*A Scientific Modeling Platform Developed under the Blue Marble Space Research Initiative*

Welcome to the **Off-World Robot Architect** workbench. This full-stack interactive modeling platform was designed as part of the Blue Marble Space academic outreach and habitat architecture initiative. The platform empowers interns, researchers, and space systems engineers to conceptualize, simulate, and scientifically evaluate robotic assistant systems deployed within lunar or Martian human settlements (~100-person outposts).

This system bridges creative design with strict physical, thermophysical, and engineering boundaries. Users configure physical loadouts, review design parameters, and subject their robot systems to dynamic simulations evaluated by a structured machine learning analysis layer.

---

## 🎨 Design Philosophy: Innovation with Restraint

Developing mechanical systems for extreme environments requires an appreciation for the harsh physical realities of the Solar System. Under the Blue Marble Space academic framework, this workbench emphasizes **scientific fidelity over speculation**:
* **Electrostatic Regolith Abasiveness**: Micro-fractured, sharp silicate glass particles on the Moon carry intense electrostatic charges that cling to and erode metallic joints, seals, and solar panels.
* **Martian Atmosphere & Solar Flux**: Mars has a thin $CO_2$ atmosphere (~0.6% of Earth's) which reduces convective cooling capacity. Frequent regional and global-scale dust storms block up to 99% of incoming solar irradiance.
* **Thermal Shock**: Outposts operate across massive temperature swings (down to $-130^\circ\text{C}$ during lunar nights, or $-153^\circ\text{C}$ inside Martian polar craters). This requires radioisotope thermal systems, sophisticated heat pipes, or high-performance solid-state batteries.
* **Human-Robot Symbiosis**: Teaming protocols must minimize the cognitive friction and psychological strain on off-world crew working in high-isolation claustrophobic capsules.

---

## 🏗️ Technical Architecture & Workflow

The platform utilizes a structured full-stack architecture to separate presentation, reactive layouts, simulation logic, and secure machine learning computation.

```
+--------------------------------------------------------------------------+
|                            FRONTEND (React)                              |
|                                                                          |
|   +-----------------------+   +-------------------+   +--------------+   |
|   |  Planetary Customizer |   | Interactive SVG  |   | E-Poster     |   |
|   |  & Parameter State    |   | Diagnostic Canvas |   | Outreach View|   |
|   +-----------+-----------+   +---------^---------+   +------^-------+   |
|               |                         |                    |           |
+---------------|-------------------------|--------------------|-----------+
                | POST /api/eval-robot    | System Sync        | Renders
                | POST /api/chat          |                    |
+---------------v-------------------------v--------------------|-----------+
|                            BACKEND (Express)                 |           |
|                                                              |           |
|   +-----------------------+     +----------------------------+--------+  |
|   | API Router Modules    |     | Token & Secret Environment Managers|  |
|   +-----------+-----------+     +--------------------+----------------+  |
|               |                                      |                   |
+---------------|--------------------------------------|-------------------+
                | Secure RPC Requests                  |
+---------------v--------------------------------------v-------------------+
|               MACHINE LEARNING & INTELLIGENT SIMULATION                  |
|                                                                          |
|   +---------------------------------+  +-----------------------------+   |
|   | Gemini API Analysis Engine      |  | Structured JSON Schema Pool |   |
|   | (SME Physical Evaluations,      |  | (Strict type validations    |   |
|   | Contextual Consultation Chat)    |  | for physical coefficients)  |   |
|   +---------------------------------+  +-----------------------------+   |
+--------------------------------------------------------------------------+
```

### 1. Frontend Technology (The Client Interface)
The user interface is engineered as a single-page reactive application using **React 18** and **Vite**:
* **State Management**: Formulates a unified `RobotDesign` schema tracking target parameters including environment, archetype, motor system, power cycle options, and equipment lists.
* **Interactive Dynamic Render Engine**: A custom vector-state graphic components layer built using high-performance responsive SVGs. Rather than loading flat pre-rendered bitmaps, the app parses the active custom configuration and directly redraws structural components, warning emitters, power grids (solar cells/RTG panels), tool payloads, and track drive geometries dynamically.
* **Modular Tab Layouts**: Clean, modular codebases isolate the **Design Board**, the **Interactive Emergency Simulator**, and the **Printable Outreach E-Poster** into self-contained sub-components.

### 2. Backend Technology (The Secure Controller)
The backend is a robust **Node.js Express** server communicating over type-safe JSON payloads:
* **Port Concentration & Reverse Proxy**: All system ingress maps to standard port `3000` via our container proxy.
* **Lazy Initialization**: The machine learning model client initializes logically only when called, preventing server bootstrap failures if environment variables are not globally mapped during developer setup.
* **Proxy Safety Barrier**: Sensitive API keys remain hidden inside the environment container memory space. The client frontend never communicates with the machine learning APIs directly, preventing key-hijacking or prompt spoofing.

---

## 📊 Core System Workflow

1. **Design Parameter Assembly**: The user chooses a loadout in the reactive panel. The client-side state validates that physical rules are followed (e.g., limits payloads to a maximum of 3 custom active toolsets to preserve launch mass constraints, and locks methane-oxygen engines on the Moon due to thin air density).
2. **Audit Proposal Dispatch**: Upon initiating an audit, the client securely fires a structured JSON request to `/api/eval-robot`.
3. **Structured Machine Learning Evaluation**: 
Streamlines the design metadata directly into the machine learning engine, enforcing strict JSON schemas to capture a precise structural array containing qualitative and quantitative metrics:
   * **Viability Index Score** (represented dynamically via a fluid circular progress meter)
   * **Dust Resilience Rating** & **Engineering Critique**
   * **Thermal Resilience Rating** & **Insulation Analysis**
   * **Power Cycle Safety** & **Mitigation Advice**
   * **Teaming Synergy Ratings** & **Cognitive Workload Analysis**
   * **Phase II Directives** (A 3-step itemized list of upgrades for physical qualification)
4. **Context-Aware Dialogue**: When chatting with the Blue Marble Space senior scientist chatbot, the conversation state is continually paired with the active robotic schematic, allowing the AI advisor to offer highly specific feedback on the chosen mobility arrays or power thermal margins.
5. **Interactive Anomaly Run**: Compares robot hardware assets against dynamic outpost emergencies. The engine evaluates if the chosen payload carries required tools (e.g., active electrostatic brushes for lunar regolith maintenance, or high-temp plasma welders for hull-breaching alerts) to determine success.

---

## 🔬 How Machine Learning Powers This Platform

This application leverages advanced **Large Language Models (LLMs)** specifically configured as a highly accurate physical simulator. 

### Current Implementation: Gemini LLM Engine
Rather than hosting heavy static physics equations, the system translates environmental metadata into an evaluation context. This context is computed by **Gemini 3.5**, operating on structured constraints:
* **System Prompt Inoculation**: Employs system instructions modeling a Senior Space Systems Engineering Analyst. This filters out speculative sci-fi and anchors predictions to materials chemistry, thermal physics limits, and structural mechanics.
* **Strict Schema Enforcement**: Utilizing the `responseSchema` property within the `@google/genai` model options, the backend forces the neural network's free-form natural language into a rigid, type-safe JSON structure. If the model attempts to return invalid fields, the TypeScript schema parser throws caught errors immediately, protecting the frontend UI from data corruption.

---

## 🚀 Future Roadmap: Adding Deeper Machine Learning Models

To transform this modeling app into a predictive simulation engine, we can integrate additional dedicated machine learning pipelines:

### 1. Deep Reinforcement Learning (DRL) for Robotic Traversal
* **How to Add**: Run a python service running PyTorch in the background or utilize ONNX Runtime in the Node server.
* **Scientific Value**: We can train a Proximal Policy Optimization (PPO) model inside simulated Moon/Mars terrain grids. Based on selected wheels or legs, the model predicts the optimal step vector or track torque adjustments over loose sandy crater slopes, returning an actual simulated traversal boundary.

### 2. Computer Vision (YOLO/SAM) for Hazard Identification
* **How to Add**: Mount a camera stream within the simulator module, and load a lightweight TensorFlow.js model in the browser or on the Express backend.
* **Scientific Value**: Detect and trace simulated geological features (basalt blocks, micro-craters, ice caves). The vision system dynamically identifies stable crawl paths, calculating real-time risk coefficients for quadrupedal walkers.

### 3. Deep Regression Networks for Multilayer Thermophysical Modeling
* **How to Add**: Train a multi-layer backpropagation neural network on historical lunar thermal registers and Martian thermal inertia datasets.
* **Scientific Value**: Based on the material thickness of the chassis and heat output of the chose power grid (e.g., RTG heat vs solid-state battery thermal cycles), the regression model predicts the core interior module temperatures over a simulated 24-hour diurnal cycle, showing real-time temperature curve graphs.

---

## 🛠️ Local Installation & Development

### 1. Prerequisites
Ensure you have **Node.js (v18 or higher)** installed on your operating system.

### 2. Extract Project Directories
Open your shell within the extracted root workspace directory.

### 3. Install All Dependencies
```bash
npm install
```

### 4. Configure Your ML Credentials
* Acquire a free API Key from [Google AI Studio](https://aistudio.google.com/).
* Duplicate `.env.example` to create a local `.env` configuration file:
  ```bash
  cp .env.example .env
  ```
* Specify your valid API key inside `.env`:
  ```env
  GEMINI_API_KEY="AIzaSyYourActualKeyGoesHere..."
  ```

### 5. Launch the Local Server
```bash
npm run dev
```
The application executes the local server:
```text
[Off-World Habitat Lab] Server listening on http://localhost:3000
```
Simply visit **`http://localhost:3000`** inside your web browser!

### 6. Build and Run in Production
To compile client static React files and package the server CJS files:
```bash
npm run build
npm run start
```

---

## 📜 Blue Marble Space Code of Conduct & Restraints
All digital resources compiled within this portfolio are optimized for academic outreach, and classroom instruction. Future modifications should prioritize scientific verification, logical constraints, and structural rigor.
