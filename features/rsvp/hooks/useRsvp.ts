// useRsvp — handles RSVP submission to API. (SRP)
"use client";

import { useState } from "react";
import type { Guest } from "@/types";

interface UseRsvpReturn {
  selectedOption: "CONFIRMED" | "DECLINED" | null;
  setSelectedOption: (opt: "CONFIRMED" | "DECLINED") => void;
  submit: (guestId: string, companions?: number) => Promise<Guest | null>;
  loading: boolean;
  error: string | null;
}

export function useRsvp(): UseRsvpReturn {
  const [selectedOption, setSelectedOption] = useState<"CONFIRMED" | "DECLINED" | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (guestId: string, companions: number = 0): Promise<Guest | null> => {
    if (!selectedOption) return null;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/rsvp", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guestId, status: selectedOption, companions }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || "No se pudo registrar tu respuesta");
      }

      const json = await res.json();
      return json.data;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error inesperado. Intentá de nuevo.";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { selectedOption, setSelectedOption, submit, loading, error };
}

