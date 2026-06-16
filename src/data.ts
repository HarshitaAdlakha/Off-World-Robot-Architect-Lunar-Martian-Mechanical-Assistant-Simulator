import { 
  RobotDesign, 
  SimulationScenario, 
  EnvironmentType, 
  ArchetypeType, 
  MobilityType, 
  PowerSourceType 
} from "./types";

export interface EnvironmentDetail {
  gravity: string;
  atmosphere: string;
  temperatureRange: string;
  solarIrradiance: string;
  majorHazards: string[];
  description: string;
}

export const ENV_DETAILS: Record<EnvironmentType, EnvironmentDetail> = {
  Moon: {
    gravity: "1/6th of Earth (0.166g)",
    atmosphere: "Hard Vacuum (10⁻¹² torr)",
    temperatureRange: "-130°C to +120°C (Polar craters can plunge to -246°C)",
    solarIrradiance: "High (~1361 W/m²), but has 14-day lunar nights",
    majorHazards: [
      "Electrostatic abrasive regolith (ultra-sharp micro-fractured silicate)",
      "Solar radiation storms & galactic cosmic rays",
      "Immense thermal shock during night/day terminator transitions",
      "Severe micrometeorite bombardment"
    ],
    description: "The Lunar surface is characterized by a high-vacuum, severe radiation, and abrasive, electrostatically charged dust. Habitats require subsurface shelters or heavy regolith shields. Robots operate in hard vacuum and must withstand extreme 14-day cold nights."
  },
  Mars: {
    gravity: "3/8ths of Earth (0.375g)",
    atmosphere: "Thin CO2 atmosphere (~6-10 millibars, 0.6% of Earth)",
    temperatureRange: "-153°C to +20°C (Average of -60°C)",
    solarIrradiance: "Low (~590 W/m², roughly 43% of Earth's solar energy)",
    majorHazards: [
      "Fine iron-oxide dust suspension (infiltrates rotary seals)",
      "Global-scale dust storms lasting multiple months",
      "UV radiation & perchlorate-rich toxic soil",
      "Atmospheric heat dissipation is low (highly insulated cooling loops needed)"
    ],
    description: "Mars presents a dynamic atmosphere that creates convective dust storms, reduced sunlight, and sub-zero temperatures. Water ice sits frozen in glacier layers and subsurface soil. Robots must deal with fine dust infiltration, low solar power, and toxic soil."
  }
};

export interface ChoiceDetail<T> {
  id: T;
  label: string;
  description: string;
  scientificWeight: string; // engineering justification
  pros: string[];
  cons: string[];
}

