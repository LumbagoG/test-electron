import { Button } from "@shared/ui";
import type { SystemPingState } from "../model/types";

export type SystemPingPanelProps = {
    /** Состояние фичи (данные для UI). */
    state: SystemPingState;
    /** Действие пользователя: запустить ping. */
    onPing(): void;
};

/**
 * Презентационный UI для ping.
 * Никаких side-effects/IPC — только отрисовка по props.
 */
export function SystemPingPanel({ state, onPing }: SystemPingPanelProps) {
    return (
        <div style={{ display: "grid", gap: 12 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <Button onClick={onPing} disabled={state.isLoading}>
                    {state.isLoading ? "Пингуем…" : "Ping main"}
                </Button>
                {state.result ? (
                    <span style={{ opacity: 0.9 }}>
                        Ответ: <b>{state.result.message}</b> (
                        {new Date(state.result.at).toLocaleString()})
                    </span>
                ) : (
                    <span style={{ opacity: 0.7 }}>Нажми кнопку, чтобы проверить IPC.</span>
                )}
            </div>

            {state.error ? (
                <div
                    style={{
                        color: "#fb7185",
                        background: "rgba(251,113,133,0.12)",
                        padding: 10,
                        borderRadius: 12,
                    }}
                >
                    Ошибка: {state.error}
                </div>
            ) : null}
        </div>
    );
}
