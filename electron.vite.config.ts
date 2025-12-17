import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "electron-vite";

/**
 * Конфигурация сборки Electron-проекта:
 * - main: основной процесс (создание окна, жизненный цикл приложения)
 * - preload: безопасный мост между renderer и Node/Electron API
 * - renderer: React-приложение (UI)
 */
export default defineConfig(({ command }) => {
    const isBuild = command === "build";

    return {
        /**
         * В electron-vite@2.x `main/preload/renderer` — это ОТДЕЛЬНЫЕ Vite-конфиги.
         * Поэтому здесь нельзя использовать поля `entry/input/vite` (это другой API).
         */
        main: {
            build: isBuild
                ? {
                      outDir: resolve(__dirname, "dist/main"),
                      rollupOptions: {
                          output: {
                              format: "cjs",
                              entryFileNames: "index.cjs",
                          },
                      },
                  }
                : undefined,
        },
        preload: {
            build: isBuild
                ? {
                      outDir: resolve(__dirname, "dist/preload"),
                      rollupOptions: {
                          output: {
                              format: "cjs",
                              entryFileNames: "index.cjs",
                          },
                      },
                  }
                : undefined,
        },
        renderer: {
            root: resolve(__dirname, "src/renderer"),
            plugins: [react()],
            build: isBuild
                ? {
                      outDir: resolve(__dirname, "dist/renderer"),
                  }
                : undefined,
            resolve: {
                alias: {
                    "@app": resolve(__dirname, "src/renderer/app"),
                    "@pages": resolve(__dirname, "src/renderer/pages"),
                    "@widgets": resolve(__dirname, "src/renderer/widgets"),
                    "@features": resolve(__dirname, "src/renderer/features"),
                    "@entities": resolve(__dirname, "src/renderer/entities"),
                    "@shared": resolve(__dirname, "src/renderer/shared"),
                },
            },
        },
    };
});
