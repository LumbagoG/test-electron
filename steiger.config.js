import fsd from "@feature-sliced/steiger-plugin";
import { defineConfig } from "steiger";

/**
 * @type {import('steiger').Config}
 */
export const config = defineConfig([
    ...fsd.configs.recommended,
    {
        // Игнорируем файлы в node_modules, .next и т.д.
        ignores: [
            "**/node_modules/**",
            "**/.next/**",
            "**/public/**",
            "**/dist/**",
            "**/out/**",
            "**/release/**",
        ],
    },
    {
        // Общие настройки для проекта
        // Steiger/FSD применяем ТОЛЬКО к renderer-части, где реально используется FSD.
        files: ["./src/renderer/**"],
        rules: {
            // Отключаем правило insignificant-slice, так как проект еще в начальной стадии
            "fsd/insignificant-slice": "off",
            // Отключаем правило no-segmentless-slices для начального этапа разработки
            "fsd/no-segmentless-slices": "off",
            // Отключаем проверку purpose-based сегментов, так как используем типовую структуру
            "fsd/segments-by-purpose": "off",
        },
    },
    {
        // Специальные настройки для shared слоя
        files: ["./src/renderer/shared/**"],
        rules: {
            // Настраиваем особенности shared слоя
            "fsd/public-api": "warn",
            "fsd/shared-lib-grouping": "warn",
        },
    },
]);

export default config;
