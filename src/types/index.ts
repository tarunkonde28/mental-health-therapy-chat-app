export interface Therapist {
  id: string;
  name: string;
  title: string;
  specialty: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  avatarUrl: string;
  bio: string;
  approach: string[];
  education: string;
  languages: string[];
  sessionFee: string;
  isAvailableToday: boolean;
  nextSlot: string;
}

export type MoodType = 'happy' | 'calm' | 'okay' | 'anxious' | 'sad';

export interface MoodEntry {
  id: string;
  mood: MoodType;
  moodLabel: string;
  intensity: number; // 1 - 5
  tags: string[];
  notes?: string;
  timestamp: string; // ISO string
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'therapist' | 'system';
  therapistId?: string;
  therapistName?: string;
  text: string;
  timestamp: string;
  isRead?: boolean;
}

export interface SelfCareTask {
  id: string;
  title: string;
  category: 'mindfulness' | 'body' | 'reflection' | 'rest';
  durationMinutes: number;
  isCompleted: boolean;
  completedAt?: string;
  description: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  dailyReminderEnabled: boolean;
  reminderTime: string;
  hapticFeedback: boolean;
  darkMode: boolean;
  emergencyContactName: string;
  emergencyContactPhone: string;
}

export type ActiveScreen =
  | 'splash'
  | 'welcome'
  | 'login'
  | 'register'
  | 'home'
  | 'therapists'
  | 'chat'
  | 'mood'
  | 'breathing'
  | 'self_care'
  | 'profile';
