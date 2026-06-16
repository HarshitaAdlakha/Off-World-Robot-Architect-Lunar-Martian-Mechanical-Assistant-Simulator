import React, { useState } from "react";
import { SmeEvaluation, RobotDesign } from "../types";
import { ShieldAlert, Cpu, Sparkles, CheckCircle, RefreshCcw } from "lucide-react";

interface SmeReportProps {
  evaluation: SmeEvaluation | null;
  loading: boolean;
  isStale: boolean;
  onEvaluate: () => void;
  design: RobotDesign;
}

export default function SmeReport({ evaluation, loading, isStale, onEvaluate, design }: SmeReportProps) {
  const [activeTab, setActiveTab] = useState<"general" | "dust" | "thermal" | "power" | "teaming">("general");

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-neutral-900/40 rounded-xl border border-neutral-800 p-8 text-center">
        <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mb-4" />
        <h3 className="font-display font-semibold text-lg text-neutral-100">Consulting NASA Subject Matter Expert...</h3>
        <p className="text-sm text-neutral-400 mt-2 max-w-sm">
          Gemini is running advanced thermophysical, dust abrasion, and crew safety simulations on your robot layout.
        </p>
      </div>
    );
  }

  if (!evaluation) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-neutral-900/40 rounded-xl border border-neutral-850 p-8 text-center">
        <Sparkles className="w-10 h-10 text-sky-400 mb-3 animate-pulse" />
        <h3 className="font-display font-semibold text-lg text-neutral-100">Design Draft Completed</h3>
        <p className="text-sm text-neutral-400 mt-1 max-w-md">
          Ready to submit your mechanical assistant blueprint to the NASA Subject Matter Expert desk? Run the scientific simulation below.
        </p>
        <button
          onClick={onEvaluate}
          className="mt-5 px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer flex items-center gap-2 shadow-lg shadow-sky-600/10"
        >
          <Cpu className="w-4 h-4" />
          Initiate Engineering Assessment
        </button>
      </div>
    );
  }

  // Helper inside to color code ratings
  const getRatingBadge = (rating: string) => {
    const cleanRating = rating.trim().substring(0, 1).toUpperCase();
    switch (cleanRating) {
      case "A":
        return <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">CLASS A</span>;
      case "B":
        return <span className="px-2 py-0.5 rounded text-xs font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">CLASS B</span>;
      case "C":
        return <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-950 text-amber-300 border border-amber-800">CLASS C</span>;
      case "D":
        return <span className="px-2 py-0.5 rounded text-xs font-bold bg-orange-950 text-orange-300 border border-orange-800">CLASS D</span>;
      case "F":
        return <span className="px-2 py-0.5 rounded text-xs font-bold bg-rose-950 text-rose-300 border border-rose-800">CRITICAL F</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-xs font-bold bg-neutral-800 text-neutral-300">{rating}</span>;
    }
  };

  // Helper for radial score circle colors
  const getScoreColor = () => {
    if (evaluation.score >= 85) return "text-emerald-400";
    if (evaluation.score >= 70) return "text-cyan-400";
    if (evaluation.score >= 55) return "text-amber-400";
    return "text-rose-400";
  };

  return (
    <div className="bg-neutral-900/60 rounded-xl border border-neutral-800 p-5 relative overflow-hidden flex flex-col gap-6">
      {/* Background shadow glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 blur-3xl rounded-full" />

      {/* Main Top Header and Score Block */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-neutral-800">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h3 className="font-display font-bold text-lg text-neutral-100 flex items-center gap-2">
              NASA Qualification Audit
            </h3>
            {isStale && (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-400 border border-amber-800/60 animate-pulse flex items-center gap-1">
                <ShieldAlert className="w-2.5 h-2.5" /> RE-EVALUATION ADVISED
              </span>
            )}
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Official technical viability critique centered on actual off-world physics & space mechanics.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-neutral-950 px-4 py-2.5 rounded-xl border border-neutral-800">
          <div className="relative flex items-center justify-center">
            {/* SVG circle meter */}
            <svg className="w-14 h-14 transform -rotate-90">
              <circle
                cx="28"
                cy="28"
                r="24"
                stroke="#1f2937"
                strokeWidth="4.5"
                fill="transparent"
              />
              <circle
                cx="28"
                cy="28"
                r="24"
                stroke="currentColor"
                strokeWidth="4.5"
                fill="transparent"
                strokeDasharray={150.7}
                strokeDashoffset={150.7 - (150.7 * Math.min(evaluation.score, 100)) / 100}
                className={getScoreColor()}
              />
            </svg>
            <span className="absolute text-sm font-bold font-mono text-neutral-100">
              {evaluation.score}
            </span>
          </div>
          <div>
            <p className="text-[10px] text-neutral-500 font-mono font-semibold uppercase tracking-wider">Viability Score</p>
            <h4 className="text-xs font-bold text-neutral-300 mt-0.5">
              {evaluation.score >= 85 ? "FLIGHT READY" : evaluation.score >= 70 ? "QUALIFIED WITH PROVISO" : evaluation.score >= 50 ? "RE-ENGINEERING NEEDED" : "UNSATISFACTORY"}
            </h4>
          </div>
        </div>
      </div>

      {/* Tabs list for technical matrices */}
      <div className="flex flex-wrap gap-1 bg-neutral-950 p-1.5 rounded-lg border border-neutral-800/80">
        <button
          onClick={() => setActiveTab("general")}
          className={`flex-1 min-w-[80px] py-1.5 px-3 rounded text-xs font-medium transition-all cursor-pointer ${
            activeTab === "general"
              ? "bg-neutral-800 text-white shadow-sm"
              : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("dust")}
          className={`flex-1 min-w-[80px] py-1.5 px-3 rounded text-xs font-medium transition-all cursor-pointer ${
            activeTab === "dust"
              ? "bg-neutral-800 text-white shadow-sm"
              : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          Dust/Regolith
        </button>
        <button
          onClick={() => setActiveTab("thermal")}
          className={`flex-1 min-w-[80px] py-1.5 px-3 rounded text-xs font-medium transition-all cursor-pointer ${
            activeTab === "thermal"
              ? "bg-neutral-800 text-white shadow-sm"
              : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          Thermal
        </button>
        <button
          onClick={() => setActiveTab("power")}
          className={`flex-1 min-w-[80px] py-1.5 px-3 rounded text-xs font-medium transition-all cursor-pointer ${
            activeTab === "power"
              ? "bg-neutral-800 text-white shadow-sm"
              : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          Power Efficiency
        </button>
        <button
          onClick={() => setActiveTab("teaming")}
          className={`flex-1 min-w-[80px] py-1.5 px-3 rounded text-xs font-medium transition-all cursor-pointer ${
            activeTab === "teaming"
              ? "bg-neutral-800 text-white shadow-sm"
              : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          Crew Teaming
        </button>
      </div>

      {/* Tab Contents */}
      <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-850 min-h-[160px] flex flex-col justify-between">
        {activeTab === "general" && (
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold tracking-wider text-sky-400 uppercase">
              NASA Subject Matter Expert Assessment Summary
            </h4>
            <p className="text-xs leading-relaxed text-neutral-300 font-sans whitespace-pre-line">
              {evaluation.generalEvaluation}
            </p>
          </div>
        )}

        {activeTab === "dust" && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-mono font-semibold tracking-wider text-sky-400 uppercase">
                Dust Mitigation & Seals Checklist
              </h4>
              {getRatingBadge(evaluation.dustResilience?.rating || "C")}
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              <strong>SME Critique:</strong> {evaluation.dustResilience?.critique}
            </p>
            <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-lg p-2.5 mt-2">
              <p className="text-[11px] text-sky-300 font-mono uppercase tracking-wide">Standard Mitigation Protocol Directive</p>
              <p className="text-xs text-neutral-400 mt-1">{evaluation.dustResilience?.mitigationTips}</p>
            </div>
          </div>
        )}

        {activeTab === "thermal" && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-mono font-semibold tracking-wider text-sky-400 uppercase">
                Thermal & Radiation Stress Capacity
              </h4>
              {getRatingBadge(evaluation.thermalResilience?.rating || "C")}
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              <strong>SME Critique:</strong> {evaluation.thermalResilience?.critique}
            </p>
            <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-lg p-2.5 mt-2">
              <p className="text-[11px] text-sky-300 font-mono uppercase tracking-wide">Standard Thermal Design Directive</p>
              <p className="text-xs text-neutral-400 mt-1">{evaluation.thermalResilience?.mitigationTips}</p>
            </div>
          </div>
        )}

        {activeTab === "power" && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-mono font-semibold tracking-wider text-sky-400 uppercase">
                Power Cycle & Battery Mass Efficiency
              </h4>
              {getRatingBadge(evaluation.powerEfficiency?.rating || "C")}
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              <strong>SME Critique:</strong> {evaluation.powerEfficiency?.critique}
            </p>
            <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-lg p-2.5 mt-2">
              <p className="text-[11px] text-sky-300 font-mono uppercase tracking-wide">Power Grid Safety Instruction</p>
              <p className="text-xs text-neutral-400 mt-1">{evaluation.powerEfficiency?.mitigationTips}</p>
            </div>
          </div>
        )}

        {activeTab === "teaming" && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-mono font-semibold tracking-wider text-sky-400 uppercase">
                Human-Robot Symbiosis & Cognitive Load
              </h4>
              {getRatingBadge(evaluation.humanTeamingViability?.rating || "C")}
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              <strong>SME Critique:</strong> {evaluation.humanTeamingViability?.critique}
            </p>
            <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-lg p-2.5 mt-2">
              <p className="text-[11px] text-sky-300 font-mono uppercase tracking-wide">Safe Ergonomics Recommendation</p>
              <p className="text-xs text-neutral-400 mt-1">{evaluation.humanTeamingViability?.mitigationTips}</p>
            </div>
          </div>
        )}
      </div>

      {/* Upgrades panel (Phase 2 directives) */}
      <div className="flex flex-col gap-3">
        <h4 className="text-xs font-mono font-semibold text-sky-400 uppercase tracking-widest flex items-center gap-1.5">
          <CheckCircle className="w-3.5 h-3.5" /> Required Phase II Engineering Directives
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {evaluation.upgrades?.map((upgrade, index) => (
            <div
              key={index}
              className="bg-neutral-950 p-3 rounded-lg border border-neutral-800 flex items-start gap-2.5"
            >
              <div className="w-5 h-5 rounded-full bg-sky-950/80 border border-sky-800/50 flex items-center justify-center font-mono text-[10px] font-bold text-sky-400 shrink-0 mt-0.5">
                0{index + 1}
              </div>
              <p className="text-xs text-neutral-300 leading-normal">{upgrade}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick feedback/re-trigger floating actions */}
      {isStale && (
        <div className="flex justify-end mt-2">
          <button
            onClick={onEvaluate}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-medium cursor-pointer transition-colors flex items-center gap-1.5 shadow-md shadow-sky-600/10"
          >
            <RefreshCcw className="w-3 h-3" /> Re-Assess Blueprint
          </button>
        </div>
      )}
    </div>
  );
}
