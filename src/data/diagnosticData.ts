import { Question, ArchetypeResult, DiagnosticResult, UserResponses, UserContact, PillarBreakdown } from '../types/diagnostic';

export const DIAGNOSTIC_QUESTIONS: Question[] = [
  {
    id: 1,
    category: 'stage',
    categoryLabel: '01. Scale Context',
    questionText: 'What best describes your organization’s operational trajectory over the next 12–18 months?',
    contextNote: 'Workforce architecture must be designed for the next stage of revenue, not the current one.',
    options: [
      {
        id: '1a',
        label: 'Rapid Headcount Expansion',
        description: 'Growing 30%+ in headcount; hiring across multiple departments simultaneously to meet market demand.',
        scores: { hrArchitecture: 12, orgClarity: 10, aiReadiness: 15, executiveBandwidth: 10 },
        keyRiskTag: 'Coordination Breakdown',
        microInsight: 'When teams add headcount faster than 30% annually, communication pathways multiply exponentially, turning informal coordination into invisible drag.'
      },
      {
        id: '1b',
        label: 'Operational Consolidation & Efficiency',
        description: 'Stabilizing headcounts to improve margins, drive accountability, and maximize revenue per employee.',
        scores: { hrArchitecture: 16, orgClarity: 14, aiReadiness: 18, executiveBandwidth: 15 },
        keyRiskTag: 'Productivity Ceiling',
        microInsight: 'Consolidation phases fail when performance standards remain vague. It requires precise role definitions and accountability metrics.'
      },
      {
        id: '1c',
        label: 'Strategic Pivot or AI/Workflow Transformation',
        description: 'Fundamentally redesigning core business processes, customer delivery, or tech stack through automation.',
        scores: { hrArchitecture: 14, orgClarity: 12, aiReadiness: 10, executiveBandwidth: 12 },
        keyRiskTag: 'Capability Obsolescence',
        microInsight: 'Technology pivots succeed or fail based on talent adaptation. Role redesign must precede software deployment.'
      },
      {
        id: '1d',
        label: 'Steady Organic Expansion',
        description: 'Predictable year-on-year growth, but internal operational friction and founder escalations are creeping upward.',
        scores: { hrArchitecture: 20, orgClarity: 18, aiReadiness: 20, executiveBandwidth: 18 },
        keyRiskTag: 'Creeping Complexity',
        microInsight: 'Gradual growth often conceals structural debt until a key resignation or sudden bottleneck exposes the lack of leadership depth.'
      }
    ]
  },
  {
    id: 2,
    category: 'hr_capability',
    categoryLabel: '02. HR Capability Maturity',
    questionText: 'How is your current People & HR function structured and operating day-to-day?',
    contextNote: 'Distinguishes administrative compliance (payroll/contracts) from strategic organizational architecture.',
    options: [
      {
        id: '2a',
        label: 'Purely Transactional & Administrative',
        description: 'Handled by an office manager, finance, or external payroll service; strictly contracts, payroll, and compliance.',
        scores: { hrArchitecture: 6, orgClarity: 10, aiReadiness: 8, executiveBandwidth: 8 },
        keyRiskTag: 'No Strategic Seat',
        microInsight: 'You have payroll compliance, but zero strategic talent architecture. Critical people decisions are likely defaulting back to the CEO desk.'
      },
      {
        id: '2b',
        label: 'Stretched Mid-Level HR Manager or Generalist',
        description: 'Competent with day-to-day employee relations and hiring, but lacks senior executive org-design and board-level judgment.',
        scores: { hrArchitecture: 12, orgClarity: 14, aiReadiness: 12, executiveBandwidth: 12 },
        keyRiskTag: 'Strategic Glass Ceiling',
        microInsight: 'Generalists are great at execution but struggle to challenge executive leads on structural org design, executive compensation, and leadership capability.'
      },
      {
        id: '2c',
        label: 'Decentralized Across Founders & Department Heads',
        description: 'Each department head hires and manages talent in isolation with inconsistent standards, compensation, and culture.',
        scores: { hrArchitecture: 8, orgClarity: 8, aiReadiness: 10, executiveBandwidth: 6 },
        keyRiskTag: 'Siloed Talent Practices',
        microInsight: 'Decentralized hiring creates compensation disparities, uneven manager capability, and cultural fragmentation that is painful to untangle later.'
      },
      {
        id: '2d',
        label: 'Capable Team Navigating Unprecedented Complexity',
        description: 'Solid internal HR foundation, but currently confronted with rapid reorganization, M&A, executive hiring, or AI changes.',
        scores: { hrArchitecture: 18, orgClarity: 18, aiReadiness: 16, executiveBandwidth: 18 },
        keyRiskTag: 'Specialized Expertise Gap',
        microInsight: 'Even strong internal teams benefit from fractional strategic leadership to guide high-stakes inflection points without long-term executive payroll bloat.'
      }
    ]
  },
  {
    id: 3,
    category: 'org_structure',
    categoryLabel: '03. Organizational Clarity & Decision Velocity',
    questionText: 'When new strategic initiatives or cross-functional challenges arise, how cleanly do decisions move?',
    contextNote: 'Organizational charts mean nothing if decision authority and escalation pathways are muddy.',
    options: [
      {
        id: '3a',
        label: 'Founders / C-Suite Are the Perpetual Bottleneck',
        description: 'Department leads hesitate to make unilateral calls; decisions routinely stall until founders intervene or approve.',
        scores: { hrArchitecture: 10, orgClarity: 6, aiReadiness: 10, executiveBandwidth: 6 },
        keyRiskTag: 'Founder Dependency Bottleneck',
        microInsight: 'This indicates a lack of clear decision rights (DACI/RACI) and defined delegation boundaries, which drains executive energy.'
      },
      {
        id: '3b',
        label: 'Overlapping Responsibilities & Gray Zones',
        description: 'Unclear ownership causes friction or duplicate efforts between departments (e.g., product vs. marketing, sales vs. client ops).',
        scores: { hrArchitecture: 12, orgClarity: 8, aiReadiness: 12, executiveBandwidth: 10 },
        keyRiskTag: 'Matrix Ambiguity',
        microInsight: 'Gray zones kill momentum. Without explicit chartering, talented leaders waste time politicking or negotiating turf.'
      },
      {
        id: '3c',
        label: 'Shadow Structures (Bypassing Formal Lines)',
        description: 'An official org chart exists, but high performers bypass managers to get direct answers from founders or informal leaders.',
        scores: { hrArchitecture: 10, orgClarity: 10, aiReadiness: 12, executiveBandwidth: 8 },
        keyRiskTag: 'Undermined Management Layer',
        microInsight: 'When teams circumvent the formal hierarchy, middle managers become disempowered and accountable for outcomes they do not control.'
      },
      {
        id: '3d',
        label: 'Defined Roles, but Growth Straining Interfaces',
        description: 'Core structures are largely respected, but newer cross-functional teams are beginning to bump heads as the company scales.',
        scores: { hrArchitecture: 20, orgClarity: 20, aiReadiness: 18, executiveBandwidth: 18 },
        keyRiskTag: 'Scaling Interface Friction',
        microInsight: 'A periodic tuning of operating cadences and cross-functional handoffs will maintain your speed before deeper structural sclerosis sets in.'
      }
    ]
  },
  {
    id: 4,
    category: 'performance',
    categoryLabel: '04. Performance Architecture & Accountability',
    questionText: 'Which of these best characterizes your experience with performance consistency across the team?',
    contextNote: 'Hiring solves capacity; accountability systems solve consistent execution.',
    options: [
      {
        id: '4a',
        label: 'Uneven Delivery Despite Higher Headcount',
        description: 'Payroll has increased substantially, but overall delivery velocity and output quality have not scaled proportionally.',
        scores: { hrArchitecture: 10, orgClarity: 8, aiReadiness: 12, executiveBandwidth: 8 },
        keyRiskTag: 'Payroll Drag',
        microInsight: 'More headcount without calibrated performance metrics often yields diminishing returns and disguised under-productivity.'
      },
      {
        id: '4b',
        label: 'High Performers Overburdened; Underperformance Tolerated',
        description: 'A critical 20% of your staff carries 80% of the company, while struggling performers linger because no one wants confrontation.',
        scores: { hrArchitecture: 8, orgClarity: 10, aiReadiness: 10, executiveBandwidth: 6 },
        keyRiskTag: 'A-Player Burnout & Flight Risk',
        microInsight: 'Tolerating chronic B/C-player performance is the #1 reason top performers leave. A structured talent calibration framework solves this objectively.'
      },
      {
        id: '4c',
        label: 'Inconsistent Compensation & Promotion Expectations',
        description: 'Pay decisions were made ad-hoc during recruiting crunches; now salary compression and title inflation are causing internal friction.',
        scores: { hrArchitecture: 12, orgClarity: 12, aiReadiness: 14, executiveBandwidth: 10 },
        keyRiskTag: 'Compensation Compression',
        microInsight: 'Ad-hoc compensation is a ticking cultural timebomb. Transparent leveling bands restore fairness without blowing up payroll budgets.'
      },
      {
        id: '4d',
        label: 'Generally High Output, but Lacking Manager Enablement',
        description: 'People execute reasonably well, but newly promoted managers lack training on conducting rigorous, constructive performance reviews.',
        scores: { hrArchitecture: 18, orgClarity: 16, aiReadiness: 16, executiveBandwidth: 16 },
        keyRiskTag: 'Manager Capability Gap',
        microInsight: 'First-time people managers require explicit playbooks on setting expectations, giving feedback, and coaching to protect executive bandwidth.'
      }
    ]
  },
  {
    id: 5,
    category: 'ai_readiness',
    categoryLabel: '05. AI & Future-of-Work Transition',
    questionText: 'How proactively is your leadership team preparing the workforce for AI and automation shifts?',
    contextNote: 'AI adoption is 20% technology selection and 80% organizational change and job redesign.',
    options: [
      {
        id: '5a',
        label: 'Ad-Hoc / Shadow Experimentation',
        description: 'Individual team members use consumer AI tools independently, but there is no workforce policy, safety guidelines, or systematic integration.',
        scores: { hrArchitecture: 10, orgClarity: 12, aiReadiness: 6, executiveBandwidth: 12 },
        keyRiskTag: 'Ungoverned AI Sprawl',
        microInsight: 'Uncoordinated AI use creates confidentiality risks and fails to capture enterprise-level productivity gains or workflow restructuring.'
      },
      {
        id: '5b',
        label: 'Unclear Which Roles to Redesign vs. Augment',
        description: 'Leadership knows AI will disrupt industry workflows, but has no framework to determine which positions to automate, augment, or evolve.',
        scores: { hrArchitecture: 12, orgClarity: 10, aiReadiness: 8, executiveBandwidth: 10 },
        keyRiskTag: 'Role Evolution Blind Spot',
        microInsight: 'Without a workforce capability matrix, companies risk hiring for legacy skills that will be redundant within 18 months.'
      },
      {
        id: '5c',
        label: 'Executive Vision Exists, but Team Lacks Implementation Capability',
        description: 'Founders have set an AI imperative, but managers lack the coaching and time to reskill employees or redesign daily tasks.',
        scores: { hrArchitecture: 14, orgClarity: 14, aiReadiness: 10, executiveBandwidth: 10 },
        keyRiskTag: 'Execution Disconnect',
        microInsight: 'A strategic workforce plan translates high-level AI directives into concrete job family revisions, skill maps, and team reskilling paths.'
      },
      {
        id: '5d',
        label: 'Structured Pilots Underway, Monitoring Talent Impact',
        description: 'We have defined AI usage boundaries, are piloting toolkits in key workflows, and are beginning to assess changing capability requirements.',
        scores: { hrArchitecture: 22, orgClarity: 20, aiReadiness: 22, executiveBandwidth: 20 },
        keyRiskTag: 'Proactive Evolution',
        microInsight: 'Your early governance puts you ahead of 78% of peers. The next step is embedding updated skill competencies into hiring scorecards.'
      }
    ]
  },
  {
    id: 6,
    category: 'executive_bandwidth',
    categoryLabel: '06. Executive Bandwidth & People Friction',
    questionText: 'How much executive time do founders or C-suite leaders spend firefighting personnel friction or talent ambiguity?',
    contextNote: 'Strategic HR leadership exists to protect the founder’s highest-leverage time.',
    options: [
      {
        id: '6a',
        label: 'Heavy Drain (10–20+ hours / week per executive)',
        description: 'Founders spend hours weekly mediating interpersonal conflicts, re-clarifying responsibilities, or fixing awkward team issues.',
        scores: { hrArchitecture: 6, orgClarity: 6, aiReadiness: 10, executiveBandwidth: 4 },
        keyRiskTag: 'Founder Bandwidth Bleed',
        microInsight: 'At $200+/hour opportunity cost for founders, losing 15 hours/week costs the business over $150k annually in lost strategic focus.'
      },
      {
        id: '6b',
        label: 'Moderate but Persistent Friction (5–10 hours / week)',
        description: 'Regular personnel escalations disrupt deep work and delay product or revenue milestones, but are seen as "part of the job".',
        scores: { hrArchitecture: 12, orgClarity: 12, aiReadiness: 12, executiveBandwidth: 10 },
        keyRiskTag: 'Chronic Executive Drag',
        microInsight: 'Founders often normalize this friction as inevitable growing pains. In reality, it is usually a missing escalation and org-tiering architecture.'
      },
      {
        id: '6c',
        label: 'Periodic High-Stakes Crisis Spikes',
        description: 'Calm for weeks, then sudden crisis around a key leader resignation, toxic behavior escalation, or misaligned executive expectation.',
        scores: { hrArchitecture: 14, orgClarity: 12, aiReadiness: 14, executiveBandwidth: 12 },
        keyRiskTag: 'Latent Crisis Vulnerability',
        microInsight: 'Reactive crisis management is exhausting and destabilizing. Proactive pulse diagnostics and senior talent reviews prevent surprise departures.'
      },
      {
        id: '6d',
        label: 'Mostly Protected (Less than 3 hours / week)',
        description: 'Founders stay focused on commercial growth; department heads handle people matters effectively with minimal C-suite drag.',
        scores: { hrArchitecture: 22, orgClarity: 22, aiReadiness: 20, executiveBandwidth: 24 },
        keyRiskTag: 'Healthy Insulation',
        microInsight: 'Strong executive bandwidth protection is rare at this scale. The key priority is safeguarding this leverage as complexity increases.'
      }
    ]
  },
  {
    id: 7,
    category: 'urgency',
    categoryLabel: '07. Urgency & Inaction Risk',
    questionText: 'If these workforce and organizational frictions remain unaddressed over the next 6–12 months, what is the greatest risk?',
    contextNote: 'Helps pinpoint where organizational friction hurts the enterprise valuation most.',
    options: [
      {
        id: '7a',
        label: 'Costly Mis-Hires & Departure of Key High Performers',
        description: 'Losing core contributors or hiring senior leaders who fail due to unclear mandate and cultural friction.',
        scores: { hrArchitecture: 8, orgClarity: 10, aiReadiness: 12, executiveBandwidth: 8 },
        keyRiskTag: 'Key-Person Flight Risk',
        microInsight: 'Replacing a strategic performer costs 1.5x–2x their annual salary in lost momentum, search fees, and team disorientation.'
      },
      {
        id: '7b',
        label: 'Stalled Strategic Execution & Missed Milestones',
        description: 'Cross-functional drag delays critical product launches, market expansions, or revenue targets.',
        scores: { hrArchitecture: 10, orgClarity: 8, aiReadiness: 10, executiveBandwidth: 8 },
        keyRiskTag: 'Execution Velocity Decay',
        microInsight: 'Slower execution rarely stems from working fewer hours—it stems from fuzzy decision rights and ambiguous accountability.'
      },
      {
        id: '7c',
        label: 'Inefficient Payroll Burn Without Proportional Output',
        description: 'Paying significant monthly salaries while leadership senses the organization is delivering only 60–70% of potential output.',
        scores: { hrArchitecture: 10, orgClarity: 10, aiReadiness: 12, executiveBandwidth: 10 },
        keyRiskTag: 'Payroll Inefficiency',
        microInsight: 'Even a 10% lift in workforce clarity across 50 employees frees up hundreds of thousands in capital efficiency.'
      },
      {
        id: '7d',
        label: 'Falling Behind More Agile, AI-Enabled Competitors',
        description: 'Competitors re-architecting their lean teams with AI while we remain bogged down in legacy headcount and manual operations.',
        scores: { hrArchitecture: 14, orgClarity: 14, aiReadiness: 8, executiveBandwidth: 12 },
        keyRiskTag: 'Competitive Sclerosis',
        microInsight: 'Agility is an org design choice. Lean, modular teams with senior guidance adapt 3x faster than bloated functional silos.'
      }
    ]
  },
  {
    id: 8,
    category: 'ideal_state',
    categoryLabel: '08. Strategic Desired Outcome',
    questionText: 'What would provide the greatest immediate relief and strategic leverage to your executive team right now?',
    contextNote: 'Identifies the most practical immediate intervention format.',
    options: [
      {
        id: '8a',
        label: 'A Clear, Scalable Org Blueprint & Decision Rights',
        description: 'Explicit reporting lines, span-of-control guidelines, and clear ownership so teams execute without founder micromanagement.',
        scores: { hrArchitecture: 16, orgClarity: 14, aiReadiness: 14, executiveBandwidth: 16 },
        keyRiskTag: 'Org Architecture Blueprint',
        microInsight: 'Gives teams autonomy while giving founders predictable visibility and control through clean governance.'
      },
      {
        id: '8b',
        label: 'Experienced Senior HR Leadership on a Flexible/Fractional Basis',
        description: 'A seasoned CHRO in executive meetings 1–2 days/week to solve hard people issues without adding a $350k+ permanent payroll burden.',
        scores: { hrArchitecture: 14, orgClarity: 16, aiReadiness: 14, executiveBandwidth: 14 },
        keyRiskTag: 'Fractional Strategic Partnership',
        microInsight: 'Delivers 90% of the strategic judgment and org design of an enterprise CHRO at roughly 25–35% of the annual cash commitment.'
      },
      {
        id: '8c',
        label: 'A Workforce Capability & AI Job Redesign Roadmap',
        description: 'A concrete mapping of which roles to evolve, which tools to mandate, and how to train teams for the next 24 months.',
        scores: { hrArchitecture: 14, orgClarity: 14, aiReadiness: 12, executiveBandwidth: 14 },
        keyRiskTag: 'Workforce Evolution Roadmap',
        microInsight: 'Turns anxious AI ambiguity into structured quarterly milestones and clear departmental skill profiles.'
      },
      {
        id: '8d',
        label: 'An Objective Third-Party Workforce Audit & Risk Review',
        description: 'A thorough, unbiased assessment of leadership bench strength, compliance hygiene, and retention risks prior to our next board review.',
        scores: { hrArchitecture: 18, orgClarity: 18, aiReadiness: 16, executiveBandwidth: 18 },
        keyRiskTag: 'Executive People Audit',
        microInsight: 'Uncovers silent vulnerabilities and alignment issues before they trigger costly operational disruptions.'
      }
    ]
  }
];

