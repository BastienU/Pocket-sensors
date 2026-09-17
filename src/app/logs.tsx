import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useSensorStore } from '@/stores/sensorStore';
import { ScrollView } from 'react-native';

export default function LogsScreen() {
    const log = useSensorStore((state) => state.log);

    const reversedLog = [...log].reverse();

    return (
        <ThemedView style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView>
                    <ThemedText type="title">
                        Journal
                    </ThemedText>

                    {reversedLog.map((entry) => (
                        <ThemedView key={entry.id} style={styles.logEntry}>
                            <ThemedText style={styles.logText}>
                                {entry.from} → {entry.to}
                            </ThemedText>

                            <ThemedText type="small">
                                {entry.timestamp.toLocaleTimeString()}
                            </ThemedText>
                            
                            {entry.duration !== undefined && (
                                <ThemedText type="small">
                                    Arrière-plan pendant {Math.round(entry.duration / 1000)} secondes
                                </ThemedText>
                            )}
                        </ThemedView>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
        padding: 20,
    },

    logEntry: {
        padding: 12,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: 'grey',
    },
    logText: {
        fontWeight: 'bold',
    },
});