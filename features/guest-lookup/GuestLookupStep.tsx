"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { GuestSearchInput } from "./GuestSearchInput";
import { GuestList } from "./GuestList";
import { GuestConfirmModal } from "./GuestConfirmModal";
import { useGuestSearch } from "./hooks/useGuestSearch";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import type { Guest } from "@/types";

interface GuestLookupStepProps {
  guests: Guest[];
  onGuestConfirmed: (guest: Guest) => void;
}

export function GuestLookupStep({
  guests,
  onGuestConfirmed,
}: GuestLookupStepProps) {
  const { query, setQuery, results, isSearching } = useGuestSearch(guests);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);

  const handleSelectGuest = (guest: Guest) => {
    setSelectedGuest(guest);
  };

  const handleDenyIdentity = () => {
    setSelectedGuest(null);
    setQuery("");
  };

  const handleConfirmIdentity = (guest: Guest) => {
    setSelectedGuest(null);
    onGuestConfirmed(guest);
  };

  const showNotFound =
    query.trim().length > 2 && results.length === 0 && !isSearching;

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <Image
          src="/dragons/quiensos-dragon.webp"
          alt="Furia Luminosa"
          width={240}
          height={200}
          sizes="240px"
          priority
          className="drop-shadow-[0_0_15px_rgba(180,180,255,0.6)]"
          style={{ animation: "floatSlow 5s ease-in-out infinite" }}
        />
      </motion.div>

      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          ¿Quién sos?
        </h2>
        <p className="text-white/50 text-sm">
          Buscá tu nombre en la lista de invitados
        </p>
      </div>

      <div className="w-full">
        <GuestSearchInput
          value={query}
          onChange={setQuery}
          isSearching={isSearching}
        />

        {showNotFound && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3"
          >
            <ErrorMessage message="No encontramos tu nombre. Contactate con el organizador 🐉" />
          </motion.div>
        )}

        <GuestList
          guests={results}
          query={query}
          onSelect={handleSelectGuest}
        />
      </div>

      <GuestConfirmModal
        guest={selectedGuest}
        onConfirm={handleConfirmIdentity}
        onDeny={handleDenyIdentity}
      />
    </div>
  );
}