export const ARCHETYPES: ChoiceDetail<ArchetypeType>[] = [
  {
    id: "Companion & Health Monitor",
    label: "Companion & Health Monitor",
    description: "A friendly, conversational assistant deployed inside the high-pressure habitat modules.",
    scientificWeight: "Mitigates isolation-induced cognitive decline and monitors astronaut biomarkers via multi-spectral scanners to check blood oxygen, heart rates, and circadian metrics.",
    pros: ["High astronaut psychological trust", "Integrates habitat climate telemetry", "Soft non-threatening shell"],
    cons: ["Suboptimal surface operational safety", "Low physical lift capacity", "Highly susceptible to internal battery thermal runaways"]
  },
  {
    id: "Agricultural Bio-Assistant",
    label: "Agricultural Bio-Assistant",
    description: "An automated assistant operating in hydroponic or aeroponic greenhouse modules.",
    scientificWeight: "Manages biomass hydration, soil perchlorate purification, seedling micro-root nutrient dosing, and organic waste cycling under high-humidity bio-secured zones.",
    pros: ["Ensures constant caloric buffer safety", "Precision micro-weed pruning", "Active gas composition checking"],
    cons: ["Sensitive to water mineral scaling", "Low speed of movement", "No shielding for vacuum environments"]
  },
  {
    id: "Autonomous Subsurface Miner",
    label: "Autonomous Subsurface Miner",
    description: "A rugged, heavy-torque industrial machine seeking frozen water ice inside lunar lava tubes or Martian glaciers.",
    scientificWeight: "Extracts primordial sub-regolith ice cores and performs crushing, conveying, and heating to support fuel factories (methane/hydrogen production).",
    pros: ["High payload extraction capacity", "Extreme radiation tolerance (subsurface)", "Reinforced mechanical gears"],
    cons: ["Immense power requirement", "Abrasive regolith wear on moving joints", "High latency of tethered communication"]
  },
  {
    id: "Extra-vehicular Surface Explorer",
    label: "Extra-vehicular Surface Explorer",
    description: "A highly mobile exploration machine traversing unmapped rocky landscapes, craters, and ridges.",
    scientificWeight: "Conducts long-range geographic surveying, laser spectrograph rock composition analysis, and radio-beacon deployment.",
    pros: ["Rocker-bogie terrain traversal", "Multi-spectral imaging array", "Fast surface transit capability"],
    cons: ["High dust accumulation on solar cells", "High probability of rocky tipping events", "Unpredictable planetary terrain slippage"]
  },
  {
    id: "Habitat Automation & Monitoring System",
    label: "Habitat Automation & Monitoring",
    description: "An automated system checking hull health, vacuum seals, solar panel angles, and micrometeorite impact craters.",
    scientificWeight: "Operates 24/7 along external rails or using crawling micro-grippers to detect micro-thermal leaks from habitat pressure cabins.",
    pros: ["Detects critical leaks before atmospheric drop", "High structural redundancy", "Works in hardest external vacuum"],
    cons: ["Limited to structural perimeter", "Very complex mechanical crawling gears", "Difficult to repair if jammed externally"]
  }
];

export const MOBILITIES: ChoiceDetail<MobilityType>[] = [
  {
    id: "Heavy-Duty Track System",
    label: "Heavy-Duty Track System",
    description: "Continuous steel or titanium alloy continuous tread tracks.",
    scientificWeight: "Distributes contact weight over wide footprint to navigate slip-prone soils, fine regolith, and steep craters.",
    pros: ["Incredible traction on loose sandy sloped slopes", "Zero puncture risk", "High load-carrying capacity"],
    cons: ["Abrasive particles grind track drive pins", "High friction losses", "Significant structural mass penalty"]
  },
  {
    id: "Rocker-Bogie 6-Wheel Suspension",
    label: "Rocker-Bogie 6-Wheel Suspension",
    description: "The classic NASA jointed suspension that allows wheels to climb over obstacles 2x wheel diameter.",
    scientificWeight: "Maintains equal wheel pressures across rocks during surface exploratory traverses.",
    pros: ["High clearance, handles severe rocky fields", "Extremely stable at low velocity", "Decoupled motor redundancy"],
    cons: ["Slow transit speeds", "Mechanical complexity of rocker pivots", "Risk of wheel-hub dust infiltration"]
  },
  {
    id: "Quadrupedal Robotic Limbs",
    label: "Quadrupedal Robotic Limbs",
    description: "Four bio-inspired segmented legs with solid carbon-fiber force-feedback paw-pads.",
    scientificWeight: "Walks over cracked lava flows and non-congruent rocks without needing a clear path.",
    pros: ["Active step planning on extreme slopes", "Can climb ladder structures", "Low ground footprint"],
    cons: ["Unstable during central processing unit latency", "Very high kinetic energy cost", "Extremely fragile servo joints"]
  },
  {
    id: "Precision Ceiling Gantry Rail",
    label: "Precision Ceiling Gantry Rail",
    description: "Overhead physical roller tracks suspended from internal habitat structure struts.",
    scientificWeight: "Provides automated rapid movement inside tight crew modules without using up floor space.",
    pros: ["Extremely quiet and energy efficient", "Zero dust contamination risk", "Direct persistent power link"],
    cons: ["Zero utility outside the physical rail", "Rigid path constraints", "Creates centralized overhead failure point"]
  },
  {
    id: "Bipedal Humanoid Locomotion",
    label: "Bipedal Humanoid Locomotion",
    description: "Human-proportioned bipedal footings with ankle tilt sensors.",
    scientificWeight: "Operates naturally inside crew habitats using human ladders, hatches, tools, and visual-spatial coordinates.",
    pros: ["Utilizes all pre-built legacy astronaut tools", "Low spatial profile inside corridors", "Intuitive for remote VR operation"],
    cons: ["Extremely unstable in low-grav slip events", "Heavy balance-correction motor draw", "Highest complexity of design"]
  }
];

