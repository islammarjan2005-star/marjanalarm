/**
 * App Context for global state management
 */

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AppState,
  UserPreferences,
  Alarm,
  AlarmHistoryEntry,
  StreakData,
  DuaDisplayMode,
  AdhkarIntensity,
  FontSizePreference,
} from '../types';

// Default values
const defaultPreferences: UserPreferences = {
  displayName: '',
  language: 'en',
  duaDisplayMode: 'arabic_transliteration_translation',
  fontSize: 'medium',
  defaultAdhkarIntensity: 'standard',
  spiritualTone: 'gentle',
  hasCompletedOnboarding: false,
  micPermissionGranted: false,
};

const defaultStreak: StreakData = {
  currentStreak: 0,
  longestStreak: 0,
  totalDhikrMornings: 0,
};

const defaultState: AppState = {
  preferences: defaultPreferences,
  alarms: [],
  history: [],
  streak: defaultStreak,
};

// Action types
type AppAction =
  | { type: 'SET_STATE'; payload: AppState }
  | { type: 'UPDATE_PREFERENCES'; payload: Partial<UserPreferences> }
  | { type: 'ADD_ALARM'; payload: Alarm }
  | { type: 'UPDATE_ALARM'; payload: { id: string; updates: Partial<Alarm> } }
  | { type: 'DELETE_ALARM'; payload: string }
  | { type: 'ADD_HISTORY'; payload: AlarmHistoryEntry }
  | { type: 'UPDATE_STREAK'; payload: Partial<StreakData> }
  | { type: 'SET_ACTIVE_ALARM'; payload: string | undefined }
  | { type: 'COMPLETE_ONBOARDING' };

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_STATE':
      return action.payload;

    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        preferences: { ...state.preferences, ...action.payload },
      };

    case 'ADD_ALARM':
      return {
        ...state,
        alarms: [...state.alarms, action.payload],
      };

    case 'UPDATE_ALARM':
      return {
        ...state,
        alarms: state.alarms.map((alarm) =>
          alarm.id === action.payload.id
            ? { ...alarm, ...action.payload.updates }
            : alarm
        ),
      };

    case 'DELETE_ALARM':
      return {
        ...state,
        alarms: state.alarms.filter((alarm) => alarm.id !== action.payload),
      };

    case 'ADD_HISTORY':
      return {
        ...state,
        history: [action.payload, ...state.history].slice(0, 100), // Keep last 100
      };

    case 'UPDATE_STREAK':
      return {
        ...state,
        streak: { ...state.streak, ...action.payload },
      };

    case 'SET_ACTIVE_ALARM':
      return {
        ...state,
        activeAlarmId: action.payload,
      };

    case 'COMPLETE_ONBOARDING':
      return {
        ...state,
        preferences: { ...state.preferences, hasCompletedOnboarding: true },
      };

    default:
      return state;
  }
}

// Context
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  // Convenience methods
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  setDuaDisplayMode: (mode: DuaDisplayMode) => void;
  setFontSize: (size: FontSizePreference) => void;
  setAdhkarIntensity: (intensity: AdhkarIntensity) => void;
  addAlarm: (alarm: Alarm) => void;
  updateAlarm: (id: string, updates: Partial<Alarm>) => void;
  deleteAlarm: (id: string) => void;
  toggleAlarm: (id: string) => void;
  completeOnboarding: () => void;
  recordAlarmHistory: (entry: AlarmHistoryEntry) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Storage key
const STORAGE_KEY = '@marjanalarm_state';

// Provider
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, defaultState);

  // Load state from storage on mount
  useEffect(() => {
    const loadState = async () => {
      try {
        const storedState = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedState) {
          const parsed = JSON.parse(storedState) as AppState;
          dispatch({ type: 'SET_STATE', payload: { ...defaultState, ...parsed } });
        }
      } catch (error) {
        console.error('Failed to load state:', error);
      }
    };
    loadState();
  }, []);

  // Save state to storage on change
  useEffect(() => {
    const saveState = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (error) {
        console.error('Failed to save state:', error);
      }
    };
    saveState();
  }, [state]);

  // Convenience methods
  const updatePreferences = (prefs: Partial<UserPreferences>) => {
    dispatch({ type: 'UPDATE_PREFERENCES', payload: prefs });
  };

  const setDuaDisplayMode = (mode: DuaDisplayMode) => {
    dispatch({ type: 'UPDATE_PREFERENCES', payload: { duaDisplayMode: mode } });
  };

  const setFontSize = (size: FontSizePreference) => {
    dispatch({ type: 'UPDATE_PREFERENCES', payload: { fontSize: size } });
  };

  const setAdhkarIntensity = (intensity: AdhkarIntensity) => {
    dispatch({ type: 'UPDATE_PREFERENCES', payload: { defaultAdhkarIntensity: intensity } });
  };

  const addAlarm = (alarm: Alarm) => {
    dispatch({ type: 'ADD_ALARM', payload: alarm });
  };

  const updateAlarm = (id: string, updates: Partial<Alarm>) => {
    dispatch({ type: 'UPDATE_ALARM', payload: { id, updates } });
  };

  const deleteAlarm = (id: string) => {
    dispatch({ type: 'DELETE_ALARM', payload: id });
  };

  const toggleAlarm = (id: string) => {
    const alarm = state.alarms.find((a) => a.id === id);
    if (alarm) {
      dispatch({
        type: 'UPDATE_ALARM',
        payload: { id, updates: { enabled: !alarm.enabled } },
      });
    }
  };

  const completeOnboarding = () => {
    dispatch({ type: 'COMPLETE_ONBOARDING' });
  };

  const recordAlarmHistory = (entry: AlarmHistoryEntry) => {
    dispatch({ type: 'ADD_HISTORY', payload: entry });
  };

  const incrementStreak = () => {
    const today = new Date().toISOString().split('T')[0];
    const newStreak = state.streak.currentStreak + 1;
    dispatch({
      type: 'UPDATE_STREAK',
      payload: {
        currentStreak: newStreak,
        longestStreak: Math.max(newStreak, state.streak.longestStreak),
        totalDhikrMornings: state.streak.totalDhikrMornings + 1,
        lastCompletedDate: today,
      },
    });
  };

  const resetStreak = () => {
    dispatch({
      type: 'UPDATE_STREAK',
      payload: { currentStreak: 0 },
    });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        updatePreferences,
        setDuaDisplayMode,
        setFontSize,
        setAdhkarIntensity,
        addAlarm,
        updateAlarm,
        deleteAlarm,
        toggleAlarm,
        completeOnboarding,
        recordAlarmHistory,
        incrementStreak,
        resetStreak,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Hook
export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
