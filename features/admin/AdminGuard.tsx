// AdminGuard — handles PIN login flow and session restoration, renders children when authenticated. (SRP)
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

interface AdminGuardProps {
  isAuthenticated: boolean;
  onAuthenticated: () => void;
  children: React.ReactNode;
}

export function AdminGuard({
  isAuthenticated,
  onAuthenticated,
  children,
}: AdminGuardProps) {
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if session cookie is already active on mount
  useEffect(() => {
    fetch("/api/admin/auth")
      .then((res) => {
        if (res.ok) {
          onAuthenticated();
        }
      })
      .catch(() => {})
      .finally(() => {
        setCheckingSession(false);
      });
  }, [onAuthenticated]);

  if (isAuthenticated) return <>{children}</>;

  if (checkingSession) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length !== 4) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || "PIN incorrecto");
      }

      onAuthenticated();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
      setPin("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm rounded-2xl border border-white/15 bg-white/5 p-8 backdrop-blur-xl shadow-2xl shadow-cyan-500/5"
      >
        <div className="flex flex-col items-center gap-5 text-center">
          <div className="rounded-full bg-cyan-500/10 p-4 border border-cyan-500/20">
            <Lock size={28} className="text-cyan-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Panel Admin</h1>
            <p className="text-white/40 text-sm mt-1">
              Ingresá el PIN de acceso
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <Input
              id="admin-pin-input"
              type="password"
              inputMode="numeric"
              maxLength={4}
              placeholder="• • • •"
              value={pin}
              onChange={(e) =>
                setPin(e.target.value.replace(/\D/g, "").slice(0, 4))
              }
              className="text-center text-2xl tracking-[0.5em]"
              autoFocus
            />
            {error && <ErrorMessage message={error} />}
            <Button
              id="admin-pin-submit"
              type="submit"
              variant="primary"
              loading={loading}
              disabled={pin.length !== 4}
              className="w-full"
            >
              Ingresar
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
