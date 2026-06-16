export type EnvironmentType = "Moon" | "Mars";

export type ArchetypeType = 
  | "Companion & Health Monitor"
  | "Agricultural Bio-Assistant"
  | "Autonomous Subsurface Miner"
  | "Extra-vehicular Surface Explorer"
  | "Habitat Automation & Monitoring System";

export type MobilityType = 
  | "Heavy-Duty Track System"
  | "Rocker-Bogie 6-Wheel Suspension"
  | "Quadrupedal Robotic Limbs"
  | "Precision Ceiling Gantry Rail"
  | "Bipedal Humanoid Locomotion";

export type PowerSourceType = 
  | "Solar Arrays & Regenerative Fuel Cells"
  | "Radioisotope Thermoelectric Generator (RTG)"
  | "Solid-State Sodium-Ion Batteries"
  | "In-Situ Methane Combustion Reciprocator";

export interface RobotDesign {
  name: string;
  environment: EnvironmentType;
  archetype: ArchetypeType;
  mobility: MobilityType;
  powerSource: PowerSourceType;
  toolsets: string[];
  teamingMode: string;
  aiPersonality: string;
  customPrompt?: string; // and any customized detail
}

export interface MetricCritique {
  rating: "A" | "B" | "C" | "D" | "F" | string;
  critique: string;
  mitigationTips: string;
}

export interface SmeEvaluation {
  score: number;
  dustResilience: MetricCritique;
  thermalResilience: MetricCritique;
  powerEfficiency: MetricCritique;
  humanTeamingViability: MetricCritique;
  generalEvaluation: string;
  upgrades: string[];
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai" | "system";
  text: string;
  timestamp: string;
}

export interface SimulationStep {
  id: number;
  description: string;
  options: {
    text: string;
    requiredArchetype?: ArchetypeType;
    requiredPower?: PowerSourceType;
    requiredMobility?: MobilityType;
    requiredToolset?: string;
    outcomeSuccess: string;
    outcomeFailure: string;
    scoreMod: number; // impact on success score
  }[];
}

export interface SimulationScenario {
  id: string;
  title: string;
  description: string;
  location: "Moon" | "Mars" | "Habitat Internal";
  riskLevel: "Moderate" | "Severe" | "Critical";
  steps: SimulationStep[];
  successCriteria: string;
}