export const ARCHETYPES: Record<string, ArchetypeResult> = {
  structural_bottleneck: {
    id: 'structural_bottleneck',
    title: 'The Founder-Centric Scaling Bottleneck',
    tagline: 'High Growth Trajectory Outrunning Informal Operating Architecture',
    readinessBand: 'Scale Constrained',
    executiveSummary: 'Your organization is generating real commercial momentum, but your people operating system has not kept pace. Decisions and escalations continue routing through the founders and a handful of senior contributors. Adding headcount under this model increases organizational drag instead of scaling output.',
    primaryDiagnosis: 'The business has outgrown its informal startup communications. What previously worked through natural proximity is now breaking down across expanding departments, creating gray zones and founder fatigue.',
    immediateAction: {
      title: 'Run a 90-Minute Decision Rights Charter (DACI Matrix)',
      description: 'Document the 5 highest-friction operational decisions currently landing on founder desks. Explicitly designate one single "Driver" and one "Approver" for each, restricting founder involvement to board-level vetoes.',
      deliverable: 'A 1-page Decision Delegation Charter shared with department heads to immediately unblock weekly flow.'
    },
    criticalBlindSpot: {
      title: 'Premature Full-Time CHRO Hiring vs. Operating Architecture',
      warning: 'Many founders in this stage rush to hire a $300k+ enterprise Chief People Officer, only for them to flounder because the foundational middle-management cadence and role clarity have not been architected yet.',
      preventativeStep: 'Prioritize embedding fractional strategic leadership to establish org boundaries, metrics, and manager enablement before committing to a permanent C-suite salary.'
    },
    strategicRecommendation: 'Institute a structured 90-day workforce architecture sprint focusing on executive span of control, middle-management delegation, and objective performance standards.',
    suggestedFractionalModel: 'Fractional CHRO advisory (1–1.5 days/week) to design organizational structure, coach department leads, and insulate founder bandwidth.'
  },
  transformation_lag: {
    id: 'transformation_lag',
    title: 'The AI & Workflow Transformation Lag',
    tagline: 'Modern Tech & Market Demands Battling Legacy Role Definitions',
    readinessBand: 'Transition Phase',
    executiveSummary: 'Your executive team recognizes that workflows and generative AI are fundamentally shifting how work gets executed, but your talent architecture remains anchored in yesterday’s job descriptions. Employees are experimenting ad-hoc without governance, and leadership lacks clarity on which capabilities to build, buy, or automate.',
    primaryDiagnosis: 'Technology adoption is accelerating faster than organizational role redesign. Without strategic workforce mapping, the company risks hiring for obsolescent skills and frustrating tech-forward performers.',
    immediateAction: {
      title: 'Execute a Critical Workflow & Role Impact Audit',
      description: 'Map the core workflows in your top 2 functional departments (e.g., product/engineering, client delivery). Categorize every key role into: (1) Core human judgment, (2) AI-augmented, or (3) Automation candidate.',
      deliverable: 'A role modernization matrix identifying capability gaps and 3 obsolete hiring specs to pause immediately.'
    },
    criticalBlindSpot: {
      title: 'Treating AI as an IT Decision Rather Than an Org Design Project',
      warning: 'Purchasing enterprise AI licenses without redesigning team workflows and performance expectations creates expensive shelfware and employee anxiety.',
      preventativeStep: 'Tie new tooling directly to updated job descriptions, revised output quotas, and leadership coaching.'
    },
    strategicRecommendation: 'Build an AI-ready talent playbook that recalibrates recruiting criteria, establishes secure internal usage guardrails, and reskills existing team members.',
    suggestedFractionalModel: 'Fractional Strategic HR Partner (1 day/week) paired with quarterly workforce redesign sprints.'
  },
  accountability_plateau: {
    id: 'accountability_plateau',
    title: 'The Accountability & Execution Plateau',
    tagline: 'Expanding Payroll with Disproportionate Execution Inconsistency',
    readinessBand: 'Developing',
    executiveSummary: 'Your headcount has grown, yet overall delivery speed, ownership, and execution consistency have plateaued. High performers are shouldering an unfair burden and feeling burned out, while underperformance is addressed too slowly. Ad-hoc compensation and leveling decisions have created quiet friction.',
    primaryDiagnosis: 'You are missing an objective performance architecture. Managers lack the tools, frameworks, and confidence to conduct high-stakes performance calibrations and address underperformance constructively.',
    immediateAction: {
      title: 'Conduct an A/B/C Talent Calibration Review',
      description: 'Meet confidentially with department heads to calibrate team members across a simple 2x2 grid: Values/Culture Alignment vs. Independent Execution. Identify your top 15% flight-risk performers and bottom 10% unaddressed underperformers.',
      deliverable: 'Immediate retention retention plan for key contributors and 30-day corrective action plans for lagging performers.'
    },
    criticalBlindSpot: {
      title: 'Tolerating Mediocrity in the Middle Tier',
      warning: 'When A-players see underperformance tolerated, their motivation erodes and they quietly seek recruiters. The hidden cost of tolerated mediocrity is the loss of your best talent.',
      preventativeStep: 'Establish unambiguous output benchmarks and train first-time managers on giving immediate, actionable feedback.'
    },
    strategicRecommendation: 'Deploy clean leveling bands, standardized quarterly performance check-ins, and manager coaching modules to turn subjective evaluations into objective business metrics.',
    suggestedFractionalModel: 'Fractional Chief People Officer (1 day/week) to install scalable performance systems and mentor people managers.'
  },
  proactive_foundation: {
    id: 'proactive_foundation',
    title: 'The High-Potential Proactive Foundation',
    tagline: 'Sound Operational Baseline Preparing for Complex Scale',
    readinessBand: 'Strategic Maturity',
    executiveSummary: 'Your organization possesses healthy cultural instincts, relatively protected executive bandwidth, and solid day-to-day discipline. However, as you prepare for your next revenue tier, key-person dependencies and latent structural blind spots will test this foundation.',
    primaryDiagnosis: 'Your current success relies heavily on strong individual contributors and intuitive leadership. The challenge ahead is institutionalizing these practices so the company can withstand doubled headcount without cultural dilution.',
    immediateAction: {
      title: 'Map Single Points of Failure (Key-Person Dependency Audit)',
      description: 'Audit every operational system and client workflow to identify where knowledge, relationships, or critical authority reside exclusively in a single person’s head.',
      deliverable: 'A succession and redundancy plan for the top 5 operational single points of failure.'
    },
    criticalBlindSpot: {
      title: 'Assuming Today’s Cultural Cohesion Will Scale Autonomously',
      warning: 'Informal culture does not survive crossing 50 or 100 headcount without deliberate architectural reinforcement and clear leadership behaviors.',
      preventativeStep: 'Formalize leadership competencies and operational cadences before aggressive hiring restarts.'
    },
    strategicRecommendation: 'Retain fractional executive HR advisory for quarterly strategic workforce reviews, board compensation committee support, and executive bench development.',
    suggestedFractionalModel: 'Retained Strategic HR Advisor (2–3 days/month) for governance, executive coaching, and scale planning.'
  }
};

