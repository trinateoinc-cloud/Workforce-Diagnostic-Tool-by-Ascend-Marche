export type StageCategory = 
  | 'stage'
  | 'hr_capability'
  | 'org_structure'
  | 'performance'
  | 'ai_readiness'
  | 'executive_bandwidth'
  | 'urgency'
  | 'ideal_state';

export interface AnswerOption {
  id: string;
  label: string;
  description: string;
  scores: {
    hrArchitecture: number;     // 0 - 25
    orgClarity: number;         // 0 - 25
    aiReadiness: number;        // 0 - 25
    executiveBandwidth: number; // 0 - 25
  };
  keyRiskTag: string;
  microInsight: string;
}

export interface Question {
  id: number;
  category: StageCategory;
  categoryLabel: string;
  questionText: string;
  contextNote: string;
  options: AnswerOption[];
}

export interface UserResponses {
  [questionId: number]: string; // questionId -> optionId
}

export interface UserContact {
  firstName: string;
  email: string;
  companyName: string;
  headcountTier: '20-50' | '51-120' | '121-250' | '250+';
  phoneOrWhatsApp?: string;
}

export interface PillarBreakdown {
  name: string;
  score: number; // 0 - 100%
  status: 'Critical Attention' | 'Needs Structure' | 'Scaling Well';
  industryBenchmark: number; // e.g. 62%
  assessment: string;
}

export interface ArchetypeResult {
  id: string;
  title: string;
  tagline: string;
  readinessBand: 'Developing' | 'Transition Phase' | 'Scale Constrained' | 'Strategic Maturity';
  executiveSummary: string;
  primaryDiagnosis: string;
  immediateAction: {
    title: string;
    description: string;
    deliverable: string;
  };
  criticalBlindSpot: {
    title: string;
    warning: string;
    preventativeStep: string;
  };
  strategicRecommendation: string;
  suggestedFractionalModel: string;
}

export interface DiagnosticResult {
  overallScore: number; // 0 - 100
  archetype: ArchetypeResult;
  pillars: {
    hrArchitecture: PillarBreakdown;
    orgClarity: PillarBreakdown;
    aiReadiness: PillarBreakdown;
    executiveBandwidth: PillarBreakdown;
  };
  topPriorityIssues: {
    questionId: number;
    area: string;
    observedSymptom: string;
    microSolution: string;
  }[];
  generatedFollowUp: {
    subject: string;
    emailBody: string;
    whatsAppBody: string;
    linkedInBody: string;
  };
}
