// GuestList — renders the search results with highlight. (SRP)
"use client";

import { motion } from "framer-motion";
import type { Guest } from "@/types";

interface GuestListProps {
  guests: Guest[];
  query: string;
  onSelect: (guest: Guest) => void;
}

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-cyan-400/30 text-cyan-200 rounded px-0.5">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export function GuestList({ guests, query, onSelect }: GuestListProps) {
  if (guests.length === 0) return null;

  return (
    <motion.ul
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-2 flex flex-col gap-1 max-h-64 overflow-y-auto rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
      role="listbox"
      aria-label="Resultados de búsqueda"
    >
      {guests.map((guest, i) => (
        <motion.li
          key={guest.id}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.04 }}
        >
          <button
            id={`guest-result-${guest.id}`}
            role="option"
            aria-selected={false}
            onClick={() => onSelect(guest)}
            className="w-full text-left px-4 py-3 text-white/90 hover:bg-white/10 hover:text-white transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl"
          >
            {highlightMatch(guest.name, query)}
          </button>
        </motion.li>
      ))}
    </motion.ul>
  );
}
