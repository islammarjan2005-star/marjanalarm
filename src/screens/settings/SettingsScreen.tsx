/**
 * Settings Screen
 *
 * Sections:
 * - Adhkar & text settings
 * - Voice & mic settings
 * - Notifications & alarms
 * - Spiritual tone
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';
import { textStyles } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';
import { Button, Card } from '../../components';
import { useApp } from '../../context';
import { DuaDisplayMode, AdhkarIntensity, FontSizePreference } from '../../types';
import { adhkarSets } from '../../data/adhkar';

const displayModeLabels: Record<DuaDisplayMode, string> = {
  arabic_transliteration_translation: 'Arabic + Transliteration + Translation',
  arabic_transliteration: 'Arabic + Transliteration',
  arabic_only: 'Arabic only',
};

const fontSizeLabels: Record<FontSizePreference, string> = {
  small: 'Small',
  medium: 'Medium',
  large: 'Large',
};

const intensityLabels: Record<AdhkarIntensity, string> = {
  light: 'Light (~20 seconds)',
  standard: 'Standard (~1-2 minutes)',
  full: 'Full (~5+ minutes)',
};

interface SettingsRowProps {
  label: string;
  value?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
}

const SettingsRow: React.FC<SettingsRowProps> = ({
  label,
  value,
  onPress,
  rightElement,
}) => {
  const content = (
    <View style={styles.settingsRow}>
      <Text style={styles.settingsLabel}>{label}</Text>
      {rightElement || (
        <View style={styles.settingsValueContainer}>
          {value && <Text style={styles.settingsValue}>{value}</Text>}
          {onPress && <Text style={styles.settingsArrow}>›</Text>}
        </View>
      )}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

export const SettingsScreen: React.FC = () => {
  const {
    state,
    setDuaDisplayMode,
    setFontSize,
    setAdhkarIntensity,
    updatePreferences,
  } = useApp();
  const { preferences } = state;

  const [showDisplayModeModal, setShowDisplayModeModal] = useState(false);
  const [showFontSizeModal, setShowFontSizeModal] = useState(false);
  const [showIntensityModal, setShowIntensityModal] = useState(false);
  const [showToneModal, setShowToneModal] = useState(false);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.background.gradient.start, colors.background.primary]}
        style={styles.gradient}
      />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Text style={styles.title}>Settings</Text>

          {/* Adhkar & Text Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Adhkar & Text</Text>
            <Card variant="default" padding="none">
              <SettingsRow
                label="Default intensity"
                value={intensityLabels[preferences.defaultAdhkarIntensity]}
                onPress={() => setShowIntensityModal(true)}
              />
              <View style={styles.divider} />
              <SettingsRow
                label="Display mode"
                value={displayModeLabels[preferences.duaDisplayMode]}
                onPress={() => setShowDisplayModeModal(true)}
              />
              <View style={styles.divider} />
              <SettingsRow
                label="Font size"
                value={fontSizeLabels[preferences.fontSize]}
                onPress={() => setShowFontSizeModal(true)}
              />
            </Card>
          </View>

          {/* Voice & Mic Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Voice & Mic</Text>
            <Card variant="default" padding="none">
              <SettingsRow
                label="Microphone access"
                value={preferences.micPermissionGranted ? 'Granted' : 'Not granted'}
              />
              <View style={styles.divider} />
              <View style={styles.micInfoRow}>
                <Text style={styles.micInfoText}>
                  We process your voice for recognition; we don't store raw audio.
                </Text>
              </View>
            </Card>
          </View>

          {/* Spiritual Tone Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Spiritual Tone</Text>
            <Card variant="default" padding="none">
              <SettingsRow
                label="Reminder style"
                value={
                  preferences.spiritualTone === 'gentle'
                    ? 'Very gentle'
                    : 'Direct / disciplined'
                }
                onPress={() => setShowToneModal(true)}
              />
            </Card>
          </View>

          {/* About Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Card variant="default" padding="none">
              <SettingsRow label="Version" value="1.0.0" />
              <View style={styles.divider} />
              <SettingsRow label="Made with ❤️ for the Ummah" />
            </Card>
          </View>
        </ScrollView>

        {/* Display Mode Modal */}
        <Modal
          visible={showDisplayModeModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowDisplayModeModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Display Mode</Text>
              {(
                Object.keys(displayModeLabels) as DuaDisplayMode[]
              ).map((mode) => (
                <TouchableOpacity
                  key={mode}
                  onPress={() => {
                    setDuaDisplayMode(mode);
                    setShowDisplayModeModal(false);
                  }}
                >
                  <Card
                    variant={preferences.duaDisplayMode === mode ? 'highlight' : 'outlined'}
                    padding="md"
                    style={styles.modalCard}
                  >
                    <View style={styles.modalCardContent}>
                      <View style={styles.radioOuter}>
                        {preferences.duaDisplayMode === mode && (
                          <View style={styles.radioInner} />
                        )}
                      </View>
                      <Text style={styles.modalCardText}>
                        {displayModeLabels[mode]}
                      </Text>
                    </View>
                  </Card>
                </TouchableOpacity>
              ))}
              <Button
                title="Done"
                onPress={() => setShowDisplayModeModal(false)}
                fullWidth
                style={styles.modalButton}
              />
            </View>
          </View>
        </Modal>

        {/* Font Size Modal */}
        <Modal
          visible={showFontSizeModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowFontSizeModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Font Size</Text>
              {(
                Object.keys(fontSizeLabels) as FontSizePreference[]
              ).map((size) => (
                <TouchableOpacity
                  key={size}
                  onPress={() => {
                    setFontSize(size);
                    setShowFontSizeModal(false);
                  }}
                >
                  <Card
                    variant={preferences.fontSize === size ? 'highlight' : 'outlined'}
                    padding="md"
                    style={styles.modalCard}
                  >
                    <View style={styles.modalCardContent}>
                      <View style={styles.radioOuter}>
                        {preferences.fontSize === size && (
                          <View style={styles.radioInner} />
                        )}
                      </View>
                      <Text style={styles.modalCardText}>
                        {fontSizeLabels[size]}
                      </Text>
                    </View>
                  </Card>
                </TouchableOpacity>
              ))}
              <Button
                title="Done"
                onPress={() => setShowFontSizeModal(false)}
                fullWidth
                style={styles.modalButton}
              />
            </View>
          </View>
        </Modal>

        {/* Intensity Modal */}
        <Modal
          visible={showIntensityModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowIntensityModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Default Intensity</Text>
              {(
                Object.keys(intensityLabels) as AdhkarIntensity[]
              ).map((intensity) => (
                <TouchableOpacity
                  key={intensity}
                  onPress={() => {
                    setAdhkarIntensity(intensity);
                    setShowIntensityModal(false);
                  }}
                >
                  <Card
                    variant={
                      preferences.defaultAdhkarIntensity === intensity
                        ? 'highlight'
                        : 'outlined'
                    }
                    padding="md"
                    style={styles.modalCard}
                  >
                    <View style={styles.modalCardContent}>
                      <View style={styles.radioOuter}>
                        {preferences.defaultAdhkarIntensity === intensity && (
                          <View style={styles.radioInner} />
                        )}
                      </View>
                      <Text style={styles.modalCardText}>
                        {intensityLabels[intensity]}
                      </Text>
                    </View>
                  </Card>
                </TouchableOpacity>
              ))}
              <Button
                title="Done"
                onPress={() => setShowIntensityModal(false)}
                fullWidth
                style={styles.modalButton}
              />
            </View>
          </View>
        </Modal>

        {/* Spiritual Tone Modal */}
        <Modal
          visible={showToneModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowToneModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Reminder Style</Text>
              <TouchableOpacity
                onPress={() => {
                  updatePreferences({ spiritualTone: 'gentle' });
                  setShowToneModal(false);
                }}
              >
                <Card
                  variant={
                    preferences.spiritualTone === 'gentle' ? 'highlight' : 'outlined'
                  }
                  padding="md"
                  style={styles.modalCard}
                >
                  <View style={styles.modalCardContent}>
                    <View style={styles.radioOuter}>
                      {preferences.spiritualTone === 'gentle' && (
                        <View style={styles.radioInner} />
                      )}
                    </View>
                    <View>
                      <Text style={styles.modalCardText}>Very gentle</Text>
                      <Text style={styles.modalCardDescription}>
                        Soft, encouraging reminders
                      </Text>
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  updatePreferences({ spiritualTone: 'direct' });
                  setShowToneModal(false);
                }}
              >
                <Card
                  variant={
                    preferences.spiritualTone === 'direct' ? 'highlight' : 'outlined'
                  }
                  padding="md"
                  style={styles.modalCard}
                >
                  <View style={styles.modalCardContent}>
                    <View style={styles.radioOuter}>
                      {preferences.spiritualTone === 'direct' && (
                        <View style={styles.radioInner} />
                      )}
                    </View>
                    <View>
                      <Text style={styles.modalCardText}>Direct / disciplined</Text>
                      <Text style={styles.modalCardDescription}>
                        More firm, accountability-focused
                      </Text>
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
              <Button
                title="Done"
                onPress={() => setShowToneModal(false)}
                fullWidth
                style={styles.modalButton}
              />
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing['3xl'],
  },
  title: {
    ...textStyles.h2,
    color: colors.text.primary,
    marginBottom: spacing.xl,
    marginTop: spacing.md,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...textStyles.labelMedium,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  settingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    minHeight: 52,
  },
  settingsLabel: {
    ...textStyles.bodyMedium,
    color: colors.text.primary,
    flex: 1,
  },
  settingsValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    flexShrink: 1,
  },
  settingsValue: {
    ...textStyles.bodyMedium,
    color: colors.text.tertiary,
    textAlign: 'right',
  },
  settingsArrow: {
    ...textStyles.h3,
    color: colors.text.tertiary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border.primary,
    marginHorizontal: spacing.md,
  },
  micInfoRow: {
    padding: spacing.md,
    paddingTop: spacing.xs,
  },
  micInfoText: {
    ...textStyles.bodySmall,
    color: colors.text.tertiary,
    lineHeight: 20,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background.secondary,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: spacing.lg,
    paddingBottom: spacing['3xl'],
  },
  modalTitle: {
    ...textStyles.h3,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  modalCard: {
    marginBottom: spacing.sm,
  },
  modalCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.accent.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.accent.primary,
  },
  modalCardText: {
    ...textStyles.labelLarge,
    color: colors.text.primary,
  },
  modalCardDescription: {
    ...textStyles.bodySmall,
    color: colors.text.tertiary,
    marginTop: spacing.xxs,
  },
  modalButton: {
    marginTop: spacing.lg,
  },
});