export const POWER_SOURCES: ChoiceDetail<PowerSourceType>[] = [
  {
    id: "Solar Arrays & Regenerative Fuel Cells",
    label: "Solar & Regenerative Fuel Cells",
    description: "High-efficiency GaAs solar panels charging gaseous hydrogen-oxygen fuel cells for night buffers.",
    scientificWeight: "Converts solar flux to energy and captures water waste by-product to regenerate fuel during illumination.",
    pros: ["Renewable fuel cycle", "Environmentally benign", "Relatively light during day operation"],
    cons: ["Lunar nights are 350 hours long", "Dust deposition severely drops Martian cell output", "Extreme volume of pressurized fuel cylinders"]
  },
  {
    id: "Radioisotope Thermoelectric Generator (RTG)",
    label: "Radioisotope Thermoelectric Generator (RTG)",
    description: "Plutonium-238 decay capsule converting thermal energy to electrical using silicon-germanium thermopiles.",
    scientificWeight: "Provides absolute persistent power completely decoupled from solar flux, sand storms, or extreme seasonal night cycles.",
    pros: ["30+ year lifespan", "Generates high thermal heat for system warming", "Compact and robust design"],
    cons: ["Very high heavy-metal mass density", "Demands heavy lead radiation blocks", "Extremely restrictive fuel production limits"]
  },
  {
    id: "Solid-State Sodium-Ion Batteries",
    label: "Solid-State Sodium-Ion Batteries",
    description: "Non-flammable ceramic solid batteries without liquid electrolyte.",
    scientificWeight: "Delivers rapid surge power without risk of low-temperature freezing or high-heat outgassing inside pressurized habitats.",
    pros: ["Zero thermal runaway fire hazards", "Operable down to -80°C", "Rapid charging cycles"],
    cons: ["Low specific energy density", "Demands persistent charging cycles", "Very high weight-to-energy ratio"]
  },
  {
    id: "In-Situ Methane Combustion Reciprocator",
    label: "In-Situ Methane Combustion Reciprocator",
    description: "A small combustor burning methane and liquid oxygen synthesized from Martian Sabatier processors.",
    scientificWeight: "Generates high peak mechanical torque for digging machines using localized bio-fuels.",
    pros: ["Incredible instant power torque", "Fuels can be drilled locally on Mars", "Compact sizing"],
    cons: ["Produces high vibration", "No utility in Lunar vacuum (no CO2/Sabatier)", "Emits combustion exhaust gases"]
  }
];

export const TOOLSET_OPTIONS = [
  "Multi-Spectral LiDAR Array (3D topographic mapping)",
  "Abrasive-Resistant Planetary Drill (coring ice/rock)",
  "Soil Gas Chromatograph (perchlorates & organics detector)",
  "Soft-Claw Anthropomorphic Manipulators (delicate plant care)",
  "Active Dust Ingress Brush & Electrostatic Deflectors",
  "High-Temp Laser Welding Plasma Jet (seal fusing)",
  "Dynamic Vital-Sign Bio-Sensor (astronaut triage radar)",
  "Subsurface Ground Penetrating Radar (void detection)"
];

export const TEAMING_MODES = [
  "Direct Ergonomic Avatar: Astronaut remotely operates robot via haptic gloves, extending physical reach into cold lava tubes.",
  "Supervised Field Assistant: Astronaut sets task directives; robot executes pathing but highlights unexpected geological hazards.",
  "Symbiotic Companion: Operates under strict physical safety shields alongside crew, managing mental fatigue and medical updates.",
  "Sentry Autonomy Mode: Runs completely independent night cycles, waking human team only in cabin seal or power emergencies."
];