export const INDUSTRY_BENCHMARKS = {
  '20-50': { hrArchitecture: 48, orgClarity: 54, aiReadiness: 38, executiveBandwidth: 44, overall: 46 },
  '51-120': { hrArchitecture: 58, orgClarity: 62, aiReadiness: 45, executiveBandwidth: 52, overall: 54 },
  '121-250': { hrArchitecture: 68, orgClarity: 70, aiReadiness: 56, executiveBandwidth: 61, overall: 64 },
  '250+': { hrArchitecture: 76, orgClarity: 78, aiReadiness: 66, executiveBandwidth: 70, overall: 72 }
};

export function calculateDiagnosticResult(
  responses: UserResponses,
  contact?: UserContact
): DiagnosticResult {
  let hrTotal = 0;
  let orgTotal = 0;
  let aiTotal = 0;
  let execTotal = 0;
  let maxPossiblePillar = 0;

  const topPriorityIssues: DiagnosticResult['topPriorityIssues'] = [];

  DIAGNOSTIC_QUESTIONS.forEach((q) => {
    const selectedOptionId = responses[q.id];
    const option = q.options.find((opt) => opt.id === selectedOptionId) || q.options[0];
    
    hrTotal += option.scores.hrArchitecture;
    orgTotal += option.scores.orgClarity;
    aiTotal += option.scores.aiReadiness;
    execTotal += option.scores.executiveBandwidth;
    maxPossiblePillar += 25; // max score per question is ~25

    // If an option indicates a severe friction point, add to priority issues
    if (option.scores.hrArchitecture <= 12 || option.scores.orgClarity <= 10 || option.scores.aiReadiness <= 10 || option.scores.executiveBandwidth <= 8) {
      topPriorityIssues.push({
        questionId: q.id,
        area: q.categoryLabel.replace(/^\d+\.\s*/, ''),
        observedSymptom: option.label,
        microSolution: option.microInsight
      });
    }
  });

  const normalizedHr = Math.round((hrTotal / maxPossiblePillar) * 100);
  const normalizedOrg = Math.round((orgTotal / maxPossiblePillar) * 100);
  const normalizedAi = Math.round((aiTotal / maxPossiblePillar) * 100);
  const normalizedExec = Math.round((execTotal / maxPossiblePillar) * 100);
  const overallScore = Math.round((normalizedHr + normalizedOrg + normalizedAi + normalizedExec) / 4);

  // Archetype mapping logic
  let archetypeKey = 'structural_bottleneck';
  if (normalizedAi < 45 && normalizedAi <= normalizedOrg && normalizedAi <= normalizedHr) {
    archetypeKey = 'transformation_lag';
  } else if (normalizedOrg < 50 || normalizedExec < 48) {
    archetypeKey = 'structural_bottleneck';
  } else if (normalizedHr < 55 && normalizedOrg >= 50) {
    archetypeKey = 'accountability_plateau';
  } else if (overallScore >= 68) {
    archetypeKey = 'proactive_foundation';
  } else {
    archetypeKey = 'accountability_plateau';
  }

  const archetype = ARCHETYPES[archetypeKey];
  const headcount = contact?.headcountTier || '51-120';
  const benchmarks = INDUSTRY_BENCHMARKS[headcount];

  const getStatus = (score: number): PillarBreakdown['status'] => {
    if (score < 45) return 'Critical Attention';
    if (score < 68) return 'Needs Structure';
    return 'Scaling Well';
  };

  const pillars = {
    hrArchitecture: {
      name: 'Strategic HR Architecture',
      score: normalizedHr,
      status: getStatus(normalizedHr),
      industryBenchmark: benchmarks.hrArchitecture,
      assessment: normalizedHr < 50
        ? 'HR operates predominantly as a reactive administrative back-office without strategic executive influence.'
        : 'Solid core HR foundations, but ready for formalization into a strategic operating engine.'
    },
    orgClarity: {
      name: 'Org Clarity & Decision Speed',
      score: normalizedOrg,
      status: getStatus(normalizedOrg),
      industryBenchmark: benchmarks.orgClarity,
      assessment: normalizedOrg < 50
        ? 'Cross-functional gray zones and ambiguous decision rights are creating recurring friction and duplicate work.'
        : 'Roles are generally defined, though rapid headcount additions are beginning to test delegation boundaries.'
    },
    aiReadiness: {
      name: 'AI & Workforce Transformation',
      score: normalizedAi,
      status: getStatus(normalizedAi),
      industryBenchmark: benchmarks.aiReadiness,
      assessment: normalizedAi < 45
        ? 'Ad-hoc employee AI tool usage without structured role evolution plans or strategic reskilling frameworks.'
        : 'Progressive awareness of technological impact, but requiring concrete role redesign and governance.'
    },
    executiveBandwidth: {
      name: 'Executive Bandwidth Protection',
      score: normalizedExec,
      status: getStatus(normalizedExec),
      industryBenchmark: benchmarks.executiveBandwidth,
      assessment: normalizedExec < 50
        ? 'Founders and C-suite are carrying excessive people-firefighting overhead, diverting energy from revenue and strategy.'
        : 'Reasonable executive insulation today, but vulnerable to unexpected key-person turnover or sudden growth spikes.'
    }
  };

  // Top 3 priority issues
  const prioritized = topPriorityIssues.slice(0, 3);
  if (prioritized.length === 0) {
    prioritized.push({
      questionId: 1,
      area: 'Scale Architecture',
      observedSymptom: 'Sustained Growth Complexity',
      microSolution: 'Institutionalize operating cadences and succession planning to safeguard performance as headcount multiplies.'
    });
  }

  const name = contact?.firstName ? contact.firstName : 'there';
  const company = contact?.companyName ? ` at ${contact.companyName}` : '';

  const generatedFollowUp = {
    subject: `Talent R.A.D.A.R.™ Diagnostic findings - workforce priorities follow-up`,
    emailBody: `Hi ${name},

Thanks for walking through the Ascend Marché Talent R.A.D.A.R.™ Diagnostic earlier.

Your responses surfaced a profile consistent with ${archetype.title}.

In particular, your answers indicated that ${prioritized[0]?.observedSymptom.toLowerCase() || 'organizational friction'} is currently consuming significant leadership bandwidth. A key principle of Talent R.A.D.A.R.™ is that adding headcount before redesigning work and decision rights compounds friction rather than accelerating execution.

The area I would pay particular attention to first is:
"${archetype.immediateAction.title}" (${archetype.immediateAction.deliverable}).

You certainly may not need outside advisory yet—many founders can implement this initial step internally. However, if it would be helpful to unpack your diagnostic findings together and explore how Talent R.A.D.A.R.™ aligns to ${company || 'your next stage of growth'}, you are welcome to pick a convenient 30-minute window on my calendar (https://go.oncehub.com/TalentRadarDiagnostic).

Either way, I hope the diagnostic provided some useful structural clarity.

Warm regards,
Trina Teo
Fractional CHRO & Strategic HR Leadership
Ascend Marché · Accelerating Transformation
engage@ascendmarche.com · trina@ascendmarche.com
https://www.ascendmarche.com/#radar`,
    whatsAppBody: `Hi ${name}, Trina here from Ascend Marché. Saw your results from the Talent R.A.D.A.R.™ Diagnostic—mapped to "${archetype.title}". The biggest immediate leverage point looks to be unblocking ${prioritized[0]?.area || 'leadership bandwidth'}. If you'd like a quick voice note or call to review options, let me know!`,
    linkedInBody: `Hi ${name}, thank you for completing Ascend Marché's Talent R.A.D.A.R.™ Diagnostic. Your assessment highlighted "${archetype.title}" as your primary organizational phase. If helpful, I'd be glad to share how peer CEOs at your scale resolved this through the Talent R.A.D.A.R.™ framework without adding a full-time $350k CHRO salary. Let me know if you'd like to connect!`
  };

  return {
    overallScore,
    archetype,
    pillars,
    topPriorityIssues: prioritized,
    generatedFollowUp
  };
}

