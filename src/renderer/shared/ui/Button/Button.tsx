import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

export type ButtonProps = PropsWithChildren<
    ButtonHTMLAttributes<HTMLButtonElement> & {
        /** Вариант кнопки для минимальной стилизации без UI библиотеки. */
        variant?: "primary" | "secondary";
    }
>;

/**
 * Примитив UI. Не содержит бизнес-логики.
 */
export function Button({ variant = "primary", style, ...props }: ButtonProps) {
    const base: React.CSSProperties = {
        borderRadius: 10,
        padding: "10px 12px",
        border: "1px solid rgba(255,255,255,0.12)",
        cursor: props.disabled ? "not-allowed" : "pointer",
        fontWeight: 600,
    };

    const variants: Record<NonNullable<ButtonProps["variant"]>, React.CSSProperties> = {
        primary: { background: "#3b82f6", color: "#0b1220", borderColor: "transparent" },
        secondary: { background: "rgba(255,255,255,0.06)", color: "#e5e7eb" },
    };

    return <button {...props} style={{ ...base, ...variants[variant], ...style }} />;
}
