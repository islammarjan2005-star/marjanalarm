/**
 * Onboarding Navigator
 *
 * Handles the 5-screen onboarding flow
 */

import React, { useState } from 'react';
import {
  WelcomeScreen,
  LanguageScreen,
  IntensityScreen,
  MicPermissionScreen,
  FirstAlarmScreen,
} from '../screens/onboarding';

type OnboardingStep = 'welcome' | 'language' | 'intensity' | 'mic' | 'firstAlarm';

interface OnboardingNavigatorProps {
  onComplete: () => void;
}

export const OnboardingNavigator: React.FC<OnboardingNavigatorProps> = ({
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');

  const renderScreen = () => {
    switch (currentStep) {
      case 'welcome':
        return <WelcomeScreen onNext={() => setCurrentStep('language')} />;

      case 'language':
        return <LanguageScreen onNext={() => setCurrentStep('intensity')} />;

      case 'intensity':
        return <IntensityScreen onNext={() => setCurrentStep('mic')} />;

      case 'mic':
        return <MicPermissionScreen onNext={() => setCurrentStep('firstAlarm')} />;

      case 'firstAlarm':
        return (
          <FirstAlarmScreen
            onComplete={onComplete}
            onSkip={onComplete}
          />
        );

      default:
        return <WelcomeScreen onNext={() => setCurrentStep('language')} />;
    }
  };

  return renderScreen();
};
