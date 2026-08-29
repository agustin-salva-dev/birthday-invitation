"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PageWrapper } from "@/components/layout/PageWrapper";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("[Error Boundary]:", error);
  }, [error]);

  return (
    <PageWrapper>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-6 text-center max-w-sm"
      >
        <div className="rounded-full bg-red-500/10 p-5 border border-red-500/20">
          <AlertTriangle size={36} className="text-red-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Algo salió mal 🐉
          </h2>
          <p className="text-white/50 text-sm">
            Ocurrió un error inesperado. No te preocupes, podés intentar de
            nuevo.
          </p>
        </div>
        <Button id="error-retry-btn" variant="primary" onClick={reset}>
          <RefreshCw size={16} />
          Intentar de nuevo
        </Button>
      </motion.div>
    </PageWrapper>
  );
}
