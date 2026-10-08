"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import * as THREE from "three";
import { soundFX } from "@/lib/sound";
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  HelpCircle,
  RotateCcw,
  X,
  ExternalLink,
  Bot,
  Terminal,
  Send,
  Monitor,
  Layers,
  Sparkles,
} from "lucide-react";

export type WorldZone = "core" | "vault" | "systems" | "resume" | "network" | "hangar" | "overview";

export type SystemNodeData = {
  id: string;
  zone: WorldZone;
  name: string;
  category: string;
  subtitle: string;
  description: string;
  metrics: string;
  pipeline?: string[];
  tech: string[];
  position: [number, number, number];
  color: number;
  routeHref: string;
  actionLabel?: string;
  external?: boolean;
};

export const SYSTEM_NODES: SystemNodeData[] = [
  {
    id: "core-gateway",
    zone: "core",
    name: "Meghraj Compute Core",
    category: "DISTRIBUTED SYSTEM ANCHOR",
    subtitle: "High-Throughput Architectural Platform",
    description: "Central computational anchor coordinating 286 production endpoints, 61+ database models, and 30+ schema migrations. Features database-level deduplication CTEs, connection pool tuning, and sub-50ms p95 latencies across PostgreSQL, Redis, and Supabase data layers.",
    metrics: "286 Endpoints · 61+ Models · 30+ Migrations · Sub-50ms p95",
    pipeline: ["CLIENT GATEWAY", "FASTAPI / EXPRESS", "REDIS CACHE & RATE LIMIT", "SUPABASE / POSTGRES", "ASYNC CELERY WORKERS"],
    tech: ["FastAPI", "Express 5", "PostgreSQL", "Redis", "Docker", "Supabase"],
    position: [0, 0, 0],
    color: 0x00f0ff, // Arc Cyan
    routeHref: "/#projects",
    actionLabel: "INSPECT CORE STACK",
  },
  {
    id: "iyov-ai",
    zone: "vault",
    name: "IYOV AI",
    category: "PROJECT VAULT // WORKFORCE PLATFORM",
    subtitle: "Statutory Payroll & Mobile Ecosystem",
    description: "Built the India statutory tax and compliance payroll module from scratch, automating complex statutory deduction rules (PF, ESI, Professional Tax, TDS) into verified payroll formulas. Automated batches and bulk notifications with Redis-backed job queues, and published 4+ companion Flutter apps to App Store and Play Store.",
    metrics: "4+ Store Publications · Zero-Discrepancy Audits · Automated Batch Jobs",
    pipeline: ["HRMS ATTENDANCE", "STATUTORY RULES ENGINE", "REDIS BATCH QUEUE", "SUPABASE RLS", "MOBILE APP SYNC"],
    tech: ["Python", "FastAPI", "Flutter", "Riverpod", "Next.js", "PostgreSQL", "Redis"],
    position: [8, 1.8, -5],
    color: 0x10b981, // Emerald Green
    routeHref: "/#projects",
    actionLabel: "VIEW IYOV DOSSIER",
  },
  {
    id: "securebank",
    zone: "vault",
    name: "TFG SecureBank",
    category: "PROJECT VAULT // FINTECH PLATFORM",
    subtitle: "Automated Credit Scoring & Tamper-Evident Docs",
    description: "Architected a multi-tenant FastAPI backend with 70 REST endpoints routing between PostgreSQL and legacy MySQL. Implemented an openpyxl/xlcalculator rules engine that evaluates credit validation matrices directly from templates, generating tamper-evident loan agreement PDFs with WeasyPrint and Jinja2.",
    metrics: "70 REST Endpoints · Automated Credit Matrix · Tamper-Evident PDFs",
    pipeline: ["LOAN APPLICATION", "CREDIT MATRIX EVALUATION", "TENANT ROUTER", "WEASYPRINT GENERATOR", "TAMPER-EVIDENT ARCHIVE"],
    tech: ["Python", "FastAPI", "SQLAlchemy", "Alembic", "PostgreSQL", "Redis", "WeasyPrint"],
    position: [7, -1.8, 5],
    color: 0x38bdf8, // Sky Blue
    routeHref: "/#projects",
    actionLabel: "VIEW FINTECH ARCHITECTURE",
  },
  {
    id: "tfgenapi",
    zone: "vault",
    name: "TFGenAPI",
    category: "PROJECT VAULT // AI INFERENCE GATEWAY",
    subtitle: "Verification & Document Embedding Platform",
    description: "End-to-end verification platform. Combines PyTesseract OCR for multi-format text extraction and Sentence Transformers for dense vector embeddings to match identity documents with high semantic accuracy. Configured MongoDB Motor for high-throughput document ingestion and Celery/Redis for asynchronous task queues.",
    metrics: "Dense Vector Similarity · High-Throughput Motor Layer · Async Webhooks",
    pipeline: ["DOCUMENT UPLOAD", "PYTESSERACT OCR", "SENTENCE TRANSFORMERS", "VECTOR MATCHING", "WEBHOOK NOTIFICATION"],
    tech: ["Next.js 16", "Python", "FastAPI", "MongoDB", "PyTesseract", "Sentence Transformers"],
    position: [-8, 2.2, -5],
    color: 0xa855f7, // Arc Violet
    routeHref: "/#projects",
    actionLabel: "INSPECT INFERENCE SPEC",
  },
  {
    id: "medical-advisor",
    zone: "vault",
    name: "Medical Advisor",
    category: "PROJECT VAULT // HEALTHCARE MICROSERVICE",
    subtitle: "Mission-Critical Backend & Real-Time Sync",
    description: "Secured FastAPI microservice protected with strict JWT authentication and Google Play Integrity nonces. Engineered an asynchronous dual-write pipeline syncing PostgreSQL transaction states to Firestore for real-time WebSocket client updates. Mentored and led technical onboarding for 8 engineers.",
    metrics: "Play Store Verified · Google Play Integrity Nonces · 8 Engineers Mentored",
    pipeline: ["APP INTEGRITY NONCE", "JWT AUTH GATEWAY", "POSTGRES TRANSACTION", "FIRESTORE DUAL-WRITE", "WEBSOCKET BROADCAST"],
    tech: ["Python", "FastAPI", "PostgreSQL", "Redis", "Firebase", "Docker"],
    position: [-7, -1.8, 4],
    color: 0x06b6d4, // Cyan
    routeHref: "/#projects",
    actionLabel: "VIEW HEALTHCARE SPEC",
  },
  {
    id: "dealsmart",
    zone: "vault",
    name: "DealsMart",
    category: "PROJECT VAULT // RETAIL DATA HUB",
    subtitle: "Transactional E-Commerce Engine",
    description: "High-integrity retail platform featuring ACID cart mutations, idempotent payment reconciliation, and RQ background task workers. Designed for resilient inventory management and low-latency transactional flows.",
    metrics: "ACID Cart Mutations · Idempotent Payments · Background Workers",
    pipeline: ["CART MUTATION", "INVENTORY LOCK", "PAYMENT GATEWAY", "IDEMPOTENT RECONCILIATION", "RQ WORKER DISPATCH"],
    tech: ["Flutter", "FastAPI", "PostgreSQL", "RQ Workers", "Redis"],
    position: [10, -1, 1],
    color: 0xf59e0b, // Amber
    routeHref: "/#projects",
    actionLabel: "EXPLORE TRANSACTION ENGINE",
  },
  {
    id: "systems-lab",
    zone: "systems",
    name: "Systems Architecture Lab",
    category: "SYSTEMS LAB // TOPOLOGY",
    subtitle: "Distributed Microservices & Data Pipelines",
    description: "Comprehensive blueprint of production system boundaries. Spans PostgreSQL Row-Level Security, Redis token-bucket rate limiters, multi-tenant database routing, Celery task distribution, and containerized Docker environments orchestrated across AWS EC2 with systemd and Nginx reverse proxies.",
    metrics: "Row-Level Security · Token-Bucket Rate Limiting · Dual-Store Sync",
    pipeline: ["NGINX REVERSE PROXY", "FASTAPI / EXPRESS ROUTER", "REDIS RATE LIMITER", "POSTGRES / SUPABASE RLS", "DOCKER SYSTEMD RUNTIME"],
    tech: ["Docker", "AWS EC2", "Nginx", "systemd", "Redis", "PostgreSQL"],
    position: [-9, 3.2, -1],
    color: 0x22c55e, // Bright Green
    routeHref: "/#services",
    actionLabel: "INSPECT SYSTEM DIAGRAMS",
  },
  {
    id: "resume-terminal",
    zone: "resume",
    name: "Resume Terminal",
    category: "TERMINAL // VERIFIED CREDENTIALS",
    subtitle: "Senior AI Developer & Full Stack Engineer",
    description: "Authoritative engineering credentials for Meghraj Goud. Senior AI Developer & Full Stack Engineer at Threshing Floor Group (July 2024 - Oct 2026). Holds B.Tech in Information Technology (2020 — 2024) from VBIT. Certified in AWS Academy Cloud Foundations & Machine Learning, Cisco Cybersecurity, Fortinet Network Security, and Celonis Process Mining.",
    metrics: "Senior AI Dev · B.Tech IT (2020 — 2024) · 4+ Industry Certifications",
    pipeline: ["VBIT B.TECH IT", "CLOUD & AI CERTS", "SENIOR AI DEVELOPER", "FULL-STACK INFRASTRUCTURE", "PRODUCTION LEADERSHIP"],
    tech: ["FastAPI", "Flutter", "Next.js", "PostgreSQL", "Redis", "Docker"],
    position: [-5, -0.8, 8],
    color: 0x38bdf8, // Sky Blue
    routeHref: "/resume",
    actionLabel: "OPEN RESUME TERMINAL",
  },
  {
    id: "network-github",
    zone: "network",
    name: "Open Source & GitHub",
    category: "NETWORK // CODE VAULT",
    subtitle: "Repositories, Architecture & Activity",
    description: "Public engineering artifacts, modular packages, frontend templates, and full-stack utilities maintained by Meghraj Goud. Direct connection to verified GitHub activity and code history.",
    metrics: "Verified Commits · Open Clean Architectures · Production Codebases",
    pipeline: ["CODE COMMIT", "GITHUB ACTIONS CI", "TEST SUITE GATES", "SECURITY AUDIT", "PRODUCTION DEPLOYMENT"],
    tech: ["TypeScript", "Python", "Dart", "Git", "GitHub Actions"],
    position: [6, -0.8, 8],
    color: 0x818cf8, // Indigo
    routeHref: "https://github.com/MeghrajGoudThigulla",
    actionLabel: "OPEN GITHUB PROFILE",
    external: true,
  },
  {
    id: "hangar-telemetry",
    zone: "hangar",
    name: "Engineering Hangar & Telemetry",
    category: "HANGAR // EXPERIMENTAL CONSOLE",
    subtitle: "Acoustics & Mechanical Dynamics Dossier",
    description: "Experimental design hangar featuring telemetry dynamics, aerodynamic downforce profiling, and secret system terminal access. Explore raw performance telemetry and hidden operational console commands.",
    metrics: "0.37 Cd Downforce · 7,500 RPM Powerband · Secret Terminal",
    pipeline: ["CHASSIS PROFILING", "DOWNFORCE MAPPING", "ACOUSTIC HARMONICS", "TELEMETRY LOGS", "DEBUG TERMINAL"],
    tech: ["Vector Dynamics", "SVG Telemetry", "Acoustic Expansion", "Console Shell"],
    position: [0, 5.5, -9],
    color: 0xec4899, // Pink
    routeHref: "/garage",
    actionLabel: "ENTER TELEMETRY GARAGE",
  },
];

