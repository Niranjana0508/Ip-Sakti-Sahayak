export type Jurisdiction = 'india' | 'international';

export type SupportedLanguage = 'en' | 'hi' | 'ta' | 'te' | 'kn' | 'ml' | 'bn' | 'mr';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
];

export interface SourceCitation {
  id?: string;
  title: string;
  organization: string;
  sectionArticle: string;
  documentDate?: string;
  officialUrl: string;
  quote?: string;
  jurisdiction: Jurisdiction | 'both';
}

export type ConfidenceLevel = 'high' | 'moderate' | 'low';

export interface ConfidenceScore {
  level: ConfidenceLevel;
  score: number; // 0 to 100
  rationale: string;
}

export interface RAGResponse {
  directAnswer: string;
  detailedExplanation: string;
  applicableJurisdiction: 'India' | 'International' | 'Both';
  applicableCategory: string;
  recommendedNextSteps: string[];
  confidence: ConfidenceScore;
  sources: SourceCitation[];
  disclaimer: string;
  priorArtNote?: string;
  escalationRecommended: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  jurisdiction: Jurisdiction;
  language: SupportedLanguage;
  ragResponse?: RAGResponse;
  isLoading?: boolean;
  error?: string;
}

export interface ProductClassificationInput {
  productName: string;
  ingredients: string;
  intendedUse: string;
  isClassical: boolean;
  classicalReference?: string;
  isNewProprietary: boolean;
  categoryType: 'medicine' | 'food' | 'cosmetic' | 'nutraceutical';
  targetCountry: string;
}

export interface ProductClassificationResult {
  productCategory: string;
  subCategory: string;
  applicableRegulatoryFramework: string;
  potentialIPOptions: string[];
  requiredDocumentation: string[];
  possibleAuthorities: string[];
  recommendedNextSteps: string[];
  riskAnalysis: string;
  statutoryProvisions: string[];
}

export interface ABSInput {
  biologicalResource: string;
  sourceLocation: string;
  intendedUse: string;
  isCommercial: boolean;
  applicantType: 'indian_individual' | 'indian_entity' | 'foreign_entity' | 'nri';
  researchDetails: string;
  isAyushPractitionerOrFarmer: boolean;
}

export interface ABSResult {
  jurisdictionBody: 'National Biodiversity Authority (NBA)' | 'State Biodiversity Board (SBB)' | 'Exempted';
  approvalRequired: boolean;
  approvalTiming: 'Prior Approval Mandatory' | 'Prior Intimation Required' | 'No Approval Needed';
  relevantForms: string[];
  applicableSection: string;
  benefitSharingEstimate: string;
  exemptionsApplicable: string[];
  stepByStepProcess: string[];
  statutoryWarning: string;
}

export interface PriorArtCheckInput {
  inventionTitle: string;
  formulationIngredients: string;
  preparationMethod: string;
  claimedTherapeuticEffect: string;
  isSynergisticClaim: boolean;
}

export interface ClassicalCitation {
  textName: string;
  chapterOrKanda: string;
  shlokaRef: string;
  classicalIndication: string;
  matchedIngredients: string[];
  similarityRationale: string;
}

export interface PriorArtResult {
  status: 'Potentially relevant prior art identified' | 'Novel composition aspects detected - Synergy data required' | 'Critical Section 3(p) Traditional Knowledge barrier';
  confidenceScore: number;
  classicalCitations: ClassicalCitation[];
  tkdlRelevanceNote: string;
  section3pRisk: 'High' | 'Moderate' | 'Low';
  section3eRisk: 'High' | 'Moderate' | 'Low';
  patentabilityRecommendations: string[];
  draftingTips: string[];
}

export interface KnowledgeGraphNode {
  id: string;
  label: string;
  type: 'product' | 'classification' | 'regulation' | 'ip_type' | 'authority' | 'law' | 'source';
  jurisdiction: Jurisdiction | 'both';
  details?: string;
  categoryGroup?: string;
}

export interface KnowledgeGraphEdge {
  id: string;
  source: string;
  target: string;
  relation: string;
}

export interface KnowledgeGraphData {
  nodes: KnowledgeGraphNode[];
  edges: KnowledgeGraphEdge[];
}

export interface DocumentRecord {
  id: string;
  title: string;
  organization: string;
  jurisdiction: Jurisdiction | 'both';
  category: string;
  actOrRule: string;
  sectionArticle: string;
  effectiveDate: string;
  lastUpdated: string;
  version: string;
  isAuthoritative: boolean;
  officialUrl: string;
  content: string;
  chunkCount: number;
  status: 'active' | 'amended' | 'historical';
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  query: string;
  jurisdiction: string;
  language: string;
  retrievedDocTitles: string[];
  confidenceScore: number;
  confidenceLevel: ConfidenceLevel;
  escalationStatus: boolean;
}

export interface EscalationRequest {
  id: string;
  timestamp: string;
  query: string;
  jurisdiction: string;
  userNotes: string;
  contactEmail: string;
  status: 'pending' | 'reviewed' | 'resolved';
}
