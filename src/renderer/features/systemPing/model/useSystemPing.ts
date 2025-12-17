import { getElectronApi } from "@shared/api";
import { useCallback, useState } from "react";
import type { SystemPingState } from "./types";

/**
 * Хук бизнес-логики фичи "ping".
 * UI получает только состояние и callback, без знания об IPC/электроне.
 */
export function useSystemPing() {
    const [state, setState] = useState<SystemPingState>({
        isLoading: false,
        result: null,
        error: null,
    });

    const runPing = useCallback(async () => {
        setState((s) => ({ ...s, isLoading: true, error: null }));

        try {
            const api = getElectronApi();
            const result = await api.system.ping();
            setState({ isLoading: false, result, error: null });
        } catch (e) {
            const message = e instanceof Error ? e.message : "Unknown error";
            setState((s) => ({ ...s, isLoading: false, error: message }));
        }
    }, []);

    return { state, runPing };
}
