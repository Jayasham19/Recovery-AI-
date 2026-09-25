import React, { useState } from 'react';
import { Users, Shield, Plus, Key, CheckCircle, AlertCircle, Trash2 } from 'lucide-react';

export default function UserManagement() {
  const [users, setUsers] = useState([
    { id: 'usr_01', name: 'Special Agent Vance', email: 'vance@reconstructx.ai', role: 'ADMINISTRATOR', status: 'ACTIVE', lastLogin: '2026-09-25 12:45' },
    { id: 'usr_02', name: 'Dr. Evelyn Reed', email: 'reed@forensics.gov', role: 'INVESTIGATOR', status: 'ACTIVE', lastLogin: '2026-09-25 10:12' },
    { id: 'usr_03', name: 'Auditor James Cole', email: 'cole@audit.corp', role: 'VIEWER', status: 'ACTIVE', lastLogin: '2026-09-24 16:30' }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'INVESTIGATOR' });

  const handleAddUser = (e) => {
    e.preventDefault();
    setUsers([...users, { id: `usr_${Date.now()}`, ...newUser, status: 'ACTIVE', lastLogin: 'Never' }]);
    setShowAddModal(false);
    setNewUser({ name: '', email: '', role: 'INVESTIGATOR' });
  };

  return (
    <div className="space-y-6 animate-fadeIn font-mono text-xs">
      <div className="p-6 rounded-2xl glass-panel-glow flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-400" /> Forensic Personnel & Access Control
          </h1>
          <p className="text-slate-400 mt-1">Manage investigator privileges and authentication clearance (PRD Spec 5.1)</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold flex items-center gap-1.5 shadow-glow-cyan"
        >
          <Plus className="w-4 h-4" /> Add Personnel
        </button>
      </div>

      <div className="p-6 rounded-2xl glass-panel">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="pb-3 px-4 font-semibold">NAME</th>
              <th className="pb-3 px-4 font-semibold">EMAIL</th>
              <th className="pb-3 px-4 font-semibold">ROLE</th>
              <th className="pb-3 px-4 font-semibold">STATUS</th>
              <th className="pb-3 px-4 font-semibold">LAST LOGIN</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-cyber-800/50">
                <td className="py-4 px-4 font-bold text-white">{u.name}</td>
                <td className="py-4 px-4 text-cyan-400">{u.email}</td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    u.role === 'ADMINISTRATOR' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                    u.role === 'INVESTIGATOR' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' :
                    'bg-slate-700 text-slate-300'
                  }`}>
                    {u.role}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> {u.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-slate-400">{u.lastLogin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="p-6 rounded-2xl bg-cyber-900 border border-slate-700 w-full max-w-md space-y-4">
            <h3 className="text-base font-bold text-white">Authorize New Investigator</h3>
            <form onSubmit={handleAddUser} className="space-y-3">
              <div>
                <label className="block text-slate-400 mb-1">Full Name</label>
                <input 
                  type="text" 
                  required 
                  value={newUser.name}
                  onChange={e => setNewUser({...newUser, name: e.target.value})}
                  className="w-full bg-cyber-800 border border-slate-700 rounded-xl px-3 py-2 text-white" 
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Email</label>
                <input 
                  type="email" 
                  required 
                  value={newUser.email}
                  onChange={e => setNewUser({...newUser, email: e.target.value})}
                  className="w-full bg-cyber-800 border border-slate-700 rounded-xl px-3 py-2 text-white" 
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Forensic Role</label>
                <select 
                  value={newUser.role}
                  onChange={e => setNewUser({...newUser, role: e.target.value})}
                  className="w-full bg-cyber-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                >
                  <option value="INVESTIGATOR">INVESTIGATOR</option>
                  <option value="ADMINISTRATOR">ADMINISTRATOR</option>
                  <option value="VIEWER">VIEWER</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-400 text-black font-bold"
                >
                  Confirm Clearance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