export const AI_PERSONALITIES = [
  "Strict Logician Analyst: Concise telemetry readouts with high-precision statistical margins.",
  "Soothing Companion Counselor: Gentle, warm vocal inflections, optimized to lower astronaut cortisol during cabin isolation.",
  "Safety Officer Advocate: Vigilant warnings with immediate fail-safe lockdowns for any non-nominal status.",
  "Creative Co-Explorer: Suggests lateral geological exploration targets and displays high curiosity in dialogue."
];

export const PRESETS: { name: string; description: string; design: RobotDesign }[] = [
  {
    name: "Ares Subsurface Hydro-Treader",
    description: "Martian deep-drill tracker optimized to find frozen glaciers beneath the dusty sands.",
    design: {
      name: "Ares Subsurface Hydro-Treader",
      environment: "Mars",
      archetype: "Autonomous Subsurface Miner",
      mobility: "Heavy-Duty Track System",
      powerSource: "Radioisotope Thermoelectric Generator (RTG)",
      toolsets: [
        "Abrasive-Resistant Planetary Drill (coring ice/rock)",
        "Subsurface Ground Penetrating Radar (void detection)",
        "Active Dust Ingress Brush & Electrostatic Deflectors"
      ],
      teamingMode: "Supervised Field Assistant: Astronaut sets task directives; robot executes pathing but highlights unexpected geological hazards.",
      aiPersonality: "Strict Logician Analyst: Concise telemetry readouts with high-precision statistical margins."
    }
  },
  {
    name: "Artemis Lunar Seal Crawler",
    description: "External hull inspector climbing the micro-gravity trusses under vacuum.",
    design: {
      name: "Artemis Lunar Seal Crawler",
      environment: "Moon",
      archetype: "Habitat Automation & Monitoring System",
      mobility: "Quadrupedal Robotic Limbs",
      powerSource: "Solar Arrays & Regenerative Fuel Cells",
      toolsets: [
        "Multi-Spectral LiDAR Array (3D topographic mapping)",
        "High-Temp Laser Welding Plasma Jet (seal fusing)",
        "Active Dust Ingress Brush & Electrostatic Deflectors"
      ],
      teamingMode: "Sentry Autonomy Mode: Runs completely independent night cycles, waking human team only in cabin seal or power emergencies.",
      aiPersonality: "Safety Officer Advocate: Vigilant warnings with immediate fail-safe lockdowns for any non-nominal status."
    }
  },
  {
    name: "Ceres Greenhouse Biosymbiont",
    description: "Hydroponics companion fostering plant growth and oxygen cycling.",
    design: {
      name: "Ceres Greenhouse Biosymbiont",
      environment: "Mars",
      archetype: "Agricultural Bio-Assistant",
      mobility: "Precision Ceiling Gantry Rail",
      powerSource: "Solid-State Sodium-Ion Batteries",
      toolsets: [
        "Soft-Claw Anthropomorphic Manipulators (delicate plant care)",
        "Soil Gas Chromatograph (perchlorates & organics detector)",
        "Dynamic Vital-Sign Bio-Sensor (astronaut triage radar)"
      ],
      teamingMode: "Symbiotic Companion: Operates under strict physical safety shields alongside crew, managing mental fatigue and medical updates.",
      aiPersonality: "Soothing Companion Counselor: Gentle, warm vocal inflections, optimized to lower astronaut cortisol during cabin isolation."
    }
  }
];

