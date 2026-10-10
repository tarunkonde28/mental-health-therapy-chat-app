import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Users, 
  MessageSquare, 
  Smile, 
  User, 
  Wifi, 
  BatteryMedium, 
  Signal, 
  ArrowLeft,
  Wind,
  CheckCircle2
} from 'lucide-react';
import { ActiveScreen } from '../../types';

interface AndroidShellProps {
  currentScreen: ActiveScreen;
  onNavigateScreen: (screen: ActiveScreen) => void;
  children: React.ReactNode;
  deviceSkin?: 'pixel' | 'galaxy' | 'fullscreen';
}

export const AndroidShell: React.FC<AndroidShellProps> = ({
  currentScreen,
  onNavigateScreen,
  children,
  deviceSkin = 'pixel',
}) => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setCurrentTime(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  // Determine whether bottom nav bar is visible
  const isAuthOrSplash = ['splash', 'welcome', 'login', 'register'].includes(currentScreen);
  const isSecondaryScreen = ['breathing', 'self_care'].includes(currentScreen);

  // Bottom Navigation Destinations
  const navItems = [
    { id: 'home' as ActiveScreen, label: 'Home', icon: Home },
    { id: 'therapists' as ActiveScreen, label: 'Therapists', icon: Users },
    { id: 'chat' as ActiveScreen, label: 'Chat', icon: MessageSquare },
    { id: 'mood' as ActiveScreen, label: 'Mood', icon: Smile },
    { id: 'profile' as ActiveScreen, label: 'Profile', icon: User },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center p-2 sm:p-4 select-none">
      {/* Device Frame */}
      <div
        className={`relative flex flex-col bg-slate-900 overflow-hidden shadow-2xl transition-all ${
          deviceSkin === 'fullscreen'
            ? 'w-full max-w-md h-[840px] rounded-[36px] ring-1 ring-slate-800'
            : deviceSkin === 'galaxy'
            ? 'w-[390px] h-[820px] rounded-[44px] ring-[10px] ring-slate-800 shadow-slate-950/80'
            : 'w-[400px] h-[840px] rounded-[48px] ring-[12px] ring-slate-800 shadow-slate-950/80'
        }`}
      >
        {/* Android Punch-hole Camera */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black ring-1 ring-slate-800 z-50 flex items-center justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-900/80" />
        </div>

        {/* Android Status Bar */}
        <div className="w-full h-8 px-6 flex items-center justify-between text-slate-800 bg-white/90 backdrop-blur-xs text-[11px] font-medium z-40 shrink-0 select-none border-b border-black/[0.03]">
          <span className="font-semibold text-slate-900">{currentTime || '10:24 AM'}</span>
          <div className="flex items-center gap-2 text-slate-700">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <div className="flex items-center gap-0.5">
              <span className="text-[10px] font-mono">92%</span>
              <BatteryMedium className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Secondary Screen Back Bar (Breathing, Self-Care) */}
        {isSecondaryScreen && (
          <div className="w-full px-4 py-2.5 bg-white border-b border-slate-100 flex items-center justify-between z-30 shrink-0">
            <button
              onClick={() => onNavigateScreen('home')}
              className="flex items-center gap-1.5 text-xs font-semibold text-purple-700 hover:text-purple-900 bg-purple-50 px-2.5 py-1 rounded-xl"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
            <span className="text-xs font-bold text-slate-700">
              {currentScreen === 'breathing' ? 'Guided Breathing' : 'Self-Care Habits'}
            </span>
            <div className="w-12" />
          </div>
        )}

        {/* Screen Content Viewport */}
        <div className="relative flex-1 w-full overflow-hidden bg-white">
          {children}
        </div>

        {/* Flutter Material 3 NavigationBar */}
        {!isAuthOrSplash && (
          <div className="w-full h-18 bg-white border-t border-slate-200/70 flex items-center justify-around px-2 z-40 shrink-0 shadow-lg">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigateScreen(item.id)}
                  className="flex flex-col items-center justify-center py-1 px-3 min-w-[56px] transition-all group"
                >
                  <div
                    className={`px-4 py-1 rounded-full transition-all flex items-center justify-center ${
                      isActive
                        ? 'bg-[#F0EDFB] text-[#8C7AE6]'
                        : 'text-slate-400 group-hover:text-slate-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-[10px] mt-1 transition-all ${
                      isActive
                        ? 'font-bold text-[#8C7AE6]'
                        : 'font-medium text-slate-500'
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Android Gesture Bar */}
        <div className="w-full h-3 bg-white flex items-center justify-center pb-1 z-40 shrink-0">
          <div className="w-28 h-1 rounded-full bg-slate-400/60" />
        </div>
      </div>
    </div>
  );
};
