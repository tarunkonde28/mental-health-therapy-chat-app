import React, { useState, useEffect } from 'react';
import { 
  Smartphone, 
  Code, 
  Download, 
  ShieldAlert, 
  BookOpen, 
  RotateCcw, 
  Sparkles, 
  Heart, 
  Layout, 
  HelpCircle,
  ExternalLink,
  CheckCircle2,
  ListFilter
} from 'lucide-react';
import { ActiveScreen, MoodEntry, MoodType, SelfCareTask, Therapist, UserProfile } from './types';
import { 
  DEFAULT_USER_PROFILE, 
  INITIAL_MOOD_ENTRIES, 
  INITIAL_SELF_CARE_TASKS, 
  SAMPLE_THERAPISTS 
} from './data/sampleData';
import { AndroidShell } from './components/simulator/AndroidShell';
import { SplashScreen } from './components/simulator/screens/SplashScreen';
import { AuthScreens } from './components/simulator/screens/AuthScreens';
import { HomeScreen } from './components/simulator/screens/HomeScreen';
import { TherapistScreen } from './components/simulator/screens/TherapistScreen';
import { ChatScreen } from './components/simulator/screens/ChatScreen';
import { MoodTrackerScreen } from './components/simulator/screens/MoodTrackerScreen';
import { BreathingScreen } from './components/simulator/screens/BreathingScreen';
import { SelfCareScreen } from './components/simulator/screens/SelfCareScreen';
import { ProfileScreen } from './components/simulator/screens/ProfileScreen';
import { EmergencyHelpModal } from './components/simulator/EmergencyHelpModal';
import { FlutterCodeViewer } from './components/code_studio/FlutterCodeViewer';
import JSZip from 'jszip';
import { FLUTTER_PROJECT_FILES } from './data/flutterSourceCode';

