import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AccelerometerDisplay } from '@/components/accelerometer-display';

export default function AccelerometerScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <AccelerometerDisplay />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});