export const CAMERA_ZONES: { id: WorldZone; label: string; pos: [number, number, number]; lookAt: [number, number, number]; hint: string }[] = [
  { id: "core", label: "Compute Core", pos: [0, 3.2, 9.5], lookAt: [0, 0, 0], hint: "Central machine with rotating compute rings and system status" },
  { id: "vault", label: "Project Vault", pos: [11, 3.5, -1], lookAt: [8, 0.8, -2], hint: "Physical 3D structures representing production projects" },
  { id: "systems", label: "Systems Lab", pos: [-12, 4.5, 1], lookAt: [-8, 2.2, -2], hint: "Holographic distributed architecture & topology" },
  { id: "resume", label: "Resume Terminal", pos: [-7, 0.8, 11], lookAt: [-5, -0.6, 8], hint: "Cyber terminal with verified career milestones & PDF download" },
  { id: "network", label: "Network & GitHub", pos: [8, 0.8, 11], lookAt: [6, -0.6, 8], hint: "Node-graph cluster representing open source & GitHub activity" },
  { id: "hangar", label: "Hangar & Shell", pos: [0, 7.5, -3], lookAt: [0, 4.8, -9], hint: "Experimental chamber & hidden easter-egg terminal" },
  { id: "overview", label: "Orbital Overview", pos: [0, 18, 22], lookAt: [0, 0, 0], hint: "Full panoramic skyline view of digital headquarters" },
];

