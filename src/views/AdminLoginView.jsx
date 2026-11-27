import React, { useState } from 'react';
import { 
  ShieldCheck, Lock, ArrowRight, Eye, EyeOff, Sparkles, 
  Crown, Store, AlertCircle, ArrowLeft, KeyRound, CheckCircle2
} from 'lucide-react';
import { apiService } from '../services/apiService';

export default function AdminLoginView({ onLoginSuccess, onReturnToStore }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = async (e) => {
    e?.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const res = await apiService.adminLogin(email, password);
      if (res.status === 'success' || res.token) {
        setSuccessMessage(`Authenticated as ${res.user?.name || 'Administrator'} (${res.user?.role || 'Super Admin'})`);
        setTimeout(() => {
          if (onLoginSuccess) {
            onLoginSuccess(res.user);
          } else {
            window.location.hash = '#admin/dashboard';
          }
        }, 600);
      } else {
        setErrorMessage(res.message || 'Invalid administrator credentials');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Administrative verification failed. Ensure backend API is active.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickFill = (roleEmail, rolePass) => {
    setEmail(roleEmail);
    setPassword(rolePass);
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-[#141216] text-[#FBF8F5] flex flex-col justify-between font-sans selection:bg-[#7A3E5D] selection:text-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#7A3E5D]/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#D8A7B1]/10 blur-3xl pointer-events-none" />

      {/* Top Bar */}
      <header className="px-6 py-6 border-b border-white/10 flex items-center justify-between z-10 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#7A3E5D] to-[#4F253B] flex items-center justify-center shadow-lg border border-[#D8A7B1]/30">
            <Crown className="w-5 h-5 text-[#D8A7B1]" />
          </div>
          <div>
            <h1 className="font-serif text-lg tracking-wider text-white font-medium">SULTANA'S DREAM</h1>
            <p className="text-[10px] tracking-widest text-[#D8A7B1] uppercase font-mono">Administrative ERP Control Gateway</p>
          </div>
        </div>

        <button
          onClick={() => {
            if (onReturnToStore) onReturnToStore();
            else window.location.hash = '#shop/storefront';
          }}
          className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/30 transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Storefront</span>
        </button>
      </header>

      {/* Center Auth Card */}
      <main className="flex-1 flex items-center justify-center p-6 z-10">
        <div className="w-full max-w-md bg-[#1C1820] border border-white/15 rounded-2xl p-8 shadow-2xl backdrop-blur-xl relative">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7A3E5D]/30 border border-[#7A3E5D]/50 text-[#D8A7B1] text-xs font-mono mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Protected Single App Route: /admin</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl text-white tracking-wide font-normal">
              Atelier Management
            </h2>
            <p className="text-xs text-neutral-400 mt-2 font-light">
              Sign in with administrative privileges to manage products, orders, inventory ledger, and live storefront CMS.
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Success Banner */}
          {successMessage && (
            <div className="mb-6 p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase font-mono tracking-wider text-neutral-300 mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@sultanasdream.com"
                  className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#7A3E5D] focus:ring-1 focus:ring-[#7A3E5D] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase font-mono tracking-wider text-neutral-300 mb-1.5">
                Master Security Key / Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#7A3E5D] focus:ring-1 focus:ring-[#7A3E5D] transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#7A3E5D] to-[#9C5177] hover:from-[#8B486B] hover:to-[#AC5C84] text-white text-xs font-mono uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#7A3E5D]/25 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <span>Verifying Role Credentials...</span>
              ) : (
                <>
                  <KeyRound className="w-4 h-4 text-[#D8A7B1]" />
                  <span>Authenticate & Enter Admin Suite</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Demo Quick Fill Buttons */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 text-center mb-3">
              One-Click Role Selection (Development & Demo)
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('', '')}
                className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all group"
              >
                <div className="flex items-center gap-1.5 text-xs text-white font-medium group-hover:text-[#D8A7B1]">
                  <Crown className="w-3.5 h-3.5 text-[#D8A7B1]" />
                  <span>Super Admin</span>
                </div>
                <div className="text-[10px] text-neutral-400 font-mono mt-0.5 truncate">
                  Full ERP Control
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('', '')}
                className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all group"
              >
                <div className="flex items-center gap-1.5 text-xs text-white font-medium group-hover:text-[#D8A7B1]">
                  <Store className="w-3.5 h-3.5 text-[#D8A7B1]" />
                  <span>Store Manager</span>
                </div>
                <div className="text-[10px] text-neutral-400 font-mono mt-0.5 truncate">
                  Catalog & Orders
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-white/10 text-center text-xs text-neutral-500 font-mono">
        Sultana's Dream Unified Architecture • Single Frontend + Single Backend Engine • PHP Laravel API Gateway 127.0.0.1:8000
      </footer>
    </div>
  );
}