export const SCENARIOS: SimulationScenario[] = [
  {
    id: "greenhouse-emergency",
    title: "Martian Greenhouse Depressurization",
    description: "An external micrometeorite punctures the Martian greenhouse module. Scurry to seal the breach before 100% crop loss.",
    location: "Mars",
    riskLevel: "Critical",
    successCriteria: "Requires sealing capability, steady indoor movement and high safety focus.",
    steps: [
      {
        id: 1,
        description: "The pressure alarm sounds. Atmosphere levels are falling. Spores and water vapor are leaking into the thin Martian atmosphere. What is the immediate tasking directive?",
        options: [
          {
            text: "Direct robot to execute a hull scan using Laser Welding/LiDAR to locate the physical leak.",
            requiredToolset: "High-Temp Laser Welding Plasma Jet (seal fusing)",
            outcomeSuccess: "Active scan successfully locates a 3mm hairline puncture in section G-4. Thermal sensors register hot gas gasping.",
            outcomeFailure: "The robot scans, but without high-precision laser/thermal welding instruments or mapping, it wastes precious time, allowing more nitrogen to escape.",
            scoreMod: 30
          },
          {
            text: "Evacuate the agricultural module and quarantine the plants immediately to protect the core habitat.",
            outcomeSuccess: "Quarantine doors lock down. Safely isolates the human crew, but crops suffer 30% shock due to rapid temp drop before automatic heaters turn on.",
            outcomeFailure: "Quarantine doors shutter, but without high automation system support the robot jams the door hinge.",
            scoreMod: 15
          }
        ]
      },
      {
        id: 2,
        description: "The breach is targeted. Liquid water is sub-cooling and turning into frost. The robot must seal it. It is -60°C near the hull puncture.",
        options: [
          {
            text: "Utilize High-Temp Laser Welder to fuse an aluminum patch directly over the micrometeorite hole.",
            requiredToolset: "High-Temp Laser Welding Plasma Jet (seal fusing)",
            outcomeSuccess: "Brilliant! The laser plasma jet bonds the sealing flange tightly. Atmosphere pressure stabilizes at 950 millibars. The crop is saved!",
            outcomeFailure: "Without a laser welder, the robot attempts to use standard manipulators to hold physical tape, but the pressure vacuums the tape out into the cold Mars night.",
            scoreMod: 50
          },
          {
            text: "Rely on the astronaut companion to perform an emergency EVA to apply the sealant manually.",
            outcomeSuccess: "The astronaut puts on their spacesuit and seals it. Pressure stabilizes, but the astronaut suffers mild frostbite on two fingers from handling frozen metal flanges.",
            outcomeFailure: "The astronaut enters, but since the robot companion doesn't support Symbiotic Teaming, high cognitive stress leads to a dropped seal wrench, delaying the repair.",
            scoreMod: 20
          }
        ]
      }
    ]
  },
  {
    id: "lunar-night-freeze",
    title: "Lunar Night Power Interruption",
    description: "The 14-day Lunar night arrives. Dust accumulation triggers a feedback failure in the main fuel cell bank. The habitat is freezing.",
    location: "Moon",
    riskLevel: "Severe",
    successCriteria: "Demands reliable high-density batteries, RTG thermal decay assistance, or intensive dust removal.",
    steps: [
      {
        id: 1,
        description: "The temperature has dropped to -130°C on the external regolith. Thick dust covers the battery storage container. How do we access the backup relays?",
        options: [
          {
            text: "Activate robot's Active Dust Ingress Brush to sweep solar regulators and clean the fuel cell seals.",
            requiredToolset: "Active Dust Ingress Brush & Electrostatic Deflectors",
            outcomeSuccess: "Electrostatic deflectors send the microscopic sharp glass dust flying off the contacts. Clean metal connection restored!",
            outcomeFailure: "Standard pincers scrape the regolith, grinding microscopic abrasive dust deeper into the socket and causing a short circuit.",
            scoreMod: 40
          },
          {
            text: "Draw continuous emergency thermal heat directly from the robot's onboard RTG decay cycle to warm the battery bays.",
            requiredPower: "Radioisotope Thermoelectric Generator (RTG)",
            outcomeSuccess: "Superb. Since the robot is powered by Plutonium decay, it radiates sufficient waste Btu thermal heat to keep both its own joints and the backup battery bank at a safe -10°C.",
            outcomeFailure: "Without an RTG, the solar batteries are frozen. Electrolyte crystallizes. The system enters deep unrecoverable discharge.",
            scoreMod: 45
          }
        ]
      },
      {
        id: 2,
        description: "The primary electrical grid is rebooting, but requires a manual high-voltage breaker reset inside the external unpressurized transformer vault.",
        options: [
          {
            text: "Send the robot outdoors to negotiate the steep crater wall track in the dark to reach the breaker vault.",
            requiredMobility: "Heavy-Duty Track System",
            outcomeSuccess: "The heavy tracks dig into the cold lunar dust, climbing the 22-degree loose slope with immense steel traction to reach the vault.",
            outcomeFailure: "The bipedal limbs slide on the uncohesive, frictionless crater rim, tumbling 12 meters into the dark crater before reaching the vault.",
            scoreMod: 40
          },
          {
            text: "Direct the robot inside to manage habitat survival power while the astronaut heads out in the vacuum manually.",
            requiredArchetype: "Habitat Automation & Monitoring System",
            outcomeSuccess: "The automation system beautifully shifts oxygen vents to essential rooms, keeping the crew alive while they complete the freezing spacewalk.",
            outcomeFailure: "The robot fails to load-balance the habitat. The life support computers loop-hang, leaving the crew without internal status.",
            scoreMod: 25
          }
        ]
      }
    ]
  },
  {
    id: "subsurface-cave-collapse",
    title: "Martian Ice Tube Cavity Collapse",
    description: "A mechanical drill gets stuck in a subsurface glacier deep inside a lava cave. Soil tremors threaten to bury the research gear.",
    location: "Mars",
    riskLevel: "Moderate",
    successCriteria: "Requires heavy-duty mining machinery, soil scanning, or rapid physical towing capacity.",
    steps: [
      {
        id: 1,
        description: "Sensors detect a shift in the basalt ceiling above the glacier drill site. Ground penetrating radar is required to scan for voids.",
        options: [
          {
            text: "Use Subsurface Ground Penetrating Radar to map fractures and locate a safe retreat path.",
            requiredToolset: "Subsurface Ground Penetrating Radar (void detection)",
            outcomeSuccess: "Excellent. The radar slices through 4 meters of stone, mapping an optimal stable corridor, bypassing weak overhead arches.",
            outcomeFailure: "Attempting to visual-navigate through flashlights misses the subterranean shear-faults, turning recovery into an blind estimate.",
            scoreMod: 40
          },
          {
            text: "Immediately push the mining robot to high speed and pull the drill core out before any basalt caves in.",
            requiredArchetype: "Autonomous Subsurface Miner",
            outcomeSuccess: "The miner is heavily reinforced. Its high torque pulls the hydraulic drill shaft free, sustaining only minor scratches on its steel shielding.",
            outcomeFailure: "The robot lacks the low-center torque of an industrial miner. It tips sideways as the basalt shifts, pinning its lightweight chassis.",
            scoreMod: 30
          }
        ]
      },
      {
        id: 2,
        description: "An avalanche of basalt granules blocks the cave exit. Communication signals are fading back to base.",
        options: [
          {
            text: "Deploy continuous mechanical tracks to dig a clearance trench through the rocky pile.",
            requiredMobility: "Heavy-Duty Track System",
            outcomeSuccess: "Tracks behave like bulldozers. The robot clears 2 tons of basalt scree, carving a tunnel big enough to ride out of.",
            outcomeFailure: "Ceiling rails or lightweight walker legs are useless here. They get jammed and suffer critical stress failures under sliding boulders.",
            scoreMod: 40
          },
          {
            text: "Astronaut takes hand control of the robot to operate its soft-claw pincers and slowly remove blocking rocks.",
            outcomeSuccess: "The teaming connection works well! High-fidelity force feedback allows the crew to pluck key load-bearing stones out safely.",
            outcomeFailure: "Without ergonomic avatar controls, poor haptic feedback causes the astronaut to trigger a secondary slide of basalt dust.",
            scoreMod: 20
          }
        ]
      }
    ]
  }
];
