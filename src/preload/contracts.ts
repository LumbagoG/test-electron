import type { PingResult } from "../shared/contracts/system";

/**
 * Контракты preload API, доступные в renderer через `window.electronAPI`.
 * Важно: это “белый список” операций, которые разрешены UI.
 */
export type ElectronApi = {
    /** Версии окружения (отдаём только чтение). */
    versions: {
        electron: string;
        node: string;
        chrome: string;
    };

    /** Системные операции (через IPC invoke). */
    system: {
        ping(): Promise<PingResult>;
    };
};
