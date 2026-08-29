// Button component with variants. Extensible via props, not modification. (OCP)

import { ButtonHTMLAttributes, ReactNode } from "react";
import { LoadingSpinner } from "./LoadingSpinner";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "success";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 active:scale-95",
  secondary:
    "bg-gradient-to-r from-purple-600 to-violet-700 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 active:scale-95",
  ghost:
    "bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:scale-105 active:scale-95 backdrop-blur-sm",
  danger:
    "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-105 active:scale-95",
  success:
    "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105 active:scale-95",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  children,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={[
        "relative inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(" ")}
      {...rest}
    >
      {loading && <LoadingSpinner size="sm" />}
      {children}
    </button>
  );
}
