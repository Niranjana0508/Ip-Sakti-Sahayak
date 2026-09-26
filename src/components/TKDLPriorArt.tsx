import React, { useState } from 'react';
import {
  PriorArtCheckInput,
  PriorArtResult
} from '../types';
import { checkPriorArtApi } from '../services/api';
import {
  BookOpen,
  Search,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Scroll
} from 'lucide-react';

export const TKDLPriorArt: React.FC = () => {
  const [formData, setFormData] = useState<PriorArtCheckInput>({
    inventionTitle: 'Synergistic adaptogenic formula for chronic stress and neuro-protection',
    formulationIngredients: 'Ashwagandha (Withania somnifera), Brahmi (Bacopa monnieri), Piperine bioenhancer',
    claimedTherapeuticEffect: 'Stress reduction, cognitive enhancement, anti-amnesic protection',
    isSynergisticClaim: true
  });

  const [result, setResult] = useState<PriorArtResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await checkPriorArtApi(formData);
      setResult(res);
    } catch (err: any) {
      console.error('Prior art check error:', err);
      alert('Failed to search prior art. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadExample = (type: 'turmeric' | 'triphala' | 'guduchi') => {
    if (type === 'turmeric') {
      setFormData({
        inventionTitle: 'Topical anti-inflammatory ointment for dermal wound healing',
        formulationIngredients: 'Curcuma longa (Haridra / Turmeric rhizome powder), Coconut oil vehicle',
        claimedTherapeuticEffect: 'Wound closure acceleration, microbial decontamination, burn healing',
        isSynergisticClaim: false
      });
    } else if (type === 'triphala') {
      setFormData({
        inventionTitle: 'Ophthalmic drop formulation for cataract prevention and dry eye syndrome',
        formulationIngredients: 'Triphala (Haritaki, Bibhitaki, Amalaki aqueous decoction) in purified water',
        claimedTherapeuticEffect: 'Chakshushya (eye rejuvenating), visual acuity preservation',
        isSynergisticClaim: false
      });
    } else {
      setFormData({
        inventionTitle: 'Nano-liposomal Guduchi extract with modified phospholipid carrier',
        formulationIngredients: 'Tinospora cordifolia (Giloy) isolated diterpene glycosides + Soy lecithin',
        claimedTherapeuticEffect: 'Immunomodulation, fever management, macrophage phagocytosis enhancement',
        isSynergisticClaim: true
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-3 sm:p-6 space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                Traditional Knowledge Pointer
              </span>
            </div>
            <h2 className="text-lg font-bold text-stone-900 mt-1 flex items-center gap-2">
              <Scroll className="w-5 h-5 text-amber-600" />
              <span>TKDL-Inspired Prior Art & Classical Text Cross-Reference</span>
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Screen your Ayurvedic formulation against 54 First Schedule treatises (Charaka, Sushruta, Vagbhata) and identify potential Section 3(p) Traditional Knowledge patent obstacles.
            </p>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-stone-400 font-medium">Load Scenarios:</span>
            <button
              type="button"
              onClick={() => loadExample('turmeric')}
              className="text-[11px] px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium"
            >
              Turmeric Wound Case
            </button>
            <button
              type="button"
              onClick={() => loadExample('triphala')}
              className="text-[11px] px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium"
            >
              Triphala Ophthalmic
            </button>
            <button
              type="button"
              onClick={() => loadExample('guduchi')}
              className="text-[11px] px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium"
            >
              Liposomal Giloy
            </button>
          </div>
        </div>
      </div>

      {/* Mandatory TKDL Disclaimer Banner */}
      <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block">Statutory Disclaimer Regarding TKDL Access:</span>
          <p className="text-[11px] text-amber-800 leading-tight">
            This module is an educational guidance tool, <strong>NOT a certified search of the official, restricted Traditional Knowledge Digital Library (TKDL) database</strong> managed by CSIR and Ministry of Ayush. Official TKDL searches are accessed exclusively by international patent examiners under bilateral access agreements.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Input Form */}
        <div className="lg:col-span-5 bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 border-b border-stone-100 pb-2">
            Invention & Botanical Claims
          </h3>

          <form onSubmit={handleSearch} className="space-y-3.5 text-xs">
            <div>
              <label className="font-semibold text-stone-700 block mb-1">
                Proposed Invention Title *
              </label>
              <input
                type="text"
                value={formData.inventionTitle}
                onChange={(e) => setFormData({ ...formData, inventionTitle: e.target.value })}
                placeholder="e.g. Polyherbal adaptogenic composition for cognitive health..."
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 focus:ring-1 focus:ring-amber-500 focus:outline-hidden"
                required
              />
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">
                Formulation Ingredients / Botanical Extracts *
              </label>
              <textarea
                value={formData.formulationIngredients}
                onChange={(e) => setFormData({ ...formData, formulationIngredients: e.target.value })}
                placeholder="e.g. Ashwagandha, Haridra, Tulsi, Pippali..."
                rows={3}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 focus:ring-1 focus:ring-amber-500 focus:outline-hidden resize-none"
                required
              />
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">
                Claimed Therapeutic / Pharmacological Effect *
              </label>
              <input
                type="text"
                value={formData.claimedTherapeuticEffect}
                onChange={(e) => setFormData({ ...formData, claimedTherapeuticEffect: e.target.value })}
                placeholder="e.g. Anti-inflammatory, wound healing, stress relief..."
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 focus:ring-1 focus:ring-amber-500 focus:outline-hidden"
                required
              />
            </div>

            <div className="flex items-center gap-2 p-2.5 bg-stone-50 rounded-xl border border-stone-200">
              <input
                type="checkbox"
                id="isSynergyCheck"
                checked={formData.isSynergisticClaim}
                onChange={(e) => setFormData({ ...formData, isSynergisticClaim: e.target.checked })}
                className="rounded-sm text-amber-600 focus:ring-amber-500"
              />
              <label htmlFor="isSynergyCheck" className="text-stone-700 font-medium cursor-pointer">
                Claiming non-obvious synergistic ratio or novel drug delivery carrier (Section 3(e) defense)
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              {loading ? (
                <span>Screening Classical Treatises...</span>
              ) : (
                <>
                  <span>Screen for Prior Art Citations</span>
                  <Search className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Output */}
        <div className="lg:col-span-7 space-y-4">
          {result ? (
            <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-4 animate-fadeIn">
              
              {/* Status Header */}
              <div className="flex items-start justify-between gap-3 border-b border-stone-100 pb-3">
                <div>
                  <span className="text-[11px] font-bold tracking-wider uppercase text-amber-700">
                    Prior Art Analysis Finding
                  </span>
                  <h3 className="text-base font-bold text-stone-900 mt-0.5">
                    {result.status}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-stone-500">
                      Relevance Match: <strong>{result.confidenceScore}%</strong>
                    </span>
                    <span className="text-stone-300">&bull;</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      result.section3pRisk === 'High' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      Section 3(p) Risk: {result.section3pRisk}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      result.section3eRisk === 'High' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      Section 3(e) Risk: {result.section3eRisk}
                    </span>
                  </div>
                </div>
              </div>

              {/* TKDL Relevance Note */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700 leading-relaxed">
                <span className="font-bold text-stone-900 block mb-1">Traditional Knowledge Analysis:</span>
                {result.tkdlRelevanceNote}
              </div>

              {/* Classical Sanskrit Citations */}
              <div>
                <span className="text-xs font-bold text-stone-600 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-amber-600" />
                  <span>Suggested Classical References to Review ({result.classicalCitations.length})</span>
                </span>
                <div className="space-y-2">
                  {result.classicalCitations.map((c, cIdx) => (
                    <div key={cIdx} className="bg-amber-50/40 border border-amber-200/70 rounded-xl p-3 text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold text-amber-950">
                        <span>📜 {c.textName} &bull; {c.chapterOrKanda}</span>
                        <span className="text-[10px] bg-white px-2 py-0.5 rounded-md border border-amber-300 font-mono text-amber-900">
                          {c.shlokaRef}
                        </span>
                      </div>
                      <div className="text-stone-700 text-[11px]">
                        <strong>Classical Indication:</strong> <span className="italic font-serif">{c.classicalIndication}</span>
                      </div>
                      <p className="text-stone-600 text-[11px]">
                        <strong>Similarity Rationale:</strong> {c.similarityRationale}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Patent Drafting Recommendations */}
              <div>
                <span className="text-xs font-bold text-stone-600 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Patent Drafting Strategies (Overcoming §3(p) & §3(e))</span>
                </span>
                <ul className="space-y-1.5 text-xs text-stone-700 bg-stone-50 p-3 rounded-xl border border-stone-100">
                  {result.patentabilityRecommendations.map((rec, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Drafting Tips */}
              <div>
                <span className="text-xs font-bold text-stone-600 uppercase tracking-wider block mb-1.5">
                  Specification Drafting Safeguards
                </span>
                <ul className="space-y-1 text-xs text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-100">
                  {result.draftingTips.map((tip, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ) : (
            <div className="h-full bg-stone-50 border-2 border-dashed border-stone-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center text-stone-400">
              <BookOpen className="w-12 h-12 text-stone-300 mb-3" />
              <h4 className="font-bold text-stone-600 text-sm">No Prior Art Search Executed</h4>
              <p className="text-xs max-w-sm mt-1">
                Enter your formulation title and herbs on the left to identify classical Sanskrit references and Section 3(p) considerations.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
