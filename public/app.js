/* ═══════════════════════════════════════════════════════
   Buss 49P Decision Tool — Application Logic
   ═══════════════════════════════════════════════════════ */

// ── Decision Tree Data ──
let DECISION_TREE = {
  id: "root",
  label: "Buss 49P Procurement Evaluation",
  weight: "100%",
  description: "FMV is procuring 60 military transport buses (Buss 49P) with an option for 30 additional units for Försvarsmakten. Total estimated value: SEK 513.8 million. The buses must transport 49 passengers on highways and some rough/gravel roads across all Swedish counties. Open procedure under EU Directive 2014/24/EU with deadline 20 February 2026.",
  children: [
    {
      id: "veh",
      label: "Vehicle Capability & Performance",
      weight: "30%",
      description: "The buses must reliably transport 49 soldiers with personal equipment on Swedish highways and secondary/gravel roads. Performance in Nordic winter conditions (-40°C), vehicle durability, and passenger safety are critical operational requirements.",
      influences: [
        { text: "49-passenger minimum requirement", level: "high" },
        { text: "Swedish winter/Arctic conditions", level: "high" },
        { text: "Mixed road surface operation (highway + gravel)", level: "medium" },
        { text: "Soldier equipment storage needs", level: "medium" }
      ],
      children: [
        {
          id: "veh-cap",
          label: "Passenger Capacity & Configuration",
          weight: "30%",
          description: "The bus must seat a minimum of 49 passengers with adequate space for personal military equipment. Interior layout, seat durability, and storage configuration are key differentiators.",
          children: [
            {
              id: "veh-cap-seats",
              label: "Seating Capacity",
              weight: "50%",
              description: "Must seat 49 passengers comfortably with potential for military-grade seating with restraints.",
              scores: {
                scania: { score: 8.0, rationale: "Touring HD offers up to 53 seats in standard configuration. Proven coach platform with flexible seating layouts." },
                volvo: { score: 8.5, rationale: "9700 coach seats up to 55 passengers. Flexible interior configurations. Long experience with military-spec seating." },
                man: { score: 8.0, rationale: "Lions Coach seats up to 53 passengers in standard layout. Well-proven European touring platform." }
              }
            },
            {
              id: "veh-cap-interior",
              label: "Interior Layout & Equipment Storage",
              weight: "50%",
              description: "Interior must accommodate soldiers with personal equipment (weapons bags, rucksacks). Overhead and underfloor luggage capacity.",
              scores: {
                scania: { score: 7.5, rationale: "Touring HD has generous underfloor luggage compartments (~12m³). Military modifications supported through Scania Defence." },
                volvo: { score: 8.0, rationale: "9700 offers ~13m³ underfloor storage. Established military interior modification experience through Volvo Defense." },
                man: { score: 7.0, rationale: "Lions Coach has ~12m³ luggage space. Standard touring interior adaptable for military use." }
              }
            }
          ]
        },
        {
          id: "veh-road",
          label: "Road Performance",
          weight: "25%",
          description: "Buses operate primarily on highways but must handle secondary roads and some rough/gravel surfaces across Sweden.",
          children: [
            {
              id: "veh-road-highway",
              label: "Highway Cruising Performance",
              weight: "50%",
              description: "Fuel-efficient highway cruising at 80-100 km/h with full passenger load across Sweden.",
              scores: {
                scania: { score: 8.5, rationale: "Scania DC13 engine offers excellent power-to-weight ratio. Industry-leading fuel efficiency. Opticruise transmission highly rated." },
                volvo: { score: 8.0, rationale: "Volvo D11/D13 engines well-proven for highway operations. I-Shift transmission efficient and reliable." },
                man: { score: 8.0, rationale: "MAN D26 engine competitive on power and efficiency. TipMatic transmission smooth on highways." }
              }
            },
            {
              id: "veh-road-rough",
              label: "Rough/Gravel Road Capability",
              weight: "50%",
              description: "FMV requires operation on some rough roads. Ground clearance, suspension travel, and chassis robustness on unpaved surfaces.",
              scores: {
                scania: { score: 7.5, rationale: "Modular chassis allows ground clearance optimization. Extensive Nordic rough road experience. Defence division provides ruggedized options." },
                volvo: { score: 7.0, rationale: "Coaches primarily highway-optimized. Volvo Defense can provide enhanced suspension. Independent front suspension may limit rough road durability." },
                man: { score: 6.5, rationale: "Lions Coach designed for European highways. Less Nordic gravel road experience. Adequate but not optimized for rough terrain." }
              }
            }
          ]
        },
        {
          id: "veh-rel",
          label: "Vehicle Reliability",
          weight: "25%",
          description: "Military buses must achieve high operational availability across Sweden's diverse climate zones.",
          children: [
            {
              id: "veh-rel-power",
              label: "Powertrain Durability",
              weight: "50%",
              description: "Engine and transmission proven for high-mileage military use. MTBF and drivetrain warranty coverage.",
              scores: {
                scania: { score: 8.5, rationale: "Engines regularly exceed 1.5 million km. Industry-leading MTBF. Proven in 10,000+ defence vehicles worldwide." },
                volvo: { score: 8.0, rationale: "D-series engines highly reliable with strong MTBF. Extensive fleet data. I-Shift gearbox designed for durability." },
                man: { score: 7.5, rationale: "Engines proven reliable in European touring applications. Good MTBF from European military fleet operations." }
              }
            },
            {
              id: "veh-rel-climate",
              label: "Climate Resilience",
              weight: "50%",
              description: "Reliable operation from -40°C (Norrland winter) to +35°C. Cold-start capability, heating system performance, and material suitability.",
              scores: {
                scania: { score: 9.0, rationale: "All vehicles tested to -40°C as standard. Arctic-grade cold-start systems. Extensive Nordic fleet data. Heating designed for Scandinavian winters." },
                volvo: { score: 8.5, rationale: "Swedish manufacturer with comprehensive Arctic testing. Cold-start systems proven in Nordic conditions." },
                man: { score: 6.5, rationale: "German engineering focused on Central European conditions. Cold-start to -30°C standard. Requires winterization for Arctic conditions." }
              }
            }
          ]
        },
        {
          id: "veh-safe",
          label: "Safety Systems",
          weight: "20%",
          description: "Military transport safety requirements demand comprehensive active and passive safety features for soldier transport.",
          children: [
            {
              id: "veh-safe-active",
              label: "Active Safety Features",
              weight: "50%",
              description: "AEB, ESC, lane departure warning, adaptive cruise control, and fatigue detection systems.",
              scores: {
                scania: { score: 8.0, rationale: "Full ADAS suite. AEB, ESC, LDW, ACC standard on Touring HD. Scania AEB system well-proven." },
                volvo: { score: 9.0, rationale: "Industry-leading safety technology. Dynamic Steering, Collision Warning with Emergency Brake. Safety is Volvo's core identity." },
                man: { score: 7.5, rationale: "Good ADAS package including EBA, ESP, LGS. MAN OptiView available. Competitive but less comprehensive than Volvo." }
              }
            },
            {
              id: "veh-safe-passive",
              label: "Passive Safety & Crashworthiness",
              weight: "50%",
              description: "Structural crashworthiness, rollover protection (ECE R66.02), seat belts, emergency exits, and fire suppression.",
              scores: {
                scania: { score: 8.0, rationale: "Exceeds ECE R66.02 rollover requirements. Robust body structure. 3-point belts standard. Fire detection and suppression." },
                volvo: { score: 8.5, rationale: "Exceeds ECE R66.02 with significant margin. Volvo Safety Cage concept. Industry-leading crash energy management." },
                man: { score: 7.5, rationale: "Meets ECE R66.02 standard. Good body structure integrity. 3-point belts available. Standard fire suppression." }
              }
            }
          ]
        }
      ]
    },
    {
      id: "del",
      label: "Delivery & Schedule Risk",
      weight: "25%",
      description: "FMV requires reliable delivery of 60 buses with an option for 30 more. Production readiness, delivery timeline, and supply chain resilience are critical.",
      influences: [
        { text: "60-unit base order volume", level: "high" },
        { text: "30-unit option flexibility", level: "medium" },
        { text: "European defence procurement backlogs", level: "medium" },
        { text: "Post-pandemic supply chain disruptions", level: "low" }
      ],
      children: [
        {
          id: "del-ready",
          label: "Production Readiness",
          weight: "35%",
          description: "Manufacturer's ability to commence production without significant retooling or design adaptation.",
          children: [
            {
              id: "del-ready-platform",
              label: "Current Platform Maturity",
              weight: "50%",
              description: "How mature and production-proven is the proposed bus platform? In-service fleet size and design stability.",
              scores: {
                scania: { score: 8.5, rationale: "Touring HD in production since 2016. Thousands delivered globally. Mature, stable platform." },
                volvo: { score: 8.5, rationale: "9700 in production since 2001 (current gen since 2016). World's best-selling coaches. Extremely mature." },
                man: { score: 8.0, rationale: "Lions Coach in production since 2004 (current gen since 2018). Proven European coach platform." }
              }
            },
            {
              id: "del-ready-capacity",
              label: "Production Line Capacity",
              weight: "50%",
              description: "Can the manufacturer accommodate a 60-unit military order within existing production capacity?",
              scores: {
                scania: { score: 8.0, rationale: "Södertälje plant has significant capacity. Military orders prioritized through defence division." },
                volvo: { score: 7.5, rationale: "Borås plant has good capacity. May face competing priorities with electric bus transition." },
                man: { score: 8.5, rationale: "Multiple sites (Germany, Poland, Turkey) provide excellent capacity. TRATON backing ensures scale." }
              }
            }
          ]
        },
        {
          id: "del-time",
          label: "Delivery Timeline",
          weight: "35%",
          description: "Ability to meet FMV's delivery schedule for the base order and option scalability.",
          children: [
            {
              id: "del-time-base",
              label: "60-Unit Base Order Fulfillment",
              weight: "50%",
              description: "Lead time from contract to delivery of all 60 buses. Production rate and schedule confidence.",
              scores: {
                scania: { score: 7.5, rationale: "12-18 months estimated. Military customization adds lead time. Swedish proximity enables coordination." },
                volvo: { score: 7.0, rationale: "14-20 months estimated. Military modifications may extend timeline. Some resource competition with EV ramp-up." },
                man: { score: 8.0, rationale: "10-16 months leveraging multiple sites. Efficient processes. Strong on-time delivery track record." }
              }
            },
            {
              id: "del-time-option",
              label: "30-Unit Option Scalability",
              weight: "50%",
              description: "Ability to efficiently scale up for optional 30 additional buses without delays or cost increases.",
              scores: {
                scania: { score: 8.0, rationale: "Modular production easily accommodates increases. Established repeat order processes." },
                volvo: { score: 7.5, rationale: "Good scalability within Volvo Group. May depend on EV production scheduling." },
                man: { score: 8.5, rationale: "Multiple facilities provide excellent scalability. Best positioned for rapid option exercise." }
              }
            }
          ]
        },
        {
          id: "del-supply",
          label: "Supply Chain Robustness",
          weight: "30%",
          description: "Resilience of component supply chain and geographic concentration risk.",
          children: [
            {
              id: "del-supply-component",
              label: "Component Supply Security",
              weight: "50%",
              description: "Vertical integration level and supplier diversification strategy.",
              scores: {
                scania: { score: 8.0, rationale: "High vertical integration — own engines, axles, gearboxes. TRATON Group component sharing benefits." },
                volvo: { score: 8.5, rationale: "Highly vertically integrated — Volvo Group produces engines, transmissions, axles. Diversified supplier base." },
                man: { score: 7.5, rationale: "Good integration through TRATON Group. Some component sharing with Scania. Central European geographic concentration." }
              }
            },
            {
              id: "del-supply-geo",
              label: "Geographic Supply Chain Risk",
              weight: "50%",
              description: "Vulnerability to disruptions and proximity of key suppliers to final assembly.",
              scores: {
                scania: { score: 8.5, rationale: "Primary production in Sweden. Nordic/European supply chain with low geopolitical risk." },
                volvo: { score: 8.0, rationale: "Swedish production at Borås. European supply chain. Low geopolitical risk." },
                man: { score: 6.5, rationale: "Production in Germany/Poland. Extended logistics to Sweden. Cross-border transport adds complexity." }
              }
            }
          ]
        }
      ]
    },
    {
      id: "cost",
      label: "Lifecycle Cost & Sustainment",
      weight: "25%",
      description: "Total procurement value of SEK 513.8M must cover acquisition, delivery, and initial support for 60 buses (option 30). Through-life cost drives economic evaluation.",
      influences: [
        { text: "SEK 513.8M total estimated value", level: "high" },
        { text: "Swedish service network availability", level: "high" },
        { text: "Fuel cost over 20+ year service life", level: "medium" },
        { text: "Parts availability and lead times", level: "medium" }
      ],
      children: [
        {
          id: "cost-acq",
          label: "Acquisition Cost",
          weight: "35%",
          description: "Unit price competitiveness and total cost for the 60-unit base order including military modifications.",
          children: [
            {
              id: "cost-acq-unit",
              label: "Unit Price Competitiveness",
              weight: "50%",
              description: "Base vehicle price relative to competitors including military modification costs.",
              scores: {
                scania: { score: 6.0, rationale: "Premium brand. Higher list prices offset by quality. Military mods add cost. Expected SEK 7-8.5M/unit." },
                volvo: { score: 5.5, rationale: "Highest price positioning. Volvo Defense mods carry premium. Expected SEK 7.5-9M/unit." },
                man: { score: 8.5, rationale: "Competitive pricing. Lower production costs. Expected SEK 5.5-7M/unit. Best price-performance." }
              }
            },
            {
              id: "cost-acq-total",
              label: "Total Base Order Value",
              weight: "50%",
              description: "All-inclusive cost for 60 buses within SEK 513.8M budget envelope.",
              scores: {
                scania: { score: 6.5, rationale: "Total likely SEK 450-510M. Tight but achievable within budget. Volume discount expected." },
                volvo: { score: 6.0, rationale: "Total likely SEK 470-540M. May exceed budget without significant negotiation." },
                man: { score: 8.5, rationale: "Total likely SEK 360-440M. Comfortably within budget. Savings allow larger spare parts package." }
              }
            }
          ]
        },
        {
          id: "cost-maint",
          label: "Service & Maintenance",
          weight: "35%",
          description: "Through-life service cost driven by Swedish network coverage and parts availability.",
          children: [
            {
              id: "cost-maint-network",
              label: "Swedish Service Network Coverage",
              weight: "50%",
              description: "Authorized service points across Sweden including northern/rural military base locations.",
              scores: {
                scania: { score: 9.0, rationale: "~160 service points including remote northern locations. Largest network. 24/7 roadside assistance." },
                volvo: { score: 8.5, rationale: "~140 service points. Strong coverage including north. Volvo Action Service 24/7. Slightly fewer than Scania." },
                man: { score: 5.0, rationale: "~30 service points. Concentrated in south/central. Limited Norrland coverage near military bases." }
              }
            },
            {
              id: "cost-maint-parts",
              label: "Parts Availability & Lead Times",
              weight: "50%",
              description: "Spare parts delivery speed across Sweden. Warehouse location and stock levels.",
              scores: {
                scania: { score: 8.5, rationale: "Central warehouse in Södertälje. Overnight delivery to most of Sweden. >95% stock availability." },
                volvo: { score: 8.0, rationale: "Distribution center in Gothenburg. Good overnight coverage. Slightly longer to far north." },
                man: { score: 5.5, rationale: "European warehouse in Germany. 2-3 day delivery to Sweden. Limited Swedish stock." }
              }
            }
          ]
        },
        {
          id: "cost-tco",
          label: "Total Cost of Ownership",
          weight: "30%",
          description: "20-25 year lifecycle cost including fuel, maintenance intervals, and residual value.",
          children: [
            {
              id: "cost-tco-fuel",
              label: "Fuel Efficiency",
              weight: "50%",
              description: "Litres per 100km with full load. Significant cost driver over 20+ year lifecycle.",
              scores: {
                scania: { score: 8.5, rationale: "Industry-leading coach fuel efficiency. Ecolution reduces consumption 10-15%. ~25-28 L/100km." },
                volvo: { score: 8.0, rationale: "Competitive efficiency. Driver Support optimization. ~26-29 L/100km. Marginally behind Scania." },
                man: { score: 8.0, rationale: "Good efficiency with EfficientLine package. ~26-29 L/100km. Competitive with Volvo." }
              }
            },
            {
              id: "cost-tco-life",
              label: "Expected Service Life & Residual Value",
              weight: "50%",
              description: "Operational life before major overhaul and residual value after military service.",
              scores: {
                scania: { score: 8.0, rationale: "20-25 year military life expected. High residual value. Robust build quality. Strong second-hand market." },
                volvo: { score: 8.0, rationale: "20-25 year life expected. Good residual value. Premium build quality supports longevity." },
                man: { score: 7.0, rationale: "18-22 year life expected. Moderate residual value. Slightly behind for Nordic long-term durability." }
              }
            }
          ]
        }
      ]
    },
    {
      id: "ind",
      label: "Industrial & Operational Fit",
      weight: "20%",
      description: "Sweden's defence procurement policy emphasizes domestic industrial benefits, security of supply, and compatibility with Försvarsmakten's operational requirements.",
      influences: [
        { text: "Swedish defence industry policy", level: "high" },
        { text: "Security of supply in crisis/war", level: "high" },
        { text: "Försvarsmakten operational requirements", level: "medium" },
        { text: "EU procurement rules (non-discriminatory)", level: "medium" }
      ],
      children: [
        {
          id: "ind-swedish",
          label: "Swedish Industrial Presence",
          weight: "40%",
          description: "Domestic production, employment, and technology transfer for Swedish industrial benefit.",
          children: [
            {
              id: "ind-swedish-prod",
              label: "Domestic Production & Employment",
              weight: "50%",
              description: "Manufacturing facilities in Sweden, Swedish employees, and local supply chain engagement.",
              scores: {
                scania: { score: 9.0, rationale: "HQ in Södertälje. Major Swedish production. ~15,000 Swedish employees. Largest Swedish heavy vehicle employer." },
                volvo: { score: 9.0, rationale: "HQ in Gothenburg. Coach production at Borås. ~23,000 Swedish employees (Group). Extensive local supply chain." },
                man: { score: 3.5, rationale: "No Swedish production. ~200 Swedish employees (sales/service). Minimal domestic industrial benefit." }
              }
            },
            {
              id: "ind-swedish-tech",
              label: "Technology Transfer & Know-How",
              weight: "50%",
              description: "Transfer of manufacturing technology and engineering capabilities to Swedish industry.",
              scores: {
                scania: { score: 8.5, rationale: "Technology development primarily in Sweden. Engineering centers in Södertälje. Defence vehicle expertise retained domestically." },
                volvo: { score: 8.5, rationale: "Significant Swedish R&D. Volvo Group Technology in Gothenburg. Strong contribution to Swedish engineering base." },
                man: { score: 4.0, rationale: "R&D primarily in Germany. Limited technology transfer. Service training and basic maintenance know-how only." }
              }
            }
          ]
        },
        {
          id: "ind-mil",
          label: "Military Compatibility",
          weight: "35%",
          description: "Compliance with Försvarsmakten specifications and ability to integrate military modifications.",
          children: [
            {
              id: "ind-mil-spec",
              label: "Military Specification Compliance",
              weight: "50%",
              description: "Swedish military vehicle standards, NATO STANAG compatibility, and EMC/EMI compliance.",
              scores: {
                scania: { score: 8.0, rationale: "Extensive Swedish military experience. 10,000+ military vehicles. Understands Försvarsmakten specs. EMC-tested platforms." },
                volvo: { score: 7.5, rationale: "Volvo Defense handles military specs. Experience with Swedish Armed Forces requirements. EMC capabilities." },
                man: { score: 7.0, rationale: "NATO military vehicle experience. Bundeswehr is major customer. Less familiar with Swedish-specific standards." }
              }
            },
            {
              id: "ind-mil-flex",
              label: "Operational Flexibility",
              weight: "50%",
              description: "Integration of blackout lighting, radio/antenna mounting, tow hooks, and convoy compatibility.",
              scores: {
                scania: { score: 8.0, rationale: "Scania Defence offers comprehensive military modification packages. Blackout, radio, towing proven." },
                volvo: { score: 7.5, rationale: "Volvo Defense provides military modification services. Blackout and radio integration available." },
                man: { score: 6.5, rationale: "MAN Military provides modification packages. Swedish-specific mods would require development." }
              }
            }
          ]
        },
        {
          id: "ind-sec",
          label: "Security of Supply",
          weight: "25%",
          description: "Ability to maintain supply during crisis or wartime for Swedish defence transport capability.",
          children: [
            {
              id: "ind-sec-war",
              label: "Wartime Production Continuity",
              weight: "50%",
              description: "Ability to produce and deliver buses and parts during a security crisis from Swedish facilities.",
              scores: {
                scania: { score: 9.0, rationale: "Swedish production ensures wartime continuity. Defence division has crisis production planning. Strategic Swedish asset." },
                volvo: { score: 8.5, rationale: "Swedish production at Borås. Volvo Group Swedish facilities enable crisis production." },
                man: { score: 3.0, rationale: "No Swedish production. German/Polish factories vulnerable. Cross-border logistics disrupted in wartime." }
              }
            },
            {
              id: "ind-sec-auto",
              label: "Strategic Autonomy",
              weight: "50%",
              description: "Independence from foreign government export controls. Swedish control over maintenance and lifecycle.",
              scores: {
                scania: { score: 9.0, rationale: "Swedish company, Swedish production. No foreign export controls. Full sovereignty over lifecycle." },
                volvo: { score: 9.0, rationale: "Swedish company, Swedish production. No foreign restrictions. Full national control." },
                man: { score: 4.0, rationale: "German company subject to German export regulations. Limited Swedish influence over production decisions." }
              }
            }
          ]
        }
      ]
    }
  ]
};

