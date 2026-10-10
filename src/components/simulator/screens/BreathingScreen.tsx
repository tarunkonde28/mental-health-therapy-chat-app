import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Wind, ShieldAlert, Sparkles, Volume2, VolumeX } from 'lucide-react';

export const BreathingScreen: React.FC = () => {
  const [mode, setMode] = useState<'box' | '478'>('box');
  const [isActive, setIsActive] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(4);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Box Breathing: 4-4-4-4
  const boxPhases = [
    { label: 'Inhale gently through nose', duration: 4, scale: 'scale-125' },
    { label: 'Hold breath peacefully', duration: 4, scale: 'scale-125 ring-8 ring-purple-300' },
    { label: 'Exhale slowly through mouth', duration: 4, scale: 'scale-90' },
    { label: 'Rest and pause', duration: 4, scale: 'scale-90' },
  ];

  // 4-7-8 Breathing
  const phases478 = [
    { label: 'Inhale softly through nose', duration: 4, scale: 'scale-130' },
    { label: 'Hold breath gently', duration: 7, scale: 'scale-130 ring-8 ring-sky-300' },
    { label: 'Exhale completely with whoosh', duration: 8, scale: 'scale-85' },
  ];

  const currentPhases = mode === 'box' ? boxPhases : phases478;
  const currentPhase = currentPhases[phaseIndex];

  // Timer Tick
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isActive) {
      timer = setInterval(() => {
        setSecondsRemaining(prev => {
          if (prev > 1) {
            return prev - 1;
          } else {
            // Next phase
            const nextIndex = (phaseIndex + 1) % currentPhases.length;
            setPhaseIndex(nextIndex);
            if (nextIndex === 0) {
              setCyclesCompleted(c => c + 1);
            }
            return currentPhases[nextIndex].duration;
          }
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isActive, phaseIndex, currentPhases]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setPhaseIndex(0);
    setSecondsRemaining(currentPhases[0].duration);
    setCyclesCompleted(0);
  };

  const switchMode = (newMode: 'box' | '478') => {
    setIsActive(false);
    setMode(newMode);
    setPhaseIndex(0);
    setSecondsRemaining(newMode === 'box' ? 4 : 4);
    setCyclesCompleted(0);
  };

  return (
    <div className="w-full h-full flex flex-col p-5 bg-[#F9F9FD] overflow-y-auto pb-24 text-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Guided Breathing</h1>
          <p className="text-xs text-slate-500 mt-0.5">Somatic nervous system regulation</p>
        </div>
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="p-2 text-slate-400 hover:text-purple-600 rounded-xl"
          title={soundEnabled ? 'Mute' : 'Enable audio tone'}
        >
          {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="mt-4 p-1 bg-white border border-slate-200/80 rounded-2xl flex">
        <button
          onClick={() => switchMode('box')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
            mode === 'box' ? 'bg-[#8C7AE6] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Box Breathing (4-4-4-4)
        </button>
        <button
          onClick={() => switchMode('478')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
            mode === '478' ? 'bg-[#8C7AE6] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Relaxing Breath (4-7-8)
        </button>
      </div>

      {/* Main Breathing Circle Stage */}
      <div className="my-auto py-8 flex flex-col items-center justify-center relative">
        {/* Soft background pulse rings */}
        <div
          className={`absolute w-64 h-64 rounded-full bg-purple-100/60 blur-2xl transition-all duration-1000 ${
            isActive ? currentPhase.scale : 'scale-100'
          }`}
        />

        {/* Breathing Sphere */}
        <div
          className={`relative w-48 h-48 rounded-full bg-gradient-to-tr from-[#8C7AE6] via-[#A392F5] to-[#70A1FF] text-white flex flex-col items-center justify-center shadow-xl shadow-purple-500/25 transition-all duration-1000 ${
            isActive ? currentPhase.scale : 'scale-95'
          }`}
        >
          <div className="text-4xl font-extrabold tracking-tight">
            {isActive ? secondsRemaining : currentPhase.duration}
          </div>
          <div className="text-[11px] font-semibold text-purple-100 uppercase tracking-wider mt-1 text-center px-4">
            {isActive ? currentPhase.label.split(' ')[0] : 'Ready'}
          </div>
        </div>

        {/* Dynamic Instruction */}
        <div className="mt-8 text-center px-6">
          <p className="text-sm font-bold text-slate-800">
            {isActive ? currentPhase.label : 'Press Start when you are comfortable and seated.'}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Cycles Completed: <span className="font-semibold text-purple-700">{cyclesCompleted}</span>
          </p>
        </div>
      </div>

      {/* Action Controls */}
      <div className="mt-auto pt-4 flex items-center justify-center gap-4">
        <button
          onClick={handleReset}
          className="p-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 rounded-2xl shadow-xs active:scale-95 transition-all"
          title="Reset"
          aria-label="Reset exercise"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        {isActive ? (
          <button
            onClick={handlePause}
            className="px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm rounded-2xl shadow-md shadow-amber-500/25 active:scale-95 transition-all flex items-center gap-2"
          >
            <Pause className="w-5 h-5" />
            Pause
          </button>
        ) : (
          <button
            onClick={handleStart}
            className="px-8 py-3.5 bg-[#8C7AE6] hover:bg-[#7A67D8] text-white font-semibold text-sm rounded-2xl shadow-md shadow-purple-500/25 active:scale-95 transition-all flex items-center gap-2"
          >
            <Play className="w-5 h-5 fill-white" />
            Start Session
          </button>
        )}
      </div>

      {/* Safety Note */}
      <div className="mt-5 p-3 bg-slate-100/80 rounded-2xl text-[11px] text-slate-500 text-center leading-normal">
        <strong>Comfort Note:</strong> Never strain your lungs. If at any moment you experience lightheadedness, stop immediately and return to your natural breathing rhythm.
      </div>
    </div>
  );
};
