/**
 * Color palette for MarjanAlarm
 *
 * Design philosophy:
 * - Primary background: very deep navy / near-black – ideal for dark rooms
 * - Accent: soft teal or emerald (subtle Islamic geometric vibe)
 * - Success: gentle green (not neon)
 * - Warning/skipped: muted amber, not aggressive red
 */

export const colors = {
  // Primary backgrounds (dark-first for 5am usage)
  background: {
    primary: '#0A0E1A',      // Almost black
    secondary: '#111827',    // Deep navy
    tertiary: '#1F2937',     // Slightly lighter for cards
    gradient: {
      start: '#0A0E1A',      // Deep navy
      end: '#1E1B4B',        // Pre-dawn indigo
    },
    success: '#0D1F1C',      // Warm success background
  },

  // Surface colors (for cards, modals)
  surface: {
    primary: '#1F2937',
    secondary: '#374151',
    elevated: '#2A3441',
  },

  // Text colors
  text: {
    primary: '#FFFFFF',
    secondary: '#9CA3AF',
    tertiary: '#6B7280',
    inverse: '#0A0E1A',
    arabic: '#F3F4F6',       // Slightly warmer for Arabic text
  },

  // Accent colors
  accent: {
    primary: '#14B8A6',      // Soft teal
    secondary: '#0D9488',    // Darker teal
    emerald: '#10B981',      // Emerald accent
    light: '#5EEAD4',        // Light teal for highlights
  },

  // Status colors (gentle, not aggressive)
  status: {
    success: '#22C55E',      // Gentle green
    successMuted: '#166534', // Muted green for backgrounds
    warning: '#F59E0B',      // Muted amber
    warningMuted: '#92400E', // Darker amber
    error: '#DC2626',        // Only for critical errors
    errorMuted: '#991B1B',
    info: '#3B82F6',
    infoMuted: '#1E40AF',
  },

  // Dua lock indicator
  duaLock: {
    active: '#14B8A6',       // Greenish teal when dua-locked
    inactive: '#6B7280',     // Grey when normal alarm
  },

  // Progress indicators
  progress: {
    completed: '#14B8A6',
    partial: '#F59E0B',
    skipped: '#F87171',
    empty: '#374151',
  },

  // Interactive elements
  button: {
    primary: '#14B8A6',
    primaryPressed: '#0D9488',
    secondary: 'transparent',
    secondaryBorder: '#374151',
    danger: '#DC2626',
    disabled: '#4B5563',
  },

  // Mic/Voice states
  voice: {
    listening: '#14B8A6',
    detected: '#22C55E',
    notDetected: '#F59E0B',
    pulse: 'rgba(20, 184, 166, 0.3)',
  },

  // Borders and dividers
  border: {
    primary: '#374151',
    secondary: '#4B5563',
    accent: '#14B8A6',
  },

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.7)',
};

export type Colors = typeof colors;
