import React, { useState } from 'react';
import { Smile, Trash2, Calendar, Plus, CheckCircle, TrendingUp, Info } from 'lucide-react';
import { MoodEntry, MoodType } from '../../../types';

interface MoodTrackerScreenProps {
  entries: MoodEntry[];
  onAddEntry: (entry: Omit<MoodEntry, 'id' | 'timestamp'>) => void;
  onDeleteEntry: (id: string) => void;
}

export const MoodTrackerScreen: React.FC<MoodTrackerScreenProps> = ({
  entries,
  onAddEntry,
  onDeleteEntry,
}) => {
  const [selectedMood, setSelectedMood] = useState<MoodType>('calm');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Morning Reflection']);
  const [notes, setNotes] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const moodOptions: { id: MoodType; label: string; emoji: string; color: string; score: number }[] = [
    { id: 'happy', label: 'Happy & Joyful', emoji: '😊', color: '#10B981', score: 5 },
    { id: 'calm', label: 'Calm & Grounded', emoji: '😌', color: '#8B5CF6', score: 4 },
    { id: 'okay', label: 'Okay / Neutral', emoji: '😐', color: '#0EA5E9', score: 3 },
    { id: 'anxious', label: 'Anxious / Restless', emoji: '😟', color: '#F59E0B', score: 2 },
    { id: 'sad', label: 'Sad / Heavy', emoji: '😢', color: '#EF4444', score: 1 },
  ];

  const availableTags = ['Morning Meditation', 'Academic Stress', 'Good Sleep', 'Physical Workout', 'Social Connection', 'Late Study', 'Quiet Tea'];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const meta = moodOptions.find(m => m.id === selectedMood)!;
    onAddEntry({
      mood: selectedMood,
      moodLabel: meta.label,
      intensity: meta.score,
      tags: selectedTags,
      notes: notes.trim(),
    });

    setNotes('');
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2400);
  };

  // Prepare 7-day chart data
  const chartData = entries.slice(-7).map(e => ({
    label: new Date(e.timestamp).toLocaleDateString([], { weekday: 'short' }),
    score: e.intensity,
    mood: e.mood,
  }));

  return (
    <div className="w-full h-full flex flex-col p-5 bg-[#F9F9FD] overflow-y-auto pb-24 text-slate-800">
      <div className="pt-1">
        <h1 className="text-xl font-bold text-slate-900">Mood Tracker</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Record your daily feelings to notice patterns without self-judgment.
        </p>
      </div>

      {saveSuccess && (
        <div className="mt-3 p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs rounded-2xl flex items-center gap-2 animate-fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Your mood check-in has been stored locally.</span>
        </div>
      )}

      {/* Mood Selector Form */}
      <form onSubmit={handleSave} className="mt-4 p-4.5 bg-white rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
          How do you feel right now?
        </label>

        <div className="grid grid-cols-5 gap-1.5">
          {moodOptions.map(m => {
            const isSelected = selectedMood === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelectedMood(m.id)}
                className={`p-2 rounded-2xl flex flex-col items-center border transition-all ${
                  isSelected
                    ? 'bg-purple-50 border-purple-400 ring-2 ring-purple-200'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="text-2xl">{m.emoji}</span>
                <span className="text-[10px] font-semibold text-slate-700 mt-1">{m.id}</span>
              </button>
            );
          })}
        </div>

        {/* Emotion Tags */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">
            What's contributing to this? (Select tags)
          </label>
          <div className="flex flex-wrap gap-1.5">
            {availableTags.map(tag => {
              const active = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-2.5 py-1 rounded-xl text-[10px] font-medium transition-all ${
                    active
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Notes Input */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
            Optional Reflection Note
          </label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Write down any thoughts, triggers, or small wins..."
            rows={2}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-slate-800"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#8C7AE6] hover:bg-[#7A67D8] text-white font-semibold text-xs rounded-2xl shadow-md shadow-purple-500/20 active:scale-[0.98] transition-all"
        >
          Save Mood Check-in
        </button>
      </form>

      {/* 7-Day Trend Chart */}
      <div className="mt-5 p-4 bg-white rounded-3xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              7-Day Mood Rhythm
            </h2>
          </div>
          <span className="text-[10px] text-slate-400">Scale 1 (Sad) to 5 (Happy)</span>
        </div>

        {chartData.length < 2 ? (
          <p className="text-xs text-slate-400 text-center py-6">
            Log at least 2 mood entries to view your visual trend curve.
          </p>
        ) : (
          <div className="h-36 w-full flex items-end justify-between gap-2 pt-6 pb-2 px-1">
            {chartData.map((d, idx) => {
              const heightPercent = Math.max(20, (d.score / 5) * 100);
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <span className="text-[10px] font-bold text-slate-700">
                    {d.score === 5 ? '😊' : d.score === 4 ? '😌' : d.score === 3 ? '😐' : d.score === 2 ? '😟' : '😢'}
                  </span>
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full max-w-[28px] rounded-t-xl bg-gradient-to-t from-purple-500 to-indigo-400 opacity-90 hover:opacity-100 transition-all shadow-xs"
                    title={`${d.label}: Score ${d.score}/5`}
                  />
                  <span className="text-[10px] text-slate-500 font-medium">{d.label}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Past Reflections History */}
      <div className="mt-5">
        <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
          Past Reflections ({entries.length})
        </h2>

        <div className="space-y-2.5">
          {entries.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-6 bg-white rounded-2xl border border-slate-200/60">
              No previous entries found.
            </p>
          ) : (
            entries.map(entry => (
              <div
                key={entry.id}
                className="p-3.5 bg-white rounded-2xl border border-slate-200/70 shadow-2xs flex items-start justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-50 text-xl rounded-xl shrink-0">
                    {entry.mood === 'happy' ? '😊' : entry.mood === 'calm' ? '😌' : entry.mood === 'okay' ? '😐' : entry.mood === 'anxious' ? '😟' : '😢'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{entry.moodLabel}</span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(entry.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    {entry.notes && (
                      <p className="text-xs text-slate-600 mt-1 italic leading-relaxed">
                        “{entry.notes}”
                      </p>
                    )}

                    {entry.tags.length > 0 && (
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {entry.tags.map((t, idx) => (
                          <span key={idx} className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[9px]">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => onDeleteEntry(entry.id)}
                  className="p-1.5 text-slate-300 hover:text-rose-500 rounded-lg transition-colors"
                  title="Delete entry"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Observational Notice */}
      <div className="mt-5 p-3 bg-slate-100/70 rounded-2xl text-[10px] text-slate-500 flex items-start gap-2">
        <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
        <p>
          Mood entries are stored locally on your device for personal reflection and academic evaluation. They are not used to make medical diagnoses.
        </p>
      </div>
    </div>
  );
};
