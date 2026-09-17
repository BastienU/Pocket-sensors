import { create } from 'zustand';

type LogEntry = {
    id: string;
    from: string;
    to: string;
    timestamp: Date;
    duration?: number;
};

type SensorStore = {
    appState: string;
    log: LogEntry[];

    setAppState: (state: string) => void;
    pushLog: (from: string, to: string) => void;
    updateLastLogDuration: (duration: number) => void;
};

export const useSensorStore = create<SensorStore>((set) => ({
    appState: 'unknown',
    log: [],

    setAppState: (state) => {
        set({
            appState: state,
        });
    },

    pushLog: (from, to) => {
        set((current) => ({
            log: [
                ...current.log,
                {
                    id: `${Date.now()}-${Math.random()}`,
                    from,
                    to,
                    timestamp: new Date(),
                },
            ],
        }));
    },

    updateLastLogDuration: (duration) => {
        set((current) => {
            const log = [...current.log];

            for (let i = log.length - 1; i >= 0; i--) {
                if (log[i].to === 'background') {
                    log[i] = {
                        ...log[i],
                        duration,
                    };
                    break;
                }
            }

            return { log };
        });
    },
}));