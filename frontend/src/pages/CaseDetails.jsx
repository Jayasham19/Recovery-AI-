import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FolderLock, 
  HardDrive, 
  Cpu, 
  FileCheck2, 
  Share2, 
  ScrollText, 
  Play, 
  UploadCloud, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle,
  Download,
  Terminal,
  ExternalLink,
  Bot,
  Zap,
  RefreshCw,
  Layers,
  ArrowLeft,
  FileText,
  Image as ImageIcon,
  Film,
  Music,
  Code,
  Database,
  Archive,
  Search,
  Filter
} from 'lucide-react';
import { api } from '../services/api';
import FragmentGraph from '../components/FragmentGraph';
import FilePreviewModal from '../components/FilePreviewModal';

const TABS = [
  { id: 'overview', label: 'Overview', icon: FolderLock },
  { id: 'storage', label: 'Storage Sources', icon: HardDrive },
  { id: 'analysis', label: 'Recovery Pipeline', icon: Cpu },
  { id: 'recovered', label: 'Recovered Files', icon: FileCheck2 },
  { id: 'graph', label: 'Fragment Graph', icon: Share2 },
  { id: 'audit', label: 'Audit Log', icon: ScrollText },
];

const CATEGORIES = [
  { id: 'ALL', label: 'All Formats', icon: Layers },
  { id: 'DOCS', label: 'Documents (PDF, DOCX, TXT)', icon: FileText, types: ['PDF', 'DOCX', 'TXT', 'RTF', 'XLSX'] },
  { id: 'IMAGES', label: 'Images (JPG, PNG, WEBP)', icon: ImageIcon, types: ['JPEG', 'PNG', 'WEBP', 'GIF', 'BMP'] },
  { id: 'VIDEOS', label: 'Videos (MP4, AVI, MKV)', icon: Film, types: ['MP4', 'AVI', 'MKV', 'MOV'] },
  { id: 'AUDIO', label: 'Audio (MP3, WAV, FLAC)', icon: Music, types: ['MP3', 'WAV', 'FLAC'] },
  { id: 'CODE', label: 'Code (Python, JS, C++)', icon: Code, types: ['PYTHON', 'JAVASCRIPT', 'JAVA', 'C++', 'HTML', 'CSS'] },
  { id: 'DATA', label: 'Data & DB (JSON, CSV, SQLite)', icon: Database, types: ['JSON', 'CSV', 'SQLITE', 'EML', 'XML'] },
];

const PIPELINE_STAGES = [
  "Stage 1: Data Acquisition",
  "Stage 2: Storage Analysis",
  "Stage 3: Fragment Extraction",
  "Stage 4: File Type Classification",
  "Stage 5: Fragment Relationship Analysis",
  "Stage 6: Reconstruction",
  "Stage 7: Integrity Analysis",
  "Stage 8: Recovery Confidence Scoring"
];

