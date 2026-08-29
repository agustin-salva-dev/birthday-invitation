// Inline error message component. (SRP)

import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
    >
      <AlertCircle size={16} className="shrink-0" />
      <span>{message}</span>
    </div>
  );
}
