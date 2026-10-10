import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, User, ShieldCheck, Heart, Sparkles, CheckCircle2 } from 'lucide-react';

interface AuthScreensProps {
  currentView: 'welcome' | 'login' | 'register';
  onNavigate: (view: 'welcome' | 'login' | 'register') => void;
  onLoginSuccess: (user: { name: string; email: string }) => void;
}

export const AuthScreens: React.FC<AuthScreensProps> = ({
  currentView,
  onNavigate,
  onLoginSuccess,
}) => {
  // Login State
  const [loginEmail, setLoginEmail] = useState('alex.rivera@college.edu');
  const [loginPassword, setLoginPassword] = useState('mindcare123');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Register State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regError, setRegError] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Quick Demo Auto-fill
  const fillDemoStudent = () => {
    setLoginEmail('alex.rivera@college.edu');
    setLoginPassword('mindcare123');
    setLoginError('');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginEmail || !loginEmail.includes('@')) {
      setLoginError('Please enter a valid academic or personal email address.');
      return;
    }
    if (!loginPassword || loginPassword.length < 6) {
      setLoginError('Password must contain at least 6 characters.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess({
        name: loginEmail.split('@')[0].replace('.', ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase()),
        email: loginEmail,
      });
    }, 600);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');

    if (!regName.trim()) {
      setRegError('Please provide your full name.');
      return;
    }
    if (!regEmail || !regEmail.includes('@')) {
      setRegError('Please enter a valid email address.');
      return;
    }
    if (regPassword.length < 6) {
      setRegError('Password must be at least 6 characters.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setRegError('Password and confirmation password do not match.');
      return;
    }
    if (!agreeTerms) {
      setRegError('You must agree to the wellness and privacy guidelines.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess({
        name: regName.trim(),
        email: regEmail.trim(),
      });
    }, 700);
  };

  // 1. WELCOME SCREEN
  if (currentView === 'welcome') {
    return (
      <div className="w-full h-full flex flex-col justify-between p-6 bg-gradient-to-b from-[#FAF8FF] via-white to-[#F0FDF4] overflow-y-auto">
        <div className="pt-8 flex flex-col items-center text-center">
          <div className="relative mb-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-purple-200 via-indigo-100 to-emerald-100 flex items-center justify-center shadow-inner">
              <div className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center text-purple-600">
                <Heart className="w-10 h-10 fill-purple-100 text-purple-600" />
              </div>
            </div>
            <div className="absolute top-0 right-0 p-1.5 bg-emerald-500 rounded-full text-white shadow">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Find Peace & Balance
          </h2>
          <p className="mt-2.5 text-xs text-slate-600 leading-relaxed max-w-xs">
            Compassionate counseling, daily mood check-ins, and guided breathing designed for college peace of mind.
          </p>

          <div className="mt-5 p-3 bg-purple-50 border border-purple-200/80 rounded-2xl w-full text-left">
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-900">
              <ShieldCheck className="w-4 h-4 text-purple-600" />
              College Lab Demonstration Mode
            </div>
            <p className="mt-1 text-[11px] text-purple-700/90 leading-normal">
              Local simulation active: All data is saved on device storage. No real external account is required.
            </p>
          </div>
        </div>

        <div className="py-6 space-y-3">
          <button
            onClick={() => onNavigate('login')}
            className="w-full py-3.5 bg-[#8C7AE6] hover:bg-[#7A67D8] text-white font-semibold text-sm rounded-2xl shadow-md shadow-purple-500/20 active:scale-[0.98] transition-all"
          >
            Sign In with Email
          </button>

          <button
            onClick={() => onNavigate('register')}
            className="w-full py-3.5 bg-white hover:bg-slate-50 border-2 border-[#8C7AE6]/40 text-[#8C7AE6] font-semibold text-sm rounded-2xl active:scale-[0.98] transition-all"
          >
            Create an Account
          </button>

          <button
            onClick={() => {
              onLoginSuccess({ name: 'Alex Rivera (Guest)', email: 'alex.rivera@college.edu' });
            }}
            className="w-full py-2 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
          >
            Quick Guest Demo (Skip Auth)
          </button>
        </div>
      </div>
    );
  }

  // 2. LOGIN SCREEN
  if (currentView === 'login') {
    return (
      <div className="w-full h-full flex flex-col p-6 bg-white overflow-y-auto">
        <div className="pt-4 pb-2">
          <h2 className="text-2xl font-bold text-slate-900">Welcome Back</h2>
          <p className="text-xs text-slate-500 mt-1">
            Sign in to access your mood logs, counseling chat, and self-care journal.
          </p>
        </div>

        {/* Demo Credentials Helper Pill */}
        <div className="my-3 p-3 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-indigo-900">Lab Evaluation Credentials</div>
            <div className="text-[10px] text-indigo-700 font-mono mt-0.5">alex.rivera@college.edu / mindcare123</div>
          </div>
          <button
            onClick={fillDemoStudent}
            type="button"
            className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-medium rounded-lg shadow-sm"
          >
            Autofill
          </button>
        </div>

        {loginError && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl mb-3">
            {loginError}
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-4 flex-1 flex flex-col">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                placeholder="student@college.edu"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type={showLoginPassword ? 'text' : 'password'}
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-10 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-slate-800"
              />
              <button
                type="button"
                onClick={() => setShowLoginPassword(!showLoginPassword)}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                aria-label="Toggle password visibility"
              >
                {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 text-[11px]">Remember on this device</span>
            <button
              type="button"
              onClick={() => alert('Demo Password Reset link sent to your simulated mailbox.')}
              className="text-purple-600 hover:underline font-medium"
            >
              Forgot password?
            </button>
          </div>

          <div className="pt-4 mt-auto">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-[#8C7AE6] hover:bg-[#7A67D8] text-white font-semibold text-sm rounded-2xl shadow-md shadow-purple-500/20 active:scale-[0.98] transition-all flex items-center justify-center"
            >
              {isSubmitting ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'Sign In'
              )}
            </button>

            <p className="mt-4 text-center text-xs text-slate-500">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => onNavigate('register')}
                className="text-purple-600 font-semibold hover:underline"
              >
                Create Account
              </button>
            </p>
          </div>
        </form>
      </div>
    );
  }

  // 3. REGISTER SCREEN
  return (
    <div className="w-full h-full flex flex-col p-6 bg-white overflow-y-auto">
      <div className="pt-2 pb-2">
        <h2 className="text-2xl font-bold text-slate-900">Create Account</h2>
        <p className="text-xs text-slate-500 mt-1">
          Join MindCare for compassionate mental wellness & guidance.
        </p>
      </div>

      {regError && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl mb-3">
          {regError}
        </div>
      )}

      <form onSubmit={handleRegisterSubmit} className="space-y-3.5 flex-1 flex flex-col">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={regName}
              onChange={e => setRegName(e.target.value)}
              placeholder="e.g. Alex Rivera"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-slate-800"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="email"
              value={regEmail}
              onChange={e => setRegEmail(e.target.value)}
              placeholder="alex@college.edu"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-slate-800"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type={showRegPassword ? 'text' : 'password'}
              value={regPassword}
              onChange={e => setRegPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full pl-10 pr-11 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-slate-800"
            />
            <button
              type="button"
              onClick={() => setShowRegPassword(!showRegPassword)}
              className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
            >
              {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Confirm Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="password"
              value={regConfirmPassword}
              onChange={e => setRegConfirmPassword(e.target.value)}
              placeholder="Repeat your password"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-slate-800"
            />
          </div>
        </div>

        <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer pt-1">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={e => setAgreeTerms(e.target.checked)}
            className="mt-0.5 rounded text-purple-600 focus:ring-purple-500"
          />
          <span className="text-[11px] leading-tight">
            I acknowledge this is a college lab project with simulated storage and agree to use MindCare for mental wellness.
          </span>
        </label>

        <div className="pt-3 mt-auto">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-[#8C7AE6] hover:bg-[#7A67D8] text-white font-semibold text-sm rounded-2xl shadow-md shadow-purple-500/20 active:scale-[0.98] transition-all flex items-center justify-center"
          >
            {isSubmitting ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'Create Account'
            )}
          </button>

          <p className="mt-3 text-center text-xs text-slate-500">
            Already registered?{' '}
            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="text-purple-600 font-semibold hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};