// Deep copy of the original tree for AI reference and reset
const DEFAULT_DECISION_TREE = JSON.parse(JSON.stringify(DECISION_TREE));

// ── Company Profiles ──
const COMPANIES = {
  scania: {
    name: "Scania",
    country: "Sweden",
    platform: "Touring HD / Interlink HD",
    color: "#c8102e",
    specs: {
      "Founded": "1891",
      "Headquarters": "Södertälje, Sweden",
      "Parent Company": "TRATON Group (Volkswagen AG)",
      "Employees": "~57,000 globally",
      "Coach Platform": "Touring HD / Interlink HD",
      "Engine": "Scania DC13 (370-450 hp)",
      "Swedish Service Points": "~160",
      "Military Experience": "10,000+ defence vehicles delivered"
    },
    strengths: [
      "Swedish manufacturer with production in Södertälje — maximum industrial benefit",
      "Proven military vehicle track record with 10,000+ defence vehicles worldwide",
      "Largest Swedish service network (~160 points) with northern coverage",
      "Industry-leading fuel efficiency and powertrain durability",
      "Comprehensive Arctic/winter climate engineering",
      "Scania Defence division provides dedicated military customization"
    ],
    weaknesses: [
      "Premium pricing — higher unit cost than MAN",
      "Coach segment smaller than truck division — less focused coach R&D",
      "Less experience with large-scale single military bus contracts",
      "TRATON Group ownership creates corporate complexity for defence procurement"
    ]
  },
  volvo: {
    name: "Volvo Buses",
    country: "Sweden",
    platform: "9700 / 8900",
    color: "#003057",
    specs: {
      "Founded": "1928 (bus division)",
      "Headquarters": "Gothenburg, Sweden (production: Borås)",
      "Parent Company": "Volvo Group",
      "Employees": "~7,500 (bus division), ~100,000 (group)",
      "Coach Platform": "9700 / 8900",
      "Engine": "Volvo D11/D13 (380-460 hp)",
      "Swedish Service Points": "~140",
      "Military Division": "Volvo Defense"
    },
    strengths: [
      "World-leading bus manufacturer — most established coach platform (9700)",
      "Industry-leading safety technology (core brand identity)",
      "Dedicated Volvo Defense division for military applications",
      "Strong Swedish industrial presence with Borås production",
      "Comprehensive Swedish service network (~140 points)",
      "Extensive fleet experience with government and public transport"
    ],
    weaknesses: [
      "Highest price positioning — may exceed budget envelope",
      "Organisational complexity within large Volvo Group structure",
      "Strategic focus shifting toward electric/autonomous — resource competition",
      "Independent front suspension may limit rough road durability"
    ]
  },
  man: {
    name: "MAN Truck & Bus",
    country: "Germany",
    platform: "Lions Coach",
    color: "#e4002b",
    specs: {
      "Founded": "1758 (MAN SE)",
      "Headquarters": "Munich, Germany",
      "Parent Company": "TRATON Group (Volkswagen AG)",
      "Employees": "~36,000",
      "Coach Platform": "Lions Coach",
      "Engine": "MAN D26 (400-460 hp)",
      "Swedish Service Points": "~30",
      "Military Experience": "Extensive NATO fleet experience (Bundeswehr)"
    },
    strengths: [
      "Most competitive pricing — strongest cost structure",
      "Extensive European military vehicle experience (NATO/Bundeswehr)",
      "Largest production capacity through multiple European facilities",
      "TRATON/VW Group financial backing and manufacturing scale",
      "Proven Lions Coach platform in harsh European conditions",
      "Best positioned for rapid delivery and option exercise"
    ],
    weaknesses: [
      "Only ~30 service points in Sweden — limited northern coverage",
      "Non-Swedish manufacturer — minimal domestic industrial benefit",
      "Supply chain centered on Central Europe — logistics distance to Sweden",
      "Less familiar with specific Swedish military requirements and standards",
      "Cold-climate capability requires winterization upgrades",
      "No Swedish production — zero wartime production continuity"
    ]
  }
};

