/// <reference types="vite/client" />

import type { ElectronApi } from "../preload/contracts";

declare global {
    interface Window {
        /**
         * Типизированный API, выставленный из preload.
         * В UI нельзя использовать Node/Electron напрямую — только этот контракт.
         */
        electronAPI: ElectronApi;
    }
}
