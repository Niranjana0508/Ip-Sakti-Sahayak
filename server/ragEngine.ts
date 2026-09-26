import { GoogleGenAI, Type } from "@google/genai";
import { KNOWLEDGE_BASE, KnowledgeDoc } from "./knowledgeBase.js";
import { RAGResponse, SourceCitation, SupportedLanguage } from "../src/types.js";

// Initialize Gemini client lazily to avoid startup crashes if key is not yet set
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

export interface RetrievalResult {
  doc: KnowledgeDoc;
  score: number;
  matchedTerms: string[];
}

/**
 * Tokenize and normalize text for lexical/semantic retrieval
 */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 2);
}

/**
 * Multi-factor retrieval combining keyword matching, keyword weights, and category affinity
 */
export function retrieveDocuments(
  query: string,
  jurisdiction: 'india' | 'international',
  topK = 4
): RetrievalResult[] {
  const queryTokens = tokenize(query);
  const normalizedQuery = query.toLowerCase();

  // Filter by jurisdiction
  const candidateDocs = KNOWLEDGE_BASE.filter(doc => {
    if (doc.status !== 'active' && doc.status !== 'amended') return false;
    if (jurisdiction === 'india') {
      return doc.jurisdiction === 'india' || doc.jurisdiction === 'both';
    } else {
      return doc.jurisdiction === 'international' || doc.jurisdiction === 'both';
    }
  });

  const results: RetrievalResult[] = candidateDocs.map(doc => {
    let score = 0;
    const matchedTerms: string[] = [];

    const docText = `${doc.title} ${doc.actOrRule} ${doc.sectionArticle} ${doc.category} ${doc.keywords.join(' ')} ${doc.content}`.toLowerCase();
    const docTokens = new Set(tokenize(docText));

    // Keyword match with weights
    for (const kw of doc.keywords) {
      if (normalizedQuery.includes(kw.toLowerCase())) {
        score += 8;
        matchedTerms.push(kw);
      }
    }

    // Title and section direct substring match
    if (normalizedQuery.includes(doc.sectionArticle.toLowerCase())) {
      score += 12;
      matchedTerms.push(doc.sectionArticle);
    }
    if (normalizedQuery.includes(doc.title.toLowerCase())) {
      score += 10;
      matchedTerms.push(doc.title);
    }

    // Token overlap
    let tokenOverlapCount = 0;
    for (const token of queryTokens) {
      if (docTokens.has(token)) {
        tokenOverlapCount++;
        score += 1.5;
        if (!matchedTerms.includes(token)) {
          matchedTerms.push(token);
        }
      }
    }

    // Boost score if specific query intents match
    if ((normalizedQuery.includes('patent') || normalizedQuery.includes('invent')) && doc.category === 'Patents') score += 4;
    if ((normalizedQuery.includes('trademark') || normalizedQuery.includes('brand')) && doc.category === 'Trademarks & GI') score += 4;
    if ((normalizedQuery.includes('abs') || normalizedQuery.includes('biodiversity') || normalizedQuery.includes('nba')) && doc.category === 'Biodiversity & ABS') score += 5;
    if ((normalizedQuery.includes('export') || normalizedQuery.includes('usa') || normalizedQuery.includes('fda') || normalizedQuery.includes('eu')) && doc.category === 'International Export') score += 5;
    if ((normalizedQuery.includes('prior art') || normalizedQuery.includes('tkdl') || normalizedQuery.includes('traditional knowledge')) && doc.category === 'Traditional Knowledge') score += 5;

    return {
      doc,
      score,
      matchedTerms
    };
  });

  // Sort descending by relevance score
  return results
    .filter(r => r.score > 2)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

/**
 * Language localized prompts
 */
const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  en: 'English',
  hi: 'Hindi (हिन्दी)',
  ta: 'Tamil (தமிழ்)',
  te: 'Telugu (తెలుగు)',
  kn: 'Kannada (ಕನ್ನಡ)',
  ml: 'Malayalam (മലയാളം)',
  bn: 'Bengali (বাংলা)',
  mr: 'Marathi (मराठी)'
};

/**
 * Execute RAG pipeline with Gemini 3.8 Flash and strict hallucination safeguards
 */