// ── Scenarios ──
const SCENARIOS = [
  {
    id: "a",
    label: "Scenario A",
    title: "Scania Leverages Military Track Record",
    cssClass: "scenario-a",
    outcome: "Scania wins by combining its 10,000+ defence vehicle track record with the largest Swedish service network. FMV values proven military customization and Arctic reliability. The SEK premium is justified by lowest lifecycle cost.",
    risk: "Higher acquisition cost potentially strains SEK 513.8M budget. Coach platform is secondary to truck focus. Large fleet military bus contract is a new category for Scania Defence.",
    company: "scania"
  },
  {
    id: "b",
    label: "Scenario B",
    title: "Budget Constraints Favor MAN's Cost Leadership",
    cssClass: "scenario-b",
    outcome: "In a budget-constrained environment, MAN's significantly lower pricing (SEK 100-150M savings) proves decisive. Savings fund additional buses or comprehensive spare parts. Strong NATO fleet experience provides military credibility.",
    risk: "Limited Swedish service network (~30 points) creates support risk. No Swedish production means zero domestic industrial benefit. Extended parts lead times for northern bases.",
    company: "man"
  },
  {
    id: "c",
    label: "Scenario C",
    title: "Volvo's Safety Innovation Wins Evaluation",
    cssClass: "scenario-c",
    outcome: "Volvo's industry-leading safety technology proves decisive when soldier transport safety is weighted as primary criterion. 9700 maturity, comprehensive ADAS, and Volvo Defense capability combine with strong Swedish industrial presence.",
    risk: "Highest cost could exceed budget. Electric/autonomous shift may deprioritize diesel coach development. Volvo Group complexity may slow military decision-making.",
    company: "volvo"
  },
  {
    id: "d",
    label: "Scenario D",
    title: "Swedish Industrial Priority — Sovereignty Decides",
    cssClass: "scenario-d",
    outcome: "Swedish government emphasizes security of supply and domestic industrial benefit as overriding criteria. Effectively eliminates MAN, creating a Scania vs. Volvo race decided by military experience vs. safety technology.",
    risk: "EU procurement rules require non-discriminatory evaluation — overt Swedish preference could face legal challenge. May result in higher cost. Political sensitivity around defence procurement.",
    company: null
  }
];

// ── State ──
let currentView = 'tree';
let selectedNode = null;
let selectedNodePath = [];
let aiMessages = [];
let aiContext = '';
let isAILoading = false;

// ── Score Change Log (persisted on server) ──
let scoreChangeLog = [];
let scoreOverrides = {};

// ── Documents ──
let documents = [];
let expandedDocId = null;

// ── Scenario Analysis ──
let scenarioSuggestions = [];
let scenarioAnalyzing = false;
let scenarioDescription = '';

function applyScoreOverrides() {
  for (const [key, override] of Object.entries(scoreOverrides)) {
    const [nodeId, company] = key.split('::');
    const node = findNode(DECISION_TREE, nodeId);
    if (node?.scores?.[company]) {
      node.scores[company].score = override.score;
      node.scores[company].rationale = override.rationale;
    }
  }
}

async function saveScoreChange(nodeId, company, oldScore, newScore, oldRationale, newRationale, motivation, documentId) {
  const entry = {
    timestamp: new Date().toISOString(),
    nodeId,
    nodeLabel: findNode(DECISION_TREE, nodeId)?.label || nodeId,
    company,
    companyName: COMPANIES[company]?.name || company,
    oldScore,
    newScore,
    oldRationale,
    newRationale,
    motivation
  };
  if (documentId) entry.documentId = documentId;

  try {
    const res = await fetch('/api/changes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry)
    });
    const data = await res.json();
    scoreChangeLog = data.changelog;
    scoreOverrides = data.overrides;
  } catch (err) {
    console.error('Failed to save change:', err);
    // Fallback: update local state anyway
    const overrideKey = `${nodeId}::${company}`;
    scoreOverrides[overrideKey] = { score: newScore, rationale: newRationale };
    scoreChangeLog.push(entry);
  }
}

// ── Edit Modal ──
let editContext = null; // { nodeId, companyKey, originalScore, originalRationale }

function openEditModal(nodeId, companyKey) {
  const node = findNode(DECISION_TREE, nodeId);
  if (!node?.scores?.[companyKey]) return;

  const data = node.scores[companyKey];
  const company = COMPANIES[companyKey];

  editContext = {
    nodeId,
    companyKey,
    originalScore: data.score,
    originalRationale: data.rationale
  };

  document.getElementById('edit-modal-company').textContent = company.name;
  document.getElementById('edit-modal-node').textContent = node.label;

  const slider = document.getElementById('edit-score-slider');
  slider.value = data.score;
  document.getElementById('edit-score-value').textContent = data.score;

  document.getElementById('edit-rationale').value = data.rationale;
  document.getElementById('edit-motivation').value = '';

  // Show initial impact preview
  updateScorePreview(data.score);

  document.getElementById('edit-modal').classList.add('open');
  document.getElementById('edit-modal-overlay').classList.add('open');
}

function updateScorePreview(newValue) {
  const preview = document.getElementById('edit-impact-preview');
  document.getElementById('edit-score-value').textContent = newValue;

  if (!editContext) { preview.innerHTML = ''; return; }

  const { nodeId, companyKey, originalScore } = editContext;
  const newScore = parseFloat(newValue);
  const node = findNode(DECISION_TREE, nodeId);
  if (!node) { preview.innerHTML = ''; return; }

  // Temporarily swap the score to compute "after" aggregates
  const savedScore = node.scores[companyKey].score;

  // Compute current parent aggregate (with original score)
  const parent = findParent(DECISION_TREE, nodeId);
  const categoryNode = parent && parent.id !== 'root' ? parent : null;

  // Current aggregates
  const currentRoot = computeAggregateScores(DECISION_TREE);
  const currentCategory = categoryNode ? computeAggregateScores(categoryNode) : null;

  // Apply hypothetical score
  node.scores[companyKey].score = newScore;
  const newRoot = computeAggregateScores(DECISION_TREE);
  const newCategory = categoryNode ? computeAggregateScores(categoryNode) : null;

  // Restore original
  node.scores[companyKey].score = savedScore;

  let html = '<div class="impact-label">Impact Preview</div><div class="impact-rows">';

  if (currentCategory && newCategory && categoryNode) {
    const before = currentCategory[companyKey]?.toFixed(2) ?? '—';
    const after = newCategory[companyKey]?.toFixed(2) ?? '—';
    const delta = (newCategory[companyKey] - currentCategory[companyKey]);
    const deltaStr = delta > 0 ? `+${delta.toFixed(2)}` : delta.toFixed(2);
    const deltaClass = delta > 0 ? 'impact-up' : delta < 0 ? 'impact-down' : '';
    html += `
      <div class="impact-row">
        <span class="impact-scope">${categoryNode.label}</span>
        <span class="impact-values">${before} → ${after} <span class="${deltaClass}">(${deltaStr})</span></span>
      </div>
    `;
  }

  if (currentRoot && newRoot) {
    const before = currentRoot[companyKey]?.toFixed(2) ?? '—';
    const after = newRoot[companyKey]?.toFixed(2) ?? '—';
    const delta = (newRoot[companyKey] - currentRoot[companyKey]);
    const deltaStr = delta > 0 ? `+${delta.toFixed(2)}` : delta.toFixed(2);
    const deltaClass = delta > 0 ? 'impact-up' : delta < 0 ? 'impact-down' : '';
    html += `
      <div class="impact-row">
        <span class="impact-scope">Overall Score</span>
        <span class="impact-values">${before} → ${after} <span class="${deltaClass}">(${deltaStr})</span></span>
      </div>
    `;
  }

  html += '</div>';
  preview.innerHTML = html;
}

function closeEditModal() {
  document.getElementById('edit-modal').classList.remove('open');
  document.getElementById('edit-modal-overlay').classList.remove('open');
  editContext = null;
}

async function saveEdit() {
  if (!editContext) return;

  const motivation = document.getElementById('edit-motivation').value.trim();
  if (!motivation) {
    document.getElementById('edit-motivation').style.borderColor = '#ef4444';
    document.getElementById('edit-motivation').setAttribute('placeholder', 'Motivation is required — please explain why you are changing this score.');
    document.getElementById('edit-motivation').focus();
    return;
  }

  const newScore = parseFloat(document.getElementById('edit-score-slider').value);
  const newRationale = document.getElementById('edit-rationale').value.trim() || editContext.originalRationale;

  await saveScoreChange(
    editContext.nodeId,
    editContext.companyKey,
    editContext.originalScore,
    newScore,
    editContext.originalRationale,
    newRationale,
    motivation
  );

  // Apply immediately to the live data
  const node = findNode(DECISION_TREE, editContext.nodeId);
  if (node?.scores?.[editContext.companyKey]) {
    node.scores[editContext.companyKey].score = newScore;
    node.scores[editContext.companyKey].rationale = newRationale;
  }

  closeEditModal();

  // Re-render affected views
  if (selectedNode) {
    renderDetail(selectedNode);
  }
  renderCompare();
  renderScenarios();
  renderProfiles();
}

// ── Inline Score History ──
function renderInlineHistory(nodeId, companyKey) {
  const entries = scoreChangeLog.filter(e => e.nodeId === nodeId && e.company === companyKey);
  if (entries.length === 0) return '';

  const rows = [...entries].reverse().map(entry => {
    const originalIndex = scoreChangeLog.indexOf(entry);
    const date = new Date(entry.timestamp);
    const timeStr = date.toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
    const delta = entry.newScore - entry.oldScore;
    const deltaStr = delta > 0 ? `+${delta.toFixed(1)}` : delta.toFixed(1);
    const deltaClass = delta > 0 ? 'history-up' : delta < 0 ? 'history-down' : '';

    return `
      <div class="inline-history-entry">
        <div class="inline-history-top">
          <span class="inline-history-scores">${entry.oldScore.toFixed(1)} → ${entry.newScore.toFixed(1)} <span class="${deltaClass}">(${deltaStr})</span></span>
          <span style="display:flex;align-items:center;gap:6px;">
            <span class="inline-history-time">${timeStr}</span>
            <button class="delete-change-btn" onclick="deleteChange(${originalIndex})" title="Delete this edit">×</button>
          </span>
        </div>
        <div class="inline-history-motivation">${entry.motivation}</div>
      </div>
    `;
  }).join('');

  return `
    <div class="inline-history">
      <div class="inline-history-label">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="10"/></svg>
        Change History (${entries.length})
      </div>
      ${rows}
    </div>
  `;
}

