import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FolderLock, 
  Plus, 
  Activity, 
  FileCheck2, 
  HardDrive, 
  ShieldAlert, 
  Search, 
  ChevronRight,
  Database,
  Cpu,
  Fingerprint,
  ArrowRight,
  Layers,
  Sparkles,
  Zap,
  Network,
  ShieldCheck,
  CheckCircle2,
  Lock,
  User
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis
} from 'recharts';
import TiltCard from '../components/TiltCard';
import AnimatedCounter from '../components/AnimatedCounter';

const PIE_COLORS = ['#FF5733', '#9ba89e', '#38bdf8', '#fbbf24', '#a855f7', '#f43f5e', '#34d399', '#f472b6'];

export default function Dashboard({ stats, cases, onRefresh }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [emailSub, setEmailSub] = useState('');
  const [subMessage, setSubMessage] = useState(false);

  const filteredCases = (cases || []).filter(c => 
    c.caseName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.caseId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.classification?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.investigatorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.investigatorId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fileTypeData = Object.entries(stats?.fileTypeDistribution || {}).map(([name, value]) => ({
    name,
    value
  }));

  const confidenceData = [
    { name: 'High (80-100%)', count: stats?.confidenceDistribution?.HIGH || 0, color: '#FF5733' },
    { name: 'Medium (50-79%)', count: stats?.confidenceDistribution?.MEDIUM || 0, color: '#fbbf24' },
    { name: 'Low (0-49%)', count: stats?.confidenceDistribution?.LOW || 0, color: '#f43f5e' }
  ];

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
                onClick={() => navigate('/cases/new')}
                className="btn-coral px-8 py-3.5 rounded-lg text-xs uppercase tracking-wider font-bold flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(255,87,51,0.3)]"
              >
                Launch Recovery Case <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => {
                  const el = document.getElementById('active-registry');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-lg text-xs uppercase tracking-wider text-slate-300 hover:text-white border border-olive-border hover:border-slate-600 bg-black/60 transition-all hover:scale-105 cursor-pointer"
              >
                Explore Active Cases
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
                onClick={() => navigate('/cases/new')}
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
                onClick={() => navigate('/cases/new')}
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
      <section id="capability-matrix" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-t border-slate-900 pt-16">
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
            WE TAKE PRIDE IN OUR NUMBERS
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="space-y-2">
            <div className="text-4xl sm:text-6xl font-display font-extrabold text-coral">
              <AnimatedCounter value={stats?.activeCases || cases.length} />
            </div>
            <div className="text-[11px] text-slate-400 uppercase tracking-wider">
              Active Forensic Cases
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-4xl sm:text-6xl font-display font-extrabold text-coral">
              <AnimatedCounter value={stats?.recoveredFiles || 0} />
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

      {/* ================= ACTIVE CASES & TELEMETRY SECTION ================= */}
      <section id="active-registry" className="border-t border-slate-900 pt-16 space-y-8">
        
        {/* Telemetry charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Format breakdown */}
          <TiltCard tiltDegree={4} className="vista-card p-6">
            <div className="flex items-center justify-between mb-4 border-b border-olive-border pb-3">
              <h3 className="text-xs uppercase tracking-wider font-bold text-white flex items-center gap-2 font-display">
                <HardDrive className="w-4 h-4 text-coral" /> Recovered File Formats
              </h3>
              <span className="text-[10px] text-slate-400">Multi-Signature Carve</span>
            </div>
            
            <div className="h-48 w-full flex items-center justify-center">
              {fileTypeData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={fileTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {fileTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#1c221e', borderColor: '#333e35', color: '#fff', borderRadius: '8px' }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-xs text-slate-500">Run recovery pipeline on a case to display format telemetry.</div>
              )}
            </div>

            <div className="flex flex-wrap gap-3 justify-center mt-2 text-[11px] text-slate-400">
              {fileTypeData.map((d, i) => (
                <div key={d.name} className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                  <span>{d.name}: {d.value}</span>
                </div>
              ))}
            </div>
          </TiltCard>

          {/* Confidence distribution */}
          <TiltCard tiltDegree={4} className="vista-card p-6">
            <div className="flex items-center justify-between mb-4 border-b border-olive-border pb-3">
              <h3 className="text-xs uppercase tracking-wider font-bold text-white flex items-center gap-2 font-display">
                <Activity className="w-4 h-4 text-coral" /> Recovery Confidence Matrix
              </h3>
              <span className="text-[10px] text-slate-400">30% Frag + 25% Struct + 20% Comp</span>
            </div>

            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={confidenceData}>
                  <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                  <Tooltip contentStyle={{ background: '#1c221e', borderColor: '#333e35', color: '#fff', borderRadius: '8px' }} />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {confidenceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <p className="text-[10px] text-center text-slate-500 mt-2">
              Forensic validation formula applied strictly to all carved clusters.
            </p>
          </TiltCard>

        </div>

        {/* Forensic Case Registry Table */}
        <div className="vista-card p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-olive-border pb-4">
            <div>
              <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2 font-display">
                <FolderLock className="w-4 h-4 text-coral" />
                Active Forensic Case Registry
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">Assigned investigations, disk images &amp; recovery queues</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Filter cases..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-black/60 border border-olive-border rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-coral w-full sm:w-60"
                />
              </div>

              <button
                onClick={() => navigate('/cases/new')}
                className="btn-coral px-4 py-2 rounded text-xs font-bold uppercase tracking-wider hidden sm:flex items-center gap-1.5 cursor-pointer shadow-coral-glow-sm"
              >
                <Plus className="w-3.5 h-3.5" /> New Case
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-olive-border text-slate-400">
                  <th className="pb-3 px-4 font-semibold">CASE ID</th>
                  <th className="pb-3 px-4 font-semibold">NAME</th>
                  <th className="pb-3 px-4 font-semibold">INVESTIGATOR</th>
                  <th className="pb-3 px-4 font-semibold">CLASSIFICATION</th>
                  <th className="pb-3 px-4 font-semibold">STATUS</th>
                  <th className="pb-3 px-4 font-semibold text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-olive-border/50">
                {filteredCases.length > 0 ? (
                  filteredCases.map((c) => (
                    <tr key={c.caseId || c._id} className="hover:bg-olive-cardHover/50 transition-colors">
                      <td className="py-4 px-4 font-bold text-coral">{c.caseId}</td>
                      <td className="py-4 px-4 text-white font-medium">{c.caseName}</td>
                      <td className="py-4 px-4 text-slate-300">
                        <span className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          {c.investigatorName || c.investigatorId || 'Special Agent Vance'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-black/60 text-slate-300 border border-olive-border">
                          {c.classification || 'Corporate Forensics'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          c.status === 'ACTIVE' 
                            ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30' 
                            : 'bg-amber-950/60 text-amber-400 border border-amber-500/30'
                        }`}>
                          {c.status || 'ACTIVE'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <Link
                          to={`/cases/${c.caseId || c._id}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-black/80 hover:bg-coral hover:text-white text-slate-300 border border-olive-border transition-all text-xs font-bold"
                        >
                          Inspect Case <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-slate-500 font-mono">
                      <div className="w-12 h-12 rounded-xl bg-black/60 border border-olive-border flex items-center justify-center text-slate-600 mx-auto mb-3">
                        <FolderLock className="w-6 h-6 text-coral/60" />
                      </div>
                      <div className="text-sm font-semibold text-slate-300">No Forensic Cases Initialized</div>
                      <p className="text-[11px] text-slate-500 mt-1 max-w-sm mx-auto">
                        Database is currently cleared. Click below or use the navigation bar to create a new case.
                      </p>
                      <button
                        onClick={() => navigate('/cases/new')}
                        className="btn-coral mt-4 px-5 py-2 rounded text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer shadow-coral-glow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" /> Launch First Investigation
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </section>

      {/* ================= NEWSLETTER / CUSTODY DISPATCH ================= */}
      <section className="border-t border-slate-900 pt-16 pb-8">
        <div className="vista-card p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <span className="text-[11px] text-coral uppercase tracking-widest font-bold">
                FORENSIC BULLETIN &amp; ENGINE UPDATES
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
                    className="btn-coral px-6 py-3 rounded-lg text-xs uppercase tracking-wider font-bold whitespace-nowrap cursor-pointer"
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
