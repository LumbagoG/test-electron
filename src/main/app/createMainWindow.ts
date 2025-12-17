import { existsSync } from "node:fs";
import { join } from "node:path";
import { BrowserWindow } from "electron";

/**
 * Создаёт главное окно приложения.
 * Важное правило безопасности: Node API недоступны в renderer, взаимодействие идёт через preload.
 */
export function createMainWindow(): BrowserWindow {
    /**
     * Резолвим preload-файл под dev/prod без жёсткой привязки к расширению.
     * В dev electron-vite часто билдит preload как ESM (`index.mjs`), а в prod — как CJS (`index.cjs`).
     */
    const preloadPath = existsSync(join(__dirname, "../preload/index.mjs"))
        ? join(__dirname, "../preload/index.mjs")
        : join(__dirname, "../preload/index.cjs");

    const win = new BrowserWindow({
        width: 1100,
        height: 720,
        show: false,
        webPreferences: {
            preload: preloadPath,
            nodeIntegration: false,
            contextIsolation: true,
        },
    });

    win.on("ready-to-show", () => {
        win.show();
    });

    return win;
}
