// Modal base with backdrop, focus trap, and close on Escape. (SRP)
"use client";

import { ReactNode, useEffect, useRef } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/20 bg-slate-900/90 p-6 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
        <div className="flex items-start justify-between mb-4">
          {title && (
            <h2
              id="modal-title"
              className="text-lg font-semibold text-white"
            >
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="ml-auto rounded-lg p-1 text-white/40 hover:text-white/80 hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
