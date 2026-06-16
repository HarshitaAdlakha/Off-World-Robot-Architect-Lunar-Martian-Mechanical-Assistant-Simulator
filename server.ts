import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { generateWorkingsDocx, generateOnboardingDocx } from "./src/utils/docxGenerator";

dotenv.config();

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY || "";
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // API Route: Download System Workings Word Document (.docx)
  app.get("/api/download/workings", async (req, res) => {
    try {
      const buffer = await generateWorkingsDocx();
      res.setHeader("Content-Disposition", "attachment; filename=SYSTEM_WORKINGS_AND_ARCHITECTURE.docx");
      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
      res.send(buffer);
    } catch (error: any) {
      console.error("Failed to generate workings docx:", error);
      res.status(500).send("Error generating Word document");
    }
  });

  // API Route: Download Onboarding Guide Word Document (.docx)
  app.get("/api/download/onboarding", async (req, res) => {
    try {
      const buffer = await generateOnboardingDocx();
      res.setHeader("Content-Disposition", "attachment; filename=USER_TRAINING_AND_ONBOARDING_GUIDE.docx");
      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
      res.send(buffer);
    } catch (error: any) {
      console.error("Failed to generate onboarding docx:", error);
      res.status(500).send("Error generating Word document");
    }
  });

  // API Route: Evaluate Robot Design
  app.post("/api/eval-robot", async (req, res) => {
    try {
      const design = req.body;
      const ai = getGeminiClient();

      if (!process.env.GEMINI_API_KEY) {
        return res.status(400).json({
          error: "Gemini API key is not configured in local environment secrets.",
        });
      }

      const prompt = `Analyze this off-world robotics habitat assistant design rigorously from the framework of a NASA Subject Matter Expert (NASA SME Analyst). Consider real-world physics, space conditions (thermal, vacuum, dust, solar cycle, gravity, atmosphere), and human-robot teaming constraints, as well as in-situ resource utilization.

      DESIGN SPECIFICATIONS:
      - Habitat Environment: ${design.environment} (Moon vs Mars)
      - Robot Archetype: ${design.archetype}
      - Tech/Mobility System: ${design.mobility}
      - Off-world Power Source: ${design.powerSource}
      - Toolsets & Appendages: ${design.toolsets?.join(", ") || "None"}
      - Co-operation Mode (Teaming): ${design.teamingMode}
      - Core AI Personality Directive: ${design.aiPersonality}
      
      Evaluate scientific feasibility, specific failure points, environmental compatibility, and team integration efficiency. Give an overall physical viability score out of 100.
      For dust mitigation, specify either Lunar abrasive dust (Moon) or Martian fine particles (Mars) and their danger to the selected mobility/toolsets.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are a NASA Human Spaceflight Robotics Subject Matter Expert evaluating off-world rover/robot designs. Prioritize realistic physics, materials science, life-support mechanics, and cognitive load on astronauts.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.INTEGER, description: "Overall viability score out of 100" },
              dustResilience: {
                type: Type.OBJECT,
                properties: {
                  rating: { type: Type.STRING, description: "A, B, C, D, or F grade" },
                  critique: { type: Type.STRING, description: "Detailed critique pointing out how regolith/dust affects this exact setup" },
                  mitigationTips: { type: Type.STRING, description: "Standard mitigation approach" }
                },
                required: ["rating", "critique", "mitigationTips"]
              },
              thermalResilience: {
                type: Type.OBJECT,
                properties: {
                  rating: { type: Type.STRING, description: "A, B, C, D, or F grade" },
                  critique: { type: Type.STRING, description: "Detailed critique of thermal limits (-130C to 120C on Moon, -150C to 20C on Mars) and component thermal gradients" },
                  mitigationTips: { type: Type.STRING, description: "Passive or active heat transfer updates" }
                },
                required: ["rating", "critique", "mitigationTips"]
              },
              powerEfficiency: {
                type: Type.OBJECT,
                properties: {
                  rating: { type: Type.STRING, description: "A, B, C, D, or F grade" },
                  critique: { type: Type.STRING, description: "Review of power source safety, life, and continuous output during solar cycles" },
                  mitigationTips: { type: Type.STRING, description: "Sizing details or alternative power approaches" }
                },
                required: ["rating", "critique", "mitigationTips"]
              },
              humanTeamingViability: {
                type: Type.OBJECT,
                properties: {
                  rating: { type: Type.STRING, description: "A, B, C, D, or F grade" },
                  critique: { type: Type.STRING, description: "Assess workload sharing, safety safeguards, control latency, and communication bottlenecks" },
                  mitigationTips: { type: Type.STRING, description: "How to lower astronaut cognitive friction" }
                },
                required: ["rating", "critique", "mitigationTips"]
              },
              generalEvaluation: { type: Type.STRING, description: "A formal 2-paragraph evaluation summarizing the engineering marvels and fatal design omissions of this draft." },
              upgrades: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "List exactly 3 itemized directive steps for the intern to design-in for Phase 2 qualification."
              }
            },
            required: ["score", "dustResilience", "thermalResilience", "powerEfficiency", "humanTeamingViability", "generalEvaluation", "upgrades"]
          }
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("No response string returned from Gemini API");
      }

      res.json(JSON.parse(responseText.trim()));
    } catch (error: any) {
      console.error("Evaluation error:", error);
      res.status(500).json({ error: error.message || "Failed to generate evaluation" });
    }
  });

  // API Route: Consultation Chat with Dr. Evelyn Vance, NASA SME
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, currentDesign } = req.body;
      const ai = getGeminiClient();

      if (!process.env.GEMINI_API_KEY) {
        return res.status(400).json({
          error: "Gemini API key is not configured in local environment secrets.",
        });
      }

      // We format the conversation history for the generateContent call.
      // We will inject the details of the active robot layout as context.
      const designContextAndInstructions = `You are Dr. Evelyn Vance, a renowned senior NASA Space Operations Scientist and foremost Subject Matter Expert (SME) in extra-planetary robotic systems and human-robot teaming. You are mentoring this undergraduate intern.
      
      The intern is working on a robot assistant with this ACTIVE DESIGN layout:
      - Environment: ${currentDesign?.environment || "No selected environment (either Moon or Mars)"}
      - Archetype: ${currentDesign?.archetype || "Drafting"}
      - Mobility: ${currentDesign?.mobility || "Drafting"}
      - Power Source: ${currentDesign?.powerSource || "Drafting"}
      - Tools: ${currentDesign?.toolsets?.join(", ") || "None"}
      - Human Synergy: ${currentDesign?.teamingMode || "Drafting"}
      - AI Personality Directive: ${currentDesign?.aiPersonality || "Drafting"}

      YOUR PERSONALITY:
      - Deeply knowledgeable, highly scientific but encourages the student.
      - Mentors them on engineering limits: abrasive sharpness of electrostatic micro-fractured Lunar regolith, Mars planetary winds and light low-density atmospheric convection, thermal vacuum challenges, radioisotope thermoelectrics vs solar panel sand accumulation, boron nitride polymers for cosmic ray shielding, and psychological anchoring of astronauts interacting with companionship robots.
      - Never break character. Be rigorous but supportive. Ask probing questions about their design tradeoffs (e.g. weight budgets, thermal loops).
      - Keep responses relatively brief (1-3 key insights or ideas at a time) to maintain an interactive dialogue. Speak directly to them.`;

      // Map client messages to Gemini parts content structure
      const formattedContents = messages.map((m: any) => ({
        role: m.sender === "user" ? "user" : "model",
        parts: [{ text: m.text }],
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction: designContextAndInstructions,
          temperature: 0.8,
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Chat API error:", error);
      res.status(500).json({ error: error.message || "Failed to consult with SME" });
    }
  });

  // API Route: AI Schematic Concept Poster Generator (Optional payload)
  app.post("/api/generate-image", async (req, res) => {
    try {
      const { prompt } = req.body;
      const ai = getGeminiClient();

      if (!process.env.GEMINI_API_KEY) {
        return res.json({
          error: "Gemini API key missing. Image generation operates on preset visual schematic.",
        });
      }

      // Generate off-world concept art using gemini-2.5-flash-image
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1"
          }
        }
      });

      let base64Image = null;
      if (response && response.candidates && response.candidates[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            base64Image = `data:image/png;base64,${part.inlineData.data}`;
            break;
          }
        }
      }

      if (base64Image) {
        res.json({ imageUrl: base64Image });
      } else {
        res.json({ error: "No image content returned by image model" });
      }
    } catch (error: any) {
      console.error("Image generation error:", error);
      res.status(500).json({ error: error.message || "Failed to generate image" });
    }
  });

  // Mount Vite development middleware if not production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Off-World Habitat Lab] Server listening on http://localhost:${PORT}`);
  });
}

startServer();
