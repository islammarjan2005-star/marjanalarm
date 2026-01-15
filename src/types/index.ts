/**
 * Core TypeScript types for MarjanAlarm
 */

// Display preference for duas
export type DuaDisplayMode =
  | 'arabic_transliteration_translation'
  | 'arabic_transliteration'
  | 'arabic_only';

// Font size preference
export type FontSizePreference = 'small' | 'medium' | 'large';

// Adhkar intensity levels
export type AdhkarIntensity = 'light' | 'standard' | 'full';

// Day of week
export type DayOfWeek = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';

// Alarm status
export type AlarmStatus = 'active' | 'disabled' | 'snoozed';

// Dua completion status
export type DuaCompletionStatus = 'completed' | 'partial' | 'skipped' | 'manual';

// Voice recognition status
export type VoiceStatus =
  | 'idle'
  | 'listening'
  | 'detected'
  | 'not_detected'
  | 'completed'
  | 'error';

// Single Dua/Adhkar item
export interface Dua {
  id: string;
  arabic: string;
  transliteration: string;
  translation: string;
  category: 'morning' | 'evening' | 'general' | 'sleep' | 'wake';
  repetitions: number; // How many times to recite
  audioFile?: string;  // Optional audio reference
}

// Adhkar set (collection of duas)
export interface AdhkarSet {
  id: string;
  name: string;
  description: string;
  intensity: AdhkarIntensity;
  estimatedDuration: string; // e.g., "~20 seconds"
  duas: Dua[];
}

// Alarm configuration
export interface Alarm {
  id: string;
  name: string;
  time: string; // HH:MM format
  enabled: boolean;
  repeatDays: DayOfWeek[];
  adhkarSetId: string;
  snoozeEnabled: boolean;
  snoozeDurationMinutes: number;
  emergencyUnlockEnabled: boolean;
  duaDisplayMode: DuaDisplayMode;
  createdAt: string;
  updatedAt: string;
}

// Alarm history entry
export interface AlarmHistoryEntry {
  id: string;
  alarmId: string;
  alarmName: string;
  triggeredAt: string;
  dismissedAt?: string;
  completionStatus: DuaCompletionStatus;
  adhkarSetId: string;
  adhkarSetName: string;
  duasCompleted: number;
  duasTotal: number;
  snoozeCount: number;
}

// User preferences
export interface UserPreferences {
  displayName: string;
  language: 'en' | 'ar';
  duaDisplayMode: DuaDisplayMode;
  fontSize: FontSizePreference;
  defaultAdhkarIntensity: AdhkarIntensity;
  spiritualTone: 'gentle' | 'direct';
  hasCompletedOnboarding: boolean;
  micPermissionGranted: boolean;
}

// Streak data
export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  totalDhikrMornings: number;
  lastCompletedDate?: string;
}

// App state
export interface AppState {
  preferences: UserPreferences;
  alarms: Alarm[];
  history: AlarmHistoryEntry[];
  streak: StreakData;
  activeAlarmId?: string;
}

// Navigation types
export type RootStackParamList = {
  Onboarding: undefined;
  OnboardingWelcome: undefined;
  OnboardingLanguage: undefined;
  OnboardingIntensity: undefined;
  OnboardingMic: undefined;
  OnboardingFirstAlarm: undefined;
  Main: undefined;
  Home: undefined;
  Progress: undefined;
  Settings: undefined;
  AlarmEdit: { alarmId?: string };
  AlarmRinging: { alarmId: string };
  Practice: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Progress: undefined;
  Settings: undefined;
};
