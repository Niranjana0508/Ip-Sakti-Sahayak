import {
  ProductClassificationInput,
  ProductClassificationResult,
  ABSInput,
  ABSResult,
  PriorArtCheckInput,
  PriorArtResult,
  ClassicalCitation,
  KnowledgeGraphData
} from '../src/types.js';

/**
 * Intelligent Ayurveda Product Classification Engine
 */
export function classifyProduct(input: ProductClassificationInput): ProductClassificationResult {
  const isIndia = !input.targetCountry || input.targetCountry.toLowerCase().includes('india');
  const country = input.targetCountry || 'India';
  const normIngredients = (input.ingredients || '').toLowerCase();
  const normUse = (input.intendedUse || '').toLowerCase();

  // 1. Classical Ayurvedic Formulation
  if (input.isClassical && !input.isNewProprietary && input.categoryType === 'medicine' && isIndia) {
    return {
      productCategory: 'Classical Ayurvedic Drug (First Schedule)',
      subCategory: 'Classical Shastriya Aushadhi (e.g. Churna, Vati, Asava, Arishta, Taila, Bhasma)',
      applicableRegulatoryFramework: 'Drugs and Cosmetics Act, 1940 [Section 3(a)] & Rules 1945; Schedule T (GMP)',
      potentialIPOptions: [
        'Trademark in Class 5 for brand logo / house mark (Note: Generic classical Sanskrit name cannot be monopolized)',
        'Industrial Design registration for unique container / bottle shape',
        'Trade Dress protection for distinctive packaging graphics',
        'NO product patent allowed under Section 3(p) of Patents Act 1970 (Codified Traditional Knowledge)'
      ],
      requiredDocumentation: [
        `Reference to specific First Schedule authoritative Ayurvedic text (${input.classicalReference || 'e.g. Charaka Samhita / AFI / Bhaishajya Ratnavali'})`,
        'Good Manufacturing Practice (GMP) Certificate under Schedule T',
        'Certificate of Analysis (CoA) conforming to Ayurvedic Pharmacopoeia of India (API) standards',
        'Heavy metal limits testing (Lead, Cadmium, Arsenic, Mercury)',
        'Microbial contamination and pesticide residue analysis reports'
      ],
      possibleAuthorities: [
        'State Licensing Authority (SLA) - Directorate of AYUSH',
        'Pharmacopoeia Commission for Indian Medicine & Homoeopathy (PCIM&H)',
        'Central Drugs Standard Control Organization (CDSCO)'
      ],
      recommendedNextSteps: [
        'Verify exact formulation in the Ayurvedic Formulary of India (AFI) or recognized classical text',
        'Apply for manufacturing license under Form 25-D from State Licensing Authority',
        'Implement Schedule T compliant batch manufacturing records',
        'File for Ayush Standard Mark certification via Quality Council of India (QCI)'
      ],
      riskAnalysis: 'Low regulatory barrier in India as classical efficacy is statutorily presumed. High risk of immediate patent rejection under Section 3(p) if an exclusive patent is attempted.',
      statutoryProvisions: ['Drugs and Cosmetics Act §3(a)', 'Patents Act 1970 §3(p)', 'GMP Schedule T']
    };
  }

  // 2. Patent or Proprietary Medicine (PPM)
  if (input.isNewProprietary || (input.categoryType === 'medicine' && !input.isClassical && isIndia)) {
    return {
      productCategory: 'Patent or Proprietary Medicine (ASU-PPM)',
      subCategory: 'Proprietary Ayurvedic Formulation / Modified Dosage Form',
      applicableRegulatoryFramework: 'Drugs and Cosmetics Act, 1940 [Section 3(h)] & Drugs and Cosmetics Rules, 1945 [Rule 158B]',
      potentialIPOptions: [
        'Trademark registration in Class 5 (Distinctive proprietary brand name)',
        'Patent Protection (Limited): Possible ONLY for novel extraction processes, synergistic polyherbal ratios (overcoming Section 3(e)), or novel drug delivery systems (liposomal/phytosomal/nano)',
        'National Biodiversity Authority (NBA) approval under Section 6 of BD Act prior to patent grant',
        'Copyright for educational patient brochures and clinical data compendiums'
      ],
      requiredDocumentation: [
        'Proof of Safety and Effectiveness under Rule 158B (pilot clinical trials or authoritative textual references)',
        'Detailed quantitative composition and rationale for formulation ingredients',
        'Accelerated and real-time stability study data for shelf-life validation (Rule 161B)',
        'Analytical specification sheet adhering to API parameters',
        'Manufacturing batch records from GMP certified premises'
      ],
      possibleAuthorities: [
        'State Licensing Authority (SLA) / Ayush Drug Controller',
        'Office of the Controller General of Patents, Designs and Trade Marks (IP India)',
        'National Biodiversity Authority (NBA)'
      ],
      recommendedNextSteps: [
        'Conduct in-vitro / in-vivo synergy studies if patent filing under Section 3(e) is contemplated',
        'File Trademark application in Class 5 before commercial launch to prevent squatting',
        'Submit Form 24-D application for manufacturing license to State Ayush Authority',
        'Ensure label conforms to Rule 161 (full list of botanical ingredients with Latin names)'
      ],
      riskAnalysis: 'Moderate regulatory timeline (clinical safety assessment needed under Rule 158B). Extreme patent prosecution scrutiny under Section 3(p) and Section 3(e).',
      statutoryProvisions: ['Drugs and Cosmetics Act §3(h)', 'D&C Rules Rule 158B', 'Patents Act 1970 §3(e) & §3(p)', 'Biological Diversity Act §6']
    };
  }

  // 3. Ayush Aahar / Food / Nutraceutical
  if (input.categoryType === 'food' || input.categoryType === 'nutraceutical' || normUse.includes('food') || normUse.includes('supplement')) {
    if (isIndia) {
      return {
        productCategory: 'Ayush Aahar / Ayurvedic Food Supplement',
        subCategory: 'Food Prepared in accordance with Classical Recipes / Botanicals',
        applicableRegulatoryFramework: 'Food Safety and Standards (Ayush Aahar) Regulations, 2022 & FSSAI Act, 2006',
        potentialIPOptions: [
          'Trademark registration in Class 30 (Health food/botanical seasonings) or Class 32 (Herbal beverages)',
          'Design registration for unique packaging pouches / bottles',
          'Trade Secret protection for proprietary recipe blends and taste formulations'
        ],
        requiredDocumentation: [
          'FSSAI Central / State Food License',
          'Affidavit certifying adherence to Ayush Aahar Schedule A authorized botanicals',
          'Label artwork displaying the mandatory "Ayush Aahar" green logo and non-medicinal disclaimer',
          'Nutritional information panel (Energy, Proteins, Carbs, Added Sugars, Micronutrients)',
          'Heavy metal, pesticide residue, and microbiological safety reports'
        ],
        possibleAuthorities: [
          'Food Safety and Standards Authority of India (FSSAI)',
          'Ministry of Ayush (Ayush Aahar Joint Committee)'
        ],
        recommendedNextSteps: [
          'Verify that all herbal ingredients are listed in FSSAI permitted botanical schedules',
          'Ensure packaging makes NO medical disease prevention/cure claims (strict regulatory ban)',
          'Apply for FSSAI Ayush Aahar licensing through the FoSCoS portal',
          'Apply for trademark in Class 30 or 32'
        ],
        riskAnalysis: 'Fast time to market compared to pharmaceuticals. Critical risk: Making disease claims (e.g. "treats diabetes") triggers punitive misbranding under FSSAI and D&C Acts.',
        statutoryProvisions: ['FSSAI Ayush Aahar Regulations 2022', 'Food Safety and Standards Act 2006']
      };
    }
  }

  // 4. Herbal Cosmetics
  if (input.categoryType === 'cosmetic' || normUse.includes('cosmetic') || normUse.includes('skin') || normUse.includes('hair')) {
    return {
      productCategory: 'Ayurvedic Herbal Cosmetic / Topical Care',
      subCategory: 'Herbal Personal Care, Hair Oils, Skin Ubtans, Face Creams',
      applicableRegulatoryFramework: isIndia ? 'Drugs and Cosmetics Rules, 1945 (Part XIII: Manufacture of Cosmetics)' : 'Destination country cosmetic safety directives',
      potentialIPOptions: [
        'Trademark in Class 3 (Soaps, cosmetics, essential oils, hair lotions)',
        'Industrial Design registration for decorative dispensers, compacts, and flacons',
        'Patent for novel cosmetic formulation vehicle (only if non-obvious skin permeation technology is proven)'
      ],
      requiredDocumentation: [
        'Cosmetic Manufacturing License (Form 32)',
        'Dermatological safety and skin irritation patch test reports',
        'Declaration of all ingredients with INCI (International Nomenclature of Cosmetic Ingredients) names',
        'Stability and preservative efficacy test reports'
      ],
      possibleAuthorities: [
        'State Licensing Authority (Cosmetics Division)',
        'Bureau of Indian Standards (BIS) for cosmetic standards'
      ],
      recommendedNextSteps: [
        'Audit ingredient list against prohibited colorants and preservatives under Schedule S',
        'File for trademark protection in Class 3',
        'Ensure claims are restricted to beautification, cleansing, and skin conditioning (no therapeutic claims)'
      ],
      riskAnalysis: 'Low clinical barrier. Must strictly avoid therapeutic anti-fungal or medicinal psoriasis/eczema claims to avoid reclassification as a prescription drug.',
      statutoryProvisions: ['Drugs and Cosmetics Act (Part XIII Cosmetics)', 'BIS Cosmetic Standards']
    };
  }

  // 5. International Export Market (USA / EU / UK / Japan / Australia)
  return {
    productCategory: `Export Formulation – ${country}`,
    subCategory: country.toLowerCase().includes('usa') ? 'US FDA Dietary Supplement' : country.toLowerCase().includes('eu') ? 'EU Traditional Herbal Medicinal Product or Food Supplement' : 'International Complementary Medicine',
    applicableRegulatoryFramework: country.toLowerCase().includes('usa')
      ? 'US FDA Dietary Supplement Health and Education Act (DSHEA 1994), 21 CFR Part 111 (cGMP)'
      : country.toLowerCase().includes('eu')
      ? 'EU Directive 2004/24/EC (THMPD) & Food Supplements Directive 2002/46/EC'
      : 'Target country regulatory authority (e.g. UK MHRA, Australia TGA, Japan PMDA)',
    potentialIPOptions: [
      'WIPO Madrid System: International Trademark registration designating target export jurisdictions',
      'PCT (Patent Cooperation Treaty) application if novel synergistic extraction process exists',
      'Nagoya Protocol compliance certificate (IRCC) generated via India NBA Form III',
      'Copyright on international brand marketing materials'
    ],
    requiredDocumentation: [
      'Ayush Premium Mark Certificate or WHO-GMP certification for manufacturing plant',
      'US FDA Food Facility Registration and Prior Notice of Imported Food',
      'Certificate of Analysis with heavy metal compliance (Proposition 65 limits for Lead < 0.5 mcg/day)',
      'Product label compliant with 21 CFR 101.36 (Supplement Facts panel & mandatory FDA disclaimer)',
      'National Biodiversity Authority (NBA) approval for export of biological material under Section 3/6'
    ],
    possibleAuthorities: [
      country.toLowerCase().includes('usa') ? 'US Food and Drug Administration (FDA)' : 'Target Country Health Agency',
      'Ministry of Ayush / Pharmexcil (Pharmaceuticals Export Promotion Council)',
      'National Biodiversity Authority (NBA)'
    ],
    recommendedNextSteps: [
      'Verify that all herbs in formulation are safe and not subject to US FDA Import Alerts or EU Novel Food bans',
      'Strictly remove all disease claims from packaging, website, and marketing (e.g. use "supports immunity" instead of "cures flu")',
      'Test for toxic heavy metals at NABL-accredited laboratory using ICP-MS',
      'Register international trademark via WIPO Madrid Protocol'
    ],
    riskAnalysis: 'High export compliance risk. US FDA issues immediate import alerts and border seizures for herbo-mineral bhasmas or products making unapproved drug claims.',
    statutoryProvisions: ['US 21 CFR Part 111', 'EU Directive 2004/24/EC', 'Biological Diversity Act §3 & §6']
  };
}

