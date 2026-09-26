import React, { useState } from 'react';
import {
  Compass,
  CheckCircle2,
  AlertTriangle,
  Search,
  ShieldCheck,
  ShieldAlert,
  Award,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const GENERIC_SANSKRIT_WORDS = [
  'ashwagandha', 'triphala', 'amla', 'amalaki', 'haritaki', 'bibhitaki',
  'brahmi', 'shatavari', 'tulsi', 'guduchi', 'giloy', 'neem', 'nimba',
  'haldi', 'haridra', 'churna', 'vati', 'gutika', 'taila', 'tailam',
  'ghrita', 'ghritam', 'arishta', 'asava', 'bhasma', 'rasa', 'rasayana',
  'kwatha', 'kashaya', 'leha', 'avaleha', 'ojas', 'prana', 'ayur',
  'ayurveda', 'dosha', 'vata', 'pitta', 'kapha', 'panchakarma', 'swarna',
  'rajata', 'guggulu', 'shilajit', 'kumkumadi', 'chandana', 'kesar'
];

export const TrademarkGuide: React.FC = () => {
  const [testName, setTestName] = useState('Ashwagandha Pure Drops');
  const [analysisResult, setAnalysisResult] = useState<{
    status: 'high_risk' | 'moderate_risk' | 'distinctive';
    flaggedWords: string[];
    explanation: string;
    suggestions: string[];
  } | null>(null);

  const analyzeTrademarkName = () => {
    const cleaned = testName.toLowerCase().trim();
    const words = cleaned.split(/[\s\-_]+/);
    const flagged = words.filter(w => GENERIC_SANSKRIT_WORDS.includes(w));

    if (flagged.length > 0 && words.length <= flagged.length + 1) {
      setAnalysisResult({
        status: 'high_risk',
        flaggedWords: flagged,
        explanation: `The proposed mark contains generic Ayurvedic / Sanskrit terms (${flagged.map(f => `"${f}"`).join(', ')}) that are descriptive of the active ingredient or classical dosage form. Under Section 9(1)(b) of the Trade Marks Act, 1999, marks consisting exclusively of designations which serve in trade to designate the kind, quality, or intended purpose cannot be monopolized.`,
        suggestions: [
          `Coin a fanciful or arbitrary prefix/suffix (e.g. instead of "${testName}", try "ZonAshwa" or "VedaLuminate")`,
          'Combine the botanical term with a distinctive proprietary house mark / logo',
          'File as a composite device mark with a disclaimer disclaiming exclusive rights to the generic botanical word'
        ]
      });
    } else if (flagged.length > 0) {
      setAnalysisResult({
        status: 'moderate_risk',
        flaggedWords: flagged,
        explanation: `The mark contains botanical references (${flagged.map(f => `"${f}"`).join(', ')}) but includes other elements. The Trade Marks Registry will likely require an explicit disclaimer under Section 17 disclaiming the botanical name.`,
        suggestions: [
          'Ensure the brand logo / font design is highly unique and distinctive',
          'Include a non-descriptive prominent coined master brand'
        ]
      });
    } else {
      setAnalysisResult({
        status: 'distinctive',
        flaggedWords: [],
        explanation: `No obvious generic classical Sanskrit ingredient terms detected. The proposed name appears to be coined/arbitrary, which enjoys prima facie distinctiveness under Section 9 of the Trade Marks Act, 1999.`,
        suggestions: [
          'Conduct an official identical and phonetic search on the IP India Trade Mark public search portal (ipindiaonline.gov.in)',
          'Check for conflicting phonetically similar marks under Section 11',
          'Consider multi-class protection (Class 5 + Class 3 or Class 30)'
        ]
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
                The Trade Marks Act, 1999
              </span>
            </div>
            <h2 className="text-lg font-bold text-stone-900 mt-1 flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-600" />
              <span>Ayurveda Trademark Guidance & Nice Classification</span>
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Protect your brand name, navigate Section 9 generic Sanskrit word refusals, select the right Nice classes, and understand the Ayush Quality Mark.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-300 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span>Ayush Standard & Premium Marks</span>
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Section 9 Generic Sanskrit Word Checker */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-2">
          <h3 className="font-bold text-xs uppercase tracking-wider text-stone-700 flex items-center gap-2">
            <Search className="w-4 h-4 text-amber-600" />
            <span>Interactive Sanskrit / Generic Term Risk Checker (Section 9)</span>
          </h3>
          <span className="text-[10px] text-stone-400">Trade Marks Act § 9(1)(b)</span>
        </div>

        <p className="text-xs text-stone-600">
          Enter your proposed Ayurveda brand name. The engine evaluates whether it uses generic Sanskrit botanical names, classical dosage forms (Churna, Vati, Taila), or laudatory terms that trademark examiners refuse under Section 9.
        </p>

        <div className="flex gap-2">
          <input
            type="text"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
            placeholder="e.g. Ashwagandha Pure, Triphala Gold, VedaLuminate..."
            className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
          />
          <button
            type="button"
            onClick={analyzeTrademarkName}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <span>Analyze Mark</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {analysisResult && (
          <div
            className={`p-4 rounded-xl border text-xs space-y-2 animate-fadeIn ${
              analysisResult.status === 'high_risk'
                ? 'bg-rose-50 border-rose-200 text-rose-950'
                : analysisResult.status === 'moderate_risk'
                ? 'bg-amber-50 border-amber-200 text-amber-950'
                : 'bg-emerald-50 border-emerald-200 text-emerald-950'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                {analysisResult.status === 'high_risk' && <ShieldAlert className="w-4 h-4 text-rose-600" />}
                {analysisResult.status === 'moderate_risk' && <AlertTriangle className="w-4 h-4 text-amber-600" />}
                {analysisResult.status === 'distinctive' && <ShieldCheck className="w-4 h-4 text-emerald-600" />}
                <span>
                  {analysisResult.status === 'high_risk'
                    ? 'High Risk of Section 9 Rejection (Descriptive/Generic)'
                    : analysisResult.status === 'moderate_risk'
                    ? 'Moderate Risk (Disclaimer Required)'
                    : 'Favorable: Inherently Distinctive Coined Mark'}
                </span>
              </span>
            </div>

            <p className="leading-relaxed">{analysisResult.explanation}</p>

            {analysisResult.flaggedWords.length > 0 && (
              <div className="flex items-center gap-1.5 pt-1">
                <span className="font-semibold text-[11px]">Flagged Sanskrit/Botanical elements:</span>
                {analysisResult.flaggedWords.map((w, idx) => (
                  <span key={idx} className="bg-white px-2 py-0.5 rounded-md border border-stone-300 font-mono font-bold text-[10px]">
                    {w}
                  </span>
                ))}
              </div>
            )}

            <div className="border-t border-stone-200/60 pt-2">
              <span className="font-semibold block mb-1">Strategic Recommendations:</span>
              <ul className="list-disc list-inside space-y-0.5">
                {analysisResult.suggestions.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Key Nice Classes for Ayurveda */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-4">
        <h3 className="font-bold text-xs uppercase tracking-wider text-stone-700 border-b border-stone-100 pb-2">
          Key International Nice Classification Classes for Ayurveda
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          {[
            {
              cls: 'Class 5',
              title: 'Ayurvedic Medicines & Pharmaceuticals',
              desc: 'Classical Ayurvedic drugs (Churna, Vati, Asava, Bhasma), Patent or Proprietary Medicines (PPM), herbal medical teas, therapeutic skin ointments, medicated oils.'
            },
            {
              cls: 'Class 3',
              title: 'Herbal Cosmetics & Personal Care',
              desc: 'Non-medicinal Ayurvedic skin care, Kumkumadi face oils, herbal shampoos, hair re-growth oils, botanical soaps, herbal toothpastes, beauty serums.'
            },
            {
              cls: 'Class 30',
              title: 'Herbal Teas, Seasonings & Spices',
              desc: 'Culinary herbal teas, botanical spice blends, ginger/cardamom infusions, herbal honey, non-medicinal food seasonings.'
            },
            {
              cls: 'Class 32',
              title: 'Herbal Beverages & Tonics',
              desc: 'Non-alcoholic health drinks, Ayush Aahar functional juices, Aloe vera juices, energy tonics, herbal syrups (non-medicinal).'
            },
            {
              cls: 'Class 44',
              title: 'Panchakarma & Clinical Services',
              desc: 'Ayurvedic wellness retreats, Panchakarma therapies, holistic medical consultation, traditional pulse diagnosis (Nadi Pariksha) centers.'
            },
            {
              cls: 'Class 42 / 35',
              title: 'R&D, Clinical Trials & E-Commerce',
              desc: 'Pharmacological herbal testing services (Class 42), wholesale distribution and e-commerce retail of herbal goods (Class 35).'
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-stone-50 p-3.5 rounded-xl border border-stone-200/80 space-y-1">
              <span className="font-bold text-amber-800 text-xs flex items-center justify-between">
                <span>{item.cls}</span>
                <span className="text-[10px] text-stone-400 font-normal">Nice Classification</span>
              </span>
              <div className="font-semibold text-stone-900">{item.title}</div>
              <p className="text-stone-600 text-[11px] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ayush Standard & Premium Mark Scheme */}
      <div className="bg-stone-900 text-stone-100 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-800 pb-2">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-sm text-stone-100">
              Ayush Standard Mark vs. Ayush Premium Mark (QCI Scheme)
            </h3>
          </div>
          <span className="text-[10px] text-stone-400">Quality Council of India (QCI)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-stone-800 p-4 rounded-xl border border-stone-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-300 text-sm">Ayush Standard Mark</span>
              <span className="text-[10px] bg-stone-700 px-2 py-0.5 rounded-md text-stone-300">Domestic India</span>
            </div>
            <p className="text-stone-300 leading-relaxed">
              Awarded to manufacturers who strictly comply with Good Manufacturing Practice (GMP) standards as specified in Schedule T of the Drugs and Cosmetics Rules, 1945, and who conform to the identity, purity, and strength standards of the Ayurvedic Pharmacopoeia of India (API).
            </p>
          </div>

          <div className="bg-stone-800 p-4 rounded-xl border border-stone-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-300 text-sm">Ayush Premium Mark</span>
              <span className="text-[10px] bg-emerald-950 border border-emerald-700 px-2 py-0.5 rounded-md text-emerald-300">Global Export</span>
            </div>
            <p className="text-stone-300 leading-relaxed">
              Awarded based on compliance with WHO Guidelines on Good Manufacturing Practices for Herbal Medicines and stringent heavy metal, pesticide, and aflatoxin contamination limits conforming to US FDA and European Pharmacopoeia norms. Essential for smooth customs clearance and international consumer trust.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
