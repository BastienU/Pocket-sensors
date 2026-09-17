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

    x: number;
    y: number;
    z: number;
    norm: number;
    isShaking: boolean;
    sampleCount: number;
    interval: number;

    setAppState: (state: string) => void;
    pushLog: (from: string, to: string) => void;
    updateLastLogDuration: (duration: number) => void;

    setAccelerometer: (x: number, y: number, z: number) => void;
    setInterval: (interval: number) => void;
};

export const useSensorStore = create<SensorStore>((set) => ({
    appState: 'unknown',
    log: [],
    x: 0,
    y: 0,
    z: 0,
    norm: 0,
    isShaking: false,
    sampleCount: 0,
    interval: 200,

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

    setAccelerometer: (x, y, z) => {
        const norm = Math.sqrt(x * x + y * y + z * z);

        set((current) => ({
            x,
            y,
            z,
            norm,
            isShaking: norm > 1.6,
            sampleCount: current.sampleCount + 1,
        }));
    },

    setInterval: (interval) => {
        set({
            interval,
        });
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