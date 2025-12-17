import { join } from "node:path";
import { app, BrowserWindow } from "electron";
import { createMainWindow } from "./app/createMainWindow";
import { registerSystemIpc } from "./ipc/registerSystemIpc";

/**
 * Главная точка входа Electron main процесса.
 * Здесь держим wiring: инициализация приложения, окна, IPC.
 */
async function bootstrap(): Promise<void> {
    registerSystemIpc();

    const mainWindow = createMainWindow();

    /**
     * electron-vite в dev поднимает renderer dev server и прокидывает URL через env.
     * Важно: для main процесса используем `process.env`, т.к. `import.meta.env` здесь не гарантирован.
     */
    const devServerUrl = process.env.ELECTRON_RENDERER_URL;
    if (devServerUrl) {
        await mainWindow.loadURL(devServerUrl);
    } else {
        // В production грузим статический билд renderer (dist/renderer/index.html).
        await mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
    }
}

app.whenReady().then(() => {
    void bootstrap().catch((e) => {
        // Явно логируем, чтобы не было silent/unhandled rejection.
        console.error("Failed to bootstrap Electron app", e);
        app.quit();
    });
});

app.on("window-all-closed", () => {
    // На macOS принято оставлять приложение активным до явного quit.
    if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
    // На macOS клики по dock-иконке должны восстанавливать окно.
    if (BrowserWindow.getAllWindows().length === 0) void bootstrap();
});
