import type { ElectronApi } from "../../../../preload/contracts";

/**
 * Доступ к preload API.
 * Вся работа с Electron из UI должна идти только через этот контракт.
 */
export function getElectronApi(): ElectronApi {
    if (!("electronAPI" in window)) {
        throw new Error("Preload API is not available: window.electronAPI is missing");
    }

    return window.electronAPI;
}
