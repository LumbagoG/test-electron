import { useSystemPing } from "../model/useSystemPing";
import { SystemPingPanel } from "./SystemPingPanel";

/**
 * Контейнер фичи: связывает model и UI.
 * Здесь допустим вызов хука и проброс props; логика остаётся в model.
 */
export function SystemPing() {
    const { state, runPing } = useSystemPing();
    return <SystemPingPanel state={state} onPing={runPing} />;
}
