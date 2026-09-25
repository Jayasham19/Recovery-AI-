import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FolderLock, 
  HardDrive, 
  Activity, 
  Cpu, 
  Network, 
  Layers, 
  Sparkles, 
  ArrowRight, 
  ChevronRight, 
  ShieldCheck, 
  FileCheck2, 
  Binary, 
  Zap, 
  KeyRound, 
  FileCode, 
  FileSpreadsheet, 
  FileText, 
  Image as ImageIcon, 
  Film, 
  Music, 
  Archive, 
  Database,
  Lock,
  CheckCircle2,
  Play
} from 'lucide-react';
import TiltCard from '../components/TiltCard';
import AnimatedCounter from '../components/AnimatedCounter';

const PIPELINE_STAGES = [
  {
    step: 1,
    title: "Bitstream Ingestion",
    desc: "Direct sector acquisition (.dd, .raw, .iso) with live SHA-256 integrity hashing.",
    icon: HardDrive,
    tag: "INGEST"
  },
  {
    step: 2,
    title: "Entropy Profiling",
    desc: "Shannon entropy calculation (0.0–8.0) maps compressed, plaintext, and encrypted zones.",
    icon: Binary,
    tag: "ENTROPY"
  },
  {
    step: 3,
    title: "Neural Signature Carving",
    desc: "Header/footer byte matching across 12+ categories without reliance on damaged file tables.",
    icon: Cpu,
    tag: "CARVING"
  },
  {
    step: 4,
    title: "Graph Reassembly",
    desc: "React Flow topological sequencing stitches non-contiguous clusters with weighted cosine similarity.",
    icon: Network,
    tag: "GRAPH-AI"
  },
  {
    step: 5,
    title: "Synthesized Repair",
    desc: "Automated header reconstruction and trailer synthesis repairs bitrot and truncated byte streams.",
    icon: Zap,
    tag: "REPAIR"
  },
  {
    step: 6,
    title: "Forensic Validation",
    desc: "PRD weighted formula (30% Frag + 25% Struct + 20% Comp + 15% Meta + 10% Content) issues custody score.",
    icon: ShieldCheck,
    tag: "VALIDATE"
  }
];

const SUPPORTED_FORMATS = [
  { ext: '.PDF', name: 'Synthesized Documents', cat: 'Docs', icon: FileText, color: 'text-red-400' },
  { ext: '.JPG / .PNG', name: 'Carved Imagery', cat: 'Images', icon: ImageIcon, color: 'text-amber-400' },
  { ext: '.DOCX / .XLSX', name: 'Office XML Archives', cat: 'Office', icon: FileSpreadsheet, color: 'text-blue-400' },
  { ext: '.MP4 / .AVI', name: 'Audio/Video Streams', cat: 'Media', icon: Film, color: 'text-purple-400' },
  { ext: '.PY / .JS / .C', name: 'Source Repositories', cat: 'Code', icon: FileCode, color: 'text-emerald-400' },
  { ext: '.SQLITE / .JSON', name: 'Structured Databases', cat: 'Data', icon: Database, color: 'text-cyan-400' }
];

