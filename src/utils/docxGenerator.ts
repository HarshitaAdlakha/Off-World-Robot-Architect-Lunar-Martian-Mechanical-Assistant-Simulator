import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx";

/**
 * Utility to generate a professionally formatted Microsoft Word (.docx) document
 * detailing the app's Systems Workings and Architecture.
 */
export async function generateWorkingsDocx(): Promise<Buffer> {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // TITLE
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 400 },
            children: [
              new TextRun({
                text: "OFF-WORLD ROBOT ARCHITECT",
                bold: true,
                size: 36, // 18pt
                color: "1A365D", // Deep Navy
                font: "Calibri",
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 600 },
            children: [
              new TextRun({
                text: "SYSTEMS WORKINGS, ARCHITECTURE, AND SCIENCE MERITS",
                bold: true,
                size: 24, // 12pt
                color: "4A5568", // Slate Gray
                font: "Calibri",
              }),
              new TextRun({
                text: "\nDeveloped under the Blue Marble Space Academic Reference Framework",
                italics: true,
                size: 18, // 9pt
                color: "718096",
                font: "Calibri",
              }),
            ],
          }),

          // SECTION 1: EXECUTIVE SUMMARY
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
            children: [
              new TextRun({
                text: "1. Executive Summary",
                bold: true,
                size: 28, // 14pt
                color: "1A365D",
                font: "Calibri",
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: "The Off-World Robot Architect is an advanced, high-fidelity engineering workbench designed to enable systems architects, astrobiologists, and interns within the Blue Marble Space initiative to model, test, and validate robotic assistants intended for lunar and Martian human settlements (~100-person outpost camps). By combining dynamic vector-drawn CAD representations, multi-stage state calculations, and artificial intelligence-driven qualification checklists, the platform shifts extraterrestrial exploration design away from qualitative speculation toward rigid, quantitative validation.",
                font: "Calibri",
                size: 22,
              }),
            ],
          }),

          // SECTION 2: SYSTEM ARCHITECTURE
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
            children: [
              new TextRun({
                text: "2. Full-Stack System Architecture & Flow",
                bold: true,
                size: 28,
                color: "1A365D",
                font: "Calibri",
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: "To ensure modular development, high reactivity, and reliable security, the workbench is built upon a full-stack architecture dividing responsibilities cleanly between client-side drawing matrices, server-side controller middleware, and deterministic machine learning pipelines.",
                font: "Calibri",
                size: 22,
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 150 },
            children: [
              new TextRun({
                text: "• Frontend Application Layer (React 18 & Vite): ",
                bold: true,
                color: "2B6CB0",
                font: "Calibri",
                size: 22,
              }),
              new TextRun({
                text: "Employs an interactive client-side design workbench. Rather than using pre-rendered, heavy static bitmaps, the interface features a dynamic Vector CAD drawing board powered by modular SVG components. Swapping equipment, wheel rails, power grids, or tool packages triggers instant parametric recalculations and visual redraws.",
                font: "Calibri",
                size: 22,
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 150 },
            children: [
              new TextRun({
                text: "• Backend Execution Layer (Express on Node.js): ",
                bold: true,
                color: "2B6CB0",
                font: "Calibri",
                size: 22,
              }),
              new TextRun({
                text: "Provides robust endpoint routes, serves bundled production code, isolates environment configurations, and coordinates secure REST calls to AI endpoints. Keeping API keys server-side protects credentials from browser exposure.",
                font: "Calibri",
                size: 22,
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: "• Scientific Verification Layer (Gemini LLM): ",
                bold: true,
                color: "2B6CB0",
                font: "Calibri",
                size: 22,
              }),
              new TextRun({
                text: "Leverages deep neural language models injected with physics-grounded guidelines. The model is forced under strict JSON schemas (using native responseSchema structure) to evaluate thermophysical and engineering parameters, preventing data mutations.",
                font: "Calibri",
                size: 22,
              }),
            ],
          }),

          // SECTION 3: PHYSICAL RESTRAINTS MODEL
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
            children: [
              new TextRun({
                text: "3. Environment and Physical Constraints Modeling",
                bold: true,
                size: 28,
                color: "1A365D",
                font: "Calibri",
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: "The fundamental goal of the workbench is to model the severe constraints of the Moon and Mars:",
                font: "Calibri",
                size: 22,
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 150 },
            children: [
              new TextRun({
                text: "1. Electrostatic Lunar Regolith: ",
                bold: true,
                color: "C53030",
                font: "Calibri",
                size: 22,
              }),
              new TextRun({
                text: "Due to solar wind bombardment and the lack of atmospheric shielding, lunar dust particles are sharp, jagged, and electrostatically charged. They easily infiltrate mechanical bearings, erode rotary sensors, and block solar photovoltaic absorption. Protecting joints requires specialized electrostatic active wipers or boron-nitride protective seals.",
                font: "Calibri",
                size: 22,
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 150 },
            children: [
              new TextRun({
                text: "2. Thermal Shock Cycles: ",
                bold: true,
                color: "C53030",
                font: "Calibri",
                size: 22,
              }),
              new TextRun({
                text: "Lunar nights last 14 Earth days, plunging temperatures to -130°C. Standard batteries and structural polymers become brick-brittle and freeze out under these conditions. On Mars, extreme temperature dips inside polar craters down to -153°C require continuous thermal radiators fed by plutonium RTGs rather than solar systems.",
                font: "Calibri",
                size: 22,
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: "3. Thin CO2 Atmosphere and Local Sabatier Extraction: ",
                bold: true,
                color: "C53030",
                font: "Calibri",
                size: 22,
              }),
              new TextRun({
                text: "The Martian atmosphere consists of 95% carbon dioxide. It can support in-situ chemical engine loops (methane-oxygen combustion engines utilizing Sabatier conversions), whereas the Moon lacks any gaseous resources, precluding internal combustion power structures.",
                font: "Calibri",
                size: 22,
              }),
            ],
          }),

          // SECTION 4: INTELLIGENCE ENGINE & MACHINE LEARNING
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
            children: [
              new TextRun({
                text: "4. Integrating Advanced Machine Learning Models",
                bold: true,
                size: 28,
                color: "1A365D",
                font: "Calibri",
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: "Currently, our platform uses the Gemini API model to generate structured evaluations and converse with engineers. In future phases of the Blue Marble Space project, the platform's utility can be drastically amplified by embedding three dedicated machine learning models:",
                font: "Calibri",
                size: 22,
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 150 },
            children: [
              new TextRun({
                text: "A. Deep Reinforcement Learning (DRL) for Terrain Traversal: ",
                bold: true,
                font: "Calibri",
                size: 22,
              }),
              new TextRun({
                text: "By training a Proximal Policy Optimization (PPO) reinforcement model inside a simulated 3D Martian terrain grids, the software can predict and visualize how the chosen mobility systems (e.g. wheels vs. treads vs. limbs) slip or tip over steep sand dunes.",
                font: "Calibri",
                size: 22,
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 150 },
            children: [
              new TextRun({
                text: "B. Computer Vision for Hazard Detection: ",
                bold: true,
                font: "Calibri",
                size: 22,
              }),
              new TextRun({
                text: "Incorporating a camera stream inside the mission simulator using a lightweight web model (such as YOLOv8 or TensorFlow.js). The computer vision system can dynamically trace basalt boulders, deep voids, or crater lips, proposing stable crawl directions.",
                font: "Calibri",
                size: 22,
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: "C. Deep Regression Neural Networks for Heat Pipe Modeling: ",
                bold: true,
                font: "Calibri",
                size: 22,
              }),
              new TextRun({
                text: "Using a multi-layer gradient-boosted regression network trained on physical planetary thermal records. The model calculates the exact interior cabin temperature curves of the robot based on external atmosphere, casing thickness, and heat dissipation of RTG plutonium cores, showing real-time safety graphs.",
                font: "Calibri",
                size: 22,
              }),
            ],
          }),

          // OUTRO
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 600, after: 200 },
            children: [
              new TextRun({
                text: "FOR SCHOLARLY INSTRUCTION AND STUDENT OUTREACH PREPARATION",
                bold: true,
                size: 16, // 8pt
                color: "718096",
                font: "Calibri",
              }),
            ],
          }),
        ],
      },
    ],
  });

  return await Packer.toBuffer(doc);
}