// ── Change Log Rendering ──
function renderChangeLog() {
  const container = document.getElementById('changelog-container');

  if (scoreChangeLog.length === 0) {
    container.innerHTML = `
      <div class="detail-placeholder" style="padding:60px 20px;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.3">
          <path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="10"/>
        </svg>
        <h3>No changes recorded yet</h3>
        <p>When you edit a score in the Decision Tree view, the change and your motivation will appear here.</p>
      </div>
    `;
    return;
  }

  let html = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;">
      <h2 style="color:var(--text-primary);margin:0;">Score Change Log</h2>
      <button class="reset-btn" onclick="resetAllChanges()">Reset All Changes</button>
    </div>
    <p style="color:var(--text-secondary);margin-bottom:24px;font-size:14px;">${scoreChangeLog.length} change${scoreChangeLog.length !== 1 ? 's' : ''} recorded</p>
  `;

  // Show newest first
  const entries = scoreChangeLog.map((entry, i) => ({ ...entry, originalIndex: i })).reverse();

  for (const entry of entries) {
    const date = new Date(entry.timestamp);
    const timeStr = date.toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    const scoreDelta = entry.newScore - entry.oldScore;
    const deltaStr = scoreDelta > 0 ? `+${scoreDelta.toFixed(1)}` : scoreDelta.toFixed(1);
    const deltaClass = scoreDelta > 0 ? 'score-color-high' : scoreDelta < 0 ? 'score-color-low' : 'score-color-mid';

    html += `
      <div class="changelog-entry">
        <div class="changelog-header">
          <div>
            <span class="score-company-name ${entry.company}" style="font-size:13px;">${entry.companyName}</span>
            <span style="color:var(--text-secondary);font-size:13px;margin:0 6px;">→</span>
            <span style="color:var(--text-primary);font-size:13px;font-weight:500;">${entry.nodeLabel}</span>
          </div>
          <span style="display:flex;align-items:center;gap:8px;">
            <span style="color:var(--text-tertiary);font-size:12px;">${timeStr}</span>
            <button class="delete-change-btn" onclick="deleteChange(${entry.originalIndex})" title="Delete this edit">×</button>
          </span>
        </div>
        <div class="changelog-score-change">
          <span class="score-badge score-color-mid" style="font-size:12px;padding:2px 8px;">${entry.oldScore.toFixed(1)}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" stroke-width="2" style="margin:0 4px;"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          <span class="score-badge ${deltaClass}" style="font-size:12px;padding:2px 8px;">${entry.newScore.toFixed(1)}</span>
          <span style="color:var(--text-tertiary);font-size:12px;margin-left:8px;">(${deltaStr})</span>
        </div>
        <div class="changelog-motivation">
          <strong style="color:var(--text-secondary);font-size:11px;text-transform:uppercase;letter-spacing:0.5px;">Motivation</strong>
          <p style="color:var(--text-primary);font-size:13px;margin:4px 0 0;line-height:1.5;">${entry.motivation}</p>
        </div>
        ${entry.newRationale !== entry.oldRationale ? `
          <div style="margin-top:8px;padding-top:8px;border-top:1px solid var(--border-subtle);">
            <strong style="color:var(--text-secondary);font-size:11px;text-transform:uppercase;letter-spacing:0.5px;">Updated Rationale</strong>
            <p style="color:var(--text-secondary);font-size:13px;margin:4px 0 0;line-height:1.5;">${entry.newRationale}</p>
          </div>
        ` : ''}
      </div>
    `;
  }

  container.innerHTML = html;
}

async function resetAllChanges() {
  if (!confirm('Reset all score changes? This will revert all edited scores to their original values and clear the change log.')) return;

  try {
    await fetch('/api/changes/reset', { method: 'POST' });
  } catch (err) {
    console.error('Failed to reset changes:', err);
  }

  // Reload the page to restore original scores from the hardcoded data
  location.reload();
}

async function deleteChange(index) {
  try {
    const res = await fetch(`/api/changes/${index}`, { method: 'DELETE' });
    const data = await res.json();
    scoreChangeLog = data.changelog;
    scoreOverrides = data.overrides;

    // Reload to reapply overrides from scratch
    location.reload();
  } catch (err) {
    console.error('Failed to delete change:', err);
  }
}

// ── Initialization ──
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const [changesRes, docsRes, treeRes] = await Promise.all([
      fetch('/api/changes'),
      fetch('/api/documents'),
      fetch('/api/tree')
    ]);
    const data = await changesRes.json();
    scoreChangeLog = data.changelog || [];
    scoreOverrides = data.overrides || {};
    const docsData = await docsRes.json();
    documents = docsData.documents || [];
    const treeData = await treeRes.json();
    if (treeData.tree) {
      DECISION_TREE = treeData.tree;
    }
  } catch (err) {
    console.error('Failed to load data from server:', err);
  }
  applyScoreOverrides();
  renderTree();
  renderProfiles();
  renderCompare();
  renderScenarios();
});

// ── View Switching ──
function switchView(view) {
  currentView = view;
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById(`view-${view}`).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.view === view);
  });
  if (view === 'changelog') renderChangeLog();
  if (view === 'documents') renderDocuments();
}

// ── Tree Rendering ──
function renderTree() {
  const container = document.getElementById('tree-container');
  container.innerHTML = '<div class="tree-root-label">Decision Framework</div>';
  container.appendChild(renderTreeNode(DECISION_TREE, 0, []));
}

function renderTreeNode(node, level, path) {
  const div = document.createElement('div');
  div.className = 'tree-node';

  const hasChildren = node.children && node.children.length > 0;
  const currentPath = [...path, node.label];

  const header = document.createElement('div');
  header.className = 'tree-node-header';
  header.style.paddingLeft = `${level * 4 + 10}px`;
  header.dataset.nodeId = node.id;

  const toggleSvg = hasChildren
    ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>'
    : '';

  header.innerHTML = `
    <span class="tree-toggle ${hasChildren ? 'expanded' : 'hidden'}">${toggleSvg}</span>
    <span class="node-icon level-${Math.min(level, 3)}">${level === 0 ? '⚓' : level === 1 ? (node.id === 'cap' ? '🎯' : node.id === 'del' ? '📅' : node.id === 'cost' ? '💰' : '🏭') : '●'}</span>
    <span class="node-label">${node.label}</span>
    ${node.weight ? `<span class="node-weight">${node.weight}</span>` : ''}
    ${node.id === 'root' ? `<button class="tree-edit-icon" title="Edit tree structure"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.83 2.83 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg></button>` : ''}
  `;

  // Attach pen icon click handler for root node
  if (node.id === 'root') {
    const editIcon = header.querySelector('.tree-edit-icon');
    if (editIcon) {
      editIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        openTreeEditor();
      });
    }
  }

  header.addEventListener('click', (e) => {
    e.stopPropagation();

    // Toggle expand/collapse
    if (hasChildren) {
      const toggle = header.querySelector('.tree-toggle');
      const children = div.querySelector('.tree-children');
      const isExpanded = toggle.classList.contains('expanded');
      toggle.classList.toggle('expanded');
      if (isExpanded) {
        children.classList.add('collapsed');
      } else {
        children.classList.remove('collapsed');
      }
    }

    // Select node
    document.querySelectorAll('.tree-node-header.selected').forEach(h => h.classList.remove('selected'));
    header.classList.add('selected');
    selectedNode = node;
    renderDetail(node, currentPath);
  });

  div.appendChild(header);

  if (hasChildren) {
    const childrenDiv = document.createElement('div');
    childrenDiv.className = 'tree-children';
    node.children.forEach(child => {
      childrenDiv.appendChild(renderTreeNode(child, level + 1, currentPath));
    });
    div.appendChild(childrenDiv);
  }

  return div;
}

// ── Detail Panel ──
function renderDetail(node, path) {
  const panel = document.getElementById('detail-panel');

  const breadcrumb = path.map((p, i) =>
    i < path.length - 1 ? `<span>${p}</span><span class="sep">›</span>` : `<span>${p}</span>`
  ).join('');

  let html = `
    <div class="detail-header">
      <div class="detail-breadcrumb">${breadcrumb}</div>
      <h2 class="detail-title">${node.label}</h2>
      ${node.weight ? `<div class="detail-weight-badge">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        Weight: ${node.weight}
      </div>` : ''}
    </div>
    <p class="detail-description">${node.description}</p>
  `;

  // Influence vectors
  if (node.influences && node.influences.length > 0) {
    html += `
      <div class="influence-section">
        <div class="section-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
          Influence Vectors
        </div>
        <div>
          ${node.influences.map(inf =>
            `<span class="influence-tag ${inf.level}">${inf.level === 'high' ? '↑' : inf.level === 'medium' ? '→' : '↓'} ${inf.text}</span>`
          ).join('')}
        </div>
      </div>
    `;
  }

  // Scores
  if (node.scores) {
    html += `
      <div class="section-title mb-16">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>
        Company Scores
      </div>
      <div class="scores-grid">
    `;

    for (const [key, data] of Object.entries(node.scores)) {
      const company = COMPANIES[key];
      const scoreColor = data.score >= 8 ? 'score-color-high' : data.score >= 6 ? 'score-color-mid' : 'score-color-low';

      const hasOverride = scoreOverrides[`${node.id}::${key}`];
      html += `
        <div class="score-card expanded ${key}">
          <div class="score-card-header" onclick="this.parentElement.classList.toggle('expanded')">
            <span class="score-company-name ${key}">${company.name}</span>
            <div style="display:flex;align-items:center;gap:8px;">
              ${hasOverride ? '<span class="edit-indicator" title="Score has been manually edited">edited</span>' : ''}
              <span class="score-badge ${scoreColor}">${data.score.toFixed(1)}</span>
              <button class="edit-score-btn" onclick="event.stopPropagation(); openEditModal('${node.id}', '${key}')" title="Edit score">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <svg class="score-card-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
            </div>
          </div>
          <div class="score-card-body">
            <div class="score-bar">
              <div class="score-bar-fill ${key}" style="width: ${data.score * 10}%"></div>
            </div>
            <div class="score-rationale">${data.rationale}</div>
            ${renderInlineHistory(node.id, key)}
            <div class="score-actions">
              <button class="score-action-btn primary" onclick="openAI('improve', '${key}', '${node.id}')">Improve Score</button>
              <button class="score-action-btn" onclick="openAI('actions', '${key}', '${node.id}')">Suggest Actions</button>
              <button class="score-action-btn" onclick="openAI('challenge', '${key}', '${node.id}')">Challenge</button>
            </div>
          </div>
        </div>
      `;
    }

    html += '</div>';
  }

  // If this is a category node (has children with scores), show aggregate
  if (node.children && !node.scores) {
    const aggregates = computeAggregateScores(node);
    if (aggregates) {
      html += `
        <div class="section-title mb-16">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>
          Aggregate Scores (Weighted Average)
        </div>
        <div class="scores-grid">
      `;

      for (const [key, score] of Object.entries(aggregates)) {
        const company = COMPANIES[key];
        const scoreColor = score >= 8 ? 'score-color-high' : score >= 6 ? 'score-color-mid' : 'score-color-low';

        html += `
          <div class="score-card expanded ${key}">
            <div class="score-card-header" onclick="this.parentElement.classList.toggle('expanded')">
              <span class="score-company-name ${key}">${company.name}</span>
              <div style="display:flex;align-items:center;gap:8px;">
                <span class="score-badge ${scoreColor}">${score.toFixed(1)}</span>
                <svg class="score-card-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
              </div>
            </div>
            <div class="score-card-body">
              <div class="score-bar">
                <div class="score-bar-fill ${key}" style="width: ${score * 10}%"></div>
              </div>
              <div class="score-rationale">Weighted average across ${countLeafNodes(node)} evaluation criteria in this category.</div>
              <div class="score-actions">
                <button class="score-action-btn primary" onclick="openAI('analyze', '${key}', '${node.id}')">Deep Analysis</button>
                <button class="score-action-btn" onclick="openAI('strategy', '${key}', '${node.id}')">Win Strategy</button>
              </div>
            </div>
          </div>
        `;
      }

      html += '</div>';
    }
  }

  // AI Analysis button for nodes without scores
  html += `
    <div style="margin-top: 24px;">
      <button class="score-action-btn primary" style="padding: 8px 16px; font-size: 13px;" onclick="openAI('explore', null, '${node.id}')">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline;vertical-align:middle;margin-right:4px;"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
        Explore with AI
      </button>
    </div>
  `;

  panel.innerHTML = html;
}

// ── Score Computation ──
function computeAggregateScores(node) {
  const companies = ['scania', 'volvo', 'man'];
  const result = {};
  let hasScores = false;

  for (const company of companies) {
    const { weightedSum, totalWeight } = collectScores(node, company);
    if (totalWeight > 0) {
      result[company] = weightedSum / totalWeight;
      hasScores = true;
    }
  }

  return hasScores ? result : null;
}

function collectScores(node, company) {
  let weightedSum = 0;
  let totalWeight = 0;

  if (node.scores && node.scores[company]) {
    const weight = parseFloat(node.weight) || 1;
    weightedSum += node.scores[company].score * weight;
    totalWeight += weight;
  }

  if (node.children) {
    for (const child of node.children) {
      const childResult = collectScores(child, company);
      weightedSum += childResult.weightedSum;
      totalWeight += childResult.totalWeight;
    }
  }

  return { weightedSum, totalWeight };
}

function countLeafNodes(node) {
  if (!node.children || node.children.length === 0) return 1;
  return node.children.reduce((sum, child) => sum + countLeafNodes(child), 0);
}

function getOverallScore(company) {
  const { weightedSum, totalWeight } = collectScores(DECISION_TREE, company);
  return totalWeight > 0 ? weightedSum / totalWeight : 0;
}

// ── Profiles View ──
function renderProfiles() {
  const container = document.getElementById('profiles-container');

  let sidebarHtml = '<div class="profiles-sidebar">';
  sidebarHtml += '<div class="tree-root-label" style="padding:0 8px 12px;">Competitors</div>';

  const companyKeys = Object.keys(COMPANIES);
  companyKeys.forEach((key, i) => {
    const c = COMPANIES[key];
    sidebarHtml += `
      <div class="profile-tab ${i === 0 ? 'active' : ''}" data-company="${key}" onclick="selectProfile('${key}')">
        <div class="profile-tab-dot" style="background:${c.color}"></div>
        <div class="profile-tab-info">
          <h4>${c.name}</h4>
          <p>${c.country} — ${c.platform.split('(')[0].trim()}</p>
        </div>
      </div>
    `;
  });

  sidebarHtml += '</div>';

  container.innerHTML = sidebarHtml + '<div class="profile-main" id="profile-main"></div>';
  selectProfile(companyKeys[0]);
}

function selectProfile(companyKey) {
  document.querySelectorAll('.profile-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.company === companyKey);
  });

  const c = COMPANIES[companyKey];
  const overall = getOverallScore(companyKey);
  const catScores = DECISION_TREE.children.map(cat => ({
    label: cat.label,
    score: computeAggregateScores(cat)?.[companyKey] || 0
  }));

  let html = `
    <div class="profile-header-card ${companyKey}">
      <div class="profile-header-top">
        <div>
          <div class="profile-company-title">${c.name}</div>
          <div class="profile-platform-name">${c.platform} — ${c.country}</div>
        </div>
        <div class="profile-overall-score">
          <div class="label">Overall Score</div>
          <div class="value ${overall >= 8 ? 'score-color-high' : overall >= 6 ? 'score-color-mid' : 'score-color-low'}">${overall.toFixed(1)}</div>
        </div>
      </div>
      <div class="profile-stats">
        ${catScores.map(cs => `
          <div class="profile-stat">
            <div class="stat-value ${cs.score >= 8 ? 'score-color-high' : cs.score >= 6 ? 'score-color-mid' : 'score-color-low'}">${cs.score.toFixed(1)}</div>
            <div class="stat-label">${cs.label.replace('&', '&amp;')}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Specs
  html += '<div class="section-title mb-16">Platform Specifications</div>';
  html += '<div class="profile-specs">';
  for (const [label, value] of Object.entries(c.specs)) {
    html += `<div class="spec-item"><div class="spec-label">${label}</div><div class="spec-value">${value}</div></div>`;
  }
  html += '</div>';

  // Strengths & Weaknesses
  html += `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:24px;">
      <div>
        <div class="section-title mb-16" style="color:var(--green)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          Strengths
        </div>
        <ul style="list-style:none;font-size:13px;">
          ${c.strengths.map(s => `<li style="margin-bottom:8px;padding-left:12px;border-left:2px solid var(--green-dim);color:var(--text-dim);">${s}</li>`).join('')}
        </ul>
      </div>
      <div>
        <div class="section-title mb-16" style="color:var(--red)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
          Weaknesses & Risks
        </div>
        <ul style="list-style:none;font-size:13px;">
          ${c.weaknesses.map(w => `<li style="margin-bottom:8px;padding-left:12px;border-left:2px solid var(--red-dim);color:var(--text-dim);">${w}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;

  // Detailed scores table
  html += '<div class="section-title mb-16">Detailed Score Breakdown</div>';
  html += '<table class="profile-scores-table"><thead><tr><th>Criterion</th><th>Weight</th><th>Score</th><th></th></tr></thead><tbody>';

  function renderScoreRows(node, depth = 0) {
    let rows = '';
    if (node.children) {
      for (const child of node.children) {
        if (child.children && child.children.length > 0) {
          const agg = computeAggregateScores(child);
          const score = agg?.[companyKey] || 0;
          rows += `<tr class="${depth === 0 ? 'category-row' : 'clickable-row'}" onclick="navigateToNode('${child.id}')">
            <td style="padding-left:${depth * 20 + 12}px">${child.label}</td>
            <td>${child.weight || ''}</td>
            <td class="score-cell ${score >= 8 ? 'score-color-high' : score >= 6 ? 'score-color-mid' : 'score-color-low'}">${score.toFixed(1)}</td>
            <td><div class="mini-bar"><div class="mini-bar-fill ${companyKey}" style="width:${score*10}%"></div></div></td>
          </tr>`;
          rows += renderScoreRows(child, depth + 1);
        } else if (child.scores && child.scores[companyKey]) {
          const s = child.scores[companyKey];
          rows += `<tr class="clickable-row" onclick="navigateToNode('${child.id}')">
            <td style="padding-left:${depth * 20 + 12}px">${child.label}</td>
            <td>${child.weight || ''}</td>
            <td class="score-cell ${s.score >= 8 ? 'score-color-high' : s.score >= 6 ? 'score-color-mid' : 'score-color-low'}">${s.score.toFixed(1)}</td>
            <td><div class="mini-bar"><div class="mini-bar-fill ${companyKey}" style="width:${s.score*10}%"></div></div></td>
          </tr>`;
        }
      }
    }
    return rows;
  }

  html += renderScoreRows(DECISION_TREE);
  html += '</tbody></table>';

  // AI button
  html += `
    <button class="score-action-btn primary" style="padding:10px 20px;font-size:13px;" onclick="openAI('profile', '${companyKey}', 'root')">
      Analyze ${c.name}'s Overall Position with AI
    </button>
  `;

  document.getElementById('profile-main').innerHTML = html;
}

function navigateToNode(nodeId) {
  const node = findNode(DECISION_TREE, nodeId);
  if (node) {
    switchView('tree');
    const path = findPath(DECISION_TREE, nodeId) || [node.label];

    // Select in tree
    document.querySelectorAll('.tree-node-header.selected').forEach(h => h.classList.remove('selected'));
    const header = document.querySelector(`[data-node-id="${nodeId}"]`);
    if (header) {
      header.classList.add('selected');
      // Expand parents
      let parent = header.closest('.tree-children');
      while (parent) {
        parent.classList.remove('collapsed');
        const parentToggle = parent.previousElementSibling?.querySelector('.tree-toggle');
        if (parentToggle) parentToggle.classList.add('expanded');
        parent = parent.parentElement?.closest('.tree-children');
      }
      header.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    selectedNode = node;
    renderDetail(node, path);
  }
}

function findNode(tree, id) {
  if (tree.id === id) return tree;
  if (tree.children) {
    for (const child of tree.children) {
      const found = findNode(child, id);
      if (found) return found;
    }
  }
  return null;
}

function findParent(tree, id) {
  if (tree.children) {
    for (const child of tree.children) {
      if (child.id === id) return tree;
      const found = findParent(child, id);
      if (found) return found;
    }
  }
  return null;
}

function findPath(tree, id, current = []) {
  const path = [...current, tree.label];
  if (tree.id === id) return path;
  if (tree.children) {
    for (const child of tree.children) {
      const found = findPath(child, id, path);
      if (found) return found;
    }
  }
  return null;
}

// ── Compare View ──
function renderCompare() {
  const container = document.getElementById('compare-container');

  let html = `
    <div class="compare-header">
      <h2>Competitive Comparison</h2>
      <p>Side-by-side scoring across all evaluation criteria. Green dot indicates category leader.</p>
    </div>
    <table class="compare-table">
      <thead>
        <tr>
          <th>Criterion</th>
          <th>Weight</th>
          <th class="company-col" style="color:var(--scania)">Scania<br><small style="font-weight:400;opacity:0.6">Touring HD</small></th>
          <th class="company-col" style="color:var(--volvo)">Volvo Buses<br><small style="font-weight:400;opacity:0.6">9700/8900</small></th>
          <th class="company-col" style="color:var(--man)">MAN<br><small style="font-weight:400;opacity:0.6">Lions Coach</small></th>
        </tr>
      </thead>
      <tbody>
  `;

  // Overall
  const companies = ['scania', 'volvo', 'man'];
  const overallScores = companies.map(c => getOverallScore(c));
  const overallMax = Math.max(...overallScores);

  html += `<tr class="cat-row" style="background:rgba(59,130,246,0.08)">
    <td style="font-size:14px;">OVERALL WEIGHTED SCORE</td>
    <td>100%</td>
    ${overallScores.map((s, i) => `<td class="score-cell ${s >= 8 ? 'score-color-high' : s >= 6 ? 'score-color-mid' : 'score-color-low'}">${s.toFixed(1)}${s === overallMax ? '<span class="winner-indicator"></span>' : ''}</td>`).join('')}
  </tr>`;

  function renderCompareRows(node, depth = 0) {
    let rows = '';
    if (node.children) {
      for (const child of node.children) {
        const scores = [];
        if (child.scores) {
          companies.forEach(c => scores.push(child.scores[c]?.score || 0));
        } else {
          const agg = computeAggregateScores(child);
          companies.forEach(c => scores.push(agg?.[c] || 0));
        }

        const maxScore = Math.max(...scores);
        const isCategory = child.children && child.children.length > 0;

        rows += `<tr class="${isCategory && depth === 0 ? 'cat-row' : ''}" style="cursor:pointer" onclick="navigateToNode('${child.id}')">
          <td style="padding-left:${depth * 20 + 14}px;${isCategory && depth === 0 ? 'font-weight:700' : ''}">${child.label}</td>
          <td>${child.weight || ''}</td>
          ${scores.map((s, i) => `<td class="score-cell ${s >= 8 ? 'score-color-high' : s >= 6 ? 'score-color-mid' : 'score-color-low'}">${s.toFixed(1)}${s === maxScore && s > 0 ? '<span class="winner-indicator"></span>' : ''}</td>`).join('')}
        </tr>`;

        if (isCategory) {
          rows += renderCompareRows(child, depth + 1);
        }
      }
    }
    return rows;
  }

  html += renderCompareRows(DECISION_TREE);
  html += '</tbody></table>';

  container.innerHTML = html;
}

// ── Scenarios View ──
function renderScenarios() {
  const container = document.getElementById('scenarios-container');

  let html = `
    <div class="compare-header">
      <h2>Procurement Scenarios</h2>
      <p>Four potential outcomes based on open-source analysis, plus custom scenario projection.</p>
    </div>
  `;

  // Custom scenario input area
  html += `
    <div class="scenario-input-area">
      <div class="scenario-input-area-header">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
        <span>Custom Scenario Projection</span>
      </div>
      <p class="scenario-input-description">Describe a hypothetical scenario and the AI will project how it would change scores across all criteria and companies.</p>
      <textarea id="scenario-input" rows="3" placeholder="e.g. Sweden decides crew size is the top priority and eliminates any ship requiring more than 100 crew...">${escapeHtml(scenarioDescription)}</textarea>
      <div class="scenario-input-actions">
        <button class="scenario-submit-btn" onclick="analyzeScenario()" ${scenarioAnalyzing ? 'disabled' : ''}>
          ${scenarioAnalyzing
            ? '<span class="scenario-spinner"></span> Analyzing...'
            : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg> Analyze Scenario'}
        </button>
      </div>
    </div>
  `;

  // Scenario results panel
  if (scenarioSuggestions.length > 0) {
    html += renderScenarioSuggestions();
  }

  // Static scenario cards
  SCENARIOS.forEach(s => {
    html += `
      <div class="scenario-card ${s.cssClass}">
        <div class="scenario-label">${s.label}</div>
        <div class="scenario-title">${s.title}</div>
        <div class="scenario-outcome">${s.outcome}</div>
        <div class="scenario-risks">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          <span>${s.risk}</span>
        </div>
        <button class="scenario-explore-btn" onclick="openAI('scenario', '${s.company}', '${s.id}')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
          Explore Scenario with AI
        </button>
      </div>
    `;
  });

  container.innerHTML = html;
}

function renderScenarioSuggestions() {
  const appliedKeys = new Set(
    scoreChangeLog
      .filter(e => e.motivation && e.motivation.startsWith('[Scenario:'))
      .map(e => `${e.nodeId}::${e.company}`)
  );

  let html = '<div class="scenario-results">';
  html += `
    <div class="scenario-results-header">
      <div class="scenario-results-info">
        <h4>Score Projections (${scenarioSuggestions.length})</h4>
        <p class="scenario-results-description">${escapeHtml(scenarioDescription)}</p>
      </div>
      <div class="scenario-results-actions">
        <button class="suggestion-apply-btn" onclick="applyAllScenarioSuggestions()">Apply All</button>
        <button class="scenario-clear-btn" onclick="clearScenarioResults()">Clear</button>
      </div>
    </div>
  `;

  for (let i = 0; i < scenarioSuggestions.length; i++) {
    const s = scenarioSuggestions[i];
    const key = `${s.nodeId}::${s.company}`;
    const isApplied = appliedKeys.has(key);
    const node = findNode(DECISION_TREE, s.nodeId);
    const currentScore = node?.scores?.[s.company]?.score;
    const companyName = COMPANIES[s.company]?.name || s.company;
    const companyClass = s.company;
    const nodePath = findPath(DECISION_TREE, s.nodeId);
    const pathStr = nodePath ? nodePath.slice(1, -1).join(' > ') : '';
    const scoreColor = s.suggestedScore >= 8 ? 'score-color-high' : s.suggestedScore >= 6 ? 'score-color-mid' : 'score-color-low';

    html += `
      <div class="suggestion-row ${isApplied ? 'applied' : ''}">
        <div class="suggestion-node">
          <div class="suggestion-node-label">${node?.label || s.nodeId}</div>
          ${pathStr ? `<div class="suggestion-node-path">${pathStr}</div>` : ''}
          <div class="suggestion-rationale">${escapeHtml(s.rationale || '')}</div>
        </div>
        <span class="suggestion-company score-company-name ${companyClass}">${companyName}</span>
        <div class="suggestion-scores">
          <span style="color:var(--text-muted)">${currentScore != null ? currentScore.toFixed(1) : '?'}</span>
          <span class="suggestion-arrow">&rarr;</span>
          <span class="${scoreColor}" style="font-weight:700">${s.suggestedScore.toFixed(1)}</span>
        </div>
        <span class="suggestion-confidence ${s.confidence || 'medium'}">${s.confidence || 'medium'}</span>
        ${isApplied
          ? '<span class="suggestion-apply-btn applied">Applied</span>'
          : `<button class="suggestion-apply-btn" onclick="applyScenarioSuggestion(${i})">Apply</button>`
        }
      </div>
    `;
  }

  html += '</div>';
  return html;
}

async function analyzeScenario() {
  const textarea = document.getElementById('scenario-input');
  const text = textarea.value.trim();
  if (!text || scenarioAnalyzing) return;

  scenarioDescription = text;
  scenarioAnalyzing = true;
  scenarioSuggestions = [];
  renderScenarios();

  const leafNodes = collectLeafNodes(DECISION_TREE, [], true);

  try {
    const res = await fetch('/api/scenarios/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scenario: text, leafNodes })
    });

    if (!res.ok) {
      const err = await res.json();
      alert('Scenario analysis failed: ' + (err.error || 'Unknown error'));
      scenarioAnalyzing = false;
      renderScenarios();
      return;
    }

    const result = await res.json();
    scenarioSuggestions = result.suggestions || [];
  } catch (err) {
    console.error('Scenario analysis error:', err);
    alert('Scenario analysis failed: ' + err.message);
  }

  scenarioAnalyzing = false;
  renderScenarios();
}

async function applyScenarioSuggestion(index) {
  const s = scenarioSuggestions[index];
  if (!s) return;

  const node = findNode(DECISION_TREE, s.nodeId);
  if (!node?.scores?.[s.company]) return;

  const currentData = node.scores[s.company];
  const motivation = `[Scenario: ${scenarioDescription.slice(0, 80)}] ${s.rationale || 'AI-projected score change'}`;
  const newRationale = s.rationale || currentData.rationale;

  await saveScoreChange(
    s.nodeId,
    s.company,
    currentData.score,
    s.suggestedScore,
    currentData.rationale,
    newRationale,
    motivation
  );

  node.scores[s.company].score = s.suggestedScore;
  node.scores[s.company].rationale = newRationale;

  renderScenarios();
  if (selectedNode) renderDetail(selectedNode);
  renderCompare();
  renderProfiles();
}

async function applyAllScenarioSuggestions() {
  const appliedKeys = new Set(
    scoreChangeLog
      .filter(e => e.motivation && e.motivation.startsWith('[Scenario:'))
      .map(e => `${e.nodeId}::${e.company}`)
  );

  for (let i = 0; i < scenarioSuggestions.length; i++) {
    const s = scenarioSuggestions[i];
    const key = `${s.nodeId}::${s.company}`;
    if (appliedKeys.has(key)) continue;

    const node = findNode(DECISION_TREE, s.nodeId);
    if (!node?.scores?.[s.company]) continue;

    const currentData = node.scores[s.company];
    const motivation = `[Scenario: ${scenarioDescription.slice(0, 80)}] ${s.rationale || 'AI-projected score change'}`;
    const newRationale = s.rationale || currentData.rationale;

    await saveScoreChange(
      s.nodeId,
      s.company,
      currentData.score,
      s.suggestedScore,
      currentData.rationale,
      newRationale,
      motivation
    );

    node.scores[s.company].score = s.suggestedScore;
    node.scores[s.company].rationale = newRationale;
  }

  renderScenarios();
  if (selectedNode) renderDetail(selectedNode);
  renderCompare();
  renderProfiles();
}

function clearScenarioResults() {
  scenarioSuggestions = [];
  scenarioDescription = '';
  scenarioAnalyzing = false;
  renderScenarios();
}

// ── AI Panel ──
function openAI(mode, companyKey, nodeId) {
  const panel = document.getElementById('ai-panel');
  const overlay = document.getElementById('ai-overlay');

  panel.classList.add('open');
  overlay.classList.add('open');

  // Clear previous conversation
  aiMessages = [];
  document.getElementById('ai-messages').innerHTML = '';

  const node = findNode(DECISION_TREE, nodeId);
  const company = companyKey ? COMPANIES[companyKey] : null;

  // Set context
  let contextParts = [];
  if (node) contextParts.push(`Decision node: "${node.label}" (${node.weight || 'N/A'} weight) — ${node.description}`);
  if (company) contextParts.push(`Company: ${company.name} (${company.country}) offering ${company.platform}`);
  if (node?.scores?.[companyKey]) contextParts.push(`Current score: ${node.scores[companyKey].score}/10 — ${node.scores[companyKey].rationale}`);
  aiContext = contextParts.join('\n');

  const contextLabel = document.getElementById('ai-context-label');
  contextLabel.textContent = company ? `${company.name} — ${node?.label || 'Overall'}` : (node?.label || 'General Analysis');

  // Set quick actions based on mode
  const quickActions = document.getElementById('ai-quick-actions');
  let actions = [];

  switch (mode) {
    case 'improve':
      actions = [
        `How can ${company.name} improve their score on ${node.label}?`,
        `What concrete steps would raise this from ${node.scores?.[companyKey]?.score} to 8+?`,
        `What partnerships or investments would help?`,
        `Compare ${company.name}'s position to competitors here`
      ];
      break;
    case 'actions':
      actions = [
        `What should ${company.name} do in the next 6 months?`,
        `What diplomatic actions would strengthen their bid?`,
        `How should they engage Swedish stakeholders?`,
        `What technical demonstrations would help?`
      ];
      break;
    case 'challenge':
      actions = [
        `I think this score is too high — make the case for a lower score`,
        `I think this score is too low — argue for a higher score`,
        `What evidence supports this specific score?`,
        `How might this score change if circumstances shift?`
      ];
      break;
    case 'analyze':
      actions = [
        `What are ${company.name}'s biggest vulnerabilities in ${node.label}?`,
        `Where does ${company.name} have the strongest advantage?`,
        `How could competitors close the gap?`,
        `What would a winning strategy look like?`
      ];
      break;
    case 'strategy':
      actions = [
        `Design a comprehensive win strategy for ${company.name}`,
        `What are the three most impactful moves ${company.name} can make?`,
        `How should ${company.name} position against each competitor?`,
        `What narrative should ${company.name} push with FMV?`
      ];
      break;
    case 'profile':
      actions = [
        `Give me a SWOT analysis for ${company.name}`,
        `What is ${company.name}'s probability of winning?`,
        `What is ${company.name}'s strongest argument to FMV?`,
        `What would disqualify or severely damage ${company.name}'s bid?`
      ];
      break;
    case 'scenario':
      const scenario = SCENARIOS.find(s => s.id === nodeId);
      actions = [
        `Walk me through how ${scenario?.title || 'this scenario'} would play out`,
        `What are the second and third-order consequences?`,
        `How would the losing bidders likely respond?`,
        `What signals would indicate this scenario is becoming likely?`
      ];
      break;
    case 'explore':
      actions = [
        `Explain the key dynamics at play in ${node.label}`,
        `What are the most important influence vectors here?`,
        `How does this criterion connect to the broader decision?`,
        `What information is missing from public sources?`
      ];
      break;
    default:
      actions = [
        'Analyze the overall competitive landscape',
        'Who is most likely to win and why?',
        'What are the key uncertainties?',
        'What should we watch for in the coming months?'
      ];
  }

  quickActions.innerHTML = actions.map(a =>
    `<button class="quick-action-btn" onclick="sendQuickAction(this, \`${a.replace(/`/g, "'")}\`)">${a.length > 55 ? a.substring(0, 55) + '...' : a}</button>`
  ).join('');

  // Auto-send an initial analysis based on mode
  let initialPrompt = '';
  switch (mode) {
    case 'improve':
      initialPrompt = `Analyze how ${company.name} could improve their score on "${node.label}" (currently ${node.scores?.[companyKey]?.score}/10). Provide specific, actionable recommendations.`;
      break;
    case 'actions':
      initialPrompt = `What specific actions should ${company.name} take to strengthen their position on "${node.label}"? Focus on concrete, near-term steps they could realistically implement.`;
      break;
    case 'challenge':
      initialPrompt = `Critically examine whether ${company.name}'s score of ${node.scores?.[companyKey]?.score}/10 on "${node.label}" is justified. Present arguments for both a higher and lower score, then give your assessment.`;
      break;
    case 'analyze':
      initialPrompt = `Provide a deep analysis of ${company.name}'s position across the "${node.label}" category. What are their key strengths, vulnerabilities, and strategic options?`;
      break;
    case 'strategy':
      initialPrompt = `Design a comprehensive strategy for ${company.name} to maximize their score in the "${node.label}" category. What should they prioritize and why?`;
      break;
    case 'profile':
      initialPrompt = `Provide a comprehensive assessment of ${company.name}'s overall competitive position in the Buss 49P procurement. Cover strengths, weaknesses, opportunities, and threats.`;
      break;
    case 'scenario':
      const sc = SCENARIOS.find(s => s.id === nodeId);
      initialPrompt = `Analyze the scenario: "${sc?.title}". Walk through how it would unfold, including political dynamics, industrial implications, and strategic consequences for Sweden.`;
      break;
    case 'explore':
      initialPrompt = `Explain the key dynamics and considerations for "${node.label}" in the Buss 49P procurement decision. What makes this criterion important and how do the three candidates compare?`;
      break;
  }

  if (initialPrompt) {
    addMessage('user', initialPrompt);
    fetchAIResponse();
  }
}

function closeAIPanel() {
  document.getElementById('ai-panel').classList.remove('open');
  document.getElementById('ai-overlay').classList.remove('open');
}

function addMessage(role, content) {
  aiMessages.push({ role, content });
  const container = document.getElementById('ai-messages');

  const div = document.createElement('div');
  div.className = `ai-msg ${role}`;
  div.innerHTML = `
    <div class="ai-msg-label">${role === 'user' ? 'You' : 'Claude Opus 4.6'}</div>
    <div class="ai-msg-content">${role === 'assistant' ? formatMarkdown(content) : escapeHtml(content)}</div>
  `;

  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function showTypingIndicator() {
  const container = document.getElementById('ai-messages');
  const div = document.createElement('div');
  div.className = 'ai-msg assistant';
  div.id = 'typing-indicator';
  div.innerHTML = `
    <div class="ai-msg-label">Claude Opus 4.6</div>
    <div class="ai-msg-content"><div class="ai-typing"><span></span><span></span><span></span></div></div>
  `;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function removeTypingIndicator() {
  const indicator = document.getElementById('typing-indicator');
  if (indicator) indicator.remove();
}

async function fetchAIResponse() {
  if (isAILoading) return;
  isAILoading = true;
  document.getElementById('send-btn').disabled = true;
  showTypingIndicator();

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: aiMessages.map(m => ({ role: m.role, content: m.content })),
        context: aiContext
      })
    });

    removeTypingIndicator();

    if (!response.ok) {
      const errText = await response.text();
      let errMsg;
      try { errMsg = JSON.parse(errText).error; } catch { errMsg = `Server error (${response.status})`; }
      addMessage('assistant', `Error: ${errMsg}. Make sure you have set the ANTHROPIC_API_KEY environment variable.`);
      isAILoading = false;
      document.getElementById('send-btn').disabled = false;
      return;
    }

    const data = await response.json();

    if (data.error) {
      addMessage('assistant', `Error: ${data.error}. Make sure you have set the ANTHROPIC_API_KEY environment variable.`);
    } else {
      addMessage('assistant', data.content);
    }
  } catch (err) {
    removeTypingIndicator();
    addMessage('assistant', `Connection error: ${err.message}. Make sure the server is running and ANTHROPIC_API_KEY is set.`);
  }

  isAILoading = false;
  document.getElementById('send-btn').disabled = false;
}

