# Test Electron (Electron + React + Vite + TypeScript)

Тестовое приложение на Electron, где:

- **main**: создаёт окно, регистрирует IPC
- **preload**: типизированный безопасный мост `window.electronAPI`
- **renderer**: React-приложение, разложенное по **FSD**

## Требования

- Node.js **18+**
- Yarn (в проекте часть скриптов вызывает `yarn`, поэтому он должен быть доступен)

## Установка

```bash
yarn
```

## Запуск в dev режиме

```bash
yarn dev
```

Откроется окно Electron. На главной странице:
- видно версии Electron/Node/Chromium
- есть кнопка **Ping main**, которая делает `ipcRenderer.invoke('system:ping')` через preload.

## Сборка (production)

```bash
yarn build
```

Потом можно проверить production-сборку:

```bash
yarn preview
```

## Упаковка приложения (electron-builder)

- **Пакет в папку (без установщика)**:

```bash
yarn pack
```

Результат: `release/` (например, `release/mac-arm64/*.app`).

- **Инсталлятор/дистрибутивы**:

```bash
yarn dist
```

## Важное про macOS (подпись)

Если у тебя нет Developer ID сертификата, `electron-builder` выведет предупреждение и **пропустит code signing** — для тестового приложения это нормально. Для реального релиза нужно настроить подпись (иначе Gatekeeper будет ругаться).

## Линтинг

```bash
yarn lint
```

`lint` запускает полный набор проверок: **Biome + TypeScript + Steiger**.

- **Biome**: `yarn lint:biome`
- **TypeScript**: `yarn lint:types`
- **Steiger (FSD)**: `yarn lint:steiger` (проверяет только `src/renderer`)

## Авто-форматирование

```bash
yarn format
```

## Pre-commit хук

В проекте подключён **husky**: перед каждым коммитом запускается `npm run lint:all` (Biome + TS + Steiger).

Дополнительно настроен `lint-staged.config.js` (если захочешь включить автофиксы для staged-файлов).

## Структура проекта (ключевое)

```text
src/
  main/                 # Electron main process (wiring, окно, IPC)
  preload/              # preload bridge (экспорт window.electronAPI)
  renderer/             # React UI (FSD)
    app/                # bootstrap, providers, global styles
    pages/              # страницы
    widgets/            # композиция фич
    features/           # фичи (model + ui)
    shared/             # shared/ui, shared/api, shared/lib
  shared/               # общие контракты (например, IPC types)
```

## Про IPC и безопасность

- В `BrowserWindow` отключён `nodeIntegration`, включён `contextIsolation`.
- UI не имеет доступа к Node/Electron напрямую — только через `window.electronAPI` из preload.


