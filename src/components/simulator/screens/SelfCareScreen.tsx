import React, { useState } from 'react';
import { CheckCircle2, Circle, Plus, Sparkles, Clock, Heart, Award, X } from 'lucide-react';
import { SelfCareTask } from '../../../types';

interface SelfCareScreenProps {
  tasks: SelfCareTask[];
  onToggleTask: (id: string) => void;
  onAddTask: (task: Omit<SelfCareTask, 'id' | 'isCompleted'>) => void;
}

export const SelfCareScreen: React.FC<SelfCareScreenProps> = ({
  tasks,
  onToggleTask,
  onAddTask,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'mindfulness' | 'body' | 'reflection' | 'rest'>('mindfulness');
  const [newDuration, setNewDuration] = useState(10);
  const [newDescription, setNewDescription] = useState('');

  const completedCount = tasks.filter(t => t.isCompleted).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const handleAddNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddTask({
      title: newTitle.trim(),
      category: newCategory,
      durationMinutes: Number(newDuration) || 5,
      description: newDescription.trim() || 'Custom personal wellness intention.',
    });

    setNewTitle('');
    setNewDescription('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="w-full h-full flex flex-col p-5 bg-[#F9F9FD] overflow-y-auto pb-24 text-slate-800">
      {/* Top Header */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Daily Self-Care</h1>
          <p className="text-xs text-slate-500 mt-0.5">Gentle micro-habits to nurture your energy</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="p-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-2xl transition-colors flex items-center gap-1 text-xs font-semibold"
        >
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </div>

      {/* Progress Card */}
      <div className="mt-4 p-4.5 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-600/20 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-100">
            <Award className="w-4 h-4 text-emerald-200" />
            <span>Today's Consistency</span>
          </div>
          <span className="text-sm font-extrabold">{progressPercent}%</span>
        </div>

        <div className="mt-3 w-full bg-emerald-950/20 h-2.5 rounded-full overflow-hidden">
          <div
            style={{ width: `${progressPercent}%` }}
            className="h-full bg-white rounded-full transition-all duration-500"
          />
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-emerald-100">
          <span>{completedCount} of {tasks.length} tasks completed</span>
          <span className="text-[11px] font-medium text-white/90">
            {progressPercent === 100
              ? '✨ Outstanding self-compassion today!'
              : 'One step at a time.'}
          </span>
        </div>
      </div>

      {/* Tasks List */}
      <div className="mt-5 space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Today's Wellness Intentions
          </h2>
          <span className="text-[10px] text-slate-400">Tap to toggle</span>
        </div>

        {tasks.map(task => {
          return (
            <div
              key={task.id}
              onClick={() => onToggleTask(task.id)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                task.isCompleted
                  ? 'bg-emerald-50/60 border-emerald-200 text-slate-500'
                  : 'bg-white border-slate-200/80 hover:border-purple-300 text-slate-800 shadow-2xs'
              }`}
            >
              <div className="mt-0.5">
                {task.isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300 hover:text-purple-500" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3
                    className={`text-xs font-bold ${
                      task.isCompleted ? 'line-through text-slate-400' : 'text-slate-900'
                    }`}
                  >
                    {task.title}
                  </h3>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {task.durationMinutes}m
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  {task.description}
                </p>
                {task.completedAt && (
                  <span className="inline-block mt-1 text-[9px] text-emerald-700 bg-emerald-100/60 px-1.5 py-0.5 rounded">
                    Done at {task.completedAt}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Encouragement Footer */}
      <div className="mt-5 p-3.5 bg-purple-50 border border-purple-200/70 rounded-2xl text-[11px] text-purple-900 flex items-start gap-2.5">
        <Sparkles className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Gentle Reminder:</strong> Self-care is not another academic chore to grade. Even finishing a single conscious breath or drinking a glass of water is a complete victory for your well-being.
        </p>
      </div>

      {/* Add Custom Task Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-slate-200 animate-slide-up">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Add Wellness Intention</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddNew} className="space-y-3.5 mt-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Intention Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Listen to ambient nature audio"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Estimated Minutes
                </label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={newDuration}
                  onChange={e => setNewDuration(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Gentle Description
                </label>
                <textarea
                  value={newDescription}
                  onChange={e => setNewDescription(e.target.value)}
                  placeholder="Why this brings you calm..."
                  rows={2}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-slate-800"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#8C7AE6] hover:bg-[#7A67D8] text-white rounded-xl text-xs font-semibold shadow-sm"
                >
                  Add Intention
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