function sendMessage() {
  const input = document.getElementById('ai-input');
  const text = input.value.trim();
  if (!text || isAILoading) return;

  input.value = '';
  addMessage('user', text);
  fetchAIResponse();
}

function sendQuickAction(btn, text) {
  if (isAILoading) return;
  addMessage('user', text);
  fetchAIResponse();
}

// ── Documents View ──
function collectLeafNodes(node, list = [], includeScores = false) {
  if (node.scores) {
    const entry = { id: node.id, label: node.label, description: node.description || '' };
    if (includeScores) {
      entry.scores = {};
      for (const [company, data] of Object.entries(node.scores)) {
        entry.scores[company] = data.score;
      }
    }
    list.push(entry);
  }
  if (node.children) {
    for (const child of node.children) collectLeafNodes(child, list, includeScores);
  }
  return list;
}

function renderDocuments() {
  const container = document.getElementById('documents-container');

  let html = `
    <div class="compare-header">
      <h2>Document Analysis</h2>
      <p>Upload PDF documents for AI-powered analysis against the 53 evaluation criteria.</p>
    </div>
  `;

  // Upload zone
  html += `
    <div class="upload-zone" id="upload-zone"
         ondragover="event.preventDefault(); this.classList.add('drag-over')"
         ondragleave="this.classList.remove('drag-over')"
         ondrop="event.preventDefault(); this.classList.remove('drag-over'); handleFileDrop(event)"
         onclick="document.getElementById('file-input').click()">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
        <polyline points="17 8 12 3 7 8"/>
        <line x1="12" y1="3" x2="12" y2="15"/>
      </svg>
      <h3>Drop a PDF here or click to upload</h3>
      <p>Documents will be analyzed against all evaluation criteria</p>
      <input type="file" id="file-input" accept=".pdf" style="display:none" onchange="handleFileSelect(event)">
    </div>
  `;

  // Document list
  if (documents.length === 0) {
    html += `
      <div class="doc-empty-state">
        <p>No documents uploaded yet. Upload a PDF to get started.</p>
      </div>
    `;
  } else {
    for (const doc of documents) {
      const isExpanded = expandedDocId === doc.id;
      const date = new Date(doc.uploadedAt);
      const dateStr = date.toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
      const suggestionCount = (doc.suggestions || []).length;

      // Check which suggestions have already been applied
      const appliedKeys = new Set(
        scoreChangeLog.filter(e => e.documentId === doc.id).map(e => `${e.nodeId}::${e.company}`)
      );

      html += `
        <div class="document-card ${isExpanded ? 'expanded' : ''}" data-doc-id="${doc.id}">
          <div class="document-card-header" onclick="toggleDocExpand('${doc.id}')">
            <div class="document-card-icon">PDF</div>
            <div class="document-card-info">
              <div class="document-card-filename">${escapeHtml(doc.filename)}</div>
              <div class="document-card-date">${dateStr}${suggestionCount > 0 ? ` &middot; ${suggestionCount} suggestion${suggestionCount !== 1 ? 's' : ''}` : ''}</div>
            </div>
            <span class="document-status ${doc.status}">${doc.status}</span>
            ${doc.status === 'uploaded' ? `<button class="doc-analyze-btn" onclick="event.stopPropagation(); analyzeDocument('${doc.id}')">Analyze</button>` : ''}
            ${doc.status === 'analyzed' ? `
              <label class="include-toggle" onclick="event.stopPropagation()">
                <input type="checkbox" ${doc.included ? 'checked' : ''} onchange="toggleDocumentIncluded('${doc.id}', this.checked)" title="${doc.included ? 'Included in assessment' : 'Excluded from assessment'}">
              </label>
            ` : ''}
            <div class="document-card-actions">
              <button class="doc-delete-btn" onclick="event.stopPropagation(); deleteDocument('${doc.id}')" title="Delete document">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
              </button>
              <svg class="doc-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
            </div>
          </div>
          <div class="document-card-body">
            ${renderDocumentSuggestions(doc, appliedKeys)}
          </div>
        </div>
      `;
    }
  }

  container.innerHTML = html;
}

