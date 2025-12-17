import { SystemPing } from "@features/systemPing";
import { Card } from "@shared/ui";

/**
 * Виджет: композиция фичи в рамки страницы/экрана.
 * Виджеты агрегируют фичи/энтити, но не содержат бизнес-логики.
 */
export function SystemPingWidget() {
    return (
        <Card title="Проверка связи (IPC)">
            <SystemPing />
        </Card>
    );
}
