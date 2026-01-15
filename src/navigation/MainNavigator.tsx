/**
 * Main Navigator
 *
 * Bottom tab navigation for the main app experience
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { HomeScreen } from '../screens/home';
import { ProgressScreen } from '../screens/progress';
import { SettingsScreen } from '../screens/settings';
import { AlarmEditScreen } from '../screens/alarm';
import { AlarmRingingScreen } from '../screens/ringing';
import { colors } from '../theme/colors';
import { textStyles } from '../theme/typography';
import { spacing } from '../theme/spacing';

type MainTab = 'home' | 'progress' | 'settings';

interface MainNavigatorProps {
  // For demo purposes - in real app would be triggered by alarm system
  testAlarmId?: string;
}

export const MainNavigator: React.FC<MainNavigatorProps> = ({ testAlarmId }) => {
  const [activeTab, setActiveTab] = useState<MainTab>('home');
  const [showAlarmEdit, setShowAlarmEdit] = useState(false);
  const [editingAlarmId, setEditingAlarmId] = useState<string | undefined>();
  const [ringingAlarmId, setRingingAlarmId] = useState<string | undefined>(testAlarmId);

  const handleEditAlarm = (alarmId?: string) => {
    setEditingAlarmId(alarmId);
    setShowAlarmEdit(true);
  };

  const handleCloseAlarmEdit = () => {
    setShowAlarmEdit(false);
    setEditingAlarmId(undefined);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeScreen
            onEditAlarm={handleEditAlarm}
            onViewProgress={() => setActiveTab('progress')}
            onViewSettings={() => setActiveTab('settings')}
          />
        );
      case 'progress':
        return <ProgressScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return null;
    }
  };

  // If alarm is ringing, show ringing screen
  if (ringingAlarmId) {
    return (
      <AlarmRingingScreen
        alarmId={ringingAlarmId}
        onDismiss={() => setRingingAlarmId(undefined)}
      />
    );
  }

  return (
    <View style={styles.container}>
      {/* Main content */}
      <View style={styles.content}>{renderContent()}</View>

      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('home')}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.tabIcon,
              activeTab === 'home' && styles.tabIconActive,
            ]}
          >
            🏠
          </Text>
          <Text
            style={[
              styles.tabLabel,
              activeTab === 'home' && styles.tabLabelActive,
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('progress')}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.tabIcon,
              activeTab === 'progress' && styles.tabIconActive,
            ]}
          >
            📈
          </Text>
          <Text
            style={[
              styles.tabLabel,
              activeTab === 'progress' && styles.tabLabelActive,
            ]}
          >
            Progress
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('settings')}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.tabIcon,
              activeTab === 'settings' && styles.tabIconActive,
            ]}
          >
            ⚙️
          </Text>
          <Text
            style={[
              styles.tabLabel,
              activeTab === 'settings' && styles.tabLabelActive,
            ]}
          >
            Settings
          </Text>
        </TouchableOpacity>
      </View>

      {/* Alarm Edit Modal */}
      <Modal
        visible={showAlarmEdit}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={handleCloseAlarmEdit}
      >
        <AlarmEditScreen
          alarmId={editingAlarmId}
          onSave={handleCloseAlarmEdit}
          onCancel={handleCloseAlarmEdit}
          onDelete={handleCloseAlarmEdit}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.surface.primary,
    borderTopWidth: 1,
    borderTopColor: colors.border.primary,
    paddingBottom: spacing.lg, // Extra padding for home indicator
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  tabIcon: {
    fontSize: 24,
    marginBottom: spacing.xxs,
    opacity: 0.6,
  },
  tabIconActive: {
    opacity: 1,
  },
  tabLabel: {
    ...textStyles.labelSmall,
    color: colors.text.tertiary,
  },
  tabLabelActive: {
    color: colors.accent.primary,
  },
});
