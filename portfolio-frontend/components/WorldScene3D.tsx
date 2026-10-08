"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import * as THREE from "three";
import { soundFX } from "@/lib/sound";
import { ArrowLeft, Volume2, VolumeX, Eye, HelpCircle, RotateCcw, X, ExternalLink } from "lucide-react";

type SystemNodeData = {
  id: string;
  name: string;
  category: string;
  description: string;
  metrics: string;
  tech: string[];
  position: [number, number, number];
  color: number;
  routeHref: string;
};

const SYSTEM_NODES: SystemNodeData[] = [
  {
    id: "gateway",
    name: "Core Gateway",
    category: "DISTRIBUTED API PLATFORM",
    description: "High-concurrency API platform routing hundreds of thousands of daily records across PostgreSQL and legacy databases. Features database-level deduplication CTEs, connection pool tuning, and sub-50ms p95 latencies.",
    metrics: "286 Production Endpoints · Sub-50ms p95 Latency",
    tech: ["FastAPI", "Express 5", "PostgreSQL", "Redis", "Docker"],
    position: [0, 0, 0],
    color: 0x00f0ff, // Arc Cyan
    routeHref: "/#projects",
  },
  {
    id: "inference",
    name: "Inference Reactor",
    category: "AI & ML MODEL SERVING GATEWAY",
    description: "Custom document verification and OCR inference engine. Combines PyTesseract for multi-format text extraction and Sentence Transformers for dense vector embeddings, orchestrated asynchronously with Celery and Redis workers.",
    metrics: "Dense Vector Retrieval · Async Background Queues",
    tech: ["Sentence Transformers", "PyTesseract", "FastAPI", "MongoDB", "Celery"],
    position: [6, 2, -4],
    color: 0xa855f7, // Purple
    routeHref: "/#projects",
  },
  {
    id: "compliance",
    name: "Compliance Engine",
    category: "STATUTORY PAYROLL COMPUTATION",
    description: "Engineered from scratch for IYOV AI. Automates complex India statutory deductions (PF, ESI, Professional Tax, TDS) with automated batch job queues, alerting webhooks, and audit logging.",
    metrics: "Zero Discrepancy Audits · Automated Batch Jobs",
    tech: ["Python", "FastAPI", "PostgreSQL", "Redis", "Docker"],
    position: [-6, 3, -3],
    color: 0x00ff66, // Phosphor Green
    routeHref: "/#projects",
  },
  {
    id: "fintech",
    name: "Fintech Vault",
    category: "CREDIT RULES & TAMPER SECURITY",
    description: "TFG SecureBank 70-endpoint backend with automated spreadsheet-driven credit risk scoring and WeasyPrint tamper-evident loan agreement PDF generation with cryptographic checksum verification.",
    metrics: "70 REST Endpoints · Automated Credit Scoring",
    tech: ["FastAPI", "SQLAlchemy", "PostgreSQL", "WeasyPrint", "Redis"],
    position: [5, -3, 3],
    color: 0x38bdf8, // Sky Blue
    routeHref: "/#projects",
  },
  {
    id: "mobile",
    name: "Mobile Fleet",
    category: "CROSS-PLATFORM MOBILE ECOSYSTEM",
    description: "Published 4+ commercial companion Flutter applications to Google Play Store and Apple App Store. Architected clean state management, biometric auth, and unified mobile CI/CD pipelines.",
    metrics: "4+ Store Publications · 80+ Production Screens",
    tech: ["Flutter", "Dart", "Provider / BLoC", "Firebase", "App Store"],
    position: [-5, -2, 4],
    color: 0xf59e0b, // Amber
    routeHref: "/#projects",
  },
  {
    id: "telemetry",
    name: "Telemetry Coupe",
    category: "MECHANICAL DYNAMICS DOSSIER",
    description: "Aerodynamic chassis ground-effect profiling, 40-inch endurance silhouette, and two-stroke acoustic expansion chamber resonance dynamics.",
    metrics: "0.37 Cd Downforce · 7,500 RPM Powerband",
    tech: ["SVG Telemetry", "Acoustic Harmonics", "Vector Dynamics"],
    position: [0, 5, -6],
    color: 0xec4899, // Pink
    routeHref: "/garage",
  },
];