export default function LandingPage({ stats }) {
  const navigate = useNavigate();
  const [activeStage, setActiveStage] = useState(0);
  const [emailSub, setEmailSub] = useState('');
  const [subMessage, setSubMessage] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailSub) return;
    setSubMessage(true);
    setTimeout(() => setSubMessage(false), 3000);
    setEmailSub('');
  };

  return (
    <div className="space-y-28 relative z-10 font-mono text-slate-100 pb-12">
      
      {/* ================= HERO SECTION ================= */}
      <section className="pt-6 pb-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Headline */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 space-y-6"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/80 border border-slate-700/90 shadow-[0_0_16px_rgba(255,87,51,0.18)] text-[11px] tracking-wider font-mono text-slate-200 uppercase backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse shadow-[0_0_8px_#FF5733]" />
              <span className="font-semibold text-slate-100">AI Powered Reconstruction</span>
            </div>

            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-display font-extrabold uppercase tracking-tight text-white leading-[1.04]">
              THE <span className="text-white">NEW</span><br />
              STANDARD<br />
              IN DATA<br />
              <span className="text-coral">RECOVERY</span>
            </h1>

            <div className="accent-border max-w-xl">
              <p className="text-slate-300 text-xs sm:text-sm font-mono leading-relaxed">
                Deconstruct raw disk sectors, classify damaged byte headers with machine learning, and reassemble fragmented files with cryptographic precision.
              </p>
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-4">
              <button 
                onClick={() => navigate('/login')}
                className="btn-coral px-8 py-3.5 rounded-lg text-xs uppercase tracking-wider font-bold flex items-center gap-2"
              >
                Launch Recovery Case <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => navigate('/login?mode=signup')}
                className="px-6 py-3.5 rounded-lg text-xs uppercase tracking-wider text-slate-300 hover:text-white border border-olive-border hover:border-slate-600 bg-black/60 transition-all hover:scale-105 flex items-center gap-2"
              >
                <KeyRound className="w-4 h-4 text-coral" /> Provision Examiner Badge
              </button>
            </div>
          </motion.div>

          {/* Interactive 3D Tilt Cards with Glare */}
          <div className="lg:col-span-4 space-y-5 relative">
            
            {/* Tilted Card 1 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <TiltCard 
                tiltDegree={12} 
                className="vista-card p-6 cursor-pointer"
                onClick={() => navigate('/login')}
              >
                <div className="w-10 h-10 rounded-lg bg-black/60 border border-olive-border flex items-center justify-center text-coral mb-4">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2 font-display">
                  12-Format Neural Carving
                </h3>
                <p className="text-xs text-olive-text leading-relaxed">
                  Deep carving algorithms for JPEG, PNG, PDF, DOCX, SQLite, WAV, MP4, AVI, MP3, EML with zero false-positives.
                </p>
                <div className="mt-4 flex items-center gap-1 text-[11px] text-coral font-bold">
                  Initialize Carve Engine <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </TiltCard>
            </motion.div>

            {/* Tilted Card 2 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <TiltCard 
                tiltDegree={12} 
                className="vista-card p-6 cursor-pointer"
                onClick={() => navigate('/login')}
              >
                <div className="w-10 h-10 rounded-lg bg-black/60 border border-olive-border flex items-center justify-center text-coral mb-4">
                  <Network className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2 font-display">
                  Graph-Based Cluster Assembly
                </h3>
                <p className="text-xs text-olive-text leading-relaxed">
                  Calculates sequence compatibilities and Shannon entropy correlation between non-contiguous blocks.
                </p>
                <div className="mt-4 flex items-center gap-1 text-[11px] text-coral font-bold">
                  View Fragment Graph <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </TiltCard>
            </motion.div>

          </div>

        </div>
      </section>

      {/* ================= SECOND SECTION: CAPABILITY MATRIX ================= */}
      <section id="capabilities" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-t border-slate-900 pt-16">
        <div className="lg:col-span-6 space-y-4">
          <h2 className="text-3xl sm:text-5xl font-display font-bold uppercase tracking-tight text-white leading-tight">
            Unprecedented<br />
            Velocity.<br />
            Impeccable<br />
            <span className="text-coral">Reliability.</span>
          </h2>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <div className="accent-border">
            <p className="text-slate-300 text-xs sm:text-sm font-mono leading-relaxed">
              Every storage medium undergoes 8 deterministic stages—from raw block acquisition to candidate clustering and cryptographic verification—giving investigators undeniable proof of custody.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <TiltCard tiltDegree={8} className="vista-card p-5">
              <div className="w-8 h-8 rounded bg-black/60 border border-olive-border flex items-center justify-center text-coral mb-3">
                <Layers className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1 font-display">Entropy Profiling</h4>
              <p className="text-[11px] text-olive-text">Shannon entropy scoring (0.0–8.0) identifies encrypted vs plaintext streams.</p>
            </TiltCard>

            <TiltCard tiltDegree={8} className="vista-card p-5">
              <div className="w-8 h-8 rounded bg-black/60 border border-olive-border flex items-center justify-center text-coral mb-3">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1 font-display">AI Reasoning</h4>
              <p className="text-[11px] text-olive-text">Intelligent investigator assistant explains fragment relationships in plain English.</p>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* ================= METRICS COUNTER SECTION WITH ANIMATED TICKER ================= */}
      <section className="border-t border-slate-900 pt-16 text-center space-y-12">
        <div>
          <span className="text-xs uppercase tracking-widest text-slate-400 font-mono">
            FORENSIC BENCHMARKS & RELIABILITY
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="space-y-2">
            <div className="text-4xl sm:text-6xl font-display font-extrabold text-coral">
              <AnimatedCounter value={stats?.activeCases || 14} />
            </div>
            <div className="text-[11px] text-slate-400 uppercase tracking-wider">
              Protected Custody Cases
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-4xl sm:text-6xl font-display font-extrabold text-coral">
              <AnimatedCounter value={stats?.recoveredFiles || 128} />
            </div>
            <div className="text-[11px] text-slate-400 uppercase tracking-wider">
              Files Reconstructed
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-4xl sm:text-6xl font-display font-extrabold text-coral">
              <AnimatedCounter value={12} />
            </div>
            <div className="text-[11px] text-slate-400 uppercase tracking-wider">
              File Formats Carved
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-4xl sm:text-6xl font-display font-extrabold text-coral">
              <AnimatedCounter value={8} />
            </div>
            <div className="text-[11px] text-slate-400 uppercase tracking-wider">
              Pipeline Stages
            </div>
          </div>

          <div className="space-y-2 col-span-2 md:col-span-1">
            <div className="text-4xl sm:text-6xl font-display font-extrabold text-coral">
              <AnimatedCounter value={100} suffix="%" />
            </div>
            <div className="text-[11px] text-slate-400 uppercase tracking-wider">
              SHA-256 Assurance
            </div>
          </div>
        </div>
      </section>

      {/* ================= INTERACTIVE PIPELINE PREVIEW (REPLACES PUBLIC CASE TABLE) ================= */}
      <section id="pipeline" className="border-t border-slate-900 pt-16 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-950/40 border border-orange-500/30 text-[11px] text-orange-400 font-bold mb-2">
              <Activity className="w-3.5 h-3.5" /> ARCHITECTURAL WORKFLOW DEMO
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold uppercase text-white">
              Deterministic 8-Stage Recovery Pipeline
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Interact with each forensic stage below to see how corrupted disk sectors are transformed into cryptographically verified files.
            </p>
          </div>

          <button 
            onClick={() => navigate('/login')}
            className="btn-coral px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 self-start md:self-auto"
          >
            Examiner Sign In to Run Engine <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Interactive Pipeline Steps */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
          {PIPELINE_STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            const isSelected = activeStage === idx;
            return (
              <button
                key={stage.step}
                onClick={() => setActiveStage(idx)}
                className={`text-left p-4 rounded-xl border transition-all ${
                  isSelected 
                    ? 'bg-gradient-to-b from-[#1E2638] to-[#0F141C] border-coral shadow-[0_0_20px_rgba(255,87,51,0.2)]' 
                    : 'bg-[#0F141C]/80 border-slate-800/80 hover:border-slate-700 hover:bg-[#131924]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                    isSelected ? 'bg-coral text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    0{stage.step}
                  </span>
                  <span className="text-[10px] text-slate-500">{stage.tag}</span>
                </div>
                <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-coral' : 'text-slate-400'}`} />
                <h4 className="text-xs font-bold text-white mb-1 line-clamp-1">{stage.title}</h4>
                <p className="text-[10px] text-slate-400 leading-snug line-clamp-2">{stage.desc}</p>
              </button>
            );
          })}
        </div>

        {/* Live Stage Output Terminal Inspector */}
        <div className="vista-card p-6 border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-coral via-amber-500 to-coral"></div>
          
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-olive-border">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                STAGE 0{activeStage + 1} LIVE FORENSIC TELEMETRY: {PIPELINE_STAGES[activeStage].title}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <Lock className="w-3.5 h-3.5 text-coral" /> Evidence Safe Mode: READ-ONLY PREVIEW
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 bg-[#090C11] rounded-xl p-4 border border-[#1E2638] font-mono text-[11px] space-y-2 text-slate-300">
              <div className="text-slate-500">// Terminal Execution Trace</div>
              <div className="text-emerald-400">&gt; [KERNEL] Mounting bitstream stream @ sector 0x00000000 -&gt; 0x00010000</div>
              <div className="text-slate-300">&gt; [ENTROPY] Calculating Shannon divergence: <span className="text-coral">H = 7.914 bits/byte</span> (high randomness cluster)</div>
              <div className="text-cyan-400">&gt; [SIGNATURE] Matched byte pattern [0x25 0x50 0x44 0x46] (PDF Header - Synthesizing root catalog)</div>
              <div className="text-amber-400">&gt; [GRAPH] Edge weight computed: Node_04 -&gt; Node_05 (Confidence: 94.2%)</div>
              <div className="text-slate-400">&gt; [INTEGRITY] SHA-256 Calculated: <span className="text-slate-200">e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</span></div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 rounded-xl bg-black/60 border border-olive-border">
                <div className="text-xs text-slate-400 font-bold mb-1">Target Classification</div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-coral" /> Multi-Tenant Forensics Protocol
                </div>
                <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                  Real investigations and sensitive evidence are strictly segregated by examiner credentials to ensure strict chain-of-custody compliance.
                </p>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => navigate('/login')}
                  className="flex-1 btn-coral py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-center"
                >
                  Sign In to Access Real Cases
                </button>
                <button 
                  onClick={() => navigate('/login?mode=signup')}
                  className="px-4 py-2.5 rounded-lg border border-slate-700 bg-black/60 text-xs text-slate-300 hover:text-white"
                >
                  Provision Badge
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 12-FORMAT SUPPORT MATRIX ================= */}
      <section className="border-t border-slate-900 pt-16 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-coral font-mono font-bold">
            UNIVERSAL CARVING ENGINE
          </span>
          <h2 className="text-2xl sm:text-4xl font-display font-bold uppercase text-white">
            Full-Spectrum Format Reconstruction
          </h2>
          <p className="text-xs text-slate-400">
            Engineered to recover documents, media, code repositories, and structured datasets even when filesystem metadata is completely destroyed.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {SUPPORTED_FORMATS.map((f, i) => {
            const Icon = f.icon;
            return (
              <TiltCard key={i} tiltDegree={6} className="vista-card p-4 text-center space-y-2">
                <div className={`w-8 h-8 rounded-lg bg-black/60 border border-olive-border mx-auto flex items-center justify-center ${f.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-white">{f.ext}</div>
                <div className="text-[10px] text-slate-400">{f.name}</div>
              </TiltCard>
            );
          })}
        </div>
      </section>

      {/* ================= NEWSLETTER / CUSTODY DISPATCH ================= */}
      <section className="border-t border-slate-900 pt-16 pb-8">
        <div className="vista-card p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <span className="text-[11px] text-coral uppercase tracking-widest font-bold">
                FORENSIC BULLETIN & ENGINE UPDATES
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white uppercase">
                Stay Ahead of Emerging File Signatures
              </h3>
              <p className="text-xs text-slate-400 max-w-md">
                Receive newly discovered byte heuristics, neural parsing algorithms, and forensic intelligence dispatches directly to your secure inbox.
              </p>
            </div>

            <div className="lg:col-span-5">
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input 
                    type="email"
                    required
                    value={emailSub}
                    onChange={(e) => setEmailSub(e.target.value)}
                    placeholder="investigator@agency.forensics"
                    className="flex-1 px-4 py-3 bg-black/80 border border-olive-border rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-coral"
                  />
                  <button
                    type="submit"
                    className="btn-coral px-6 py-3 rounded-lg text-xs uppercase tracking-wider font-bold whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </div>
                {subMessage && (
                  <div className="text-[11px] text-coral font-bold animate-fadeIn">
                    ✓ Dispatch clearance registered. Welcome to ReconstructX Intelligence.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
