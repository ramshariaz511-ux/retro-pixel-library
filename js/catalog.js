/**
 * RETROZEN PIXEL LIBRARY STORE - COMPLETE BOOK & FLASHCARD CATALOG
 * Organized by Genres and Educational Subcategories:
 * - Educational:
 *    * Science
 *    * Mathematics
 *    * History
 *    * Literature
 *    * Business
 *    * Computing
 *    * Test Guides (SAT, GRE, MCAT, IGCSEs, A-Levels, Bar Exam)
 *    * Flashcard Companies for Standardized Exams (SAT, GRE, MCAT, IGCSEs, A-Levels, Bar Exam)
 * - Philosophy
 * - Fictional / Non-Fictional Story Books
 * - Novels
 * - Game Guide Books (Minecraft, Roblox, Retro Arcade, Pixel RPGs)
 * - Reference, Languages & Study Mastery (Additional Educational Library Categories)
 */

window.LIBRARY_CATEGORIES = [
  {
    id: 'all',
    name: 'All Library Shelves',
    shortName: 'ALL BOOKS',
    icon: '🏛️',
    desc: 'Browse the complete retroZen digital & print archive across all academic and leisure shelves.'
  },
  {
    id: 'educational',
    name: 'Educational & Exam Prep',
    shortName: 'EDUCATIONAL',
    icon: '🎓',
    desc: 'University textbooks, academic subjects, standardized test guides, and premier exam flashcard decks.',
    subcategories: [
      { id: 'all', name: 'All Educational', icon: '📚' },
      { id: 'science', name: 'Science', icon: '🔬' },
      { id: 'mathematics', name: 'Mathematics', icon: '📐' },
      { id: 'history', name: 'History', icon: '🏛️' },
      { id: 'literature', name: 'Literature', icon: '🪶' },
      { id: 'business', name: 'Business', icon: '💼' },
      { id: 'computing', name: 'Computing', icon: '💻' },
      { id: 'test-guides', name: 'Test Guides', icon: '📝' },
      { id: 'flashcards', name: 'Exam Flashcard Companies', icon: '🗂️' }
    ]
  },
  {
    id: 'philosophy',
    name: 'Philosophy & Ethics',
    shortName: 'PHILOSOPHY',
    icon: '🦉',
    desc: 'Timeless treatises on Stoicism, Existentialism, Epistemology, Eastern Wisdom, and Logic.'
  },
  {
    id: 'storybooks',
    name: 'Fictional & Non-Fictional Stories',
    shortName: 'STORY BOOKS',
    icon: '📖',
    desc: 'Curated short story anthologies, real-world biographies, historical expeditions, and world folklore.'
  },
  {
    id: 'novels',
    name: 'Novels & Literary Fiction',
    shortName: 'NOVELS',
    icon: '🌌',
    desc: 'Cyberpunk epics, classic world novels, cozy detective mysteries, and high fantasy sagas.'
  },
  {
    id: 'game-guides',
    name: 'Game Guide Books',
    shortName: 'GAME GUIDES',
    icon: '🕹️',
    desc: 'Official & master strategy guides for Minecraft, Roblox Lua scripting, and retro pixel classics.'
  },
  {
    id: 'reference',
    name: 'Reference, Languages & Study Skills',
    shortName: 'REFERENCE & LABS',
    icon: '🧭',
    desc: 'Visual encyclopedias, world atlases, polyglot language manuals, cognitive psychology, and pixel design.'
  }
];

