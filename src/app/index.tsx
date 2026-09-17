import * as Device from 'expo-device';
import { useEffect, useRef } from 'react';
import { AppState, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedIcon } from '@/components/animated-icon';
import { HintRow } from '@/components/hint-row';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useSensorStore } from '@/stores/sensorStore';

function getDevMenuHint() {
  if (Platform.OS === 'web') {
    return <ThemedText type="small">use browser devtools</ThemedText>;
  }

  if (Device.isDevice) {
    return (
      <ThemedText type="small">
        shake device or press <ThemedText type="code">m</ThemedText> in terminal
      </ThemedText>
    );
  }

  const shortcut = Platform.OS === 'android' ? 'cmd+m (or ctrl+m)' : 'cmd+d';

  return (
    <ThemedText type="small">
      press <ThemedText type="code">{shortcut}</ThemedText>
    </ThemedText>
  );
}

export default function HomeScreen() {
  const appState = useSensorStore((state) => state.appState);

  const setAppState = useSensorStore((state) => state.setAppState);
  const pushLog = useSensorStore((state) => state.pushLog);
  const updateLastLogDuration = useSensorStore(
    (state) => state.updateLastLogDuration
  );

  const previousState = useRef(AppState.currentState);
  const backgroundStart = useRef<number | null>(null);

  useEffect(() => {
    setAppState(AppState.currentState);

    const subscription = AppState.addEventListener(
      'change',
      nextState => {
        const oldState = previousState.current;

        if (nextState === 'background') {
          backgroundStart.current = Date.now();
        }

        if (
          nextState === 'active' &&
          backgroundStart.current !== null
        ) {
          const duration = Date.now() - backgroundStart.current;

          updateLastLogDuration(duration);

          backgroundStart.current = null;
        }

        setAppState(nextState);
        pushLog(oldState, nextState);

        previousState.current = nextState;
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>

        <ThemedView style={styles.badge}>
          <ThemedText style={styles.badgeText}>
            {appState}
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.heroSection}>
          <AnimatedIcon />

          <ThemedText type="title" style={styles.title}>
            Bienvenue aux{'\n'}
            <ThemedText type="title" style={styles.pompes}>
              Pompes Funèbres
            </ThemedText>
          </ThemedText>
        </ThemedView>

        <ThemedText type="code" style={styles.code}>
          get started
        </ThemedText>

        <ThemedView
          type="backgroundElement"
          style={styles.stepContainer}
        >
          <HintRow
            title="Try editing"
            hint={
              <ThemedText type="code">
                src/app/index.tsx
              </ThemedText>
            }
          />

          <HintRow
            title="Dev tools"
            hint={getDevMenuHint()}
          />

          <HintRow
            title="Fresh start"
            hint={
              <ThemedText type="code">
                npm run reset-project
              </ThemedText>
            }
          />
        </ThemedView>

        {Platform.OS === 'web' && <WebBadge />}

      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },

  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },

  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },

  title: {
    textAlign: 'center',
  },

  pompes: {
    color: 'red',
  },

  code: {
    textTransform: 'uppercase',
  },

  stepContainer: {
    gap: Spacing.three,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },

  badge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'green',
  },

  badgeText: {
    color: 'white',
    fontWeight: 'bold',
  },
});