/**
 * Onboarding Screen 1 - Welcome
 *
 * Background: soft gradient (deep navy → soft pre-dawn indigo)
 * Center: minimalist crescent + subtle geometric pattern
 * Title: "Wake up with dhikr."
 * Subtitle: "An alarm that only turns off when you remember Allah."
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';
import { textStyles } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { Button } from '../../components';

interface WelcomeScreenProps {
  onNext: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNext }) => {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  return (
    <LinearGradient
      colors={[colors.background.gradient.start, colors.background.gradient.end]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Crescent Moon Icon */}
          <View style={styles.iconContainer}>
            <View style={styles.crescentContainer}>
              <View style={styles.crescentOuter} />
              <View style={styles.crescentInner} />
            </View>
            {/* Subtle geometric pattern */}
            <View style={styles.geometricPattern}>
              {[...Array(8)].map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.geometricLine,
                    { transform: [{ rotate: `${i * 45}deg` }] },
                  ]}
                />
              ))}
            </View>
          </View>

          {/* Text */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>Wake up with dhikr.</Text>
            <Text style={styles.subtitle}>
              An alarm that only turns off when you remember Allah.
            </Text>
          </View>
        </View>

        {/* Bottom Actions */}
        <View style={styles.bottomContainer}>
          <Button title="Begin" onPress={onNext} fullWidth size="lg" />

          <TouchableOpacity
            style={styles.privacyLink}
            onPress={() => setShowPrivacyModal(true)}
          >
            <Text style={styles.privacyLinkText}>
              Why mic access is needed
            </Text>
          </TouchableOpacity>
        </View>

        {/* Privacy Modal */}
        <Modal
          visible={showPrivacyModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowPrivacyModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>About Microphone Access</Text>

              <View style={styles.modalBullets}>
                <View style={styles.bulletItem}>
                  <Text style={styles.bulletIcon}>🎤</Text>
                  <Text style={styles.bulletText}>
                    We only listen during alarms and practice recitations.
                  </Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bulletIcon}>🔒</Text>
                  <Text style={styles.bulletText}>
                    Audio is processed locally to recognize words - we don't
                    store recordings.
                  </Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bulletIcon}>👁</Text>
                  <Text style={styles.bulletText}>
                    You'll always see a clear indicator when the mic is active.
                  </Text>
                </View>
              </View>

              <Button
                title="Got it"
                onPress={() => setShowPrivacyModal(false)}
                fullWidth
              />
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  iconContainer: {
    width: 160,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing['3xl'],
  },
  crescentContainer: {
    width: 80,
    height: 80,
    position: 'relative',
  },
  crescentOuter: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.accent.primary,
    opacity: 0.9,
  },
  crescentInner: {
    position: 'absolute',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.background.gradient.end,
    top: -8,
    left: 20,
  },
  geometricPattern: {
    position: 'absolute',
    width: 160,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  geometricLine: {
    position: 'absolute',
    width: 160,
    height: 1,
    backgroundColor: colors.accent.primary,
    opacity: 0.1,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    ...textStyles.h1,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  subtitle: {
    ...textStyles.bodyLarge,
    color: colors.text.secondary,
    textAlign: 'center',
    maxWidth: 280,
  },
  bottomContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    alignItems: 'center',
  },
  privacyLink: {
    marginTop: spacing.lg,
    padding: spacing.sm,
  },
  privacyLinkText: {
    ...textStyles.bodySmall,
    color: colors.text.tertiary,
    textDecorationLine: 'underline',
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  modalContent: {
    backgroundColor: colors.surface.primary,
    borderRadius: 24,
    padding: spacing.lg,
    width: '100%',
    maxWidth: 360,
  },
  modalTitle: {
    ...textStyles.h3,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  modalBullets: {
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  bulletIcon: {
    fontSize: 20,
    marginTop: 2,
  },
  bulletText: {
    ...textStyles.bodyMedium,
    color: colors.text.secondary,
    flex: 1,
  },
});