const CAMERA_PRESETS = [
  { label: "Core Gateway", pos: [0, 3, 10], lookAt: [0, 0, 0] },
  { label: "Inference Reactor", pos: [9, 4, 3], lookAt: [6, 2, -4] },
  { label: "Fintech Vault", pos: [8, -1, 9], lookAt: [5, -3, 3] },
  { label: "Orbital Overview", pos: [0, 16, 18], lookAt: [0, 0, 0] },
];

export default function WorldScene3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<SystemNodeData | null>(null);
  const [activeViewIdx, setActiveViewIdx] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [isFullDetail, setIsFullDetail] = useState(true);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const nodeMeshesRef = useRef<THREE.Mesh[]>([]);
  const targetCamPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 3, 10));
  const targetLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const currentLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

  // Audio Ambience toggle
  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundFX.setMuted(nextMuted);
    if (!nextMuted) {
      soundFX.playCyberChime();
    }
  };

  const jumpToView = useCallback((idx: number) => {
    setActiveViewIdx(idx);
    const preset = CAMERA_PRESETS[idx];
    targetCamPosRef.current.set(preset.pos[0], preset.pos[1], preset.pos[2]);
    targetLookAtRef.current.set(preset.lookAt[0], preset.lookAt[1], preset.lookAt[2]);
    soundFX.playKeyClick();
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "1") jumpToView(0);
      else if (e.key === "2") jumpToView(1);
      else if (e.key === "3") jumpToView(2);
      else if (e.key === "4") jumpToView(3);
      else if (e.key.toLowerCase() === "r") jumpToView(0);
      else if (e.key === "Escape" && activeDialogIsOpen()) {
        setActiveNode(null);
        setShowTutorial(false);
      }
    };
    function activeDialogIsOpen() {
      return Boolean(activeNode || showTutorial);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [jumpToView, activeNode, showTutorial]);

  // Three.js Scene Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x06080e);
    scene.fog = new THREE.FogExp2(0x06080e, 0.035);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 3, 10);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00f0ff, 2.0);
    dirLight1.position.set(10, 20, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x00ff66, 1.2);
    dirLight2.position.set(-10, -10, -10);
    scene.add(dirLight2);

    // Grid Floor
    const gridHelper = new THREE.GridHelper(60, 40, 0x00f0ff, 0x1e293b);
    gridHelper.position.y = -4;
    (gridHelper.material as THREE.Material).opacity = 0.25;
    (gridHelper.material as THREE.Material).transparent = true;
    scene.add(gridHelper);

    // Starfield Particle Dust
    const dustCount = 800;
    const dustGeometry = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPositions[i] = (Math.random() - 0.5) * 50;
      dustPositions[i + 1] = (Math.random() - 0.5) * 30;
      dustPositions[i + 2] = (Math.random() - 0.5) * 50;
    }
    dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    const dustMaterial = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.12,
      transparent: true,
      opacity: 0.6,
    });
    const dust = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dust);

    // Node Meshes
    nodeMeshesRef.current = [];
    SYSTEM_NODES.forEach((node) => {
      const group = new THREE.Group();
      group.position.set(...node.position);

      // Core Geometric Polyhedron
      const geo = new THREE.IcosahedronGeometry(1.0, 1);
      const mat = new THREE.MeshStandardMaterial({
        color: node.color,
        roughness: 0.2,
        metalness: 0.8,
        emissive: node.color,
        emissiveIntensity: 0.35,
        wireframe: false,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.userData = { nodeData: node };
      group.add(mesh);
      nodeMeshesRef.current.push(mesh);

      // Orbital Wireframe Ring
      const ringGeo = new THREE.TorusGeometry(1.6, 0.02, 8, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: node.color,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      group.add(ring);

      // Outer Glow Pulse Sphere
      const glowGeo = new THREE.SphereGeometry(1.2, 16, 16);
      const glowMat = new THREE.MeshBasicMaterial({
        color: node.color,
        transparent: true,
        opacity: 0.08,
        wireframe: true,
      });
      const glow = new THREE.Mesh(glowGeo, glowMat);
      group.add(glow);

      scene.add(group);
    });

    // Connecting Network Lines
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.2,
    });
    for (let i = 1; i < SYSTEM_NODES.length; i++) {
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(...SYSTEM_NODES[0].position),
        new THREE.Vector3(...SYSTEM_NODES[i].position),
      ]);
      const line = new THREE.Line(lineGeo, lineMat);
      scene.add(line);
    }

    // Raycasting for Node Click
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
          soundFX.playKeyClick();
          setActiveNode(data);
          targetCamPosRef.current.set(
            data.position[0] + 2.5,
            data.position[1] + 1.5,
            data.position[2] + 4
          );
          targetLookAtRef.current.set(...data.position);
        }
      }
    };

    container.addEventListener("pointerdown", onPointerDown);

    // Mouse drag orbit controls
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

      targetCamPosRef.current.x += dx * 8;
      targetCamPosRef.current.y -= dy * 6;
    };
    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Rotate nodes and pulse
      nodeMeshesRef.current.forEach((mesh, idx) => {
        mesh.rotation.y = elapsedTime * 0.4 + idx;
        mesh.rotation.x = elapsedTime * 0.2 + idx;
      });

      // Slowly rotate dust
      dust.rotation.y = elapsedTime * 0.02;

      // Smooth camera interpolation (slerp)
      camera.position.lerp(targetCamPosRef.current, 0.04);
      currentLookAtRef.current.lerp(targetLookAtRef.current, 0.05);
      camera.lookAt(currentLookAtRef.current);

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
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#06080e] text-slate-100 font-mono select-none">
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 h-full w-full cursor-grab active:cursor-grabbing" />

      {/* Top Header HUD Bar */}
      <header className="absolute inset-x-0 top-0 z-20 flex flex-wrap items-center justify-between gap-4 p-4 sm:p-6 bg-gradient-to-b from-black/80 to-transparent pointer-events-auto">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-[#080B10]/80 px-3.5 py-2 text-xs font-bold text-cyan-300 hover:border-cyan-400 hover:text-white transition-all backdrop-blur-md"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>RETURN TO PORTFOLIO</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleSound}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700/60 bg-[#080B10]/80 px-3 py-1.5 text-xs text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors backdrop-blur-md"
          >
            {isMuted ? <VolumeX className="h-3.5 w-3.5 text-red-400" /> : <Volume2 className="h-3.5 w-3.5 text-cyan-400" />}
            <span className="hidden sm:inline">{isMuted ? "SOUND OFF" : "SOUND ON"}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsFullDetail((prev) => !prev)}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700/60 bg-[#080B10]/80 px-3 py-1.5 text-xs text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors backdrop-blur-md"
          >
            <Eye className="h-3.5 w-3.5 text-emerald-400" />
            <span className="hidden sm:inline">{isFullDetail ? "FULL DETAIL" : "LITE DETAIL"}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowTutorial(true)}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700/60 bg-[#080B10]/80 px-3 py-1.5 text-xs text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors backdrop-blur-md"
          >
            <HelpCircle className="h-3.5 w-3.5 text-amber-400" />
            <span>TUTORIAL</span>
          </button>

          <button
            type="button"
            onClick={() => jumpToView(0)}
            className="rounded-lg border border-slate-700/60 bg-[#080B10]/80 p-2 text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors backdrop-blur-md"
            title="Reset View (R)"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </header>

      {/* Location Badge HUD */}
      <div className="absolute left-6 top-24 z-20 pointer-events-none hidden sm:block">
        <div className="rounded-xl border border-cyan-500/20 bg-[#080B10]/85 p-3.5 backdrop-blur-md shadow-2xl hud-bracket">
          <div className="flex items-center gap-2 text-[10px] text-cyan-400 tracking-widest font-bold">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>SYSTEM MATRIX ACTIVE</span>
          </div>
          <h1 className="mt-1 text-sm font-bold text-white uppercase tracking-wider">
            THE ARCHITECT’S CORE // 3D WORLD
          </h1>
          <p className="mt-0.5 text-[10px] text-slate-400">
            Click any orbital node to recall architectural dossier.
          </p>
        </div>
      </div>

      {/* Vantage Camera Preset View Switcher */}
      <nav
        aria-label="Camera Views"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 rounded-2xl border border-cyan-500/30 bg-[#080B10]/90 p-2 backdrop-blur-md shadow-2xl"
      >
        {CAMERA_PRESETS.map((preset, idx) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => jumpToView(idx)}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-mono font-bold transition-all ${
              activeViewIdx === idx
                ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                : "text-slate-300 hover:bg-white/5 hover:text-cyan-300"
            }`}
          >
            <kbd className="text-[10px] opacity-70">[{idx + 1}]</kbd>
            <span className="hidden sm:inline">{preset.label}</span>
          </button>
        ))}
      </nav>

      {/* Floating Interactive Node Dossier Modal */}
      {activeNode && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="node-modal-title"
        >
          <div className="relative w-full max-w-xl rounded-2xl border border-cyan-500/40 bg-[#080B10] p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(0,240,255,0.15)] hud-bracket">
            <div className="flex items-start justify-between gap-4 border-b border-cyan-950 pb-4">
              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-cyan-400">
                  {activeNode.category}
                </span>
                <h2 id="node-modal-title" className="mt-1 text-2xl font-bold font-sans text-white">
                  {activeNode.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setActiveNode(null)}
                className="rounded-lg border border-slate-700 bg-slate-800 p-1.5 text-slate-400 hover:text-white hover:border-cyan-400 transition-colors"
                aria-label="Close dossier"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 rounded-xl border border-cyan-500/20 bg-cyan-950/20 p-3 text-xs text-cyan-300 font-bold">
              ⚡ {activeNode.metrics}
            </div>

            <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-mono">
              {activeNode.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {activeNode.tech.map((t) => (
                <span
                  key={t}
                  className="rounded border border-cyan-500/30 bg-cyan-950/40 px-2 py-0.5 font-mono text-[10px] text-cyan-300"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 border-t border-cyan-950 pt-4">
              <button
                type="button"
                onClick={() => setActiveNode(null)}
                className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 font-mono text-xs text-slate-300 hover:bg-slate-700 transition-colors"
              >
                DISMISS
              </button>
              <Link
                href={activeNode.routeHref}
                className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-500 px-4 py-2 font-mono text-xs font-bold text-black hover:bg-cyan-400 transition-colors"
              >
                <span>OPEN PROJECT SPEC</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Tutorial Dialog */}
      {showTutorial && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="tutorial-modal-title"
        >
          <div className="relative w-full max-w-md rounded-2xl border border-cyan-500/30 bg-[#080B10] p-6 text-slate-200 shadow-2xl hud-bracket">
            <h3 id="tutorial-modal-title" className="text-lg font-bold text-white font-sans">
              Navigation & Controls
            </h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Step inside Meghraj&apos;s architectural system space. Rotate, orbit, and inspect verified distributed systems in 3D.
            </p>

            <div className="mt-4 space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between border-b border-slate-800 py-1.5">
                <span className="text-slate-400">Orbit / Look Around:</span>
                <span className="text-cyan-300">Drag with Mouse</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800 py-1.5">
                <span className="text-slate-400">Camera Vantage Views:</span>
                <span className="text-cyan-300">Keys [1] – [4]</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800 py-1.5">
                <span className="text-slate-400">Inspect Dossier:</span>
                <span className="text-cyan-300">Click Any 3D Node</span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-slate-400">Reset Camera:</span>
                <span className="text-cyan-300">Key [R]</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowTutorial(false)}
              className="mt-6 w-full rounded-xl bg-cyan-500 py-2.5 font-mono text-xs font-bold text-black hover:bg-cyan-400 transition-colors"
            >
              GOT IT, ENTER CORE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
