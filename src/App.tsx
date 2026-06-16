import React, { useState, useEffect } from "react";
import { 
  RobotDesign, 
  SmeEvaluation, 
  ChatMessage 
} from "./types";
import { 
  ARCHETYPES, 
  MOBILITIES, 
  POWER_SOURCES, 
  TOOLSET_OPTIONS, 
  TEAMING_MODES, 
  AI_PERSONALITIES, 
  ENV_DETAILS, 
  PRESETS 
} from "./data";

import RobotCanvas from "./components/RobotCanvas";
import SmeReport from "./components/SmeReport";
import SmeConsultation from "./components/SmeConsultation";
import ScenarioSimulator from "./components/ScenarioSimulator";

import { 
  Globe, 
  Heart, 
  Cpu, 
  ShieldCheck, 
  Radio, 
  Layers, 
  FileText, 
  Printer, 
  MessageSquare, 
  Check, 
  AlertCircle,
  HelpCircle,
  Wrench,
  Sparkles,
  Info,
  BookOpen
} from "lucide-react";

export default function App() {
  // Navigation Tabs at the top level
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<"workspace" | "operations" | "poster">("workspace");

  // State: Robot Design values
  const [design, setDesign] = useState<RobotDesign>({
    name: "Ranger-IV Polar Core Miner",
    environment: "Mars",
    archetype: "Autonomous Subsurface Miner",
    mobility: "Heavy-Duty Track System",
    powerSource: "Radioisotope Thermoelectric Generator (RTG)",
    toolsets: [
      "Abrasive-Resistant Planetary Drill (coring ice/rock)",
      "Subsurface Ground Penetrating Radar (void detection)",
      "Active Dust Ingress Brush & Electrostatic Deflectors"
    ],
    teamingMode: TEAMING_MODES[1], // Supervised Field Assistant
    aiPersonality: AI_PERSONALITIES[0] // Strict Logician
  });

  // User input custom details & notes (printed on poster)
  const [userConceptNotes, setUserConceptNotes] = useState(
    "Designed to autonomously locate and core high-yield sub-regolith water-ice deposits inside deep Martian lava tubes. Equipped with lead radiator plates for central RTG heat dissipation, ensuring hydraulic fluids and optical gears do not seize under the -130°C temperature floor."
  );

  // State: NASA evaluation results
  const [evaluation, setEvaluation] = useState<SmeEvaluation | null>(null);
  const [evalLoading, setEvalLoading] = useState(false);
  const [isEvalStale, setIsEvalStale] = useState(false); // flags when design was edited after evaluation
  const [evalError, setEvalError] = useState<string | null>(null);

  // State: Conversation history with SME Dr. Vance
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Hello! Welcome to the Habitation Robotics Laboratory. I'm Dr. Evelyn Vance, NASA Senior Scientist in human-robot teaming.\n\nDesigning mechanical assistance for the Moon or Mars requires a delicate balance of mechanical creativity and physical restraint. Abrasive glass-sharp dust, severe radiator limits, 14-day nights, and high astronaut cognitive stress are real limits we must design for.\n\nChoose load-out specifications on the left, load preconfigured setups to explore, and submit your schematics. Let's build something flight-ready!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [chatLoading, setChatLoading] = useState(false);

  // State: Concept Art Generator
  const [conceptArtUrl, setConceptArtUrl] = useState<string | null>(null);
  const [generatingArt, setGeneratingArt] = useState(false);
  const [artPromptOverride, setArtPromptOverride] = useState("");

  // Auto flag evaluation as stale whenever any design item changes
  const handleDesignChange = (updates: Partial<RobotDesign>) => {
    setDesign(prev => {
      const next = { ...prev, ...updates };
      setIsEvalStale(true);
      return next;
    });
  };

  // Load a Preconfigured NASA Blueprint preset
  const handleLoadPreset = (preset: typeof PRESETS[0]) => {
    setDesign({ ...preset.design });
    setIsEvalStale(true);
    // Auto populate matching notes
    if (preset.name.includes("Ares")) {
      setUserConceptNotes("Double-sealed joint shafts to repel fine perchlorate dust infiltration. Optimized for glacial retrieval in the Elysium Planitia subterranean cave system.");
    } else if (preset.name.includes("Artemis")) {
      setUserConceptNotes("High-torque multi-limbed magnetic crawler to maintain stability on physical exterior struts during micro-gravity vacuum traversal.");
    } else if (preset.name.includes("Ceres")) {
      setUserConceptNotes("Operating on non-convective gantry rails inside the high-humidity bio-secured zones. Low constant force-feedback fingers prevent plant cell Wall destruction.");
    }
  };

  // Handle Tool selection toggles (up to 3 maximum to maintain mass budget limits)
  const handleToggleToolset = (tool: string) => {
    const active = design.toolsets || [];
    let next: string[] = [];
    if (active.includes(tool)) {
      next = active.filter(t => t !== tool);
    } else {
      if (active.length >= 3) {
        // Enforce a strict physical mass limit constraint!
        alert("PHYSICAL MASS CONSTRAINT: Off-world launch payload regulations limit payload weights to 3 customized active toolsets. Deselect another module first.");
        return;
      }
      next = [...active, tool];
    }
    handleDesignChange({ toolsets: next });
  };

  // Trigger server-side Gemini SME Evaluation
  const handleEvaluateDesign = async () => {
    setEvalLoading(true);
    setEvalError(null);
    try {
      const response = await fetch("/api/eval-robot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(design)
      });
      const data = await response.json();
      if (data.error) {
        setEvalError(data.error);
        // Inject a small helpful bubble in chat
        setChatMessages(prev => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            sender: "system",
            text: "SYSTEM ADVISORY: Cloud Run connection lost or API key missing in workspace environments. Try configuring GEMINI_API_KEY inside the secrets menu.",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } else {
        setEvaluation(data);
        setIsEvalStale(false);
        // Dr. Vance chimes in about the newly issued audit!
        setChatMessages(prev => [
          ...prev,
          {
            id: `eval-notice-${Date.now()}`,
            sender: "ai",
            text: `I have just compiled our physical simulation results for your design: '${design.name}'. It received an overall viability index score of ${data.score}/100. \n\nI highly advise checking our breakdown audits on the 'Consultation Report' tab—especially regarding ${design.environment === "Moon" ? "sharp abrasive Lunar regolith" : "fine Martian sand structures"} and ${design.powerSource}. Let's chat about any refinements you'd like to make!`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    } catch (err: any) {
      console.error(err);
      setEvalError("Server communication failed. Please make sure the dev server is active.");
    } finally {
      setEvalLoading(false);
    }
  };

  // Submit message in mentor chat with Dr Vance
  const handleSendChatMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setChatLoading(true);

    try {
      // Package existing message history (limit to last 15 to stay within limits)
      const visibleHistory = chatMessages
        .filter(m => m.id !== "welcome")
        .slice(-12)
        .map(m => ({
          sender: m.sender,
          text: m.text
        }));

      // Append new user message
      visibleHistory.push({ sender: "user", text });

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: visibleHistory,
          currentDesign: design
        })
      });

      const data = await response.json();
      if (data.text) {
        setChatMessages(prev => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            sender: "ai",
            text: data.text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } else {
        // Mock fallback if API returns error
        setChatMessages(prev => [
          ...prev,
          {
            id: `ai-err-${Date.now()}`,
            sender: "ai",
            text: `I'm currently running into an off-grid transmission delay from NASA HQ. Let's discuss your current choice of ${design.mobility} and how we can refine the power mass safety! (To reactivate the real-time AI, ensure your GEMINI_API_KEY is active.)`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setChatLoading(false);
    }
  };

  // Trigger server-side AI concept illustration generator
  const handleGenerateConceptArt = async () => {
    setGeneratingArt(true);
    const finalPrompt = artPromptOverride.trim() || 
      `An ultra-realistic planetary illustration of a ${design.archetype} named '${design.name}' operating in the ${design.environment === "Moon" ? "stark gray craters under the bright stars" : "dusty orange desert sands"} of the ${design.environment}. High technical detail of ${design.mobility} and powered by ${design.powerSource}, space habitat backdrop, nasa outreach concept art.`;

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: finalPrompt })
      });
      const data = await response.json();
      if (data.imageUrl) {
        setConceptArtUrl(data.imageUrl);
      } else if (data.error) {
        alert(`API Info: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      alert("Image generator communication fault.");
    } finally {
      setGeneratingArt(false);
    }
  };

  // Native window print triggers
  const handlePrintPoster = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans transition-all selection:bg-sky-500/30 selection:text-white">
      
      {/* HEADER BANNER */}
      <header className="border-b border-neutral-900 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-50 px-4 py-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-sky-600/10 border border-sky-500/40 flex items-center justify-center shadow-lg shadow-sky-600/10 shrink-0">
              <Globe className="w-5 h-5 text-sky-400 rotate-12" />
            </div>
            <div>
              <h1 className="text-sm font-bold font-display tracking-tight text-neutral-100">
                Off-World Habitation Lab
              </h1>
              <p className="text-[10px] text-neutral-500 font-mono tracking-wider uppercase">
                Robotics CAD Workbench • NASA Undergraduate Internship Project
              </p>
            </div>
          </div>

          {/* Preset Buttons loaded at the header */}
          <div className="flex flex-wrap items-center gap-1.5 xs:gap-2">
            <span className="text-[10px] text-neutral-500 font-mono hidden md:inline">LOAD FLIGHT SCHEMATICS:</span>
            {PRESETS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => handleLoadPreset(preset)}
                className="px-2.5 py-1 bg-neutral-900/60 hover:bg-neutral-850 border border-neutral-800 hover:border-neutral-750 text-neutral-300 hover:text-white text-[10.5px] font-mono rounded cursor-pointer transition-all"
              >
                {preset.name.split(" ")[0]}
              </button>
            ))}
          </div>

        </div>
      </header>

      {/* SUB-NAV WORKSPACE SECTIONS */}
      <div className="bg-neutral-950 border-b border-neutral-900/40 px-4 py-2">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-3 font-mono text-[11px] font-medium text-neutral-400">
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setActiveWorkspaceTab("workspace")}
              className={`px-3.5 py-1.5 rounded transition-colors cursor-pointer ${
                activeWorkspaceTab === "workspace"
                  ? "bg-sky-950/50 text-sky-300 border border-sky-900/50 font-bold"
                  : "hover:bg-neutral-900 hover:text-neutral-200"
              }`}
            >
              Design Board & Consultation
            </button>
            <button
              onClick={() => setActiveWorkspaceTab("operations")}
              className={`px-3.5 py-1.5 rounded transition-colors cursor-pointer ${
                activeWorkspaceTab === "operations"
                  ? "bg-sky-950/50 text-sky-300 border border-sky-900/50 font-bold"
                  : "hover:bg-neutral-900 hover:text-neutral-200"
              }`}
            >
              Mission Operations Simulator
            </button>
            <button
              onClick={() => setActiveWorkspaceTab("poster")}
              className={`px-3.5 py-1.5 rounded transition-colors cursor-pointer ${
                activeWorkspaceTab === "poster"
                  ? "bg-sky-950/50 text-sky-300 border border-sky-900/50 font-bold"
                  : "hover:bg-neutral-900 hover:text-neutral-200"
              }`}
            >
              NASA E-Poster Blueprint
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto shrink-0 md:justify-end border-t md:border-t-0 border-neutral-900/60 pt-2 md:pt-0">
            <span className="text-[10px] text-neutral-500 whitespace-nowrap hidden lg:inline mr-1">DOWNLOAD REPORTS (.DOCX):</span>
            <a
              href="/api/download/workings"
              download="SYSTEM_WORKINGS_AND_ARCHITECTURE.docx"
              className="flex items-center gap-1.5 px-3 py-1 bg-sky-950/40 hover:bg-sky-900/40 border border-sky-900/50 hover:border-sky-800/60 text-sky-300 hover:text-sky-200 rounded text-[10.5px] transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-sky-450" /> System Architecture
            </a>
            <a
              href="/api/download/onboarding"
              download="USER_TRAINING_AND_ONBOARDING_GUIDE.docx"
              className="flex items-center gap-1.5 px-3 py-1 bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-900/50 hover:border-emerald-800/60 text-emerald-300 hover:text-emerald-200 rounded text-[10.5px] transition-all"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-450" /> Onboarding Guide
            </a>
          </div>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 pb-20">
        
        {/* TAB 1: MAIN DESIGN BOARD */}
        {activeWorkspaceTab === "workspace" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT SIDEBAR: CUSTOMIZER AND OPTIONS (lg:5) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* CUSTOM NAME */}
              <div className="bg-neutral-900/50 border border-neutral-800 p-4.5 rounded-xl space-y-2">
                <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold font-mono">Prototype Chassis Reference ID</label>
                <input
                  type="text"
                  value={design.name}
                  onChange={(e) => handleDesignChange({ name: e.target.value })}
                  placeholder="E.g., Ranger-IV Core Extractor"
                  className="w-full bg-neutral-950 border border-neutral-850 px-3 py-2 rounded-lg text-xs font-semibold text-neutral-200 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              {/* TARGET PLANET ENVIRONMENT */}
              <div className="bg-neutral-900/50 border border-neutral-800 p-4 rounded-xl space-y-3">
                <h3 className="text-xs font-mono font-semibold tracking-wider text-neutral-400 uppercase flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-sky-400" /> Target Planetary Body
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  {(["Moon", "Mars"] as const).map((env) => {
                    const isSelected = design.environment === env;
                    const det = ENV_DETAILS[env];
                    return (
                      <button
                        key={env}
                        onClick={() => handleDesignChange({ environment: env })}
                        className={`text-left p-3 rounded-lg border cursor-pointer transition-all ${
                          isSelected
                            ? "bg-sky-950/20 border-sky-600/50"
                            : "bg-neutral-950 border-neutral-850/80 hover:border-neutral-700"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold font-display text-neutral-200">{env}</span>
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />}
                        </div>
                        <p className="text-[10px] text-neutral-500 mt-2 font-mono">Temp Range:</p>
                        <p className="text-[9.5px] text-neutral-400 truncate mt-0.5">{det.temperatureRange.split(" (")[0]}</p>
                      </button>
                    );
                  })}
                </div>

                <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-850 text-[11px] leading-relaxed text-neutral-400">
                  <span className="font-semibold text-neutral-300 font-mono uppercase tracking-wide text-[9.5px] block mb-1">
                    Environment Advisory Notice ({design.environment}):
                  </span>
                  {ENV_DETAILS[design.environment].description}
                </div>
              </div>

              {/* ROBOT ARCHETYPE */}
              <div className="bg-neutral-900/50 border border-neutral-800 p-4 rounded-xl space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-mono font-semibold tracking-wider text-neutral-400 uppercase flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-sky-400" /> Robotic Archetype Category
                  </h3>
                  <span className="text-[9px] text-neutral-500 font-mono uppercase">NASA Class A-V</span>
                </div>
                
                <div className="flex flex-col gap-2">
                  {ARCHETYPES.map((arch) => {
                    const isSelected = design.archetype === arch.id;
                    return (
                      <button
                        key={arch.id}
                        onClick={() => handleDesignChange({ archetype: arch.id })}
                        className={`text-left p-2.5 rounded-lg border cursor-pointer transition-all flex flex-col gap-1 ${
                          isSelected
                            ? "bg-sky-950/20 border-sky-600/50 text-neutral-100"
                            : "bg-neutral-950 border-neutral-850/70 hover:border-neutral-800 text-neutral-400"
                        }`}
                      >
                        <div className="flex justify-between items-center w-full">
                          <span className="text-xs font-semibold text-neutral-200">{arch.label}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-sky-400" />}
                        </div>
                        {isSelected && (
                          <div className="mt-1.5 space-y-1.5 text-[10.5px] border-t border-sky-950 pt-1.5 leading-normal text-neutral-400">
                            <p>{arch.description}</p>
                            <p className="text-[9.5px] italic text-neutral-500 font-mono mt-1"><span className="text-sky-300 uppercase not-italic">SME Value:</span> {arch.scientificWeight}</p>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* TECH MOBILITY SYSTEM */}
              <div className="bg-neutral-900/50 border border-neutral-800 p-4 rounded-xl space-y-3">
                <h3 className="text-xs font-mono font-semibold tracking-wider text-neutral-400 uppercase flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-sky-400" /> Terrain Mobility Locomotion
                </h3>
                <div className="flex flex-col gap-2">
                  {MOBILITIES.map((mob) => {
                    const isSelected = design.mobility === mob.id;
                    return (
                      <button
                        key={mob.id}
                        onClick={() => handleDesignChange({ mobility: mob.id })}
                        className={`text-left p-2.5 rounded-lg border cursor-pointer transition-all flex flex-col gap-1 ${
                          isSelected
                            ? "bg-sky-950/20 border-sky-600/50 text-neutral-100"
                            : "bg-neutral-950 border-neutral-850/70 hover:border-neutral-800 text-neutral-400"
                        }`}
                      >
                        <div className="flex justify-between items-center w-full">
                          <span className="text-xs font-semibold text-neutral-200">{mob.label}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-sky-400" />}
                        </div>
                        {isSelected && (
                          <div className="mt-1.5 space-y-1 text-[10.5px] border-t border-sky-950 pt-1.5 leading-normal text-neutral-400">
                            <p>{mob.description}</p>
                            <div className="flex gap-2 text-[9px] font-mono pt-1 text-neutral-500">
                              <span className="text-emerald-500/90 font-bold uppercase">PRO:</span> {mob.pros[0]}
                              <span className="text-rose-500/90 font-bold uppercase ml-1">CON:</span> {mob.cons[0]}
                            </div>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* OFF-WORLD POWER SOURCE */}
              <div className="bg-neutral-900/50 border border-neutral-800 p-4 rounded-xl space-y-3">
                <h3 className="text-xs font-mono font-semibold tracking-wider text-neutral-400 uppercase flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-sky-400" /> Primary Off-World Power Grid
                </h3>
                <div className="flex flex-col gap-2">
                  {POWER_SOURCES.map((pwr) => {
                    const isSelected = design.powerSource === pwr.id;
                    return (
                      <button
                        key={pwr.id}
                        disabled={pwr.id === "In-Situ Methane Combustion Reciprocator" && design.environment === "Moon"}
                        onClick={() => handleDesignChange({ powerSource: pwr.id })}
                        className={`text-left p-2.5 rounded-lg border cursor-pointer transition-all flex flex-col gap-1 disabled:opacity-30 disabled:cursor-not-allowed ${
                          isSelected
                            ? "bg-sky-950/20 border-sky-600/50 text-neutral-100"
                            : "bg-neutral-950 border-neutral-850/70 hover:border-neutral-800 text-neutral-400"
                        }`}
                      >
                        <div className="flex justify-between items-center w-full">
                          <span className="text-xs font-semibold text-neutral-200">{pwr.label}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-sky-400" />}
                        </div>
                        {pwr.id === "In-Situ Methane Combustion Reciprocator" && design.environment === "Moon" && (
                          <span className="text-[8.5px] font-mono text-rose-500 font-bold leading-none mt-1">PHYSICAL LIMITATION: NO SECTOR CO2/SABATIER ATMOSPHERE ON MOON</span>
                        )}
                        {isSelected && (
                          <div className="mt-1.5 space-y-1 text-[10.5px] border-t border-sky-950 pt-1.5 leading-normal text-neutral-400">
                            <p>{pwr.description}</p>
                            <p className="text-[9.5px] italic text-neutral-500 font-mono mt-1"><span className="text-sky-300 uppercase not-italic">Thermodynamics:</span> {pwr.scientificWeight}</p>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* COOPERATIVE COGNITIVE / SYNERGISTIC TEAMING MODE */}
              <div className="bg-neutral-900/50 border border-neutral-800 p-4 rounded-xl space-y-3">
                <h3 className="text-xs font-mono font-semibold tracking-wider text-neutral-400 uppercase flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-400" /> Human-Robot Teaming Protocol
                </h3>
                <div className="flex flex-col gap-2">
                  {TEAMING_MODES.map((mode) => {
                    const isSelected = design.teamingMode === mode;
                    const label = mode.split(":")[0];
                    const desc = mode.split(": ")[1];
                    return (
                      <button
                        key={mode}
                        onClick={() => handleDesignChange({ teamingMode: mode })}
                        className={`text-left p-2.5 rounded-lg border cursor-pointer text-xs transition-all ${
                          isSelected
                            ? "bg-sky-950/20 border-sky-600/50 text-neutral-200"
                            : "bg-neutral-950 border-neutral-850/70 text-neutral-400 hover:border-neutral-800"
                        }`}
                      >
                        <span className="font-semibold text-neutral-300 block">{label}</span>
                        {isSelected && (
                          <span className="text-[10.5px] text-neutral-400 leading-relaxed block mt-1.5 border-t border-sky-950 pt-1.5">
                            {desc}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CORE AI DIRECTIVE PERSONALITY */}
              <div className="bg-neutral-900/50 border border-neutral-800 p-4 rounded-xl space-y-3">
                <h3 className="text-xs font-mono font-semibold tracking-wider text-neutral-400 uppercase flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-sky-400" /> Core AI Personality Directive
                </h3>
                <div className="flex flex-col gap-2">
                  {AI_PERSONALITIES.map((person) => {
                    const isSelected = design.aiPersonality === person;
                    const label = person.split(":")[0];
                    const desc = person.split(": ")[1];
                    return (
                      <button
                        key={person}
                        onClick={() => handleDesignChange({ aiPersonality: person })}
                        className={`text-left p-2.5 rounded-lg border cursor-pointer text-xs transition-all ${
                          isSelected
                            ? "bg-sky-950/20 border-sky-600/50 text-neutral-200"
                            : "bg-neutral-950 border-neutral-850/70 text-neutral-400 hover:border-neutral-800"
                        }`}
                      >
                        <span className="font-semibold text-neutral-300 block">{label}</span>
                        {isSelected && (
                          <span className="text-[10.5px] text-neutral-400 leading-normal block mt-1 pt-1 border-t border-sky-950">
                            {desc}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* RIGHT WORKBENCH PANEL: DIAGNOSTIC BLUEPRINT AND EVALUATION (lg:7) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* STICKY TOP SCHEMATIC PREVIEW HUD */}
              <div className="space-y-2">
                <div className="flex justify-between items-center flex-wrap gap-1">
                  <h3 className="text-xs font-mono font-bold tracking-widest text-sky-400 uppercase flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" /> SYSTEM DIAGNOSTIC SCHEMATIC
                  </h3>
                  <div className="flex gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block self-center animate-ping" />
                    <span className="text-[9px] font-mono text-neutral-500 uppercase">Interactive CAD Vector Mode</span>
                  </div>
                </div>
                
                <RobotCanvas design={design} />
              </div>

              {/* EXPANSION MODULES ACTIVE (TOOLSETS PANEL) */}
              <div className="bg-neutral-900/50 border border-neutral-800 p-4.5 rounded-xl space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-mono font-semibold tracking-wider text-neutral-400 uppercase flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-sky-400" /> Modular Payload Adaptations
                  </h3>
                  <span className="text-[10px] font-mono font-bold text-sky-400">
                    Mated: {design.toolsets?.length || 0}/3 Max
                  </span>
                </div>
                <p className="text-[10.5px] text-neutral-400 leading-relaxed font-sans">
                  Choose up to 3 specialized engineering toolsets to load on mechanical hardpoints. Additional packages require launch-mass shielding upgrades.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
                  {TOOLSET_OPTIONS.map((tool) => {
                    const isMated = design.toolsets?.includes(tool);
                    const nameJoined = tool.split(" (")[0];
                    const functionJoined = tool.split(" (")[1]?.replace(")", "") || "";
                    return (
                      <button
                        key={tool}
                        onClick={() => handleToggleToolset(tool)}
                        className={`text-left p-2.5 rounded-lg border text-xs cursor-pointer transition-all flex flex-col justify-between ${
                          isMated
                            ? "bg-sky-950/30 border-sky-500/50 text-neutral-100"
                            : "bg-neutral-950 border-neutral-850/80 text-neutral-400 hover:border-neutral-800"
                        }`}
                      >
                        <span className="font-semibold text-neutral-200">{nameJoined}</span>
                        <span className="text-[9.5px] text-neutral-500 leading-tight mt-1">{functionJoined}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* MISSION PROJECT LOG NOTEBOOK */}
              <div className="bg-neutral-900/50 border border-neutral-800 p-4.5 rounded-xl space-y-3">
                <h3 className="text-xs font-mono font-semibold tracking-wider text-neutral-400 uppercase flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-neutral-400" /> Intern Design Notes (NASA Communications Copy)
                </h3>
                <textarea
                  value={userConceptNotes}
                  onChange={(e) => setUserConceptNotes(e.target.value)}
                  rows={3}
                  className="w-full bg-neutral-950 border border-neutral-850 rounded-lg p-3 text-xs leading-relaxed text-neutral-300 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  placeholder="Describe your design choices for a general audience. Explain how it integrates human-robot teaming on the surface."
                />
                <p className="text-[10.5px] text-neutral-500 font-sans italic">
                  Note: This narrative description will print directly on your final NASA e-poster format.
                </p>
              </div>

              {/* SCIENTIFIC ASSESSMENT AND AUDIT */}
              <div className="space-y-4">
                <SmeReport 
                  evaluation={evaluation} 
                  loading={evalLoading} 
                  isStale={isEvalStale} 
                  onEvaluate={handleEvaluateDesign}
                  design={design}
                />
                {evalError && (
                  <div className="bg-rose-950/20 border border-rose-900/30 text-rose-300 text-xs p-3.5 rounded-lg flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                    <div>
                      <p className="font-semibold">Local Environment Status Check</p>
                      <p className="mt-0.5 text-neutral-400 text-[11px] leading-relaxed">
                        Failed to compute assessment via real-time satellite query. {evalError}. A general template baseline evaluation has been initialized in your sidebar.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* REAL-TIME CHAT CONSULTATION DOCK */}
              <div className="space-y-1">
                <div className="flex justify-between items-center px-1">
                  <h3 className="text-xs font-mono font-bold tracking-widest text-neutral-500 uppercase flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-sky-400" /> NASA SME LIVE CHAT DESK
                  </h3>
                  <span className="text-[9.5px] font-mono text-emerald-500 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-900/40">Dr. Vance: ONLINE</span>
                </div>
                <SmeConsultation 
                  messages={chatMessages} 
                  loading={chatLoading} 
                  onSendMessage={handleSendChatMessage}
                  design={design}
                />
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: ACTIVE SCENARIO SIMULATOR OUTSIDE ZONE */}
        {activeWorkspaceTab === "operations" && (
          <div className="space-y-6">
            <div className="bg-neutral-900/30 border border-neutral-850 p-4 rounded-xl flex items-start gap-3">
              <Info className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed text-neutral-400">
                <p className="font-semibold text-neutral-300">Phase II Simulation Protocols:</p>
                <p className="mt-1">
                  These scenarios assess how successfully your active custom robotic prototype operates inside off-world distress conditions. Choosing optimal loadouts (such as mounting an <strong>Electrostatic Brush</strong> during Lunar dust storms, or a <strong>Laser Welder</strong> during hull breaching events) yields major success spikes. Failed or mismatched systems will force dangerous and high-stress manual human intervention.
                </p>
              </div>
            </div>

            <ScenarioSimulator design={design} />
          </div>
        )}

        {/* TAB 3: NASA PRINTABLE E-POSTER OUTLINE */}
        {activeWorkspaceTab === "poster" && (
          <div className="space-y-8">
            
            {/* INSTRUCTIONS PANEL */}
            <div className="bg-neutral-950 rounded-xl p-5 border border-neutral-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 non-printing">
              <div className="max-w-xl">
                <h3 className="font-display font-semibold text-sm text-neutral-200">Prepare Outreach NASA e-Poster Portfolio</h3>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  This blueprint poster formatting merges your technical customized load-out vectors, Subject Matter Expert audit logs, and your custom descriptive outreach narrative. Perfect for distributing in outreach schools! Click below to send directly to your local system printer or export clean PDF files.
                </p>
              </div>
              <button
                onClick={handlePrintPoster}
                className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-mono text-xs font-semibold rounded-lg shrink-0 cursor-pointer transition-all flex items-center gap-2 shadow-lg shadow-sky-600/10"
              >
                <Printer className="w-4 h-4" /> Export / Print e-Poster
              </button>
            </div>

            {/* ART CONCEPT ILLUSTRATION OPTION */}
            <div className="bg-neutral-900/40 rounded-xl p-5 border border-neutral-800 space-y-4 non-printing">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h4 className="font-display font-bold text-sm text-neutral-200">Generate Realistic Robot Concept Art</h4>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl">
                Optionally generate a rich, photorealistic planetary portrait of this robot in-situ on the surface. Dr. Vance recommends illustrating the robot during task execution. Leave blank to auto-compile from parameters, or add instructions below.
              </p>
              <div className="flex gap-2 max-w-3xl">
                <input
                  type="text"
                  value={artPromptOverride}
                  onChange={(e) => setArtPromptOverride(e.target.value)}
                  placeholder="E.g., Cinematic close-up shot of the miner drill cutting frozen reddish water ice-core on Mars, cold vapor venting..."
                  className="flex-1 bg-neutral-950 border border-neutral-850 px-3 py-2 text-xs rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-500 text-neutral-300"
                />
                <button
                  onClick={handleGenerateConceptArt}
                  disabled={generatingArt}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-750 text-amber-400 hover:text-amber-300 border border-neutral-700 text-xs font-mono font-bold rounded-lg transition-colors cursor-pointer"
                >
                  {generatingArt ? "Synthesizing..." : "Generate AI Outreach Art"}
                </button>
              </div>
            </div>

            {/* THE ACTUAL POSTER (optimized for both screen viewing and thermal A4 printing) */}
            <div id="nasa-outreach-poster" className="bg-neutral-900 border-4 border-neutral-800 p-8 sm:p-12 rounded-3xl max-w-4xl mx-auto shadow-2xl relative space-y-10 selection:bg-neutral-700">
              
              {/* Outer classic blueprint frames for design accent */}
              <div className="absolute inset-4 border border-sky-900/20 rounded-2xl pointer-events-none" />

              {/* POSTER HEADER */}
              <div className="relative flex flex-col md:flex-row justify-between items-center border-b-2 border-neutral-800 pb-8 gap-6 text-center md:text-left">
                <div className="space-y-1">
                  <span className="px-3 py-1 rounded-full bg-neutral-950 text-[10px] font-mono font-bold tracking-widest text-sky-400 border border-neutral-800">
                    NASA HUMAN ROBOT TEAMING OUTPOST
                  </span>
                  <h2 className="text-3xl font-extrabold font-display tracking-tight text-neutral-100 mt-2.5">
                    {design.name}
                  </h2>
                  <p className="text-xs text-neutral-400 font-mono tracking-wide">
                    SPECIES CONFIGURATION ARCHITECTURE: <span className="text-neutral-200 font-bold uppercase">{design.archetype}</span>
                  </p>
                </div>
                
                <div className="bg-neutral-950 border border-neutral-800 rounded-xl px-5 py-3 text-center md:text-right">
                  <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">DEPLOYMENT SECTOR</p>
                  <p className="text-xl font-bold font-display text-sky-400 tracking-wide mt-1 uppercase">{design.environment}</p>
                  <p className="text-[10px] text-neutral-500 font-mono mt-0.5">EST. OUTPOST COLONY SIZE: ~100 PEOPLE</p>
                </div>
              </div>

              {/* MIDDLE LAYOUT: ILLUSTRATION & SPECS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start relative">
                
                {/* Left col: Image block */}
                <div className="space-y-4">
                  <h3 className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-widest">
                    SYSTEM SCHEMATIC BLUEPRINT
                  </h3>
                  
                  {conceptArtUrl ? (
                    <div className="relative aspect-square w-full rounded-2xl overflow-hidden border-2 border-neutral-800 shadow-xl bg-neutral-950">
                      <img src={conceptArtUrl} alt="Photorealistic concept art of robotic assistant" className="w-full h-full object-cover" />
                      <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 backdrop-blur-sm rounded text-[9px] font-mono text-neutral-400">
                        Synthesized Outreach Visual
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-neutral-950 border border-neutral-850 rounded-2xl">
                      <RobotCanvas design={design} />
                      <p className="text-[10px] font-mono text-neutral-500 text-center mt-3 leading-safe block lg:hidden">
                        Outreach Concept Illustration Vector Schematic
                      </p>
                    </div>
                  )}
                </div>

                {/* Right col: Specs table */}
                <div className="space-y-6">
                  <h3 className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-widest">
                    TECHNICAL PROPULSION & PAYLOAD SPEC SHEET
                  </h3>

                  <div className="divide-y divide-neutral-850 text-xs font-mono">
                    <div className="py-2.5 flex justify-between gap-4">
                      <span className="text-neutral-500 uppercase">Movement Drive:</span>
                      <span className="text-neutral-200 font-semibold text-right">{design.mobility}</span>
                    </div>
                    <div className="py-2.5 flex justify-between gap-4">
                      <span className="text-neutral-500 uppercase">Energy Grid:</span>
                      <span className="text-neutral-200 font-semibold text-right">{design.powerSource}</span>
                    </div>
                    <div className="py-2.5 flex justify-between gap-4">
                      <span className="text-neutral-500 uppercase">Coordination:</span>
                      <span className="text-neutral-200 font-semibold text-right">{design.teamingMode.split(":")[0]}</span>
                    </div>
                    <div className="py-2.5 flex justify-between gap-4">
                      <span className="text-neutral-500 uppercase">Cognitive Profile:</span>
                      <span className="text-neutral-200 font-semibold text-right">{design.aiPersonality.split(":")[0]}</span>
                    </div>
                    <div className="py-2.5 flex flex-col gap-1.5 align-start">
                      <span className="text-neutral-500 uppercase block">Active Auxiliary Hardware:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {design.toolsets?.map((t, idx) => (
                          <span key={idx} className="bg-neutral-950 border border-neutral-850 text-[10.5px] px-2 py-0.5 rounded text-neutral-300 font-sans font-medium">
                            {t.split(" (")[0]}
                          </span>
                        )) || <span className="text-neutral-600">None equipped</span>}
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* OUTREACH NARRATIVE WRITTEN STATEMENT */}
              <div className="border-t border-neutral-800 pt-8 space-y-3">
                <h3 className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-widest">
                  FUNCTIONAL DESCRIPTION & STRATEGIC COLONY VALUE
                </h3>
                <p className="text-sm leading-relaxed text-neutral-300 font-sans whitespace-pre-line bg-neutral-950 p-5 rounded-2xl border border-neutral-850">
                  {userConceptNotes || "Drafting functional narrative..."}
                </p>
              </div>

              {/* EVALUATION SNIPPET CORES */}
              {evaluation && (
                <div className="border-t border-neutral-800 pt-8 space-y-4">
                  <h3 className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-widest">
                    NASA SME AUDIT STATUS OUTCOME
                  </h3>
                  <div className="bg-neutral-950 border border-neutral-850 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-neutral-400 font-sans leading-relaxed max-w-xl">
                      <strong>General Advisory:</strong> {evaluation.generalEvaluation.substring(0, 300)}...
                    </p>
                    <div className="text-center font-mono shrink-0 bg-neutral-900 border border-neutral-800 px-4 py-2.5 rounded-xl">
                      <p className="text-[10px] text-neutral-400 uppercase">Audit Verdict</p>
                      <p className="text-xl font-bold text-emerald-400 mt-1">{evaluation.score} / 100</p>
                      <p className="text-[9px] text-neutral-500 tracking-wider">AERO RATED</p>
                    </div>
                  </div>
                </div>
              )}

              {/* POSTER FOOTER SIGNATURES */}
              <div className="border-t border-neutral-800 pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-neutral-500 gap-4 text-center sm:text-left">
                <div>
                  <p>DEVELOPED BY: SPACE HABITAT ROBOTICS INTERNSHIP PROGRAM</p>
                  <p className="mt-0.5">SME SUPERVISION: NASA OUTPOST ENGINEERING DESK</p>
                </div>
                <div className="text-center sm:text-right shrink-0">
                  <p>AERO-STANDARDS BLUEPRINT CODED IN LUNAR-STABLE REACT</p>
                  <p className="mt-0.5">RESTRICTIVE PHYSICS METRIC LEVEL: STRICT VERIFIED</p>
                </div>
              </div>

            </div>

          </div>
        )}

      </main>
    </div>
  );
}
