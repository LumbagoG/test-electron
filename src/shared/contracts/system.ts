/**
 * Результат тестового ping вызова (IPC).
 * Контракт общий для main/preload/renderer.
 */
export type PingResult = {
    /** Текстовый ответ для проверки связности IPC. */
    message: string;
    /** Серверное время (main процесс). */
    at: string;
};
