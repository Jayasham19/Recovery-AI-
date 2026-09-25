import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { 
  FolderLock, 
  HardDrive, 
  Activity, 
  Bell, 
  LogOut, 
  Plus, 
  Terminal, 
  Database, 
  Cpu, 
  Users, 
  Settings as SettingsIcon, 
  ChevronRight, 
  User as UserIcon, 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  Shield 
} from 'lucide-react';
import { api } from './services/api';
import Logo from './components/Logo';
import ParticleBackground from './components/ParticleBackground';
import Dashboard from './pages/Dashboard';
import CreateCase from './pages/CreateCase';
import CaseDetails from './pages/CaseDetails';
import Login from './pages/Login';
import UserManagement from './pages/UserManagement';
import Settings from './pages/Settings';

function NavigationBar({ user, onLogout, notifications }) {
  const location = useLocation();
  const [showNotif, setShowNotif] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-black/85 backdrop-blur-xl border-b border-slate-900 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-4">
          <Link to={user ? "/dashboard" : "/login"} className="flex items-center gap-3 group">
            <Logo className="w-8 h-8 group-hover:scale-105 transition-transform" textClassName="text-lg" />
          </Link>
          {!user && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-500/30 text-[10px] text-amber-400 font-bold">
              <Lock className="w-3 h-3 text-amber-400" />
              <span>CLEARANCE REQUIRED</span>
            </div>
          )}
        </div>

        {/* Center Pill Nav Bar (Only available to authenticated examiners) */}
        {user ? (
          <div className="hidden md:flex items-center gap-6 px-6 py-2 rounded-full bg-[#121614]/90 border border-[#232d25] text-xs">
            <Link 
              to="/dashboard" 
              className={`transition-colors hover:text-coral ${
                location.pathname === '/' || location.pathname === '/dashboard' ? 'text-coral font-bold' : 'text-slate-300'
              }`}
            >
              Solutions
            </Link>
            <Link 
              to="/cases/new" 
              className={`transition-colors hover:text-coral ${
                location.pathname === '/cases/new' ? 'text-coral font-bold' : 'text-slate-300'
              }`}
            >
              Investigation
            </Link>
            <Link 
              to="/admin/users" 
              className={`transition-colors hover:text-coral ${
                location.pathname === '/admin/users' ? 'text-coral font-bold' : 'text-slate-300'
              }`}
            >
              Personnel
            </Link>
            <Link 
              to="/settings" 
              className={`transition-colors hover:text-coral ${
                location.pathname === '/settings' ? 'text-coral font-bold' : 'text-slate-300'
              }`}
            >
              Settings
            </Link>
          </div>
        ) : (
          <div className="text-xs text-slate-500 hidden sm:block">
            RESTRICTED FORENSIC TERMINAL // ZERO PUBLIC CASE EXPOSURE
          </div>
        )}

        {/* Right Tools & CTA Button */}
        <div className="flex items-center gap-3">
          
          {user ? (
            <>
              {/* Notification Alert Bell */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotif(!showNotif)}
                  className="p-2 rounded-full bg-black/60 border border-olive-border text-slate-300 hover:text-coral relative transition-colors cursor-pointer"
                  title="Custody Alerts"
                >
                  <Bell className="w-4 h-4" />
                  {notifications?.length > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-coral animate-ping" />
                  )}
                </button>

                {showNotif && (
                  <div className="absolute right-0 mt-2 w-80 rounded-xl bg-black border border-olive-border shadow-2xl p-4 space-y-3 z-50 text-xs animate-fadeIn">
                    <div className="flex items-center justify-between pb-2 border-b border-olive-border">
                      <span className="font-bold text-white uppercase">Forensic Alerts</span>
                      <span className="text-[10px] text-coral">{notifications.length} queued</span>
                    </div>
                    <div className="max-h-60 overflow-y-auto space-y-2">
                      {notifications.map((n, i) => (
                        <div key={i} className="p-2.5 rounded bg-olive-card border border-olive-border text-[11px]">
                          <span className="font-bold text-slate-200 block">{n.title}</span>
                          <span className="text-slate-400 block mt-0.5">{n.message}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Launch Case Action */}
              <Link 
                to="/cases/new" 
                className="btn-coral px-4 py-2 rounded text-xs font-bold uppercase tracking-wider hidden sm:flex items-center gap-1.5 shadow-coral-glow-sm"
              >
                <Plus className="w-3.5 h-3.5" /> Launch Case
              </Link>

              {/* User Signout / Switch Examiner */}
              <div className="flex items-center gap-2 pl-3 border-l border-slate-800 text-xs">
                <div className="flex flex-col text-right hidden sm:block">
                  <span className="font-bold text-slate-200">{user?.name || 'Special Agent Vance'}</span>
                  <span className="text-[10px] text-coral uppercase">{user?.role || 'INVESTIGATOR'}</span>
                </div>
                <button 
                  onClick={onLogout}
                  title="Disconnect Session"
                  className="p-1.5 rounded bg-black/60 border border-olive-border text-slate-400 hover:text-coral transition-colors ml-1 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link 
                to="/login"
                className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white border border-slate-700 bg-black/60 hover:border-slate-500 transition-all flex items-center gap-1.5"
              >
                <Terminal className="w-3.5 h-3.5 text-coral" /> Sign In
              </Link>
              <Link 
                to="/login?mode=signup"
                className="btn-coral px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hidden sm:flex items-center gap-1.5 shadow-coral-glow-sm"
              >
                <KeyRound className="w-3.5 h-3.5" /> Provision Badge
              </Link>
            </div>
          )}

        </div>

      </div>
    </header>
  );
}

export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    const token = localStorage.getItem('reconstructx_token') || localStorage.getItem('token');
    return (saved && token) ? JSON.parse(saved) : null;
  });

  const [stats, setStats] = useState(null);
  const [cases, setCases] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const refreshGlobalData = async () => {
    if (!user) return;
    try {
      const [s, c, n] = await Promise.all([
        api.getDashboardStats(),
        api.getCases(),
        api.getNotifications()
      ]);
      setStats(s);
      setCases(c || []);
      setNotifications(n || []);
    } catch (err) {
      console.warn("API sync:", err.message);
    }
  };

  useEffect(() => {
    if (user) {
      refreshGlobalData();
      const interval = setInterval(refreshGlobalData, 10000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('reconstructx_token');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setCases([]);
    setStats(null);
    setNotifications([]);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-black text-slate-100 relative overflow-x-hidden">
        
        {/* Dynamic Canvas Particle Constellation */}
        <ParticleBackground />

        {/* Global Sticky Navigation Bar */}
        <NavigationBar 
          user={user} 
          onLogout={handleLogout} 
          notifications={notifications} 
        />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <Routes>
            {/* If authenticated -> Dashboard, else -> Login portal */}
            <Route 
              path="/" 
              element={
                user ? (
                  <Dashboard stats={stats} cases={cases} onRefresh={refreshGlobalData} />
                ) : (
                  <Login onLoginSuccess={handleLoginSuccess} />
                )
              } 
            />

            <Route 
              path="/dashboard" 
              element={
                user ? (
                  <Dashboard stats={stats} cases={cases} onRefresh={refreshGlobalData} />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />

            <Route 
              path="/cases/new" 
              element={
                user ? (
                  <CreateCase user={user} onCaseCreated={refreshGlobalData} />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />

            <Route 
              path="/cases/:caseId" 
              element={
                user ? (
                  <CaseDetails />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />

            <Route 
              path="/admin/users" 
              element={
                user ? (
                  <UserManagement />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />

            <Route 
              path="/settings" 
              element={
                user ? (
                  <Settings />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />

            <Route 
              path="/login" 
              element={
                user ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Login onLoginSuccess={handleLoginSuccess} />
                )
              } 
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
