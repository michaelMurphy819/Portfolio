import { Project } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'simple-surveys-ios',
    slug: 'simple-surveys-ios',
    supabase_id: '37700e4a-c50d-4c2d-a769-c63941b9f516',
    title: 'Simple Surveys — iOS',
    tagline: 'Research-grade Experience Sampling Method (ESM) iOS application with HealthKit & BLE Beacons',
    category: 'ios',
    status: 'App Store Ready',
    featured: true,
    problem: 'University psychological and behavioral research studies frequently rely on retrospective self-reporting questionnaires administered days or weeks after events occur. This introduces significant recall bias and fails to capture momentary physiological context (such as heart rate spikes, environmental changes, and physical exertion) during real-world stressors, while commercial survey tools fail strict Institutional Review Board (IRB) privacy mandates.',
    solution: 'Engineered a native iOS application built with Swift and SwiftUI that implements the Experience Sampling Method (ESM) to prompt participants in situ. The system enforces strict anonymity (zero persistent hardware tracking, names, or phone numbers), gathers granular opt-in HealthKit biometrics (steps, distance, heart rate), scans indoor BLE beacons for micro-location proximity, and caches survey submissions in an offline-resilient local disk queue.',
    description: 'Designed for deployment to the Apple App Store under strict academic research guidelines. The app features a modular MVVM architecture, dynamic polymorphic survey engines that adapt to study schedules (morning, momentary ESM, evening), and granular participant permission controls allowing selective sharing of HealthKit, CoreBluetooth, and CoreLocation telemetry.',
    highlights: [
      'IRB-compliant participant anonymity: zero phone numbers, names, or hardware IDs; uses anonymous persistent UUIDs and cohort codes (e.g., P-001 through P-030)',
      'Granular HealthKit permission architecture allowing participants to selectively share step counts, walking distance, active calories, and heart rate',
      'CoreBluetooth background BLE beacon scanning for precise indoor proximity detection without GPS battery exhaustion',
      'Offline-first disk buffering queue ensuring survey responses are saved locally and synced automatically when network returns',
      'Dynamic polymorphic survey engine rendering 5 distinct input paradigms: 1-7 Likert rating scales, single-choice, multiple-choice, numeric, and open text with live counters',
      'Native AVFoundation camera controller with automated client-side downscaling and compression for contextual surroundings photography'
    ],
    tech_stack: ['Swift', 'SwiftUI', 'HealthKit', 'CoreBluetooth', 'CoreLocation', 'Combine', 'MVVM', 'AVFoundation'],
    github_url: 'https://github.com/michaelMurphy819/Simple-Surveys-iOS',
    sort_order: 1,
    created_at: '2026-10-17T21:21:19Z',
    stats: [
      { label: 'Target Platform', value: 'iOS 17+' },
      { label: 'Architecture', value: 'Clean MVVM' },
      { label: 'Hardware APIs', value: 'HealthKit + BLE' },
      { label: 'Offline Mode', value: 'Disk Queue' }
    ],
    architecture: 'SwiftUI Views ➔ @Observable ViewModels ➔ Hardware Services (HealthKit, CoreBluetooth, CoreLocation) ➔ Offline Response Queue ➔ Async/Await URLSession API Client'
  },
  {
    id: 'ordss-writing-challenge',
    slug: 'ordss-writing-challenge',
    supabase_id: '39e03137-7d0b-4fb8-a94f-28150969ef0d',
    title: 'ORDSS Writing Challenge',
    tagline: 'Production writing productivity & institutional analytics platform for Villanova University',
    category: 'fullstack',
    status: 'Production',
    featured: true,
    problem: "Villanova University's Office of Research Development & Scholarship Support (ORDSS) needed an engaging, dependable web platform to track, gamify, and report faculty and student academic writing progress across multi-week scholarship writing challenges. Previous manual spreadsheet tracking was prone to data entry delays, missed streaks, and cumbersome institutional reporting.",
    solution: 'Developed a responsive full-stack web application featuring Firebase authentication, real-time database synchronization, optimistic mutations with TanStack Query v5, and an automated institutional reporting engine capable of generating both styled executive PDF summaries (jsPDF) and tabular Excel spreadsheets (XLSX).',
    description: 'Serving active academic cohorts across Villanova University, the platform provides scholars with interactive calendar heatmaps, milestone tracking, and daily writing streak celebrations while giving university research administrators instantaneous exportable reporting on total scholarly output.',
    highlights: [
      'Engineered and deployed for active university researchers and faculty at Villanova University ORDSS',
      'Real-time streak calculation, calendar milestone heatmap, and progress goal trackers driving participant consistency',
      'Client-side automated reporting engine producing custom-styled executive PDF summaries (jsPDF) and raw Excel (.xlsx) exports',
      'Optimistic mutations and instant cache invalidation utilizing TanStack React Query v5 for seamless zero-latency UI updates',
      'Responsive, accessible design engineered with React 19 and the next-generation Tailwind CSS v4 compiler'
    ],
    tech_stack: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS v4', 'Firebase', 'TanStack Query', 'jsPDF', 'XLSX'],
    github_url: 'https://github.com/michaelMurphy819/ORDSS-Writing-Challenge',
    live_url: 'https://ordss-writing-challenge.vercel.app/',
    sort_order: 2,
    created_at: '2026-05-09T19:07:45Z',
    stats: [
      { label: 'Institution', value: 'Villanova University' },
      { label: 'Frontend', value: 'React 19 + Vite' },
      { label: 'Data Sync', value: 'TanStack Query v5' },
      { label: 'Export Engine', value: 'PDF & XLSX' }
    ],
    architecture: 'React 19 UI ➔ TanStack Query v5 Cache ➔ Firebase Auth & Firestore ➔ jsPDF & SheetJS Export Pipelines'
  },
  {
    id: 'pet-loyalty-dashboard',
    slug: 'pet-loyalty-dashboard',
    supabase_id: '5befb6b4-ad7b-4a5f-9121-62541d85f8aa',
    title: 'Pet Loyalty Dashboard',
    tagline: 'High-performance veterinary analytics & customer retention intelligence platform',
    category: 'fullstack',
    status: 'Production',
    featured: true,
    problem: 'Veterinary practices and regional pet care networks struggle to identify customer churn patterns, evaluate loyalty reward redemption rates, and visualize geographical distribution of active clients across multi-clinic regions.',
    solution: 'Constructed an enterprise-grade analytics dashboard that translates transactional pet care data into interactive visual insights. Combines Drizzle ORM and PostgreSQL for low-latency relational queries, Recharts for dynamic cohort analysis, and React Simple Maps with D3 scales for interactive geographical client density mapping.',
    description: 'Built with Next.js 16 and React 19, the platform delivers instant executive insights including customer lifetime value (LTV), visit cadence, and breed-specific service trends with full internationalization (next-intl) and client-side report screenshot export.',
    highlights: [
      'Interactive geographical mapping powered by React Simple Maps and D3-scale for clinic client distribution analysis',
      'Type-safe data modeling and schema migrations engineered with Drizzle ORM and PostgreSQL',
      'Rich interactive charts (retention curves, spending velocity, visit frequency) built with Recharts and customized Apple-style tooltips',
      'Client-side vector and canvas rendering enabling one-click PNG/PDF executive report generation via html-to-image',
      'Internationalization architecture supporting multi-locale veterinary networks using next-intl'
    ],
    tech_stack: ['Next.js 16', 'React 19', 'TypeScript', 'Drizzle ORM', 'PostgreSQL', 'Recharts', 'D3.js', 'React Simple Maps'],
    github_url: 'https://github.com/michaelMurphy819/pet-loyalty-dashboard',
    live_url: 'https://pet-loyalty-dashboard.vercel.app',
    sort_order: 3,
    created_at: '2026-08-04T11:55:56Z',
    stats: [
      { label: 'Framework', value: 'Next.js 16' },
      { label: 'ORM', value: 'Drizzle + Postgres' },
      { label: 'Visualization', value: 'D3 + Recharts' },
      { label: 'Mapping', value: 'GeoJSON Vector' }
    ],
    architecture: 'Next.js 16 App Router ➔ Drizzle ORM ➔ PostgreSQL ➔ Recharts & D3-Scale Geographic Engine'
  },
  {
    id: 'easy-eats-v2',
    slug: 'easy-eats-v2',
    supabase_id: 'b444a2be-d1c8-40a8-8486-3e4cfadd81c4',
    title: 'Easy Eats V2',
    tagline: 'Recipe discovery platform with dynamic scaling & real-time USDA nutritional calculation',
    category: 'fullstack',
    status: 'Production',
    featured: true,
    problem: 'Home cooks and health-conscious athletes frequently find recipes online that do not match their desired serving sizes or dietary targets. Manually calculating adjusted ingredient measurements and recomputing macronutrients (protein, carbs, fat, fiber) is tedious and error-prone.',
    solution: 'Engineered Easy Eats V2, a modern web app featuring an intelligent recipe scaling engine. When users adjust serving sizes, the system automatically recalculates ingredient proportions and queries the USDA FoodData Central database to provide precise, updated macro and micronutrient breakdowns in real time.',
    description: 'Engineered with Next.js 16, Supabase, and Tailwind CSS. The app features responsive community interactions, bookmarks, customizable culinary skill tags, and tactile micro-interactions powered by Framer Motion.',
    highlights: [
      'Dynamic algorithmic recipe scaling with real-time recalculation of macro and micronutrient profiles via USDA FoodData API',
      'Community interaction layer featuring recipe bookmarking, custom culinary tagging, and difficulty filtering',
      'Fluid page transitions, animated drawer sheets, and interactive sliders powered by Framer Motion',
      'Mobile-first responsive architecture designed for seamless touch interactions in kitchen environments'
    ],
    tech_stack: ['Next.js 16', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Framer Motion', 'USDA FoodData API'],
    github_url: 'https://github.com/michaelMurphy819/Easy-Eats-V2',
    live_url: 'https://easy-eats-v2.vercel.app',
    sort_order: 4,
    created_at: '2026-04-07T01:29:03Z',
    stats: [
      { label: 'Framework', value: 'Next.js 16 + React 19' },
      { label: 'Nutritional DB', value: 'USDA Central API' },
      { label: 'Animation', value: 'Framer Motion' },
      { label: 'Scaling Engine', value: 'Live Algorithmic' }
    ],
    architecture: 'Next.js 16 App Router ➔ Server Components ➔ USDA FoodData Central API ➔ Client State Scaling Calculator'
  },
  {
    id: 'systems-arcade',
    slug: 'systems-arcade',
    supabase_id: '024d9601-dd3e-4f6c-b2c8-b4cfc1054cec',
    title: 'Systems Arcade Engine',
    tagline: 'Retro gaming portal celebrating core computer systems & networking simulations',
    category: 'systems',
    status: 'Live Portal',
    featured: false,
    problem: 'Concepts in low-level systems programming—such as hard disk sector fragmentation, TCP/IP packet handshakes, congestion control, and routing—are often taught purely theoretically, making them difficult for junior students to visualize intuitively.',
    solution: 'Created an interactive web arcade featuring custom-coded simulations transformed into retro arcade games. Includes Defrag (disk fragmentation puzzle), Protocol (TCP handshake timing game), and PacketTrace (network routing simulation), alongside custom canvas implementations of Tetris and Snake with AI autopilot.',
    description: 'Built with pure JavaScript, React, and HTML5 Canvas, the project prioritizes raw rendering efficiency and low-latency input handling without bloated third-party game frameworks.',
    highlights: [
      'Custom game loop architecture running at locked 60 FPS utilizing requestAnimationFrame and delta-time compensation',
      'Unique educational games: "Defrag" (file system clusters), "Protocol" (TCP ACK/SYN sequences), and "PacketTrace" (firewall routing)',
      'Lightweight zero-dependency canvas rendering engine with keyboard event buffers and tactile sound effects',
      'Modular game state architecture allowing easy addition of new low-level systems simulations'
    ],
    tech_stack: ['JavaScript', 'React', 'HTML5 Canvas', 'Vite', 'CSS3', 'Game Loops'],
    github_url: 'https://github.com/michaelMurphy819/Arcade',
    live_url: 'https://arcade-blush.vercel.app',
    sort_order: 5,
    created_at: '2026-03-25T14:42:25Z',
    stats: [
      { label: 'Rendering', value: 'HTML5 Canvas' },
      { label: 'Framerate', value: '60 FPS Locked' },
      { label: 'Simulations', value: '5 Custom Games' },
      { label: 'Overhead', value: 'Zero Heavy Engine' }
    ],
    architecture: 'HTML5 Canvas ➔ Delta-Time Game Loops ➔ State Machine Controller ➔ Event Dispatcher'
  },
  {
    id: 'serverless-cold-start-research',
    slug: 'serverless-cold-start-research',
    supabase_id: '0b428236-ec08-412f-b4ec-7c879d67df3c',
    title: 'The Cold Start Problem in Serverless Computing',
    tagline: '7-page systems research paper analyzing virtualization overhead, AWS Firecracker microVMs, and memory mapping bottlenecks',
    category: 'systems',
    status: 'Systems Paper',
    featured: true,
    problem: 'In Function-as-a-Service (FaaS) serverless architectures, scale-to-zero economics cause "cold start" latency penalties (hundreds of ms to seconds) during on-demand instance provisioning. Furthermore, AWS\'s August 2025 shift to billing for execution INIT phases turned startup delay into a direct operational financial liability.',
    solution: 'Authored a 7-page technical systems paper breaking down the low-level anatomy of cold starts: control plane bin-packing and ENI networking, virtualization overhead comparisons between legacy VMs and AWS Firecracker microVMs using KVM ioctl() and minimal VirtIO devices, language runtime initialization (JVM vs interpreted), and the SlimStart "80% rule" memory-mapping I/O bottleneck.',
    description: 'Researched and authored for Computer Systems at Villanova University. The study dissects how Linux kernel virtualization, dynamic ELF library loading, and memory page faults drive initialization latency, comparing mitigation strategies like CRIU snapshotting (AWS SnapStart) against future paradigms like Unikernels and OS-level tree-shaking.',
    highlights: [
      'Comprehensive systems-level breakdown of AWS Firecracker microVMs stripping legacy BIOS and PCI probing, utilizing minimal VirtIO (net, block, serial, keyboard) to reach a ready state in ~125ms',
      'Analyzed Linux memory management and dynamic linker I/O bottlenecks where up to 80% of initialization latency is spent resolving and paging shared library address spaces (SlimStart 80% rule)',
      'Evaluated managed runtime trade-offs: interpreted runtimes (Python/Node.js, 10s of ms) vs JVM JIT compilation spikes and Tiered Compilation tuning (TieredStopAtLevel=1)',
      'Investigated checkpoint/restore mechanisms (CRIU / AWS SnapStart cutting latency by up to 90%), addressing entropy/randomness reseeding and database socket reconnection challenges',
      'Proposed architectural roadmaps for serverless systems including Unikernels to bypass kernel/user-space context switching and predictive machine learning pre-warming'
    ],
    tech_stack: ['C', 'Linux Kernel', 'AWS Firecracker', 'KVM', 'VirtIO', 'CRIU', 'FaaS', 'Systems Architecture'],
    github_url: 'https://github.com/michaelMurphy819/Portfolio',
    live_url: '/research#systems-paper',
    sort_order: 6,
    created_at: '2026-04-18T00:00:00Z',
    stats: [
      { label: 'Publication Scope', value: '7 Pages' },
      { label: 'microVM Boot', value: '~125ms (Firecracker)' },
      { label: 'Library I/O Rule', value: '80% Startup Time' },
      { label: 'Academic Scope', value: 'Villanova Systems' }
    ],
    architecture: 'Control Plane Bin-Packing ➔ S3 Zip Fetch ➔ KVM/Firecracker microVM Boot (~125ms) ➔ Dynamic Linker ELF Paging ➔ CRIU Snapshot Restore'
  },
  {
    id: 'pdf-to-audio',
    slug: 'pdf-to-audio',
    supabase_id: '568d0c19-3965-4952-8e0d-84aeeac98a6e',
    title: 'PDF-to-Audio Pipeline',
    tagline: 'Intelligent document-to-speech converter & neural audiobook synthesis pipeline',
    category: 'ai',
    status: 'Open Source',
    featured: false,
    problem: 'Students and researchers with heavy reading lists frequently face severe screen fatigue when reading multi-column academic papers, text-heavy PDFs, or digital textbooks on screens.',
    solution: 'Engineered an automated Python pipeline that cleans and parses PDF documents, strips unreadable formatting artifacts (headers, footers, page numbers, bibliography citations), and synthesizes clear, natural-sounding audio streams using neural text-to-speech engines with user-configurable voice speed, pitch, and chapter markers.',
    description: 'Features both an interactive Streamlit graphical interface for everyday listening and a command-line script for batch background conversion of university papers.',
    highlights: [
      'Intelligent text cleansing pipeline stripping running headers, footers, and citation markers to prevent TTS interruptions',
      'Dual-engine speech synthesis supporting both offline local TTS (pyttsx3) and neural cloud synthesis (gTTS)',
      'Interactive Streamlit web dashboard with live audio waveform preview, chapter selection, and one-click MP3 download',
      'Modular CLI script for headless batch conversion of entire folders of academic papers'
    ],
    tech_stack: ['Python', 'Streamlit', 'gTTS', 'pyttsx3', 'PyPDF2', 'pdfplumber', 'NLP'],
    github_url: 'https://github.com/michaelMurphy819/PDF-to-Audio',
    sort_order: 7,
    created_at: '2026-03-24T18:30:52Z',
    stats: [
      { label: 'Language', value: 'Python 3' },
      { label: 'Interface', value: 'Streamlit + CLI' },
      { label: 'Speech Model', value: 'Neural TTS' },
      { label: 'Parsing', value: 'pdfplumber + PyPDF2' }
    ],
    architecture: 'PDF Document Ingest ➔ Header/Footer Cleansing ➔ Sentence Tokenizer ➔ Speech Engine ➔ Audio Export'
  },
  {
    id: 'nvidia-stock-ml-research',
    slug: 'nvidia-stock-ml-research',
    supabase_id: '79a9fe16-4078-4d0d-8f6f-05db92d2bf6f',
    title: 'NVIDIA Stock Price ML Benchmark',
    tagline: '17-page comparative research paper evaluating 6 ML algorithms on NVIDIA daily price directions',
    category: 'ai',
    status: 'Published Paper',
    featured: true,
    problem: 'Retail algorithmic traders frequently claim that technical indicators can reliably forecast stock price directions. However, empirical academic benchmarks testing whether machine learning classifiers can consistently extract profitable alpha from technical indicators under the Efficient Market Hypothesis (EMH) are often inconclusive or methodologically flawed.',
    solution: 'Authored a comprehensive 17-page empirical research paper: "Measuring the Accuracy of Various Machine Learning Algorithms in Determining the Price of NVIDIA\'s Stock". Conducted comparative benchmarking of 6 distinct machine learning classifiers across multi-year OHLCV trading data, evaluating models with strict time-series splits, F1-scores, and ROC-AUC metrics.',
    description: 'Conducted across Villanova University, IES Abroad, and Universidad Complutense de Madrid. The study engineered over 20 quantitative technical features and rigorously evaluated algorithmic performance against market baseline distributions.',
    highlights: [
      'Researched and authored across Villanova University, IES Abroad, and Universidad Complutense de Madrid (17 pages)',
      'Engineered 20+ quantitative technical indicators: RSI, MACD, Bollinger Bands, Stochastic Oscillators, Average True Range (ATR), and moving averages',
      'Rigorous cross-comparison of 6 algorithms: Random Forest, Logistic Regression, SVM, KNN, Naive Bayes, and Decision Trees',
      'Top performer: Random Forest with 53.7% accuracy and 0.527 ROC-AUC; proven adherence to Eugene Fama\'s semi-strong Efficient Market Hypothesis'
    ],
    tech_stack: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Random Forest', 'SVM', 'LaTeX'],
    github_url: 'https://github.com/michaelMurphy819/Portfolio',
    live_url: '/research#ml-paper',
    sort_order: 8,
    created_at: '2025-11-15T00:00:00Z',
    stats: [
      { label: 'Publication Scope', value: '17 Pages' },
      { label: 'Top Accuracy', value: '53.7% (Random Forest)' },
      { label: 'Best F1-Score', value: '0.583 (LogReg)' },
      { label: 'Academic Scope', value: 'Villanova & UCM Madrid' }
    ],
    architecture: 'Historical OHLCV Data ➔ Feature Engineering (20+ Indicators) ➔ 6 Classifiers ➔ ROC-AUC / F1 Statistical Evaluation'
  }
];