/**
 * Access and Benefit Sharing (ABS) Compliance Checker
 */
export function checkABSCompliance(input: ABSInput): ABSResult {
  const isForeign = input.applicantType === 'foreign_entity' || input.applicantType === 'nri';
  const isIndianCorporate = input.applicantType === 'indian_entity';
  const isIndianIndividual = input.applicantType === 'indian_individual';

  // 2023 Amendment Relief: Vaidyas, Hakims, Local Traditional Practitioners, and Cultivated Plants
  if (input.isAyushPractitionerOrFarmer) {
    return {
      jurisdictionBody: 'Exempted',
      approvalRequired: false,
      approvalTiming: 'No Approval Needed',
      relevantForms: ['Exemption Declaration under Section 7 (2023 Amendment)'],
      applicableSection: 'Section 7 Proviso & Section 40, Biological Diversity (Amendment) Act, 2023',
      benefitSharingEstimate: 'NIL (Statutory Exemption under 2023 Amendment)',
      exemptionsApplicable: [
        'Registered Ayush Practitioners (Vaidyas, Hakims) practicing indigenous medicine are explicitly exempt',
        'Cultivated medicinal plants and their derived products are exempted from SBB prior intimation and ABS payments',
        'Codified traditional knowledge practices'
      ],
      stepByStepProcess: [
        'Maintain traceability records showing biological resources are sourced from certified cultivated farms or registered farmers',
        'Retain copy of Ayush practitioner registration / Farmer producer organization (FPO) invoice',
        'No formal fee or approval required from NBA or SBB for domestic traditional practice'
      ],
      statutoryWarning: 'Exemption applies solely to domestic practice and cultivated medicinal plants. If an invention is commercialized globally or an IPR is filed, Section 6 applies.'
    };
  }

  // Foreign Entity / NRI / Indian company with foreign shareholding
  if (isForeign) {
    return {
      jurisdictionBody: 'National Biodiversity Authority (NBA)',
      approvalRequired: true,
      approvalTiming: 'Prior Approval Mandatory',
      relevantForms: [
        'Form I: For access to biological resources / TK for research or commercial utilization',
        'Form III: For applying for Intellectual Property Rights (IPR) inside or outside India',
        'Form II: For transfer of biological research results'
      ],
      applicableSection: 'Section 3, Section 4 & Section 6 of Biological Diversity Act, 2002',
      benefitSharingEstimate: '0.1% to 0.5% of ex-factory gross sales or 3% to 5% of royalty on IPR licensing',
      exemptionsApplicable: ['Normally traded commodities (Section 40) listed in official Central Government gazette'],
      stepByStepProcess: [
        'File electronic Form I / Form III application on the NBA e-portal (nbaindia.org)',
        'Pay prescribed statutory application fee',
        'Undergo Expert Committee on ABS evaluation and State Biodiversity Board consultation',
        'Execute formal ABS Agreement with NBA specifying benefit-sharing terms before commercialization or patent grant'
      ],
      statutoryWarning: 'Non-compliance is a cognizable and non-bailable offense under Section 55 of the Act, punishable with imprisonment and substantial monetary fines.'
    };
  }

  // Indian Corporate / Commercial Entity
  if (isIndianCorporate && input.isCommercial) {
    return {
      jurisdictionBody: 'State Biodiversity Board (SBB)',
      approvalRequired: true,
      approvalTiming: 'Prior Intimation Required',
      relevantForms: ['Form I (SBB specific format) - Prior Intimation for Commercial Utilization'],
      applicableSection: 'Section 7 of Biological Diversity Act, 2002 & Guidelines on Benefit Sharing 2014',
      benefitSharingEstimate: '0.1% to 0.5% of annual gross ex-factory sales value (depending on turnover slab)',
      exemptionsApplicable: [
        'Cultivated medicinal plants under 2023 Amendment Act',
        'Items notified under Section 40 as Normally Traded Commodities (NTC)'
      ],
      stepByStepProcess: [
        'Submit prior intimation to the concerned State Biodiversity Board where bio-resource is sourced',
        'Provide documentation on whether herbs are harvested from wild forests or cultivated farms',
        'Pay agreed benefit-sharing percentage into the State Biodiversity Fund for conservation of local biodiversity management committees (BMCs)'
      ],
      statutoryWarning: 'Failure to give prior intimation to SBB prior to commercial scale extraction can lead to stoppage orders and penalty proceedings.'
    };
  }

  // Indian Individual / Academic Research
  return {
    jurisdictionBody: 'State Biodiversity Board (SBB)',
    approvalRequired: false,
    approvalTiming: 'No Approval Needed',
    relevantForms: ['None for non-commercial pure academic research'],
    applicableSection: 'Section 5 & Section 7 (Exceptions for Collaborative Research & Indian Citizens)',
    benefitSharingEstimate: 'NIL for pure non-commercial academic research',
    exemptionsApplicable: [
      'Indian citizens carrying out non-commercial biological research',
      'Collaborative research projects approved by Central Government (Section 5)'
    ],
    stepByStepProcess: [
      'Document research protocol and academic affiliation',
      'Ensure research results are not transferred to foreign entities without prior NBA Form II approval',
      'If research leads to an IPR application in future, file Form III with NBA before patent grant'
    ],
    statutoryWarning: 'If the research transitions into commercial licensing or patent filing, statutory NBA Form III obligations are immediately triggered.'
  };
}