export default function WorldScene3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<SystemNodeData | null>(null);
  const [activeZone, setActiveZone] = useState<WorldZone>("core");
  const [isMuted, setIsMuted] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [isExploded, setIsExploded] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1.0);
  const [themeMode, setThemeMode] = useState<"arc" | "matrix" | "cyber">("arc");
  const [viewMode2D, setViewMode2D] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      const testCanvas = document.createElement("canvas");
      const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
      return !gl;
    } catch {
      return true;
    }
  });
  const [showOperator, setShowOperator] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [booting, setBooting] = useState(true);
  const [bootStep, setBootStep] = useState(0);

  // Screen-space reticle tracking coordinates
  const [screenReticles, setScreenReticles] = useState<{ id: string; name: string; x: number; y: number; visible: boolean; color: string }[]>([]);

  // Operator chat states inside 3D world
  const [operatorInput, setOperatorInput] = useState("");
  const [operatorLoading, setOperatorLoading] = useState(false);
  const [operatorMessages, setOperatorMessages] = useState<{ sender: "user" | "operator"; text: string }[]>([
    {
      sender: "operator",
      text: "OPERATOR V1.0 CONNECTED. I am Meghraj's grounded architectural assistant. Inquire about production scale (286 endpoints, 61+ models), TFGenAPI OCR inference, IYOV AI payroll, or SecureBank fintech architecture.",
    },
  ]);

  // Terminal easter egg state
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "MEGHRAJ.OS [Version 2.4.0-PROD]",
    "Digital Operations Center Shell Ready.",
    "Type 'help' for interactive system commands.",
  ]);
  const [terminalInput, setTerminalInput] = useState("");

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const nodeMeshesRef = useRef<THREE.Mesh[]>([]);
  const explodableGroupsRef = useRef<Map<string, THREE.Group>>(new Map());
  const targetCamPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 3.2, 9.5));
  const targetLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const currentLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const rotatingRingsRef = useRef<THREE.Group[]>([]);
  const dataRainPointsRef = useRef<THREE.Points | null>(null);
  const circuitPulsesRef = useRef<{ mesh: THREE.Mesh; start: THREE.Vector3; end: THREE.Vector3; progress: number; speed: number }[]>([]);
  const scanningBeamRef = useRef<THREE.Mesh | null>(null);
  const skyDiagramsRef = useRef<THREE.Mesh[]>([]);

  // Audio Ambience toggle
  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundFX.setMuted(nextMuted);
    if (!nextMuted) {
      soundFX.playArcPulse();
      soundFX.startAmbientDrone();
    } else {
      soundFX.stopAmbientDrone();
    }
  };

  // Jump to specific zone
  const jumpToZone = useCallback((zoneId: WorldZone) => {
    setActiveZone(zoneId);
    const zoneData = CAMERA_ZONES.find((z) => z.id === zoneId) || CAMERA_ZONES[0];
    targetCamPosRef.current.set(...zoneData.pos);
    targetLookAtRef.current.set(...zoneData.lookAt);
    soundFX.playKeyClick();
  }, []);

  // Jump to specific node
  const selectNode = useCallback((node: SystemNodeData) => {
    soundFX.playTargetLock();
    setActiveNode(node);
    setActiveZone(node.zone);
    setIsExploded(false); // Reset exploded state on new node
    targetCamPosRef.current.set(node.position[0] + 3.0, node.position[1] + 1.4, node.position[2] + 4.5);
    targetLookAtRef.current.set(...node.position);
  }, []);

  // Toggle Exploded View
  const toggleExplodedView = useCallback(() => {
    const next = !isExploded;
    setIsExploded(next);
    soundFX.playExplodeFX();
  }, [isExploded]);

  // Boot sequence simulation
  useEffect(() => {
    const bootSteps = [
      "INITIALIZING SYSTEM KERNEL...",
      "MOUNTING CYBER SKYLINE ARCHITECTURE...",
      "MEGHRAJ.OS // ARCHITECTURAL RUNTIME ONLINE",
      "CORE .......... [ONLINE]",
      "PROJECT VAULT . [MOUNTED]",
      "OPERATOR RAG .. [STANDBY]",
      "SYSTEM MATRIX READY",
    ];

    let timer: NodeJS.Timeout;
    if (booting && bootStep < bootSteps.length - 1) {
      timer = setTimeout(() => {
        setBootStep((prev) => prev + 1);
        soundFX.playKeyClick();
      }, 300);
    } else if (booting && bootStep === bootSteps.length - 1) {
      timer = setTimeout(() => {
        setBooting(false);
        soundFX.playArcPulse();
        if (!isMuted) {
          soundFX.startAmbientDrone();
        }
      }, 450);
    }
    return () => clearTimeout(timer);
  }, [booting, bootStep, isMuted]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (booting) {
        if (e.key === " " || e.key === "Enter") {
          setBooting(false);
          soundFX.playArcPulse();
          if (!isMuted) soundFX.startAmbientDrone();
        }
        return;
      }

      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === "1") jumpToZone("core");
      else if (e.key === "2") jumpToZone("vault");
      else if (e.key === "3") jumpToZone("systems");
      else if (e.key === "4") jumpToZone("resume");
      else if (e.key === "5") jumpToZone("network");
      else if (e.key === "6") jumpToZone("overview");
      else if (e.key.toLowerCase() === "e") toggleExplodedView();
      else if (e.key.toLowerCase() === "o") {
        setShowOperator((prev) => !prev);
        soundFX.playKeyClick();
      } else if (e.key.toLowerCase() === "t") {
        setShowTerminal((prev) => !prev);
        soundFX.playMatrixGlitch();
      } else if (e.key.toLowerCase() === "r") {
        jumpToZone("core");
      } else if (e.key === "Escape") {
        if (activeNode) setActiveNode(null);
        else if (showOperator) setShowOperator(false);
        else if (showTerminal) setShowTerminal(false);
        else if (showTutorial) setShowTutorial(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [booting, jumpToZone, activeNode, showOperator, showTerminal, showTutorial, toggleExplodedView, isMuted]);

  // Terminal commands interpreter
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim();
    if (!cmd) return;

    soundFX.playKeyClick();
    const newHistory = [...terminalHistory, `> ${cmd}`];
    const lower = cmd.toLowerCase();

    if (lower === "help") {
      newHistory.push(
        "AVAILABLE WORLD COMMANDS:",
        "  help                 - Show command index",
        "  clear                - Clear terminal window",
        "  explode / assemble   - Toggle 3D exploded architecture view",
        "  overdrive            - Accelerate core rotation and data packet speed",
        "  normal               - Reset core velocity to normal",
        "  theme [arc|matrix|cyber] - Switch world lighting and HUD theme",
        "  focus [core|vault|systems|resume|network|hangar] - Fly camera to zone",
        "  sudo access meghraj_core --portfolio - Request root authorization key",
        "  stats                - Display telemetry and WebGL runtime metrics",
        "  exit                 - Close shell session"
      );
    } else if (lower === "clear") {
      setTerminalHistory([]);
      setTerminalInput("");
      return;
    } else if (lower === "explode") {
      setIsExploded(true);
      soundFX.playExplodeFX();
      newHistory.push("3D MODEL EXPLODED: Modular architecture layers disengaged.");
    } else if (lower === "assemble") {
      setIsExploded(false);
      soundFX.playKeyClick();
      newHistory.push("3D MODEL ASSEMBLED: Integrated structural state restored.");
    } else if (lower === "overdrive") {
      setSpeedMultiplier(2.5);
      soundFX.playArcPulse();
      newHistory.push("OVERDRIVE ENGAGED: Reactor velocity set to 2.5x.");
    } else if (lower === "normal") {
      setSpeedMultiplier(1.0);
      soundFX.playKeyClick();
      newHistory.push("Reactor velocity normalized (1.0x).");
    } else if (lower.startsWith("theme ")) {
      const mode = lower.split(" ")[1];
      if (mode === "matrix" || mode === "cyber" || mode === "arc") {
        setThemeMode(mode as "arc" | "matrix" | "cyber");
        soundFX.playMatrixGlitch();
        newHistory.push(`LIGHTING THEME SWITCHED: ${mode.toUpperCase()}`);
      } else {
        newHistory.push("Valid themes: 'arc', 'matrix', 'cyber'");
      }
    } else if (lower.startsWith("focus ")) {
      const target = lower.split(" ")[1] as WorldZone;
      if (CAMERA_ZONES.some((z) => z.id === target)) {
        jumpToZone(target);
        newHistory.push(`CAMERA VANTAGE SHIFTED TO: ${target.toUpperCase()}`);
      } else {
        newHistory.push("Unknown zone. Valid: core, vault, systems, resume, network, hangar, overview");
      }
    } else if (lower === "sudo access meghraj_core") {
      soundFX.playMatrixGlitch();
      newHistory.push("ACCESS DENIED: Root directive missing. Hint: add '--portfolio' flag.");
    } else if (lower.includes("sudo access meghraj_core --portfolio")) {
      soundFX.playArcPulse();
      newHistory.push(
        "ACCESS GRANTED.",
        "===================================================",
        "ROOT CLEARANCE: TFG-ARCHITECT-ALPHA-2026",
        "VERIFIED SYSTEM METRICS:",
        "  Endpoints: 286 Production",
        "  DB Models: 61+",
        "  Migrations: 30+ Alembic/Prisma",
        "  Mobile Apps: 4+ Published to Stores",
        "  Status: Systems Operational & Ready for Deployment",
        "==================================================="
      );
    } else if (lower === "stats") {
      newHistory.push(
        "RUNTIME TELEMETRY:",
        "  Target FPS: 60 fps",
        "  Active Skylines: 48 Cyber Towers with Beacon Lights",
        "  Matrix Stream: 1,600 active data particles",
        "  Circuit Conduits: 9 active photon packet highways",
        "  Shaders: ACESFilmicToneMapping Enabled"
      );
    } else if (lower === "exit") {
      setShowTerminal(false);
      setTerminalInput("");
      return;
    } else {
      newHistory.push(`Unknown command: '${cmd}'. Type 'help' for command reference.`);
    }

    setTerminalHistory(newHistory);
    setTerminalInput("");
  };

  // Operator chat submit handler
  const handleOperatorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = operatorInput.trim();
    if (!query || operatorLoading) return;

    soundFX.playKeyClick();
    setOperatorMessages((prev) => [...prev, { sender: "user", text: query }]);
    setOperatorInput("");
    setOperatorLoading(true);

    const apiBase = process.env.NEXT_PUBLIC_RENDER_API_URL || "";
    let reply = "Meghraj Goud is a Senior AI Developer & Full Stack Engineer with proven ownership of 286 production endpoints, 61+ database models, and 4+ commercial mobile releases.";

    try {
      if (apiBase) {
        const res = await fetch(`${apiBase}/api/operator`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        });
        if (res.ok) {
          const data = await res.json();
          reply = data.answer;
        }
      }
    } catch {
      // Local deterministic fallback
      const qLower = query.toLowerCase();
      if (qLower.includes("scale") || qLower.includes("endpoint") || qLower.includes("metric")) {
        reply = "Verified production scale: 286 endpoints, 61+ database models, 30+ Alembic/Prisma migrations, 80+ mobile screens, and sub-50ms p95 latency.";
      } else if (qLower.includes("ocr") || qLower.includes("tfgenapi") || qLower.includes("embedding")) {
        reply = "TFGenAPI implements an asynchronous inference pipeline with PyTesseract OCR and Sentence Transformers dense embeddings, stored in MongoDB Motor and scheduled via Celery/Redis.";
      } else if (qLower.includes("payroll") || qLower.includes("iyov") || qLower.includes("tax")) {
        reply = "IYOV AI features a custom India statutory payroll module automating PF, ESI, Professional Tax, and TDS rules with Redis-backed job queues and Supabase Row-Level Security.";
      } else if (qLower.includes("bank") || qLower.includes("fintech") || qLower.includes("loan")) {
        reply = "TFG SecureBank provides 70 REST endpoints, openpyxl/xlcalculator credit risk rules matrices, and WeasyPrint tamper-evident PDF loan agreement generation.";
      }
    }

    setOperatorMessages((prev) => [...prev, { sender: "operator", text: reply }]);
    setOperatorLoading(false);
    soundFX.playCyberChime();
  };

  // Three.js Scene Setup & Render Loop
  useEffect(() => {
    if (viewMode2D) return;
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement("canvas");
      const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
      if (!gl) return;
    } catch {
      return;
    }

    // 1. Scene & Environment
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const bgColor = themeMode === "matrix" ? 0x020804 : themeMode === "cyber" ? 0x08040a : 0x03060a;
    scene.background = new THREE.Color(bgColor);
    scene.fog = new THREE.FogExp2(bgColor, 0.024);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(54, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 3.2, 9.5);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambientLight);

    const primaryColor = themeMode === "matrix" ? 0x00ff66 : themeMode === "cyber" ? 0xf43f5e : 0x00f0ff;
    const secondaryColor = themeMode === "matrix" ? 0x10b981 : themeMode === "cyber" ? 0x8b5cf6 : 0x38bdf8;

    const dirLight1 = new THREE.DirectionalLight(primaryColor, 2.4);
    dirLight1.position.set(16, 28, 16);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(secondaryColor, 1.6);
    dirLight2.position.set(-16, -12, -16);
    scene.add(dirLight2);

    const coreLight = new THREE.PointLight(primaryColor, 4.0, 24);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    // 5. Procedural Cyber Skyline (48 Towering Skyscrapers around perimeter)
    const cityGroup = new THREE.Group();
    const towerMat = new THREE.MeshStandardMaterial({
      color: 0x0b111a,
      roughness: 0.8,
      metalness: 0.8,
    });
    const windowMat = new THREE.MeshBasicMaterial({
      color: primaryColor,
      transparent: true,
      opacity: 0.35,
      wireframe: true,
    });

    const towerCount = 48;
    for (let i = 0; i < towerCount; i++) {
      const angle = (i / towerCount) * Math.PI * 2;
      const dist = 32 + (i % 5) * 4.5;
      const x = Math.cos(angle) * dist;
      const z = Math.sin(angle) * dist;
      const height = 18 + (i % 7) * 4;
      const width = 3.5 + (i % 3) * 1.5;

      const tower = new THREE.Mesh(new THREE.BoxGeometry(width, height, width), towerMat);
      tower.position.set(x, height / 2 - 4.0, z);
      cityGroup.add(tower);

      // Glowing roof beacon and window frame
      const winMesh = new THREE.Mesh(new THREE.BoxGeometry(width * 1.01, height * 0.9, width * 1.01), windowMat);
      winMesh.position.set(x, height / 2 - 4.0, z);
      cityGroup.add(winMesh);

      // Roof Antenna Mast
      const mast = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.08, 4, 6),
        new THREE.MeshBasicMaterial({ color: secondaryColor })
      );
      mast.position.set(x, height - 3.8, z);
      cityGroup.add(mast);
    }
    scene.add(cityGroup);

    // 6. Ground Cyber Floor & Concentric Energy Circles
    const gridHelper = new THREE.GridHelper(100, 60, primaryColor, 0x0f172a);
    gridHelper.position.y = -3.8;
    (gridHelper.material as THREE.Material).opacity = 0.25;
    (gridHelper.material as THREE.Material).transparent = true;
    scene.add(gridHelper);

    [6, 12, 18, 26, 36].forEach((radius) => {
      const ringGeo = new THREE.RingGeometry(radius - 0.06, radius + 0.06, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: primaryColor,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.18,
      });
      const floorRing = new THREE.Mesh(ringGeo, ringMat);
      floorRing.rotation.x = Math.PI / 2;
      floorRing.position.y = -3.78;
      scene.add(floorRing);
    });

    // 7. Drifting Holographic Sky Diagrams
    skyDiagramsRef.current = [];
    [-1, 1].forEach((dir) => {
      const diagramGeo = new THREE.PlaneGeometry(16, 10, 8, 8);
      const diagramMat = new THREE.MeshBasicMaterial({
        color: primaryColor,
        wireframe: true,
        transparent: true,
        opacity: 0.12,
        side: THREE.DoubleSide,
      });
      const diagramMesh = new THREE.Mesh(diagramGeo, diagramMat);
      diagramMesh.position.set(dir * 14, 22, -10);
      diagramMesh.rotation.x = Math.PI / 3;
      scene.add(diagramMesh);
      skyDiagramsRef.current.push(diagramMesh);
    });

    // 8. Signature Central Machine ("MEGHRAJ // COMPUTE CORE")
    const coreGroup = new THREE.Group();
    coreGroup.position.set(0, 0, 0);

    // Heavy octagonal base pedestal
    const pedestalGeo = new THREE.CylinderGeometry(3.6, 4.0, 0.8, 8);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x0d1520,
      metalness: 0.9,
      roughness: 0.2,
      emissive: primaryColor,
      emissiveIntensity: 0.15,
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = -3.4;
    coreGroup.add(pedestal);

    // Central pulsing energy octahedron
    const coreInnerGeo = new THREE.OctahedronGeometry(1.3, 0);
    const coreInnerMat = new THREE.MeshStandardMaterial({
      color: primaryColor,
      emissive: primaryColor,
      emissiveIntensity: 0.8,
      metalness: 0.9,
      roughness: 0.1,
    });
    const coreInnerMesh = new THREE.Mesh(coreInnerGeo, coreInnerMat);
    coreGroup.add(coreInnerMesh);

    // Outer wireframe cage
    const coreCageGeo = new THREE.IcosahedronGeometry(2.0, 1);
    const coreCageMat = new THREE.MeshBasicMaterial({
      color: secondaryColor,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    coreGroup.add(new THREE.Mesh(coreCageGeo, coreCageMat));

    // Concentric Gyroscope Rings
    rotatingRingsRef.current = [];
    [2.4, 2.9, 3.4].forEach((r, idx) => {
      const gRingGeo = new THREE.TorusGeometry(r, 0.035, 12, 64);
      const gRingMat = new THREE.MeshStandardMaterial({
        color: idx === 1 ? secondaryColor : primaryColor,
        emissive: idx === 1 ? secondaryColor : primaryColor,
        emissiveIntensity: 0.5,
        roughness: 0.2,
      });
      const gRingMesh = new THREE.Mesh(gRingGeo, gRingMat);
      if (idx === 0) gRingMesh.rotation.x = Math.PI / 3;
      if (idx === 1) gRingMesh.rotation.y = Math.PI / 4;
      if (idx === 2) gRingMesh.rotation.z = Math.PI / 6;

      const ringWrapper = new THREE.Group();
      ringWrapper.add(gRingMesh);
      coreGroup.add(ringWrapper);
      rotatingRingsRef.current.push(ringWrapper);
    });

    // 4 Flanking Energy Pylon Columns
    for (let c = 0; c < 4; c++) {
      const angle = (c * Math.PI) / 2;
      const colX = Math.cos(angle) * 4.2;
      const colZ = Math.sin(angle) * 4.2;
      const col = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.06, 8.5, 8),
        new THREE.MeshBasicMaterial({ color: primaryColor, transparent: true, opacity: 0.4 })
      );
      col.position.set(colX, 0, colZ);
      coreGroup.add(col);
    }

    // Overhead Beacon Beam shooting into skyline
    const beacon = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.2, 45, 8),
      new THREE.MeshBasicMaterial({ color: primaryColor, transparent: true, opacity: 0.25 })
    );
    beacon.position.set(0, 20, 0);
    coreGroup.add(beacon);

    scene.add(coreGroup);

    // 9. Matrix Falling Digital Rain Particles
    const rainCount = 1600;
    const rainPositions = new Float32Array(rainCount * 3);
    const rainVelocities = new Float32Array(rainCount);
    for (let i = 0; i < rainCount; i++) {
      rainPositions[i * 3] = (Math.random() - 0.5) * 70;
      rainPositions[i * 3 + 1] = Math.random() * 45 - 5;
      rainPositions[i * 3 + 2] = (Math.random() - 0.5) * 70;
      rainVelocities[i] = 0.08 + Math.random() * 0.16;
    }
    const rainGeo = new THREE.BufferGeometry();
    rainGeo.setAttribute("position", new THREE.BufferAttribute(rainPositions, 3));
    const rainMat = new THREE.PointsMaterial({
      color: themeMode === "matrix" ? 0x00ff66 : primaryColor,
      size: 0.16,
      transparent: true,
      opacity: 0.7,
    });
    const rainPoints = new THREE.Points(rainGeo, rainMat);
    scene.add(rainPoints);
    dataRainPointsRef.current = rainPoints;

    // 10. Distinct Procedural Mechanical 3D Rigs for Each Project
    nodeMeshesRef.current = [];
    explodableGroupsRef.current.clear();
    circuitPulsesRef.current = [];

    SYSTEM_NODES.forEach((node) => {
      const nodeMasterGroup = new THREE.Group();
      nodeMasterGroup.position.set(...node.position);

      const explodableGroup = new THREE.Group();
      nodeMasterGroup.add(explodableGroup);
      explodableGroupsRef.current.set(node.id, explodableGroup);

      const nodeMat = new THREE.MeshStandardMaterial({
        color: node.color,
        roughness: 0.2,
        metalness: 0.85,
        emissive: node.color,
        emissiveIntensity: 0.5,
      });

      // Custom 3D mechanical architecture per project
      if (node.id === "tfgenapi") {
        // Twin-pillar Gateway Monolith + Scanning laser
        const leftPillar = new THREE.Mesh(new THREE.BoxGeometry(0.4, 2.4, 0.4), nodeMat);
        leftPillar.position.set(-0.8, 0, 0);
        explodableGroup.add(leftPillar);

        const rightPillar = new THREE.Mesh(new THREE.BoxGeometry(0.4, 2.4, 0.4), nodeMat);
        rightPillar.position.set(0.8, 0, 0);
        explodableGroup.add(rightPillar);

        const topArch = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.3, 0.4), nodeMat);
        topArch.position.set(0, 1.2, 0);
        explodableGroup.add(topArch);

        const centerPrism = new THREE.Mesh(new THREE.OctahedronGeometry(0.6, 0), nodeMat);
        centerPrism.userData = { nodeData: node };
        explodableGroup.add(centerPrism);
        nodeMeshesRef.current.push(centerPrism);

        // Animated Horizontal Scanning Laser Beam
        const beam = new THREE.Mesh(
          new THREE.CylinderGeometry(0.03, 0.03, 1.8, 8),
          new THREE.MeshBasicMaterial({ color: 0xff0055 })
        );
        beam.rotation.z = Math.PI / 2;
        explodableGroup.add(beam);
        scanningBeamRef.current = beam;
      } else if (node.id === "securebank") {
        // Reinforced Hexagonal Fortress Vault + Concentric Gear Rings
        const vaultBody = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, 1.4, 6), nodeMat);
        vaultBody.userData = { nodeData: node };
        explodableGroup.add(vaultBody);
        nodeMeshesRef.current.push(vaultBody);

        const lockRing = new THREE.Mesh(
          new THREE.TorusGeometry(1.4, 0.06, 6, 12),
          new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.9 })
        );
        lockRing.rotation.x = Math.PI / 2;
        explodableGroup.add(lockRing);

        const innerKey = new THREE.Mesh(new THREE.OctahedronGeometry(0.5, 0), new THREE.MeshBasicMaterial({ color: 0xffd700 }));
        explodableGroup.add(innerKey);
      } else if (node.id === "iyov-ai") {
        // 4-Tier Hierarchical Computational Tower (Attendance -> Rules -> Queue -> Mobile)
        const tierSizes = [1.2, 0.9, 0.65, 0.45];
        tierSizes.forEach((sz, idx) => {
          const tier = new THREE.Mesh(new THREE.BoxGeometry(sz, 0.25, sz), nodeMat);
          tier.position.y = (idx - 1.5) * 0.45;
          if (idx === 1) tier.userData = { nodeData: node };
          explodableGroup.add(tier);
          if (idx === 1) nodeMeshesRef.current.push(tier);
        });

        // 4 Orbiting Satellite Nodes (Mobile companion apps)
        for (let s = 0; s < 4; s++) {
          const sAngle = (s * Math.PI) / 2;
          const sat = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 8), new THREE.MeshBasicMaterial({ color: 0x10b981 }));
          sat.position.set(Math.cos(sAngle) * 1.6, 0, Math.sin(sAngle) * 1.6);
          explodableGroup.add(sat);
        }
      } else if (node.id === "medical-advisor") {
        // Medical Biometric Cross & Concentric Health Rings
        const crossH = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.4, 0.4), nodeMat);
        const crossV = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1.6, 0.4), nodeMat);
        crossH.userData = { nodeData: node };
        explodableGroup.add(crossH);
        explodableGroup.add(crossV);
        nodeMeshesRef.current.push(crossH);

        const medRing = new THREE.Mesh(
          new THREE.TorusGeometry(1.2, 0.04, 8, 32),
          new THREE.MeshBasicMaterial({ color: 0x06b6d4, wireframe: true })
        );
        explodableGroup.add(medRing);
      } else {
        // Standard high-tech polyhedra with orbital ring
        const mainMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(1.0, 1), nodeMat);
        mainMesh.userData = { nodeData: node };
        explodableGroup.add(mainMesh);
        nodeMeshesRef.current.push(mainMesh);

        const orbRing = new THREE.Mesh(
          new THREE.TorusGeometry(1.6, 0.03, 8, 32),
          new THREE.MeshBasicMaterial({ color: node.color, wireframe: true, transparent: true, opacity: 0.45 })
        );
        orbRing.rotation.x = Math.PI / 2;
        explodableGroup.add(orbRing);
      }

      scene.add(nodeMasterGroup);

      // Connecting Neon Circuit Trace from Core to Node
      const startPt = new THREE.Vector3(0, -3.7, 0);
      const endPt = new THREE.Vector3(node.position[0], -3.7, node.position[2]);
      const lineGeo = new THREE.BufferGeometry().setFromPoints([startPt, endPt]);
      const lineMesh = new THREE.Line(
        lineGeo,
        new THREE.LineBasicMaterial({ color: node.color, transparent: true, opacity: 0.35 })
      );
      scene.add(lineMesh);

      // Traveling Photon / Data Packet on Circuit Highway
      const packet = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 8, 8),
        new THREE.MeshBasicMaterial({ color: node.color })
      );
      packet.position.copy(startPt);
      scene.add(packet);
      circuitPulsesRef.current.push({
        mesh: packet,
        start: startPt,
        end: endPt,
        progress: Math.random(),
        speed: 0.008 + Math.random() * 0.008,
      });
    });

    // 11. Raycasting for Interaction & Cursor Hover
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerDown = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeMeshesRef.current);

      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object as THREE.Mesh;
        const data = clickedMesh.userData.nodeData as SystemNodeData;
        if (data) {
          selectNode(data);
        }
      }
    };
    container.addEventListener("pointerdown", onPointerDown);

    // 12. Mouse Drag Orbit Controls with Parallax
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = (e.clientX - prevMouseX) * 0.005;
      const dy = (e.clientY - prevMouseY) * 0.005;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      targetCamPosRef.current.x += dx * 10;
      targetCamPosRef.current.y -= dy * 7;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // 13. Window Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // 14. Master Animation Loop (60 FPS)
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime() * speedMultiplier;

      // Rotate Gimbal Rings
      if (rotatingRingsRef.current.length === 3) {
        rotatingRingsRef.current[0].rotation.x = elapsedTime * 0.55;
        rotatingRingsRef.current[1].rotation.y = elapsedTime * 0.45;
        rotatingRingsRef.current[2].rotation.z = elapsedTime * 0.35;
      }

      // Rotate Drifting Sky Diagrams
      skyDiagramsRef.current.forEach((diagram, idx) => {
        diagram.rotation.z = elapsedTime * 0.05 * (idx === 0 ? 1 : -1);
      });

      // Animate Scanning Beam on TFGenAPI
      if (scanningBeamRef.current) {
        scanningBeamRef.current.position.y = Math.sin(elapsedTime * 2.5) * 1.1;
      }

      // Rotate and Pulse Explodable Node Rigs
      explodableGroupsRef.current.forEach((grp, key) => {
        grp.rotation.y = elapsedTime * 0.4;

        // Explode / Deconstruct Animation: separate children outward when active & exploded
        const isThisNodeExploded = isExploded && activeNode?.id === key;
        const targetScale = isThisNodeExploded ? 1.6 : 1.0;
        grp.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.06);

        grp.children.forEach((child, cIdx) => {
          if (isThisNodeExploded) {
            const explodeOffset = (cIdx - (grp.children.length - 1) / 2) * 0.35;
            child.position.y = THREE.MathUtils.lerp(child.position.y, explodeOffset, 0.06);
          }
        });
      });

      // Animate Matrix Falling Rain Particles
      if (dataRainPointsRef.current) {
        const positions = dataRainPointsRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < rainCount; i++) {
          positions[i * 3 + 1] -= rainVelocities[i] * speedMultiplier;
          if (positions[i * 3 + 1] < -3.8) {
            positions[i * 3 + 1] = 35.0; // Reset back to top
          }
        }
        dataRainPointsRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Animate Traveling Circuit Pulses
      circuitPulsesRef.current.forEach((pulse) => {
        pulse.progress += pulse.speed * speedMultiplier;
        if (pulse.progress > 1.0) pulse.progress = 0;
        pulse.mesh.position.lerpVectors(pulse.start, pulse.end, pulse.progress);
      });

      // Smooth Camera Interpolation (Slerp)
      camera.position.lerp(targetCamPosRef.current, 0.045);
      currentLookAtRef.current.lerp(targetLookAtRef.current, 0.055);
      camera.lookAt(currentLookAtRef.current);

      // Compute Screen-space 2D Holographic Reticles for HUD
      const reticleCoords = SYSTEM_NODES.map((n) => {
        const v = new THREE.Vector3(...n.position);
        v.project(camera);
        const isVisible = v.z < 1.0 && v.x > -1.1 && v.x < 1.1 && v.y > -1.1 && v.y < 1.1;
        const screenX = (v.x * 0.5 + 0.5) * container.clientWidth;
        const screenY = (-v.y * 0.5 + 0.5) * container.clientHeight;
        return {
          id: n.id,
          name: n.name,
          x: Math.round(screenX),
          y: Math.round(screenY),
          visible: isVisible,
          color: `#${n.color.toString(16).padStart(6, "0")}`,
        };
      });
      setScreenReticles(reticleCoords);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [viewMode2D, selectNode, isExploded, activeNode, speedMultiplier, themeMode]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#03060a] text-slate-100 font-mono select-none">
      {/* 1. Cinematic Boot Loading Screen */}
      {booting && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 p-6 font-mono text-cyan-400">
          <div className="w-full max-w-md rounded-2xl border border-cyan-500/40 bg-[#080B10] p-6 shadow-2xl hud-bracket">
            <div className="flex items-center justify-between border-b border-cyan-950 pb-3">
              <span className="text-xs font-bold tracking-widest uppercase">MEGHRAJ.OS // BOOT KERNEL</span>
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            </div>

            <div className="mt-4 space-y-2 text-xs font-mono">
              <p className="text-emerald-400">&gt; INITIALIZING DISTRIBUTED SYSTEM WORLD...</p>
              <p className="text-slate-400">&gt; MOUNTING CYBER METROPOLIS &amp; 48 SKYLINE TOWERS</p>
              <p className="text-slate-300">&gt; COMPUTE CORE (286 ENDPOINTS) ONLINE</p>
              <p className="text-cyan-300">&gt; HOLOGRAPHIC WORKSHOP HUD CALIBRATED</p>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setBooting(false);
                  soundFX.playArcPulse();
                  if (!isMuted) soundFX.startAmbientDrone();
                }}
                className="w-full rounded-xl bg-cyan-500 py-3 text-xs font-bold text-black hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)]"
              >
                [ ENTER OPERATIONS CENTER ]
              </button>
              <p className="text-center text-[10px] text-slate-500">Press SPACE or click above to skip sequence</p>
            </div>
          </div>
        </div>
      )}

      {/* 2. Three.js Canvas Container (Active in 3D Mode) */}
      {!viewMode2D && (
        <div ref={mountRef} className="absolute inset-0 h-full w-full cursor-grab active:cursor-grabbing" />
      )}

      {/* 3. Screen-Space Projected Reticles (Iron Man HUD Targets) */}
      {!viewMode2D && !activeNode && !booting && (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {screenReticles.map((reticle) => {
            if (!reticle.visible) return null;
            return (
              <div
                key={reticle.id}
                style={{
                  transform: `translate(${reticle.x}px, ${reticle.y}px)`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
              >
                <div className="group/reticle relative flex flex-col items-center">
                  <div
                    style={{ borderColor: reticle.color }}
                    className="h-6 w-6 rounded-full border border-dashed opacity-50 group-hover/reticle:opacity-100 group-hover/reticle:scale-125 transition-all"
                  />
                  <div className="pointer-events-auto mt-1 cursor-pointer rounded border border-black/80 bg-black/75 px-1.5 py-0.5 text-[9px] font-mono font-bold text-slate-300 backdrop-blur-sm hover:text-white">
                    {reticle.name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 4. Accessible 2D Digital Headquarters (Fallback Mode) */}
      {viewMode2D && (
        <div className="absolute inset-0 z-10 overflow-y-auto p-4 sm:p-8 bg-[#06080e] text-slate-200">
          <div className="mx-auto max-w-5xl space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cyan-900/50 pb-4">
              <div>
                <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">
                  STANDARD HQ MODE // ACCESSIBLE DASHBOARD
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold font-sans text-white">
                  Meghraj Goud · Operations Center
                </h1>
              </div>
              <button
                type="button"
                onClick={() => setViewMode2D(false)}
                className="rounded-xl border border-cyan-500/40 bg-cyan-950/40 px-4 py-2 text-xs font-bold text-cyan-300 hover:bg-cyan-500 hover:text-black transition-all"
              >
                SWITCH TO 3D WORLD
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SYSTEM_NODES.map((node) => (
                <div
                  key={node.id}
                  className="rounded-2xl border border-cyan-500/20 bg-[#080B10]/90 p-5 shadow-lg transition-all hover:border-cyan-500/50"
                >
                  <span className="text-[10px] font-bold tracking-wider text-cyan-400 uppercase">
                    {node.category}
                  </span>
                  <h2 className="mt-1 text-lg font-bold font-sans text-white">{node.name}</h2>
                  <p className="text-xs text-slate-400 mt-0.5">{node.subtitle}</p>
                  <p className="mt-3 text-xs leading-relaxed text-slate-300">{node.description}</p>
                  <div className="mt-3 rounded-lg border border-cyan-500/20 bg-cyan-950/30 p-2 text-[11px] text-cyan-300 font-bold">
                    ⚡ {node.metrics}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {node.tech.map((t) => (
                      <span key={t} className="rounded bg-cyan-950/40 px-2 py-0.5 text-[9px] text-cyan-300 border border-cyan-900/50">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800">
                    <Link
                      href={node.routeHref}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-white"
                      target={node.external ? "_blank" : undefined}
                      rel={node.external ? "noopener noreferrer" : undefined}
                    >
                      <span>{node.actionLabel || "OPEN SPEC"}</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. Top Header HUD Bar */}
      <header className="absolute inset-x-0 top-0 z-20 flex flex-wrap items-center justify-between gap-4 p-4 sm:p-6 bg-gradient-to-b from-black/85 via-black/40 to-transparent pointer-events-auto">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-[#080B10]/85 px-3.5 py-2 text-xs font-bold text-cyan-300 hover:border-cyan-400 hover:text-white transition-all backdrop-blur-md"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>PORTFOLIO</span>
          </Link>

          <div className="hidden md:flex items-center gap-2 rounded-xl border border-cyan-500/20 bg-[#080B10]/80 px-3 py-1.5 text-[11px] text-slate-300 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>MEGHRAJ // DIGITAL HEADQUARTERS</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Exploded Architecture Toggle (Tony Stark Mode) */}
          <button
            type="button"
            onClick={toggleExplodedView}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-bold transition-all backdrop-blur-md ${
              isExploded
                ? "border-amber-400 bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                : "border-slate-700/60 bg-[#080B10]/85 text-slate-300 hover:border-amber-500/40 hover:text-amber-300"
            }`}
            title="Toggle Exploded Architecture View [E]"
          >
            <Layers className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{isExploded ? "ASSEMBLE [E]" : "EXPLODE [E]"}</span>
          </button>

          {/* AI Operator Trigger */}
          <button
            type="button"
            onClick={() => {
              setShowOperator((prev) => !prev);
              soundFX.playKeyClick();
            }}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-bold transition-all backdrop-blur-md ${
              showOperator
                ? "border-cyan-400 bg-cyan-500 text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                : "border-cyan-500/40 bg-[#080B10]/85 text-cyan-300 hover:border-cyan-400"
            }`}
          >
            <Bot className="h-3.5 w-3.5" />
            <span>OPERATOR [O]</span>
          </button>

          {/* Secret Hangar Terminal Trigger */}
          <button
            type="button"
            onClick={() => {
              setShowTerminal((prev) => !prev);
              soundFX.playMatrixGlitch();
            }}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-bold transition-all backdrop-blur-md ${
              showTerminal
                ? "border-emerald-400 bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                : "border-slate-700/60 bg-[#080B10]/85 text-slate-300 hover:border-emerald-500/40 hover:text-emerald-300"
            }`}
          >
            <Terminal className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">TERMINAL [T]</span>
          </button>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700/60 bg-[#080B10]/80 px-3 py-1.5 text-xs text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors backdrop-blur-md"
            title="Toggle Sound FX & Reactor Drone"
          >
            {isMuted ? <VolumeX className="h-3.5 w-3.5 text-red-400" /> : <Volume2 className="h-3.5 w-3.5 text-cyan-400" />}
            <span className="hidden sm:inline">{isMuted ? "MUTED" : "AUDIO"}</span>
          </button>

          {/* 2D / 3D Mode Toggle */}
          <button
            type="button"
            onClick={() => setViewMode2D((prev) => !prev)}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700/60 bg-[#080B10]/80 px-3 py-1.5 text-xs text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors backdrop-blur-md"
            title="Toggle 2D / 3D Representation"
          >
            <Monitor className="h-3.5 w-3.5 text-cyan-400" />
            <span className="hidden sm:inline">{viewMode2D ? "3D MODE" : "2D MODE"}</span>
          </button>

          {/* Help Tutorial */}
          <button
            type="button"
            onClick={() => setShowTutorial(true)}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700/60 bg-[#080B10]/80 px-2.5 py-1.5 text-xs text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors backdrop-blur-md"
            title="Controls & Instructions"
          >
            <HelpCircle className="h-3.5 w-3.5 text-amber-400" />
          </button>

          {/* Reset Camera */}
          <button
            type="button"
            onClick={() => jumpToZone("core")}
            className="rounded-lg border border-slate-700/60 bg-[#080B10]/80 p-2 text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors backdrop-blur-md"
            title="Reset Camera View [R]"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </header>

      {/* 6. Spatial Location Telemetry HUD */}
      <div className="absolute left-6 top-24 z-20 pointer-events-none hidden sm:block">
        <div className="rounded-xl border border-cyan-500/25 bg-[#080B10]/90 p-4 backdrop-blur-md shadow-2xl hud-bracket">
          <div className="flex items-center gap-2 text-[10px] text-cyan-400 tracking-widest font-bold">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>OPERATIONS MATRIX // LIVE</span>
          </div>
          <h1 className="mt-1 text-sm font-bold text-white uppercase tracking-wider font-sans">
            MEGHRAJ // DIGITAL HEADQUARTERS
          </h1>
          <p className="mt-0.5 text-[10px] text-slate-400">
            Current Zone: <span className="text-cyan-300 font-bold uppercase">{activeZone}</span> · Core: <span className="text-emerald-400 font-bold">ONLINE</span>
          </p>
          <div className="mt-2 text-[10px] text-slate-500 flex items-center gap-2">
            <span>[1-6] Zones</span>
            <span>•</span>
            <span>[E] Explode</span>
            <span>•</span>
            <span>[O] Operator</span>
            <span>•</span>
            <span>[T] Shell</span>
            <span>•</span>
            <span>[R] Reset</span>
          </div>
        </div>
      </div>

      {/* 7. Zone Spatial Navigation Dock (Bottom) */}
      <nav
        aria-label="Zone Navigation"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-wrap items-center justify-center gap-1.5 rounded-2xl border border-cyan-500/30 bg-[#080B10]/95 p-2 backdrop-blur-md shadow-2xl max-w-[94vw] overflow-x-auto"
      >
        {CAMERA_ZONES.map((zone, idx) => (
          <button
            key={zone.id}
            type="button"
            onClick={() => jumpToZone(zone.id)}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-mono font-bold transition-all shrink-0 ${
              activeZone === zone.id
                ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                : "text-slate-300 hover:bg-white/5 hover:text-cyan-300"
            }`}
          >
            <kbd className="text-[10px] opacity-70">[{idx + 1}]</kbd>
            <span>{zone.label}</span>
          </button>
        ))}
      </nav>

      {/* 8. Tony Stark Workshop Holographic Dossier Modal */}
      {activeNode && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="node-modal-title"
        >
          <div className="relative w-full max-w-2xl rounded-2xl border border-cyan-500/50 bg-[#080B10] p-6 sm:p-8 shadow-[0_0_50px_rgba(0,240,255,0.2)] hud-bracket max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-cyan-950 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-cyan-400">
                    {activeNode.category}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                </div>
                <h2 id="node-modal-title" className="mt-1 text-2xl sm:text-3xl font-bold font-sans text-white">
                  {activeNode.name}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">{activeNode.subtitle}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleExplodedView}
                  className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] font-bold font-mono transition-all ${
                    isExploded
                      ? "border-amber-400 bg-amber-500 text-black"
                      : "border-slate-700 bg-slate-800 text-slate-300 hover:border-amber-400 hover:text-amber-300"
                  }`}
                  title="Explode 3D Model Layers"
                >
                  <Layers className="h-3.5 w-3.5" />
                  <span>{isExploded ? "ASSEMBLE" : "EXPLODE"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveNode(null)}
                  className="rounded-lg border border-slate-700 bg-slate-800 p-2 text-slate-400 hover:text-white hover:border-cyan-400 transition-colors"
                  aria-label="Close dossier"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Metrics Badge */}
            <div className="mt-4 rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-3.5 text-xs text-cyan-300 font-bold flex items-center justify-between">
              <span>⚡ {activeNode.metrics}</span>
              <Sparkles className="h-4 w-4 text-cyan-400 shrink-0" />
            </div>

            {/* Iron Man Architecture Pipeline Flowchart */}
            {activeNode.pipeline && activeNode.pipeline.length > 0 && (
              <div className="mt-5 rounded-xl border border-slate-800 bg-black/50 p-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  SYSTEM PIPELINE FLOW
                </span>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] font-mono">
                  {activeNode.pipeline.map((step, sIdx) => (
                    <div key={step} className="flex items-center gap-2">
                      <span className="rounded-lg border border-cyan-500/40 bg-cyan-950/40 px-2.5 py-1 text-cyan-300 font-bold">
                        {step}
                      </span>
                      {sIdx < activeNode.pipeline!.length - 1 && (
                        <span className="text-slate-500">&rarr;</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Narrative Description */}
            <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-mono">
              {activeNode.description}
            </p>

            {/* Stack Tags */}
            <div className="mt-5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                VERIFIED TECH STACK
              </span>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {activeNode.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded border border-cyan-500/30 bg-cyan-950/40 px-2.5 py-1 font-mono text-[10px] text-cyan-300 font-bold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-wrap items-center justify-end gap-3 border-t border-cyan-950 pt-4">
              <button
                type="button"
                onClick={() => setActiveNode(null)}
                className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 font-mono text-xs text-slate-300 hover:bg-slate-700 transition-colors"
              >
                DISMISS
              </button>
              <Link
                href={activeNode.routeHref}
                target={activeNode.external ? "_blank" : undefined}
                rel={activeNode.external ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-500 px-4 py-2 font-mono text-xs font-bold text-black hover:bg-cyan-400 transition-colors shadow-[0_0_15px_rgba(0,240,255,0.3)]"
              >
                <span>{activeNode.actionLabel || "OPEN PROJECT SPEC"}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 9. In-World Holographic AI Operator Console */}
      {showOperator && (
        <aside
          aria-label="Operator Console"
          className="fixed right-0 inset-y-0 z-40 w-full sm:w-96 border-l border-cyan-500/40 bg-[#080B10]/95 p-6 backdrop-blur-xl shadow-2xl flex flex-col justify-between hud-bracket"
        >
          <div>
            <div className="flex items-center justify-between border-b border-cyan-950 pb-4">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-cyan-400" />
                <div>
                  <h2 className="text-sm font-bold font-sans text-white">THE OPERATOR V1</h2>
                  <p className="text-[10px] text-emerald-400">GROUNDED PORTFOLIO RAG</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowOperator(false)}
                className="rounded-lg border border-slate-700 p-1.5 text-slate-400 hover:text-white"
                aria-label="Close operator"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Quick Questions */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {[
                "Production scale?",
                "TFGenAPI inference pipeline?",
                "IYOV AI statutory payroll?",
                "SecureBank fintech rules?",
              ].map((pill) => (
                <button
                  key={pill}
                  type="button"
                  onClick={() => {
                    setOperatorInput(pill);
                  }}
                  className="rounded-lg border border-cyan-500/20 bg-cyan-950/20 px-2 py-1 text-[10px] text-cyan-300 hover:border-cyan-400 transition-colors"
                >
                  {pill}
                </button>
              ))}
            </div>

            {/* Messages Scroll Area */}
            <div className="mt-4 space-y-3 max-h-[50vh] overflow-y-auto pr-1 text-xs">
              {operatorMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`rounded-xl p-3 leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-cyan-500/10 border border-cyan-500/30 text-cyan-200 ml-4"
                      : "bg-slate-900/80 border border-slate-800 text-slate-200 mr-4"
                  }`}
                >
                  <span className="block text-[9px] font-bold text-slate-500 uppercase mb-1">
                    {msg.sender === "user" ? "GUEST INQUIRY" : "OPERATOR DISPATCH"}
                  </span>
                  {msg.text}
                </div>
              ))}
              {operatorLoading && (
                <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3 text-cyan-400 text-xs animate-pulse">
                  Querying grounded knowledge base...
                </div>
              )}
            </div>
          </div>

          {/* Input Form */}
          <form onSubmit={handleOperatorSubmit} className="mt-4 pt-3 border-t border-cyan-950 flex gap-2">
            <input
              type="text"
              value={operatorInput}
              onChange={(e) => setOperatorInput(e.target.value)}
              placeholder="Ask about scale, architecture..."
              className="flex-1 rounded-xl border border-cyan-500/30 bg-black/50 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
            />
            <button
              type="submit"
              disabled={operatorLoading || !operatorInput.trim()}
              className="rounded-xl bg-cyan-500 px-3 py-2 text-xs font-bold text-black hover:bg-cyan-400 disabled:opacity-50 transition-colors"
              aria-label="Send query to operator"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </aside>
      )}

      {/* 10. Secret Experimental Hangar Shell Terminal Modal */}
      {showTerminal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="terminal-title"
        >
          <div className="relative w-full max-w-2xl rounded-2xl border border-emerald-500/50 bg-[#020508] p-5 shadow-[0_0_50px_rgba(16,185,129,0.2)] hud-bracket font-mono text-emerald-400">
            <div className="flex items-center justify-between border-b border-emerald-950 pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-emerald-400" />
                <span id="terminal-title" className="text-xs font-bold tracking-widest uppercase">
                  MEGHRAJ.OS // OPERATIONAL SHELL
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowTerminal(false)}
                className="rounded-lg border border-emerald-900 p-1 text-emerald-400 hover:text-white"
                aria-label="Close shell"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Terminal History */}
            <div className="mt-4 max-h-[45vh] overflow-y-auto space-y-1.5 text-xs text-emerald-300 font-mono pr-2">
              {terminalHistory.map((line, idx) => (
                <div key={idx} className="whitespace-pre-wrap leading-relaxed">
                  {line}
                </div>
              ))}
            </div>

            {/* Terminal Input */}
            <form onSubmit={handleTerminalSubmit} className="mt-4 pt-3 border-t border-emerald-950 flex items-center gap-2">
              <span className="text-emerald-500 font-bold">&gt;</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="type 'help', 'explode', 'overdrive', or 'theme matrix'..."
                autoFocus
                className="flex-1 bg-transparent text-xs text-emerald-300 placeholder-emerald-800 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded border border-emerald-500/40 px-2.5 py-1 text-[11px] font-bold text-emerald-300 hover:bg-emerald-500 hover:text-black transition-colors"
              >
                EXEC
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 11. Tutorial Modal */}
      {showTutorial && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="tutorial-modal-title"
        >
          <div className="relative w-full max-w-md rounded-2xl border border-cyan-500/40 bg-[#080B10] p-6 text-slate-200 shadow-2xl hud-bracket">
            <h3 id="tutorial-modal-title" className="text-lg font-bold text-white font-sans">
              Operations Center Manual
            </h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed font-mono">
              Welcome to Meghraj&apos;s digital headquarters. Navigate 7 core engineering spaces, inspect physical 3D project exhibits, or converse with the AI Operator.
            </p>

            <div className="mt-4 space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between border-b border-slate-800 py-1.5">
                <span className="text-slate-400">Orbit / Look Around:</span>
                <span className="text-cyan-300">Drag with Mouse</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800 py-1.5">
                <span className="text-slate-400">Zone Vantage Points:</span>
                <span className="text-cyan-300">Keys [1] – [6]</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800 py-1.5">
                <span className="text-slate-400">Exploded Architecture View:</span>
                <span className="text-amber-300">Key [E]</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800 py-1.5">
                <span className="text-slate-400">AI Operator Console:</span>
                <span className="text-cyan-300">Key [O]</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800 py-1.5">
                <span className="text-slate-400">Secret Terminal Shell:</span>
                <span className="text-cyan-300">Key [T]</span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-slate-400">Reset Orbit:</span>
                <span className="text-cyan-300">Key [R]</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowTutorial(false)}
              className="mt-6 w-full rounded-xl bg-cyan-500 py-2.5 font-mono text-xs font-bold text-black hover:bg-cyan-400 transition-colors shadow-[0_0_15px_rgba(0,240,255,0.4)]"
            >
              ENTER OPERATIONS CENTER
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
