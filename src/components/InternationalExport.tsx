import React, { useState } from 'react';
import {
  Globe,
  CheckCircle2,
  AlertTriangle,
  Building2,
  FileCheck,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  Layers,
  Scale
} from 'lucide-react';

interface CountryDossier {
  id: string;
  name: string;
  flag: string;
  regulator: string;
  category: string;
  primaryLaw: string;
  allowedClaims: string;
  prohibitedClaims: string;
  qualityStandard: string;
  ipRoute: string;
  keyChallenge: string;
}

const COUNTRIES: CountryDossier[] = [
  {
    id: 'usa',
    name: 'United States of America',
    flag: '🇺🇸',
    regulator: 'US Food and Drug Administration (FDA) & FTC',
    category: 'Dietary Supplement (DSHEA 1994)',
    primaryLaw: 'Dietary Supplement Health and Education Act (DSHEA), 21 CFR Part 111 (cGMP)',
    allowedClaims: 'Structure/Function claims (e.g. "supports cognitive function", "helps maintain healthy joints") with mandatory 21 CFR 101.93 disclaimer',
    prohibitedClaims: 'Disease prevention, mitigation, diagnosis, or cure (e.g. "cures arthritis", "treats diabetes", "lowers high blood pressure")',
    qualityStandard: '21 CFR Part 111 cGMP compliance, California Proposition 65 limits for Lead (<0.5 mcg/day), Arsenic, Cadmium',
    ipRoute: 'USPTO Patent, Madrid Protocol US Designation (USPTO Trademark Class 5)',
    keyChallenge: 'Immediate FDA Warning Letters and Import Alerts for making disease claims or unapproved heavy metal levels in herbo-mineral Bhasmas.'
  },
  {
    id: 'eu',
    name: 'European Union',
    flag: '🇪🇺',
    regulator: 'European Medicines Agency (EMA) / HMPC & EFSA',
    category: 'Traditional Herbal Medicinal Product (THMP) or Food Supplement',
    primaryLaw: 'Directive 2004/24/EC (THMPD) & Food Supplements Directive 2002/46/EC',
    allowedClaims: 'Simplified registration requiring proof of at least 30 years medicinal use (including 15 years within the EU)',
    prohibitedClaims: 'Medicinal claims prohibited for food supplements. Novel Food Regulation (EU 2015/2283) restricts herbs not consumed before 1997',
    qualityStandard: 'EU Good Manufacturing Practice (EU-GMP), European Pharmacopoeia botanical monograph limits',
    ipRoute: 'European Patent Office (EPO), EUIPO Trademark',
    keyChallenge: 'Novel Food approval hurdle for exotic Indian herbs, and difficulty demonstrating 15 years prior use within the EU territory.'
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    regulator: 'Medicines and Healthcare products Regulatory Agency (MHRA)',
    category: 'Traditional Herbal Registration (THR) or Food Supplement',
    primaryLaw: 'Human Medicines Regulations 2012 & UK Food Standards Agency (FSA)',
    allowedClaims: 'Indications exclusively based on long-standing traditional use (Traditional Herbal Registration mark)',
    prohibitedClaims: 'No modern therapeutic efficacy claims without full clinical marketing authorization',
    qualityStandard: 'UK GMP, British Pharmacopoeia herbal limits',
    ipRoute: 'UK Intellectual Property Office (UKIPO)',
    keyChallenge: 'Strict THR audit process; heavy metal analysis by UK-accredited laboratories.'
  },
  {
    id: 'australia',
    name: 'Australia',
    flag: '🇦🇺',
    regulator: 'Therapeutic Goods Administration (TGA)',
    category: 'Listed Complementary Medicine (AUST L)',
    primaryLaw: 'Therapeutic Goods Act 1989 & Permitted Ingredients Determinations',
    allowedClaims: 'Pre-approved traditional use indications from TGA permitted list (e.g. "Traditionally used in Ayurvedic medicine to...")',
    prohibitedClaims: 'Serious condition claims (cancer, cardiovascular disease) restricted to higher AUST R registered medicines',
    qualityStandard: 'TGA Good Manufacturing Practice (GMP Clearance for overseas manufacturers)',
    ipRoute: 'IP Australia Patent & Trademark',
    keyChallenge: 'Mandatory overseas manufacturing plant GMP clearance by TGA, which requires extensive audit documentation.'
  },
  {
    id: 'japan',
    name: 'Japan',
    flag: '🇯🇵',
    regulator: 'Pharmaceuticals and Medical Devices Agency (PMDA) & CAA',
    category: 'Foods with Function Claims (FFC) or Kampo Medicine',
    primaryLaw: 'Pharmaceutical and Medical Device Act (PMD Act) & Health Promotion Act',
    allowedClaims: 'Functional health claims based on published systematic reviews submitted to Consumer Affairs Agency',
    prohibitedClaims: 'Prescription drug therapeutic claims without clinical registration',
    qualityStandard: 'Japanese Pharmacopoeia (JP) standards',
    ipRoute: 'Japan Patent Office (JPO)',
    keyChallenge: 'Language barriers, strict pesticide residue zero-tolerance limits, and distinct traditional Kampo categorization.'
  }
];

