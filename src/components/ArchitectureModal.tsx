import React from 'react';
import {
  X,
  BookOpen,
  Layers,
  Database,
  ShieldCheck,
  Cpu,
  Globe,
  FileCode,
  Sparkles,
  GitBranch
} from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="bg-stone-900 text-stone-100 border border-stone-800 rounded-2xl max-w-4xl w-full p-5 sm:p-8 shadow-2xl relative space-y-6 my-8 max-h-[90vh] overflow-y-auto">
        
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-stone-400 hover:text-white p-1 rounded-lg bg-stone-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="border-b border-stone-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
              SIH 2026 Problem Statement 26045
            </span>
            <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              System Architecture Dossier
            </span>
          </div>
          <h2 className="text-xl font-bold font-serif text-stone-50 mt-2">
            IP-SAKTI Sahayak: Technical Architecture & Design Blueprint
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            End-to-end specification of the RAG pipeline, hallucination safeguards, dual-jurisdiction routing, and relational knowledge graph.
          </p>
        </div>

        {/* 1. ASCII System Architecture Flow */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <Cpu className="w-4 h-4" />
            <span>1. End-to-End System Architecture Pipeline</span>
          </h3>

          <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 font-mono text-[11px] text-stone-300 overflow-x-auto leading-tight space-y-1">
            <pre className="text-amber-300">
{`+-----------------------------------------------------------------------------------------+
|                                     CLIENT APPLICATION                                  |
|   React 18 + TypeScript + Vite + Tailwind CSS + Web Speech API (Voice Input & TTS)      |
|   Jurisdiction Mode: [ 🇮🇳 India ] <=========> [ 🌎 International ]                      |
|   Multilingual UI: EN, HI, TA, TE, KN, ML, BN, MR                                       |
+--------------------------------------------+--------------------------------------------+
                                             |  JSON HTTP/REST
                                             v
+-----------------------------------------------------------------------------------------+
|                                    EXPRESS BACKEND SERVER                               |
|   • /api/chat          • /api/classify      • /api/abs-check                            |
|   • /api/prior-art     • /api/knowledge-graph • /api/admin/audit-logs                   |
+--------------------------------------------+--------------------------------------------+
                                             |
                         +-------------------+-------------------+
                         |                                       |
                         v                                       v
         +-------------------------------+       +-------------------------------+
         |  RETRIEVAL ENGINE (RAG)       |       |  SPECIALIZED REGULATORY ENGINES|
         |  • Curated Knowledge Base     |       |  • Product Classifier (§3a/§3h)|
         |  • Jurisdiction Filter        |       |  • ABS Compliance (NBA / SBB) |
         |  • Lexical & Keyword Scoring  |       |  • Prior Art / Classical Shloka|
         |  • Strict Statutory Chunks    |       |  • International Dossiers     |
         +---------------+---------------+       +---------------+---------------+
                         |                                       |
                         v                                       v
+-----------------------------------------------------------------------------------------+
|                       LLM GENERATION ENGINE (Gemini 3.8 Flash)                          |
|   • Strict Temperature 0.1 (Anti-Hallucination Safeguard)                               |
|   • Strict responseSchema (Direct Answer, Explanation, Confidence, Sources)             |
|   • Fallback Synthesis Pipeline (Guarantees uptime if API key is unset)                 |
+--------------------------------------------+--------------------------------------------+
                                             |
                                             v
+-----------------------------------------------------------------------------------------+
|                       AUDIT LOGGING & DPDP ACT 2023 GOVERNANCE                          |
|   • Zero Personal Identifiable Information (PII) Stored                                 |
|   • Timestamp, Query Topic, Confidence Score, Cited Sources Recorded                    |
|   • Automated Escalation Trigger when Confidence is Low or User Requests Human Expert   |
+-----------------------------------------------------------------------------------------+`}
            </pre>
          </div>
        </div>

        {/* 2. Folder Structure */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <FileCode className="w-4 h-4" />
            <span>2. Project File & Directory Structure</span>
          </h3>

          <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 font-mono text-[11px] text-stone-300">
            <pre className="text-emerald-400">
{`ip-sakti-sahayak/
├── server.ts                   # Express server entry point, API routing, Vite dev middleware
├── server/
│   ├── knowledgeBase.ts        # Grounded statutory provisions (Patents Act, D&C Act, BDA, etc.)
│   ├── ragEngine.ts            # Scoring retrieval & Gemini 3.8 Flash structured synthesis
│   └── regulatoryServices.ts   # Classifier, ABS checker, Prior Art cross-referencer, Graph data
├── src/
│   ├── main.tsx                # Client entry point
│   ├── App.tsx                 # Tab navigation & top-level state controller
│   ├── types.ts                # Strict domain TypeScript interfaces
│   ├── services/
│   │   └── api.ts              # REST client wrapping all backend endpoints
│   └── components/
│       ├── Header.tsx          # Dual-jurisdiction switcher, language selector, nav tabs
│       ├── DisclaimerBanner.tsx# Statutory disclaimer banner
│       ├── ChatAssistant.tsx   # RAG chatbot with voice input, audio speech, citations, dossier
│       ├── ProductClassifier.tsx # 5-question classification & documentation roadmap
│       ├── PatentGuide.tsx     # §3(p), §3(e) Synergism calculator, Form 1 to Form III
│       ├── TrademarkGuide.tsx  # Nice classes & Section 9 generic Sanskrit word checker
│       ├── ABSComplianceHelper.tsx # NBA / SBB obligations & 2023 Amendment relief
│       ├── TKDLPriorArt.tsx    # Classical treatises & patent drafting strategies
│       ├── InternationalExport.tsx # USA DSHEA, EU THMPD, UK, Japan, Australia matrices
│       ├── KnowledgeGraphViewer.tsx # Interactive node-link relational graph explorer
│       ├── AdminDashboard.tsx  # Document management & DPDP compliant query audit logs
│       ├── HumanEscalationModal.tsx # Expert triage & human review ticket creator
│       └── ArchitectureModal.tsx    # SIH 2026 Architectural Dossier (Current View)
├── metadata.json               # Application metadata & permissions
├── index.html                  # HTML entry with typography & meta tags
└── package.json                # Dependencies and full-stack build scripts`}
            </pre>
          </div>
        </div>

        {/* 3. Database Schema Design */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <Database className="w-4 h-4" />
            <span>3. Database Schema (PostgreSQL / Relational / Vector Spec)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800 space-y-1">
              <span className="font-bold text-amber-300 font-mono">1. knowledge_documents</span>
              <ul className="text-stone-400 font-mono text-[10px] space-y-0.5">
                <li>id: UUID PRIMARY KEY</li>
                <li>title: VARCHAR(255)</li>
                <li>organization: VARCHAR(100)</li>
                <li>jurisdiction: VARCHAR(20) [india|intl|both]</li>
                <li>category: VARCHAR(50) [Patents|D&C|ABS|FSSAI]</li>
                <li>act_or_rule: VARCHAR(150)</li>
                <li>section_article: VARCHAR(100)</li>
                <li>content: TEXT</li>
                <li>embedding: vector(768) -- pgvector index</li>
                <li>status: VARCHAR(20) [active|archived]</li>
              </ul>
            </div>

            <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800 space-y-1">
              <span className="font-bold text-emerald-300 font-mono">2. audit_logs (DPDP Compliant)</span>
              <ul className="text-stone-400 font-mono text-[10px] space-y-0.5">
                <li>id: UUID PRIMARY KEY</li>
                <li>timestamp: TIMESTAMPTZ DEFAULT NOW()</li>
                <li>query_topic: TEXT (Zero PII logged)</li>
                <li>jurisdiction: VARCHAR(20)</li>
                <li>confidence_score: INTEGER (0-100)</li>
                <li>confidence_level: VARCHAR(10) [high|mod|low]</li>
                <li>retrieved_doc_ids: UUID[]</li>
                <li>escalation_triggered: BOOLEAN</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. Phased Development Roadmap */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <GitBranch className="w-4 h-4" />
            <span>4. Phased Implementation Roadmap (SIH 2026 Deliverables)</span>
          </h3>

          <div className="space-y-2 text-xs">
            {[
              {
                phase: 'Phase 1: MVP Core (Completed)',
                desc: 'Full-stack Express/React app, statutory knowledge base with 12+ authoritative acts, RAG engine with Gemini 3.8 Flash structured synthesis, dual-jurisdiction routing, and interactive legal disclaimer.'
              },
              {
                phase: 'Phase 2: Specialized Engines (Completed)',
                desc: 'Product classification wizard, Section 3(e) empirical synergism calculator, Section 9 generic Sanskrit trademark risk checker, NBA/SBB ABS helper with 2023 Amendment relief, and TKDL prior art pointer.'
              },
              {
                phase: 'Phase 3: Relational Graph & Multi-country Matrices (Completed)',
                desc: 'Interactive 30+ node knowledge graph connecting products, laws, and authorities; bilateral export matrices for USA, EU, UK, Japan, Australia; voice input and text-to-speech.'
              },
              {
                phase: 'Phase 4: National Scale Integration (Future Work)',
                desc: 'Direct API integration with IP India InPASS for real-time patent status, single sign-on with MeriPehchan / DigiLocker, and formal integration with Ministry of Ayush e-Aushadhi portal.'
              }
            ].map((p, idx) => (
              <div key={idx} className="p-3 bg-stone-950 rounded-xl border border-stone-800 space-y-0.5">
                <span className="font-bold text-stone-200">{p.phase}</span>
                <p className="text-stone-400 text-[11px] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
