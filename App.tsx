/**
 * MarjanAlarm - A Muslim Alarm App
 *
 * An alarm that only turns off when you actually recite your morning adhkar,
 * with an interface so calm and focused that it feels like worship, not an app.
 */

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppProvider } from './src/context';
import { AppNavigator } from './src/navigation';

export default function App() {
  return (
    <AppProvider>
      <StatusBar style="light" />
      <AppNavigator />
    </AppProvider>
  );
}
