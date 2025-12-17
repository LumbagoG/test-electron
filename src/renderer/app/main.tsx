import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./providers/App";
import "./styles/global.css";

/**
 * Точка входа renderer (React).
 * Здесь допускается только bootstrap UI, без бизнес-логики.
 */
function bootstrap(): void {
    const el = document.getElementById("root");
    if (!el) throw new Error("Root element #root not found");

    createRoot(el).render(
        <StrictMode>
            <App />
        </StrictMode>,
    );
}

bootstrap();
