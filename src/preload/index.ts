import { contextBridge, ipcRenderer } from "electron";
import type { ElectronApi } from "./contracts";

/**
 * Реализация “моста” между renderer и main процессом.
 * Здесь разрешаем только конкретные безопасные операции и скрываем прямой доступ к `ipcRenderer`.
 */
const api: ElectronApi = {
    versions: {
        electron: process.versions.electron,
        node: process.versions.node,
        chrome: process.versions.chrome,
    },
    system: {
        ping: async () => ipcRenderer.invoke("system:ping"),
    },
};

contextBridge.exposeInMainWorld("electronAPI", api);
