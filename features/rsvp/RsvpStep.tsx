"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Users } from "lucide-react";
import { RsvpOption } from "./RsvpOption";
import { useRsvp } from "./hooks/useRsvp";
import { Button } from "@/components/ui/Button";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import type { Guest, InvitationStep } from "@/types";

interface RsvpStepProps {
  guest: Guest;
  onComplete: (outcome: InvitationStep, updatedGuest?: Guest) => void;
}

export function RsvpStep({ guest, onComplete }: RsvpStepProps) {
  const { selectedOption, setSelectedOption, submit, loading, error } =
    useRsvp();
  const [companions, setCompanions] = useState(guest.companions || 0);

  const handleSubmit = async () => {
    const finalCompanions = selectedOption === "CONFIRMED" ? companions : 0;
    const updated = await submit(guest.id, finalCompanions);
    if (updated) {
      const outcome = updated.status === "CONFIRMED" ? "confirmed" : "declined";
      onComplete(outcome, { ...guest, ...updated });
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full text-center">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-4xl sm:text-5xl font-black text-white mb-2">
          ¿Venís?
        </h2>
        <p className="text-white/40 text-sm">
          Seleccioná tu respuesta y confirmala
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 gap-4 w-full"
        role="radiogroup"
        aria-label="Seleccioná tu asistencia"
      >
        <RsvpOption
          id="rsvp-yes"
          label="Sí, voy"
          imageSrc="/dragons/chimuelofeliz.webp"
          selected={selectedOption === "CONFIRMED"}
          onSelect={() => setSelectedOption("CONFIRMED")}
        />
        <RsvpOption
          id="rsvp-no"
          label="No puedo"
          imageSrc="/dragons/chimuelotriste.webp"
          selected={selectedOption === "DECLINED"}
          onSelect={() => setSelectedOption("DECLINED")}
        />
      </motion.div>

      <AnimatePresence>
        {selectedOption === "CONFIRMED" && (
          <motion.div
            key="companion-selector"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="w-full overflow-hidden"
          >
            <div className="flex flex-col items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                <Users size={18} />
                <span>¿Vas a llevar acompañantes?</span>
              </div>
              <p className="text-white/50 text-xs">
                Seleccioná la cantidad de personas que irán con vos (máx. 4)
              </p>

              <div className="grid grid-cols-5 gap-2 w-full mt-1">
                {[0, 1, 2, 3, 4].map((num) => {
                  const isSelected = companions === num;
                  return (
                    <button
                      key={num}
                      type="button"
                      id={`companion-option-${num}`}
                      onClick={() => setCompanions(num)}
                      className={[
                        "flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all duration-200",
                        isSelected
                          ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)] scale-105"
                          : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white",
                      ].join(" ")}
                    >
                      <span className="text-base font-bold">{num}</span>
                      <span className="text-[10px] opacity-70">
                        {num === 0
                          ? "Solo yo"
                          : num === 1
                            ? "1 acomp."
                            : `${num} acomp.`}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="text-xs text-cyan-300/80 bg-cyan-950/40 border border-cyan-500/20 rounded-lg px-3 py-1.5 w-full text-center">
                {companions === 0
                  ? "Irías solo/a al evento."
                  : companions === 1
                    ? "Irías vos + 1 acompañante (2 personas en total)."
                    : `Irías vos + ${companions} acompañantes (${companions + 1} personas en total).`}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && <ErrorMessage message={error} />}

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="w-full"
      >
        <Button
          id="rsvp-submit-btn"
          variant={
            selectedOption === "CONFIRMED"
              ? "primary"
              : selectedOption === "DECLINED"
                ? "ghost"
                : "primary"
          }
          size="lg"
          disabled={!selectedOption}
          loading={loading}
          onClick={handleSubmit}
          className="w-full"
        >
          <Send size={16} />
          Enviar respuesta
        </Button>
      </motion.div>
    </div>
  );
}
