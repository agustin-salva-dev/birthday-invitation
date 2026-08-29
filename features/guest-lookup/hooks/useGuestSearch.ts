// useGuestSearch — instant client-side guest search hook. (SRP)
"use client";

import { useState, useMemo } from "react";
import type { Guest } from "@/types";

interface UseGuestSearchReturn {
  query: string;
  setQuery: (q: string) => void;
  results: Guest[];
  isSearching: boolean;
}

export function useGuestSearch(guests: Guest[]): UseGuestSearchReturn {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const lower = query.toLowerCase().trim();
    return guests.filter((g) => g.name.toLowerCase().includes(lower)).slice(0, 8);
  }, [query, guests]);

  return { query, setQuery, results, isSearching: false };
}
