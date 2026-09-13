import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SmartLogo } from '../components/SmartLogo';
import { 
  Lock, 
  User, 
  Key, 
  ShieldCheck, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  Sparkles, 
  AlertCircle
} from 'lucide-react';
import { ProdexAdminLayout } from '../components/admin/ProdexAdminLayout';

const DEMO_USER = 'admin';
const DEMO_PASS = 'admin123';
const DEMO_EMAIL = 'admin@smartengineering-bd.com';

export const AdminPage: React.FC = () => {
  const { navigateTo } = useApp();
  
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('smart_steel_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  // Login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle Login submission
  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg('');

    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();

    if (
      (cleanUser === DEMO_USER || cleanUser === DEMO_EMAIL || cleanUser === 'admin@smartengineering.com') &&
      (cleanPass === DEMO_PASS || cleanPass === 'admin')
    ) {
      try {
        localStorage.setItem('smart_steel_admin_auth', 'true');
      } catch (err) {
        console.error(err);
      }
      setIsAuthenticated(true);
    } else {
      setErrorMsg('Invalid username or password. Please use the demo credentials provided below.');
    }
  };

  // Quick 1-click Demo Credentials filler and auto login
  const handleQuickDemoLogin = () => {
    setUsername(DEMO_USER);
    setPassword(DEMO_PASS);
    setErrorMsg('');
    try {
      localStorage.setItem('smart_steel_admin_auth', 'true');
    } catch (err) {
      console.error(err);
    }
    setIsAuthenticated(true);
  };

  // Logout
  const handleLogout = () => {
    try {
      localStorage.removeItem('smart_steel_admin_auth');
    } catch (err) {
      console.error(err);
    }
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  // ==========================================
  // 1. LOGIN SCREEN (When Not Authenticated)
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          
          {/* Header Branding */}
          <div className="text-center mb-8">
            <div className="inline-block mb-3">
              <button 
                onClick={() => navigateTo('home')}
                className="cursor-pointer transition-transform hover:scale-105"
                title="Return to Home"
              >
                <SmartLogo size="md" />
              </button>
            </div>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Administrative Control Portal
              </span>
            </div>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            
            {/* Top Security Banner */}
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/30 flex items-center justify-center text-[#e52424]">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white leading-tight">Admin Authentication</h3>
                  <p className="text-[11px] text-slate-400">Restricted personnel access only</p>
                </div>
              </div>
              <span className="bg-slate-800 text-amber-400 text-[10px] font-mono px-2 py-0.5 rounded border border-slate-700">
                v2.4 CMS
              </span>
            </div>

            <div className="p-6 sm:p-8 space-y-6">

              {/* DEMO CREDENTIALS HIGHLIGHT BOX */}
              <div className="bg-amber-50 border-2 border-amber-300/80 rounded-xl p-4 relative overflow-hidden">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                      Demo Access Credentials
                    </span>
                  </div>
                  <span className="bg-amber-200 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    Public Test
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs mb-3 font-mono bg-white/80 p-2.5 rounded-lg border border-amber-200">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-sans font-bold">Username</span>
                    <span className="text-slate-900 font-bold">{DEMO_USER}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-sans font-bold">Password</span>
                    <span className="text-slate-900 font-bold">{DEMO_PASS}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <Key className="w-3.5 h-3.5" />
                  <span>1-Click Auto Fill & Login</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Error Alert */}
              {errorMsg && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg p-3 flex items-start gap-2 animate-shake">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Username or Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="admin"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#e52424] focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#e52424] focus:border-transparent transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#e52424] hover:bg-[#c91818] text-white font-bold text-sm py-3 px-4 rounded-lg flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Log In to Admin Portal</span>
                </button>
              </form>

              {/* Back to Live Website */}
              <div className="pt-2 border-t border-slate-100 text-center">
                <button
                  onClick={() => navigateTo('home')}
                  className="text-xs font-semibold text-slate-500 hover:text-[#e52424] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>← Return to Public Website</span>
                </button>
              </div>

            </div>

          </div>

          <p className="text-center text-xs text-slate-500 mt-6">
            Smart Engineering BD © 2007–2026. Design-Build Steel Building Construction Management.
          </p>

        </div>
      </div>
    );
  }

  // ==========================================
  // 2. DEDICATED ADMIN DASHBOARD (Authenticated)
  // Matching Image 2 (Prodex Dashboard Layout)
  // ==========================================
  return <ProdexAdminLayout onLogout={handleLogout} />;
};
