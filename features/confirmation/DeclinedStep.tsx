"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Guest } from "@/types";

interface DeclinedStepProps {
  guest: Guest;
}

export function DeclinedStep({ guest }: DeclinedStepProps) {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src="/dragons/lightfury-lying.webp"
          alt="Furia Luminosa triste"
          width={240}
          height={140}
          sizes="240px"
          priority
          loading="eager"
          className="drop-shadow-[0_0_20px_rgba(180,180,255,0.5)] opacity-80"
          style={{
            width: "auto",
            height: "auto",
            animation: "floatSlow 5s ease-in-out infinite",
          }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="flex flex-col items-center gap-3"
      >
        <h2 className="text-3xl sm:text-4xl font-black text-white">
          No pasa nada,{" "}
          <span className="bg-linear-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
            {guest.name.split(" ")[0]}
          </span>{" "}
          💜
        </h2>
        <p className="text-white/60 text-base max-w-xs">
          ¡Gracias por avisar! Te vamos a extrañar en el festejo 🐉
        </p>

        <div className="mt-2 rounded-2xl border border-purple-500/20 bg-purple-500/10 px-5 py-3">
          <p className="text-purple-300 text-sm font-medium">
            Tu respuesta fue registrada ✓
          </p>
        </div>
      </motion.div>
    </div>
  );
}
