# Test Electron (Electron + React + Vite + TypeScript)

Тестовое приложение на Electron, где:

- **main**: создаёт окно, регистрирует IPC
- **preload**: типизированный безопасный мост `window.electronAPI`
- **renderer**: React-приложение, разложенное по **FSD**

## Требования

- Node.js **18+**
- npm (или pnpm/yarn — но команды ниже под npm)

## Установка

```bash
npm i
```

## Запуск в dev режиме

```bash
npm run dev
```

Откроется окно Electron. На главной странице:
- видно версии Electron/Node/Chromium
- есть кнопка **Ping main**, которая делает `ipcRenderer.invoke('system:ping')` через preload.

## Сборка (production)

```bash
npm run build
```

Потом можно проверить production-сборку:

```bash
npm run preview
```

## Линтинг

```bash
npm run lint
```

## Авто-форматирование / авто-фиксы

```bash
npm run check:write
```

## Pre-commit хук

В проекте подключён **husky**: перед каждым коммитом запускается `npm run lint` (то есть `biome check .`).

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


