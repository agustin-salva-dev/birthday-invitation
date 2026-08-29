"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, Clock, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Countdown } from "./Countdown";
import { GoogleMapEmbed } from "./GoogleMapEmbed";
import { GoogleCalendarButton } from "./GoogleCalendarButton";
import { EVENT } from "@/lib/constants";
import type { Guest } from "@/types";

interface EventInfoStepProps {
  guest: Guest;
  onConfirmAttendance: () => void;
}

export function EventInfoStep({
  guest,
  onConfirmAttendance,
}: EventInfoStepProps) {
  return (
    <div className="relative py-10 flex flex-col gap-5 w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 0.22, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative w-300 h-300"
        >
          <Image
            src="/dragons/toothless-bg.webp"
            alt="Chimuelo volando"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 300px"
            className="object-contain drop-shadow-[0_0_40px_rgba(0,242,254,0.8)]"
            style={{ animation: "floatSlow 6s ease-in-out infinite" }}
          />
        </motion.div>
      </div>

      <div className="relative z-10 flex flex-col gap-5 w-full">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center gap-0.5"
        >
          <div className="flex items-center gap-2">
            <PartyPopper size={24} className="text-cyan-400" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              ¡Hola,{" "}
              <span className="bg-linear-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                {guest.name.split(" ")[0]}
              </span>
              !
            </h2>
          </div>
          <p className="text-white/50 text-sm">Vanesa cumple</p>
          <div className="flex items-center gap-2">
            <span className="text-5xl font-black bg-linear-to-r from-cyan-300 via-white to-purple-300 bg-clip-text text-transparent leading-none">
              25
            </span>
            <span className="text-white/60 text-lg">años</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-white/10 bg-slate-900/5 p-2"
        >
          <Countdown />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-900/5 p-4"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-cyan-500/10 p-2 border border-cyan-500/20">
              <Calendar size={18} className="text-cyan-400" />
            </div>
            <div>
              <p className="text-white/40 text-xs uppercase tracking-wider">
                Cuándo
              </p>
              <p className="text-white font-semibold">{EVENT.dateLabel}</p>
            </div>
          </div>
          <div className="h-px bg-white/5" />
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-purple-500/10 p-2 border border-purple-500/20">
              <Clock size={18} className="text-purple-400" />
            </div>
            <div>
              <p className="text-white/40 text-xs uppercase tracking-wider">
                Horario
              </p>
              <p className="text-white font-semibold">
                {EVENT.startTimeLabel} – {EVENT.endTimeLabel}
              </p>
            </div>
          </div>
          <div className="h-px bg-white/5" />
          <GoogleMapEmbed />
          <div className="flex justify-center">
            <GoogleCalendarButton />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center"
        >
          <Button
            id="confirm-attendance-btn"
            variant="primary"
            size="md"
            onClick={onConfirmAttendance}
          >
            Confirmar asistencia 🐲
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
