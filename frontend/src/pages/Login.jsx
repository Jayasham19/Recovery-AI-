import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Terminal, 
  ShieldAlert, 
  KeyRound, 
  UserCheck, 
  ShieldCheck, 
  ArrowRight, 
  Lock, 
  Mail, 
  User, 
  Shield, 
  Fingerprint, 
  Cpu, 
  FileCheck2 
} from 'lucide-react';
import { api } from '../services/api';

export default function Login({ onLoginSuccess }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('INVESTIGATOR');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('mode') === 'signup') {
      setIsSignUp(true);
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      if (isSignUp) {
        const data = await api.register(name, email, password, role);
        if (data.token && data.user) {
          localStorage.setItem('reconstructx_token', data.token);
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          if (onLoginSuccess) onLoginSuccess(data.user);
          navigate('/dashboard');
        } else {
          setIsSignUp(false);
          setSuccessMsg("Examiner badge provisioned successfully. Please sign in to verify session.");
        }
      } else {
        const data = await api.login(email, password);
        localStorage.setItem('reconstructx_token', data.token);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        if (onLoginSuccess) onLoginSuccess(data.user);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify clearance credentials.');
    } finally {
      setLoading(false);
    }
  };

  const setDemoInvestigator = () => {
    setIsSignUp(false);
    setEmail('vance@reconstructx.forensics');
    setPassword('Forensic2026!');
    setError(null);
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center p-4 font-mono text-slate-300 relative z-10">
      
      {/* Security Banner */}
      <div className="w-full max-w-md mb-3 flex items-center justify-between px-2 text-[10px] text-slate-500 uppercase tracking-wider">
        <span className="flex items-center gap-1.5 text-coral font-bold">
          <Shield className="w-3.5 h-3.5" /> SECURE GATEWAY
        </span>
        <span>ZERO-EXPOSURE PROTOCOL ACTIVE</span>
      </div>

      <div className="w-full max-w-md bg-[#0F141C] border border-[#1E2638] rounded-2xl shadow-2xl p-6 sm:p-8 relative overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600"></div>

        {/* Brand Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-orange-950/40 border border-orange-500/30 rounded-xl text-orange-500 shadow-[0_0_15px_rgba(255,87,51,0.25)]">
            <Terminal size={22} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-wider font-display">
              RECONSTRUCT<span className="text-orange-500">X</span>
            </h1>
            <p className="text-[11px] text-slate-500">
              {isSignUp ? "PROVISION EXAMINER BADGE" : "SECURE FORENSIC TERMINAL ACCESS"}
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-[#090C11] border border-[#1E2638] rounded-lg mb-6 text-xs font-semibold">
          <button
            type="button"
            onClick={() => { setIsSignUp(false); setError(null); setSuccessMsg(null); }}
            className={`py-2 rounded-md transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              !isSignUp 
                ? 'bg-orange-600 text-white shadow-[0_0_10px_rgba(255,87,51,0.3)]' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Lock size={12} /> Sign In
          </button>
          <button
            type="button"
            onClick={() => { setIsSignUp(true); setError(null); setSuccessMsg(null); }}
            className={`py-2 rounded-md transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              isSignUp 
                ? 'bg-orange-600 text-white shadow-[0_0_10px_rgba(255,87,51,0.3)]' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <KeyRound size={12} /> Provision Badge
          </button>
        </div>

        {/* Error / Success Notification */}
        {error && (
          <div className="mb-4 p-3 bg-red-950/40 border border-red-500/30 rounded-lg text-xs text-red-400 flex items-center gap-2">
            <ShieldAlert size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-lg text-xs text-emerald-400 flex items-center gap-2">
            <ShieldCheck size={16} className="shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {isSignUp && (
            <div>
              <label className="block text-slate-400 mb-1 font-semibold">EXAMINER FULL NAME</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Special Agent Vance"
                  className="w-full bg-[#090C11] border border-[#1E2638] rounded-lg pl-9 pr-3 py-2.5 text-white focus:outline-none focus:border-orange-500 placeholder-slate-600"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-slate-400 mb-1 font-semibold">OFFICIAL EMAIL</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="agent.vance@agency.forensics"
                className="w-full bg-[#090C11] border border-[#1E2638] rounded-lg pl-9 pr-3 py-2.5 text-white focus:outline-none focus:border-orange-500 placeholder-slate-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-semibold">SECURITY CLEARANCE KEY</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#090C11] border border-[#1E2638] rounded-lg pl-9 pr-3 py-2.5 text-white focus:outline-none focus:border-orange-500 placeholder-slate-600"
              />
            </div>
          </div>

          {isSignUp && (
            <div>
              <label className="block text-slate-400 mb-1 font-semibold">ACCESS CLEARANCE ROLE</label>
              <div className="relative">
                <Shield className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-[#090C11] border border-[#1E2638] rounded-lg pl-9 pr-3 py-2.5 text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="INVESTIGATOR">LEAD INVESTIGATOR</option>
                  <option value="ADMINISTRATOR">FORENSIC ADMINISTRATOR</option>
                  <option value="VIEWER">AUDITOR / VIEWER</option>
                </select>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-orange-600 hover:bg-orange-500 text-white font-bold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(255,87,51,0.25)] uppercase tracking-wider"
          >
            {loading ? "AUTHENTICATING..." : isSignUp ? "PROVISION BADGE" : "ESTABLISH SESSION"}
            <ArrowRight size={14} />
          </button>
        </form>

        {/* Live Presentation Demo Helper */}
        <div className="mt-6 pt-4 border-t border-[#1E2638] flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <ShieldCheck size={14} /> Node: Protected
          </span>
          <button
            type="button"
            onClick={setDemoInvestigator}
            className="hover:text-orange-400 flex items-center gap-1.5 text-slate-400 underline underline-offset-2 cursor-pointer transition-colors"
          >
            <UserCheck size={13} /> Demo Fill (Agent Vance)
          </button>
        </div>
      </div>

      {/* Security Feature Badges */}
      <div className="mt-6 flex flex-wrap justify-center gap-3 text-[10px] text-slate-500 font-mono">
        <span className="px-3 py-1 rounded bg-black/60 border border-slate-800 flex items-center gap-1">
          <Fingerprint className="w-3 h-3 text-coral" /> SHA-256 Custody Hash
        </span>
        <span className="px-3 py-1 rounded bg-black/60 border border-slate-800 flex items-center gap-1">
          <Cpu className="w-3 h-3 text-coral" /> 12-Format Neural Carve
        </span>
        <span className="px-3 py-1 rounded bg-black/60 border border-slate-800 flex items-center gap-1">
          <FileCheck2 className="w-3 h-3 text-coral" /> Role-Based Tenant Scoping
        </span>
      </div>

    </div>
  );
}
