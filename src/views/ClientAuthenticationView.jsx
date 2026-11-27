import React, { useState } from 'react';
import { 
  X, ShieldCheck, Fingerprint, ArrowRight, Eye, EyeOff, 
  Lock, Sparkles, Phone, ExternalLink, Key, Check, CheckCircle2,
  Headphones, BadgeCheck, FileText, User
} from 'lucide-react';

export default function ClientAuthenticationView({
  onClose,
  onLoginSuccess,
  onLookupGuestOrder,
  onApplyMembership
}) {
  const [authMode, setAuthMode] = useState('password'); // 'password' | 'magic'
  const [email, setEmail] = useState('Elena.vasiliev@couture.com');
  const [password, setPassword] = useState('••••••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleBiometricAuth = (method) => {
    setIsAuthenticating(true);
    triggerToast(`Authenticating with ${method}...`);
    setTimeout(() => {
      setIsAuthenticating(false);
      triggerToast(`Biometric match confirmed for Elena Vasiliev (VIP-ELN-88390)`);
      setTimeout(() => {
        if (onLoginSuccess) onLoginSuccess({ client: 'Elena Vasiliev', tier: 'Noir Elite' });
      }, 700);
    }, 1200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAuthenticating(true);
    triggerToast(authMode === 'magic' ? 'Sending secure 6-digit magic cipher...' : 'Verifying cryptographic credentials...');
    setTimeout(() => {
      setIsAuthenticating(false);
      triggerToast('Credentials authenticated. Welcome, Elena.');
      setTimeout(() => {
        if (onLoginSuccess) onLoginSuccess({ client: 'Elena Vasiliev', tier: 'Noir Elite' });
      }, 700);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#FAF8FF] text-[#151B2D] font-sans antialiased flex flex-col justify-between selection:bg-[#4B41E1]/20 selection:text-[#4B41E1]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-neutral-900 text-white px-5 py-2.5 rounded-full text-xs font-mono shadow-2xl border border-neutral-700 flex items-center gap-2 animate-bounce">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Top Navigation / Linear Focused Shell */}
      <header className="sticky top-0 z-40 w-full bg-[#FAF8FF]/85 backdrop-blur-md px-4 md:px-6 h-14 flex items-center justify-between border-b border-neutral-200/60">
        {/* Left Close Dismiss */}
        <button 
          onClick={onClose}
          aria-label="Close portal" 
          className="w-9 h-9 flex items-center justify-center rounded-full text-neutral-800 hover:bg-neutral-200/60 transition-colors duration-150 active:scale-95"
        >
          <X className="w-5 h-5 text-neutral-800" />
        </button>

        {/* Brand Anchor */}
        <div className="flex flex-col items-center justify-center text-center">
          <span className="font-extrabold text-base tracking-tighter text-black uppercase leading-none">
            AURA
          </span>
          <span className="text-[9px] tracking-[0.24em] font-mono text-neutral-500 uppercase mt-1">
            ATELIER PRIVÉ
          </span>
        </div>

        {/* Concierge Action */}
        <button 
          onClick={() => triggerToast('Connecting to 24/7 Private Concierge (+1 800-840-AURA)...')}
          className="flex items-center gap-1 text-neutral-600 hover:text-black transition-colors py-1 px-2.5 rounded-full hover:bg-neutral-100 active:scale-95 text-xs font-medium" 
          type="button"
        >
          <Headphones className="w-3.5 h-3.5 text-neutral-700" />
          <span className="hidden sm:inline">Concierge</span>
        </button>
      </header>

      {/* Main Authenticate Canvas */}
      <main className="w-full max-w-[480px] mx-auto px-4 md:px-6 pt-6 pb-12 flex-1 flex flex-col justify-center">
        {/* 2. Hero & Identity Section */}
        <section className="mb-6 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#4B41E1]" />
            <span className="text-[10px] font-mono text-neutral-800 tracking-wider uppercase font-bold">
              ENCRYPTED BIOMETRIC ACCESS • 256-BIT
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight mb-2">
            Welcome to Your Atelier
          </h1>
          <p className="text-xs text-neutral-600 leading-relaxed max-w-sm mx-auto">
            Access your private wardrobe archive, live transit telemetry, and bespoke concierge services.
          </p>
        </section>

        {/* 3. Primary Fast Biometric Authentication (1-Tap Experience) */}
        <div className="space-y-2.5 mb-6">
          {/* Face ID / Passkey Primary */}
          <button 
            onClick={() => handleBiometricAuth('Face ID / Passkey')}
            disabled={isAuthenticating}
            className="w-full h-13 bg-black text-white rounded-full flex items-center justify-center gap-3 px-6 shadow-sm hover:bg-neutral-800 active:scale-98 transition-all duration-150 text-xs font-bold tracking-tight" 
            type="button"
          >
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>Continue with Face ID / Passkey</span>
          </button>

          {/* Apple 1-Tap Auth */}
          <button 
            onClick={() => handleBiometricAuth('Apple ID')}
            disabled={isAuthenticating}
            className="w-full h-13 bg-white border border-neutral-300 text-neutral-900 rounded-full flex items-center justify-center gap-2.5 px-6 hover:bg-neutral-50 active:scale-98 transition-all duration-150 text-xs font-bold tracking-tight" 
            type="button"
          >
            <svg aria-hidden="true" className="w-4 h-4 fill-current" viewBox="0 0 170 170">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.69-7.85-12-14.44-6.1-9.35-10.82-20.02-14.15-32.01-3.33-11.99-5-23.24-5-33.76 0-14.35 3.63-26.31 10.89-35.88 7.26-9.57 16.29-14.46 27.09-14.67 4.9.11 10.12 1.34 15.66 3.69 5.54 2.34 9.17 3.62 10.89 3.83 2.18-.21 6.04-1.57 11.59-4.07 5.54-2.51 10.45-3.71 14.73-3.62 9.03.43 16.92 3.69 23.67 9.78 4.13 3.69 7.4 8.16 9.8 13.41-10.23 6.2-15.24 14.68-15.02 25.44.22 8.48 3.59 15.65 10.11 21.52 6.52 5.87 14.24 9.13 23.16 9.78-2.61 7.72-6.19 15.44-10.74 23.16zM119.22 31.85c0-6.74 2.45-13.04 7.35-18.91 4.9-5.87 10.99-9.57 18.27-11.09.43 1.09.65 2.28.65 3.59 0 6.63-2.61 13.16-7.83 19.57-5.22 6.41-11.42 10.11-18.44 11.09 0-1.42 0-2.84 0-4.25z"></path>
            </svg>
            <span>Continue with Apple</span>
          </button>
        </div>

        {/* 4. Architectural Divider */}
        <div className="relative flex items-center justify-center my-5">
          <div className="w-full border-t border-neutral-200"></div>
          <span className="absolute bg-[#FAF8FF] px-3 font-mono text-[10px] uppercase text-neutral-500 tracking-[0.14em]">
            or authenticate with credentials
          </span>
        </div>

        {/* 5. Credential Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email / Identifier Field */}
          <div>
            <label className="block text-[11px] font-mono uppercase text-neutral-600 font-bold tracking-wider mb-2" htmlFor="client-id">
              VIP Client Identifier
            </label>
            <div className="relative">
              <input 
                id="client-id" 
                type="text"
                autoComplete="username" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-12 px-4 bg-white border border-neutral-300 rounded-xl text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                placeholder="Elena.vasiliev@couture.com" 
              />
              <BadgeCheck className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            </div>
          </div>

          {/* Authentication Method Sub-Toggle */}
          <div className="pt-1">
            <div className="flex items-center justify-between mb-2">
              <div className="flex gap-1.5 p-0.5 bg-neutral-100 rounded-lg border border-neutral-200">
                <button 
                  type="button"
                  onClick={() => setAuthMode('password')}
                  className={`px-3 py-1 text-xs rounded-md transition-all ${
                    authMode === 'password'
                      ? 'bg-white text-black font-bold shadow-xs'
                      : 'text-neutral-500 hover:text-black'
                  }`}
                >
                  Enter Atelier Password
                </button>
                <button 
                  type="button"
                  onClick={() => setAuthMode('magic')}
                  className={`px-3 py-1 text-xs rounded-md transition-all ${
                    authMode === 'magic'
                      ? 'bg-white text-black font-bold shadow-xs'
                      : 'text-neutral-500 hover:text-black'
                  }`}
                >
                  Send Magic Link
                </button>
              </div>
              <button 
                type="button"
                onClick={() => triggerToast('Password reset link dispatched to Elena.vasiliev@couture.com')}
                className="text-xs text-[#4B41E1] hover:underline"
              >
                Forgot Key?
              </button>
            </div>

            {/* Password Field with Reveal Toggle */}
            <div className="relative">
              <input 
                id="client-password" 
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-12 px-4 pr-12 bg-white border border-neutral-300 rounded-xl text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all font-mono"
                placeholder={authMode === 'magic' ? 'Enter 6-digit magic cipher' : '••••••••••••••••'} 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black transition-colors p-1"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Device Control */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input 
                type="checkbox" 
                checked={rememberDevice}
                onChange={(e) => setRememberDevice(e.target.checked)}
                className="w-4 h-4 rounded text-black focus:ring-[#4B41E1] border-neutral-300 bg-white cursor-pointer" 
              />
              <span className="text-xs text-neutral-600">
                Remember this trusted device for 30 days
              </span>
            </label>
            <span className="text-[10px] font-mono text-emerald-800 flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Safe Sync
            </span>
          </div>

          {/* Primary Action CTA */}
          <div className="pt-2">
            <button 
              type="submit"
              disabled={isAuthenticating}
              className="w-full h-13 bg-black text-white rounded-full flex items-center justify-center gap-2 text-xs font-bold tracking-tight hover:bg-neutral-800 active:scale-98 transition-all shadow-md"
            >
              <span>{isAuthenticating ? 'Decrypting Vault Token...' : 'Access Atelier Vault'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* 6. Guest / Non-Member Utility Card */}
        <div className="mt-8 p-4 bg-white rounded-2xl border border-neutral-200 shadow-xs">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-neutral-500 tracking-wider block mb-1 font-bold">
                Order Status Telemetry
              </span>
              <h2 className="text-sm font-bold text-neutral-900">Looking for a recent purchase?</h2>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                Track real-time courier dispatch and request concierge garment returns without active authentication.
              </p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between">
            <button 
              onClick={onLookupGuestOrder}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#4B41E1] hover:text-[#3323CC] transition-colors group" 
              type="button"
            >
              <span>Lookup Guest Order & Returns</span>
              <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
            <span className="text-[10px] font-mono text-neutral-400">Order # + Zip</span>
          </div>
        </div>

        {/* 7. New Client Onboarding & Invitation */}
        <div className="mt-6 text-center pt-2">
          <div className="inline-flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-neutral-600">New to AURA?</span>
            <button 
              onClick={onApplyMembership || (() => triggerToast('Private Membership Application opened for new client'))}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-900 hover:text-[#4B41E1] transition-colors underline underline-offset-4"
            >
              <span>Apply for Atelier Membership</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#E2DFFF] text-[#0F0069] tracking-widest uppercase font-bold">
                VIP
              </span>
            </button>
          </div>
        </div>

        {/* 8. Security & Atelier Concierge Assurance */}
        <footer className="mt-8 pt-4 border-t border-neutral-200 text-center space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-neutral-500 text-xs font-mono">
            <Lock className="w-3.5 h-3.5 text-neutral-400" />
            <span>Protected by AURA Cryptographic Vault Architecture</span>
          </div>
          <p className="text-[11px] text-neutral-500">
            Require confidential assistance?{' '}
            <button 
              onClick={() => triggerToast('Connecting to VIP Private Client Desk...')}
              className="text-[#4B41E1] font-semibold hover:underline"
            >
              Connect with Live Concierge
            </button>{' '}
            or dial <span className="font-bold text-neutral-900">+1 (800) 840-AURA</span>.
          </p>
        </footer>
      </main>
    </div>
  );
}
