// Input base component — accessible, styled, consistent. (SRP)

import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = "", id, ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-white/80"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
              {icon}
            </span>
          )}
          <input
            id={id}
            ref={ref}
            className={[
              "w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/40 backdrop-blur-sm transition-all duration-200",
              "focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              icon ? "pl-10" : "",
              error ? "border-red-400 focus:border-red-400 focus:ring-red-400/30" : "",
              className,
            ].join(" ")}
            {...rest}
          />
        </div>
        {error && (
          <p className="text-sm text-red-400" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
