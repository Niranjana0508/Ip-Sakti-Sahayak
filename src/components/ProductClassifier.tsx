import React, { useState } from 'react';
import {
  ProductClassificationInput,
  ProductClassificationResult
} from '../types';
import { classifyProductApi } from '../services/api';
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Building2,
  FileCheck,
  ShieldCheck,
  Scale
} from 'lucide-react';

export const ProductClassifier: React.FC = () => {
  const [formData, setFormData] = useState<ProductClassificationInput>({
    productName: '',
    ingredients: '',
    intendedUse: '',
    isClassical: true,
    classicalReference: 'Charaka Samhita',
    isNewProprietary: false,
    categoryType: 'medicine',
    targetCountry: 'India'
  });

  const [result, setResult] = useState<ProductClassificationResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClassify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.productName.trim() || !formData.ingredients.trim()) {
      alert('Please fill in product name and ingredients.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await classifyProductApi(formData);
      setResult(res);
    } catch (err: any) {
      console.error('Classification error:', err);
      alert('Failed to classify product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const loadExample = (type: 'classical' | 'proprietary' | 'aahar' | 'export') => {
    if (type === 'classical') {
      setFormData({
        productName: 'Maha Triphala Ghrita',
        ingredients: 'Haritaki, Bibhitaki, Amalaki, Go Ghrita (Cow Ghee), Milk, Decoction of Triphala',
        intendedUse: 'Timira (Ophthalmic conditions) and Netra Prasadana (Eye care)',
        isClassical: true,
        classicalReference: 'Bhaishajya Ratnavali (Netraroga Chikitsa)',
        isNewProprietary: false,
        categoryType: 'medicine',
        targetCountry: 'India'
      });
    } else if (type === 'proprietary') {
      setFormData({
        productName: 'AyurJoint-Phytosome Liquid Capsules',
        ingredients: 'Salai Guggulu standardized boswellic acids + Phospholipid complex, Curcuminoids, Pippali extract',
        intendedUse: 'Fast absorption joint mobility and non-steroidal inflammatory relief',
        isClassical: false,
        classicalReference: '',
        isNewProprietary: true,
        categoryType: 'medicine',
        targetCountry: 'India'
      });
    } else if (type === 'aahar') {
      setFormData({
        productName: 'Ojas Vitality Golden Milk Mix',
        ingredients: 'Organic Haridra (Turmeric), Ashwagandha root powder, Green Cardamom, Ceylon Cinnamon, Black Pepper, Coconut sugar',
        intendedUse: 'Daily nutritional wellness and calming herbal beverage before sleep',
        isClassical: true,
        classicalReference: 'Ashtanga Hridaya (Ritucharya Adhyaya)',
        isNewProprietary: false,
        categoryType: 'food',
        targetCountry: 'India'
      });
    } else {
      setFormData({
        productName: 'AshwaBalance Adaptogenic Gummies',
        ingredients: 'KSM-66 Ashwagandha standardized extract (5% withanolides), Vitamin D3, Pectin',
        intendedUse: 'Daily stress support and cognitive endurance for working professionals',
        isClassical: false,
        classicalReference: '',
        isNewProprietary: true,
        categoryType: 'nutraceutical',
        targetCountry: 'USA'
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-3 sm:p-6 space-y-6">
      
      {/* Title Card */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
              <Scale className="w-5 h-5 text-amber-600" />
              <span>Ayurveda Regulatory Product Classifier</span>
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Determine exact statutory classification, applicable licensing regime (D&C Act, FSSAI, US FDA), potential IP routes, and documentation requirements.
            </p>
          </div>
          
          {/* Quick presets */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-stone-400 font-medium">Load Preset:</span>
            <button
              type="button"
              onClick={() => loadExample('classical')}
              className="text-[11px] px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium"
            >
              Classical ASU
            </button>
            <button
              type="button"
              onClick={() => loadExample('proprietary')}
              className="text-[11px] px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium"
            >
              Proprietary (PPM)
            </button>
            <button
              type="button"
              onClick={() => loadExample('aahar')}
              className="text-[11px] px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium"
            >
              Ayush Aahar
            </button>
            <button
              type="button"
              onClick={() => loadExample('export')}
              className="text-[11px] px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium"
            >
              US Export
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Interactive Questionnaire Form */}
        <div className="lg:col-span-5 bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 border-b border-stone-100 pb-2">
            Classification Questionnaire
          </h3>

          <form onSubmit={handleClassify} className="space-y-3.5 text-xs">
            {/* Q1: Product Name */}
            <div>
              <label className="font-semibold text-stone-700 block mb-1">
                1. Product Name / Working Title *
              </label>
              <input
                type="text"
                value={formData.productName}
                onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                placeholder="e.g. Maha Triphala Ghrita, Ashwagandha Gold..."
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 focus:ring-1 focus:ring-amber-500 focus:outline-hidden"
                required
              />
            </div>

            {/* Q2: Ingredients */}
            <div>
              <label className="font-semibold text-stone-700 block mb-1">
                2. Formulation Ingredients & Botanicals *
              </label>
              <textarea
                value={formData.ingredients}
                onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                placeholder="e.g. Ashwagandha root powder (Withania somnifera), Pippali, Cow Ghee..."
                rows={2}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 focus:ring-1 focus:ring-amber-500 focus:outline-hidden resize-none"
                required
              />
            </div>

            {/* Q3: Intended Use */}
            <div>
              <label className="font-semibold text-stone-700 block mb-1">
                3. Intended Use & Claimed Benefit *
              </label>
              <input
                type="text"
                value={formData.intendedUse}
                onChange={(e) => setFormData({ ...formData, intendedUse: e.target.value })}
                placeholder="e.g. Anti-inflammatory, digestive wellness, skin glow..."
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 focus:ring-1 focus:ring-amber-500 focus:outline-hidden"
                required
              />
            </div>

            {/* Q4: Classical vs Proprietary Formulation */}
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 space-y-2.5">
              <label className="font-semibold text-stone-800 block">
                4. Formulation Lineage
              </label>
              
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="lineage"
                    checked={formData.isClassical && !formData.isNewProprietary}
                    onChange={() => setFormData({ ...formData, isClassical: true, isNewProprietary: false })}
                    className="text-amber-600 focus:ring-amber-500"
                  />
                  <span>Classical Formulation (First Schedule)</span>
                </label>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="lineage"
                    checked={formData.isNewProprietary}
                    onChange={() => setFormData({ ...formData, isClassical: false, isNewProprietary: true })}
                    className="text-amber-600 focus:ring-amber-500"
                  />
                  <span>New / Proprietary Formulation (PPM)</span>
                </label>
              </div>

              {formData.isClassical && (
                <div className="mt-2">
                  <label className="text-[11px] text-stone-500 block mb-0.5">
                    Recognized Text Name (from 54 First Schedule treatises):
                  </label>
                  <input
                    type="text"
                    value={formData.classicalReference}
                    onChange={(e) => setFormData({ ...formData, classicalReference: e.target.value })}
                    placeholder="e.g. Charaka Samhita, Ayurvedic Formulary of India (AFI)..."
                    className="w-full bg-white border border-stone-200 rounded-md p-1.5 text-xs text-stone-900"
                  />
                </div>
              )}
            </div>

            {/* Q5: Category & Target Country */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">
                  5. Product Category
                </label>
                <select
                  value={formData.categoryType}
                  onChange={(e) => setFormData({ ...formData, categoryType: e.target.value as any })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 focus:ring-1 focus:ring-amber-500 cursor-pointer"
                >
                  <option value="medicine">Medicine (Ayurvedic Drug)</option>
                  <option value="food">Food / Ayush Aahar</option>
                  <option value="nutraceutical">Nutraceutical / Dietary</option>
                  <option value="cosmetic">Herbal Cosmetic</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">
                  6. Target Country
                </label>
                <select
                  value={formData.targetCountry}
                  onChange={(e) => setFormData({ ...formData, targetCountry: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 focus:ring-1 focus:ring-amber-500 cursor-pointer"
                >
                  <option value="India">India 🇮🇳</option>
                  <option value="USA">USA 🇺🇸 (FDA)</option>
                  <option value="EU">European Union 🇪🇺</option>
                  <option value="UK">United Kingdom 🇬🇧</option>
                  <option value="Japan">Japan 🇯🇵</option>
                  <option value="Australia">Australia 🇦🇺</option>
                </select>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              {isSubmitting ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Classifying Formulation...</span>
                </>
              ) : (
                <>
                  <span>Generate Regulatory Classification</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Classification Output Roadmap */}
        <div className="lg:col-span-7 space-y-4">
          {result ? (
            <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-4 animate-fadeIn">
              
              {/* Output Header */}
              <div className="flex items-start justify-between gap-3 border-b border-stone-100 pb-3">
                <div>
                  <span className="text-[11px] font-bold tracking-wider uppercase text-amber-700">
                    Regulatory Verdict
                  </span>
                  <h3 className="text-base font-bold text-stone-900 mt-0.5">
                    {result.productCategory}
                  </h3>
                  <p className="text-xs text-stone-500">{result.subCategory}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold border border-emerald-300">
                  Verified Pathway
                </span>
              </div>

              {/* 1. Applicable Regulatory Framework */}
              <div className="bg-amber-50/50 border border-amber-200/60 rounded-xl p-3.5">
                <span className="text-xs font-bold text-amber-950 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  <span>Applicable Regulatory Framework</span>
                </span>
                <p className="text-xs font-semibold text-stone-800">
                  {result.applicableRegulatoryFramework}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {result.statutoryProvisions.map((prov, pIdx) => (
                    <span key={pIdx} className="text-[10px] bg-white px-2 py-0.5 rounded-md border border-amber-300 text-amber-900 font-mono">
                      {prov}
                    </span>
                  ))}
                </div>
              </div>

              {/* 2. Potential IP Options */}
              <div>
                <span className="text-xs font-bold text-stone-600 uppercase tracking-wider block mb-1.5">
                  Potential Intellectual Property (IP) Options
                </span>
                <ul className="space-y-1.5 text-xs text-stone-700 bg-stone-50 p-3 rounded-xl border border-stone-100">
                  {result.potentialIPOptions.map((opt, oIdx) => (
                    <li key={oIdx} className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{opt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 3. Required Documentation */}
              <div>
                <span className="text-xs font-bold text-stone-600 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                  <FileCheck className="w-4 h-4 text-stone-500" />
                  <span>Required Regulatory Documentation Checklist</span>
                </span>
                <ul className="space-y-1.5 text-xs text-stone-700 bg-stone-50 p-3 rounded-xl border border-stone-100">
                  {result.requiredDocumentation.map((doc, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 4. Statutory Authorities */}
              <div>
                <span className="text-xs font-bold text-stone-600 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                  <Building2 className="w-4 h-4 text-stone-500" />
                  <span>Competent Statutory Authorities</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {result.possibleAuthorities.map((auth, aIdx) => (
                    <span key={aIdx} className="text-xs bg-stone-100 text-stone-800 px-2.5 py-1 rounded-md border border-stone-200">
                      🏛️ {auth}
                    </span>
                  ))}
                </div>
              </div>

              {/* 5. Risk Analysis */}
              <div className="bg-orange-50 border border-orange-200/80 rounded-xl p-3 text-xs text-orange-900">
                <span className="font-bold flex items-center gap-1.5 mb-1 text-orange-950">
                  <AlertTriangle className="w-4 h-4 text-orange-600" />
                  <span>Regulatory & Patentability Risk Analysis</span>
                </span>
                <p className="leading-relaxed">{result.riskAnalysis}</p>
              </div>

              {/* 6. Recommended Next Steps */}
              <div>
                <span className="text-xs font-bold text-stone-600 uppercase tracking-wider block mb-1.5">
                  Recommended Actionable Next Steps
                </span>
                <ol className="space-y-1.5 text-xs text-stone-700 bg-stone-50 p-3 rounded-xl border border-stone-100">
                  {result.recommendedNextSteps.map((step, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-2">
                      <span className="font-bold text-amber-700 shrink-0">{sIdx + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

            </div>
          ) : (
            <div className="h-full bg-stone-50 border-2 border-dashed border-stone-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center text-stone-400">
              <Scale className="w-12 h-12 text-stone-300 mb-3" />
              <h4 className="font-bold text-stone-600 text-sm">No Classification Generated Yet</h4>
              <p className="text-xs max-w-sm mt-1">
                Complete the questions on the left or select a preset to generate a statutory classification roadmap.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