export default function CaseDetails() {
  const { caseId } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview');
  const [caseData, setCaseData] = useState(null);
  const [storageSources, setStorageSources] = useState([]);
  const [fragments, setFragments] = useState([]);
  const [relationships, setRelationships] = useState([]);
  const [recoveredFiles, setRecoveredFiles] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Category filter and search
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [fileSearch, setFileSearch] = useState('');

  // Analysis Pipeline Running State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [pipelineProgress, setPipelineProgress] = useState(0);
  const [activeStageIdx, setActiveStageIdx] = useState(-1);
  const [liveLog, setLiveLog] = useState([]);

  // Selected file for deep preview modal
  const [previewFile, setPreviewFile] = useState(null);

  // AI Assistant Query
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const fetchAllCaseData = async () => {
    try {
      setLoading(true);
      const [c, srcs, frags, rels, files, logs] = await Promise.all([
        api.getCaseById(caseId),
        api.getStorageSources(caseId),
        api.getFragments(caseId),
        api.getRelationships(caseId),
        api.getRecoveredFiles(caseId),
        api.getAuditLogs(caseId)
      ]);
      setCaseData(c);
      setStorageSources(srcs || []);
      setFragments(frags || []);
      setRelationships(rels || []);
      setRecoveredFiles(files || []);
      setAuditLogs(logs || []);
    } catch (err) {
      console.error("Error fetching case details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCaseData();
  }, [caseId]);

  // Upload handler
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      await api.uploadEvidence(caseId, file);
      await fetchAllCaseData();
      setActiveTab('storage');
    } catch (err) {
      alert(`Upload error: ${err.message}`);
    }
  };

  const handleGenerateDemo = async () => {
    try {
      await api.generateDemoEvidence(caseId);
      await fetchAllCaseData();
      setActiveTab('storage');
    } catch (err) {
      alert(`Demo creation error: ${err.message}`);
    }
  };

  // Run 8-Stage Pipeline
  const runRecoveryPipeline = async () => {
    setIsAnalyzing(true);
    setPipelineProgress(5);
    setActiveStageIdx(0);
    setLiveLog([`[${new Date().toLocaleTimeString()}] Initializing 8-stage forensic pipeline for case ${caseId}...`]);

    const interval = setInterval(() => {
      setPipelineProgress(prev => {
        const next = prev + 12;
        if (next >= 90) return 90;
        const stage = Math.floor((next / 100) * 8);
        setActiveStageIdx(stage);
        return next;
      });
    }, 400);

    try {
      const results = await api.triggerAnalysis(caseId);
      clearInterval(interval);
      setPipelineProgress(100);
      setActiveStageIdx(7);
      setLiveLog(prev => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] Python Recovery Engine completed multi-format carving & reassembly.`,
        `[${new Date().toLocaleTimeString()}] Extracted: ${results.fragments.length} blocks | Recovered: ${results.recoveredFiles.length} files.`
      ]);

      await fetchAllCaseData();
      setTimeout(() => {
        setIsAnalyzing(false);
        setActiveTab('recovered');
      }, 1000);
    } catch (err) {
      clearInterval(interval);
      setIsAnalyzing(false);
      alert(`Analysis notice: ${err.message}`);
    }
  };

  const handleAiQuestion = async (e) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;
    setAiLoading(true);
    try {
      const res = await api.askAiAssistant({
        prompt: aiPrompt,
        caseId,
        recoveredCount: recoveredFiles.length
      });
      setAiAnswer(res.explanation);
    } catch (err) {
      setAiAnswer(`Error generating AI response: ${err.message}`);
    } finally {
      setAiLoading(false);
    }
  };

  // Filtered files
  const filteredFiles = recoveredFiles.filter(f => {
    const matchesSearch = f.filename.toLowerCase().includes(fileSearch.toLowerCase()) || f.fileType.toLowerCase().includes(fileSearch.toLowerCase());
    if (!matchesSearch) return false;
    if (selectedCategory === 'ALL') return true;
    const cat = CATEGORIES.find(c => c.id === selectedCategory);
    return cat && cat.types && cat.types.includes(f.fileType);
  });

  if (loading && !caseData) {
    return (
      <div className="flex items-center justify-center h-64 text-coral font-mono text-xs">
        <RefreshCw className="w-4 h-4 animate-spin mr-2" /> Initializing forensic workspace...
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn pb-16 font-mono text-xs relative z-10">
      
      {/* Top Breadcrumb */}
      <button 
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-2 text-slate-400 hover:text-coral transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Case Registry
      </button>

      {/* Header Bar */}
      <div className="p-8 rounded-xl vista-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded text-[11px] font-bold bg-coral/10 text-coral border border-coral/30">
              {caseData?.caseId || caseId}
            </span>
            <span className="px-2.5 py-1 rounded text-[11px] bg-black/50 text-slate-300 border border-olive-border">
              {caseData?.classification || 'Forensics'}
            </span>
            <span className="text-coral flex items-center gap-1 font-semibold text-[11px]">
              <span className="w-2 h-2 rounded-full bg-coral inline-block animate-pulse"></span>
              {caseData?.status || 'ACTIVE'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mt-3 font-display uppercase tracking-wide">
            {caseData?.caseName}
          </h1>
          <p className="text-[11px] text-slate-400 mt-1">
            Investigator: {caseData?.investigatorId || 'Special Agent Vance'} • Created: {new Date(caseData?.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div>
          <button 
            onClick={runRecoveryPipeline}
            disabled={isAnalyzing}
            className="btn-coral px-6 py-3.5 rounded text-xs uppercase tracking-wider font-bold shadow-coral-glow flex items-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Executing Pipeline ({pipelineProgress}%)...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                Run AI Recovery Pipeline
              </>
            )}
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-olive-border pb-3 overflow-x-auto">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                isActive 
                  ? 'bg-coral text-white shadow-coral-glow-sm' 
                  : 'text-slate-400 hover:text-white hover:bg-olive-card/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
              {tab.id === 'recovered' && recoveredFiles.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/40 text-white border border-white/20">
                  {recoveredFiles.length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="vista-card p-6 space-y-4">
              <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-olive-border pb-3 font-display">
                <FolderLock className="w-4 h-4 text-coral" />
                Case Scope & Evidence Details
              </h2>
              <div className="accent-border">
                <p className="text-slate-300 text-xs leading-relaxed">
                  {caseData?.description || "Ingest disk images (.dd, .raw, .img, .bin) to begin multi-format carving, fragment clustering and cross-correlation."}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-olive-border text-center">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">EVIDENCE DISKS</span>
                  <span className="text-white font-bold text-base font-display">{storageSources.length}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">CARVED BLOCKS</span>
                  <span className="text-coral font-bold text-base font-display">{fragments.length}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">RECOVERED ASSETS</span>
                  <span className="text-white font-bold text-base font-display">{recoveredFiles.length}</span>
                </div>
              </div>
            </div>

            {/* AI Assistant Section */}
            <div className="vista-card p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-olive-border pb-3">
                <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 font-display">
                  <Bot className="w-4 h-4 text-coral" />
                  AI Forensic Investigator Assistant
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded bg-coral/10 text-coral border border-coral/30">
                  Neural Intelligence
                </span>
              </div>

              <form onSubmit={handleAiQuestion} className="space-y-3">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Ask AI: e.g. Why was PDF #001 recovered with 98% confidence? How was header restored?"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    className="flex-1 bg-black/60 border border-olive-border rounded-lg px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-coral"
                  />
                  <button 
                    type="submit"
                    disabled={aiLoading}
                    className="btn-coral px-5 py-2.5 rounded text-xs uppercase font-bold flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    {aiLoading ? 'Analyzing...' : 'Inquire'}
                  </button>
                </div>
              </form>

              {aiAnswer && (
                <div className="p-4 rounded-lg bg-black/60 border border-olive-border text-slate-200 leading-relaxed animate-fadeIn">
                  <span className="text-coral font-bold block mb-1">🤖 AI Forensic Analysis:</span>
                  {aiAnswer}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-6">
            <div className="vista-card p-6 space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-olive-border pb-3 flex items-center gap-2 font-display">
                <Zap className="w-4 h-4 text-coral" /> Fast Operations
              </h3>
              <div className="space-y-2.5">
                <button 
                  onClick={() => setActiveTab('storage')}
                  className="w-full py-3 px-4 rounded-lg bg-black/50 hover:bg-black text-slate-200 flex items-center justify-between transition-colors border border-olive-border"
                >
                  <span className="flex items-center gap-2"><UploadCloud className="w-4 h-4 text-coral" /> Ingest Disk Image</span>
                  <span className="text-slate-500">→</span>
                </button>
                <button 
                  onClick={handleGenerateDemo}
                  className="w-full py-3 px-4 rounded-lg bg-black/50 hover:bg-black text-slate-200 flex items-center justify-between transition-colors border border-olive-border"
                >
                  <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-coral" /> Generate Full-Spectrum Test Image</span>
                  <span className="text-slate-500">→</span>
                </button>
                <button 
                  onClick={() => setActiveTab('recovered')}
                  className="w-full py-3 px-4 rounded-lg bg-black/50 hover:bg-black text-slate-200 flex items-center justify-between transition-colors border border-olive-border"
                >
                  <span className="flex items-center gap-2"><FileCheck2 className="w-4 h-4 text-coral" /> View All Recovered Files ({recoveredFiles.length})</span>
                  <span className="text-slate-500">→</span>
                </button>
                <button 
                  onClick={() => setActiveTab('graph')}
                  className="w-full py-3 px-4 rounded-lg bg-black/50 hover:bg-black text-slate-200 flex items-center justify-between transition-colors border border-olive-border"
                >
                  <span className="flex items-center gap-2"><Share2 className="w-4 h-4 text-coral" /> View Fragment Graph</span>
                  <span className="text-slate-500">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Storage Sources */}
      {activeTab === 'storage' && (
        <div className="space-y-6">
          <div className="p-8 rounded-xl vista-card border-dashed border-2 border-olive-border hover:border-coral transition-all text-center">
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-12 h-12 rounded-xl bg-black/40 border border-olive-border flex items-center justify-center text-coral mx-auto">
                <UploadCloud className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white uppercase font-display">Ingest Evidence Disk Image</h3>
              <p className="text-slate-400 text-[11px]">
                Supports all raw formats: <code className="text-coral">.dd</code>, <code className="text-coral">.raw</code>, <code className="text-coral">.img</code>, <code className="text-coral">.bin</code>, <code className="text-coral">.iso</code>
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <label className="cursor-pointer btn-coral px-6 py-2.5 rounded text-xs uppercase font-bold shadow-coral-glow">
                  Browse Evidence File
                  <input type="file" onChange={handleFileUpload} className="hidden" />
                </label>
                <button 
                  onClick={handleGenerateDemo}
                  className="px-5 py-2.5 rounded bg-black/60 hover:bg-black text-slate-300 border border-olive-border transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-coral" />
                  Generate Multi-Format Test Image
                </button>
              </div>
            </div>
          </div>

          <div className="vista-card p-6 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-olive-border pb-3 flex items-center gap-2 font-display">
              <HardDrive className="w-4 h-4 text-coral" /> Ingested Storage Evidence
            </h3>

            {storageSources.length > 0 ? (
              <div className="space-y-4">
                {storageSources.map((src, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-black/60 border border-olive-border space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-olive-border/50">
                      <span className="font-bold text-coral flex items-center gap-2">
                        <HardDrive className="w-4 h-4" />
                        {src.filename}
                      </span>
                      <span className="px-2.5 py-0.5 rounded text-[10px] bg-coral/10 text-coral border border-coral/30 font-semibold w-fit">
                        {src.status || 'READY'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-slate-300 text-[11px]">
                      <div>
                        <span className="text-slate-500 block text-[10px]">FILE SIZE</span>
                        <span>{(src.size / 1024).toFixed(2)} KB ({src.size} bytes)</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">FILESYSTEM</span>
                        <span className="text-coral">{src.detectedFileSystem || 'RAW Block Stream'}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">TOTAL SECTORS</span>
                        <span>{src.sectorCount || Math.floor(src.size / 512)} sectors</span>
                      </div>
                    </div>

                    <div className="bg-black/80 p-2.5 rounded border border-olive-border break-all text-[11px] text-slate-400">
                      <span className="text-coral font-bold mr-2">SHA-256 HASH:</span>
                      {src.sha256}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-8 text-slate-500">
                No storage sources uploaded yet. Ingest an evidence file or click "Generate Multi-Format Test Image".
              </p>
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT: Analysis Pipeline */}
      {activeTab === 'analysis' && (
        <div className="space-y-6">
          <div className="vista-card p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-olive-border pb-4">
              <div>
                <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2 font-display">
                  <Cpu className="w-4 h-4 text-coral" />
                  8-Stage Forensic Pipeline Execution
                </h2>
                <p className="text-slate-400 text-[11px]">Automated multi-format carving, signature classification, clustering & integrity validation</p>
              </div>

              <button 
                onClick={runRecoveryPipeline}
                disabled={isAnalyzing}
                className="btn-coral px-6 py-2.5 rounded text-xs uppercase font-bold shadow-coral-glow flex items-center gap-2 w-fit"
              >
                {isAnalyzing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
                {isAnalyzing ? `Analyzing... ${pipelineProgress}%` : 'Execute Pipeline'}
              </button>
            </div>

            {/* Stages Visualizer Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {PIPELINE_STAGES.map((stageName, idx) => {
                const isPassed = activeStageIdx > idx || (!isAnalyzing && recoveredFiles.length > 0);
                const isCurrent = isAnalyzing && activeStageIdx === idx;
                return (
                  <div 
                    key={idx} 
                    className={`p-4 rounded-lg border transition-all ${
                      isPassed 
                        ? 'bg-olive-card border-coral/40 text-coral'
                        : isCurrent
                        ? 'bg-black border-coral text-white shadow-coral-glow animate-pulse'
                        : 'bg-black/40 border-olive-border text-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold tracking-wider">STAGE 0{idx + 1}</span>
                      {isPassed ? (
                        <CheckCircle2 className="w-4 h-4 text-coral" />
                      ) : isCurrent ? (
                        <RefreshCw className="w-4 h-4 animate-spin text-coral" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-slate-700" />
                      )}
                    </div>
                    <div className="font-semibold text-[11px]">{stageName.split(': ')[1]}</div>
                  </div>
                );
              })}
            </div>

            {/* Console Log Window */}
            <div className="rounded-lg bg-black/90 border border-olive-border p-4 text-slate-300 space-y-1.5 max-h-48 overflow-y-auto">
              <div className="text-slate-500 text-[10px] mb-2 flex items-center gap-1.5 border-b border-olive-border pb-1">
                <Terminal className="w-3.5 h-3.5 text-coral" /> RECOVERY ENGINE TERMINAL LOG
              </div>
              {liveLog.length > 0 ? (
                liveLog.map((log, i) => (
                  <div key={i} className="text-slate-200">{log}</div>
                ))
              ) : (
                <div className="text-slate-600">Engine idle. Click "Execute Pipeline" to launch the forensic carver.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Recovered Files (With Category Filters & Format Spectrum) */}
      {activeTab === 'recovered' && (
        <div className="space-y-6">
          
          {/* Category Filter Badges Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {CATEGORIES.map(cat => {
              const Icon = cat.icon;
              const isSel = selectedCategory === cat.id;
              const count = cat.id === 'ALL' 
                ? recoveredFiles.length 
                : recoveredFiles.filter(f => cat.types && cat.types.includes(f.fileType)).length;
              
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    isSel 
                      ? 'bg-coral text-white shadow-coral-glow-sm' 
                      : 'bg-black/60 border border-olive-border text-slate-400 hover:text-white hover:border-slate-600'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                  <span className={`px-1.5 py-0.2 rounded text-[10px] ${isSel ? 'bg-black/40 text-white' : 'bg-olive-border text-slate-300'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="vista-card p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-olive-border pb-4">
              <div>
                <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2 font-display">
                  <FileCheck2 className="w-4 h-4 text-coral" />
                  Recovered File Assets ({filteredFiles.length} files)
                </h2>
                <p className="text-slate-400 text-[11px]">Images, Documents, Videos, Audio, Archives, Code, and Databases</p>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Filter by name or extension..."
                  value={fileSearch}
                  onChange={(e) => setFileSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-black/60 border border-olive-border rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-coral w-full sm:w-64"
                />
              </div>
            </div>

            {filteredFiles.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-olive-border text-slate-400">
                      <th className="pb-3 px-4 font-semibold">FILE NAME</th>
                      <th className="pb-3 px-4 font-semibold">FORMAT</th>
                      <th className="pb-3 px-4 font-semibold">SIZE</th>
                      <th className="pb-3 px-4 font-semibold">COMPLETENESS</th>
                      <th className="pb-3 px-4 font-semibold">CONFIDENCE</th>
                      <th className="pb-3 px-4 font-semibold">STATUS</th>
                      <th className="pb-3 px-4 font-semibold text-right">INSPECT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-olive-border/50">
                    {filteredFiles.map((file, idx) => (
                      <tr key={idx} className="hover:bg-olive-cardHover/50 transition-colors">
                        <td className="py-4 px-4 font-bold text-white">{file.filename}</td>
                        <td className="py-4 px-4">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-black/60 text-coral border border-coral/30 font-bold">
                            {file.fileType}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-slate-300">
                          {(file.recoveredSize / 1024).toFixed(1)} KB
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-black/60 h-2 rounded-full overflow-hidden border border-olive-border">
                              <div className="bg-coral h-full rounded-full" style={{ width: `${file.completeness}%` }} />
                            </div>
                            <span className="text-slate-300">{file.completeness}%</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-bold text-coral">
                            {file.confidence}%
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-semibold border ${
                            file.status === 'FULLY_RECOVERED'
                              ? 'bg-coral/10 text-coral border-coral/30'
                              : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                          }`}>
                            {file.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button 
                            onClick={() => setPreviewFile(file)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-black/50 hover:bg-black text-coral border border-coral/40 font-medium transition-all hover:scale-105"
                          >
                            Deep Preview <ExternalLink className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500 space-y-3">
                <AlertTriangle className="w-8 h-8 text-coral/60 mx-auto" />
                <p>No files match category "{selectedCategory}". Run the AI Recovery Pipeline to carve all formats from disk.</p>
                <button 
                  onClick={runRecoveryPipeline}
                  className="btn-coral px-5 py-2.5 rounded text-xs uppercase font-bold"
                >
                  <Play className="w-3.5 h-3.5 fill-current inline mr-1" /> Execute Recovery Now
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT: Fragment Graph */}
      {activeTab === 'graph' && (
        <div className="space-y-6">
          <div className="vista-card p-6 space-y-4">
            <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-olive-border pb-3 font-display">
              <Share2 className="w-4 h-4 text-coral" />
              Interactive Fragment Relationship Graph
            </h2>

            <div className="h-[550px] w-full rounded-xl overflow-hidden border border-olive-border bg-black/90 relative">
              <FragmentGraph fragments={fragments} relationships={relationships} />
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Audit Log */}
      {activeTab === 'audit' && (
        <div className="space-y-6">
          <div className="vista-card p-6 space-y-4">
            <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-olive-border pb-3 font-display">
              <ScrollText className="w-4 h-4 text-coral" />
              Forensic Chain of Custody & Audit Trail
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-olive-border text-slate-400">
                    <th className="pb-3 px-4 font-semibold">TIMESTAMP</th>
                    <th className="pb-3 px-4 font-semibold">EVENT</th>
                    <th className="pb-3 px-4 font-semibold">USER</th>
                    <th className="pb-3 px-4 font-semibold">IP ADDRESS</th>
                    <th className="pb-3 px-4 font-semibold">DESCRIPTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-olive-border/50">
                  {auditLogs.map((log, idx) => (
                    <tr key={idx} className="hover:bg-olive-cardHover/50">
                      <td className="py-3 px-4 text-slate-400">{new Date(log.timestamp).toLocaleTimeString()}</td>
                      <td className="py-3 px-4 font-bold text-coral">{log.event}</td>
                      <td className="py-3 px-4 text-slate-300">{log.user}</td>
                      <td className="py-3 px-4 text-slate-500">{log.ipAddress || '127.0.0.1'}</td>
                      <td className="py-3 px-4 text-slate-200">{log.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Deep Preview Modal */}
      {previewFile && (
        <FilePreviewModal 
          file={previewFile} 
          fragments={fragments} 
          onClose={() => setPreviewFile(null)} 
        />
      )}
    </div>
  );
}
