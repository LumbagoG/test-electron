import type { PropsWithChildren } from "react";

export type CardProps = PropsWithChildren<{
    /** Заголовок карточки. */
    title?: string;
}>;

/**
 * Примитив UI: контейнер с фоном/границей.
 */
export function Card({ title, children }: CardProps) {
    return (
        <section
            style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 14,
                padding: 16,
            }}
        >
            {title ? <h2 style={{ margin: 0, marginBottom: 12, fontSize: 16 }}>{title}</h2> : null}
            {children}
        </section>
    );
}
