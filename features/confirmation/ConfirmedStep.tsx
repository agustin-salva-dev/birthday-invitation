// ConfirmedStep — "¡Nos vemos ahí!" celebration screen with baby dragons image.
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, ExternalLink, MessageCircle } from "lucide-react";
import type { Guest } from "@/types";
import { EVENT } from "@/lib/constants";

const CONFETTI_PARTICLES = Array.from({ length: 20 }).map((_, i) => ({
  id: i,
  color: ["#00F2FE", "#7928CA", "#10B981", "#F59E0B", "#EC4899"][i % 5],
  left: `${(i * 37 + 12) % 100}%`,
  duration: 2 + ((i * 7) % 20) / 10,
  delay: ((i * 13) % 15) / 10,
}));

interface ConfirmedStepProps {
  guest: Guest;
}

export function ConfirmedStep({ guest }: ConfirmedStepProps) {
  const companionsText =
    guest.companions === 0
      ? "sin acompañantes"
      : `con ${guest.companions} ${guest.companions === 1 ? "acompañante" : "acompañantes"}`;

  const messageText = `Hola ${EVENT.hostName}, soy ${guest.name} y te confirmo mi asistencia a tu cumpleaños, voy ${companionsText}. Nos vemos ahí!`;
  const whatsappUrl = `https://api.whatsapp.com/send?phone=5491164486950&text=${encodeURIComponent(messageText)}`;

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      {/* Baby dragons playing */}
      <motion.div
        initial={{ y: 30, opacity: 0, scale: 0.85 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex items-center justify-center h-48 sm:h-56"
      >
        <Image
          src="/dragons/baby-dragons.webp"
          alt="Dragones bebés jugando"
          width={280}
          height={200}
          sizes="280px"
          priority
          className="object-contain drop-shadow-[0_0_30px_rgba(0,242,254,0.6)]"
          style={{ animation: "floatSlow 4s ease-in-out infinite" }}
        />
      </motion.div>

      {/* Confetti particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {CONFETTI_PARTICLES.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: particle.color,
              left: particle.left,
              top: "-10px",
            }}
            animate={{
              y: ["0vh", "110vh"],
              rotate: [0, 360],
              opacity: [1, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              ease: "easeIn",
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex flex-col items-center gap-3 w-full max-w-sm"
      >
        <h2 className="text-3xl sm:text-4xl font-black text-white">
          ¡Nos vemos ahí,{" "}
          <span className="bg-linear-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
            {guest.name.split(" ")[0]}
          </span>
          ! 🎉
        </h2>
        <p className="text-white/60 text-base">
          ¡Ya estamos contando los días! 🐉✨
        </p>

        {/* Clickable Event Location Box */}
        <a
          href={EVENT.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Ver en Google Maps"
          className="group w-full mt-2 flex items-center justify-between gap-3 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-4 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all cursor-pointer text-left"
        >
          <div className="flex flex-col gap-1">
            <p className="text-cyan-300 font-semibold text-sm flex items-center gap-1.5">
              <MapPin size={16} className="text-cyan-400 shrink-0" />
              <span>
                📅 {EVENT.dateLabel} · {EVENT.startTimeLabel}
              </span>
            </p>
            <p className="text-white/70 text-xs pl-5 group-hover:text-white transition-colors">
              {EVENT.fullAddress}
            </p>
          </div>
          <ExternalLink
            size={16}
            className="text-cyan-400 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity"
          />
        </a>

        {/* WhatsApp Button */}
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-2 flex items-center justify-center gap-2 w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-5 shadow-lg shadow-emerald-600/30 transition-all text-sm"
        >
          <MessageCircle size={18} />
          <span>Confirmar por WhatsApp</span>
        </motion.a>
      </motion.div>
    </div>
  );
}
