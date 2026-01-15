/**
 * Onboarding Screen 4 - Mic Permission
 *
 * Icon: simple mic with halo-like ring glow
 * Title: "We only listen while you recite."
 * 3 bullet points explaining privacy
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';
import { colors } from '../../theme/colors';
import { textStyles } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { Button } from '../../components';
import { useApp } from '../../context';

interface MicPermissionScreenProps {
  onNext: () => void;
}

export const MicPermissionScreen: React.FC<MicPermissionScreenProps> = ({
  onNext,
}) => {
  const { updatePreferences } = useApp();
  const [permissionDenied, setPermissionDenied] = useState(false);
  const pulseAnim = React.useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Pulsing glow animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  const requestPermission = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status === 'granted') {
        updatePreferences({ micPermissionGranted: true });
        onNext();
      } else {
        setPermissionDenied(true);
        updatePreferences({ micPermissionGranted: false });
      }
    } catch (error) {
      console.error('Error requesting mic permission:', error);
      setPermissionDenied(true);
    }
  };

  const skipPermission = () => {
    updatePreferences({ micPermissionGranted: false });
    onNext();
  };

  return (
    <LinearGradient
      colors={[colors.background.gradient.start, colors.background.gradient.end]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Mic Icon with Glow */}
          <View style={styles.iconContainer}>
            <Animated.View
              style={[
                styles.glowRing,
                { transform: [{ scale: pulseAnim }] },
              ]}
            />
            <View style={styles.micCircle}>
              <Text style={styles.micIcon}>🎤</Text>
            </View>
          </View>

          {/* Text */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>We only listen while you recite.</Text>

            <View style={styles.bulletContainer}>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>
                  Only during alarms and practice recitations.
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>
                  Audio is processed to recognise words, not stored as recordings.
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>
                  You'll always see when the mic is on.
                </Text>
              </View>
            </View>
          </View>

          {permissionDenied && (
            <View style={styles.deniedContainer}>
              <Text style={styles.deniedText}>
                You can still use the app, but alarms can't be dua-locked.
              </Text>
            </View>
          )}
        </View>

        {/* Bottom Actions */}
        <View style={styles.bottomContainer}>
          <Button
            title="Allow microphone to recite duas"
            onPress={requestPermission}
            fullWidth
            size="lg"
          />

          {permissionDenied && (
            <Button
              title="Continue without mic"
              onPress={skipPermission}
              variant="ghost"
              fullWidth
              style={styles.skipButton}
            />
          )}
        </View>
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
  glowRing: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: colors.voice.pulse,
  },
  micCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.surface.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.accent.primary,
  },
  micIcon: {
    fontSize: 40,
  },
  textContainer: {
    alignItems: 'center',
    maxWidth: 320,
  },
  title: {
    ...textStyles.h2,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  bulletContainer: {
    gap: spacing.md,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  bulletDot: {
    ...textStyles.bodyLarge,
    color: colors.accent.primary,
    lineHeight: 24,
  },
  bulletText: {
    ...textStyles.bodyMedium,
    color: colors.text.secondary,
    flex: 1,
    lineHeight: 24,
  },
  deniedContainer: {
    marginTop: spacing.xl,
    padding: spacing.md,
    backgroundColor: colors.status.errorMuted,
    borderRadius: 12,
  },
  deniedText: {
    ...textStyles.bodySmall,
    color: colors.status.error,
    textAlign: 'center',
  },
  bottomContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  skipButton: {
    marginTop: spacing.md,
  },
});
