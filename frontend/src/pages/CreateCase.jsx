import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderPlus, Shield, ArrowLeft, CheckCircle2, UserCheck, Lock } from 'lucide-react';
import { api } from '../services/api';

export default function CreateCase({ onCaseCreated, user }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Get current authenticated examiner
  const currentExaminerName = user?.name || (() => {
    try {
      const saved = localStorage.getItem('user');
      return saved ? JSON.parse(saved)?.name : 'Special Agent Vance';
    } catch (e) {
      return 'Special Agent Vance';
    }
  })();

  const currentExaminerId = user?.id || user?._id || (() => {
    try {
      const saved = localStorage.getItem('user');
      return saved ? (JSON.parse(saved)?.id || JSON.parse(saved)?._id) : 'usr_vance';
    } catch (e) {
      return 'usr_vance';
    }
  })();

  const [formData, setFormData] = useState(() => ({
    caseName: '',
    caseId: `CASE-${Math.floor(1000 + Math.random() * 9000)}`,
    investigatorId: currentExaminerId,
    investigatorName: currentExaminerName,
    classification: 'Corporate Forensics',
    description: ''
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const created = await api.createCase(formData);
      if (onCaseCreated) onCaseCreated();
      navigate(`/cases/${created.caseId || formData.caseId}`);
    } catch (err) {
      alert(`Failed to create case: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn font-mono text-xs relative z-10">
      <button 
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-2 text-slate-400 hover:text-coral transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      <div className="vista-card p-8 space-y-6">
        <div className="flex items-center gap-3 pb-6 border-b border-olive-border">
          <div className="w-10 h-10 rounded-lg bg-black/40 border border-olive-border flex items-center justify-center text-coral">
            <FolderPlus className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white font-display uppercase tracking-wider">Initialize Forensic Case</h1>
            <p className="text-slate-400 text-[11px]">Establish chain of custody and configure recovery workspace</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-2 uppercase">CASE ID</label>
              <input 
                type="text" 
                required
                value={formData.caseId}
                onChange={(e) => setFormData({ ...formData, caseId: e.target.value })}
                className="w-full bg-black/60 border border-olive-border rounded-lg px-4 py-2.5 text-coral font-bold focus:outline-none focus:border-coral"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-slate-300 font-semibold uppercase">INVESTIGATOR IN CHARGE</label>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <UserCheck className="w-3 h-3" /> Authenticated
                </span>
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  required
                  value={formData.investigatorName}
                  onChange={(e) => setFormData({ ...formData, investigatorName: e.target.value })}
                  className="w-full bg-black/60 border border-emerald-500/40 rounded-lg px-4 py-2.5 text-white font-semibold focus:outline-none focus:border-coral shadow-[0_0_10px_rgba(16,185,129,0.1)]"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                  {user?.role || 'INVESTIGATOR'}
                </span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-2 uppercase">CASE NAME</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Investigation Operation 001"
              value={formData.caseName}
              onChange={(e) => setFormData({ ...formData, caseName: e.target.value })}
              className="w-full bg-black/60 border border-olive-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-coral"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-2 uppercase">FORENSIC CLASSIFICATION</label>
            <select 
              value={formData.classification}
              onChange={(e) => setFormData({ ...formData, classification: e.target.value })}
              className="w-full bg-black/60 border border-olive-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-coral"
            >
              <option value="Corporate Forensics">Corporate Forensics</option>
              <option value="Criminal Investigation">Criminal Investigation</option>
              <option value="Disaster Recovery">Disaster Recovery / Drive Corruption</option>
              <option value="Financial Audit">Financial Audit &amp; Transaction Logs</option>
              <option value="Cyber Incident Response">Cyber Incident Response</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-2 uppercase">CASE DESCRIPTION &amp; SCOPE</label>
            <textarea 
              rows={4}
              placeholder="Detail the storage medium, suspected damage, sector corruption, and critical target file extensions..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-black/60 border border-olive-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-coral resize-none"
            />
          </div>

          <div className="pt-4 border-t border-olive-border flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-5 py-2.5 rounded-lg border border-olive-border bg-black/40 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-coral px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-coral-glow-sm"
            >
              <CheckCircle2 className="w-4 h-4" />
              {loading ? 'Creating...' : 'Create Forensic Case'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
