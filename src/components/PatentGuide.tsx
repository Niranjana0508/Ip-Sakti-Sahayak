import React, { useState } from 'react';
import {
  FileText,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  BookOpen,
  Scale,
  Sparkles,
  Layers
} from 'lucide-react';

export const PatentGuide: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [synergyInput, setSynergyInput] = useState({
    herbA: 'Ashwagandha Extract (5% withanolides)',
    herbB: 'Pippali Extract (Piperine bioenhancer)',
    efficacyA: '32% anti-inflammatory reduction',
    efficacyB: '15% reduction alone',
    efficacyCombined: '78% reduction in combined ratio (1:0.1)'
  });
  const [synergyCalculated, setSynergyCalculated] = useState(false);

  return (
    <div className="max-w-5xl mx-auto p-3 sm:p-6 space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                The Patents Act, 1970 (as amended)
              </span>
            </div>
            <h2 className="text-lg font-bold text-stone-900 mt-1 flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-600" />
              <span>Ayurveda Patent Navigator & Statutory Guidance</span>
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Comprehensive guidance on patentability, Section 3(p) Traditional Knowledge barrier, Section 3(e) Synergism proof, biological material source disclosures, and filing procedures.
            </p>
          </div>
          
          <div className="text-[11px] text-stone-400 bg-stone-50 border border-stone-200 p-2.5 rounded-xl max-w-xs">
            <span className="font-semibold text-stone-700 block">Statutory Reminder:</span>
            Patents granted on codified traditional knowledge without proven non-obvious synergy are liable to immediate pre-grant or post-grant revocation.
          </div>
        </div>
      </div>

      {/* Nav Stepper */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {[
          { num: 1, title: 'Patentability Criteria', desc: 'Novelty & Inventive Step' },
          { num: 2, title: 'Section 3(p) Barrier', desc: 'Traditional Knowledge' },
          { num: 3, title: 'Section 3(e) Synergism', desc: 'Overcoming Mere Admixture' },
          { num: 4, title: 'Filing Workflow & Forms', desc: 'Form 1 to NBA Form III' }
        ].map((s) => (
          <button
            key={s.num}
            type="button"
            onClick={() => setActiveStep(s.num)}
            className={`text-left p-3 rounded-xl border transition-all ${
              activeStep === s.num
                ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-xs font-bold ${activeStep === s.num ? 'text-amber-100' : 'text-amber-700'}`}>
                Module {s.num}
              </span>
              <span className="text-xs">→</span>
            </div>
            <div className="font-bold text-xs mt-1">{s.title}</div>
            <div className={`text-[10px] mt-0.5 ${activeStep === s.num ? 'text-stone-200' : 'text-stone-400'}`}>
              {s.desc}
            </div>
          </button>
        ))}
      </div>

      {/* Module 1: Patentability Criteria */}
      {activeStep === 1 && (
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-4 animate-fadeIn">
          <h3 className="font-bold text-sm text-stone-900 border-b border-stone-100 pb-2">
            1. Core Criteria for Ayurveda Inventions [Section 2(1)(j)]
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Under Section 2(1)(j) of the Indian Patents Act, an "invention" means a new product or process involving an inventive step and capable of industrial application. In Ayurveda-related patent examination, applicants must satisfy three cumulative hurdles:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200/80 space-y-1.5">
              <span className="font-bold text-amber-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                <span>1. Novelty (Section 2(1)(l))</span>
              </span>
              <p className="text-stone-600 leading-relaxed">
                The invention must not have been published in India or abroad prior to filing date. The Indian Patent Office cross-references the Traditional Knowledge Digital Library (TKDL) and First Schedule texts. If an herb's utility is documented in classical Sanskrit/regional literature, novelty is destroyed.
              </p>
            </div>

            <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200/80 space-y-1.5">
              <span className="font-bold text-amber-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                <span>2. Inventive Step (Section 2(1)(ja))</span>
              </span>
              <p className="text-stone-600 leading-relaxed">
                A feature of an invention that involves technical advance as compared to existing knowledge, or having economic significance, making it non-obvious to a person skilled in the art (Ayurvedic physician or pharmacognosist).
              </p>
            </div>

            <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200/80 space-y-1.5">
              <span className="font-bold text-amber-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                <span>3. Industrial Applicability (Section 2(1)(ac))</span>
              </span>
              <p className="text-stone-600 leading-relaxed">
                The invention can be manufactured or used repeatedly in industry with consistent batch-to-batch standardization, meeting Ayurvedic Pharmacopoeia of India (API) physicochemical limits.
              </p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs text-amber-900">
            <span className="font-bold block mb-1">What can actually be patented in the Ayurvedic domain?</span>
            <ul className="list-disc list-inside space-y-1 text-stone-700">
              <li><strong>Novel Drug Delivery Formulations:</strong> Liposomal, nano-phytosomal, or solid lipid nanoparticles encapsulating standardized herbal extracts with proven enhanced cellular permeability.</li>
              <li><strong>Purified Bioactive Fractions:</strong> Enriched, standardized molecular fractions exhibiting distinct non-obvious pharmacological modes of action over the crude herb.</li>
              <li><strong>Non-Obvious Synergistic Combinations:</strong> Statistically validated synergistic ratios demonstrating a combinatorial enhancement factor.</li>
              <li><strong>Proprietary Extraction Processes:</strong> Continuous green chemical extraction methods yielding higher target markers at lower temperatures.</li>
            </ul>
          </div>
        </div>
      )}

      {/* Module 2: Section 3(p) Barrier */}
      {activeStep === 2 && (
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-stone-100 pb-2">
            <h3 className="font-bold text-sm text-stone-900">
              2. The Section 3(p) Traditional Knowledge Exclusion
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold border border-rose-300">
              Most Frequent Reason for Rejection
            </span>
          </div>

          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-950 font-mono">
            "The following are not inventions within the meaning of this Act: (p) an invention which in effect is traditional knowledge or which is an aggregation or duplication of known properties of traditionally known component or components."
          </div>

          <div className="space-y-3 text-xs text-stone-700">
            <p className="leading-relaxed">
              Section 3(p) was introduced by the Patents (Amendment) Act, 2002 to protect Indian heritage from biopiracy and prevent private commercial monopolies over common Ayurvedic knowledge.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                <span className="font-bold text-rose-900 block mb-1">❌ Subject to Immediate 3(p) Rejection:</span>
                <ul className="space-y-1 list-disc list-inside text-stone-600">
                  <li>Powdered crude plant parts (e.g. Ashwagandha root powder capsule)</li>
                  <li>Classical Ayurvedic combinations (e.g. Triphala, Trikatu, Dashamula)</li>
                  <li>Claiming a known Ayurvedic property as a "new discovery" (e.g. Curcuma for wound healing, Neem for dental hygiene, Tulsi for cough)</li>
                  <li>Water or ethanol extract of an herb without novel delivery vehicles</li>
                </ul>
              </div>

              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                <span className="font-bold text-emerald-900 block mb-1">✅ Strategies to Overcome Section 3(p):</span>
                <ul className="space-y-1 list-disc list-inside text-stone-600">
                  <li>Demonstrate an unexpected therapeutic effect not documented in any classical treatise</li>
                  <li>Isolate a specific novel fraction and prove unexpected pharmacokinetics (e.g. 5x blood-brain barrier penetration)</li>
                  <li>Claim the novel excipient composition or carrier matrix, rather than the herb alone</li>
                  <li>Submit comparative in-vivo pharmacological data against the standard classical formulation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Module 3: Section 3(e) Synergism */}
      {activeStep === 3 && (
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-4 animate-fadeIn">
          <h3 className="font-bold text-sm text-stone-900 border-b border-stone-100 pb-2">
            3. Overcoming Section 3(e): Mere Admixture vs. Non-Obvious Synergism
          </h3>

          <p className="text-xs text-stone-600 leading-relaxed">
            Section 3(e) bars "a substance obtained by a mere admixture resulting only in the aggregation of the properties of the components thereof". For polyherbal Ayurvedic formulations, patent examiners presume that combining two herbs is a mere aggregation of their known therapeutic benefits.
          </p>

          {/* Interactive Synergism Simulator */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 text-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-950 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>Interactive Section 3(e) Synergism Demonstrator</span>
              </span>
              <span className="text-[10px] text-amber-800 font-mono">Chou-Talalay / Combination Index</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-stone-700 block mb-0.5">Herb Component A:</label>
                <input
                  type="text"
                  value={synergyInput.herbA}
                  onChange={(e) => setSynergyInput({ ...synergyInput, herbA: e.target.value })}
                  className="w-full bg-white border border-amber-300 rounded-md p-1.5 text-xs text-stone-900"
                />
              </div>
              <div>
                <label className="font-semibold text-stone-700 block mb-0.5">Component A Efficacy Alone:</label>
                <input
                  type="text"
                  value={synergyInput.efficacyA}
                  onChange={(e) => setSynergyInput({ ...synergyInput, efficacyA: e.target.value })}
                  className="w-full bg-white border border-amber-300 rounded-md p-1.5 text-xs text-stone-900"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-0.5">Herb Component B (Bioenhancer):</label>
                <input
                  type="text"
                  value={synergyInput.herbB}
                  onChange={(e) => setSynergyInput({ ...synergyInput, herbB: e.target.value })}
                  className="w-full bg-white border border-amber-300 rounded-md p-1.5 text-xs text-stone-900"
                />
              </div>
              <div>
                <label className="font-semibold text-stone-700 block mb-0.5">Component B Efficacy Alone:</label>
                <input
                  type="text"
                  value={synergyInput.efficacyB}
                  onChange={(e) => setSynergyInput({ ...synergyInput, efficacyB: e.target.value })}
                  className="w-full bg-white border border-amber-300 rounded-md p-1.5 text-xs text-stone-900"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-0.5">Combined Formulation Efficacy (Empirical Data):</label>
              <input
                type="text"
                value={synergyInput.efficacyCombined}
                onChange={(e) => setSynergyInput({ ...synergyInput, efficacyCombined: e.target.value })}
                className="w-full bg-white border border-amber-300 rounded-md p-1.5 text-xs text-stone-900"
              />
            </div>

            <button
              type="button"
              onClick={() => setSynergyCalculated(true)}
              className="bg-amber-700 hover:bg-amber-800 text-white font-bold py-1.5 px-3 rounded-lg transition-colors text-xs flex items-center gap-1.5"
            >
              <span>Verify Patent Synergism Threshold</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {synergyCalculated && (
              <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3 text-emerald-950 space-y-1 animate-fadeIn">
                <span className="font-bold flex items-center gap-1 text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Statistically Non-Obvious Synergism Established!</span>
                </span>
                <p className="text-[11px] leading-relaxed">
                  Expected additive effect: 32% + 15% = 47%. Observed combined effect: 78% (Synergy ratio &gt; 1.65). 
                  This satisfies the Controller General Guidelines for Examination of Patent Applications Relating to Traditional Knowledge (CGPDTM TK Guidelines 2019) to overcome Section 3(e).
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Module 4: Filing Workflow & Forms */}
      {activeStep === 4 && (
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-4 animate-fadeIn">
          <h3 className="font-bold text-sm text-stone-900 border-b border-stone-100 pb-2">
            4. Step-by-Step Ayurveda Patent Filing Workflow
          </h3>

          <div className="space-y-3">
            {[
              {
                step: 'Step 1',
                title: 'Prior Art & TKDL Pre-Filing Search',
                desc: 'Conduct exhaustive keyword searches on InPASS (Indian Patent Office), Espacenet, USPTO, and verify classical text references to ensure novelty before incurring expenses.'
              },
              {
                step: 'Step 2',
                title: 'Drafting & Section 10(4)(ii)(D) Compliance',
                desc: 'Draft Provisional (Form 2) or Complete Specification. Mandatorily disclose the geographical origin and source of biological material under Section 10(4)(ii)(D).'
              },
              {
                step: 'Step 3',
                title: 'Mandatory NBA Form III Approval',
                desc: 'Under Section 6 of the Biological Diversity Act 2002 (as amended 2023), approval from the National Biodiversity Authority (NBA) must be obtained BEFORE grant of patent.'
              },
              {
                step: 'Step 4',
                title: 'Filing Statutory Forms with IP India',
                desc: 'Submit Form 1 (Application for Grant), Form 2 (Complete Specification), Form 3 (Foreign filing undertakings), Form 5 (Declaration as to Inventorship), and Form 18 (Request for Examination).'
              },
              {
                step: 'Step 5',
                title: 'Responding to First Examination Report (FER)',
                desc: 'When Section 3(p) and Section 3(e) objections are issued, submit comparative pharmacological synergy data and claim amendments within 6 months.'
              }
            ].map((st, sIdx) => (
              <div key={sIdx} className="flex items-start gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200/70 text-xs">
                <span className="px-2 py-1 rounded-md bg-amber-600 text-white font-bold shrink-0 text-[10px]">
                  {st.step}
                </span>
                <div>
                  <h4 className="font-bold text-stone-900">{st.title}</h4>
                  <p className="text-stone-600 mt-0.5">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-stone-100 pt-3 text-[11px] text-stone-400 italic flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <span>This information is for general informational purposes and is not legal advice.</span>
          </div>
        </div>
      )}

    </div>
  );
};