export const TRUST_MANIFESTO = [
  {
    title: 'You May Not Need Professional Help Yet',
    text: 'Many workforce bottlenecks can be solved directly by founders once the root structural cause is identified. If this tool gives you the exact blueprint to resolve it internally, we consider that a complete success.'
  },
  {
    title: 'Why Is This Assessment Completely Free?',
    text: 'We believe business leaders must understand the real nature of their problem before spending capital trying to fix it. Hard-selling HR services to a founder who just needs a clear DACI matrix is unethical and ineffective. Our reputation is built on high-trust diagnostics.'
  },
  {
    title: 'Zero Pressure & No Aggressive Sales Calls',
    text: 'You will never be harassed by high-pressure sales reps. If you want our perspective on your results, you can book an optional 30-minute interpretation call. If you prefer to keep the insights and act solo, your contact information is treated with strict confidentiality.'
  },
  {
    title: 'If Your Current Setup Is Working, Celebrate It',
    text: 'If your diagnostic score confirms high organizational clarity and protected executive bandwidth, that is outstanding news. We will tell you directly that your current setup is healthy and requires no outside intervention.'
  }
];

export const STRATEGY_BLUEPRINT = {
  name: 'Talent R.A.D.A.R.™ Diagnostic Framework',
  tagline: 'Connecting Business Priorities to the Work, Capability and People Decisions That Drive Growth',
  audience: 'CEOs, founders, and managing directors of companies with 20–250 headcount who need seasoned HR leadership judgment but cannot justify or afford a $350k+ full-time CHRO.',
  jtbd: 'When my organisation is growing, changing or adopting AI and our current HR capability cannot keep up, I want experienced HR leadership to identify and solve the most important workforce issues so that the business can scale and execute without unnecessary people risk.',
  problemsSolved: [
    'R — Redesign Work: Jobs, workflows, accountability and Human + AI collaboration.',
    'A — Acquire Capability: Talent, skills, redeployment, partners and technology required to close capability gaps.',
    'D — Develop People: Leadership, future skills, career pathways and change capability.',
    'A — Accelerate Execution: Ownership, milestones, governance and adoption.',
    'R — Realise Results: Measure and sustain workforce, productivity and business outcomes.'
  ],
  conversionPsychology: 'Business Priorities → Diagnose & Align → Talent R.A.D.A.R.™ → Transformation → Results. Prospects self-identify real operational friction, explore the 5 dimensions, receive an un-gated immediate diagnosis + DIY deliverable, and are invited into a low-pressure interpretation conversation to calibrate their next move.'
};
