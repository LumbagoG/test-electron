import { ipcMain } from "electron";
import type { PingResult } from "../../shared/contracts/system";

/**
 * Регистрирует IPC-хендлеры, относящиеся к системным/тестовым операциям.
 * Это “слой приложения” main-процесса: бизнес-логика не должна жить в UI.
 */
export function registerSystemIpc(): void {
    ipcMain.handle("system:ping", async (): Promise<PingResult> => {
        return {
            message: "pong",
            at: new Date().toISOString(),
        };
    });
}