export default function App() {
  // Navigation & View Mode
  const [appMode, setAppMode] = useState<'simulator' | 'code_studio'>('simulator');
  const [simulatorScreen, setSimulatorScreen] = useState<ActiveScreen>('splash');
  const [deviceSkin, setDeviceSkin] = useState<'pixel' | 'galaxy' | 'fullscreen'>('pixel');
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);

  // Persistent State (Simulating shared_preferences)
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>(() => {
    try {
      const saved = localStorage.getItem('mindcare_moods');
      return saved ? JSON.parse(saved) : INITIAL_MOOD_ENTRIES;
    } catch {
      return INITIAL_MOOD_ENTRIES;
    }
  });

  const [selfCareTasks, setSelfCareTasks] = useState<SelfCareTask[]>(() => {
    try {
      const saved = localStorage.getItem('mindcare_selfcare');
      return saved ? JSON.parse(saved) : INITIAL_SELF_CARE_TASKS;
    } catch {
      return INITIAL_SELF_CARE_TASKS;
    }
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('mindcare_profile');
      return saved ? JSON.parse(saved) : DEFAULT_USER_PROFILE;
    } catch {
      return DEFAULT_USER_PROFILE;
    }
  });

  const [selectedTherapist, setSelectedTherapist] = useState<Therapist>(SAMPLE_THERAPISTS[0]);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('mindcare_moods', JSON.stringify(moodEntries));
    } catch (e) {
      console.error(e);
    }
  }, [moodEntries]);

  useEffect(() => {
    try {
      localStorage.setItem('mindcare_selfcare', JSON.stringify(selfCareTasks));
    } catch (e) {
      console.error(e);
    }
  }, [selfCareTasks]);

  useEffect(() => {
    try {
      localStorage.setItem('mindcare_profile', JSON.stringify(userProfile));
    } catch (e) {
      console.error(e);
    }
  }, [userProfile]);

  // Handlers for state changes
  const handleQuickLogMood = (mood: MoodType) => {
    const labels: Record<MoodType, string> = {
      happy: 'Happy & Joyful',
      calm: 'Calm & Grounded',
      okay: 'Okay / Neutral',
      anxious: 'Anxious / Restless',
      sad: 'Sad / Heavy',
    };
    const scores: Record<MoodType, number> = {
      happy: 5,
      calm: 4,
      okay: 3,
      anxious: 2,
      sad: 1,
    };
    const newEntry: MoodEntry = {
      id: `m-${Date.now()}`,
      mood,
      moodLabel: labels[mood],
      intensity: scores[mood],
      tags: ['Home Check-in'],
      timestamp: new Date().toISOString(),
    };
    setMoodEntries(prev => [newEntry, ...prev]);
  };

  const handleAddMoodEntry = (entry: Omit<MoodEntry, 'id' | 'timestamp'>) => {
    const fullEntry: MoodEntry = {
      ...entry,
      id: `m-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    setMoodEntries(prev => [fullEntry, ...prev]);
  };

  const handleDeleteMoodEntry = (id: string) => {
    setMoodEntries(prev => prev.filter(m => m.id !== id));
  };

  const handleClearAllMoodData = () => {
    setMoodEntries([]);
    localStorage.removeItem('mindcare_moods');
  };

  const handleToggleSelfCare = (id: string) => {
    setSelfCareTasks(prev =>
      prev.map(t =>
        t.id === id
          ? {
              ...t,
              isCompleted: !t.isCompleted,
              completedAt: !t.isCompleted
                ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                : undefined,
            }
          : t
      )
    );
  };

  const handleAddSelfCareTask = (task: Omit<SelfCareTask, 'id' | 'isCompleted'>) => {
    const newTask: SelfCareTask = {
      ...task,
      id: `sc-${Date.now()}`,
      isCompleted: false,
    };
    setSelfCareTasks(prev => [...prev, newTask]);
  };

  const handleDownloadZip = async () => {
    const zip = new JSZip();
    FLUTTER_PROJECT_FILES.forEach(file => {
      zip.file(file.path, file.content);
    });
    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mindcare_flutter_project.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetAllDemoData = () => {
    setMoodEntries(INITIAL_MOOD_ENTRIES);
    setSelfCareTasks(INITIAL_SELF_CARE_TASKS);
    setUserProfile(DEFAULT_USER_PROFILE);
    localStorage.removeItem('mindcare_moods');
    localStorage.removeItem('mindcare_selfcare');
    localStorage.removeItem('mindcare_profile');
  };

  // Screen jump list for presentation
  const screenJumps: { id: ActiveScreen; label: string }[] = [
    { id: 'splash', label: '1. Splash' },
    { id: 'welcome', label: '2. Welcome' },
    { id: 'login', label: '3. Login' },
    { id: 'register', label: '4. Register' },
    { id: 'home', label: '5. Home Dashboard' },
    { id: 'therapists', label: '6. Therapist Directory' },
    { id: 'chat', label: '7. Therapy Chat' },
    { id: 'mood', label: '8. Mood Tracker & Chart' },
    { id: 'breathing', label: '9. Guided Breathing' },
    { id: 'self_care', label: '10. Self-Care Checklist' },
    { id: 'profile', label: '11. Profile & Settings' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Bar Contract (1-line wordmark, nav links, 1 primary action) */}
      <header className="flex items-center justify-between gap-8 px-6 py-3.5 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-50">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#8C7AE6] to-[#6C5CE7] flex items-center justify-center text-white shadow-md shadow-purple-500/20">
            <Heart className="w-4 h-4 fill-white" />
          </div>
          <div>
            <span className="text-base font-extrabold tracking-tight text-white">MindCare</span>
            <span className="text-[10px] text-purple-400 font-mono ml-2">Flutter & Dart UI</span>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
          <button
            onClick={() => setAppMode('simulator')}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              appMode === 'simulator' ? 'text-purple-400 font-bold' : 'hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Android App Simulator
          </button>
          <button
            onClick={() => setAppMode('code_studio')}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              appMode === 'code_studio' ? 'text-purple-400 font-bold' : 'hover:text-white'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            Flutter Code Studio
          </button>
          <button
            onClick={() => setIsEmergencyOpen(true)}
            className="text-rose-400 hover:text-rose-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            Crisis Helplines (988)
          </button>
        </nav>

        {/* Zone 3: Primary action button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleDownloadZip}
            className="px-4 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 rounded-xl shadow-md shadow-purple-600/25 transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            Download Flutter Project (.ZIP)
          </button>
        </div>
      </header>

      {/* Main Workspace Body */}
      <main className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {/* College Project Meta Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/40 border border-purple-800/30 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-900/50 rounded-xl text-purple-300 border border-purple-700/50">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">
                MindCare – Mental Health and Therapy Chat App
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                College Mini-Project for <strong>UI Design Using Flutter Lab</strong> • Material 3 • Dart • Calming Color Palette
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1 bg-slate-900 rounded-xl border border-slate-800 flex text-xs">
              <button
                onClick={() => setAppMode('simulator')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                  appMode === 'simulator'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                Live App Preview
              </button>
              <button
                onClick={() => setAppMode('code_studio')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                  appMode === 'code_studio'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                Flutter Dart Code ({FLUTTER_PROJECT_FILES.length} Files)
              </button>
            </div>
          </div>
        </div>

        {/* View Switch: Simulator vs Code Studio */}
        {appMode === 'simulator' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Control Drawer & Screen Selector (for Lab Viva / Grading) */}
            <div className="lg:col-span-4 space-y-4">
              {/* Screen Jumper */}
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                    <ListFilter className="w-3.5 h-3.5 text-purple-400" />
                    Lab Screen Switcher
                  </span>
                  <span className="text-[10px] text-purple-400 font-mono">11 Screens</span>
                </div>
                <p className="text-xs text-slate-400 mb-3">
                  Instantly jump to any screen to test features, interactions, and design requirements:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-1.5 max-h-[320px] overflow-y-auto pr-1">
                  {screenJumps.map(s => {
                    const isCurrent = simulatorScreen === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setSimulatorScreen(s.id)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                          isCurrent
                            ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-600/20'
                            : 'bg-slate-950/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                        }`}
                      >
                        <span>{s.label}</span>
                        {isCurrent && <span className="w-2 h-2 rounded-full bg-white animate-ping" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Device Frame Skin Selector */}
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-xs font-bold text-slate-200 uppercase tracking-wider block mb-2">
                  Device Hardware Frame
                </span>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    onClick={() => setDeviceSkin('pixel')}
                    className={`py-2 px-2 rounded-xl font-medium text-center transition-all ${
                      deviceSkin === 'pixel'
                        ? 'bg-purple-600/30 border border-purple-500 text-white'
                        : 'bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    Pixel 8 Pro
                  </button>
                  <button
                    onClick={() => setDeviceSkin('galaxy')}
                    className={`py-2 px-2 rounded-xl font-medium text-center transition-all ${
                      deviceSkin === 'galaxy'
                        ? 'bg-purple-600/30 border border-purple-500 text-white'
                        : 'bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    Galaxy S24
                  </button>
                  <button
                    onClick={() => setDeviceSkin('fullscreen')}
                    className={`py-2 px-2 rounded-xl font-medium text-center transition-all ${
                      deviceSkin === 'fullscreen'
                        ? 'bg-purple-600/30 border border-purple-500 text-white'
                        : 'bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    Compact Shell
                  </button>
                </div>
              </div>

              {/* Live Evaluator Stats */}
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2.5">
                <span className="text-xs font-bold text-slate-200 uppercase tracking-wider block">
                  Simulated Local Storage
                </span>
                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Offline Mood Records:</span>
                    <span className="font-bold font-mono text-purple-400">{moodEntries.length} entries</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Completed Self-Care:</span>
                    <span className="font-bold font-mono text-emerald-400">
                      {selfCareTasks.filter(t => t.isCompleted).length} / {selfCareTasks.length}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Sample Specialists:</span>
                    <span className="font-bold font-mono text-sky-400">{SAMPLE_THERAPISTS.length} doctors</span>
                  </div>
                </div>

                <button
                  onClick={resetAllDemoData}
                  className="w-full mt-2 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Sample Data
                </button>
              </div>

              {/* Codebase Quick Action */}
              <div className="p-4 bg-gradient-to-br from-purple-900/30 to-indigo-900/30 rounded-2xl border border-purple-800/40">
                <h4 className="text-xs font-bold text-white mb-1">Need to submit Flutter files?</h4>
                <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
                  All 14+ Dart files (`main.dart`, `app_theme.dart`, all screens, models, and `pubspec.yaml`) can be inspected or downloaded in 1 click.
                </p>
                <button
                  onClick={() => setAppMode('code_studio')}
                  className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Code className="w-3.5 h-3.5" />
                  Open Flutter Code Studio
                </button>
              </div>
            </div>

            {/* Right: The Interactive Android Simulator */}
            <div className="lg:col-span-8 flex justify-center">
              <AndroidShell
                currentScreen={simulatorScreen}
                onNavigateScreen={setSimulatorScreen}
                deviceSkin={deviceSkin}
              >
                {/* 1. Splash Screen */}
                {simulatorScreen === 'splash' && (
                  <SplashScreen onContinue={() => setSimulatorScreen('welcome')} />
                )}

                {/* 2. Welcome, Login, Register Screens */}
                {(simulatorScreen === 'welcome' || simulatorScreen === 'login' || simulatorScreen === 'register') && (
                  <AuthScreens
                    currentView={simulatorScreen}
                    onNavigate={setSimulatorScreen}
                    onLoginSuccess={user => {
                      setUserProfile(prev => ({ ...prev, name: user.name, email: user.email }));
                      setSimulatorScreen('home');
                    }}
                  />
                )}

                {/* 3. Home Screen */}
                {simulatorScreen === 'home' && (
                  <HomeScreen
                    user={userProfile}
                    onNavigateToScreen={(s) => setSimulatorScreen(s as ActiveScreen)}
                    onOpenEmergency={() => setIsEmergencyOpen(true)}
                    onQuickLogMood={handleQuickLogMood}
                    currentMood={moodEntries[0]?.mood}
                  />
                )}

                {/* 4. Therapists Screen */}
                {simulatorScreen === 'therapists' && (
                  <TherapistScreen
                    onStartChatWithTherapist={t => {
                      setSelectedTherapist(t);
                      setSimulatorScreen('chat');
                    }}
                  />
                )}

                {/* 5. Chat Screen */}
                {simulatorScreen === 'chat' && (
                  <ChatScreen
                    currentTherapist={selectedTherapist}
                    onOpenEmergency={() => setIsEmergencyOpen(true)}
                  />
                )}

                {/* 6. Mood Tracker Screen */}
                {simulatorScreen === 'mood' && (
                  <MoodTrackerScreen
                    entries={moodEntries}
                    onAddEntry={handleAddMoodEntry}
                    onDeleteEntry={handleDeleteMoodEntry}
                  />
                )}

                {/* 7. Breathing Screen */}
                {simulatorScreen === 'breathing' && <BreathingScreen />}

                {/* 8. Self-Care Habits Screen */}
                {simulatorScreen === 'self_care' && (
                  <SelfCareScreen
                    tasks={selfCareTasks}
                    onToggleTask={handleToggleSelfCare}
                    onAddTask={handleAddSelfCareTask}
                  />
                )}

                {/* 9. Profile Screen */}
                {simulatorScreen === 'profile' && (
                  <ProfileScreen
                    user={userProfile}
                    onUpdateUser={up => setUserProfile(prev => ({ ...prev, ...up }))}
                    onClearMoodData={handleClearAllMoodData}
                    onOpenEmergency={() => setIsEmergencyOpen(true)}
                    onLogout={() => setSimulatorScreen('welcome')}
                  />
                )}
              </AndroidShell>
            </div>
          </div>
        ) : (
          /* Code Studio View */
          <div className="h-[840px] w-full">
            <FlutterCodeViewer />
          </div>
        )}
      </main>

      {/* Emergency Crisis Modal */}
      <EmergencyHelpModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />
    </div>
  );
}