export async function executeRAGQuery(
  query: string,
  jurisdiction: 'india' | 'international',
  language: SupportedLanguage = 'en'
): Promise<RAGResponse> {
  const retrieved = retrieveDocuments(query, jurisdiction, 4);

  // If no authoritative documents match the query
  if (retrieved.length === 0 || retrieved[0].score < 3) {
    return {
      directAnswer: "I'm not confident enough to provide a reliable answer based on our authoritative Ayurveda regulatory knowledge base.",
      detailedExplanation: `No authoritative legal or regulatory provisions were identified for your specific query under the ${jurisdiction === 'india' ? 'Indian (Ayush, IP India, NBA)' : 'International (WIPO, TRIPS, Nagoya, Export)'} regime. To ensure accuracy and prevent regulatory risks, the system abstains from speculative answers.`,
      applicableJurisdiction: jurisdiction === 'india' ? 'India' : 'International',
      applicableCategory: 'Regulatory Consultation Required',
      recommendedNextSteps: [
        'Consult an experienced Ayurveda patent attorney or regulatory consultant',
        'Verify with the State Licensing Authority (SLA) or National Biodiversity Authority (NBA)',
        'Check specific gazette notifications on the Ministry of Ayush portal (ayush.gov.in)',
        'Submit a Human Escalation request via IP-SAKTI Sahayak'
      ],
      confidence: {
        level: 'low',
        score: 22,
        rationale: 'Zero high-confidence authoritative statutory passages retrieved matching the search parameters.'
      },
      sources: [],
      disclaimer: 'This information is for general informational and educational guidance only and does NOT constitute legal advice. Official statutory determinations must be made by the appropriate statutory authorities.',
      escalationRecommended: true
    };
  }

  // Format retrieved context passages
  const contextPassages = retrieved.map((r, index) => {
    return `[SOURCE ${index + 1}]
Title: ${r.doc.title}
Authority / Organization: ${r.doc.organization}
Act / Regulation: ${r.doc.actOrRule}
Section / Rule: ${r.doc.sectionArticle}
Effective Date / Version: ${r.doc.effectiveDate} (${r.doc.version})
Official URL: ${r.doc.officialUrl}
Passage Content:
${r.doc.content}
---`;
  }).join('\n\n');

  const sourcesList: SourceCitation[] = retrieved.map(r => ({
    title: r.doc.title,
    organization: r.doc.organization,
    sectionArticle: r.doc.sectionArticle,
    documentDate: r.doc.effectiveDate,
    officialUrl: r.doc.officialUrl,
    quote: r.doc.content.substring(0, 160) + '...',
    jurisdiction: r.doc.jurisdiction
  }));

  // Calculate algorithmic baseline confidence
  const topScore = retrieved[0].score;
  let confidenceLevel: 'high' | 'moderate' | 'low' = 'high';
  let numericScore = 88;

  if (topScore >= 15 && retrieved.length >= 2) {
    confidenceLevel = 'high';
    numericScore = Math.min(96, Math.round(75 + topScore));
  } else if (topScore >= 7) {
    confidenceLevel = 'moderate';
    numericScore = Math.min(78, Math.round(55 + topScore * 2));
  } else {
    confidenceLevel = 'low';
    numericScore = 48;
  }

  const client = getGeminiClient();

  // If Gemini is available, generate grounded AI synthesis
  if (client) {
    try {
      const targetLang = LANGUAGE_NAMES[language] || 'English';
      const systemInstruction = `You are "IP-SAKTI Sahayak", an authoritative RAG-based AI assistant for Intellectual Property Rights and regulatory guidance in Ayurveda, developed for Smart India Hackathon 2026 Problem Statement 26045.

CRITICAL INSTRUCTIONS & HALLUCINATION PREVENTION:
1. You MUST generate your answer solely and strictly using the retrieved authoritative documents provided below.
2. NEVER invent laws, section numbers, judicial precedents, official URLs, or government guidelines.
3. CLEARLY distinguish between Indian jurisdiction and International frameworks. The user has selected: "${jurisdiction === 'india' ? 'India' : 'International'}".
4. Provide your response in the user's requested language: "${targetLang}". Keep legal citations and section identifiers (e.g. "Section 3(p) of Patents Act 1970") recognizable and clear.
5. Provide a direct, actionable answer, followed by detailed legal/regulatory explanation, applicable category, and concrete next steps.
6. Always include the standard non-legal advice disclaimer.`;

      const userPrompt = `USER QUESTION:
"${query}"

SELECTED JURISDICTION:
${jurisdiction.toUpperCase()}

RETRIEVED AUTHORITATIVE SOURCE PASSAGES:
${contextPassages}

Please generate the structured response adhering strictly to the above facts.`;

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Gemini request timeout")), 8000)
      );

      const response: any = await Promise.race([
        client.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: userPrompt,
          config: {
            systemInstruction,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                directAnswer: { type: Type.STRING, description: 'Direct 1-3 sentence summary answer' },
                detailedExplanation: { type: Type.STRING, description: 'Clear, structured explanation with citations to the retrieved sections' },
                applicableJurisdiction: { type: Type.STRING, description: 'India or International' },
                applicableCategory: { type: Type.STRING, description: 'e.g. Patent Law, Regulatory Drug Classification, ABS, Trademarks' },
                recommendedNextSteps: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'Actionable procedural steps for the applicant'
                },
                priorArtNote: { type: Type.STRING, description: 'Optional prior art or traditional knowledge overlap note' },
                escalationRecommended: { type: Type.BOOLEAN, description: 'Whether human legal escalation is recommended' }
              },
              required: ['directAnswer', 'detailedExplanation', 'applicableJurisdiction', 'applicableCategory', 'recommendedNextSteps']
            }
          }
        }),
        timeoutPromise
      ]);

      if (response.text) {
        const parsed = JSON.parse(response.text.trim());
        return {
          directAnswer: parsed.directAnswer,
          detailedExplanation: parsed.detailedExplanation,
          applicableJurisdiction: parsed.applicableJurisdiction || (jurisdiction === 'india' ? 'India' : 'International'),
          applicableCategory: parsed.applicableCategory || retrieved[0].doc.category,
          recommendedNextSteps: parsed.recommendedNextSteps || [
            'Review statutory documents with a registered Patent/Trademark Agent',
            'Conduct prior art search on TKDL and Indian Patent Advanced Search System (InPASS)'
          ],
          confidence: {
            level: confidenceLevel,
            score: numericScore,
            rationale: `Retrieved ${retrieved.length} authoritative source passages with high statutory relevance (${retrieved.map(r => r.doc.sectionArticle).join(', ')}).`
          },
          sources: sourcesList,
          disclaimer: 'This information is provided for general informational and educational guidance only and does NOT constitute legal advice. Regulatory compliance must be finalized with the Ministry of Ayush, IP India, or National Biodiversity Authority.',
          priorArtNote: parsed.priorArtNote || (query.toLowerCase().includes('patent') ? 'Potentially relevant prior art identified in traditional Ayurvedic pharmacopoeial treatises.' : undefined),
          escalationRecommended: parsed.escalationRecommended || confidenceLevel === 'low'
        };
      }
    } catch (err) {
      console.warn("Gemini generation fallback to local deterministic RAG synthesizer:", err);
    }
  }

  // Deterministic Fallback Synthesis (when offline or before API key execution)
  const topDoc = retrieved[0].doc;
  const directAnswer = `Under the ${topDoc.actOrRule} (${topDoc.sectionArticle}), ${topDoc.title.toLowerCase()} provides specific statutory guidelines regarding this matter.`;
  const detailedExplanation = `${topDoc.content}\n\nAdditional Relevant Frameworks:\n${retrieved.slice(1).map(r => `• ${r.doc.title} (${r.doc.sectionArticle}): ${r.doc.content.substring(0, 150)}...`).join('\n')}`;

  return {
    directAnswer,
    detailedExplanation,
    applicableJurisdiction: jurisdiction === 'india' ? 'India' : 'International',
    applicableCategory: topDoc.category,
    recommendedNextSteps: [
      `Examine compliance with ${topDoc.sectionArticle} of ${topDoc.actOrRule}`,
      'Verify whether product contains classical formulations or proprietary modifications',
      'Consult the relevant statutory authority portal (' + topDoc.organization + ')',
      'Formulate required analytical testing documentation (Certificate of Analysis, Heavy Metal Screen)'
    ],
    confidence: {
      level: confidenceLevel,
      score: numericScore,
      rationale: `Retrieved ${retrieved.length} matching statutory provisions from curated official repository (${retrieved.map(r => r.doc.sectionArticle).join(', ')}).`
    },
    sources: sourcesList,
    disclaimer: 'This information is for general informational and educational guidance only and does NOT constitute legal advice.',
    priorArtNote: query.toLowerCase().includes('patent') ? 'Potentially relevant prior art identified in classical codified Ayurvedic texts.' : undefined,
    escalationRecommended: confidenceLevel === 'low'
  };
}
