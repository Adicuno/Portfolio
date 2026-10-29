import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  ArrowUpRight,
  Sparkles,
  Code2,
  Database,
  Cpu,
  Terminal,
  Layers,
  Award,
  Mail,
  Phone,
  Copy,
  Check,
  Palette,
  Type,
  X,
  ExternalLink,
  ChevronRight,
  Sliders,
  Zap,
  BarChart3,
  Upload,
  Camera,
  RotateCcw,
} from "lucide-react";

// ==========================================
// CUSTOM INLINE SVG BRAND ICONS
// (Prevents lucide-react v0.470+ SyntaxError)
// ==========================================
const Github = ({ size = 18, className = "", style = {} }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = ({ size = 18, className = "", style = {} }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// ==========================================
// THEME & TYPOGRAPHY PRESETS (BEHANCE 2026)
// ==========================================
const THEME_PRESETS = {
  scrapbook: {
    id: "scrapbook",
    name: "Scrapbook Graph & Vermilion",
    tag: "Kevin Luna Cutout Spread (Default)",
    bg: "#E8E4D9",
    surface: "#DFDBD0",
    surfaceHover: "#D5D0C3",
    text: "#161615",
    muted: "#57554F",
    accent: "#E63B1F",
    accentSecondary: "#1B5E3A",
    accentText: "#FFFFFF",
    border: "#C6C1B4",
    badgeBg: "rgba(230, 59, 31, 0.12)",
  },
  obsidian: {
    id: "obsidian",
    name: "Obsidian & Acid Lime",
    tag: "Behance Dark Editorial",
    bg: "#0A0A0C",
    surface: "#131317",
    surfaceHover: "#1B1B22",
    text: "#F4F4F6",
    muted: "#8E8E9E",
    accent: "#D2FF28",
    accentSecondary: "#34D399",
    accentText: "#09090B",
    border: "#26262F",
    badgeBg: "rgba(210, 255, 40, 0.12)",
  },
  swiss: {
    id: "swiss",
    name: "Swiss Paper & Vermilion",
    tag: "Brutalist Print Grid",
    bg: "#F4F1EA",
    surface: "#EAE5DB",
    surfaceHover: "#E1DBD0",
    text: "#141413",
    muted: "#63615B",
    accent: "#FF3B1D",
    accentSecondary: "#1B5E3A",
    accentText: "#FFFFFF",
    border: "#D0C9BC",
    badgeBg: "rgba(255, 59, 29, 0.1)",
  },
  cobalt: {
    id: "cobalt",
    name: "Electric Cobalt & Cream",
    tag: "2026 Neo-Bauhaus",
    bg: "#081326",
    surface: "#0F203C",
    surfaceHover: "#162C50",
    text: "#F7F4EB",
    muted: "#94A7C6",
    accent: "#38BDF8",
    accentSecondary: "#34D399",
    accentText: "#06101E",
    border: "#1E3863",
    badgeBg: "rgba(56, 189, 248, 0.14)",
  },
};

const FONT_PAIRINGS = {
  scrapbookType: {
    id: "scrapbookType",
    name: "Outfit + Plus Jakarta Sans",
    style: "Scrapbook Editorial Grotesk",
    heading: "'Outfit', sans-serif",
    body: "'Plus Jakarta Sans', sans-serif",
    mono: "'JetBrains Mono', monospace",
    hand: "'Caveat', cursive",
  },
  syne: {
    id: "syne",
    name: "Syne + Space Grotesk",
    style: "Avant-Garde Display",
    heading: "'Syne', sans-serif",
    body: "'Space Grotesk', sans-serif",
    mono: "'JetBrains Mono', monospace",
    hand: "'Caveat', cursive",
  },
  editorial: {
    id: "editorial",
    name: "Instrument Serif + Plus Jakarta",
    style: "High-Fashion Editorial",
    heading: "'Instrument Serif', serif",
    body: "'Plus Jakarta Sans', sans-serif",
    mono: "'JetBrains Mono', monospace",
    hand: "'Caveat', cursive",
  },
};

// ==========================================
// SCRAPBOOK BIO BILINGUAL COPY (ENG / HIN)
// ==========================================
const SCRAPBOOK_CONTENT = {
  ENG: {
    greetingPrefix: "Hello! I'm ",
    firstNameHighlight: "Adi",
    restOfName: "tya Singh",
    stamp1: "INDIA",
    stamp2: "MCA '26",
    hechoStamp: "BUILT BY ADITYA",
    expHeading: "Experience",
    eduHeading: "Education",
    focusHeading: "Focus",
    toolsHeading: "Tools & Stack",
    focusItems: [
      "Full-Stack Engineering",
      "Data Science & ML",
      "Java & Spring Backend",
      "Power BI & Analytics",
    ],
  },
  HIN: {
    greetingPrefix: "Namaste! Main ",
    firstNameHighlight: "Adi",
    restOfName: "tya Singh",
    stamp1: "BHARAT",
    stamp2: "MCA '26",
    hechoStamp: "ADITYA DWARA NIRMIT",
    expHeading: "Anubhav (Exp)",
    eduHeading: "Shiksha",
    focusHeading: "Visheshagyata",
    toolsHeading: "Takneek & Tools",
    focusItems: [
      "Full-Stack Development",
      "Data Science & AI",
      "Java Backend Systems",
      "Power BI Analytics",
    ],
  },
};

const TOOL_BADGES = [
  {
    code: "Jv",
    name: "Java & Multithreading",
    bg: "#2C140F",
    text: "#FF7C5C",
    border: "#E63B1F",
  },
  {
    code: "Py",
    name: "Python Data Science",
    bg: "#102338",
    text: "#4B9EFF",
    border: "#2670E8",
  },
  {
    code: "Sb",
    name: "Spring Boot & MVC",
    bg: "#0E291B",
    text: "#4ADE80",
    border: "#16A34A",
  },
  {
    code: "Nx",
    name: "Next.js & React",
    bg: "#141418",
    text: "#38BDF8",
    border: "#0284C7",
  },
  {
    code: "Pb",
    name: "Power BI & DAX",
    bg: "#2B2108",
    text: "#FACC15",
    border: "#CA8A04",
  },
  {
    code: "Sq",
    name: "SQL & Supabase",
    bg: "#0A2722",
    text: "#2DD4BF",
    border: "#0D9488",
  },
  {
    code: "Ml",
    name: "Scikit-Learn & OpenCV",
    bg: "#271232",
    text: "#E879F9",
    border: "#A21CAF",
  },
  {
    code: "Gm",
    name: "Google Gemini API",
    bg: "#171636",
    text: "#818CF8",
    border: "#4F46E5",
  },
];

// ==========================================
// PORTFOLIO DATA FOR ADITYA SINGH
// ==========================================
const PROJECTS = [
  {
    id: "01",
    title: "Bharat Catalog Engine",
    subtitle: "AI Voice & Text Inventory Platform for Kirana Stores",
    category: "Full-Stack & AI",
    year: "2026",
    featured: true,
    badge: "AI + Full-Stack Flagship",
    summary:
      "Next-generation inventory & cataloging web application empowering local Kirana store owners to digitize, update, and query stock seamlessly using natural multilingual voice and text commands.",
    tech: [
      "Next.js",
      "React",
      "Supabase",
      "Google Gemini API",
      "Tailwind CSS",
      "Web Speech API",
    ],
    metrics: [
      { label: "Input Modality", value: "Voice + Text NLP" },
      { label: "Backend Engine", value: "Supabase Realtime" },
      { label: "LLM Pipeline", value: "Gemini Structured JSON" },
    ],
    architecture: [
      "Captures natural voice/text input from Kirana merchants and streams prompts to Google Gemini API for structured entity extraction (item name, unit, quantity, price).",
      "Synchronizes catalog mutations in real time via Supabase PostgreSQL with Row-Level Security and instant optimistic UI updates in Next.js.",
      "Designed with high-contrast accessible typography and zero-friction workflows for rapid billing and stock replenishment.",
    ],
    codeSnippet: `// Gemini API Structured Inventory Parser
const response = await gemini.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: merchantVoiceTranscript,
  config: {
    responseMimeType: 'application/json',
    systemInstruction: 'Extract SKU, quantity, unit & price changes for Kirana inventory.'
  }
});`,
  },
  {
    id: "02",
    title: "Enterprise Point-of-Sale (POS) System",
    subtitle: "Full-Stack Retail Billing & Inventory Management Suite",
    category: "Java Engineering",
    year: "2025",
    featured: true,
    badge: "Enterprise Java Architecture",
    summary:
      "Production-grade retail POS application engineered with Java, Spring Boot, and Spring MVC to handle high-volume checkout workflows, real-time SKU tracking, tax computation, and audit reporting.",
    tech: [
      "Java",
      "Spring Boot",
      "Spring MVC",
      "SQL / JDBC",
      "REST APIs",
      "Maven",
    ],
    metrics: [
      { label: "Architecture", value: "Layered MVC + REST" },
      { label: "Transactions", value: "ACID Compliant SQL" },
      { label: "Core Modules", value: "Billing, Stock & Analytics" },
    ],
    architecture: [
      "Built on a clean Controller-Service-Repository architecture in Spring Boot ensuring modular maintainability and strict transactional integrity.",
      "Automates invoice generation, low-stock threshold alerts, barcode/SKU lookup, and daily revenue aggregation.",
      "Implements role-based access control for cashiers and store managers alongside comprehensive SQL reporting queries.",
    ],
    codeSnippet: `@Transactional
public InvoiceDTO processCheckout(CartRequest request) {
    List<InventoryItem> items = inventoryService.validateAndLockStock(request.getItems());
    Invoice invoice = billingEngine.calculateTotalsAndTaxes(items, request.getDiscountCode());
    inventoryService.deductStockBatch(items);
    return invoiceRepository.save(invoice).toDTO();
}`,
  },
  {
    id: "03",
    title: "Multithreaded Song Downloader",
    subtitle: "High-Concurrency Parallel Media Ingestion Engine",
    category: "Java Engineering",
    year: "2025",
    featured: false,
    badge: "Concurrency & Systems",
    summary:
      "High-throughput media downloader built with Java and Spring MVC utilizing custom thread pools and asynchronous workers to accelerate simultaneous audio stream fetching and chunk assembly.",
    tech: [
      "Java",
      "Multithreading",
      "Spring MVC",
      "ExecutorService",
      "Java NIO",
      "Concurrency",
    ],
    metrics: [
      { label: "Execution Model", value: "Fixed & Cached Thread Pools" },
      { label: "I/O Pipeline", value: "Non-Blocking Buffered Streams" },
      { label: "Throughput Gain", value: "4.2x vs Single-Thread" },
    ],
    architecture: [
      "Leverages Java ExecutorService and Callable/Future abstractions to partition and download multiple media streams concurrently without blocking the main servlet thread.",
      "Includes thread-safe progress tracking, automatic retry backoff on network drops, and checksum validation.",
      "Exposes a clean Spring MVC dashboard to queue URLs, monitor worker thread states, and inspect download bandwidth.",
    ],
    codeSnippet: `ExecutorService pool = Executors.newFixedThreadPool(Runtime.getRuntime().availableProcessors());
List<Future<DownloadResult>> futures = trackUrls.stream()
    .map(url -> pool.submit(new SegmentedAudioWorker(url, outputDir)))
    .toList();`,
  },
  {
    id: "04",
    title: "E-Commerce Recommendation System",
    subtitle: "Personalized Collaborative & Content-Based Filtering Engine",
    category: "Data Science & ML",
    year: "2025",
    featured: true,
    badge: "Machine Learning",
    summary:
      "Intelligent product discovery system engineered in Python that predicts user affinity and surfaces personalized product rankings using hybrid collaborative filtering and cosine similarity matrices.",
    tech: [
      "Python",
      "Scikit-Learn",
      "Pandas",
      "NumPy",
      "Cosine Similarity",
      "Collaborative Filtering",
    ],
    metrics: [
      { label: "Algorithm", value: "Hybrid SVD + Cosine Similarity" },
      { label: "Cold-Start Handling", value: "Metadata TF-IDF Vectorizer" },
      { label: "Precision@10", value: "High Relevance Ranking" },
    ],
    architecture: [
      "Constructs sparse user-item interaction matrices and applies dimensionality reduction to uncover latent shopping preferences.",
      "Solves cold-start product challenges by vectorizing catalog descriptions and category tags using TF-IDF embeddings.",
      "Delivers sub-100ms top-N product recommendations ready for e-commerce storefront integration.",
    ],
    codeSnippet: `# Compute item-to-item similarity matrix
tfidf_matrix = tfidf.fit_transform(products_df['combined_metadata'])
cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
top_indices = cosine_sim[target_idx].argsort()[-11:-1][::-1]`,
  },
  {
    id: "05",
    title: "Air Quality Prediction Model",
    subtitle: "Environmental Time-Series & Regression Forecasting Pipeline",
    category: "Data Science & ML",
    year: "2025",
    featured: false,
    badge: "Predictive Analytics",
    summary:
      "End-to-end machine learning pipeline analyzing multi-sensor atmospheric pollutants (PM2.5, PM10, NO2, SO2, CO) to forecast Air Quality Index (AQI) levels and identify seasonal pollution drivers.",
    tech: [
      "Python",
      "Scikit-Learn",
      "Random Forest",
      "XGBoost",
      "Pandas",
      "Matplotlib / Power BI",
    ],
    metrics: [
      { label: "Target Metric", value: "Continuous AQI Forecasting" },
      { label: "Feature Pipeline", value: "Outlier Imputation & Scaling" },
      { label: "Model Ensemble", value: "Gradient Boosted Trees" },
    ],
    architecture: [
      "Performs rigorous feature engineering on meteorological and pollutant datasets, handling missing sensor intervals and collinearity.",
      "Benchmarks Multiple Linear Regression, Random Forest, and Gradient Boosting regressors with cross-validated RMSE and R² evaluation.",
      "Integrates analytical outputs with interactive visual dashboards to highlight high-risk urban air quality zones.",
    ],
    codeSnippet: `rf_model = RandomForestRegressor(n_estimators=250, max_depth=14, random_state=42)
rf_model.fit(X_train_scaled, y_train)
predictions = rf_model.predict(X_test_scaled)
r2 = r2_score(y_test, predictions)`,
  },
  {
    id: "06",
    title: "Real-Time Face Detection & Digit Recognition",
    subtitle: "Computer Vision & Deep Neural Network Classification Suite",
    category: "Data Science & ML",
    year: "2025",
    featured: false,
    badge: "Computer Vision",
    summary:
      "Dual computer vision suite featuring real-time webcam facial detection cascades and a Convolutional Neural Network (CNN) trained on handwritten digits for high-accuracy optical recognition.",
    tech: [
      "Python",
      "OpenCV",
      "Deep Learning / CNN",
      "NumPy",
      "MNIST",
      "Image Processing",
    ],
    metrics: [
      { label: "Digit Accuracy", value: "99.1% MNIST Validation" },
      { label: "Video Inference", value: "30+ FPS Real-Time Stream" },
      { label: "Vision Pipeline", value: "Grayscale Normalization + CNN" },
    ],
    architecture: [
      "Processes live video frames via OpenCV with adaptive histogram equalization and bounding-box coordinate stabilization.",
      "Trains multi-layer convolutional and pooling layers with dropout regularization to classify handwritten digits with high resilience to stroke noise.",
      "Supports real-time frame annotation and confidence score overlays.",
    ],
    codeSnippet: `gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
faces = face_cascade.detectMultiScale(gray_frame, scaleFactor=1.15, minNeighbors=5)
for (x, y, w, h) in faces:
    cv2.rectangle(frame, (x, y), (x+w, y+h), (210, 255, 40), 2)`,
  },
];

const SKILL_GROUPS = [
  {
    category: "Languages & Core Engineering",
    index: "01",
    icon: Code2,
    description:
      "Strong algorithmic foundation, object-oriented design, and analytical query languages.",
    skills: [
      { name: "Python", level: "95%", tag: "Data Science & Automation" },
      { name: "Java", level: "92%", tag: "Enterprise & Concurrency" },
      { name: "SQL", level: "90%", tag: "Relational Modeling & Queries" },
      { name: "DAX", level: "86%", tag: "Analytical Measures" },
      { name: "JavaScript / ES6+", level: "88%", tag: "Modern Web UI" },
    ],
  },
  {
    category: "Full-Stack, Backend & AI Frameworks",
    index: "02",
    icon: Layers,
    description:
      "Scalable web applications, concurrent Java backends, and generative AI integrations.",
    skills: [
      {
        name: "Spring Boot & Spring MVC",
        level: "90%",
        tag: "Enterprise Java API",
      },
      { name: "Java Multithreading", level: "88%", tag: "Parallel Execution" },
      { name: "React & Next.js", level: "90%", tag: "Full-Stack Frontend" },
      { name: "Supabase", level: "87%", tag: "Postgres & Realtime Auth" },
      { name: "Google Gemini API", level: "92%", tag: "LLM & Voice Workflows" },
    ],
  },
  {
    category: "Data Science, ML & Business Intelligence",
    index: "03",
    icon: BarChart3,
    description:
      "End-to-end predictive modeling, computer vision pipelines, and executive BI dashboards.",
    skills: [
      {
        name: "Machine Learning (Scikit-Learn)",
        level: "92%",
        tag: "Regression & Recommenders",
      },
      {
        name: "Computer Vision (OpenCV / CNN)",
        level: "86%",
        tag: "Image & Video Inference",
      },
      {
        name: "Power BI",
        level: "94%",
        tag: "Interactive Executive Dashboards",
      },
      {
        name: "Power Query Editor",
        level: "91%",
        tag: "ETL & Data Transformation",
      },
      {
        name: "Advanced Excel Analytics",
        level: "93%",
        tag: "Pivot Modeling & Forecasting",
      },
    ],
  },
];

// ==========================================
// AUTOMATIC WHITE-BACKGROUND REMOVAL & CUTOUT
// Processes Photo.JPG on an offscreen canvas so
// the SVG sticker filter wraps tightly around Aditya's silhouette!
// ==========================================
function processCutoutImage(srcUrl, callback) {
  const img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = () => {
    try {
      const canvas = document.createElement("canvas");
      const maxDim = 900;
      const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      const w = canvas.width;
      const h = canvas.height;

      // Flood-fill from outer border pixels to strip white studio background
      // while preserving Aditya's white dress shirt inside the suit!
      const visited = new Uint8Array(w * h);
      const queue = [];

      const isNearWhite = (idx) => {
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        return r > 232 && g > 232 && b > 232;
      };

      for (let x = 0; x < w; x++) {
        queue.push(x);
        queue.push((h - 1) * w + x);
      }
      for (let y = 0; y < h; y++) {
        queue.push(y * w);
        queue.push(y * w + (w - 1));
      }

      while (queue.length > 0) {
        const pos = queue.pop();
        if (pos < 0 || pos >= w * h || visited[pos]) continue;
        visited[pos] = 1;
        const pixelIdx = pos * 4;
        if (isNearWhite(pixelIdx)) {
          data[pixelIdx + 3] = 0; // Make background transparent
          const x = pos % w;
          const y = Math.floor(pos / w);
          if (x > 0) queue.push(pos - 1);
          if (x < w - 1) queue.push(pos + 1);
          if (y > 0) queue.push(pos - w);
          if (y < h - 1) queue.push(pos + w);
        }
      }

      ctx.putImageData(imgData, 0, 0);
      callback(canvas.toDataURL("image/png"));
    } catch (err) {
      callback(srcUrl);
    }
  };
  img.onerror = () => callback(null);
  img.src = srcUrl;
}

export default function App() {
  // Default to the Kevin Luna Scrapbook Graph-Paper theme
  const [activeThemeKey, setActiveThemeKey] = useState("scrapbook");
  const [activeFontKey, setActiveFontKey] = useState("scrapbookType");
  const [customAccent, setCustomAccent] = useState("");
  const [customBg, setCustomBg] = useState("");
  const [studioOpen, setStudioOpen] = useState(false);

  // Scrapbook Language & Portrait State
  const [lang, setLang] = useState("ENG");
  const [portraitSrc, setPortraitSrc] = useState(() => {
    try {
      return localStorage.getItem("aditya_portrait_cutout_v1") || "/Photo.JPG";
    } catch {
      return "/Photo.JPG";
    }
  });
  const [portraitLoadFailed, setPortraitLoadFailed] = useState(false);
  const fileInputRef = useRef(null);

  // Portfolio Interactive State
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeProjectModal, setActiveProjectModal] = useState(null);
  const [copiedField, setCopiedField] = useState(null);
  const [activeSkillTab, setActiveSkillTab] = useState(0);
  const [quickMessage, setQuickMessage] = useState({
    name: "",
    email: "",
    subject: "Project / Hiring Inquiry",
    message: "",
  });
  const [messageStatus, setMessageStatus] = useState(null);

  // Automatically process /Photo.JPG on first load to strip white studio background
  useEffect(() => {
    if (portraitSrc === "/Photo.JPG") {
      processCutoutImage("/Photo.JPG", (processedDataUrl) => {
        if (processedDataUrl) {
          setPortraitSrc(processedDataUrl);
          setPortraitLoadFailed(false);
        } else {
          setPortraitLoadFailed(true);
        }
      });
    }
  }, [portraitSrc]);

  // Handle user uploading Photo.JPG directly from their computer
  const handlePortraitUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const rawDataUrl = ev.target?.result;
      if (typeof rawDataUrl === "string") {
        processCutoutImage(rawDataUrl, (cutoutUrl) => {
          const finalUrl = cutoutUrl || rawDataUrl;
          setPortraitSrc(finalUrl);
          setPortraitLoadFailed(false);
          try {
            localStorage.setItem("aditya_portrait_cutout_v1", finalUrl);
          } catch {
            // Ignore storage quota errors
          }
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetPortrait = () => {
    try {
      localStorage.removeItem("aditya_portrait_cutout_v1");
    } catch {}
    setPortraitSrc("/Photo.JPG");
  };

  // Compute current active theme colors
  const theme = useMemo(() => {
    const base = THEME_PRESETS[activeThemeKey];
    return {
      ...base,
      accent: customAccent || base.accent,
      bg: customBg || base.bg,
    };
  }, [activeThemeKey, customAccent, customBg]);

  const fonts = FONT_PAIRINGS[activeFontKey];
  const copy = SCRAPBOOK_CONTENT[lang];

  // Filter projects
  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  // Copy helper
  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2200);
  };

  // Handle contact form mailto trigger
  const handleSendMail = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `${quickMessage.subject} — from ${quickMessage.name || "Portfolio Visitor"}`,
    );
    const body = encodeURIComponent(
      `Hi Aditya,\n\n${quickMessage.message}\n\nBest regards,\n${quickMessage.name}\n${quickMessage.email}`,
    );
    window.open(
      `mailto:adityasingh0563@gmail.com?subject=${subject}&body=${body}`,
      "_blank",
    );
    setMessageStatus(
      "Prepared in your email client! You can also copy Aditya’s email directly.",
    );
    setTimeout(() => setMessageStatus(null), 4000);
  };

  return (
    <div
      style={{
        backgroundColor: theme.bg,
        color: theme.text,
        fontFamily: fonts.body,
        minHeight: "100vh",
        transition: "background-color 0.35s ease, color 0.35s ease",
      }}
      className="relative selection:bg-[#E63B1F] selection:text-white overflow-x-hidden"
    >
      {/* Google Fonts Injection (Added Caveat for Polaroid handwritten captions) */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;600;700&family=Outfit:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&family=Syne:wght@600;700;800&display=swap"
      />

      {/* Global SVG Filter for the Kevin Luna Cutout Vermilion Sticker Outline */}
      <svg className="hidden" width="0" height="0" aria-hidden="true">
        <defs>
          <filter
            id="cutout-sticker-outline"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feMorphology
              in="SourceAlpha"
              operator="dilate"
              radius="11"
              result="dilated"
            />
            <feFlood
              floodColor="#E63B1F"
              floodOpacity="1"
              result="vermilionFill"
            />
            <feComposite
              in="vermilionFill"
              in2="dilated"
              operator="in"
              result="solidOutline"
            />
            <feMerge>
              <feMergeNode in="solidOutline" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Authentic 24px Graph-Paper Grid Overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.08]"
        style={{
          backgroundImage: `linear-gradient(to right, ${theme.text} 1px, transparent 1px), linear-gradient(to bottom, ${theme.text} 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* ==========================================
          TOP EDITORIAL NAVIGATION BAR
      ========================================== */}
      <header
        style={{
          backgroundColor: `${theme.bg}E6`,
          borderColor: theme.border,
        }}
        className="sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* Brand Monogram & Index */}
          <a href="#top" className="flex items-center gap-3 group">
            <div
              style={{
                backgroundColor: theme.accent,
                color: theme.accentText,
                fontFamily: fonts.mono,
              }}
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm tracking-tighter transition-transform duration-300 group-hover:scale-105"
            >
              AS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  style={{ fontFamily: fonts.heading }}
                  className="font-bold text-lg tracking-tight leading-none"
                >
                  ADITYA SINGH
                </span>
                <span
                  style={{
                    fontFamily: fonts.mono,
                    borderColor: theme.border,
                    color: theme.muted,
                  }}
                  className="text-[11px] px-2 py-0.5 rounded-full border hidden sm:inline-block"
                >
                  PORTFOLIO 
                </span>
              </div>
              <p style={{ color: theme.muted }} className="text-xs mt-0.5">
                Software Developer & Data Scientist
              </p>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold">
            {[
              { label: "01. Scrapbook Bio", href: "#scrapbook" },
              { label: "02. Selected Works (06)", href: "#work" },
              { label: "03. Recognition", href: "#achievement" },
              { label: "04. Stack Matrix", href: "#skills" },
              { label: "05. Contact", href: "#contact" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                style={{ color: theme.text }}
                className="opacity-75 hover:opacity-100 transition-opacity hover:underline underline-offset-8"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Actions: Upload Photo, Theme Studio Trigger & Hire CTA */}
          <div className="flex items-center gap-2">
            {/* <button
              onClick={() => fileInputRef.current?.click()}
              style={{
                borderColor: theme.border,
                backgroundColor: theme.surface,
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full border text-xs font-semibold hover:scale-[1.02] transition-all cursor-pointer"
              title="Swap or Upload your Photo.JPG portrait"
            > */}
              {/* <Camera className="w-3.5 h-3.5" style={{ color: theme.accent }} /> */}
              {/* <span className="hidden sm:inline">Swap Photo</span> */}
            {/* </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePortraitUpload}
              className="hidden"
            /> */}

            <button
              onClick={() => setStudioOpen(true)}
              style={{
                borderColor: theme.border,
                backgroundColor: theme.surface,
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full border text-xs font-semibold hover:scale-[1.02] transition-all cursor-pointer"
              title="Customize Behance 2026 Theme, Colors & Typography"
            >
              <Palette
                className="w-3.5 h-3.5"
                style={{ color: theme.accent }}
              />
              <span className="hidden lg:inline">Theme Studio</span>
            </button>

            <a
              href="#contact"
              style={{
                backgroundColor: theme.accent,
                color: theme.accentText,
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-tight hover:opacity-90 transition-all"
            >
              <span>Let’s Talk</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      <main
        id="top"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-6 sm:pt-10 pb-24"
      >
        {/* ====================================================================
            KEVIN LUNA STYLE SCRAPBOOK / GRAPH-PAPER CUTOUT SPREAD (HERO BIO)
        ==================================================================== */}
        <section
          id="scrapbook"
          style={{
            backgroundColor: "#E8E4D9",
            color: "#161615",
            borderColor: "#C8C2B4",
            backgroundImage:
              "linear-gradient(to right, rgba(20, 20, 19, 0.075) 1px, transparent 1px), linear-gradient(to bottom, rgba(20, 20, 19, 0.075) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
          className="relative rounded-3xl border-2 shadow-2xl overflow-hidden pt-6 sm:pt-10 px-4 sm:px-8 lg:px-10 pb-0"
        >
          {/* Top-Right Geometric "A" Monogram Logo (Matches Kevin Luna's top-right orange mark) */}
          <div className="absolute top-5 right-6 z-20 flex items-center gap-3">
            <div
              className="w-9 h-9 flex items-center justify-center font-black text-xl select-none"
              style={{ color: "#E63B1F", fontFamily: fonts.heading }}
              title="Aditya Singh Studio Mark"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M5 27L14 5H19L10 27H5Z" fill="#E63B1F" />
                <circle cx="23" cy="11" r="4.5" fill="#E63B1F" />
                <path
                  d="M17 17C22 17 26 21 27 27H20C19.5 23.5 18 21 15 21V17Z"
                  fill="#E63B1F"
                />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
            {/* ==========================================
                LEFT COLUMN: CUTOUT PORTRAIT WITH BOLD VERMILION STICKER CONTOUR
            ========================================== */}
            <div className="lg:col-span-4 relative flex flex-col items-center justify-center pt-4 lg:pt-8 min-h-[420px] sm:min-h-[540px]">
              {/* Solid Red-Orange Cutout Backing Shape for Depth */}
              <div
                className="relative w-full max-w-[360px] flex items-end justify-center select-none group"
                style={{ minHeight: "430px" }}
              >
                {!portraitLoadFailed ? (
                  <img
                    src={portraitSrc}
                    alt="Aditya Singh Cutout Portrait"
                    onError={() => setPortraitLoadFailed(true)}
                    style={{
                      filter:
                        "url(#cutout-sticker-outline) drop-shadow(0px 10px 24px rgba(0,0,0,0.18))",
                    }}
                    className="w-full max-h-[520px] object-contain object-bottom relative z-10 transition-transform duration-300 group-hover:scale-[1.01]"
                  />
                ) : (
                  /* Built-in Stylized Suit Cutout Fallback + 1-Click Photo.JPG Picker */
                  <div className="relative z-10 w-full flex flex-col items-center justify-end">
                    <svg
                      viewBox="0 0 340 430"
                      className="w-full max-w-[330px] h-auto"
                      style={{ filter: "url(#cutout-sticker-outline)" }}
                    >
                      {/* Stylized Navy Suit & Crossed Arms Portrait Silhouette */}
                      <path
                        d="M115 110 C115 52, 225 52, 225 110 C225 160, 205 195, 170 195 C135 195, 115 160, 115 110 Z"
                        fill="#E5B899"
                      />
                      <path
                        d="M112 98 C110 48, 225 40, 228 96 C215 70, 130 68, 112 98 Z"
                        fill="#1A1A1D"
                      />
                      {/* Neck & White Shirt Collar */}
                      <rect
                        x="148"
                        y="185"
                        width="44"
                        height="42"
                        rx="8"
                        fill="#D8A788"
                      />
                      <polygon
                        points="135,212 170,295 205,212 192,202 170,235 148,202"
                        fill="#FFFFFF"
                      />
                      {/* Navy Suit Jacket & Shoulders */}
                      <path
                        d="M42 260 C45 228, 95 212, 138 208 L170 295 L202 208 C245 212, 295 228, 298 260 L312 430 L28 430 Z"
                        fill="#2A3550"
                      />
                      {/* Suit Lapels */}
                      <polygon
                        points="136,208 118,265 166,320 170,295"
                        fill="#1E273C"
                      />
                      <polygon
                        points="204,208 222,265 174,320 170,295"
                        fill="#1E273C"
                      />
                      {/* Crossed Arms Fold */}
                      <path
                        d="M52 340 C105 322, 235 322, 288 340 L296 428 L44 428 Z"
                        fill="#232D45"
                      />
                    </svg>
                  </div>
                )}

          

                {/* Bottom-Left Studio Signature Overlay ("aditya singh / dev & data studio") */}
                <div className="absolute bottom-6 left-4 z-20 select-none pointer-events-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
                  <div
                    style={{ fontFamily: fonts.heading }}
                    className="text-white font-extrabold text-3xl sm:text-4xl leading-[0.86] tracking-tight uppercase"
                  >
                    Aditya
                    <br />
                    Singh
                  </div>
                  <div
                    style={{ color: "#FF4B2B", fontFamily: fonts.body }}
                    className="text-[11px] sm:text-xs font-bold tracking-tight mt-1"
                  >
                    Dev & Data Scientist
                  </div>
                </div>
              </div>
            </div>

            {/* ==========================================
                RIGHT 8 COLUMNS: HEADLINE, STAMPS, 3-COL BIO, & POLAROIDS
            ========================================== */}
            <div className="lg:col-span-8 flex flex-col justify-between pb-6">
              {/* Top Row: Headline + Tilted Location Stamps */}
              <div className="relative mb-6 pt-2">
                {/* Overlapping Tilted Location Stamps ("INDIA" / "MCA '26") */}
                <div className="flex items-center gap-1 mb-2 sm:mb-0 sm:absolute sm:-top-5 sm:right-24 z-20 select-none">
                  <span
                    style={{ fontFamily: fonts.mono }}
                    className="inline-block border-[1.5px] border-[#161615] bg-[#E8E4D9] px-3 py-0.5 text-[11px] font-bold tracking-widest uppercase -rotate-6 shadow-xs"
                  >
                    {copy.stamp1}
                  </span>
                  <span
                    style={{ fontFamily: fonts.mono }}
                    className="inline-block border-[1.5px] border-[#161615] bg-[#E8E4D9] px-3 py-0.5 text-[11px] font-bold tracking-widest uppercase rotate-6 -ml-2 mt-3 shadow-xs"
                  >
                    {copy.stamp2}
                  </span>
                </div>

                {/* Main Scrapbook Headline with Red-Orange Bounding Box Accent */}
                <div className="inline-block relative border border-[#E63B1F]/40 px-2 py-1">
                  {/* Tiny Corner Anchor Squares (Illustrator/Figma Selection Box Feel) */}
                  <span className="w-1.5 h-1.5 bg-[#E63B1F] absolute -top-1 -left-1" />
                  <span className="w-1.5 h-1.5 bg-[#E63B1F] absolute -top-1 -right-1" />
                  <span className="w-1.5 h-1.5 bg-[#E63B1F] absolute -bottom-1 -left-1" />
                  <span className="w-1.5 h-1.5 bg-[#E63B1F] absolute -bottom-1 -right-1" />

                  <h1
                    style={{ fontFamily: fonts.heading }}
                    className="text-4xl sm:text-6xl lg:text-[64px] font-extrabold tracking-tight leading-none text-[#161615]"
                  >
                    {copy.greetingPrefix}
                    <span style={{ color: "#E63B1F" }}>
                      {copy.firstNameHighlight}
                    </span>
                    {copy.restOfName}
                  </h1>
                </div>
              </div>

              {/* 3-Column Editorial Spread (Bio | Experience | Education + Focus + Tools) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-7 text-[#1E1E1C]">
                {/* Sub-Column 1: Narrative Bio + "BUILT BY ADITYA" Stamp */}
                <div className="md:col-span-5 space-y-4 text-xs sm:text-[13px] leading-[1.6]">
                  {lang === "ENG" ? (
                    <>
                      <p>
                        No matter if I’m architecting backend systems, training
                        ML models, or working late in my room, I’m always{" "}
                        <strong className="font-extrabold text-[#111]">
                          building, analyzing, or shipping something new. I love
                          writing clean code, uncovering data insights,
                          engineering APIs, automating workflows
                        </strong>{" "}
                        and turning complex data into intuitive products.
                      </p>
                      <p>
                        I’m a{" "}
                        <strong className="font-extrabold text-[#111]">
                          Full-Stack Developer, Data Scientist, and MCA
                          Postgraduate
                        </strong>
                        . I specialize in scalable Java & Next.js applications
                        and predictive ML pipelines. Selected for the{" "}
                        <strong className="font-extrabold text-[#111]">
                          Bharat Builds Tour 2026 (WeMakeDevs × AWS Builder
                          Center)
                        </strong>
                        , I’m passionate about engineering high-impact software
                        & AI systems.
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        Chahe main enterprise backend architect kar raha hoon ya
                        Machine Learning models train kar raha hoon, main
                        hamesha{" "}
                        <strong className="font-extrabold text-[#111]">
                          naya software, AI tools aur data solutions banata
                          rehta hoon. Clean code likhna, APIs banana aur data
                          insights nikalna
                        </strong>{" "}
                        mera junoon hai.
                      </p>
                      <p>
                        Main ek{" "}
                        <strong className="font-extrabold text-[#111]">
                          Full-Stack Software Developer, Data Scientist 
                          Postgraduate
                        </strong>{" "}
                        hoon. Mujhe{" "}
                        <strong className="font-extrabold text-[#111]">
                          Bharat Builds Tour 2026 (WeMakeDevs × AWS)
                        </strong>{" "}
                        ke liye chuna gaya hai aur main scalable Java, Next.js
                        aur AI products banata hoon.
                      </p>
                    </>
                  )}

                  {/* Tilted Stamp: "BUILT BY ADITYA" (Matches "HECHO POR KEV") */}
                  <div className="pt-3">
                    <div
                      style={{ fontFamily: fonts.mono }}
                      className="inline-block border-[1.5px] border-[#161615] px-4 py-1.5 text-xs sm:text-sm font-bold tracking-wider uppercase -rotate-3 bg-[#E8E4D9] shadow-xs"
                    >
                      {copy.hechoStamp}
                    </div>
                  </div>
                </div>

                {/* Sub-Column 2: Experience (Experiencia Style with Red & Green Years) */}
                <div className="md:col-span-4 space-y-3.5 text-xs">
                  <h2
                    style={{ fontFamily: fonts.heading }}
                    className="text-base sm:text-lg font-extrabold tracking-tight text-[#161615] border-b border-[#161615]/15 pb-1"
                  >
                    {copy.expHeading}
                  </h2>

                  {/* Item 1: 2026 / NOW */}
                  <div className="flex items-start gap-2.5">
                    <div
                      style={{ color: "#E63B1F", fontFamily: fonts.heading }}
                      className="font-extrabold text-xs leading-none shrink-0 w-10 pt-0.5"
                    >
                      2026
                      <span className="block text-[10px]">NOW</span>
                    </div>
                    <div className="space-y-1">
                      <p className="font-extrabold text-[#161615] leading-tight">
                        Bharat Builds Tour 2026
                      </p>
                      <p className="text-[11px] text-[#57554F]">
                        Selected Builder • WeMakeDevs × AWS
                      </p>
                      <p className="text-[11px] leading-snug text-[#333]">
                        Engineered the flagship AI voice & text Kirana inventory
                        platform:{" "}
                        <strong className="text-[#1B5E3A] font-bold">
                          Bharat Catalog Engine, Next.js, React, Supabase,
                          Google Gemini API & Realtime SQL.
                        </strong>
                      </p>
                    </div>
                  </div>

                  {/* Item 2: 2025 / ATC */}
                  <div className="flex items-start gap-2.5">
                    <div
                      style={{ color: "#E63B1F", fontFamily: fonts.heading }}
                      className="font-extrabold text-xs leading-none shrink-0 w-10 pt-0.5"
                    >
                      2025
                      <span className="block text-[10px]">2026</span>
                    </div>
                    <div>
                      <p className="font-extrabold text-[#161615] leading-tight">
                        Java & Full-Stack Engineer
                      </p>
                      <p className="text-[11px] text-[#57554F] leading-snug">
                        Architected Enterprise POS System (Spring Boot, MVC,
                        SQL) & Multithreaded Song Downloader.
                      </p>
                    </div>
                  </div>

                  {/* Item 3: 2025 / ML */}
                  <div className="flex items-start gap-2.5">
                    <div
                      style={{ color: "#1B5E3A", fontFamily: fonts.heading }}
                      className="font-extrabold text-xs leading-none shrink-0 w-10 pt-0.5"
                    >
                      2025
                      <span className="block text-[10px]">2026</span>
                    </div>
                    <div>
                      <p className="font-extrabold text-[#161615] leading-tight">
                        Data Science & ML Systems
                      </p>
                      <p className="text-[11px] text-[#57554F] leading-snug">
                        E-Commerce Recommender, AQI Forecasting, Face Detection
                        & MNIST Digit CNN.
                      </p>
                    </div>
                  </div>

                  {/* Item 4: 2024 / BI */}
                  <div className="flex items-start gap-2.5">
                    <div
                      style={{ color: "#1B5E3A", fontFamily: fonts.heading }}
                      className="font-extrabold text-xs leading-none shrink-0 w-10 pt-0.5"
                    >
                      2024
                      <span className="block text-[10px]">2025</span>
                    </div>
                    <div>
                      <p className="font-extrabold text-[#161615] leading-tight">
                        BI & Data Analytics
                      </p>
                      <p className="text-[11px] text-[#57554F] leading-snug">
                        Power BI Executive Dashboards, DAX Measures & Power
                        Query ETL.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sub-Column 3: Education (Estudios), Focus (Enfoque), Tools (Herramientas) */}
                <div className="md:col-span-3 space-y-4 text-xs">
                  {/* Education with Interactive ENG / HIN Toggle */}
                  <div>
                    <div className="flex items-center justify-between border-b border-[#161615]/15 pb-1 mb-2">
                      <h2
                        style={{ fontFamily: fonts.heading }}
                        className="text-base sm:text-lg font-extrabold tracking-tight text-[#161615]"
                      >
                        {copy.eduHeading}
                      </h2>
                      <div
                        style={{ fontFamily: fonts.mono }}
                        className="text-[10px] font-bold flex items-center gap-1"
                      >
                        <button
                          onClick={() => setLang("ENG")}
                          className={`cursor-pointer ${lang === "ENG" ? "text-[#E63B1F] underline" : "text-[#777]"}`}
                        >
                          ENG
                        </button>
                        <span className="text-[#999]">/</span>
                        <button
                          onClick={() => setLang("HIN")}
                          className={`cursor-pointer ${lang === "HIN" ? "text-[#E63B1F] underline" : "text-[#777]"}`}
                        >
                          HIN
                        </button>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <div
                        style={{ color: "#1B5E3A", fontFamily: fonts.heading }}
                        className="font-extrabold text-xs leading-none shrink-0"
                      >
                        2024
                        <span className="block text-[10px]">2026</span>
                      </div>
                      <div>
                        <p className="font-extrabold text-[#161615] leading-tight">
                          Master of Computer
                        </p>
                        <p className="text-[11px] text-[#57554F]">
                          Applications (MCA Postgraduate)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Focus (Enfoque) */}
                  <div>
                    <h2
                      style={{ fontFamily: fonts.heading }}
                      className="text-base sm:text-lg font-extrabold tracking-tight text-[#161615] mb-1.5"
                    >
                      {copy.focusHeading}
                    </h2>
                    <ul className="space-y-1 text-[11px] font-semibold text-[#222]">
                      {copy.focusItems.map((item) => (
                        <li key={item} className="flex items-center gap-1.5">
                          <span
                            style={{ color: "#1B5E3A" }}
                            className="font-black"
                          >
                            →
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tools (Herramientas — 2x4 Colorful Square Icon Badges) */}
                  <div>
                    <h2
                      style={{ fontFamily: fonts.heading }}
                      className="text-base sm:text-lg font-extrabold tracking-tight text-[#161615] mb-2"
                    >
                      {copy.toolsHeading}
                    </h2>
                    <div className="grid grid-cols-4 gap-1.5 max-w-[168px]">
                      {TOOL_BADGES.map((tool) => (
                        <div
                          key={tool.code}
                          title={tool.name}
                          style={{
                            backgroundColor: tool.bg,
                            color: tool.text,
                            borderColor: tool.border,
                            fontFamily: fonts.heading,
                          }}
                          className="w-9 h-9 rounded-md border-2 flex items-center justify-center font-extrabold text-xs tracking-tight shadow-xs hover:scale-110 transition-transform cursor-help select-none"
                        >
                          {tool.code}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ==========================================
                  BOTTOM 3 TILTED POLAROID INSTANT PHOTOS
              ========================================== */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-8 mt-4 relative z-20">
                {/* Polaroid 1: Late-Night Architecture & Coding Setup */}
                <div
                  onClick={() => setActiveProjectModal(PROJECTS[0])}
                  className="bg-[#F5F2EB] p-2.5 pb-6 rounded-sm shadow-lg border border-black/10 -rotate-3 hover:rotate-0 hover:scale-[1.03] transition-all cursor-pointer group"
                >
                  <div className="aspect-square w-full overflow-hidden bg-[#1A1817] relative">
                    <img
                      src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80"
                      alt="Late Night Full-Stack & AI Coding"
                      className="w-full h-full object-cover contrast-110 sepia-[0.15] group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute bottom-2 right-2 bg-black/75 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                      Bharat Catalog AI
                    </span>
                  </div>
                  <div
                    style={{ fontFamily: fonts.hand }}
                    className="text-center text-2xl font-bold text-[#161615] mt-2 leading-none"
                  >
                    &lt;3 code
                  </div>
                </div>

                {/* Polaroid 2: System Sketches, Notebooks & ML Models */}
                <div
                  onClick={() => setActiveProjectModal(PROJECTS[1])}
                  className="bg-[#F5F2EB] p-2.5 pb-6 rounded-sm shadow-lg border border-black/10 rotate-2 hover:rotate-0 hover:scale-[1.03] transition-all cursor-pointer group"
                >
                  <div className="aspect-square w-full overflow-hidden bg-[#1A1817] relative">
                    <img
                      src="https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=600&q=80"
                      alt="System Architecture & ML Sketches"
                      className="w-full h-full object-cover contrast-105 sepia-[0.2] group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute bottom-2 right-2 bg-black/75 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                      Java POS & Architecture
                    </span>
                  </div>
                  <div
                    style={{ fontFamily: fonts.hand }}
                    className="text-left pl-2 text-2xl font-bold text-[#161615] mt-2 leading-none"
                  >
                    System Sketches
                  </div>
                </div>

                {/* Polaroid 3: Builder Energy & Smiley Doodle */}
                <div
                  onClick={() => setActiveProjectModal(PROJECTS[3])}
                  className="bg-[#F5F2EB] p-2.5 pb-6 rounded-sm shadow-lg border border-black/10 -rotate-2 hover:rotate-0 hover:scale-[1.03] transition-all cursor-pointer group relative"
                >
                  <div className="aspect-square w-full overflow-hidden bg-[#1A1817] relative">
                    <img
                      src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80"
                      alt="Data Science & Neural Networks"
                      className="w-full h-full object-cover contrast-110 group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute bottom-2 left-2 bg-black/75 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                      Data Science & ML
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-2 mt-2">
                    <span
                      style={{ fontFamily: fonts.hand }}
                      className="text-xl font-bold text-[#57554F] leading-none"
                    >
                      AI & Models
                    </span>
                    {/* Hand-drawn Smiley Doodle matching bottom-right of Kevin Luna reference */}
                    <svg
                      width="28"
                      height="24"
                      viewBox="0 0 34 28"
                      fill="none"
                      className="text-[#161615]"
                    >
                      <path
                        d="M12 6 L11 11"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M21 6 L20 11"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M6 15 C9 23, 24 24, 29 14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            EDITORIAL TICKER / MARQUEE STRIP
        ========================================== */}
        <div
          style={{
            borderColor: theme.border,
            backgroundColor: theme.surface,
          }}
          className="mt-10 py-4 px-6 rounded-2xl border flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm"
        >
          {[
            "01 // BHARAT CATALOG ENGINE (GEMINI AI)",
            "02 // SPRING BOOT ENTERPRISE POS",
            "03 // MULTITHREADED JAVA ENGINE",
            "04 // ML RECOMMENDATION & AQI MODELS",
            "05 // REAL-TIME COMPUTER VISION",
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 font-medium"
              style={{ fontFamily: fonts.mono }}
            >
              <Sparkles
                className="w-3.5 h-3.5 shrink-0"
                style={{ color: theme.accent }}
              />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* ==========================================
            SECTION 01: SELECTED PROJECTS ARCHIVE
        ========================================== */}
        <section id="work" className="pt-20">
          <div
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b"
            style={{ borderColor: theme.border }}
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span
                  style={{ fontFamily: fonts.mono, color: theme.accent }}
                  className="text-xs uppercase tracking-widest font-semibold"
                >
                  [ 02 // SELECTED WORKS ARCHIVE ]
                </span>
              </div>
              <h2
                style={{ fontFamily: fonts.heading }}
                className="text-3xl sm:text-5xl font-extrabold tracking-tight"
              >
                FEATURED CASE STUDIES
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                "All",
                "Full-Stack & AI",
                "Java Engineering",
                "Data Science & ML",
              ].map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      backgroundColor: active ? theme.accent : theme.surface,
                      color: active ? theme.accentText : theme.text,
                      borderColor: active ? theme.accent : theme.border,
                    }}
                    className="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border transition-all cursor-pointer"
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Projects Editorial Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-10">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                onClick={() => setActiveProjectModal(project)}
                style={{
                  backgroundColor: theme.surface,
                  borderColor: theme.border,
                }}
                className="group rounded-3xl border p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 cursor-pointer relative overflow-hidden"
              >
                {/* Top Index & Category Header */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div className="flex items-center gap-3">
                      <span
                        style={{
                          fontFamily: fonts.mono,
                          backgroundColor: theme.bg,
                          borderColor: theme.border,
                        }}
                        className="w-10 h-10 rounded-xl border flex items-center justify-center text-sm font-bold"
                      >
                        {project.id}
                      </span>
                      <div>
                        <span
                          style={{
                            fontFamily: fonts.mono,
                            color: theme.accent,
                          }}
                          className="text-xs font-semibold uppercase tracking-wider block"
                        >
                          {project.category}
                        </span>
                        <span
                          style={{ color: theme.muted, fontFamily: fonts.mono }}
                          className="text-[11px]"
                        >
                          {project.badge} • {project.year}
                        </span>
                      </div>
                    </div>

                    <div
                      style={{
                        backgroundColor: theme.bg,
                        borderColor: theme.border,
                      }}
                      className="w-10 h-10 rounded-full border flex items-center justify-center group-hover:scale-110 transition-transform"
                    >
                      <ArrowUpRight
                        className="w-5 h-5"
                        style={{ color: theme.accent }}
                      />
                    </div>
                  </div>

                  {/* Project Title & Subtitle */}
                  <h3
                    style={{ fontFamily: fonts.heading }}
                    className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 group-hover:underline decoration-2 underline-offset-4"
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-sm font-medium mb-4"
                    style={{ color: theme.accent }}
                  >
                    {project.subtitle}
                  </p>
                  <p
                    style={{ color: theme.muted }}
                    className="text-sm leading-relaxed mb-6"
                  >
                    {project.summary}
                  </p>
                </div>

                {/* Metrics + Tech Stack Footer */}
                <div
                  className="space-y-5 pt-4 border-t"
                  style={{ borderColor: theme.border }}
                >
                  {/* Key Metrics Row */}
                  <div className="grid grid-cols-3 gap-2">
                    {project.metrics.map((m, i) => (
                      <div
                        key={i}
                        style={{
                          backgroundColor: theme.bg,
                          borderColor: theme.border,
                        }}
                        className="p-2.5 rounded-xl border"
                      >
                        <span
                          style={{ color: theme.muted, fontFamily: fonts.mono }}
                          className="block text-[10px] uppercase truncate"
                        >
                          {m.label}
                        </span>
                        <span className="text-xs font-semibold block truncate mt-0.5">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Pills */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          style={{
                            backgroundColor: theme.bg,
                            borderColor: theme.border,
                            fontFamily: fonts.mono,
                          }}
                          className="text-[11px] px-2.5 py-1 rounded-full border"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <span
                      style={{ color: theme.accent, fontFamily: fonts.mono }}
                      className="text-xs font-semibold flex items-center gap-1 ml-auto"
                    >
                      <span>Inspect Architecture</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ==========================================
            SECTION 02: HACKATHON & RECOGNITION SPOTLIGHT
        ========================================== */}
        <section id="achievement" className="pt-20">
          <div
            style={{
              backgroundColor: theme.surface,
              borderColor: theme.accent,
            }}
            className="rounded-3xl border-2 p-7 sm:p-12 relative overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: theme.accent,
                    color: theme.accentText,
                    fontFamily: fonts.mono,
                  }}
                >
                  <Award className="w-4 h-4" />
                  <span>2026 National Builder Recognition</span>
                </div>

                <h2
                  style={{ fontFamily: fonts.heading }}
                  className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight"
                >
                  Selected for Bharat Builds Tour 2026 Hackathon
                </h2>

                <p
                  style={{ color: theme.muted }}
                  className="text-base sm:text-lg leading-relaxed max-w-2xl"
                >
                  Recognized among top builders for the{" "}
                  <strong style={{ color: theme.text }}>
                    Bharat Builds Tour 2026
                  </strong>{" "}
                  organized by{" "}
                  <strong style={{ color: theme.text }}>
                    WeMakeDevs × AWS Builder Center
                  </strong>
                  , showcasing rapid prototyping, cloud-native thinking, and
                  AI-powered problem solving for Indian businesses.
                </p>

                <div
                  className="flex flex-wrap gap-3 pt-2"
                  style={{ fontFamily: fonts.mono }}
                >
                  <span
                    style={{
                      backgroundColor: theme.bg,
                      borderColor: theme.border,
                    }}
                    className="px-3.5 py-2 rounded-xl border text-xs"
                  >
                    ORGANIZER: WeMakeDevs × AWS Builder Center
                  </span>
                  <span
                    style={{
                      backgroundColor: theme.bg,
                      borderColor: theme.border,
                    }}
                    className="px-3.5 py-2 rounded-xl border text-xs"
                  >
                    YEAR: 2026 EDITION
                  </span>
                  <span
                    style={{
                      backgroundColor: theme.bg,
                      borderColor: theme.border,
                    }}
                    className="px-3.5 py-2 rounded-xl border text-xs"
                  >
                    FOCUS: AI & Full-Stack Product Engineering
                  </span>
                </div>
              </div>

              {/* Right Badge Visual */}
              <div className="lg:col-span-4 flex flex-col justify-center">
                <div
                  style={{
                    backgroundColor: theme.bg,
                    borderColor: theme.border,
                  }}
                  className="p-6 rounded-2xl border space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span
                      style={{ fontFamily: fonts.mono, color: theme.muted }}
                      className="text-xs"
                    >
                      FEATURED BUILD //
                    </span>
                    <Zap className="w-5 h-5" style={{ color: theme.accent }} />
                  </div>
                  <h3
                    style={{ fontFamily: fonts.heading }}
                    className="text-xl font-bold"
                  >
                    Bharat Catalog Engine
                  </h3>
                  <p
                    style={{ color: theme.muted }}
                    className="text-xs leading-relaxed"
                  >
                    Empowering Kirana store owners across India to manage stock
                    with voice & text commands powered by Next.js, Supabase, and
                    Google Gemini API.
                  </p>
                  <button
                    onClick={() => setActiveProjectModal(PROJECTS[0])}
                    style={{
                      backgroundColor: theme.accent,
                      color: theme.accentText,
                    }}
                    className="w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    View Project Architecture
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            SECTION 03: TECHNICAL SKILLS MATRIX
        ========================================== */}
        <section id="skills" className="pt-20">
          <div
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b"
            style={{ borderColor: theme.border }}
          >
            <div>
              <span
                style={{ fontFamily: fonts.mono, color: theme.accent }}
                className="text-xs uppercase tracking-widest font-semibold block mb-2"
              >
                [ 03 // TECHNICAL CAPABILITIES ]
              </span>
              <h2
                style={{ fontFamily: fonts.heading }}
                className="text-3xl sm:text-5xl font-extrabold tracking-tight"
              >
                FULL-STACK, JAVA & DATA MATRIX
              </h2>
            </div>
            <p style={{ color: theme.muted }} className="text-sm max-w-md">
              A multidisciplinary toolkit combining backend systems engineering,
              modern reactive frontends, and predictive data science.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
            {SKILL_GROUPS.map((group, idx) => {
              const IconComponent = group.icon;
              const isSelected = activeSkillTab === idx;
              return (
                <div
                  key={group.category}
                  onMouseEnter={() => setActiveSkillTab(idx)}
                  style={{
                    backgroundColor: theme.surface,
                    borderColor: isSelected ? theme.accent : theme.border,
                  }}
                  className="rounded-3xl border p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span
                        style={{ fontFamily: fonts.mono, color: theme.muted }}
                        className="text-xs font-bold"
                      >
                        MATRIX // {group.index}
                      </span>
                      <div
                        style={{
                          backgroundColor: theme.badgeBg,
                          color: theme.accent,
                        }}
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                    </div>

                    <h3
                      style={{ fontFamily: fonts.heading }}
                      className="text-2xl font-bold mb-2"
                    >
                      {group.category}
                    </h3>
                    <p
                      style={{ color: theme.muted }}
                      className="text-xs leading-relaxed mb-6"
                    >
                      {group.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {group.skills.map((skill) => (
                      <div
                        key={skill.name}
                        style={{
                          backgroundColor: theme.bg,
                          borderColor: theme.border,
                        }}
                        className="p-3.5 rounded-2xl border"
                      >
                        <div className="flex items-center justify-between text-xs sm:text-sm font-semibold mb-1.5">
                          <span>{skill.name}</span>
                          <span
                            style={{
                              color: theme.accent,
                              fontFamily: fonts.mono,
                            }}
                            className="text-[11px]"
                          >
                            {skill.tag}
                          </span>
                        </div>
                        <div
                          style={{ backgroundColor: theme.surface }}
                          className="w-full h-1.5 rounded-full overflow-hidden"
                        >
                          <div
                            style={{
                              width: skill.level,
                              backgroundColor: theme.accent,
                            }}
                            className="h-full rounded-full transition-all duration-700"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ==========================================
            SECTION 05: CONTACT & DIRECT CONNECT
        ========================================== */}
        <section id="contact" className="pt-20">
          <div
            style={{
              backgroundColor: theme.surface,
              borderColor: theme.border,
            }}
            className="rounded-3xl border p-7 sm:p-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left Contact Details */}
              <div className="lg:col-span-6 space-y-6">
                <span
                  style={{ fontFamily: fonts.mono, color: theme.accent }}
                  className="text-xs uppercase tracking-widest font-semibold block"
                >
                  [ 04 // INITIATE COLLABORATION ]
                </span>
                <h2
                  style={{ fontFamily: fonts.heading }}
                  className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-none"
                >
                  LET’S BUILD SOMETHING REMARKABLE.
                </h2>
                <p
                  style={{ color: theme.muted }}
                  className="text-sm sm:text-base leading-relaxed"
                >
                  Available for Software Developer, Java Backend, Full-Stack
                  Engineer, and Data Scientist / Analyst roles. Click any
                  channel below to copy or connect directly.
                </p>

                {/* One-Click Copy Cards */}
                <div className="space-y-3 pt-2">
                  {/* Email Card */}
                  <div
                    style={{
                      backgroundColor: theme.bg,
                      borderColor: theme.border,
                    }}
                    className="p-4 rounded-2xl border flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        style={{
                          backgroundColor: theme.badgeBg,
                          color: theme.accent,
                        }}
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      >
                        <Mail className="w-5 h-5" />
                      </div>
                      <div className="truncate">
                        <span
                          style={{ color: theme.muted, fontFamily: fonts.mono }}
                          className="text-[11px] block"
                        >
                          DIRECT EMAIL
                        </span>
                        <span className="font-semibold text-sm sm:text-base truncate block">
                          adityasingh0563@gmail.com
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        handleCopy("adityasingh0563@gmail.com", "contact-email")
                      }
                      style={{
                        backgroundColor: theme.surface,
                        borderColor: theme.border,
                      }}
                      className="px-3.5 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 shrink-0 cursor-pointer hover:opacity-80"
                    >
                      {copiedField === "contact-email" ? (
                        <>
                          <Check
                            className="w-3.5 h-3.5"
                            style={{ color: theme.accent }}
                          />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Phone Card */}
                  <div
                    style={{
                      backgroundColor: theme.bg,
                      borderColor: theme.border,
                    }}
                    className="p-4 rounded-2xl border flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        style={{
                          backgroundColor: theme.badgeBg,
                          color: theme.accent,
                        }}
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      >
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <span
                          style={{ color: theme.muted, fontFamily: fonts.mono }}
                          className="text-[11px] block"
                        >
                          PHONE / WHATSAPP
                        </span>
                        <span className="font-semibold text-sm sm:text-base">
                          +91 8287033155
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        handleCopy("+91 8287033155", "contact-phone")
                      }
                      style={{
                        backgroundColor: theme.surface,
                        borderColor: theme.border,
                      }}
                      className="px-3.5 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 shrink-0 cursor-pointer hover:opacity-80"
                    >
                      {copiedField === "contact-phone" ? (
                        <>
                          <Check
                            className="w-3.5 h-3.5"
                            style={{ color: theme.accent }}
                          />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* LinkedIn Card */}
                  <a
                    href="https://www.linkedin.com/in/adityasingh0563"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      backgroundColor: theme.bg,
                      borderColor: theme.border,
                    }}
                    className="p-4 rounded-2xl border flex items-center justify-between gap-4 hover:opacity-90 transition-opacity"
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        style={{
                          backgroundColor: theme.badgeBg,
                          color: theme.accent,
                        }}
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      >
                        <Linkedin size={20} />
                      </div>
                      <div>
                        <span
                          style={{ color: theme.muted, fontFamily: fonts.mono }}
                          className="text-[11px] block"
                        >
                          LINKEDIN PROFILE
                        </span>
                        <span className="font-semibold text-sm sm:text-base">
                          linkedin.com/in/adityasingh0563
                        </span>
                      </div>
                    </div>
                    <ExternalLink
                      className="w-4 h-4 shrink-0"
                      style={{ color: theme.accent }}
                    />
                  </a>
                </div>
              </div>

              {/* Right Quick Message Composer */}
              <div className="lg:col-span-6">
                <form
                  onSubmit={handleSendMail}
                  style={{
                    backgroundColor: theme.bg,
                    borderColor: theme.border,
                  }}
                  className="p-6 sm:p-8 rounded-2xl border space-y-4"
                >
                  <div className="flex items-center justify-between pb-2">
                    <h3
                      style={{ fontFamily: fonts.heading }}
                      className="text-xl font-bold"
                    >
                      Send a Direct Dispatch
                    </h3>
                    <span
                      style={{ fontFamily: fonts.mono, color: theme.muted }}
                      className="text-xs"
                    >
                      INSTANT MAILTO
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-xs font-medium mb-1.5"
                        style={{ color: theme.muted }}
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Recruiter / Team Lead"
                        value={quickMessage.name}
                        onChange={(e) =>
                          setQuickMessage({
                            ...quickMessage,
                            name: e.target.value,
                          })
                        }
                        style={{
                          backgroundColor: theme.surface,
                          borderColor: theme.border,
                          color: theme.text,
                        }}
                        className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        className="block text-xs font-medium mb-1.5"
                        style={{ color: theme.muted }}
                      >
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={quickMessage.email}
                        onChange={(e) =>
                          setQuickMessage({
                            ...quickMessage,
                            email: e.target.value,
                          })
                        }
                        style={{
                          backgroundColor: theme.surface,
                          borderColor: theme.border,
                          color: theme.text,
                        }}
                        className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-xs font-medium mb-1.5"
                      style={{ color: theme.muted }}
                    >
                      Role / Inquiry Topic
                    </label>
                    <select
                      value={quickMessage.subject}
                      onChange={(e) =>
                        setQuickMessage({
                          ...quickMessage,
                          subject: e.target.value,
                        })
                      }
                      style={{
                        backgroundColor: theme.surface,
                        borderColor: theme.border,
                        color: theme.text,
                      }}
                      className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none"
                    >
                      <option value="Software Developer Role Inquiry">
                        Software Developer Role Inquiry
                      </option>
                      <option value="Data Scientist / Analyst Opportunity">
                        Data Scientist / Analyst Opportunity
                      </option>
                      <option value="Full-Stack / Java Engineering Role">
                        Full-Stack / Java Engineering Role
                      </option>
                      <option value="Hackathon / Project Collaboration">
                        Hackathon / Project Collaboration
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      className="block text-xs font-medium mb-1.5"
                      style={{ color: theme.muted }}
                    >
                      Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Hi Aditya, we loved your Bharat Catalog Engine and Java POS architecture..."
                      value={quickMessage.message}
                      onChange={(e) =>
                        setQuickMessage({
                          ...quickMessage,
                          message: e.target.value,
                        })
                      }
                      style={{
                        backgroundColor: theme.surface,
                        borderColor: theme.border,
                        color: theme.text,
                      }}
                      className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none resize-none"
                    />
                  </div>

                  {messageStatus && (
                    <p
                      className="text-xs font-medium"
                      style={{ color: theme.accent }}
                    >
                      {messageStatus}
                    </p>
                  )}

                  <button
                    type="submit"
                    style={{
                      backgroundColor: theme.accent,
                      color: theme.accentText,
                    }}
                    className="w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-95 transition-opacity cursor-pointer"
                  >
                    <span>Compose Email to Aditya</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ==========================================
          FOOTER (2026 EDITORIAL SIGNATURE)
      ========================================== */}
      <footer
        style={{ borderColor: theme.border, backgroundColor: theme.surface }}
        className="border-t py-10 px-4 sm:px-8 relative z-10"
      >
        <div
          className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          style={{ color: theme.muted }}
        >
          <div className="flex items-center gap-3">
            <span
              style={{ color: theme.text, fontFamily: fonts.heading }}
              className="font-bold text-sm"
            >
              ADITYA SINGH 
            </span>
            <span>•</span>
            <span>Software Developer & Data Scientist</span>
          </div>
          <div
            className="flex items-center gap-4"
            style={{ fontFamily: fonts.mono }}
          >
            <button
              onClick={() => setStudioOpen(true)}
              style={{ color: theme.accent }}
              className="hover:underline cursor-pointer"
            >
              [ Customize Theme & Fonts ]
            </button>
            <a href="#top" className="hover:underline">
              BACK TO TOP ↑
            </a>
          </div>
        </div>
      </footer>

      {/* ==========================================
          PROJECT ARCHITECTURE MODAL
      ========================================== */}
      {activeProjectModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn"
          onClick={() => setActiveProjectModal(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: theme.surface,
              borderColor: theme.border,
              color: theme.text,
            }}
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border p-6 sm:p-9 space-y-6 shadow-2xl"
          >
            <div
              className="flex items-start justify-between gap-4 border-b pb-5"
              style={{ borderColor: theme.border }}
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    style={{
                      backgroundColor: theme.accent,
                      color: theme.accentText,
                      fontFamily: fonts.mono,
                    }}
                    className="px-2.5 py-0.5 rounded-full text-xs font-bold"
                  >
                    CASE STUDY {activeProjectModal.id}
                  </span>
                  <span
                    style={{ fontFamily: fonts.mono, color: theme.muted }}
                    className="text-xs"
                  >
                    {activeProjectModal.category}
                  </span>
                </div>
                <h3
                  style={{ fontFamily: fonts.heading }}
                  className="text-2xl sm:text-4xl font-extrabold"
                >
                  {activeProjectModal.title}
                </h3>
                <p
                  style={{ color: theme.accent }}
                  className="text-sm font-medium mt-1"
                >
                  {activeProjectModal.subtitle}
                </p>
              </div>

              <button
                onClick={() => setActiveProjectModal(null)}
                style={{ backgroundColor: theme.bg, borderColor: theme.border }}
                className="p-2.5 rounded-full border hover:opacity-80 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Summary */}
            <p
              style={{ color: theme.muted }}
              className="text-sm sm:text-base leading-relaxed"
            >
              {activeProjectModal.summary}
            </p>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {activeProjectModal.metrics.map((m, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: theme.bg,
                    borderColor: theme.border,
                  }}
                  className="p-4 rounded-2xl border"
                >
                  <span
                    style={{ color: theme.muted, fontFamily: fonts.mono }}
                    className="text-[11px] uppercase block"
                  >
                    {m.label}
                  </span>
                  <span className="text-sm font-bold mt-1 block">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Engineering Architecture Breakdown */}
            <div className="space-y-3">
              <h4
                style={{ fontFamily: fonts.mono }}
                className="text-xs uppercase tracking-wider font-bold"
              >
                ENGINEERING & ARCHITECTURE HIGHLIGHTS //
              </h4>
              <ul className="space-y-2.5">
                {activeProjectModal.architecture.map((point, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm"
                    style={{ color: theme.muted }}
                  >
                    <span
                      style={{
                        backgroundColor: theme.accent,
                        color: theme.accentText,
                        fontFamily: fonts.mono,
                      }}
                      className="w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5"
                    >
                      {i + 1}
                    </span>
                    <span style={{ color: theme.text }}>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Code Preview Block */}
            <div>
              <span
                style={{ fontFamily: fonts.mono, color: theme.muted }}
                className="text-xs uppercase block mb-2"
              >
                CORE IMPLEMENTATION PATTERN //
              </span>
              <pre
                style={{
                  backgroundColor: theme.bg,
                  borderColor: theme.border,
                  fontFamily: fonts.mono,
                }}
                className="p-4 rounded-2xl border text-xs overflow-x-auto leading-relaxed"
              >
                <code>{activeProjectModal.codeSnippet}</code>
              </pre>
            </div>

            {/* Tech Tags */}
            <div
              className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t"
              style={{ borderColor: theme.border }}
            >
              <div className="flex flex-wrap gap-2">
                {activeProjectModal.tech.map((t) => (
                  <span
                    key={t}
                    style={{
                      backgroundColor: theme.bg,
                      borderColor: theme.border,
                      fontFamily: fonts.mono,
                    }}
                    className="px-3 py-1 rounded-full border text-xs"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <a
                href="#contact"
                onClick={() => setActiveProjectModal(null)}
                style={{
                  backgroundColor: theme.accent,
                  color: theme.accentText,
                }}
                className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider"
              >
                Request Live Demo / Code
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          FLOATING BEHANCE 2026 THEME & TYPOGRAPHY STUDIO
      ========================================== */}
      <button
        onClick={() => setStudioOpen(!studioOpen)}
        style={{
          backgroundColor: theme.accent,
          color: theme.accentText,
        }}
        className="fixed bottom-5 right-5 z-40 px-4 py-3 rounded-full shadow-2xl font-bold text-xs flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer"
      >
        <Sliders className="w-4 h-4" />
        <span>Theme & Type Studio</span>
      </button>

      {studioOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs"
          onClick={() => setStudioOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: theme.surface,
              borderColor: theme.border,
              color: theme.text,
            }}
            className="w-full max-w-md h-full overflow-y-auto border-l p-6 sm:p-7 space-y-7 shadow-2xl"
          >
            <div
              className="flex items-center justify-between border-b pb-4"
              style={{ borderColor: theme.border }}
            >
              <div>
                <span
                  style={{ fontFamily: fonts.mono, color: theme.accent }}
                  className="text-[11px] uppercase font-bold"
                >
                  BEHANCE PORTFOLIO 2026 //
                </span>
                <h3
                  style={{ fontFamily: fonts.heading }}
                  className="text-xl font-bold"
                >
                  Theme, Color & Typography Studio
                </h3>
              </div>
              <button
                onClick={() => setStudioOpen(false)}
                style={{ backgroundColor: theme.bg, borderColor: theme.border }}
                className="p-2 rounded-full border cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 1. Color Palette Presets */}
            <div className="space-y-3">
              <label
                style={{ fontFamily: fonts.mono }}
                className="text-xs uppercase font-bold flex items-center gap-2"
              >
                <Palette className="w-4 h-4" style={{ color: theme.accent }} />
                <span>1. Select 2026 Editorial Color Theme</span>
              </label>
              <div className="grid grid-cols-1 gap-2.5">
                {Object.values(THEME_PRESETS).map((preset) => {
                  const isSelected =
                    activeThemeKey === preset.id && !customAccent && !customBg;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => {
                        setActiveThemeKey(preset.id);
                        setCustomAccent("");
                        setCustomBg("");
                      }}
                      style={{
                        backgroundColor: preset.bg,
                        color: preset.text,
                        borderColor: isSelected ? preset.accent : preset.border,
                      }}
                      className="p-3.5 rounded-2xl border-2 flex items-center justify-between text-left transition-all cursor-pointer"
                    >
                      <div>
                        <p className="font-bold text-sm">{preset.name}</p>
                        <p style={{ color: preset.muted }} className="text-xs">
                          {preset.tag}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span
                          style={{
                            backgroundColor: preset.bg,
                            borderColor: preset.border,
                          }}
                          className="w-5 h-5 rounded-full border"
                        />
                        <span
                          style={{ backgroundColor: preset.accent }}
                          className="w-5 h-5 rounded-full"
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Typography Pairing Selector */}
            <div className="space-y-3">
              <label
                style={{ fontFamily: fonts.mono }}
                className="text-xs uppercase font-bold flex items-center gap-2"
              >
                <Type className="w-4 h-4" style={{ color: theme.accent }} />
                <span>2. Select Typography Pairing</span>
              </label>
              <div className="grid grid-cols-1 gap-2.5">
                {Object.values(FONT_PAIRINGS).map((font) => {
                  const isSelected = activeFontKey === font.id;
                  return (
                    <button
                      key={font.id}
                      onClick={() => setActiveFontKey(font.id)}
                      style={{
                        backgroundColor: theme.bg,
                        borderColor: isSelected ? theme.accent : theme.border,
                      }}
                      className="p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <span
                          style={{ fontFamily: font.heading }}
                          className="font-bold text-base"
                        >
                          {font.name}
                        </span>
                        <span
                          style={{
                            color: theme.accent,
                            fontFamily: fonts.mono,
                          }}
                          className="text-[10px] uppercase"
                        >
                          {font.style}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Custom Hex Color Pickers */}
            <div
              className="space-y-3 pt-2 border-t"
              style={{ borderColor: theme.border }}
            >
              <label
                style={{ fontFamily: fonts.mono }}
                className="text-xs uppercase font-bold block"
              >
                3. Fine-Tune Custom Hex Colors
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div
                  style={{
                    backgroundColor: theme.bg,
                    borderColor: theme.border,
                  }}
                  className="p-3 rounded-xl border"
                >
                  <span
                    className="text-xs block mb-1.5"
                    style={{ color: theme.muted }}
                  >
                    Accent Highlight
                  </span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={theme.accent}
                      onChange={(e) => setCustomAccent(e.target.value)}
                      className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent"
                    />
                    <span
                      style={{ fontFamily: fonts.mono }}
                      className="text-xs uppercase"
                    >
                      {theme.accent}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: theme.bg,
                    borderColor: theme.border,
                  }}
                  className="p-3 rounded-xl border"
                >
                  <span
                    className="text-xs block mb-1.5"
                    style={{ color: theme.muted }}
                  >
                    Canvas Background
                  </span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={theme.bg}
                      onChange={(e) => setCustomBg(e.target.value)}
                      className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent"
                    />
                    <span
                      style={{ fontFamily: fonts.mono }}
                      className="text-xs uppercase"
                    >
                      {theme.bg}
                    </span>
                  </div>
                </div>
              </div>

              {(customAccent || customBg) && (
                <button
                  onClick={() => {
                    setCustomAccent("");
                    setCustomBg("");
                  }}
                  style={{ borderColor: theme.border }}
                  className="w-full py-2 rounded-xl border text-xs font-medium cursor-pointer hover:opacity-80"
                >
                  Reset Custom Hex Overrides
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
