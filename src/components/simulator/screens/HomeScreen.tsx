import React, { useState } from 'react';
import { 
  Wind, 
  MessageSquare, 
  Smile, 
  CheckCircle2, 
  ShieldAlert, 
  Sparkles, 
  Calendar, 
  Clock, 
  ChevronRight,
  TrendingUp,
  Heart
} from 'lucide-react';
import { MoodType, UserProfile } from '../../../types';
import { DAILY_AFFIRMATIONS } from '../../../data/sampleData';

interface HomeScreenProps {
  user: UserProfile;
  onNavigateToScreen: (screen: string) => void;
  onOpenEmergency: () => void;
  onQuickLogMood: (mood: MoodType) => void;
  currentMood?: MoodType;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  onNavigateToScreen,
  onOpenEmergency,
  onQuickLogMood,
  currentMood,
}) => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const currentQuote = DAILY_AFFIRMATIONS[quoteIndex % DAILY_AFFIRMATIONS.length];

  const nextQuote = () => {
    setQuoteIndex(prev => (prev + 1) % DAILY_AFFIRMATIONS.length);
  };

  return (
    <div className="w-full h-full flex flex-col p-5 bg-[#F9F9FD] overflow-y-auto pb-24 text-slate-800">
      {/* Top Header: Greeting & Crisis Shortcut */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-purple-700 font-semibold tracking-wide uppercase">
            <span>Welcome back</span>
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            <span>Today</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-0.5">
            Good morning, {user.name.split(' ')[0]}
          </h1>
          <p className="text-xs text-slate-500">
            How is your heart and mind feeling right now?
          </p>
        </div>

        <button
          onClick={onOpenEmergency}
          className="p-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-2xl border border-rose-200 shadow-sm transition-all flex items-center justify-center group"
          title="Emergency Crisis Helplines"
          aria-label="Emergency Help"
        >
          <ShieldAlert className="w-5 h-5 group-hover:scale-110 transition-transform text-rose-600" />
        </button>
      </div>

      {/* Daily Affirmation Card */}
      <div className="mt-4 p-4.5 rounded-3xl bg-gradient-to-br from-[#8C7AE6] to-[#6C5CE7] text-white shadow-lg shadow-purple-500/20 relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-purple-200 uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Daily Reflection</span>
          </div>
          <button
            onClick={nextQuote}
            className="text-[11px] text-white/80 hover:text-white underline underline-offset-2"
          >
            New Thought
          </button>
        </div>
        <p className="text-sm font-medium leading-relaxed italic text-white/95">
          “{currentQuote.quote}”
        </p>
        <p className="mt-2 text-[11px] text-purple-200 text-right font-medium">
          — {currentQuote.author}
        </p>
      </div>

      {/* Quick Mood Check-in */}
      <div className="mt-5 p-4 bg-white rounded-3xl border border-slate-200/70 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Daily Mood Check-in
          </span>
          <button
            onClick={() => onNavigateToScreen('mood')}
            className="text-[11px] text-purple-600 hover:text-purple-800 font-semibold flex items-center"
          >
            Full Log <ChevronRight className="w-3 h-3 ml-0.5" />
          </button>
        </div>

        <div className="grid grid-cols-5 gap-2 text-center">
          {[
            { id: 'happy', label: 'Happy', emoji: '😊', color: 'hover:bg-emerald-50 hover:border-emerald-300 active:bg-emerald-100', activeBg: 'bg-emerald-100 border-emerald-400 text-emerald-800' },
            { id: 'calm', label: 'Calm', emoji: '😌', color: 'hover:bg-purple-50 hover:border-purple-300 active:bg-purple-100', activeBg: 'bg-purple-100 border-purple-400 text-purple-800' },
            { id: 'okay', label: 'Okay', emoji: '😐', color: 'hover:bg-sky-50 hover:border-sky-300 active:bg-sky-100', activeBg: 'bg-sky-100 border-sky-400 text-sky-800' },
            { id: 'anxious', label: 'Anxious', emoji: '😟', color: 'hover:bg-amber-50 hover:border-amber-300 active:bg-amber-100', activeBg: 'bg-amber-100 border-amber-400 text-amber-800' },
            { id: 'sad', label: 'Sad', emoji: '😢', color: 'hover:bg-rose-50 hover:border-rose-300 active:bg-rose-100', activeBg: 'bg-rose-100 border-rose-400 text-rose-800' },
          ].map(m => {
            const isSelected = currentMood === m.id;
            return (
              <button
                key={m.id}
                onClick={() => onQuickLogMood(m.id as MoodType)}
                className={`flex flex-col items-center p-2 rounded-2xl border transition-all ${
                  isSelected ? m.activeBg : `bg-slate-50/80 border-slate-200/70 text-slate-700 ${m.color}`
                }`}
              >
                <span className="text-2xl">{m.emoji}</span>
                <span className="text-[10px] font-semibold mt-1">{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4 Quick Access Cards */}
      <div className="mt-5">
        <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
          Wellness Tools
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {/* 1. Guided Breathing */}
          <button
            onClick={() => onNavigateToScreen('breathing')}
            className="p-3.5 bg-[#E8F1FC] hover:bg-[#DDEBFA] border border-sky-200/60 rounded-3xl text-left transition-all active:scale-[0.98] flex flex-col justify-between h-28 group"
          >
            <div className="w-9 h-9 rounded-2xl bg-white text-sky-600 flex items-center justify-center shadow-sm">
              <Wind className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Guided Breathing</div>
              <div className="text-[11px] text-sky-800 mt-0.5">Box 4-4-4-4 rhythm</div>
            </div>
          </button>

          {/* 2. Self Care */}
          <button
            onClick={() => onNavigateToScreen('self_care')}
            className="p-3.5 bg-[#EBFBEE] hover:bg-[#DEF8E3] border border-emerald-200/60 rounded-3xl text-left transition-all active:scale-[0.98] flex flex-col justify-between h-28 group"
          >
            <div className="w-9 h-9 rounded-2xl bg-white text-emerald-600 flex items-center justify-center shadow-sm">
              <CheckCircle2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Self-Care Habits</div>
              <div className="text-[11px] text-emerald-800 mt-0.5">Gentle daily checklist</div>
            </div>
          </button>

          {/* 3. Therapy Chat */}
          <button
            onClick={() => onNavigateToScreen('chat')}
            className="p-3.5 bg-[#F0EDFB] hover:bg-[#E5DFF9] border border-purple-200/60 rounded-3xl text-left transition-all active:scale-[0.98] flex flex-col justify-between h-28 group"
          >
            <div className="w-9 h-9 rounded-2xl bg-white text-purple-600 flex items-center justify-center shadow-sm">
              <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Therapy Chat</div>
              <div className="text-[11px] text-purple-800 mt-0.5">Compassionate AI demo</div>
            </div>
          </button>

          {/* 4. Mood History */}
          <button
            onClick={() => onNavigateToScreen('mood')}
            className="p-3.5 bg-[#FFF5F5] hover:bg-[#FEEAEB] border border-rose-200/60 rounded-3xl text-left transition-all active:scale-[0.98] flex flex-col justify-between h-28 group"
          >
            <div className="w-9 h-9 rounded-2xl bg-white text-rose-500 flex items-center justify-center shadow-sm">
              <TrendingUp className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Mood History</div>
              <div className="text-[11px] text-rose-800 mt-0.5">7-day trends & notes</div>
            </div>
          </button>
        </div>
      </div>

      {/* Upcoming Consultation Card */}
      <div className="mt-5">
        <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
          Upcoming Consultation
        </h2>

        <div className="p-4 bg-white rounded-3xl border border-slate-200/70 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1594824813637-8835848bb447?w=160&auto=format&fit=crop&q=80"
              alt="Dr. Sarah Jenkins"
              className="w-12 h-12 rounded-2xl object-cover ring-2 ring-purple-100"
            />
            <div>
              <h3 className="text-xs font-bold text-slate-900">Dr. Sarah Jenkins, Ph.D.</h3>
              <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                <Calendar className="w-3 h-3 text-purple-500" />
                <span>Today at 3:30 PM (50 min)</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1">
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md text-[10px] font-bold">
              Confirmed
            </span>
            <button
              onClick={() => onNavigateToScreen('chat')}
              className="text-[11px] text-purple-600 font-semibold hover:underline"
            >
              Open Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
