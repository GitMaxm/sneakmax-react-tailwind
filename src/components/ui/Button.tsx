import React from "react";

type ButtonProps = {
    children: React.ReactNode;
    ariaLabel?: string;
    as?: "button" | "a";
    href?: string;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
};

const Button = ({
    children,
    ariaLabel,
    as = "button",
    href,
    className,
    onClick,
    disabled = false
}: ButtonProps) => {
    const baseClasses = "button button--accent text-white cursor-pointer hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed";

    if (as === "a") {
        return (
            <a
                href={href}
                className={`${baseClasses} inline-block ${className}`}
                aria-label={ariaLabel}
            >
                {children}
            </a>
        );
    }

    return (
        <button
            className={`${baseClasses} ${className}`}
            aria-label={ariaLabel}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;