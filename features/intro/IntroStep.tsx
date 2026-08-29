// IntroStep — animated intro screen with Toothless & Light Fury together image.
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

interface IntroStepProps {
  onComplete: () => void;
}

export function IntroStep({ onComplete }: IntroStepProps) {
  const [phase, setPhase] = useState<"dragons" | "text" | "cta">("dragons");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("text"), 1000);
    const t2 = setTimeout(() => setPhase("cta"), 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 text-center">
      {/* Both dragons together image */}
      <div className="relative flex items-center justify-center h-64 sm:h-72">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <Image
            src="/dragons/FuriaLuminosa7.webp"
            alt="Chimuelo y Furia Luminosa juntos"
            width={240}
            height={240}
            className="object-contain drop-shadow-[0_0_30px_rgba(0,242,254,0.5)]"
            style={{ animation: "floatSlow 4s ease-in-out infinite" }}
            priority
          />
        </motion.div>
      </div>

      {/* Title text */}
      {(phase === "text" || phase === "cta") && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center gap-3"
        >
          <p className="text-lg text-cyan-300/80 font-light tracking-widest uppercase">
            🐉 Fuiste invitado a
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            <span className="bg-linear-to-r from-cyan-300 via-white to-purple-300 bg-clip-text text-transparent">
              Mi Cumpleaños
            </span>
          </h1>
          <div className="mt-2 h-px w-32 bg-linear-to-r from-transparent via-cyan-400 to-transparent" />
          <p className="text-white/60 text-base mt-1">
            ¡Gracias por estar acá! 🎉
          </p>
        </motion.div>
      )}

      {/* CTA */}
      {phase === "cta" && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Button
            id="intro-start-btn"
            variant="primary"
            size="lg"
            onClick={onComplete}
          >
            ¡Empecemos! 🐲
          </Button>
        </motion.div>
      )}
    </div>
  );
}
