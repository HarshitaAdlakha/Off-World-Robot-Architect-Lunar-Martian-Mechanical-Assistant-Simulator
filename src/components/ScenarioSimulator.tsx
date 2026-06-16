import React, { useState } from "react";
import { RobotDesign, SimulationScenario, SimulationStep } from "../types";
import { SCENARIOS } from "../data";
import { Shield, Hammer, AlertTriangle, Play, CheckCircle2, ChevronRight, RefreshCw, XCircle } from "lucide-react";

interface ScenarioSimulatorProps {
  design: RobotDesign;
}

export default function ScenarioSimulator({ design }: ScenarioSimulatorProps) {
  const [activeScenario, setActiveScenario] = useState<SimulationScenario | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [successScore, setSuccessScore] = useState(50); // scales from 0 to 100
  const [simResults, setSimResults] = useState<{
    status: "SUCCESS" | "FAILED";
    percentageLog: number;
    summary: string;
  } | null>(null);

  // Active step state tracking
  const [stepOutcome, setStepOutcome] = useState<{
    text: string;
    isSuccess: boolean;
    points: number;
  } | null>(null);

  const startScenario = (sc: SimulationScenario) => {
    setActiveScenario(sc);
    setStepIndex(0);
    setSuccessScore(50);
    setStepOutcome(null);
    setSimResults(null);
  };

  const handleSelectOption = (option: any) => {
    // Audit if requirements are met
    let met = true;
    if (option.requiredArchetype && design.archetype !== option.requiredArchetype) met = false;
    if (option.requiredPower && design.powerSource !== option.requiredPower) met = false;
    if (option.requiredMobility && design.mobility !== option.requiredMobility) met = false;
    if (option.requiredToolset && !design.toolsets?.includes(option.requiredToolset)) met = false;

    const outcomeText = met ? option.outcomeSuccess : option.outcomeFailure;
    const finalScoreChange = met ? option.scoreMod : -20; // major fine if failed requirements

    const newScore = Math.max(0, Math.min(100, successScore + finalScoreChange));
    setSuccessScore(newScore);

    setStepOutcome({
      text: outcomeText,
      isSuccess: met,
      points: finalScoreChange,
    });
  };

  const handleNextStep = () => {
    if (!activeScenario) return;
    setStepOutcome(null);

    if (stepIndex + 1 < activeScenario.steps.length) {
      setStepIndex(stepIndex + 1);
    } else {
      // End simulation
      const passed = successScore >= 60;
      let summaryText = "";
      if (passed) {
        summaryText = `MISSION SUCCESS: Your mechanical assistant '${design.name}' successfully integrated with human teammates under off-world conditions. Highly stable thermal and payload buffers saved habitat life support networks and structural integrity under critical strain!`;
      } else {
        summaryText = `MISSION FAILED: Fatal design oversights locked the team's capacity to resolve anomalies. Extreme cold dust ingress or power loss caused mechanical freezeouts before the breach could be mitigated. Re-engineering advises immediate upgrade reviews.`;
      }

      setSimResults({
        status: passed ? "SUCCESS" : "FAILED",
        percentageLog: successScore,
        summary: summaryText,
      });
    }
  };

  const quitSimulation = () => {
    setActiveScenario(null);
    setStepOutcome(null);
    setSimResults(null);
  };

  // Helper inside to evaluate if user meets requirements before they click
  const checkRequirementsMet = (option: any) => {
    if (option.requiredArchetype && design.archetype !== option.requiredArchetype) return false;
    if (option.requiredPower && design.powerSource !== option.requiredPower) return false;
    if (option.requiredMobility && design.mobility !== option.requiredMobility) return false;
    if (option.requiredToolset && !design.toolsets?.includes(option.requiredToolset)) return false;
    return true;
  };

  return (
    <div className="bg-neutral-900/60 rounded-xl border border-neutral-800 p-5 flex flex-col gap-6">
      <div className="border-b border-neutral-850 pb-4">
        <h3 className="font-display font-bold text-lg text-neutral-100 flex items-center gap-2">
          <Shield className="w-5 h-5 text-sky-500" /> Off-World Mission Operations Center
        </h3>
        <p className="text-xs text-neutral-400 mt-1">
          Stress-test your robot's engineering layout against random emergencies in planetary outposts.
        </p>
      </div>

      {!activeScenario ? (
        // Scenario Selection Deck
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SCENARIOS.map((sc) => (
            <div
              key={sc.id}
              className="bg-neutral-950 rounded-xl border border-neutral-850 p-4 hover:border-neutral-750 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className={`px-2 py-0.5 rounded text-[9.5px] font-bold ${
                    sc.location === "Mars" ? "bg-orange-955 text-orange-400 border border-orange-900" : "bg-sky-955 text-sky-300 border border-sky-900"
                  }`}>
                    {sc.location.toUpperCase()}
                  </span>
                  <span className={`text-[10px] uppercase font-bold flex items-center gap-1 font-mono ${
                    sc.riskLevel === "Critical" ? "text-rose-400" : sc.riskLevel === "Severe" ? "text-orange-400" : "text-amber-400"
                  }`}>
                    <AlertTriangle className="w-3 h-3" /> {sc.riskLevel}
                  </span>
                </div>
                <h4 className="font-display font-semibold text-neutral-200 text-sm mt-1">{sc.title}</h4>
                <p className="text-[11.5px] leading-relaxed text-neutral-400 font-sans">{sc.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-900 flex flex-col gap-3">
                <p className="text-[10px] text-neutral-500 font-mono italic">Goal: {sc.successCriteria}</p>
                <button
                  onClick={() => startScenario(sc)}
                  className="w-full py-1.5 bg-neutral-900 hover:bg-neutral-855 text-sky-400 text-xs font-mono font-semibold rounded border border-sky-900/30 hover:border-sky-500/30 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Play className="w-3 h-3" /> Initiate Operations Simulation
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Active Simulation Display Screen
        <div className="bg-neutral-950 rounded-xl border border-neutral-850 p-5 flex flex-col gap-5">
          {/* Header Progress and score */}
          <div className="flex justify-between items-center bg-neutral-900/45 border border-neutral-850 p-3 rounded-lg">
            <div>
              <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest">Active Operations</p>
              <h4 className="font-display font-bold text-neutral-200 text-sm mt-0.5">{activeScenario.title}</h4>
            </div>
            
            <div className="flex items-center gap-4 text-right">
              <div>
                <p className="text-[9px] text-neutral-500 font-mono uppercase">Teaming Synergy Score</p>
                <h4 className={`text-sm font-mono font-bold ${
                  successScore >= 75 ? "text-emerald-400" : successScore >= 60 ? "text-sky-400" : "text-rose-400"
                }`}>
                  {successScore}%
                </h4>
              </div>
              <button
                onClick={quitSimulation}
                className="text-[10px] text-neutral-500 font-mono hover:text-neutral-300 border border-neutral-800 rounded px-2 py-0.5 cursor-pointer"
              >
                ABORT
              </button>
            </div>
          </div>

          {!simResults ? (
            // Progression Step Block
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center text-xs font-mono text-neutral-500">
                <span>PHASE STATUS: EVENT_ANOMALY</span>
                <span>STEP {stepIndex + 1} OF {activeScenario.steps.length}</span>
              </div>

              <div className="bg-neutral-900/80 p-4 rounded-xl border border-neutral-850">
                <p className="text-xs text-neutral-300 leading-relaxed font-sans font-medium">
                  {activeScenario.steps[stepIndex].description}
                </p>
              </div>

              {/* Show Outcome details once selection is clicked */}
              {stepOutcome ? (
                <div className={`p-4 rounded-xl border ${
                  stepOutcome.isSuccess 
                    ? "bg-emerald-950/20 border-emerald-900/40 text-emerald-200" 
                    : "bg-rose-950/10 border-rose-900/30 text-rose-300"
                } flex flex-col gap-2`}>
                  <div className="flex justify-between items-center">
                    <h5 className="text-xs font-mono font-semibold flex items-center gap-1">
                      {stepOutcome.isSuccess ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> TECHNICAL PROTOCOL MET (+{stepOutcome.points} pts)
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-rose-500" /> ENGINEERING GAP HAZARD (-20 pts)
                        </>
                      )}
                    </h5>
                  </div>
                  <p className="text-xs leading-relaxed font-sans">{stepOutcome.text}</p>
                  
                  <button
                    onClick={handleNextStep}
                    className="self-end mt-2 text-xs font-mono bg-neutral-900 text-sky-400 hover:text-sky-300 px-3 py-1 rounded border border-neutral-800 cursor-pointer flex items-center gap-1"
                  >
                    Proceed to Next Phase <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                // Present Choices Actions
                <div className="flex flex-col gap-3">
                  <h5 className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest font-semibold">Select Action Directive</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activeScenario.steps[stepIndex].options.map((opt, oIdx) => {
                      const met = checkRequirementsMet(opt);
                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleSelectOption(opt)}
                          className={`text-left p-3.5 rounded-lg border text-xs leading-relaxed transition-all cursor-pointer flex flex-col justify-between min-h-[90px] ${
                            met 
                              ? "bg-neutral-900 hover:bg-neutral-850 border-neutral-800 hover:border-neutral-750 text-neutral-200" 
                              : "bg-neutral-900/40 border-neutral-900/90 hover:bg-neutral-900 text-neutral-400 hover:text-neutral-300"
                          }`}
                        >
                          <span className="font-sans font-medium">{opt.text}</span>
                          
                          {/* Indicator requirements */}
                          <div className="mt-2.5 pt-2 border-t border-neutral-950 flex justify-between items-center text-[10px] font-mono text-neutral-500">
                            {opt.requiredToolset ? (
                              <span className={met ? "text-emerald-400/80" : "text-amber-500/80"}>
                                Needs: {opt.requiredToolset?.split(" (")[0]}
                              </span>
                            ) : opt.requiredPower ? (
                              <span className={met ? "text-emerald-400/80" : "text-amber-500/80"}>
                                Needs: {opt.requiredPower?.split(" (")[0]}
                              </span>
                            ) : opt.requiredMobility ? (
                              <span className={met ? "text-emerald-400/80" : "text-amber-500/80"}>
                                Needs: {opt.requiredMobility?.split(" (")[0]}
                              </span>
                            ) : opt.requiredArchetype ? (
                              <span className={met ? "text-emerald-400/80" : "text-amber-500/80"}>
                                Needs: {opt.requiredArchetype}
                              </span>
                            ) : (
                              <span>Standard Procedures</span>
                            )}

                            {met ? (
                              <span className="text-emerald-500 text-[10px] font-semibold">Ready</span>
                            ) : (
                              <span className="text-amber-500 text-[10px]">Unmet Option</span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Final Simulation Results Display CARD
            <div className="border border-neutral-800 bg-neutral-900/50 p-5 rounded-xl flex flex-col items-center text-center gap-4">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 ${
                simResults.status === "SUCCESS" 
                  ? "bg-emerald-950/40 border-emerald-500 text-emerald-400" 
                  : "bg-rose-950/40 border-rose-500 text-rose-400"
              }`}>
                {simResults.status === "SUCCESS" ? <CheckCircle2 className="w-8 h-8" /> : <AlertTriangle className="w-8 h-8" />}
              </div>

              <div>
                <h4 className="font-display font-extrabold text-neutral-200 text-base">
                  ROBOT FIELD TRAINER END REPORT
                </h4>
                <p className="text-xs font-mono mt-1 text-neutral-400">
                  FINAL MISSION SCORE: <span className={simResults.status === "SUCCESS" ? "text-emerald-400" : "text-rose-400"}>{simResults.percentageLog}% SYNERGY LEVEL</span>
                </p>
              </div>

              <p className="text-xs text-neutral-300 max-w-md leading-relaxed font-sans bg-neutral-950/80 p-3.5 border border-neutral-850 rounded-lg">
                {simResults.summary}
              </p>

              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => startScenario(activeScenario)}
                  className="px-4 py-2 bg-neutral-900 hover:bg-neutral-855 text-neutral-300 text-xs font-mono font-semibold rounded border border-neutral-800 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Re-Run Mission Phase
                </button>
                <button
                  onClick={quitSimulation}
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-mono font-semibold rounded transition-all cursor-pointer flex items-center"
                >
                  Return to Control Deck
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
