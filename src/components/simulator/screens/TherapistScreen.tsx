import React, { useState } from 'react';
import { Search, Star, Clock, Award, CheckCircle, ChevronRight, X, Calendar, MessageSquare } from 'lucide-react';
import { Therapist } from '../../../types';
import { SAMPLE_THERAPISTS } from '../../../data/sampleData';

interface TherapistScreenProps {
  onStartChatWithTherapist: (therapist: Therapist) => void;
}

export const TherapistScreen: React.FC<TherapistScreenProps> = ({ onStartChatWithTherapist }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTherapistModal, setActiveTherapistModal] = useState<Therapist | null>(null);
  const [bookingToast, setBookingToast] = useState('');

  const categories = [
    'All',
    'Anxiety & Stress',
    'Relationships',
    'Depression',
    'College Burnout'
  ];

  const filtered = SAMPLE_THERAPISTS.filter(t => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.bio.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedCategory === 'All') return matchesSearch;
    return matchesSearch && t.specialty.toLowerCase().includes(selectedCategory.toLowerCase().split(' ')[0]);
  });

  const handleBookDemo = (therapist: Therapist) => {
    setBookingToast(`Consultation request confirmed with ${therapist.name}.`);
    setTimeout(() => {
      setBookingToast('');
    }, 3200);
  };

  return (
    <div className="w-full h-full flex flex-col p-5 bg-[#F9F9FD] overflow-y-auto pb-24 text-slate-800">
      {/* Header */}
      <div className="pt-1">
        <h1 className="text-xl font-bold text-slate-900">Counseling Specialists</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Verified mental wellness practitioners & academic counselors
        </p>
      </div>

      {/* Demo Notice */}
      <div className="mt-2.5 px-3 py-1.5 bg-purple-50 border border-purple-200/70 rounded-xl text-[11px] text-purple-700">
        Demo Directory: Sample practitioner profiles for college evaluation.
      </div>

      {/* Search Input */}
      <div className="mt-3 relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search by therapist name or specialty..."
          className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200/80 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 shadow-sm"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 text-xs"
          >
            Clear
          </button>
        )}
      </div>

      {/* Category Filter Chips */}
      <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {categories.map(cat => {
          const isSelected = cat === selectedCategory;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-[#8C7AE6] text-white shadow-sm'
                  : 'bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Booking Toast Banner */}
      {bookingToast && (
        <div className="mt-3 p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-2xl text-xs flex items-center gap-2 animate-fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{bookingToast}</span>
        </div>
      )}

      {/* Therapist List */}
      <div className="mt-3 space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200/60 p-6">
            <p className="text-sm font-semibold text-slate-700">No counselors match your search</p>
            <p className="text-xs text-slate-400 mt-1">Try resetting the filter or searching for another keyword.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-3 px-3 py-1.5 text-xs text-purple-700 font-semibold bg-purple-50 rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filtered.map(therapist => (
            <div
              key={therapist.id}
              className="p-4 bg-white rounded-3xl border border-slate-200/70 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3.5">
                <img
                  src={therapist.avatarUrl}
                  alt={therapist.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-purple-50 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 truncate">
                        {therapist.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 truncate">{therapist.title}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200/60 shrink-0">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span className="text-[11px] font-bold text-amber-900">{therapist.rating}</span>
                    </div>
                  </div>

                  <p className="text-xs font-semibold text-purple-700 mt-1">
                    {therapist.specialty}
                  </p>

                  <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Award className="w-3 h-3 text-slate-400" />
                      {therapist.experienceYears} yrs exp.
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {therapist.nextSlot}
                    </span>
                  </div>
                </div>
              </div>

              {/* Approaches chips */}
              <div className="mt-3 flex flex-wrap gap-1">
                {therapist.approach.slice(0, 2).map((app, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[10px]"
                  >
                    {app}
                  </span>
                ))}
                {therapist.approach.length > 2 && (
                  <span className="text-[10px] text-slate-400 px-1 py-0.5">
                    +{therapist.approach.length - 2} more
                  </span>
                )}
              </div>

              {/* Actions row */}
              <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">
                  {therapist.sessionFee}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onStartChatWithTherapist(therapist)}
                    className="p-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl transition-colors"
                    title="Chat with counselor"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setActiveTherapistModal(therapist)}
                    className="px-3 py-1.5 bg-[#8C7AE6] hover:bg-[#7A67D8] text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Profile Detail Sheet/Modal */}
      {activeTherapistModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-0 sm:p-4">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl max-h-[85vh] overflow-y-auto animate-slide-up">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img
                  src={activeTherapistModal.avatarUrl}
                  alt={activeTherapistModal.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-4 ring-purple-100"
                />
                <div>
                  <h3 className="text-base font-bold text-slate-900">{activeTherapistModal.name}</h3>
                  <p className="text-xs text-slate-500">{activeTherapistModal.title}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="text-xs font-bold">{activeTherapistModal.rating}</span>
                    <span className="text-xs text-slate-400">({activeTherapistModal.reviewCount} client reviews)</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setActiveTherapistModal(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Clinical Bio & Approach
                </h4>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  {activeTherapistModal.bio}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Evidence-Based Modalities
                </h4>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {activeTherapistModal.approach.map((app, i) => (
                    <span key={i} className="px-2.5 py-1 bg-purple-50 text-purple-700 rounded-lg text-xs font-medium">
                      {app}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Education & Credentials
                </h4>
                <p className="mt-1 text-xs text-slate-600">
                  {activeTherapistModal.education}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Languages Spoken
                </h4>
                <p className="mt-1 text-xs text-slate-600">
                  {activeTherapistModal.languages.join(', ')}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex gap-2">
              <button
                onClick={() => {
                  onStartChatWithTherapist(activeTherapistModal);
                  setActiveTherapistModal(null);
                }}
                className="flex-1 py-3 bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold text-xs rounded-2xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                Chat Now
              </button>
              <button
                onClick={() => {
                  handleBookDemo(activeTherapistModal);
                  setActiveTherapistModal(null);
                }}
                className="flex-1 py-3 bg-[#8C7AE6] hover:bg-[#7A67D8] text-white font-semibold text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-4 h-4" />
                Book Demo Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