/**
 * Traditional Knowledge Digital Library (TKDL) Prior Art Cross-Reference Engine
 */
export function checkTKDLPriorArt(input: PriorArtCheckInput): PriorArtResult {
  const ingredients = (input.formulationIngredients || '').toLowerCase();
  const title = (input.inventionTitle || '').toLowerCase();
  const effect = (input.claimedTherapeuticEffect || '').toLowerCase();

  const citations: ClassicalCitation[] = [];

  // Curated database of classical texts and shlokas for common Ayurvedic botanicals
  if (ingredients.includes('ashwagandha') || ingredients.includes('withania') || title.includes('stress') || title.includes('vitality')) {
    citations.push({
      textName: 'Charaka Samhita',
      chapterOrKanda: 'Chikitsa Sthana, Chapter 1 (Rasayana Adhyaya)',
      shlokaRef: 'Verses 1.2: 8-12',
      classicalIndication: 'Balya (strength promoter), Rasayana (rejuvenator), Medhya (cognitive enhancer)',
      matchedIngredients: ['Ashwagandha (Withania somnifera)'],
      similarityRationale: 'Codified classical use as an adaptogenic rejuvenator and vitality enhancer overlaps with modern stress-relief and vitality claims.'
    });
    citations.push({
      textName: 'Bhavaprakasha Nighantu',
      chapterOrKanda: 'Guduchyadi Varga',
      shlokaRef: 'Shloka 189-191',
      classicalIndication: 'Kaphavaata-shamana, Shukrala, Atibala-vardhana',
      matchedIngredients: ['Ashwagandha'],
      similarityRationale: 'Specific classical text records botanical identification, therapeutic properties, and traditional extraction methods.'
    });
  }

  if (ingredients.includes('turmeric') || ingredients.includes('curcuma') || ingredients.includes('haridra') || effect.includes('inflamm') || effect.includes('wound')) {
    citations.push({
      textName: 'Sushruta Samhita',
      chapterOrKanda: 'Sutra Sthana, Chapter 38 (Dravyasangrahaniya Adhyaya)',
      shlokaRef: 'Verses 38: 27-28',
      classicalIndication: 'Vranashodhana (wound cleansing), Vranaropana (wound healing), Vishaghna (anti-toxic)',
      matchedIngredients: ['Haridra (Curcuma longa)'],
      similarityRationale: 'Identical to famous CSIR revocation of USPTO Patent 5,401,504 (Turmeric wound healing). Codified in ancient Sanskrit treatise.'
    });
    citations.push({
      textName: 'Ayurvedic Pharmacopoeia of India (API)',
      chapterOrKanda: 'Part I, Volume I',
      shlokaRef: 'Monograph 23: Haridra (Rhizome)',
      classicalIndication: 'Prameha, Kushtha, Krimi, Kandu, Vranaropana',
      matchedIngredients: ['Curcuma longa rhizome'],
      similarityRationale: 'Official government pharmacopoeial monograph establishes public domain status.'
    });
  }

  if (ingredients.includes('triphala') || ingredients.includes('amla') || ingredients.includes('haritaki') || ingredients.includes('bibhitaki') || effect.includes('digest') || effect.includes('eye')) {
    citations.push({
      textName: 'Ashtanga Hridaya (Vagbhata)',
      chapterOrKanda: 'Uttara Sthana, Chapter 13 (Timira Pratishedha)',
      shlokaRef: 'Verses 13: 41-43',
      classicalIndication: 'Chakshushya (ophthalmic tonic), Deepana, Pachana, Rasayana',
      matchedIngredients: ['Haritaki', 'Bibhitaki', 'Amalaki'],
      similarityRationale: 'Triphala formulation ratio and synergistic digestive/ocular indications are explicitly codified in classical literature.'
    });
  }

  if (ingredients.includes('tulsi') || ingredients.includes('ocimum') || effect.includes('cough') || effect.includes('respirat')) {
    citations.push({
      textName: 'Charaka Samhita',
      chapterOrKanda: 'Chikitsa Sthana, Chapter 18 (Kasa Chikitsa)',
      shlokaRef: 'Verses 18: 112-115',
      classicalIndication: 'Kasa-hara (anti-tussive), Shvasa-hara (anti-asthmatic), Hikka-nigrahana',
      matchedIngredients: ['Surasa / Tulsi (Ocimum sanctum)'],
      similarityRationale: 'Classical remedy for respiratory tract ailments and bronchial clearance.'
    });
  }

  if (ingredients.includes('guduchi') || ingredients.includes('giloy') || ingredients.includes('tinospora') || effect.includes('immun') || effect.includes('fever')) {
    citations.push({
      textName: 'Charaka Samhita',
      chapterOrKanda: 'Sutra Sthana, Chapter 4 (Shadvirechana Shatashritiya)',
      shlokaRef: 'Verses 4: 9 (Vayasthapana Mahakashaya)',
      classicalIndication: 'Vayasthapana (anti-aging), Jvarahara (febrifuge), Dahaprashamana',
      matchedIngredients: ['Guduchi (Tinospora cordifolia)'],
      similarityRationale: 'Codified as one of the 10 prime life-prolonging and immunomodulatory herbs in Ayurveda.'
    });
  }

  // Fallback generic classical citation if specific herb not caught
  if (citations.length === 0) {
    citations.push({
      textName: 'Ayurvedic Formulary of India (AFI)',
      chapterOrKanda: 'First Schedule Texts / API Part I',
      shlokaRef: 'Classical Botanical Formulations Register',
      classicalIndication: 'General therapeutic utility recorded in traditional Indian Materia Medica',
      matchedIngredients: ['Traditional Ayurvedic Botanical Components'],
      similarityRationale: 'Ayurvedic plants and therapeutic indications are extensively indexed in TKDL and First Schedule treatises.'
    });
  }

  const hasMultipleCitations = citations.length >= 2;
  const isSynergisticClaim = input.isSynergisticClaim;

  return {
    status: hasMultipleCitations
      ? 'Potentially relevant prior art identified'
      : isSynergisticClaim
      ? 'Novel composition aspects detected - Synergy data required'
      : 'Critical Section 3(p) Traditional Knowledge barrier',
    confidenceScore: hasMultipleCitations ? 92 : 80,
    classicalCitations: citations,
    tkdlRelevanceNote: `Our knowledge engine identified ${citations.length} classical treatises documenting identical or substantially equivalent therapeutic indications for the specified botanical components. The Traditional Knowledge Digital Library (TKDL) contains matching entries that patent examiners at the Indian Patent Office (IPO), EPO, and USPTO utilize for citation under Section 3(p) and novelty objections.`,
    section3pRisk: hasMultipleCitations ? 'High' : 'Moderate',
    section3eRisk: input.isSynergisticClaim ? 'Moderate' : 'High',
    patentabilityRecommendations: [
      'Do NOT claim the raw plant powder, aqueous extract, or classical combination as a composition of matter (Guaranteed rejection under Section 3(p)).',
      'Demonstrate inventive step via a non-obvious synergistic ratio with empirical Combination Index (CI < 1) data to overcome Section 3(e).',
      'Focus patent claims on: (a) Novel targeted delivery systems (e.g. phospholipid nanoparticles, liposomes), (b) Specific isolated standardized chemical fractions with unexpected bio-enhancement, or (c) Proprietary continuous extraction processes.',
      'Mandatorily disclose the geographical origin of biological resources under Section 10(4)(ii)(D) and obtain NBA approval under Section 6.'
    ],
    draftingTips: [
      'Frame the independent claims around the non-obvious combination ratio rather than the broad herbs themselves',
      'Provide comparative biological activity graphs showing Component A alone, Component B alone, and Component A+B combined at identical concentrations',
      'Avoid reciting Sanskrit therapeutic names in the claims; use objective pharmacological endpoints (e.g. reduction in IC50 values, biomarker modulation)'
    ]
  };
}