export const InternationalExport: React.FC = () => {
  const [selectedCountryId, setSelectedCountryId] = useState<string>('usa');
  const [compareCountryId, setCompareCountryId] = useState<string>('eu');

  const selectedCountry = COUNTRIES.find(c => c.id === selectedCountryId)!;
  const compareCountry = COUNTRIES.find(c => c.id === compareCountryId)!;

  return (
    <div className="max-w-5xl mx-auto p-3 sm:p-6 space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                Global Regulatory Regimes
              </span>
            </div>
            <h2 className="text-lg font-bold text-stone-900 mt-1 flex items-center gap-2">
              <Globe className="w-5 h-5 text-emerald-600" />
              <span>International Export & Cross-Border Regulatory Navigator</span>
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Navigate US FDA DSHEA, EU THMPD Directive 2004/24/EC, UK MHRA, Australia TGA, WIPO Madrid System, and TRIPS compliance for Ayurvedic exports.
            </p>
          </div>

          <div className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-stone-100 text-stone-800 border border-stone-200">
            Mandatory: WHO-GMP & Ayush Premium Mark
          </div>
        </div>
      </div>

      {/* Country Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {COUNTRIES.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setSelectedCountryId(c.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 border ${
              selectedCountryId === c.id
                ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
            }`}
          >
            <span>{c.flag}</span>
            <span>{c.name}</span>
          </button>
        ))}
      </div>

      {/* Selected Country Dossier */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-4 animate-fadeIn">
        <div className="flex items-start justify-between gap-3 border-b border-stone-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{selectedCountry.flag}</span>
              <div>
                <h3 className="text-base font-bold text-stone-900">{selectedCountry.name}</h3>
                <p className="text-xs text-stone-500">{selectedCountry.regulator}</p>
              </div>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300">
            {selectedCountry.category}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200/80 space-y-1.5">
            <span className="font-bold text-stone-900 block">Applicable Statute & Code:</span>
            <p className="text-stone-700 leading-relaxed">{selectedCountry.primaryLaw}</p>
          </div>

          <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200/80 space-y-1.5">
            <span className="font-bold text-stone-900 block">Quality & Manufacturing Benchmark:</span>
            <p className="text-stone-700 leading-relaxed">{selectedCountry.qualityStandard}</p>
          </div>

          <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200/80 space-y-1.5">
            <span className="font-bold text-emerald-950 block">Permissible Label Claims:</span>
            <p className="text-emerald-900 leading-relaxed">{selectedCountry.allowedClaims}</p>
          </div>

          <div className="bg-rose-50/70 p-3.5 rounded-xl border border-rose-200/80 space-y-1.5">
            <span className="font-bold text-rose-950 block">Prohibited Marketing Claims:</span>
            <p className="text-rose-900 leading-relaxed">{selectedCountry.prohibitedClaims}</p>
          </div>
        </div>

        {/* IP and Key Challenge */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
            <span className="font-bold text-stone-900 block mb-1">International IP Protection Route:</span>
            <p className="text-stone-700">{selectedCountry.ipRoute}</p>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
            <span className="font-bold text-amber-950 block mb-1 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Critical Export Compliance Hurdle:</span>
            </span>
            <p className="text-amber-900">{selectedCountry.keyChallenge}</p>
          </div>
        </div>
      </div>

      {/* Side-by-Side Bilateral Comparison Tool */}
      <div className="bg-stone-900 text-stone-100 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-stone-800 pb-3">
          <div>
            <h3 className="font-bold text-sm text-stone-100 flex items-center gap-2">
              <Scale className="w-4 h-4 text-amber-400" />
              <span>Bilateral Regulatory Comparison Matrix</span>
            </h3>
            <p className="text-xs text-stone-400">Compare statutory differences between any two destination export jurisdictions.</p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedCountryId}
              onChange={(e) => setSelectedCountryId(e.target.value)}
              className="bg-stone-800 border border-stone-700 text-stone-200 text-xs rounded-lg px-2.5 py-1"
            >
              {COUNTRIES.map(c => <option key={c.id} value={c.id}>{c.flag} {c.name}</option>)}
            </select>
            <span className="text-stone-400 text-xs">vs</span>
            <select
              value={compareCountryId}
              onChange={(e) => setCompareCountryId(e.target.value)}
              className="bg-stone-800 border border-stone-700 text-stone-200 text-xs rounded-lg px-2.5 py-1"
            >
              {COUNTRIES.map(c => <option key={c.id} value={c.id}>{c.flag} {c.name}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-stone-800/80 p-4 rounded-xl border border-stone-700 space-y-2">
            <div className="font-bold text-amber-300 text-sm flex items-center gap-2">
              <span>{selectedCountry.flag}</span>
              <span>{selectedCountry.name}</span>
            </div>
            <div><strong>Classification:</strong> {selectedCountry.category}</div>
            <div><strong>Statute:</strong> {selectedCountry.primaryLaw}</div>
            <div><strong>Claims Standard:</strong> {selectedCountry.allowedClaims}</div>
            <div><strong>Contaminant Testing:</strong> {selectedCountry.qualityStandard}</div>
          </div>

          <div className="bg-stone-800/80 p-4 rounded-xl border border-stone-700 space-y-2">
            <div className="font-bold text-emerald-300 text-sm flex items-center gap-2">
              <span>{compareCountry.flag}</span>
              <span>{compareCountry.name}</span>
            </div>
            <div><strong>Classification:</strong> {compareCountry.category}</div>
            <div><strong>Statute:</strong> {compareCountry.primaryLaw}</div>
            <div><strong>Claims Standard:</strong> {compareCountry.allowedClaims}</div>
            <div><strong>Contaminant Testing:</strong> {compareCountry.qualityStandard}</div>
          </div>
        </div>
      </div>

    </div>
  );
};
