import React from "react";
import { RobotDesign } from "../types";

interface RobotCanvasProps {
  design: RobotDesign;
}

export default function RobotCanvas({ design }: RobotCanvasProps) {
  const isMars = design.environment === "Mars";

  // Visual cues based on choices
  const getArchetypeColor = (): string => {
    switch (design.archetype) {
      case "Companion & Health Monitor":
        return "#38bdf8"; // cyan
      case "Agricultural Bio-Assistant":
        return "#4ade80"; // green
      case "Autonomous Subsurface Miner":
        return "#f59e0b"; // amber
      case "Extra-vehicular Surface Explorer":
        return "#a855f7"; // purple
      case "Habitat Automation & Monitoring System":
        return "#ef4444"; // red
      default:
        return "#94a3b8"; // slate
    }
  };

  const archColor = getArchetypeColor();

  return (
    <div className="relative w-full aspect-video bg-neutral-950 rounded-xl overflow-hidden border border-neutral-800 flex flex-col justify-between p-4 bg-radial from-neutral-900 via-neutral-950 to-black">
      {/* Background atmospheric gradient */}
      <div 
        className={`absolute inset-0 opacity-10 transition-colors duration-700 pointer-events-none ${
          isMars ? "bg-orange-800" : "bg-sky-900"
        }`} 
      />

      {/* Grid Pattern overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

      {/* Header and HUD Info info */}
      <div className="relative z-10 flex justify-between items-start text-xs font-mono">
        <div>
          <p className="text-[10px] text-neutral-500 uppercase tracking-widest">AeroSpace CAD & Diagnostics</p>
          <h4 className="text-sm font-semibold text-neutral-200 mt-0.5 tracking-tight font-display">
            {design.name || "UNNAMED_PROTOTYPE_v1.0"}
          </h4>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">
            Deployed Environment: <span className={isMars ? "text-orange-400 glow-text-amber" : "text-sky-300 glow-text-cyan"}>{design.environment.toUpperCase()}</span>
          </p>
          <p className="text-[9px] text-neutral-500 mt-0.5">GRAVITY: {isMars ? "0.375g" : "0.166g"} | ATM: {isMars ? "Thin CO2" : "Vacuum"}</p>
        </div>
      </div>

      {/* Core SVG Canvas Illustration */}
      <div className="relative w-full h-44 flex items-center justify-center pointer-events-none">
        <svg viewBox="0 0 400 200" className="w-full h-full max-w-sm drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          {/* Surface Horizon and Dust Storm lines */}
          <path 
            d="M 10 170 Q 200 160 390 170" 
            stroke={isMars ? "rgba(234, 88, 12, 0.4)" : "rgba(148, 163, 184, 0.4)"} 
            strokeWidth="2" 
            fill="none" 
            strokeDasharray={isMars ? "none" : "3,3"}
          />
          
          {/* Surface Dust effects dynamically */}
          {isMars ? (
            <g opacity="0.4" className="animate-pulse">
              <circle cx="80" cy="165" r="15" fill="rgba(234,88,12,0.1)" />
              <circle cx="310" cy="168" r="12" fill="rgba(234,88,12,0.1)" />
              <path d="M 200 165 C 220 160, 240 168, 270 163" stroke="rgba(234,88,12,0.15)" strokeWidth="6" fill="none" />
            </g>
          ) : (
            <g opacity="0.3">
              <circle cx="120" cy="167" r="4" fill="rgba(148, 163, 184, 0.2)" />
              <circle cx="280" cy="166" r="6" fill="rgba(148, 163, 184, 0.2)" />
            </g>
          )}

          {/* Gantry structure behind the robot if Ceiling Rail is chosen */}
          {design.mobility === "Precision Ceiling Gantry Rail" && (
            <g>
              <line x1="20" y1="30" x2="380" y2="30" stroke="#475569" strokeWidth="4" />
              <line x1="200" y1="30" x2="200" y2="70" stroke="#64748b" strokeWidth="3" strokeDasharray="4,2" />
              <rect x="185" y="65" width="30" height="15" rx="2" fill="#334155" />
            </g>
          )}

          {/* BACKGROUND DECAY / RTG GLOW (Draw behind core robot chassis) */}
          {design.powerSource === "Radioisotope Thermoelectric Generator (RTG)" && (
            <g className="animate-pulse">
              <circle cx="200" cy="100" r="38" fill="rgba(239, 68, 68, 0.08)" />
              <circle cx="200" cy="100" r="22" fill="rgba(239, 68, 68, 0.05)" />
            </g>
          )}

          {/* SOLAR PANELS */}
          {design.powerSource === "Solar Arrays & Regenerative Fuel Cells" && (
            <g>
              {/* Left Solar Panel block */}
              <polygon points="120,80 150,75 150,110 120,105" fill="#1e1b4b" stroke="#312e81" strokeWidth="1.5" />
              <line x1="120" y1="92" x2="150" y2="92" stroke="#4f46e5" strokeWidth="1" />
              <line x1="135" y1="77" x2="135" y2="107" stroke="#4f46e5" strokeWidth="1" />
              <line x1="150" y1="92" x2="175" y2="95" stroke="#94a3b8" strokeWidth="1.5" />
              
              {/* Right Solar Panel block */}
              <polygon points="280,80 250,75 250,110 280,105" fill="#1e1b4b" stroke="#312e81" strokeWidth="1.5" />
              <line x1="280" y1="92" x2="250" y2="92" stroke="#4f46e5" strokeWidth="1" />
              <line x1="265" y1="77" x2="265" y2="107" stroke="#4f46e5" strokeWidth="1" />
              <line x1="250" y1="92" x2="225" y2="95" stroke="#94a3b8" strokeWidth="1.5" />
            </g>
          )}

          {/* MAIN CHASSIS / FRAME WORK */}
          <rect x="175" y="80" width="50" height="40" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="2.5" />
          {/* Core glow sensor based on archetype */}
          <circle cx="200" cy="100" r="10" fill={archColor} fillOpacity="0.15" />
          <rect x="190" y="93" width="20" height="14" rx="2" fill="#0f172a" stroke={archColor} strokeWidth="1.5" />
          <circle cx="200" cy="100" r="3" fill={archColor} className="animate-ping" />

          {/* HEAD MODULE & SENSORS */}
          <line x1="200" y1="80" x2="200" y2="65" stroke="#475569" strokeWidth="3" />
          <rect x="188" y="52" width="24" height="14" rx="3" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
          
          {/* Eyes/LiDAR line scanner */}
          <rect x="192" y="56" width="16" height="4" rx="1" fill="#0f172a" />
          <circle cx="196" cy="58" r="2" fill={archColor} />
          {design.toolsets?.includes("Multi-Spectral LiDAR Array (3D topographic mapping)") && (
            <line x1="200" y1="58" x2="230" y2="58" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="2,2" className="animate-pulse" />
          )}

          {/* POWER SYSTEM OVERLAYS */}
          {design.powerSource === "Radioisotope Thermoelectric Generator (RTG)" && (
            <g>
              {/* Back metal heatsink cooling fins */}
              <line x1="168" y1="85" x2="175" y2="85" stroke="#ef4444" strokeWidth="3" />
              <line x1="168" y1="95" x2="175" y2="95" stroke="#ef4444" strokeWidth="3" />
              <line x1="168" y1="105" x2="175" y2="105" stroke="#ef4444" strokeWidth="3" />
              <rect x="156" y="80" width="12" height="32" rx="1" fill="#e2e8f0" stroke="#94a3b8" />
              {/* Radioactive core warning sticker in grey */}
              <circle cx="162" cy="96" r="3" fill="#f59e0b" />
            </g>
          )}

          {/* LI-ION BATTERY PACK */}
          {design.powerSource === "Solid-State Sodium-Ion Batteries" && (
            <g>
              <rect x="190" y="110" width="20" height="8" rx="1" fill="#475569" />
              <line x1="195" y1="114" x2="205" y2="114" stroke="#e11d48" strokeWidth="1" />
            </g>
          )}

          {/* METHANE ENGINE */}
          {design.powerSource === "In-Situ Methane Combustion Reciprocator" && (
            <g>
              <polygon points="175,90 162,85 162,105 175,100" fill="#334155" stroke="#475569" strokeWidth="1" />
              <line x1="160" y1="95" x2="150" y2="95" stroke="#f59e0b" strokeWidth="1.5" className="animate-pulse" />
            </g>
          )}

          {/* ACTIVE TOOLSETS MOUNTED */}
          {/* Drill Attachment */}
          {design.toolsets?.includes("Abrasive-Resistant Planetary Drill (coring ice/rock)") && (
            <g>
              <line x1="225" y1="110" x2="250" y2="130" stroke="#cbd5e1" strokeWidth="2.5" />
              <polygon points="250,130 246,124 254,124" fill="#64748b" transform="rotate(45, 250, 130)" />
              <path d="M 235 118 Q 238 125, 244 122" stroke="#475569" strokeWidth="1" fill="none" />
            </g>
          )}

          {/* Soft-Claw Manipulator */}
          {design.toolsets?.includes("Soft-Claw Anthropomorphic Manipulators (delicate plant care)") && (
            <g>
              <line x1="225" y1="95" x2="255" y2="95" stroke="#94a3b8" strokeWidth="2" />
              {/* Fingers claw */}
              <path d="M 255 90 Q 262 95 255 100" stroke="#f43f5e" strokeWidth="1.5" fill="none" />
              <path d="M 255 93 Q 260 95 255 97" stroke="#f43f5e" strokeWidth="1.5" fill="none" />
              <circle cx="255" cy="95" r="2" fill="#e11d48" />
            </g>
          )}

          {/* Laser Welder */}
          {design.toolsets?.includes("High-Temp Laser Welding Plasma Jet (seal fusing)") && (
            <g>
              <line x1="225" y1="105" x2="250" y2="105" stroke="#475569" strokeWidth="3" />
              <rect x="250" y="101" width="8" height="8" rx="1" fill="#ef4444" />
              <polygon points="258,105 275,103 275,107" fill="#22d3ee" className="animate-pulse" />
            </g>
          )}

          {/* Gas Chromatograph / Soil sampler */}
          {design.toolsets?.includes("Soil Gas Chromatograph (perchlorates & organics detector)") && (
            <g>
              <line x1="210" y1="120" x2="215" y2="150" stroke="#64748b" strokeWidth="2" />
              <rect x="210" y="145" width="10" height="10" rx="1" fill="#475569" />
              <line x1="215" y1="145" x2="215" y2="153" stroke="#22c55e" strokeWidth="1" />
            </g>
          )}

          {/* Dust brush */}
          {design.toolsets?.includes("Active Dust Ingress Brush & Electrostatic Deflectors") && (
            <g>
              <line x1="175" y1="112" x2="155" y2="135" stroke="#94a3b8" strokeWidth="2" />
              <path d="M 155 135 C 150 140, 160 145, 150 148" stroke="#38bdf8" strokeWidth="1" fill="none" strokeDasharray="1,1" />
              <circle cx="152" cy="138" r="4" fill="#0284c7" fillOpacity="0.4" />
            </g>
          )}

          {/* MOBILITY SYSTEM (Drawn on the bottom of chassis) */}
          <g>
            {/* 1. Tracks */}
            {design.mobility === "Heavy-Duty Track System" && (
              <g>
                <rect x="160" y="142" width="80" height="18" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                <circle cx="170" cy="151" r="6" fill="#475569" />
                <circle cx="185" cy="151" r="6" fill="#475569" />
                <circle cx="200" cy="151" r="6" fill="#475569" />
                <circle cx="215" cy="151" r="6" fill="#475569" />
                <circle cx="230" cy="151" r="6" fill="#475569" />
                <line x1="160" y1="142" x2="240" y2="142" stroke="#0f172a" strokeWidth="1.5" />
                <line x1="160" y1="160" x2="240" y2="160" stroke="#0f172a" strokeWidth="1.5" />
              </g>
            )}

            {/* 2. Rocker Bogie 6-Wheel */}
            {design.mobility === "Rocker-Bogie 6-Wheel Suspension" && (
              <g>
                {/* Joints bars */}
                <path d="M 200 120 L 175 145 M 200 120 L 225 140 L 235 155" stroke="#475569" strokeWidth="3" fill="none" />
                <path d="M 175 145 L 160 155 L 155 160" stroke="#475569" strokeWidth="2.5" fill="none" />
                
                {/* Wheels */}
                <circle cx="155" cy="158" r="8" fill="#334155" stroke="#64748b" strokeWidth="1" />
                <circle cx="180" cy="158" r="8" fill="#334155" stroke="#64748b" strokeWidth="1" />
                <circle cx="235" cy="158" r="8" fill="#334155" stroke="#64748b" strokeWidth="1" />
                
                {/* Redundant center hubs */}
                <circle cx="155" cy="158" r="2" fill="#f59e0b" />
                <circle cx="180" cy="158" r="2" fill="#f59e0b" />
                <circle cx="235" cy="158" r="2" fill="#f59e0b" />
              </g>
            )}

            {/* 3. Quadrupedal legs */}
            {design.mobility === "Quadrupedal Robotic Limbs" && (
              <g>
                {/* Leg 1 */}
                <path d="M 180 120 Q 165 140 160 160" stroke="#475569" strokeWidth="3" fill="none" />
                <circle cx="160" cy="160" r="4" fill="#0f172a" stroke="#64748b" strokeWidth="1" />
                
                {/* Leg 2 */}
                <path d="M 190 120 Q 185 142 192 161" stroke="#475569" strokeWidth="3" fill="none" />
                <circle cx="192" cy="161" r="4" fill="#0f172a" stroke="#64748b" strokeWidth="1" />

                {/* Leg 3 */}
                <path d="M 210 120 Q 215 142 208 161" stroke="#334155" strokeWidth="3" fill="none" opacity="0.8" />
                <circle cx="208" cy="161" r="4" fill="#0f172a" stroke="#475569" strokeWidth="1" opacity="0.8" />

                {/* Leg 4 */}
                <path d="M 220 120 Q 235 140 240 160" stroke="#475569" strokeWidth="3" fill="none" />
                <circle cx="240" cy="160" r="4" fill="#0f172a" stroke="#64748b" strokeWidth="1" />
              </g>
            )}

            {/* 4. Ceiling rail rollers (hangs down) */}
            {design.mobility === "Precision Ceiling Gantry Rail" && (
              <g>
                <line x1="200" y1="70" x2="200" y2="80" stroke="#38bdf8" strokeWidth="4" />
                {/* Sliding lock collar */}
                <rect x="194" y="70" width="12" height="6" fill="#0284c7" />
              </g>
            )}

            {/* 5. Bipedal walker profile */}
            {design.mobility === "Bipedal Humanoid Locomotion" && (
              <g>
                {/* Left Hip & knee & foot */}
                <path d="M 190 120 L 185 142 L 180 160 L 174 161" stroke="#475569" strokeWidth="3.5" fill="none" />
                <circle cx="185" cy="142" r="3" fill="#64748b" />
                
                {/* Right Hip & knee & foot */}
                <path d="M 210 120 L 215 142 L 220 160 L 226 161" stroke="#475569" strokeWidth="3.5" fill="none" />
                <circle cx="215" cy="142" r="3" fill="#64748b" />
              </g>
            )}
          </g>
        </svg>
      </div>

      {/* Footer / Realtime Diagnostic Telemetry */}
      <div className="relative z-10 flex justify-between items-center bg-neutral-900/60 backdrop-blur-sm px-3 py-2 rounded-lg border border-neutral-800 text-[10px] font-mono text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="uppercase tracking-wide font-medium">{design.archetype}</span>
        </div>
        <div className="flex items-center gap-4">
          <p>PWR: <span className="text-amber-400">NOMINAL</span></p>
          <p className="hidden xs:block">COMMS: <span className="text-emerald-400">LINK: 98.4%</span></p>
          <p>THERMAL: <span className="text-sky-400">STABLE</span></p>
        </div>
      </div>
    </div>
  );
}