function renderDocumentSuggestions(doc, appliedKeys) {
  if (!doc.suggestions || doc.suggestions.length === 0) {
    if (doc.status === 'analyzed') {
      return '<div class="document-suggestions"><div class="doc-empty-state">No relevant suggestions found in this document.</div></div>';
    }
    if (doc.status === 'analyzing') {
      return '<div class="document-suggestions"><div class="doc-empty-state">Analyzing document... this may take a minute.</div></div>';
    }
    if (doc.status === 'error') {
      return '<div class="document-suggestions"><div class="doc-empty-state" style="color:var(--red)">Analysis failed. Try again.</div></div>';
    }
    return '';
  }

  let html = '<div class="document-suggestions">';
  html += `
    <div class="suggestions-header">
      <h4>${doc.suggestions.length} Suggestion${doc.suggestions.length !== 1 ? 's' : ''}</h4>
    </div>
  `;

  for (let i = 0; i < doc.suggestions.length; i++) {
    const s = doc.suggestions[i];
    const key = `${s.nodeId}::${s.company}`;
    const isApplied = appliedKeys.has(key);
    const node = findNode(DECISION_TREE, s.nodeId);
    const currentScore = node?.scores?.[s.company]?.score;
    const companyName = COMPANIES[s.company]?.name || s.company;
    const companyClass = s.company;
    const nodePath = findPath(DECISION_TREE, s.nodeId);
    const pathStr = nodePath ? nodePath.slice(1, -1).join(' > ') : '';

    const scoreColor = s.suggestedScore >= 8 ? 'score-color-high' : s.suggestedScore >= 6 ? 'score-color-mid' : 'score-color-low';

    html += `
      <div class="suggestion-row ${isApplied ? 'applied' : ''}">
        <div class="suggestion-node">
          <div class="suggestion-node-label">${node?.label || s.nodeId}</div>
          ${pathStr ? `<div class="suggestion-node-path">${pathStr}</div>` : ''}
          <div class="suggestion-rationale">${escapeHtml(s.rationale || '')}</div>
          ${s.excerpt ? `<div class="suggestion-excerpt">${escapeHtml(s.excerpt)}</div>` : ''}
        </div>
        <span class="suggestion-company score-company-name ${companyClass}">${companyName}</span>
        <div class="suggestion-scores">
          <span style="color:var(--text-muted)">${currentScore != null ? currentScore.toFixed(1) : '?'}</span>
          <span class="suggestion-arrow">→</span>
          <span class="${scoreColor}" style="font-weight:700">${s.suggestedScore.toFixed(1)}</span>
        </div>
        <span class="suggestion-confidence ${s.confidence || 'medium'}">${s.confidence || 'medium'}</span>
        ${isApplied
          ? `<span class="suggestion-apply-btn applied">Applied</span>`
          : `<button class="suggestion-apply-btn" onclick="event.stopPropagation(); applyDocumentSuggestion('${doc.id}', ${i})">Apply</button>`
        }
      </div>
    `;
  }

  html += '</div>';
  return html;
}

