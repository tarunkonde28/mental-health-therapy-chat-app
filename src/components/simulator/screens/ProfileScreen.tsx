import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Trash2, 
  LogOut, 
  ShieldAlert, 
  Lock, 
  Smartphone, 
  CheckCircle, 
  Edit3, 
  Check, 
  Sparkles,
  Database
} from 'lucide-react';
import { UserProfile } from '../../../types';

interface ProfileScreenProps {
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  onClearMoodData: () => void;
  onOpenEmergency: () => void;
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  onUpdateUser,
  onClearMoodData,
  onOpenEmergency,
  onLogout,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [clearSuccessToast, setClearSuccessToast] = useState(false);

  const handleSaveProfile = () => {
    onUpdateUser({ name: editName.trim(), email: editEmail.trim() });
    setIsEditing(false);
  };

  const handleConfirmClear = () => {
    onClearMoodData();
    setShowClearConfirm(false);
    setClearSuccessToast(true);
    setTimeout(() => setClearSuccessToast(false), 3000);
  };

  return (
    <div className="w-full h-full flex flex-col p-5 bg-[#F9F9FD] overflow-y-auto pb-24 text-slate-800">
      <div className="pt-1">
        <h1 className="text-xl font-bold text-slate-900">Profile & Settings</h1>
        <p className="text-xs text-slate-500 mt-0.5">Manage your preferences and local data</p>
      </div>

      {clearSuccessToast && (
        <div className="mt-3 p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs rounded-2xl flex items-center gap-2 animate-fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Local offline mood entries have been purged from storage.</span>
        </div>
      )}

      {/* User Info Card */}
      <div className="mt-4 p-4.5 bg-white rounded-3xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-2xl object-cover ring-4 ring-purple-100"
            />
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="absolute -bottom-1 -right-1 p-1 bg-[#8C7AE6] text-white rounded-lg shadow-sm hover:bg-[#7A67D8]"
              title="Edit Profile"
            >
              {isEditing ? <Check className="w-3 h-3" /> : <Edit3 className="w-3 h-3" />}
            </button>
          </div>

          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-1.5">
                <input
                  type="text"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  className="w-full px-2.5 py-1 text-xs font-bold border border-slate-300 rounded-lg"
                  placeholder="Full Name"
                />
                <input
                  type="email"
                  value={editEmail}
                  onChange={e => setEditEmail(e.target.value)}
                  className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded-lg text-slate-600"
                  placeholder="Email"
                />
                <button
                  onClick={handleSaveProfile}
                  className="px-2.5 py-1 bg-[#8C7AE6] text-white text-[11px] font-semibold rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <div>
                <h2 className="text-base font-bold text-slate-900 truncate">{user.name}</h2>
                <p className="text-xs text-slate-500 truncate">{user.email}</p>
                <div className="mt-1 flex items-center gap-1.5 text-[10px] text-purple-700 font-medium">
                  <Sparkles className="w-3 h-3" />
                  <span>College Lab Student Account</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="mt-5">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
          App Preferences
        </h3>

        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm divide-y divide-slate-100">
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Daily Wellness Check-in</div>
                <div className="text-[11px] text-slate-500">Gentle evening reminder at 8:30 PM</div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={user.dailyReminderEnabled}
                onChange={e => onUpdateUser({ dailyReminderEnabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#8C7AE6]" />
            </label>
          </div>

          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-sky-50 text-sky-600 rounded-xl">
                <Smartphone className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Breathing Exercise Cues</div>
                <div className="text-[11px] text-slate-500">Subtle pace indicator and phase transitions</div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={user.hapticFeedback}
                onChange={e => onUpdateUser({ hapticFeedback: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#8C7AE6]" />
            </label>
          </div>
        </div>
      </div>

      {/* Safety & Helplines Shortcut */}
      <div className="mt-5">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
          Emergency Support
        </h3>

        <button
          onClick={onOpenEmergency}
          className="w-full p-3.5 bg-rose-50 hover:bg-rose-100 border border-rose-200/80 rounded-2xl flex items-center justify-between text-left transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-600 text-white rounded-xl shadow-xs">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-rose-950">Crisis Helplines Directory</div>
              <div className="text-[11px] text-rose-800">Dial 988 or national emergency centers 24/7</div>
            </div>
          </div>
          <span className="text-xs font-bold text-rose-700 bg-white px-2 py-1 rounded-lg border border-rose-200">
            View
          </span>
        </button>
      </div>

      {/* Local Storage & Data Privacy */}
      <div className="mt-5">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
          Device Data & Storage
        </h3>

        <div className="p-4 bg-white rounded-3xl border border-slate-200/80 space-y-3">
          <div className="flex items-start gap-2.5 text-xs text-slate-600">
            <Database className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              Your reflections are kept inside device storage (simulating Flutter's <code>shared_preferences</code>).
            </p>
          </div>

          <button
            onClick={() => setShowClearConfirm(true)}
            className="w-full py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-xl border border-rose-200 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear Locally Stored Mood Entries
          </button>
        </div>
      </div>

      {/* Sign Out */}
      <div className="mt-5">
        <button
          onClick={onLogout}
          className="w-full py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-xs rounded-2xl shadow-2xs flex items-center justify-center gap-2 transition-colors"
        >
          <LogOut className="w-4 h-4 text-slate-400" />
          Sign Out of MindCare
        </button>
      </div>

      {/* College Project Credits */}
      <div className="mt-6 text-center text-[10px] text-slate-400">
        MindCare v1.0 • College Mini-Project • UI Design Using Flutter Lab
      </div>

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-slate-200 animate-slide-up">
            <h3 className="text-sm font-bold text-slate-900">Clear Stored Mood Entries?</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              This will remove all saved offline mood entries from this device. This simulates clearing <code>shared_preferences</code>.
            </p>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmClear}
                className="flex-1 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold shadow-sm"
              >
                Clear All Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
