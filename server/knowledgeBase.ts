/**
 * Authoritative Knowledge Base for IP-SAKTI Sahayak
 * Curated statutory provisions, acts, guidelines, and international treaties
 * for Ayurveda IPR, product classification, ABS, and international market regulations.
 */

export interface KnowledgeDoc {
  id: string;
  title: string;
  organization: string;
  jurisdiction: 'india' | 'international' | 'both';
  category: 'Patents' | 'Drugs & Cosmetics' | 'Biodiversity & ABS' | 'Trademarks & GI' | 'Traditional Knowledge' | 'Food & Ayush Aahar' | 'International Export' | 'WIPO & Treaties';
  actOrRule: string;
  sectionArticle: string;
  effectiveDate: string;
  lastUpdated: string;
  version: string;
  isAuthoritative: boolean;
  officialUrl: string;
  keywords: string[];
  content: string;
  status: 'active' | 'amended' | 'historical';
}

export const KNOWLEDGE_BASE: KnowledgeDoc[] = [
  // --- INDIA: PATENTS ACT ---
  {
    id: 'doc-in-patent-3p',
    title: 'Section 3(p) – Traditional Knowledge Non-Patentability Exclusion',
    organization: 'Office of the Controller General of Patents, Designs & Trade Marks (IP India), Ministry of Commerce & Industry',
    jurisdiction: 'india',
    category: 'Patents',
    actOrRule: 'The Patents Act, 1970 (as amended by Patents Amendment Act 2005)',
    sectionArticle: 'Section 3(p)',
    effectiveDate: '2005-01-01',
    lastUpdated: '2024-03-15',
    version: '2005 Edition / CGPDTM Guidelines for Patent Examination 2019',
    isAuthoritative: true,
    officialUrl: 'https://ipindia.gov.in/patents.htm',
    keywords: ['patent', 'traditional knowledge', 'tkdl', 'section 3p', 'ayurveda invention', 'prior art', 'classical formulation'],
    status: 'active',
    content: `Under Section 3(p) of the Indian Patents Act 1970, "an invention which in effect is traditional knowledge or which is an aggregation or duplication of known properties of traditionally known component or components" is NOT patentable subject matter. 

Key Regulatory Clarification for Ayurveda:
1. Classical Ayurvedic single herbs or standard combinations described in codified texts (such as Charaka Samhita, Sushruta Samhita, Ashtanga Hridaya, Ayurvedic Pharmacopoeia of India) cannot be patented as compositions.
2. Even if a researcher claims a "new therapeutic use" for an Ayurvedic herb (e.g. Ashwagandha for anti-stress or Curcuma for inflammation), it will face immediate rejection under Section 3(p) if that property is explicitly or implicitly recognized in traditional Indian systems of medicine.
3. Overcoming 3(p): A patent may only be considered if the applicant demonstrates an inventive step beyond mere aggregation, such as a purified novel chemical fraction, a non-obvious modified molecular derivative, or a novel targeted drug delivery vehicle (e.g. liposomal, phytosomal, nano-emulsion), accompanied by proof of unexpected synergistic enhancement.`
  },
  {
    id: 'doc-in-patent-3e',
    title: 'Section 3(e) – Mere Admixture vs. Non-Obvious Synergism',
    organization: 'Office of the Controller General of Patents, Designs & Trade Marks (IP India)',
    jurisdiction: 'india',
    category: 'Patents',
    actOrRule: 'The Patents Act, 1970',
    sectionArticle: 'Section 3(e)',
    effectiveDate: '1970-10-19',
    lastUpdated: '2023-11-01',
    version: 'Patents Act, 1970 (Amended 2005)',
    isAuthoritative: true,
    officialUrl: 'https://ipindia.gov.in/writereaddata/Portal/IPOGuidelines/1_37_1_guidelines-patents-traditional-knowledge.pdf',
    keywords: ['synergy', 'mere admixture', 'section 3e', 'formulation patent', 'polyherbal', 'aggregation of properties', 'combination'],
    status: 'active',
    content: `Section 3(e) of the Indian Patents Act specifies that "a substance obtained by a mere admixture resulting only in the aggregation of the properties of the components thereof or a process for producing such substance" is not an invention.

Critical Criteria for Polyherbal Ayurvedic Formulations:
1. Aggregation Rejection: Combining two or more medicinal herbs (e.g. Tulsi, Ginger, and Pippali) where each herb retains its known biological activity without interactive synergy is deemed a mere admixture.
2. Requirement of Empirical Synergy: The Indian Patent Office mandates statistical and in-vivo/in-vitro proof that the combined efficacy (e.g., Combination Index < 1 using Chou-Talalay method, or statistically significant superior therapeutic response) exceeds the sum of the individual parts.
3. Complete Specification: The patent specification must disclose comparative dosage data for each component tested individually versus the combined ratio.`
  },
  {
    id: 'doc-in-patent-10',
    title: 'Section 10(4)(ii)(D) – Mandatory Biological Material Source Disclosure',
    organization: 'Office of the Controller General of Patents, Designs & Trade Marks (IP India)',
    jurisdiction: 'india',
    category: 'Patents',
    actOrRule: 'The Patents Act, 1970',
    sectionArticle: 'Section 10(4)(ii)(D) and Section 25(1)(j)',
    effectiveDate: '2003-05-20',
    lastUpdated: '2024-01-10',
    version: 'Patents Act, 1970 (Amended 2005)',
    isAuthoritative: true,
    officialUrl: 'https://ipindia.gov.in',
    keywords: ['biological resource', 'source disclosure', 'origin', 'section 10', 'opposition', 'revocation'],
    status: 'active',
    content: `Under Section 10(4)(ii)(D) of the Indian Patents Act, every patent specification must disclose the source and geographical origin of any biological material used for an invention. 

Legal Consequences:
1. Non-disclosure or wrongful mention of the source or geographical origin of biological resources is an explicit statutory ground for Pre-grant Opposition [Section 25(1)(j)], Post-grant Opposition [Section 25(2)(j)], and Revocation of Patent [Section 64(1)(p)].
2. If the biological resource is obtained from India, the applicant is legally obligated to seek prior approval from the National Biodiversity Authority (NBA) under Section 6 of the Biological Diversity Act, 2002.`
  },

  // --- INDIA: DRUGS & COSMETICS ACT & RULES ---
  {
    id: 'doc-in-dca-3a-3h',
    title: 'Section 3(a) & 3(h) – Classical ASU Drugs vs. Patent/Proprietary Medicines',
    organization: 'Ministry of Ayush / Central Drugs Standard Control Organization (CDSCO)',
    jurisdiction: 'india',
    category: 'Drugs & Cosmetics',
    actOrRule: 'The Drugs and Cosmetics Act, 1940',
    sectionArticle: 'Section 3(a) and Section 3(h)',
    effectiveDate: '1940-04-10',
    lastUpdated: '2023-09-01',
    version: 'Chapter IV-A (Ayurvedic, Siddha and Unani Drugs)',
    isAuthoritative: true,
    officialUrl: 'https://ayush.gov.in/acts-rules-policies',
    keywords: ['classical formulation', 'proprietary medicine', 'ppm', 'first schedule', 'section 3a', 'section 3h', 'drug classification'],
    status: 'active',
    content: `Under the Drugs and Cosmetics Act, 1940 (Chapter IV-A), Ayurvedic medicines are categorized into two mutually exclusive regulatory classes:

1. Classical Ayurvedic Drug [Section 3(a)]:
   - Formulations manufactured strictly in accordance with formulae described in the authoritative books of Ayurveda specified in the First Schedule to the Act (54 recognized texts, including Charaka Samhita, Sushruta Samhita, Ashtanga Hridaya, Sharangadhara Samhita, Bhaishajya Ratnavali, Ayurvedic Formulary of India [AFI]).
   - No clinical trial data is required for manufacturing license; reference to authoritative texts is sufficient for proof of safety and efficacy.
   - Named exactly as prescribed in the classical text.

2. Patent or Proprietary Medicine (PPM) [Section 3(h)]:
   - A formulation containing only ingredients mentioned in the First Schedule authoritative books, but not in accordance with standard classical recipes, or formulated in new modern dosage forms (e.g., modern coated tablets, syrups, effervescent granules).
   - Requires proof of safety and effectiveness under Rule 158B.
   - May adopt a proprietary brand name.`
  },
  {
    id: 'doc-in-dca-rule-158b',
    title: 'Rule 158B – Licensing Guidelines, Safety & Proof of Effectiveness for ASU Drugs',
    organization: 'Ministry of Ayush / State Licensing Authorities (SLA)',
    jurisdiction: 'india',
    category: 'Drugs & Cosmetics',
    actOrRule: 'Drugs and Cosmetics Rules, 1945',
    sectionArticle: 'Rule 158B',
    effectiveDate: '2010-08-10',
    lastUpdated: '2024-02-20',
    version: 'Gazette Notification G.S.R. 538(E)',
    isAuthoritative: true,
    officialUrl: 'https://ayush.gov.in',
    keywords: ['rule 158b', 'licensing', 'clinical trial', 'safety', 'proof of effectiveness', 'proprietary ayurvedic medicine', 'gmp schedule t'],
    status: 'active',
    content: `Rule 158B of the Drugs and Cosmetics Rules, 1945 specifies mandatory requirements for obtaining a manufacturing license for Ayurvedic, Siddha and Unani drugs:

Categories under Rule 158B:
1. Category A (Classical Medicines): Safety and efficacy deemed established by citation in First Schedule authoritative texts.
2. Category B (Aqueous / Hydro-alcoholic Extracts of Classical Drugs): Requires published pharmacological data and stability data.
3. Category C (New ASU Formulations / PPM with new therapeutic claims):
   - Requires published scientific literature or pilot clinical trial data demonstrating safety and efficacy.
   - Heavy metal limits, microbial load, pesticide residues, and aflatoxin screening under Ayurvedic Pharmacopoeia of India (API) standards.
4. Schedule T Compliance: Manufacturing premises must hold valid Good Manufacturing Practice (GMP) certification issued by the State Licensing Authority (SLA).`
  },

  // --- INDIA: BIOLOGICAL DIVERSITY & ABS ---
  {
    id: 'doc-in-bda-sec6',
    title: 'Section 6 & 2023 Amendment – Prior Approval for IPR & ABS Compliance',
    organization: 'National Biodiversity Authority (NBA), Ministry of Environment, Forest & Climate Change',
    jurisdiction: 'india',
    category: 'Biodiversity & ABS',
    actOrRule: 'Biological Diversity Act, 2002 & Biological Diversity (Amendment) Act, 2023',
    sectionArticle: 'Section 6 & Section 7 (Amended 2023)',
    effectiveDate: '2003-04-15',
    lastUpdated: '2023-08-03',
    version: 'Biological Diversity (Amendment) Act No. 10 of 2023',
    isAuthoritative: true,
    officialUrl: 'http://nbaindia.org',
    keywords: ['nba', 'abs', 'access and benefit sharing', 'form iii', 'biological diversity act 2023', 'sbb', 'form i'],
    status: 'active',
    content: `Under Section 6 of the Biological Diversity Act, 2002:
1. Statutory Mandate: No person shall apply for any intellectual property right, by whatever name called, in or outside India for any invention based on any research or information on a biological resource obtained from India without obtaining the approval of the National Biodiversity Authority (NBA).
2. Key 2023 Amendment Relief:
   - Under the 2023 Amendment Act, approval from the NBA must now be obtained BEFORE THE GRANT OF THE IPR, rather than prior to filing the patent application.
   - Codified traditional knowledge, cultivated medicinal plants, and registered Ayush practitioners (Vaidyas and Hakims) are explicitly exempted from intimation and ABS benefit-sharing payments.
   - Non-Indian entities (entities with foreign equity or NRI directors) must still file Form III with NBA before commercialization or patent grant.
3. Commercial Benefit Sharing: Benefit sharing fee ranges from 0.1% to 0.5% of ex-factory sale value, or 3-5% of royalty on IPR licensing.`
  },
  {
    id: 'doc-in-bda-forms',
    title: 'NBA Application Forms (Form I, II, III, IV) and SBB Notification',
    organization: 'National Biodiversity Authority (NBA)',
    jurisdiction: 'india',
    category: 'Biodiversity & ABS',
    actOrRule: 'Biological Diversity Rules, 2004 (as amended 2023)',
    sectionArticle: 'Rules 14, 17, 18, 19',
    effectiveDate: '2004-04-15',
    lastUpdated: '2023-12-01',
    version: 'NBA Guidelines on Benefit Sharing 2014 / Rules 2004',
    isAuthoritative: true,
    officialUrl: 'http://nbaindia.org/content/16/23/1/forms.html',
    keywords: ['form i', 'form ii', 'form iii', 'form iv', 'nba forms', 'abs agreement', 'approval process'],
    status: 'active',
    content: `Classification of NBA Application Forms:
- Form I: Application for access to biological resources and associated traditional knowledge for research or commercial utilization (Foreign entities / NRIs / Non-citizens).
- Form II: Application for transferring the results of research relating to biological resources to foreign entities.
- Form III: Application for obtaining intellectual property rights (IPR) for inventions based on Indian biological resources or associated knowledge.
- Form IV: Application for third-party transfer of accessed biological resources.
- State Biodiversity Board (SBB) Intimation: Indian citizens/entities commercializing wild biological resources must give prior intimation to the concerned State Biodiversity Board under Section 7, unless covered under the 2023 cultivated plant / Ayush practitioner exemptions.`
  },

  // --- INDIA: TRADEMARKS & AYUSH MARKS ---
  {
    id: 'doc-in-tm-classes',
    title: 'Ayurveda Trademark Classification & Section 9 Absolute Grounds',
    organization: 'Trade Marks Registry (IP India), Controller General of Patents, Designs and Trade Marks',
    jurisdiction: 'india',
    category: 'Trademarks & GI',
    actOrRule: 'The Trade Marks Act, 1999',
    sectionArticle: 'Section 9(1) & Nice Classification (Classes 3, 5, 30, 32, 44)',
    effectiveDate: '2003-09-15',
    lastUpdated: '2024-01-15',
    version: 'Nice Classification 12th Edition / Trade Marks Rules 2017',
    isAuthoritative: true,
    officialUrl: 'https://ipindia.gov.in/trade-marks.htm',
    keywords: ['trademark', 'class 5', 'class 3', 'class 30', 'section 9', 'sanskrit words', 'generic terms', 'ayush brand'],
    status: 'active',
    content: `Trademark Classification for Ayurvedic Goods and Services:
- Class 5 (Primary): Ayurvedic medicines, therapeutic herbal extracts, medicated oils, herbal capsules, dietary supplements for medical use.
- Class 3: Ayurvedic cosmetics, herbal beauty lotions, essential oils, soaps, hair oils, non-medicated personal care.
- Class 30: Herbal teas, spices, culinary botanical seasonings, health foods (non-medicinal).
- Class 32: Non-alcoholic herbal beverages, Ayurvedic tonics, herbal energy drinks.
- Class 44: Ayurvedic clinics, Panchakarma centers, wellness retreats.

Absolute Grounds for Refusal [Section 9(1)]:
1. Descriptive & Generic Terms: Common Sanskrit plant names (e.g. "Ashwagandha", "Brahmi", "Triphala", "Neem", "Tulsi") or classical preparation types (e.g. "Churna", "Asava", "Arishta", "Taila") CANNOT be trademarked exclusively.
2. Deceptive Similarity: A brand name cannot deceive consumers regarding medicinal properties or approved Ayush licensing status.`
  },
  {
    id: 'doc-in-ayush-mark',
    title: 'Ayush Standard & Premium Quality Mark Scheme',
    organization: 'Ministry of Ayush & Quality Council of India (QCI)',
    jurisdiction: 'india',
    category: 'Trademarks & GI',
    actOrRule: 'Voluntary Certification Scheme for AYUSH Products',
    sectionArticle: 'Ayush Standard & Ayush Premium Certification Criteria',
    effectiveDate: '2009-10-01',
    lastUpdated: '2023-05-10',
    version: 'QCI Ayush Certification Scheme Rev 3',
    isAuthoritative: true,
    officialUrl: 'https://qcin.org/voluntary-certification-scheme-for-ayush-products',
    keywords: ['ayush mark', 'ayush premium mark', 'qci', 'export certification', 'who-gmp', 'heavy metal limits'],
    status: 'active',
    content: `The Ministry of Ayush, in collaboration with the Quality Council of India (QCI), operates two voluntary quality certification marks:
1. Ayush Standard Mark:
   - Certifies compliance with domestic pharmacopoeial standards (Ayurvedic Pharmacopoeia of India) and Good Manufacturing Practices (Schedule T).
2. Ayush Premium Mark:
   - Certifies compliance with stringent international regulatory standards (WHO-GMP guidelines and international heavy metal, pesticide, and microbial limits based on US FDA / EU / Health Canada requirements).
   - Highly recommended for exporters seeking market entry in North America and Europe.`
  },

  // --- INDIA: FSSAI & AYUSH AAHAR ---
  {
    id: 'doc-in-fssai-aahar',
    title: 'Food Safety and Standards (Ayush Aahar) Regulations, 2022',
    organization: 'Food Safety and Standards Authority of India (FSSAI) & Ministry of Ayush',
    jurisdiction: 'india',
    category: 'Food & Ayush Aahar',
    actOrRule: 'Food Safety and Standards (Ayush Aahar) Regulations, 2022',
    sectionArticle: 'Regulation 3, 4 & 5',
    effectiveDate: '2022-05-09',
    lastUpdated: '2023-07-01',
    version: 'Gazette Notification F. No. Std/SP-05/A-1.2022/N-01',
    isAuthoritative: true,
    officialUrl: 'https://www.fssai.gov.in',
    keywords: ['ayush aahar', 'fssai', 'nutraceutical', 'dietary supplement', 'food classification', 'health claims'],
    status: 'active',
    content: `The FSSAI Ayush Aahar Regulations 2022 regulate foods prepared in accordance with traditional Ayurvedic texts:
1. Definition: "Ayush Aahar" means food manufactured in accordance with recipes, processes, or culinary principles described in authoritative books of Ayurveda listed in Schedule A, but NOT including drugs under the Drugs and Cosmetics Act.
2. Labeling Mandate: Every product must bear the mandatory "Ayush Aahar" logo, explicit advisory warning that the product is a food and not intended to diagnose, treat, or cure any disease.
3. No Medical Claims: Disease prevention/treatment claims are strictly prohibited. Permissible claims are limited to traditional wellness (e.g. "promotes digestive fire / Agni", "supports natural immunity / Ojas").`
  },

  // --- INDIA: TKDL & TRADITIONAL KNOWLEDGE ---
  {
    id: 'doc-in-tkdl-treaties',
    title: 'Traditional Knowledge Digital Library (TKDL) & Biopiracy Prevention',
    organization: 'Council of Scientific and Industrial Research (CSIR) & Ministry of Ayush',
    jurisdiction: 'both',
    category: 'Traditional Knowledge',
    actOrRule: 'TKDL Institutional Access Agreements & Patent Office Memoranda',
    sectionArticle: 'TKDL Prior Art Database Specifications',
    effectiveDate: '2001-02-01',
    lastUpdated: '2024-04-01',
    version: 'Access Framework 2022 (Open to R&D Entities)',
    isAuthoritative: true,
    officialUrl: 'https://www.tkdl.res.in',
    keywords: ['tkdl', 'prior art', 'biopiracy', 'turmeric patent', 'csir', 'charaka', 'sushruta', 'classical formulation'],
    status: 'active',
    content: `The Traditional Knowledge Digital Library (TKDL) is a pioneering Indian digital repository containing over 450,000 formulations from classical texts of Ayurveda, Siddha, and Unani:
1. Global Patent Office Access: India has signed formal access agreements with the European Patent Office (EPO), United States Patent and Trademark Office (USPTO), Japan Patent Office (JPO), UK IPO, and Canadian IP Office (CIPO).
2. Third-Party Observations: TKDL scientists routinely file Third-Party Pre-Grant Observations against international patent applications claiming Ayurvedic plants, citing exact classical shlokas and historical publication dates.
3. Public & R&D Access: Under the Union Cabinet decision of 2022, the TKDL database has been progressively opened for research and educational institutions and private innovators for prior art verification and ethical collaborative research.`
  },

  // --- INTERNATIONAL: WIPO, TRIPS & NAGOYA ---
  {
    id: 'doc-intl-trips-27',
    title: 'WTO TRIPS Agreement – Article 27 Patentability & Flexibilities',
    organization: 'World Trade Organization (WTO)',
    jurisdiction: 'international',
    category: 'WIPO & Treaties',
    actOrRule: 'Agreement on Trade-Related Aspects of Intellectual Property Rights (TRIPS)',
    sectionArticle: 'Article 27.1, 27.2, 27.3(b)',
    effectiveDate: '1995-01-01',
    lastUpdated: '2023-01-01',
    version: 'TRIPS 1994 (Doha Declaration 2001 on Public Health)',
    isAuthoritative: true,
    officialUrl: 'https://www.wto.org/english/docs_e/legal_e/27-trips_04c_e.htm',
    keywords: ['trips', 'article 27', 'wto', 'patentable subject matter', 'traditional knowledge exception', 'doha declaration'],
    status: 'active',
    content: `Under Article 27 of the WTO TRIPS Agreement:
1. Patentability Standards: Patents shall be available for any inventions, whether products or processes, in all fields of technology, provided that they are new, involve an inventive step (non-obvious), and are capable of industrial application.
2. Flexibilities & Exclusions:
   - Article 27.2: Members may exclude inventions necessary to protect ordre public or morality, including human, animal, or plant life or health.
   - Article 27.3(b): Members may exclude plants and animals other than micro-organisms, and essentially biological processes for the production of plants or animals.
3. Interplay with Indian Patent Law: While TRIPS requires patentability for pharmaceuticals, India utilized permissible flexibilities to enact Section 3(d), 3(e), and 3(p) to prevent biopiracy and evergreening of traditional knowledge.`
  },
  {
    id: 'doc-intl-wipo-treaty-2024',
    title: 'WIPO Treaty on Intellectual Property, Genetic Resources and Associated Traditional Knowledge (2024)',
    organization: 'World Intellectual Property Organization (WIPO)',
    jurisdiction: 'international',
    category: 'WIPO & Treaties',
    actOrRule: 'WIPO Treaty on IP, Genetic Resources and Associated Traditional Knowledge',
    sectionArticle: 'Article 3 (Mandatory Disclosure Requirement)',
    effectiveDate: '2024-05-24',
    lastUpdated: '2024-06-01',
    version: 'Diplomatic Conference Final Act, Geneva 2024',
    isAuthoritative: true,
    officialUrl: 'https://www.wipo.int/diplomatic-conferences/en/genetic-resources/',
    keywords: ['wipo treaty 2024', 'genetic resources', 'traditional knowledge', 'mandatory disclosure', 'nagoya protocol', 'patent disclosure'],
    status: 'active',
    content: `Adopted in Geneva on May 24, 2024, after two decades of negotiations championed by India and the Global South:
1. Mandatory Patent Disclosure (Article 3): Patent applicants worldwide are now legally required to disclose:
   - The country of origin of the genetic resources, if the claimed invention is materially/directly based on genetic resources;
   - The indigenous peoples or local community that provided the traditional knowledge, if the invention is based on associated traditional knowledge.
2. Global Information Systems: Establishes non-confidential information databases and information exchange mechanisms to assist patent examiners worldwide in identifying prior art and curbing erroneous patents on Ayurvedic bio-resources.`
  },
  {
    id: 'doc-intl-nagoya',
    title: 'Nagoya Protocol on Access and Benefit-Sharing (ABS) to the CBD',
    organization: 'Secretariat of the Convention on Biological Diversity (CBD)',
    jurisdiction: 'international',
    category: 'Biodiversity & ABS',
    actOrRule: 'Nagoya Protocol on Access to Genetic Resources and the Fair and Equitable Sharing of Benefits',
    sectionArticle: 'Articles 5, 6, 7, 15, 17',
    effectiveDate: '2014-10-12',
    lastUpdated: '2023-01-01',
    version: 'United Nations Treaty Series, Vol. 3008',
    isAuthoritative: true,
    officialUrl: 'https://www.cbd.int/abs/',
    keywords: ['nagoya protocol', 'abs', 'cbd', 'prior informed consent', 'pic', 'mutually agreed terms', 'mat', 'checkpoint'],
    status: 'active',
    content: `The Nagoya Protocol creates a binding international framework for Access and Benefit-Sharing:
1. Core Pillars:
   - Prior Informed Consent (PIC): Access to biological resources and associated traditional knowledge must be preceded by formal consent from the provider country.
   - Mutually Agreed Terms (MAT): Commercial terms and fair benefit sharing must be contracted.
2. Compliance & Checkpoints: User countries (including EU members, Japan, UK) have established border or patent office checkpoints requiring verification of an Internationally Recognized Certificate of Compliance (IRCC) generated through India's NBA approval.`
  },

  // --- INTERNATIONAL: EXPORT REGIMES (USA, EU, UK, JAPAN, AUSTRALIA) ---
  {
    id: 'doc-intl-export-usa',
    title: 'USA Export Guide: FDA Dietary Supplements (DSHEA 1994 & 21 CFR 111)',
    organization: 'US Food and Drug Administration (FDA) & US Patent and Trademark Office (USPTO)',
    jurisdiction: 'international',
    category: 'International Export',
    actOrRule: 'Dietary Supplement Health and Education Act of 1994 / 21 CFR Part 111',
    sectionArticle: '21 U.S.C. 321(ff), 21 CFR Part 111 (cGMP)',
    effectiveDate: '1994-10-25',
    lastUpdated: '2024-01-10',
    version: 'FDA Dietary Supplement Guidance 2024',
    isAuthoritative: true,
    officialUrl: 'https://www.fda.gov/food/dietary-supplements',
    keywords: ['usa export', 'us fda', 'dshea', 'dietary supplement', 'ndi', 'structure function claim', 'proposition 65', 'heavy metals'],
    status: 'active',
    content: `Regulatory Requirements for Exporting Ayurvedic Products to the USA:
1. Product Category: Ayurvedic products are classified and marketed as DIETARY SUPPLEMENTS, NOT prescription or OTC drugs.
2. Permissible Claims vs Drug Claims:
   - Allowed: "Structure/Function Claims" (e.g. "Supports healthy joint mobility", "Helps maintain normal blood glucose levels already within normal range").
   - Strictly Forbidden: Disease claims (e.g. "Cures diabetes", "Treats arthritis", "Antiviral"). Making disease claims converts the product into an unapproved new drug subject to FDA Warning Letters, import detention, and border seizure.
   - Mandatory Disclaimer: "These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease."
3. New Dietary Ingredient (NDI) Notification: If an herbal ingredient was not marketed in the US prior to October 15, 1994, a 75-day premarket NDI safety notification must be filed with FDA.
4. Heavy Metals & California Proposition 65: Strict limits on Lead (<0.5 mcg/day), Arsenic, Cadmium, and Mercury. Ayurvedic Bhasmas containing intentional heavy metals (herbo-mineral formulations) CANNOT be sold as dietary supplements in the US.`
  },
  {
    id: 'doc-intl-export-eu',
    title: 'EU Export Guide: Traditional Herbal Medicinal Products Directive 2004/24/EC (THMPD)',
    organization: 'European Medicines Agency (EMA) / Committee on Herbal Medicinal Products (HMPC)',
    jurisdiction: 'international',
    category: 'International Export',
    actOrRule: 'Directive 2004/24/EC of the European Parliament and of the Council',
    sectionArticle: 'Articles 16a to 16i',
    effectiveDate: '2004-04-30',
    lastUpdated: '2023-11-15',
    version: 'Consolidated Directive 2001/83/EC amended by 2004/24/EC',
    isAuthoritative: true,
    officialUrl: 'https://www.ema.europa.eu/en/human-regulatory/herbal-products',
    keywords: ['eu export', 'thmpd', 'traditional herbal medicinal product', 'ema', 'hmpc', 'food supplement', 'novel food'],
    status: 'active',
    content: `European Union Regulatory Pathways for Ayurvedic Formulations:
1. Traditional Herbal Medicinal Product (THMP) Pathway (Directive 2004/24/EC):
   - Simplified registration based on long-standing traditional use: Requires documented proof of continuous medicinal use for at least 30 years preceding application, of which at least 15 years must be within the European Union.
   - Note: The 15-year EU requirement has historically been a significant hurdle for classical Indian Ayurvedic formulations.
2. Food Supplement Pathway (Directive 2002/46/EC):
   - Many exporters register products as food supplements with Member State health authorities (e.g. EFSA compliance, national positive lists of botanical plants such as the Belfrit list).
3. Novel Food Regulation (EU 2015/2283):
   - If an Ayurvedic herb was not consumed to a significant degree by humans in the EU prior to 15 May 1997, it is classified as a "Novel Food" and requires pre-market safety authorization unless proven as a Traditional Food from a Third Country.`
  },
  {
    id: 'doc-intl-export-uk',
    title: 'UK Export Guide: MHRA Traditional Herbal Registration (THR) Scheme',
    organization: 'Medicines and Healthcare products Regulatory Agency (MHRA)',
    jurisdiction: 'international',
    category: 'International Export',
    actOrRule: 'Human Medicines Regulations 2012 (Part 7: Traditional Herbal Registrations)',
    sectionArticle: 'Regulation 125 - 142',
    effectiveDate: '2012-08-14',
    lastUpdated: '2024-01-01',
    version: 'Post-Brexit UK MHRA Guidance 2024',
    isAuthoritative: true,
    officialUrl: 'https://www.gov.uk/guidance/apply-for-a-traditional-herbal-registration-thr',
    keywords: ['uk export', 'mhra', 'thr', 'traditional herbal registration', 'uk food standards', 'post brexit'],
    status: 'active',
    content: `Exporting Ayurvedic Products to the United Kingdom:
1. Traditional Herbal Registration (THR) Scheme:
   - Administered by the MHRA. Products must demonstrate safety, quality, and traditional medicinal use for at least 30 years (with 15 years in the UK or EU).
   - Approved products carry the official THR certification logo on the packaging.
2. Food Supplement Route:
   - Products marketed without medicinal claims fall under Food Standards Agency (FSA) regulations and general food law.
   - Prohibited from mentioning disease prevention or medicinal treatment.`
  },
  {
    id: 'doc-intl-export-japan-aus',
    title: 'Japan PMDA (Kampo) & Australia TGA Complementary Medicines Export Regimes',
    organization: 'Japan PMDA & Australia Therapeutic Goods Administration (TGA)',
    jurisdiction: 'international',
    category: 'International Export',
    actOrRule: 'Japan PMD Act / Australian Therapeutic Goods Act 1989',
    sectionArticle: 'TGA Listed Medicines (AUST L) / PMDA Non-Prescription Kampo Standards',
    effectiveDate: '2000-01-01',
    lastUpdated: '2024-02-15',
    version: 'TGA Regulations 2024 / PMDA Standards',
    isAuthoritative: true,
    officialUrl: 'https://www.tga.gov.au/how-we-regulate/manufacturing',
    keywords: ['japan export', 'australia export', 'tga', 'aust l', 'pmda', 'kampo', 'complementary medicine'],
    status: 'active',
    content: `Export Standards for Japan and Australia:
1. Australia (TGA):
   - Ayurvedic medicines are regulated as "Complementary Medicines".
   - "Listed Medicines" (AUST L): Low-risk formulations containing pre-approved permitted ingredients from the TGA Permitted Ingredients Determination. Fast-track online listing without pre-market evaluation, but subject to post-market audit.
   - Must hold TGA GMP clearance for the manufacturing facility in India.
2. Japan (PMDA):
   - Traditional herbal medicines are largely mapped to Kampo formulations specified in the Japanese Pharmacopoeia.
   - Non-Kampo Ayurvedic products are typically exported under the "Foods with Function Claims (FFC)" or general health food categorization with rigorous quarantine pesticide screening.`
  }
];
