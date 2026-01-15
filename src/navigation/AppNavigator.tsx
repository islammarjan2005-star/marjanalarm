/**
 * App Navigator
 *
 * Root navigator that decides between onboarding and main app
 */

import React from 'react';
import { useApp } from '../context';
import { OnboardingNavigator } from './OnboardingNavigator';
import { MainNavigator } from './MainNavigator';

export const AppNavigator: React.FC = () => {
  const { state } = useApp();
  const hasCompletedOnboarding = state.preferences.hasCompletedOnboarding;

  if (!hasCompletedOnboarding) {
    return (
      <OnboardingNavigator
        onComplete={() => {
          // State is already updated by the FirstAlarmScreen
        }}
      />
    );
  }

  return <MainNavigator />;
};
