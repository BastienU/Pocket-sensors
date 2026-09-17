import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useSensorStore } from '@/stores/sensorStore';

export function AccelerometerDisplay() {
    const x = useSensorStore((state) => state.x);
    const y = useSensorStore((state) => state.y);
    const z = useSensorStore((state) => state.z);
    const norm = useSensorStore((state) => state.norm);
    const sampleCount = useSensorStore((state) => state.sampleCount);

    return (
        <ThemedView style={styles.container}>

            <ThemedText>
                X : {x.toFixed(2)}
            </ThemedText>

            <ThemedView style={styles.barBackground}>
                <ThemedView
                    style={[
                        styles.bar,
                        { width: `${Math.min(Math.abs(x) * 50, 100)}%` },
                    ]}
                />
            </ThemedView>


            <ThemedText>
                Y : {y.toFixed(2)}
            </ThemedText>

            <ThemedView style={styles.barBackground}>
                <ThemedView
                    style={[
                        styles.bar,
                        { width: `${Math.min(Math.abs(y) * 50, 100)}%` },
                    ]}
                />
            </ThemedView>


            <ThemedText>
                Z : {z.toFixed(2)}
            </ThemedText>

            <ThemedView style={styles.barBackground}>
                <ThemedView
                    style={[
                        styles.bar,
                        { width: `${Math.min(Math.abs(z) * 50, 100)}%` },
                    ]}
                />
            </ThemedView>


            <ThemedText>
                Norme : {norm.toFixed(2)} g
            </ThemedText>

            <ThemedText>
                Échantillons : {sampleCount}
            </ThemedText>

        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        gap: 5,
    },

    barBackground: {
        height: 10,
        width: '100%',
        backgroundColor: '#ddd',
        borderRadius: 5,
        overflow: 'hidden',
    },

    bar: {
        height: '100%',
        backgroundColor: 'blue',
        borderRadius: 5,
    },
});