function toggleDocExpand(docId) {
  expandedDocId = expandedDocId === docId ? null : docId;
  renderDocuments();
}

function handleFileDrop(event) {
  const files = event.dataTransfer.files;
  if (files.length > 0 && files[0].type === 'application/pdf') {
    uploadDocument(files[0]);
  }
}

function handleFileSelect(event) {
  const files = event.target.files;
  if (files.length > 0) {
    uploadDocument(files[0]);
  }
  event.target.value = ''; // reset so same file can be re-selected
}

async function uploadDocument(file) {
  const formData = new FormData();
  formData.append('pdf', file);

  try {
    const res = await fetch('/api/documents/upload', {
      method: 'POST',
      body: formData
    });

    if (!res.ok) {
      const err = await res.json();
      alert('Upload failed: ' + (err.error || 'Unknown error'));
      return;
    }

    const doc = await res.json();
    documents.push(doc);
    expandedDocId = doc.id;
    renderDocuments();
  } catch (err) {
    console.error('Upload error:', err);
    alert('Upload failed: ' + err.message);
  }
}

async function analyzeDocument(docId) {
  // Update local status to analyzing
  const doc = documents.find(d => d.id === docId);
  if (!doc) return;
  doc.status = 'analyzing';
  renderDocuments();

  // Collect leaf nodes
  const leafNodes = collectLeafNodes(DECISION_TREE);

  try {
    const res = await fetch(`/api/documents/${docId}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leafNodes })
    });

    if (!res.ok) {
      const err = await res.json();
      doc.status = 'error';
      renderDocuments();
      alert('Analysis failed: ' + (err.error || 'Unknown error'));
      return;
    }

    const result = await res.json();
    doc.status = result.status;
    doc.suggestions = result.suggestions;
    expandedDocId = docId;
    renderDocuments();
  } catch (err) {
    console.error('Analysis error:', err);
    doc.status = 'error';
    renderDocuments();
  }
}

async function applyDocumentSuggestion(docId, suggestionIndex) {
  const doc = documents.find(d => d.id === docId);
  if (!doc || !doc.suggestions[suggestionIndex]) return;

  const s = doc.suggestions[suggestionIndex];
  const node = findNode(DECISION_TREE, s.nodeId);
  if (!node?.scores?.[s.company]) return;

  const currentData = node.scores[s.company];
  const motivation = `[Document: ${doc.filename}] ${s.rationale || 'AI-suggested score update'}`;
  const newRationale = s.rationale || currentData.rationale;

  await saveScoreChange(
    s.nodeId,
    s.company,
    currentData.score,
    s.suggestedScore,
    currentData.rationale,
    newRationale,
    motivation,
    docId
  );

  // Apply immediately to live data
  node.scores[s.company].score = s.suggestedScore;
  node.scores[s.company].rationale = newRationale;

  // Re-render affected views
  renderDocuments();
  if (selectedNode) renderDetail(selectedNode);
  renderCompare();
  renderScenarios();
  renderProfiles();
}

async function toggleDocumentIncluded(docId, included) {
  try {
    const res = await fetch(`/api/documents/${docId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ included })
    });

    if (!res.ok) {
      alert('Failed to toggle document inclusion');
      return;
    }

    const result = await res.json();

    // Update local document
    const doc = documents.find(d => d.id === docId);
    if (doc) doc.included = included;

    // Update overrides from server response
    scoreChangeLog = result.changes.changelog;
    scoreOverrides = result.changes.overrides;

    // Reload to re-apply overrides from scratch
    location.reload();
  } catch (err) {
    console.error('Toggle error:', err);
  }
}

