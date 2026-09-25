import React, { useState } from 'react';
import { Settings as SettingsIcon, Database, Cpu, ShieldCheck, HardDrive, Key, Save } from 'lucide-react';

export default function Settings() {
  const [config, setConfig] = useState({
    mongoUri: 'mongodb://localhost:27017/reconstructx',
    blockSize: 4096,
    entropyThreshold: 7.2,
    enableGptAssistance: true,
    autoHashVerification: true,
    readOnlyCustodyLock: true
  });
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn font-mono text-xs">
      <div className="p-6 rounded-2xl glass-panel-glow">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <SettingsIcon className="w-5 h-5 text-cyan-400" /> Workstation & Engine Configuration
        </h1>
        <p className="text-slate-400 mt-1">Configure MongoDB persistence, block sector size, and neural carving heuristics</p>
      </div>

      <form onSubmit={handleSave} className="p-6 rounded-2xl glass-panel space-y-5">
        <div>
          <label className="block text-slate-300 font-semibold mb-1">MONGODB ATLAS / LOCAL URI</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={config.mongoUri}
              onChange={e => setConfig({...config, mongoUri: e.target.value})}
              className="flex-1 bg-cyber-800 border border-slate-700 rounded-xl px-3 py-2 text-cyan-400" 
            />
          </div>
          <span className="text-[10px] text-slate-500">Connected to local instance with automatic seamless in-memory fallback.</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">SECTOR BLOCK CARVING SIZE (BYTES)</label>
            <select 
              value={config.blockSize}
              onChange={e => setConfig({...config, blockSize: Number(e.target.value)})}
              className="w-full bg-cyber-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
            >
              <option value={512}>512 Bytes (Standard HDD Sector)</option>
              <option value={2048}>2048 Bytes (CD/Optical Sector)</option>
              <option value={4096}>4096 Bytes (NTFS / EXT4 Cluster - Default)</option>
              <option value={8192}>8192 Bytes (Large Block Storage)</option>
            </select>
          </div>
          <div>
            <label className="block text-slate-300 font-semibold mb-1">HIGH-ENTROPY THRESHOLD (0.0 - 8.0)</label>
            <input 
              type="number" 
              step="0.1" 
              min="1.0" 
              max="8.0"
              value={config.entropyThreshold}
              onChange={e => setConfig({...config, entropyThreshold: Number(e.target.value)})}
              className="w-full bg-cyber-800 border border-slate-700 rounded-xl px-3 py-2 text-white" 
            />
          </div>
        </div>

        <div className="space-y-3 pt-2 border-t border-slate-800">
          <label className="flex items-center gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              checked={config.readOnlyCustodyLock}
              onChange={e => setConfig({...config, readOnlyCustodyLock: e.target.checked})}
              className="w-4 h-4 rounded text-cyan-400 bg-cyber-800 border-slate-700" 
            />
            <span>Enforce Read-Only Custody Lock on all ingested disk images</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              checked={config.autoHashVerification}
              onChange={e => setConfig({...config, autoHashVerification: e.target.checked})}
              className="w-4 h-4 rounded text-cyan-400 bg-cyber-800 border-slate-700" 
            />
            <span>Automated SHA-256 and MD5 multi-pass verification</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              checked={config.enableGptAssistance}
              onChange={e => setConfig({...config, enableGptAssistance: e.target.checked})}
              className="w-4 h-4 rounded text-cyan-400 bg-cyber-800 border-slate-700" 
            />
            <span>Enable AI Fragment Explanations & Recovery Insights</span>
          </label>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          {saved ? (
            <span className="text-emerald-400 flex items-center gap-1 font-bold">
              ✓ Configuration parameters saved successfully
            </span>
          ) : <span />}

          <button 
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold flex items-center gap-2 shadow-glow-cyan"
          >
            <Save className="w-4 h-4" /> Save Configuration
          </button>
        </div>
      </form>
    </div>
  );
}