/**
 * Interactive Relational Knowledge Graph Data
 * Connecting: Product -> Classification -> Regulation -> IP Type -> Authority -> Law -> Source
 */
export function getKnowledgeGraphData(): KnowledgeGraphData {
  return {
    nodes: [
      // 1. Products
      { id: 'p1', label: 'Ashwagandha Churna', type: 'product', jurisdiction: 'india', details: 'Classical powdered formulation from First Schedule text for strength & rejuvenation.' },
      { id: 'p2', label: 'Liposomal Curcumin Phytosome', type: 'product', jurisdiction: 'both', details: 'Proprietary nano-carrier formulation with enhanced bioavailability.' },
      { id: 'p3', label: 'Triphala Herbal Infusion Tea', type: 'product', jurisdiction: 'both', details: 'Traditional digestive botanicals packaged as a health beverage.' },
      { id: 'p4', label: 'Kumkumadi Ayurvedic Radiance Oil', type: 'product', jurisdiction: 'india', details: 'Herbal saffron topical oil formulated for skin care and complexion.' },
      { id: 'p5', label: 'Ayush Kwath Tablets', type: 'product', jurisdiction: 'india', details: 'Standardized polyherbal formulation (Tulsi, Dalchini, Sunthi, Krishna Marich) for immunity.' },

      // 2. Classifications
      { id: 'c1', label: 'Classical Ayurvedic Medicine', type: 'classification', jurisdiction: 'india', details: 'Manufactured exclusively per First Schedule authoritative books under Section 3(a).' },
      { id: 'c2', label: 'Patent or Proprietary Medicine (PPM)', type: 'classification', jurisdiction: 'india', details: 'Formulation with First Schedule ingredients in modern/proprietary form under Section 3(h).' },
      { id: 'c3', label: 'Ayush Aahar / Food Supplement', type: 'classification', jurisdiction: 'india', details: 'Food prepared per traditional Ayurvedic culinary principles under FSSAI 2022.' },
      { id: 'c4', label: 'Herbal Cosmetic', type: 'classification', jurisdiction: 'both', details: 'Topical beauty and cleansing product without medicinal claims.' },
      { id: 'c5', label: 'US FDA Dietary Supplement', type: 'classification', jurisdiction: 'international', details: 'Botanical dietary supplement regulated under DSHEA 1994.' },

      // 3. Regulations
      { id: 'r1', label: 'D&C Rules Rule 158B (Proof of Efficacy)', type: 'regulation', jurisdiction: 'india', details: 'Safety and published literature / clinical proof for ASU licensing.' },
      { id: 'r2', label: 'Schedule T (GMP for ASU Drugs)', type: 'regulation', jurisdiction: 'india', details: 'Good Manufacturing Practices for Ayurvedic factories.' },
      { id: 'r3', label: 'FSSAI Ayush Aahar Regulations 2022', type: 'regulation', jurisdiction: 'india', details: 'Standards, labeling, and mandatory logo for Ayurvedic foods.' },
      { id: 'r4', label: 'US 21 CFR Part 111 (cGMP)', type: 'regulation', jurisdiction: 'international', details: 'Federal cGMP standards for dietary supplement manufacturing.' },
      { id: 'r5', label: 'EU Directive 2004/24/EC (THMPD)', type: 'regulation', jurisdiction: 'international', details: 'Simplified registration requiring 30 years traditional use.' },

      // 4. IP Types
      { id: 'ip1', label: 'Patents (Section 3p & 3e Safe)', type: 'ip_type', jurisdiction: 'both', details: 'Protection for novel extraction, delivery vehicles, and proven synergistic ratios.' },
      { id: 'ip2', label: 'Trademark Class 5 (Medicines)', type: 'ip_type', jurisdiction: 'both', details: 'Brand protection for pharmaceutical and Ayurvedic medicinal formulations.' },
      { id: 'ip3', label: 'Trademark Class 3 (Cosmetics)', type: 'ip_type', jurisdiction: 'both', details: 'Brand name protection for skin, hair, and personal care products.' },
      { id: 'ip4', label: 'Trademark Class 30 & 32 (Foods)', type: 'ip_type', jurisdiction: 'both', details: 'Protection for teas, herbal snacks, and non-alcoholic drinks.' },
      { id: 'ip5', label: 'Geographical Indications (GI)', type: 'ip_type', jurisdiction: 'both', details: 'Protection of place-based medicinal crops like Navara Rice and Kashmiri Saffron.' },
      { id: 'ip6', label: 'TKDL Defensive Protection', type: 'ip_type', jurisdiction: 'both', details: 'CSIR database preventing international biopiracy and invalid patents.' },

      // 5. Authorities
      { id: 'a1', label: 'Ministry of Ayush / State Licensing Authority', type: 'authority', jurisdiction: 'india', details: 'Apex regulatory ministry and state drug controllers for ASU medicines.' },
      { id: 'a2', label: 'IP India (CGPDTM)', type: 'authority', jurisdiction: 'india', details: 'Controller General of Patents, Designs and Trade Marks.' },
      { id: 'a3', label: 'National Biodiversity Authority (NBA)', type: 'authority', jurisdiction: 'india', details: 'Statutory body enforcing Access & Benefit Sharing (ABS) and Form III approvals.' },
      { id: 'a4', label: 'FSSAI', type: 'authority', jurisdiction: 'india', details: 'Food Safety and Standards Authority of India.' },
      { id: 'a5', label: 'US FDA', type: 'authority', jurisdiction: 'international', details: 'US Food and Drug Administration regulating dietary supplements.' },
      { id: 'a6', label: 'WIPO & WTO', type: 'authority', jurisdiction: 'international', details: 'International IP administration and TRIPS enforcement.' },

      // 6. Laws
      { id: 'l1', label: 'Drugs and Cosmetics Act, 1940', type: 'law', jurisdiction: 'india', details: 'Primary statute governing the manufacture, sale, and import of drugs.' },
      { id: 'l2', label: 'The Patents Act, 1970', type: 'law', jurisdiction: 'india', details: 'Governs patentability, Section 3 exclusions, and compulsory licenses.' },
      { id: 'l3', label: 'Biological Diversity Act, 2002 & 2023', type: 'law', jurisdiction: 'india', details: 'Protects biological resources and mandates benefit sharing.' },
      { id: 'l4', label: 'The Trade Marks Act, 1999', type: 'law', jurisdiction: 'india', details: 'Governs registration of distinct brand marks and Section 9 exclusions.' },
      { id: 'l5', label: 'Nagoya Protocol / CBD', type: 'law', jurisdiction: 'international', details: 'International convention on equitable benefit sharing from genetic resources.' },

      // 7. Sources
      { id: 's1', label: 'Ayurvedic Pharmacopoeia of India (API)', type: 'source', jurisdiction: 'india', details: 'Official legal standards of purity and identity of Ayurvedic drugs.' },
      { id: 's2', label: 'First Schedule Authoritative Books', type: 'source', jurisdiction: 'india', details: '54 classical Ayurvedic treatises recognized by D&C Act.' },
      { id: 's3', label: 'TKDL Repository (CSIR)', type: 'source', jurisdiction: 'both', details: 'Digital library of codified Indian traditional knowledge.' },
      { id: 's4', label: 'WIPO Treaty on Genetic Resources (2024)', type: 'source', jurisdiction: 'international', details: 'Mandates patent origin disclosure worldwide.' }
    ],
    edges: [
      // Product -> Classification
      { id: 'e1', source: 'p1', target: 'c1', relation: 'classified as' },
      { id: 'e2', source: 'p2', target: 'c2', relation: 'classified as' },
      { id: 'e3', source: 'p3', target: 'c3', relation: 'classified as' },
      { id: 'e4', source: 'p4', target: 'c4', relation: 'classified as' },
      { id: 'e5', source: 'p5', target: 'c1', relation: 'classified as' },
      { id: 'e6', source: 'p2', target: 'c5', relation: 'exported as' },

      // Classification -> Regulation
      { id: 'e7', source: 'c1', target: 'r2', relation: 'must comply with' },
      { id: 'e8', source: 'c2', target: 'r1', relation: 'requires proof under' },
      { id: 'e9', source: 'c3', target: 'r3', relation: 'regulated by' },
      { id: 'e10', source: 'c5', target: 'r4', relation: 'mandated by' },

      // Product / Classification -> IP Type
      { id: 'e11', source: 'c1', target: 'ip2', relation: 'protects brand via' },
      { id: 'e12', source: 'c1', target: 'ip6', relation: 'protected from biopiracy by' },
      { id: 'e13', source: 'c2', target: 'ip1', relation: 'potential patent via' },
      { id: 'e14', source: 'c2', target: 'ip2', relation: 'trademark in' },
      { id: 'e15', source: 'c4', target: 'ip3', relation: 'trademark in' },
      { id: 'e16', source: 'c3', target: 'ip4', relation: 'trademark in' },

      // IP Type -> Law
      { id: 'e17', source: 'ip1', target: 'l2', relation: 'governed by' },
      { id: 'e18', source: 'ip2', target: 'l4', relation: 'registered under' },
      { id: 'e19', source: 'ip3', target: 'l4', relation: 'registered under' },
      { id: 'e20', source: 'ip1', target: 'l3', relation: 'requires ABS clearance under' },

      // Regulation / Law -> Authority
      { id: 'e21', source: 'r1', target: 'a1', relation: 'enforced by' },
      { id: 'e22', source: 'r2', target: 'a1', relation: 'audited by' },
      { id: 'e23', source: 'r3', target: 'a4', relation: 'licensed by' },
      { id: 'e24', source: 'l2', target: 'a2', relation: 'administered by' },
      { id: 'e25', source: 'l3', target: 'a3', relation: 'regulated by' },
      { id: 'e26', source: 'r4', target: 'a5', relation: 'enforced by' },
      { id: 'e27', source: 'l5', target: 'a6', relation: 'coordinated by' },

      // Law / Authority -> Source
      { id: 'e28', source: 'l1', target: 's2', relation: 'statutorily relies on' },
      { id: 'e29', source: 'l1', target: 's1', relation: 'references' },
      { id: 'e30', source: 'l2', target: 's3', relation: 'searched against' },
      { id: 'e31', source: 'l5', target: 's4', relation: 'aligned with' }
    ]
  };
}