async function deleteDocument(docId) {
  const doc = documents.find(d => d.id === docId);
  if (!confirm(`Delete "${doc?.filename || docId}" and remove all its applied score changes?`)) return;

  try {
    const res = await fetch(`/api/documents/${docId}`, { method: 'DELETE' });
    if (!res.ok) {
      alert('Failed to delete document');
      return;
    }

    // Reload to re-apply state cleanly
    location.reload();
  } catch (err) {
    console.error('Delete error:', err);
  }
}

// ── Utilities ──
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function formatMarkdown(text) {
  // Escape HTML
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Code blocks (``` ... ```)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');
  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Bold and italic (bold first to avoid conflict)
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Process line by line for block elements
  const lines = html.split('\n');
  const output = [];
  let inList = false;
  let listType = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Headings
    const h3 = line.match(/^### (.+)$/);
    const h2 = line.match(/^## (.+)$/);
    const h1 = line.match(/^# (.+)$/);
    if (h3) { closeList(); output.push(`<h4>${h3[1]}</h4>`); continue; }
    if (h2) { closeList(); output.push(`<h3>${h2[1]}</h3>`); continue; }
    if (h1) { closeList(); output.push(`<h2>${h1[1]}</h2>`); continue; }

    // Horizontal rule
    if (/^---+$/.test(line.trim())) { closeList(); output.push('<hr>'); continue; }

    // Unordered list
    const ul = line.match(/^[\s]*[-*] (.+)$/);
    if (ul) {
      if (!inList || listType !== 'ul') { closeList(); output.push('<ul>'); inList = true; listType = 'ul'; }
      output.push(`<li>${ul[1]}</li>`);
      continue;
    }

    // Ordered list
    const ol = line.match(/^[\s]*(\d+)\. (.+)$/);
    if (ol) {
      if (!inList || listType !== 'ol') { closeList(); output.push('<ol>'); inList = true; listType = 'ol'; }
      output.push(`<li>${ol[2]}</li>`);
      continue;
    }

    // Non-list line — close any open list
    closeList();

    // Empty line = paragraph break
    if (line.trim() === '') {
      output.push('<br>');
    } else {
      output.push(`<p>${line}</p>`);
    }
  }
  closeList();

  return output.join('\n');

  function closeList() {
    if (inList) {
      output.push(listType === 'ol' ? '</ol>' : '</ul>');
      inList = false;
      listType = '';
    }
  }
}

/* ═══════════════════════════════════════════════════════
   Tree Structure Editor
   ═══════════════════════════════════════════════════════ */

function generateNodeId() {
  return `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function findNodeInTree(tree, nodeId) {
  if (tree.id === nodeId) return tree;
  if (tree.children) {
    for (const child of tree.children) {
      const found = findNodeInTree(child, nodeId);
      if (found) return found;
    }
  }
  return null;
}

function findParentInTree(tree, nodeId) {
  if (tree.children) {
    for (const child of tree.children) {
      if (child.id === nodeId) return tree;
      const found = findParentInTree(child, nodeId);
      if (found) return found;
    }
  }
  return null;
}

function openTreeEditor() {
  const overlay = document.getElementById('tree-editor-overlay');
  overlay.style.display = 'flex';
  renderEditorTree();
}

function closeTreeEditor() {
  document.getElementById('tree-editor-overlay').style.display = 'none';
}

function renderEditorTree() {
  const body = document.getElementById('tree-editor-body');
  body.innerHTML = '';
  body.appendChild(renderEditorNode(DECISION_TREE, 0));
}

function renderEditorNode(node, depth) {
  const div = document.createElement('div');
  div.className = `tree-editor-node depth-${Math.min(depth, 4)}`;
  div.dataset.nodeId = node.id;

  const hasChildren = node.children && node.children.length > 0;
  const isRoot = node.id === 'root';
  const isLeaf = !hasChildren;

  // Header row: label input + weight input + actions
  const header = document.createElement('div');
  header.className = 'tree-editor-node-header';

  // Label input
  const labelInput = document.createElement('input');
  labelInput.type = 'text';
  labelInput.className = 'tree-editor-node-label';
  labelInput.value = node.label;
  labelInput.addEventListener('change', () => updateEditorField(node.id, 'label', labelInput.value));
  header.appendChild(labelInput);

  // Weight input
  const weightInput = document.createElement('input');
  weightInput.type = 'text';
  weightInput.className = 'tree-editor-node-weight';
  weightInput.value = node.weight || '';
  weightInput.placeholder = '0%';
  weightInput.addEventListener('change', () => updateEditorField(node.id, 'weight', weightInput.value));
  header.appendChild(weightInput);

  // Leaf badge
  if (isLeaf) {
    const badge = document.createElement('span');
    badge.className = 'tree-editor-node-leaf-badge';
    badge.textContent = 'leaf';
    header.appendChild(badge);
  }

  // Actions
  const actions = document.createElement('div');
  actions.className = 'tree-editor-node-actions';

  // Description toggle
  const descBtn = document.createElement('button');
  descBtn.className = 'tree-editor-desc-btn';
  descBtn.textContent = 'Desc';
  descBtn.addEventListener('click', () => {
    const descInput = div.querySelector('.tree-editor-node-description');
    if (descInput) descInput.classList.toggle('visible');
  });
  actions.appendChild(descBtn);

  // Add child button
  const addBtn = document.createElement('button');
  addBtn.className = 'tree-editor-add-btn';
  addBtn.textContent = '+ Add Child';
  addBtn.addEventListener('click', () => addEditorChild(node.id));
  actions.appendChild(addBtn);

  // AI Balance button (only for nodes with children)
  if (hasChildren) {
    const aiBtn = document.createElement('button');
    aiBtn.className = 'tree-editor-ai-btn';
    aiBtn.textContent = 'AI Balance';
    aiBtn.addEventListener('click', () => aiBalanceWeights(node.id, aiBtn));
    actions.appendChild(aiBtn);
  }

  // Remove button (not on root)
  if (!isRoot) {
    const removeBtn = document.createElement('button');
    removeBtn.className = 'tree-editor-remove-btn';
    removeBtn.textContent = '✕';
    removeBtn.addEventListener('click', () => removeEditorNode(node.id));
    actions.appendChild(removeBtn);
  }

  header.appendChild(actions);
  div.appendChild(header);

  // Description input (hidden by default)
  const descInput = document.createElement('input');
  descInput.type = 'text';
  descInput.className = 'tree-editor-node-description';
  descInput.value = node.description || '';
  descInput.placeholder = 'Node description...';
  descInput.addEventListener('change', () => updateEditorField(node.id, 'description', descInput.value));
  div.appendChild(descInput);

  // Weight warning for children
  if (hasChildren) {
    const weightSum = node.children.reduce((sum, child) => {
      const w = parseFloat((child.weight || '0').replace('%', ''));
      return sum + (isNaN(w) ? 0 : w);
    }, 0);
    const rounded = Math.round(weightSum * 100) / 100;
    if (Math.abs(rounded - 100) > 0.01) {
      const warning = document.createElement('div');
      warning.className = 'tree-editor-weight-warning';
      warning.textContent = `Children weights sum to ${rounded}% (should be 100%)`;
      div.appendChild(warning);
    }
  }

  // Children
  if (hasChildren) {
    const childrenDiv = document.createElement('div');
    childrenDiv.className = 'tree-editor-children';
    node.children.forEach(child => {
      childrenDiv.appendChild(renderEditorNode(child, depth + 1));
    });
    div.appendChild(childrenDiv);
  }

  return div;
}

function updateEditorField(nodeId, field, value) {
  const node = findNodeInTree(DECISION_TREE, nodeId);
  if (node) {
    node[field] = value;
    // Re-render to update weight warnings
    if (field === 'weight') renderEditorTree();
  }
}

function addEditorChild(parentId) {
  const parent = findNodeInTree(DECISION_TREE, parentId);
  if (!parent) return;

  if (!parent.children) parent.children = [];

  const newId = generateNodeId();
  const newNode = {
    id: newId,
    label: 'New Node',
    weight: '0%',
    description: '',
    scores: {
      'scania': { score: 5.0, rationale: 'Default score — update with assessment.' },
      'volvo': { score: 5.0, rationale: 'Default score — update with assessment.' },
      'man': { score: 5.0, rationale: 'Default score — update with assessment.' }
    }
  };

  parent.children.push(newNode);

  // If parent had scores (was a leaf), remove them since it's now a branch
  if (parent.scores && parent.children.length === 1) {
    delete parent.scores;
  }

  renderEditorTree();
}

function removeEditorNode(nodeId) {
  const node = findNodeInTree(DECISION_TREE, nodeId);
  if (!node) return;

  const hasChildren = node.children && node.children.length > 0;
  if (hasChildren) {
    if (!confirm(`Remove "${node.label}" and all its children?`)) return;
  }

  const parent = findParentInTree(DECISION_TREE, nodeId);
  if (parent && parent.children) {
    parent.children = parent.children.filter(c => c.id !== nodeId);

    // If parent has no more children, add default scores so it becomes a leaf
    if (parent.children.length === 0) {
      delete parent.children;
      if (!parent.scores) {
        parent.scores = {
          'scania': { score: 5.0, rationale: 'Default score — update with assessment.' },
          'volvo': { score: 5.0, rationale: 'Default score — update with assessment.' },
          'man': { score: 5.0, rationale: 'Default score — update with assessment.' }
        };
      }
    }
  }

  renderEditorTree();
}

async function aiBalanceWeights(nodeId, btnElement) {
  const node = findNodeInTree(DECISION_TREE, nodeId);
  if (!node || !node.children || !node.children.length) return;

  if (btnElement) {
    btnElement.disabled = true;
    btnElement.textContent = 'Balancing...';
  }

  try {
    const res = await fetch('/api/tree/ai-balance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ node, originalTree: DEFAULT_DECISION_TREE })
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'AI balance failed');
    }

    const { balancedNode } = await res.json();
    if (balancedNode && balancedNode.children) {
      // Apply balanced weights to the in-memory tree
      for (const balancedChild of balancedNode.children) {
        const treeChild = node.children.find(c => c.id === balancedChild.id);
        if (treeChild && balancedChild.weight) {
          treeChild.weight = balancedChild.weight;
        }
      }
    }

    renderEditorTree();
  } catch (err) {
    console.error('AI balance error:', err);
    alert('AI Balance failed: ' + err.message);
  } finally {
    if (btnElement) {
      btnElement.disabled = false;
      btnElement.textContent = 'AI Balance';
    }
  }
}

async function saveTreeEdits() {
  try {
    const res = await fetch('/api/tree', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tree: DECISION_TREE })
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Save failed');
    }

    closeTreeEditor();

    // Re-apply overrides and re-render all views
    applyScoreOverrides();
    renderTree();
    renderProfiles();
    renderCompare();

    // Re-select current node if it still exists
    if (selectedNode) {
      const updated = findNodeInTree(DECISION_TREE, selectedNode.id);
      if (updated) {
        selectedNode = updated;
        renderDetail(updated, selectedNodePath);
      }
    }
  } catch (err) {
    console.error('Save tree error:', err);
    alert('Failed to save tree: ' + err.message);
  }
}

async function resetTreeToDefault() {
  if (!confirm('Reset the decision tree to its original default structure? All custom changes will be lost.')) return;

  try {
    await fetch('/api/tree', { method: 'DELETE' });
    DECISION_TREE = JSON.parse(JSON.stringify(DEFAULT_DECISION_TREE));
    applyScoreOverrides();
    renderTree();
    renderProfiles();
    renderCompare();
    closeTreeEditor();
  } catch (err) {
    console.error('Reset tree error:', err);
    alert('Failed to reset tree: ' + err.message);
  }
}
