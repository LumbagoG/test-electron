import { getPlatformApi } from "@shared/api";
import { Card } from "@shared/ui";
import logoUrl from "@shared/ui/assets/Logo.svg";
import { SystemPingWidget } from "@widgets/systemPingWidget";

/**
 * Страница "Домой" — демо-экран приложения.
 * Здесь собираем виджеты (composition level).
 */
export function HomePage() {
    const { versions } = getPlatformApi();

    return (
        <main style={{ padding: 24, display: "grid", gap: 16, maxWidth: 980, margin: "0 auto" }}>
            <header style={{ display: "grid", gap: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <img src={logoUrl} alt="Windi" style={{ height: 28, width: "auto" }} />
                    <h1 style={{ margin: 0, fontSize: 24 }}>Windi</h1>
                </div>
                <div style={{ opacity: 0.75 }}>
                    Минимальное приложение на Electron + React (FSD в renderer) с режимом Web SPA
                </div>
            </header>

            <Card title="Версии окружения">
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap", opacity: 0.9 }}>
                    <span>
                        Electron: <b>{versions.electron}</b>
                    </span>
                    <span>
                        Node: <b>{versions.node}</b>
                    </span>
                    <span>
                        Chromium: <b>{versions.chrome}</b>
                    </span>
                </div>
            </Card>

            <SystemPingWidget />
        </main>
    );
}
