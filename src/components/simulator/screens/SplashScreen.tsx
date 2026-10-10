import React, { useEffect } from 'react';
import { Flower2, Heart, ArrowRight } from 'lucide-react';

interface SplashScreenProps {
  onContinue: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onContinue }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onContinue();
    }, 2800);
    return () => clearTimeout(timer);
  }, [onContinue]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between p-8 bg-gradient-to-b from-[#F5F3FF] via-[#EDE9FE] to-[#E0E7FF] text-slate-800 select-none overflow-hidden">
      {/* Gentle background decorative rings */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-200/40 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-200/40 rounded-full blur-2xl pointer-events-none" />

      <div className="w-full flex justify-end pt-2">
        <button
          onClick={onContinue}
          className="text-xs font-semibold text-purple-700 hover:text-purple-900 bg-white/70 hover:bg-white px-3 py-1 rounded-full transition-all flex items-center gap-1 shadow-sm"
        >
          Skip <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Main Logo & Identity */}
      <div className="flex flex-col items-center text-center my-auto animate-fade-in">
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-[#8B5CF6] to-[#7C3AED] flex items-center justify-center shadow-xl shadow-purple-500/25 ring-8 ring-purple-100">
            <Flower2 className="w-12 h-12 text-white animate-pulse" />
          </div>
          <div className="absolute -bottom-2 -right-2 p-2 bg-emerald-400 text-white rounded-full shadow-md">
            <Heart className="w-4 h-4 fill-white" />
          </div>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          MindCare
        </h1>
        <p className="mt-2 text-sm text-slate-600 font-medium">
          “Your mental wellness matters.”
        </p>

        <div className="mt-4 px-3 py-1 bg-white/80 border border-purple-200/60 rounded-full text-[11px] font-semibold text-purple-700">
          UI Design Using Flutter Lab Project
        </div>
      </div>

      {/* Footer loading indicator */}
      <div className="w-full flex flex-col items-center pb-6">
        <div className="flex items-center gap-1.5 mb-3">
          <span className="w-2 h-2 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
        <p className="text-[11px] text-slate-500">Initializing Flutter Material 3 environment...</p>
      </div>
    </div>
  );
};
