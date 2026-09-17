import { Accelerometer } from 'expo-sensors';
import { useEffect } from 'react';

import { useSensorStore } from '@/stores/sensorStore';

export function useAccelerometer() {
  const appState = useSensorStore((state) => state.appState);
  const interval = useSensorStore((state) => state.interval);

  const setAccelerometer = useSensorStore(
    (state) => state.setAccelerometer
  );

  const pushLog = useSensorStore((state) => state.pushLog);

  useEffect(() => {
    if (appState !== 'active') {
      return;
    }

    Accelerometer.setUpdateInterval(interval);

    const subscription = Accelerometer.addListener(
      ({ x, y, z }) => {
        setAccelerometer(x, y, z);
      }
    );

    pushLog('Accéléromètre', 'actif');

    return () => {
      subscription.remove();
      pushLog('Accéléromètre', 'en pause');
    };
  }, [appState, interval]);
}