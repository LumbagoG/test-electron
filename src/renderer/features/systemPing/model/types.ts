import type { PingResult } from "../../../../shared/contracts/system";

/**
 * Состояние фичи проверки IPC связи (ping/pong).
 * Бизнес-смысл: дать пользователю/разработчику быстрый сигнал, что main↔renderer связь живая.
 */
export type SystemPingState = {
    /** Идёт ли запрос прямо сейчас. */
    isLoading: boolean;
    /** Последний успешный результат. */
    result: PingResult | null;
    /** Текст ошибки (если была). */
    error: string | null;
};
