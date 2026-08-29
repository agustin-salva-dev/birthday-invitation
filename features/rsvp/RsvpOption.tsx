"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ReactNode } from "react";

interface RsvpOptionProps {
  id: string;
  label: string;
  imageSrc?: string;
  emoji?: ReactNode;
  selected: boolean;
  onSelect: () => void;
}

export function RsvpOption({
  id,
  label,
  imageSrc,
  emoji,
  selected,
  onSelect,
}: RsvpOptionProps) {
  return (
    <motion.button
      id={id}
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={[
        "relative flex flex-col items-center gap-3 w-full rounded-2xl border p-5 text-center transition-all duration-200 cursor-pointer overflow-hidden backdrop-blur-sm",
        selected
          ? "border-cyan-400 bg-cyan-500/15 shadow-xl shadow-cyan-500/25"
          : "border-white/15 bg-white/5 hover:border-white/30 hover:bg-white/10",
      ].join(" ")}
    >
      {selected && (
        <motion.div
          layoutId="rsvp-selection"
          className="absolute inset-0 rounded-2xl border-2 border-cyan-400"
          style={{ zIndex: 0 }}
        />
      )}

      {imageSrc ? (
        <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
          <Image
            src={imageSrc}
            alt={label}
            width={100}
            height={100}
            className="drop-shadow-[0_0_15px_rgba(0,242,254,0.4)] mask-[radial-gradient(circle_at_center,black_50%,transparent_75%)]"
          />
        </div>
      ) : (
        <span className="relative z-10 text-4xl">{emoji}</span>
      )}

      <span
        className={`relative z-10 text-lg font-bold ${
          selected ? "text-cyan-300" : "text-white/80"
        }`}
      >
        {label}
      </span>
    </motion.button>
  );
}
