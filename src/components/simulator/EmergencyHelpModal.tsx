import React from 'react';
import { Phone, AlertTriangle, X, ShieldAlert, HeartHandshake } from 'lucide-react';

interface EmergencyHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyHelpModal: React.FC<EmergencyHelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-rose-100 max-h-[90vh] overflow-y-auto text-slate-800"
        role="dialog"
        aria-modal="true"
        aria-labelledby="emergency-dialog-title"
      >
        <div className="flex items-start justify-between pb-3 border-b border-rose-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-rose-100 text-rose-700 rounded-2xl">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h2 id="emergency-dialog-title" className="text-xl font-bold text-slate-900">
                Crisis & Emergency Support
              </h2>
              <p className="text-xs text-rose-600 font-medium">Available 24 hours a day, 7 days a week</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="my-4 p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed text-rose-900">
            <strong>Important Safety Notice:</strong> MindCare is a college demonstration app designed for general wellness, habit tracking, and educational purposes. It <strong>does not provide medical diagnosis or emergency intervention</strong>. If you or someone you care about is experiencing immediate crisis or self-harm thoughts, please connect with the emergency services below.
          </div>
        </div>

        <div className="space-y-3">
          {/* 988 Lifeline */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl hover:border-slate-300 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">988 Suicide & Crisis Lifeline</h3>
                <p className="text-xs text-slate-600 mt-0.5">United States & Canada • Free, confidential, 24/7</p>
              </div>
              <a
                href="tel:988"
                className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs rounded-xl shadow-sm flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                Dial 988
              </a>
            </div>
          </div>

          {/* Crisis Text Line */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl hover:border-slate-300 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Crisis Text Line</h3>
                <p className="text-xs text-slate-600 mt-0.5">Free 24/7 text support with trained crisis counselors</p>
              </div>
              <div className="px-3 py-1.5 bg-slate-800 text-white font-semibold text-xs rounded-xl">
                Text HOME to 741741
              </div>
            </div>
          </div>

          {/* India Helpline */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl hover:border-slate-300 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Tele-MANAS & KIRAN (India)</h3>
                <p className="text-xs text-slate-600 mt-0.5">National 24/7 mental health psychological helpline</p>
              </div>
              <a
                href="tel:14416"
                className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-xl shadow-sm flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                14416 / 1800-599-0019
              </a>
            </div>
          </div>

          {/* International */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl hover:border-slate-300 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">International Resources (Befrienders)</h3>
                <p className="text-xs text-slate-600 mt-0.5">Global directory of crisis centers in 32+ nations</p>
              </div>
              <a
                href="https://www.befrienders.org"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <HeartHandshake className="w-3.5 h-3.5" />
                Find Country
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl transition-colors"
          >
            I Understand, Return to App
          </button>
        </div>
      </div>
    </div>
  );
};
