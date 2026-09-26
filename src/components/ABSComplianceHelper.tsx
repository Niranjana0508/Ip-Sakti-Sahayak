import React, { useState } from 'react';
import {
  ABSInput,
  ABSResult
} from '../types';
import { checkABSApi } from '../services/api';
import {
  Globe,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Leaf,
  Layers
} from 'lucide-react';

export const ABSComplianceHelper: React.FC = () => {
  const [formData, setFormData] = useState<ABSInput>({
    bioResourceName: 'Ashwagandha (Withania somnifera) & Pippali',
    sourceLocation: 'Cultivated organic farms in Madhya Pradesh',
    applicantType: 'indian_entity',
    isCommercial: true,
    isAyushPractitionerOrFarmer: false,
    exportRequired: false
  });

  const [result, setResult] = useState<ABSResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEvaluate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await checkABSApi(formData);
      setResult(res);
    } catch (err: any) {
      console.error('ABS error:', err);
      alert('Failed to evaluate ABS obligations.');
    } finally {
      setLoading(false);
    }
  };

  const loadPreset = (type: 'practitioner' | 'foreign' | 'indian_corporate') => {
    if (type === 'practitioner') {
      setFormData({
        bioResourceName: 'Wild Haritaki & Amla fruits',
        sourceLocation: 'Local forest tribal collection / Mandi',
        applicantType: 'indian_individual',
        isCommercial: false,
        isAyushPractitionerOrFarmer: true,
        exportRequired: false
      });
    } else if (type === 'foreign') {
      setFormData({
        bioResourceName: 'Curcuma longa (Turmeric) extract',
        sourceLocation: 'Kerala spice plantations',
        applicantType: 'foreign_entity',
        isCommercial: true,
        isAyushPractitionerOrFarmer: false,
        exportRequired: true
      });
    } else {
      setFormData({
        bioResourceName: 'Guggulu resin & Boswellia serrata',
        sourceLocation: 'Commercial wholesale suppliers',
        applicantType: 'indian_entity',
        isCommercial: true,
        isAyushPractitionerOrFarmer: false,
        exportRequired: false
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
              <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                Biological Diversity (Amendment) Act, 2023
              </span>
            </div>
            <h2 className="text-lg font-bold text-stone-900 mt-1 flex items-center gap-2">
              <Globe className="w-5 h-5 text-emerald-600" />
              <span>Access and Benefit Sharing (ABS) Compliance Navigator</span>
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Determine mandatory NBA Form I/III approvals, State Biodiversity Board (SBB) prior intimations, benefit-sharing fees, and 2023 statutory exemptions for Ayush practitioners and cultivated medicinal plants.
            </p>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-stone-400 font-medium">Scenarios:</span>
            <button
              type="button"
              onClick={() => loadPreset('practitioner')}
              className="text-[11px] px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium"
            >
              Ayush Vaidya Exemption
            </button>
            <button
              type="button"
              onClick={() => loadPreset('foreign')}
              className="text-[11px] px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium"
            >
              Foreign / Export (NBA Form I/III)
            </button>
            <button
              type="button"
              onClick={() => loadPreset('indian_corporate')}
              className="text-[11px] px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium"
            >
              Indian Corporate (SBB)
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Interactive Evaluation Form */}
        <div className="lg:col-span-5 bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 border-b border-stone-100 pb-2">
            ABS Determination Questionnaire
          </h3>

          <form onSubmit={handleEvaluate} className="space-y-3.5 text-xs">
            {/* Bio-Resource Name */}
            <div>
              <label className="font-semibold text-stone-700 block mb-1">
                1. Biological Resource / Herb Name *
              </label>
              <input
                type="text"
                value={formData.bioResourceName}
                onChange={(e) => setFormData({ ...formData, bioResourceName: e.target.value })}
                placeholder="e.g. Ashwagandha root, Haridra rhizome, Saffron..."
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 focus:ring-1 focus:ring-emerald-500 focus:outline-hidden"
                required
              />
            </div>

            {/* Source Location */}
            <div>
              <label className="font-semibold text-stone-700 block mb-1">
                2. Sourcing Origin / Cultivation Status *
              </label>
              <input
                type="text"
                value={formData.sourceLocation}
                onChange={(e) => setFormData({ ...formData, sourceLocation: e.target.value })}
                placeholder="e.g. Cultivated farm in Gujarat, or wild forest collection in MP..."
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 focus:ring-1 focus:ring-emerald-500 focus:outline-hidden"
                required
              />
            </div>

            {/* Applicant Legal Status */}
            <div>
              <label className="font-semibold text-stone-700 block mb-1">
                3. Applicant Legal Nature
              </label>
              <select
                value={formData.applicantType}
                onChange={(e) => setFormData({ ...formData, applicantType: e.target.value as any })}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 focus:ring-1 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="indian_individual">Indian Individual / Researcher</option>
                <option value="indian_entity">Indian Commercial Entity / MSME / Company</option>
                <option value="foreign_entity">Foreign Company / Non-Indian National</option>
                <option value="nri">NRI (Non-Resident Indian) / Entity with Foreign Equity</option>
              </select>
            </div>

            {/* Commercial Utilization */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="isCommercialCheck"
                checked={formData.isCommercial}
                onChange={(e) => setFormData({ ...formData, isCommercial: e.target.checked })}
                className="rounded-sm text-emerald-600 focus:ring-emerald-500"
              />
              <label htmlFor="isCommercialCheck" className="text-stone-700 font-medium cursor-pointer">
                Commercial utilization (manufacturing for sale / market)
              </label>
            </div>

            {/* 2023 Amendment Relief Toggle */}
            <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1.5">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="ayushPractitionerCheck"
                  checked={formData.isAyushPractitionerOrFarmer}
                  onChange={(e) => setFormData({ ...formData, isAyushPractitionerOrFarmer: e.target.checked })}
                  className="rounded-sm text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="ayushPractitionerCheck" className="font-bold text-emerald-950 cursor-pointer">
                  Registered Ayush Practitioner (Vaidya/Hakim) or Farmer/Cultivator
                </label>
              </div>
              <p className="text-[11px] text-emerald-800 pl-5 leading-tight">
                *The Biological Diversity (Amendment) Act, 2023 exempts registered traditional healers and cultivated medicinal plants from prior SBB intimation and benefit sharing.
              </p>
            </div>

            {/* Export Required */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="exportRequiredCheck"
                checked={formData.exportRequired}
                onChange={(e) => setFormData({ ...formData, exportRequired: e.target.checked })}
                className="rounded-sm text-emerald-600 focus:ring-emerald-500"
              />
              <label htmlFor="exportRequiredCheck" className="text-stone-700 font-medium cursor-pointer">
                Bio-resource or research results will be transferred outside India (Section 3/4)
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              {loading ? (
                <span>Evaluating Statutory Liability...</span>
              ) : (
                <>
                  <span>Determine ABS Obligations</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Evaluation Output */}
        <div className="lg:col-span-7 space-y-4">
          {result ? (
            <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-4 animate-fadeIn">
              
              {/* Output Header */}
              <div className="flex items-start justify-between gap-3 border-b border-stone-100 pb-3">
                <div>
                  <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-700">
                    Statutory Jurisdiction
                  </span>
                  <h3 className="text-base font-bold text-stone-900 mt-0.5">
                    {result.jurisdictionBody}
                  </h3>
                  <p className="text-xs text-stone-500">{result.applicableSection}</p>
                </div>
                
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    !result.approvalRequired
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                      : 'bg-amber-100 text-amber-900 border-amber-300'
                  }`}
                >
                  {result.approvalTiming}
                </span>
              </div>

              {/* Benefit Sharing Estimate */}
              <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-xl p-3.5 text-xs text-emerald-950">
                <span className="font-bold block uppercase tracking-wider text-[11px] text-emerald-900 mb-1">
                  Fair and Equitable Benefit Sharing Liability
                </span>
                <p className="font-semibold text-sm">{result.benefitSharingEstimate}</p>
              </div>

              {/* Relevant Forms */}
              <div>
                <span className="text-xs font-bold text-stone-600 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                  <FileText className="w-4 h-4 text-stone-500" />
                  <span>Statutory Forms Required</span>
                </span>
                <div className="space-y-1.5">
                  {result.relevantForms.map((form, fIdx) => (
                    <div key={fIdx} className="bg-stone-50 p-2.5 rounded-lg border border-stone-200 text-xs font-medium text-stone-800">
                      📄 {form}
                    </div>
                  ))}
                </div>
              </div>

              {/* Statutory Exemptions */}
              {result.exemptionsApplicable.length > 0 && (
                <div>
                  <span className="text-xs font-bold text-stone-600 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Statutory Exemptions & Relief (2023 Amendment)</span>
                  </span>
                  <ul className="space-y-1 text-xs text-stone-700 bg-stone-50 p-3 rounded-xl border border-stone-100">
                    {result.exemptionsApplicable.map((ex, eIdx) => (
                      <li key={eIdx} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Step by step process */}
              <div>
                <span className="text-xs font-bold text-stone-600 uppercase tracking-wider block mb-1.5">
                  Compliance Action Steps
                </span>
                <ol className="space-y-1.5 text-xs text-stone-700 bg-stone-50 p-3 rounded-xl border border-stone-100">
                  {result.stepByStepProcess.map((step, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-2">
                      <span className="font-bold text-emerald-700 shrink-0">{sIdx + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Statutory Warning */}
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-xs text-rose-950">
                <span className="font-bold flex items-center gap-1.5 mb-1 text-rose-900">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Statutory Penalty Warning [Section 55]</span>
                </span>
                <p className="leading-relaxed">{result.statutoryWarning}</p>
              </div>

            </div>
          ) : (
            <div className="h-full bg-stone-50 border-2 border-dashed border-stone-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center text-stone-400">
              <Leaf className="w-12 h-12 text-stone-300 mb-3" />
              <h4 className="font-bold text-stone-600 text-sm">No ABS Assessment Conducted Yet</h4>
              <p className="text-xs max-w-sm mt-1">
                Fill in the bio-resource origin and applicant legal structure on the left to determine NBA Form III and SBB benefit sharing requirements.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