window.LIBRARY_BOOKS = [
  // =========================================================================
  // 1. EDUCATIONAL -> SCIENCE
  // =========================================================================
  {
    id: 'edu-sci-01',
    title: 'Quantum Mechanics & The Pixelated Cosmos',
    author: 'Dr. Elena Vance (MIT Press Retro)',
    category: 'educational',
    subcategory: 'science',
    subcategoryLabel: 'Science • Physics',
    price: 34.99,
    rating: 4.9,
    pages: '480 Pages',
    badge: 'BESTSELLER',
    coverColor: '#0284c7',
    accentColor: '#00f5d4',
    icon: '⚛️',
    description: 'An illustrated, crystal-clear exploration of wave-particle duality, Schrödinger equations, quantum entanglement, and astrophysics with step-by-step worked derivations.',
    highlights: ['Wavefunctions & Operators', 'Quantum Computing Foundations', '120+ Solved Physics Problems']
  },
  {
    id: 'edu-sci-02',
    title: 'Organic Chemistry: Mechanisms & Synthesis Atlas',
    author: 'Prof. Marcus Sterling',
    category: 'educational',
    subcategory: 'science',
    subcategoryLabel: 'Science • Chemistry',
    price: 42.50,
    rating: 4.8,
    pages: '610 Pages',
    badge: 'LAB EDITION',
    coverColor: '#059669',
    accentColor: '#facc15',
    icon: '🧪',
    description: 'Master stereochemistry, nucleophilic substitutions, spectroscopy (NMR/IR), and retrosynthetic analysis using visual color-coded electron-pushing diagrams.',
    highlights: ['3D Molecular Visualizations', 'Reaction Pathway Maps', 'Spectroscopy Cheat Sheets']
  },
  {
    id: 'edu-sci-03',
    title: 'Molecular Cell Biology & Genetics Compendium',
    author: 'Dr. Rosalind Chen & BioPixel Press',
    category: 'educational',
    subcategory: 'science',
    subcategoryLabel: 'Science • Biology',
    price: 38.00,
    rating: 4.9,
    pages: '540 Pages',
    badge: 'UNIVERSITY CORE',
    coverColor: '#10b981',
    accentColor: '#a7f3d0',
    icon: '🧬',
    description: 'Covers CRISPR gene editing, cellular respiration, DNA replication, neurobiology, and immunology with high-contrast pixel diagrams of cellular organelles.',
    highlights: ['CRISPR-Cas9 Deep Dive', 'Metabolic Pathway Charts', 'Clinical Case Studies']
  },

  // =========================================================================
  // 2. EDUCATIONAL -> MATHEMATICS
  // =========================================================================
  {
    id: 'edu-math-01',
    title: 'Multivariable Calculus & Vector Analysis',
    author: 'Prof. Arthur Pendelton',
    category: 'educational',
    subcategory: 'mathematics',
    subcategoryLabel: 'Mathematics • Calculus',
    price: 36.99,
    rating: 4.9,
    pages: '520 Pages',
    badge: 'TOP RATED',
    coverColor: '#4f46e5',
    accentColor: '#22d3ee',
    icon: '📐',
    description: 'From partial derivatives and multiple integrals to Green’s, Stokes’, and Divergence theorems. Designed with geometric intuition and 300+ graded exercises.',
    highlights: ['Visual Vector Fields', 'Full Step-by-Step Solutions', 'Physics & Engineering Applications']
  },
  {
    id: 'edu-math-02',
    title: 'Linear Algebra Done Visually: Matrices & Eigen-Spaces',
    author: 'Dr. Nadia Kovalev',
    category: 'educational',
    subcategory: 'mathematics',
    subcategoryLabel: 'Mathematics • Linear Algebra',
    price: 32.00,
    rating: 4.8,
    pages: '410 Pages',
    badge: 'AI & MATH CORE',
    coverColor: '#7c3aed',
    accentColor: '#facc15',
    icon: '🔢',
    description: 'Understand vector spaces, singular value decomposition (SVD), eigenvalues, and orthogonal projections—essential for graphics programming and machine learning.',
    highlights: ['SVD & PCA Explained', '3D Shader Matrix Math', 'Interactive Proof Walkthroughs']
  },
  {
    id: 'edu-math-03',
    title: 'Discrete Mathematics, Combinatorics & Graph Theory',
    author: 'Prof. Alan Dijkstra-Hoare',
    category: 'educational',
    subcategory: 'mathematics',
    subcategoryLabel: 'Mathematics • Discrete Math',
    price: 29.95,
    rating: 4.7,
    pages: '390 Pages',
    badge: 'CS ESSENTIAL',
    coverColor: '#2563eb',
    accentColor: '#38bdf8',
    icon: '🕸️',
    description: 'Formal logic, proof by induction, modular arithmetic, cryptography, trees, and network flow algorithms explained with clarity and rigor.',
    highlights: ['RSA Cryptography Math', 'Euler & Hamiltonian Graphs', ' Olympiad-Style Puzzles']
  },

  // =========================================================================
  // 3. EDUCATIONAL -> HISTORY
  // =========================================================================
  {
    id: 'edu-hist-01',
    title: 'Empires of the Silk Road & Ancient Civilizations',
    author: 'Dr. Tariq Al-Mansoor',
    category: 'educational',
    subcategory: 'history',
    subcategoryLabel: 'History • Ancient & Medieval',
    price: 28.50,
    rating: 4.9,
    pages: '465 Pages',
    badge: 'ILLUSTRATED ATLAS',
    coverColor: '#b45309',
    accentColor: '#fde047',
    icon: '🏺',
    description: 'Traces the cultural, scientific, and mercantile exchanges across Mesopotamia, Chang’an, Samarkand, Constantinople, and the Mediterranean basin.',
    highlights: ['24 Pixel Cartography Maps', 'Primary Source Translations', 'Timeline of Inventions']
  },
  {
    id: 'edu-hist-02',
    title: 'The Silicon & Industrial Revolutions (1760–2000)',
    author: 'Clara Viktoria, PhD',
    category: 'educational',
    subcategory: 'history',
    subcategoryLabel: 'History • Modern Era',
    price: 31.00,
    rating: 4.8,
    pages: '430 Pages',
    badge: 'MODERN HISTORY',
    coverColor: '#9a3412',
    accentColor: '#fdba74',
    icon: '⚙️',
    description: 'How steam engines, railways, telegraphy, and eventually vacuum tubes and microprocessors reshaped global society, economics, and human thought.',
    highlights: ['Babbage to Bell Labs', 'Global Economic Shifts', 'Archival Photographs & Diagrams']
  },

  // =========================================================================
  // 4. EDUCATIONAL -> LITERATURE
  // =========================================================================
  {
    id: 'edu-lit-01',
    title: 'The Art of Literary Analysis & Close Reading',
    author: 'Prof. Genevieve Bellwether',
    category: 'educational',
    subcategory: 'literature',
    subcategoryLabel: 'Literature • Criticism',
    price: 24.99,
    rating: 4.8,
    pages: '340 Pages',
    badge: 'SEMINAR PICK',
    coverColor: '#be185d',
    accentColor: '#fbcfe8',
    icon: '🪶',
    description: 'A comprehensive guide to narrative structure, metaphor, meter, modernist aesthetics, and postcolonial theory for literature students and avid readers.',
    highlights: ['Annotated Poem Breakdowns', 'Essay Writing Frameworks', 'Glossary of Literary Devices']
  },
  {
    id: 'edu-lit-02',
    title: 'World Mythology & Epic Poetics: Homer to Gilgamesh',
    author: 'Dr. Julian Hawthorne',
    category: 'educational',
    subcategory: 'literature',
    subcategoryLabel: 'Literature • Classics',
    price: 27.50,
    rating: 4.9,
    pages: '490 Pages',
    badge: 'COMPARATIVE LIT',
    coverColor: '#9d174d',
    accentColor: '#facc15',
    icon: '🏛️',
    description: 'Comparative analysis of The Odyssey, The Epic of Gilgamesh, The Mahabharata, and Beowulf, exploring the hero’s journey and oral tradition.',
    highlights: ['Side-by-Side Verse Notes', 'Archetype Comparison Tables', 'Historical Context Essays']
  },

  // =========================================================================
  // 5. EDUCATIONAL -> BUSINESS
  // =========================================================================
  {
    id: 'edu-bus-01',
    title: 'Principles of Macroeconomics, Markets & Monetary Policy',
    author: 'Dr. Kenneth Vance & Sofia Patel',
    category: 'educational',
    subcategory: 'business',
    subcategoryLabel: 'Business • Economics',
    price: 39.99,
    rating: 4.8,
    pages: '550 Pages',
    badge: 'FINANCE CORE',
    coverColor: '#0f766e',
    accentColor: '#5eead4',
    icon: '📈',
    description: 'Explains GDP, inflation dynamics, central banking, international trade, game theory, and fiscal policy using real-world historical case studies.',
    highlights: ['Supply & Demand Simulations', 'Central Bank Case Studies', 'Game Theory Payoff Matrices']
  },
  {
    id: 'edu-bus-02',
    title: 'Zero to Arcade: Venture Strategy & Product Design',
    author: 'lucas Chen (Stanford GSB Press)',
    category: 'educational',
    subcategory: 'business',
    subcategoryLabel: 'Business • Entrepreneurship',
    price: 29.00,
    rating: 4.9,
    pages: '320 Pages',
    badge: 'FOUNDER GUIDE',
    coverColor: '#115e59',
    accentColor: '#facc15',
    icon: '💼',
    description: 'How to validate ideas, build sustainable unit economics, pitch venture capital, and lead engineering & creative teams from prototype to scale.',
    highlights: ['Financial Modeling Templates', 'SaaS & Storefront Metrics', 'Negotiation Playbook']
  },

  // =========================================================================
  // 6. EDUCATIONAL -> COMPUTING
  // =========================================================================
  {
    id: 'edu-comp-01',
    title: 'Algorithms, Data Structures & Systems Architecture',
    author: 'Prof. Devon K. Sterling',
    category: 'educational',
    subcategory: 'computing',
    subcategoryLabel: 'Computing • Computer Science',
    price: 44.00,
    rating: 5.0,
    pages: '640 Pages',
    badge: 'STAFF PICK',
    coverColor: '#0369a1',
    accentColor: '#00f5d4',
    icon: '💻',
    description: 'The definitive visual guide to Big-O complexity, balanced trees, dynamic programming, graph search (Dijkstra/A*), compilers, and OS kernels.',
    highlights: ['150+ Annotated Code Snippets', 'Memory & Cache Hierarchy', 'Technical Interview Prep']
  },
  {
    id: 'edu-comp-02',
    title: 'Deep Learning, Transformers & Generative AI Engineering',
    author: 'Dr. Aisha Rahman',
    category: 'educational',
    subcategory: 'computing',
    subcategoryLabel: 'Computing • AI & ML',
    price: 46.50,
    rating: 4.9,
    pages: '510 Pages',
    badge: 'AI FRONTIER',
    coverColor: '#1d4ed8',
    accentColor: '#facc15',
    icon: '🤖',
    description: 'Build neural networks from scratch: backpropagation, attention mechanisms, LLMs, RAG pipelines, and secure API integration in modern web apps.',
    highlights: ['Transformer Architecture Diagrams', 'Prompt & Context Engineering', 'Full Python & JS Examples']
  },

  // =========================================================================
  // 7. EDUCATIONAL -> TEST GUIDES (SAT, GRE, MCAT, IGCSE, A-LEVEL, BAR EXAM)
  // =========================================================================
  {
    id: 'edu-test-01',
    title: 'Digital SAT 1600 Complete Master Guide (2026–2027 Edition)',
    author: 'ApexScholars Test Prep',
    category: 'educational',
    subcategory: 'test-guides',
    subcategoryLabel: 'Test Guide • SAT Exam',
    price: 34.00,
    rating: 4.9,
    pages: '720 Pages',
    badge: 'SAT 1600 PREP',
    coverColor: '#1e3a8a',
    accentColor: '#facc15',
    icon: '🎯',
    description: 'Complete preparation for the adaptive Digital SAT Reading & Writing and Math modules. Includes 8 full-length practice exams, Desmos calculator hacks, and pacing strategies.',
    highlights: ['8 Full Adaptive Practice Tests', 'Desmos Graphing Calculator Mastery', '2,000+ Drill Questions']
  },
  {
    id: 'edu-test-02',
    title: 'Official GRE Super Power Pack: Quantitative & Verbal Reasoning',
    author: 'GradMaster Academic Press',
    category: 'educational',
    subcategory: 'test-guides',
    subcategoryLabel: 'Test Guide • GRE Exam',
    price: 39.50,
    rating: 4.8,
    pages: '680 Pages',
    badge: 'GRE 335+ TARGET',
    coverColor: '#312e81',
    accentColor: '#00f5d4',
    icon: '📊',
    description: 'Conquer GRE Quantitative Comparison, Data Interpretation, Text Completion, and Analytical Writing with high-difficulty problem sets and error-log diagnostics.',
    highlights: ['600+ Hard Quant Problems', 'Analytical Writing Templates', '1-Month & 3-Month Study Schedules']
  },
  {
    id: 'edu-test-03',
    title: 'MCAT 528 Complete 7-Subject Review & CARS Strategy Box',
    author: 'PreMed Vanguard Publishing',
    category: 'educational',
    subcategory: 'test-guides',
    subcategoryLabel: 'Test Guide • MCAT Exam',
    price: 89.99,
    rating: 5.0,
    pages: '1,850 Pages (7-Vol)',
    badge: 'MCAT 7-BOOK SET',
    coverColor: '#065f46',
    accentColor: '#fde047',
    icon: '🩺',
    description: 'Comprehensive 7-volume box set covering Biochemistry, Biology, Organic & General Chemistry, Physics, Psychology/Sociology, and CARS critical analysis.',
    highlights: ['High-Yield Metabolic Charts', 'CARS Passage Deconstruction', 'AAMC-Style Experimental Passages']
  },
  {
    id: 'edu-test-04',
    title: 'Cambridge IGCSE & A-Level Sciences + Maths Past Paper Compendium',
    author: 'Britannia International Examinations Press',
    category: 'educational',
    subcategory: 'test-guides',
    subcategoryLabel: 'Test Guide • IGCSE & A-Levels',
    price: 41.00,
    rating: 4.9,
    pages: '620 Pages',
    badge: 'A* GRADE TRACK',
    coverColor: '#701a75',
    accentColor: '#38bdf8',
    icon: '🏅',
    description: 'Topic-by-topic worked solutions and examiner mark-scheme insights for Cambridge IGCSE (0580/0625/0620) and International AS & A-Level (9709/9702) exams.',
    highlights: ['Examiner Mark-Scheme Keywords', 'Paper 1, 2, 3, 4 & 5 Strategies', 'Common Pitfall Warnings']
  },
  {
    id: 'edu-test-05',
    title: 'Uniform Bar Exam (UBE / MBE / MEE) Complete Pass Manual',
    author: 'LexisPixel Legal Education',
    category: 'educational',
    subcategory: 'test-guides',
    subcategoryLabel: 'Test Guide • Bar Exam',
    price: 74.99,
    rating: 4.9,
    pages: '940 Pages',
    badge: 'BAR EXAM PREP',
    coverColor: '#7c2d12',
    accentColor: '#facc15',
    icon: '⚖️',
    description: 'Master Constitutional Law, Contracts (UCC), Criminal Law, Evidence, Real Property, Civil Procedure, and Torts with IRAC essay templates and 1,200 MBE questions.',
    highlights: ['1,200 Licensed-Style MBE Prompts', 'MEE & MPT Essay Attack Outlines', 'Rule Statement Flowcharts']
  },

  // =========================================================================
  // 8. EDUCATIONAL -> FLASHCARD COMPANIES FOR STANDARDIZED EXAMS
  // =========================================================================
  {
    id: 'edu-fc-01',
    title: 'AnkiPixel Co. — SAT 1600 High-Yield Vocab & Math Formula Deck',
    author: 'AnkiPixel Flashcard Company',
    category: 'educational',
    subcategory: 'flashcards',
    subcategoryLabel: 'Flashcards • SAT (AnkiPixel Co.)',
    price: 24.99,
    rating: 5.0,
    pages: '1,000 Cards + App Code',
    badge: 'ANKIPIXEL DECK',
    coverColor: '#0e7490',
    accentColor: '#facc15',
    icon: '🗂️',
    description: 'Produced by AnkiPixel Flashcard Co.: 1,000 laminated pixel-coded spaced-repetition cards covering Digital SAT tier-2 vocabulary in context, grammar rules, and geometry/algebra shortcuts.',
    highlights: ['Company: AnkiPixel Flashcard Co.', '500 Context Vocab + 500 Math Cards', 'Includes Leitner Spaced-Repetition Divider Box']
  },
  {
    id: 'edu-fc-02',
    title: 'Magoosh RetroVault — GRE 1,200 Essential Words & Quant Deck',
    author: 'Magoosh RetroVault Cards Inc.',
    category: 'educational',
    subcategory: 'flashcards',
    subcategoryLabel: 'Flashcards • GRE (Magoosh Vault)',
    price: 26.99,
    rating: 4.9,
    pages: '1,200 Cards (Box Set)',
    badge: 'MAGOOSH VAULT',
    coverColor: '#4338ca',
    accentColor: '#00f5d4',
    icon: '🃏',
    description: 'Official Magoosh RetroVault GRE box set featuring Latin/Greek roots, mnemonic pixel cartoons, synonym clusters, and 300 high-speed GRE quantitative comparison flashcards.',
    highlights: ['Company: Magoosh RetroVault Inc.', 'Mnemonic Pixel Illustrations on Every Card', 'Sorted by Difficulty Tier (Basic to 170-Level)']
  },
  {
    id: 'edu-fc-03',
    title: 'MemoraMed Decks — MCAT 3,000 MilesDown-Style Complete Box Set',
    author: 'MemoraMed Flashcard Labs',
    category: 'educational',
    subcategory: 'flashcards',
    subcategoryLabel: 'Flashcards • MCAT (MemoraMed)',
    price: 49.99,
    rating: 5.0,
    pages: '3,000 Color-Coded Cards',
    badge: 'MEMORAMED MCAT',
    coverColor: '#047857',
    accentColor: '#fde047',
    icon: '🧬',
    description: 'Crafted by MemoraMed Flashcard Labs: The gold-standard 3,000-card MCAT active-recall deck covering Amino Acids, Metabolic Pathways, Physics Equations, and 800 Psych/Soc terms.',
    highlights: ['Company: MemoraMed Flashcard Labs', 'Cloze-Deletion & Diagram Occlusion Cards', 'Water-Resistant Heavy Cardstock']
  },
  {
    id: 'edu-fc-04',
    title: 'Cambridge FlashMaster — IGCSE Complete 8-Subject Revision Box',
    author: 'Cambridge FlashMaster Publishing',
    category: 'educational',
    subcategory: 'flashcards',
    subcategoryLabel: 'Flashcards • IGCSE (FlashMaster)',
    price: 29.50,
    rating: 4.9,
    pages: '950 Revision Cards',
    badge: 'IGCSE FLASHMASTER',
    coverColor: '#6d28d9',
    accentColor: '#38bdf8',
    icon: '🇬🇧',
    description: 'By Cambridge FlashMaster Co.: Instant active-recall cards aligned 1-to-1 with the IGCSE syllabus for Physics, Chemistry, Biology, Extended Maths, and Computer Science.',
    highlights: ['Company: Cambridge FlashMaster Co.', 'Exact Mark-Scheme Definitions', 'Quick-Quiz QR Codes per Topic']
  },
  {
    id: 'edu-fc-05',
    title: 'Oxford PixelCards — A-Level Further Maths, Physics & Chem Deck',
    author: 'Oxford PixelCards Ltd.',
    category: 'educational',
    subcategory: 'flashcards',
    subcategoryLabel: 'Flashcards • A-Levels (Oxford Pixel)',
    price: 31.99,
    rating: 4.8,
    pages: '1,100 Cards',
    badge: 'A-LEVEL DECK',
    coverColor: '#1e40af',
    accentColor: '#facc15',
    icon: '🎓',
    description: 'Published by Oxford PixelCards Ltd.: High-precision revision cards for Year 12 & Year 13 A-Level students covering Organic Synthesis maps, Calculus identities, and Mechanics.',
    highlights: ['Company: Oxford PixelCards Ltd.', 'Covers Edexcel, CIE & AQA Boards', 'Includes Formula Fold-Out Poster']
  },
  {
    id: 'edu-fc-06',
    title: 'BarBri PixelPrep — Critical Pass MBE & MEE Bar Exam Law Cards',
    author: 'BarBri & CriticalPixel Legal Co.',
    category: 'educational',
    subcategory: 'flashcards',
    subcategoryLabel: 'Flashcards • Bar Exam (BarBri Pixel)',
    price: 54.00,
    rating: 4.9,
    pages: '1,500 Law Cards',
    badge: 'CRITICAL BAR DECK',
    coverColor: '#991b1b',
    accentColor: '#fde047',
    icon: '⚖️',
    description: 'From BarBri & CriticalPixel Legal Co.: Memorize every testable black-letter law element, majority/minority split, and hearsay exception for the Multistate Bar Exam.',
    highlights: ['Company: BarBri & CriticalPixel Legal Co.', 'Color-Coded by MBE Subject', 'Cross-Referenced with Landmark Cases']
  },
  {
    id: 'edu-fc-07',
    title: 'Kaplan RetroCards — USMLE, LSAT & GMAT Logic Mastery Bundle',
    author: 'Kaplan RetroCards Division',
    category: 'educational',
    subcategory: 'flashcards',
    subcategoryLabel: 'Flashcards • Multi-Exam (Kaplan)',
    price: 35.00,
    rating: 4.8,
    pages: '1,050 Cards',
    badge: 'KAPLAN BUNDLE',
    coverColor: '#86198f',
    accentColor: '#00f5d4',
    icon: '⚡',
    description: 'By Kaplan RetroCards Division: Formal logic games, critical reasoning flaw types, data sufficiency traps, and high-yield pharmacology/pathology rapid review.',
    highlights: ['Company: Kaplan RetroCards Division', 'Formal Logic Symbol Reference', 'Timed 60-Second Drill Prompts']
  },

  // =========================================================================
  // 9. PHILOSOPHY GENRE
  // =========================================================================
  {
    id: 'phil-01',
    title: 'Meditations on the Pixel Horizon (Annotated Marcus Aurelius)',
    author: 'Marcus Aurelius • Trans. Dr. Gregory Hays-Pixel',
    category: 'philosophy',
    subcategory: 'stoicism',
    subcategoryLabel: 'Philosophy • Stoicism',
    price: 19.99,
    rating: 5.0,
    pages: '280 Pages',
    badge: 'STOIC CLASSIC',
    coverColor: '#334155',
    accentColor: '#facc15',
    icon: '🏛️',
    description: 'The private journal of the Roman Emperor Marcus Aurelius, newly typeset in crisp retro typography with commentary on resilience, mindfulness, and inner citadel mastery.',
    highlights: ['Book-by-Book Commentary', 'Daily Stoic Reflection Prompts', 'Parallel Greek Key Terms']
  },
  {
    id: 'phil-02',
    title: 'Beyond Good, Evil & Binary: Existentialism in the Digital Age',
    author: 'Prof. Søren Vance & Simone De Laurent',
    category: 'philosophy',
    subcategory: 'existentialism',
    subcategoryLabel: 'Philosophy • Existentialism',
    price: 23.50,
    rating: 4.8,
    pages: '350 Pages',
    badge: 'MODERN THOUGHT',
    coverColor: '#3b0764',
    accentColor: '#00f5d4',
    icon: '🦉',
    description: 'An accessible journey through Kierkegaard, Nietzsche, Heidegger, Sartre, and Camus—exploring authenticity, freedom, absurdism, and meaning in a technological world.',
    highlights: ['Myth of Sisyphus Analysis', 'Ethics of Artificial Minds', 'Discussion Seminar Questions']
  },
  {
    id: 'phil-03',
    title: 'The Republic & The Cave of Shadows (Illustrated Plato)',
    author: 'Plato • Intro by Dr. Helena Sterling',
    category: 'philosophy',
    subcategory: 'epistemology',
    subcategoryLabel: 'Philosophy • Epistemology & Justice',
    price: 21.00,
    rating: 4.9,
    pages: '410 Pages',
    badge: 'FOUNDATIONAL',
    coverColor: '#1e3a8a',
    accentColor: '#fde047',
    icon: '🕯️',
    description: 'Plato’s Socratic dialogue on justice, the Theory of Forms, the Philosopher-King, and the Allegory of the Cave, complete with visual diagrams of the Divided Line.',
    highlights: ['Visual Allegory of the Cave', 'Socratic Method Breakdown', 'Study Guide for Philosophy 101']
  },
  {
    id: 'phil-04',
    title: 'Zen Mind, Pixel Mind: Taoism, Zen & Eastern Philosophy',
    author: 'Master Kenji Takahashi',
    category: 'philosophy',
    subcategory: 'eastern',
    subcategoryLabel: 'Philosophy • Eastern Wisdom',
    price: 18.99,
    rating: 4.9,
    pages: '240 Pages',
    badge: 'RETROZEN FAVORITE',
    coverColor: '#064e3b',
    accentColor: '#6ee7b7',
    icon: '🎋',
    description: 'Synthesizes the Tao Te Ching, Chuang Tzu, and Zen koans into practical philosophy for calm focus, wu-wei (effortless action), and creative flow.',
    highlights: ['40 Classic Zen Koans Explained', 'Wu-Wei for Students & Creators', 'Pairs Perfectly with Rain & Lo-Fi']
  },

  // =========================================================================
  // 10. FICTIONAL / NON-FICTIONAL STORY BOOKS
  // =========================================================================
  {
    id: 'story-01',
    title: 'Tales from the Midnight Tram: 24 Cozy Pixel Short Stories',
    author: 'Orhan & Clara Vance (Fictional Anthology)',
    category: 'storybooks',
    subcategory: 'fictional-stories',
    subcategoryLabel: 'Fictional Story Book • Anthology',
    price: 21.99,
    rating: 4.9,
    pages: '310 Pages',
    badge: 'COZY FICTION',
    coverColor: '#991b1b',
    accentColor: '#facc15',
    icon: '🚋',
    description: 'Twenty-four heartwarming fictional short stories set aboard late-night trams in Istanbul, rainy bookshops in London, and neon ramen stalls in Shibuya.',
    highlights: ['24 Standalone 15-Minute Reads', 'Illustrated Pixel Chapter Headers', 'Inspired by retroZen Worlds']
  },
  {
    id: 'story-02',
    title: 'Architects of the Enchanted Loom: Ada Lovelace & Alan Turing',
    author: 'Walter Sterling (Non-Fiction Biography)',
    category: 'storybooks',
    subcategory: 'non-fictional-stories',
    subcategoryLabel: 'Non-Fictional Story Book • Biography',
    price: 26.00,
    rating: 5.0,
    pages: '440 Pages',
    badge: 'TRUE BIOGRAPHY',
    coverColor: '#1e293b',
    accentColor: '#00f5d4',
    icon: '🕰️',
    description: 'The gripping true story of how poetical science in Victorian London and codebreaking at Bletchley Park gave birth to the modern universal computer.',
    highlights: ['Original Analytical Engine Notes', 'Bletchley Park Enigma Diagrams', 'Archival Letters & Diaries']
  },
  {
    id: 'story-03',
    title: 'Endurance in the Ice: True Stories of Polar & Deep-Sea Exploration',
    author: 'Capt. Henrik Lindqvist (Non-Fiction)',
    category: 'storybooks',
    subcategory: 'non-fictional-stories',
    subcategoryLabel: 'Non-Fictional Story Book • Expedition',
    price: 24.50,
    rating: 4.8,
    pages: '360 Pages',
    badge: 'TRUE ADVENTURE',
    coverColor: '#0c4a6e',
    accentColor: '#38bdf8',
    icon: '🧭',
    description: 'Thrilling, verified historical accounts of Shackleton’s Antarctic survival, the Trieste bathyscaphe dive to the Mariana Trench, and high-altitude mountaineering.',
    highlights: ['Expedition Route Maps', 'Crew Survival Logs', 'Leadership Under Pressure']
  },
  {
    id: 'story-04',
    title: 'Fables of the Clockwork Forest & Starlight Myths',
    author: 'Miriam Al-Kindi (Fictional Folklore)',
    category: 'storybooks',
    subcategory: 'fictional-stories',
    subcategoryLabel: 'Fictional Story Book • Fables',
    price: 19.50,
    rating: 4.9,
    pages: '275 Pages',
    badge: 'ILLUSTRATED TALES',
    coverColor: '#4c1d95',
    accentColor: '#fde047',
    icon: '🦊',
    description: 'A richly illustrated storybook weaving magical realism, Aesop-style philosophical fables, and celestial folktales for readers of all ages.',
    highlights: ['Full-Page Pixel Art Plates', 'Moral & Philosophical Reflections', 'Collector’s Hardcover Styling']
  },

  // =========================================================================
  // 11. NOVELS GENRE
  // =========================================================================
  {
    id: 'novel-01',
    title: 'Neon Rain Over Neo-Shibuya',
    author: 'Kaito Nakamura',
    category: 'novels',
    subcategory: 'sci-fi',
    subcategoryLabel: 'Novel • Cyberpunk Sci-Fi',
    price: 22.99,
    rating: 4.9,
    pages: '420 Pages',
    badge: 'CYBERPUNK HIT',
    coverColor: '#0f172a',
    accentColor: '#00f5d4',
    icon: '🌆',
    description: 'In 2088 Tokyo, a nocturnal vintage-car courier discovers a lost cassette tape containing the memories of the city’s first sentient AI librarian.',
    highlights: ['Winner of the Pixel Nebula Award', 'Atmospheric Synthwave Worldbuilding', 'Unforgettable Mystery Plot']
  },
  {
    id: 'novel-02',
    title: 'The Fog on Baker Street: A Victorian Clockwork Mystery',
    author: 'Eleanor Finch',
    category: 'novels',
    subcategory: 'mystery',
    subcategoryLabel: 'Novel • Mystery & Noir',
    price: 20.50,
    rating: 4.8,
    pages: '380 Pages',
    badge: 'WHODUNIT',
    coverColor: '#374151',
    accentColor: '#facc15',
    icon: '🕵️',
    description: 'When a priceless illuminated manuscript vanishes from a locked reading room in 1894 London during a torrential rainstorm, Detective Inspector Locke must decipher the cipher.',
    highlights: ['Interactive Reader Clues', 'Authentic Victorian London Atmosphere', 'Twist Ending']
  },
  {
    id: 'novel-03',
    title: 'Chronicles of the Astral Citadel',
    author: 'Lyra Thorne',
    category: 'novels',
    subcategory: 'fantasy',
    subcategoryLabel: 'Novel • High Fantasy',
    price: 25.00,
    rating: 4.9,
    pages: '590 Pages',
    badge: 'EPIC FANTASY',
    coverColor: '#581c87',
    accentColor: '#e879f9',
    icon: '⚔️',
    description: 'An apprentice cartographer at the Great Sky Library must unite four fractured kingdoms when the ancient star-maps begin to fade from parchment.',
    highlights: ['Includes World Map Foldout', 'Magic System Based on Geometry', 'Book 1 of the Citadel Trilogy']
  },
  {
    id: 'novel-04',
    title: 'The Glass Conservatory of Vienna',
    author: 'Clara VonBerg',
    category: 'novels',
    subcategory: 'historical',
    subcategoryLabel: 'Novel • Historical Fiction',
    price: 21.50,
    rating: 4.7,
    pages: '395 Pages',
    badge: 'BOOK CLUB PICK',
    coverColor: '#78350f',
    accentColor: '#fcd34d',
    icon: '🎻',
    description: 'Set in 1912 Vienna, a luthier’s daughter and a young botanist collaborate to preserve rare Alpine flora and sheet music amidst a changing Europe.',
    highlights: ['Rich Musical & Botanical Detail', 'Deeply Moving Character Arc', 'Historical Postscript Included']
  },

  // =========================================================================
  // 12. GAME GUIDE BOOKS (MINECRAFT, ROBLOX, RETRO ARCADE)
  // =========================================================================
  {
    id: 'game-01',
    title: 'Minecraft: The Redstone Engineering & Command Block Bible',
    author: 'BlockCraft Master Press',
    category: 'game-guides',
    subcategory: 'minecraft',
    subcategoryLabel: 'Game Guide • Minecraft',
    price: 27.99,
    rating: 5.0,
    pages: '450 Pages',
    badge: 'MINECRAFT PRO',
    coverColor: '#15803d',
    accentColor: '#facc15',
    icon: '⛏️',
    description: 'From basic logic gates (AND, XOR, T-Flip-Flops) and piston doors to fully automated sorting warehouses, flying machines, and 8-bit redstone ALU computers!',
    highlights: ['Layer-by-Layer Blueprint Grids', '100+ Redstone Contraptions', 'Java & Bedrock Parity Notes']
  },
  {
    id: 'game-02',
    title: 'Minecraft: Ultimate Survival Architecture & Biome Explorer Almanac',
    author: 'VoxelBuilders Collective',
    category: 'game-guides',
    subcategory: 'minecraft',
    subcategoryLabel: 'Game Guide • Minecraft',
    price: 24.99,
    rating: 4.9,
    pages: '380 Pages',
    badge: 'BUILDER EDITION',
    coverColor: '#166534',
    accentColor: '#4ade80',
    icon: '🧱',
    description: 'Step-by-step architectural blueprints for medieval castles, cyber-bases, Japanese pagodas, Nether hubs, potion brewing charts, and Ender Dragon speedrun tactics.',
    highlights: ['Block Palette Color Wheels', 'Enchanting & Villager Trading Matrix', 'Nether & End Dimension Maps']
  },
  {
    id: 'game-03',
    title: 'Roblox Studio: Complete Lua Scripting & Game Dev Masterclass',
    author: 'DevBlox Academy Press',
    category: 'game-guides',
    subcategory: 'roblox',
    subcategoryLabel: 'Game Guide • Roblox Lua',
    price: 31.99,
    rating: 5.0,
    pages: '510 Pages',
    badge: 'ROBLOX LUA DEV',
    coverColor: '#b91c1c',
    accentColor: '#facc15',
    icon: '🎮',
    description: 'Learn Luau programming from scratch! Build custom Obbies, Tycoons, RPG inventory systems, DataStores, RemoteEvents, raycasting weapons, and UI animations in Roblox Studio.',
    highlights: ['Copy-Ready Luau Script Modules', 'Client-Server Security (Anti-Exploit)', 'Monetization & GamePass Design']
  },
  {
    id: 'game-04',
    title: 'Roblox World-Building: Top 100 Experiences, Secrets & Design Guide',
    author: 'PixelBlox Guild',
    category: 'game-guides',
    subcategory: 'roblox',
    subcategoryLabel: 'Game Guide • Roblox Worlds',
    price: 22.50,
    rating: 4.8,
    pages: '320 Pages',
    badge: 'GAMER FAVORITE',
    coverColor: '#991b1b',
    accentColor: '#38bdf8',
    icon: '🚀',
    description: 'Explore level design secrets, custom avatar item creation (UGC), lighting & atmosphere tuning, and walkthroughs for the most iconic genres on Roblox.',
    highlights: ['3D Blender-to-Roblox UGC Guide', 'Terrain & Lighting Recipes', 'Multiplayer Balancing Tips']
  },
  {
    id: 'game-05',
    title: '16-Bit Arcade & Cozy Valley Almanac: Stardew, Terraria & Retro RPGs',
    author: 'RetroZen Gaming Press',
    category: 'game-guides',
    subcategory: 'retro-arcade',
    subcategoryLabel: 'Game Guide • Pixel Classics',
    price: 26.50,
    rating: 4.9,
    pages: '410 Pages',
    badge: 'PIXEL COMPENDIUM',
    coverColor: '#4338ca',
    accentColor: '#00f5d4',
    icon: '🕹️',
    description: 'The ultimate desk companion for pixel RPG & cozy sim fans: seasonal crop profit tables, boss crafting trees, secret warp zones, and speedrun frame data.',
    highlights: ['Seasonal Artisan Profit Charts', 'Boss Arena Wiring Diagrams', 'Retro Sprite Art Tribute Gallery']
  },

  // =========================================================================
  // 13. ACADEMIC REFERENCE, LANGUAGES & STUDY SKILLS (EDUCATIONAL REQUIREMENT)
  // =========================================================================
  {
    id: 'ref-01',
    title: 'The Grand Pixel Encyclopedia of World Geography & Historical Atlas',
    author: 'Royal Cartographic & Pixel Institute',
    category: 'reference',
    subcategory: 'encyclopedia',
    subcategoryLabel: 'Reference • World Atlas & Encyclopedia',
    price: 45.00,
    rating: 4.9,
    pages: '600 Pages',
    badge: 'LIBRARY REFERENCE',
    coverColor: '#0f766e',
    accentColor: '#facc15',
    icon: '🌍',
    description: 'Every nation, mountain range, ocean trench, climate zone, and demographic profile presented with high-resolution pixel relief maps and geopolitical timelines.',
    highlights: ['195 Country Data Profiles', 'Tectonic & Climate Maps', 'Essential Library Reference Desk Volume']
  },
  {
    id: 'ref-02',
    title: 'The Polyglot’s Pixel Handbook: Japanese, Spanish, French & Latin',
    author: 'Dr. Kenjiro Sato & Elena Moretti',
    category: 'reference',
    subcategory: 'languages',
    subcategoryLabel: 'Reference • Languages & Linguistics',
    price: 33.50,
    rating: 4.9,
    pages: '480 Pages',
    badge: 'LANGUAGE LAB',
    coverColor: '#be123c',
    accentColor: '#fde047',
    icon: '🗣️',
    description: 'Master Kanji radicals, Romance language verb conjugations, Latin etymology for science/law, and the International Phonetic Alphabet (IPA) with visual memory hooks.',
    highlights: ['500 Essential Kanji & Vocab Grids', 'Latin/Greek Roots for SAT/GRE/MCAT', 'Conversational Travel Phrases']
  },
  {
    id: 'ref-03',
    title: 'The Memory Palace & Deep Work Protocol: Cognitive Science for Students',
    author: 'Dr. Cal & Barbara Oakley-Pixel',
    category: 'reference',
    subcategory: 'study-skills',
    subcategoryLabel: 'Reference • Psychology & Study Mastery',
    price: 24.00,
    rating: 5.0,
    pages: '330 Pages',
    badge: 'STUDY ESSENTIAL',
    coverColor: '#1e3a8a',
    accentColor: '#00f5d4',
    icon: '🧠',
    description: 'Evidence-based cognitive psychology for acing exams: Pomodoro rhythms, Feynman technique, Method of Loci (Memory Palaces), active recall, and overcoming procrastination.',
    highlights: ['Step-by-Step Memory Palace Builder', 'Cornell Note-Taking Templates', 'Exam Anxiety Reset Protocols']
  },
  {
    id: 'ref-04',
    title: 'Pixel Art Mastery, Color Theory & Retro UI Design Systems',
    author: 'Studio RetroZen Press',
    category: 'reference',
    subcategory: 'art-design',
    subcategoryLabel: 'Reference • Art & Design',
    price: 34.50,
    rating: 4.9,
    pages: '390 Pages',
    badge: 'ART & DESIGN',
    coverColor: '#6b21a8',
    accentColor: '#22d3ee',
    icon: '🎨',
    description: 'Learn sub-pixel animation, isometric perspective, dithering patterns, limited color palettes, CRT shader design, and retro game UI typography.',
    highlights: ['64 Curated Retro Palettes', 'Isometric Tile Tutorials', 'Sprite Animation Frame Breakdowns']
  }
];
