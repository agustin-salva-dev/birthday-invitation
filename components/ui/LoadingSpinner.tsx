// LoadingSpinner — bioluminous animated spinner. (SRP)

type SpinnerSize = "sm" | "md" | "lg";

const sizeClasses: Record<SpinnerSize, string> = {
  sm: "w-4 h-4 border-2",
  md: "w-8 h-8 border-2",
  lg: "w-12 h-12 border-[3px]",
};

interface LoadingSpinnerProps {
  size?: SpinnerSize;
  className?: string;
}

export function LoadingSpinner({
  size = "md",
  className = "",
}: LoadingSpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Cargando..."
      className={[
        "rounded-full border-cyan-400/30 border-t-cyan-400 animate-spin",
        sizeClasses[size],
        className,
      ].join(" ")}
    />
  );
}