/**
 * Utility to generate a professionally formatted Microsoft Word (.docx) document
 * detailing the User Onboarding and Training Guide.
 */
export async function generateOnboardingDocx(): Promise<Buffer> {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // TITLE
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 400 },
            children: [
              new TextRun({
                text: "OFF-WORLD ROBOT ARCHITECT",
                bold: true,
                size: 36, // 18pt
                color: "2C5282", // Blue
                font: "Calibri",
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 600 },
            children: [
              new TextRun({
                text: "VISUAL SYSTEMS ONBOARDING & TRAINING GUIDE",
                bold: true,
                size: 24, // 12pt
                color: "4A5568", // Slate Gray
                font: "Calibri",
              }),
              new TextRun({
                text: "\nA Practical Training Manual for Blue Marble Space Research Interns",
                italics: true,
                size: 18, // 9pt
                color: "718096",
                font: "Calibri",
              }),
            ],
          }),

          // INTRODUCTION
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
            children: [
              new TextRun({
                text: "1. Mission Overview for Specialist Interns",
                bold: true,
                size: 28,
                color: "2C5282",
                font: "Calibri",
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: "Welcome to the Off-World Habitation Laboratory, Specialist Intern! This platform was developed to help you design, test, and package robotic assistants optimized to integrate with astronaut crews on the Moon or Mars. Operating in hostile environments requires strict respect for physical limitations. This manual ensures you can comfortably configure your layout, run disaster drills, and build outreach posters.",
                font: "Calibri",
                size: 22,
              }),
            ],
          }),

          // SECTION 2: THE 5-STEP CORE WORKFLOW
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
            children: [
              new TextRun({
                text: "2. The Structured 5-Step Project Workflow",
                bold: true,
                size: 28,
                color: "2C5282",
                font: "Calibri",
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 150 },
            children: [
              new TextRun({
                text: "Step 1: Assign Prototype Reference and Environment",
                bold: true,
                color: "2B6CB0",
                font: "Calibri",
                size: 22,
              }),
              new TextRun({
                text: "\nSpecify your robot's custom ID. Next, choose either Moon or Mars. Note how the workspace background color instantly swaps. A gray environment simulates stark lunar craters, whereas rusty amber represents harsh Martian sands.",
                font: "Calibri",
                size: 22,
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 150 },
            children: [
              new TextRun({
                text: "Step 2: Choose Locomotive & Propulsion Systems",
                bold: true,
                color: "2B6CB0",
                font: "Calibri",
                size: 22,
              }),
              new TextRun({
                text: "\nConfigure active structures like the Archetype (e.g. autonomous miner), Mobility (e.g. Rocker-Bogie), and Power (solar plates vs RTG). Ensure your power grid matches local environments! Solar arrays will experience dust storm shading issues, and standard battery plates will freeze during lunar nights.",
                font: "Calibri",
                size: 22,
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 150 },
            children: [
              new TextRun({
                text: "Step 3: Equipping Auxiliary Toolsets",
                bold: true,
                color: "2B6CB0",
                font: "Calibri",
                size: 22,
              }),
              new TextRun({
                text: "\nLaunch mass quotas enforce a strict engineering budget of 3 tools. Select specialized payloads. The CAD visual schematics diagram in the right HUD will instantly redraw and display your mounted gears in real-time!",
                font: "Calibri",
                size: 22,
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 150 },
            children: [
              new TextRun({
                text: "Step 4: Launching the SME Audit",
                bold: true,
                color: "2B6CB0",
                font: "Calibri",
                size: 22,
              }),
              new TextRun({
                text: "\nSubmit your completed schematics to the Blue Marble Space senior analyst desk. The machine learning model runs comprehensive calculations on dust resilience, thermal mitigation and power safety, grading your design on a dynamic Circular Progress HUD.",
                font: "Calibri",
                size: 22,
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: "Step 5: Consulting with Dr. Vance",
                bold: true,
                color: "2B6CB0",
                font: "Calibri",
                size: 22,
              }),
              new TextRun({
                text: "\nStuck with a low safety score? Utilize the Live Chat widget to talk with Dr. Evelyn Vance, NASA Senior Scientist, in real-time. She receives your active robot state and analyzes dust seals, cosmic shielding and thermal cycles to guide your design.",
                font: "Calibri",
                size: 22,
              }),
            ],
          }),

          // SECTION 3: EMERGENCY OPERATIONS DRILLS
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
            children: [
              new TextRun({
                text: "3. Conducting Mission Operations Simulations",
                bold: true,
                size: 28,
                color: "2C5282",
                font: "Calibri",
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: "Navigate to the 'Mission Operations Simulator' tab in the top workspace bar. Here, you will subject your active layout to textbook planetary emergencies (Extreme Polar Frostbite, Lava Tube Collapse, or Electrostatic Dust Cyclones). Selecting options that align with your mounted physical toolsets (such as utilizing Electrostatic Dust brushes during sandstorms) triggers major success point multipliers. Design gaps or failures force high-hazard astronaut spacewalks to patch the base under stress.",
                font: "Calibri",
                size: 22,
              }),
            ],
          }),

          // SECTION 4: EXPORTING PORTFOLIOS
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
            children: [
              new TextRun({
                text: "4. Packaging Outreach E-Posters and Generating Art",
                bold: true,
                size: 28,
                color: "2C5282",
                font: "Calibri",
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: "Click the 'E-Poster Blueprint' tab to assemble your research into a beautiful, printable A4 portfolio. You can type an artistic canvas prompt and generate a photorealistic planetary portrait of your assistant in action on the surface. When finalized, tap the prominent 'Export / Print' action—this triggers your native system printer, letting you output clean A4 hardcopies or save high-fidelity PDF documents.",
                font: "Calibri",
                size: 22,
              }),
            ],
          }),

          // SECTION 5: HELPFUL MISSION CHEAT SHEET
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
            children: [
              new TextRun({
                text: "5. Troubleshooting Design Constraints (Cheat Sheet)",
                bold: true,
                size: 28,
                color: "2C5282",
                font: "Calibri",
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 150 },
            children: [
              new TextRun({
                text: "• Combatting the Lunar Night: ",
                bold: true,
                font: "Calibri",
                size: 22,
              }),
              new TextRun({
                text: "The Moon faces continuous 14-day nights with temperatures dropping to -130°C. Standard solar plates will fail. You MUST utilize Radioisotope Thermoelectric Generators (RTGs) to supply uninterrupted power and continuous thermal decay.",
                font: "Calibri",
                size: 22,
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 150 },
            children: [
              new TextRun({
                text: "• Repelling Fine Martian Sand: ",
                bold: true,
                font: "Calibri",
                size: 22,
              }),
              new TextRun({
                text: "Windstorms carry lightweight iron oxide dust that blocks solar rays and jams steering treads. Equip 'Active Dust Ingress Brushes & Electrostatic Deflectors' to keep solar cells clean.",
                font: "Calibri",
                size: 22,
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: "• Optimizing Crew Teaming Score: ",
                bold: true,
                font: "Calibri",
                size: 22,
              }),
              new TextRun({
                text: "Minimize astronaut psychological friction. Always pair the 'Supervised Field Assistant' coordination protocol with a companion helper personality like the 'Collaborative Copilot Directives' system.",
                font: "Calibri",
                size: 22,
              }),
            ],
          }),

          // ACCENT LINE
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 500, after: 100 },
            children: [
              new TextRun({
                text: "BLUE MARBLE SPACE OUTPOST ACADEMY • PREPARE FOR OUTREACH SUCCESS",
                bold: true,
                size: 16,
                color: "718096",
                font: "Calibri",
              }),
            ],
          }),
        ],
      },
    ],
  });

  return await Packer.toBuffer(doc);
}
