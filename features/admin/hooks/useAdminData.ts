// useAdminData — fetches and aggregates guest data for the admin dashboard. (SRP)
"use client";

import { useState, useEffect, useCallback } from "react";
import type { Guest, AdminStats } from "@/types";

interface UseAdminDataReturn {
  guests: Guest[];
  stats: AdminStats;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  updateGuestStatus: (guestId: string, status: Guest["status"]) => void;
  addGuest: (name: string) => Promise<Guest>;
  updateGuestName: (guestId: string, name: string) => Promise<Guest>;
  deleteGuest: (guestId: string) => Promise<void>;
}

function computeStats(guests: Guest[]): AdminStats {
  const confirmedGuests = guests.filter((g) => g.status === "CONFIRMED");
  const confirmedCount = confirmedGuests.length;
  const companionsCount = confirmedGuests.reduce((acc, g) => acc + (g.companions || 0), 0);

  return {
    total: guests.length,
    confirmed: confirmedCount,
    declined: guests.filter((g) => g.status === "DECLINED").length,
    pending: guests.filter((g) => g.status === "PENDING").length,
    totalPeople: confirmedCount + companionsCount,
  };
}

export function useAdminData(): UseAdminDataReturn {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGuests = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/guests");
      if (!res.ok) throw new Error("No se pudo cargar la lista");
      const json = await res.json();
      setGuests(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    fetch("/api/guests")
      .then(async (res) => {
        if (!res.ok) throw new Error("No se pudo cargar la lista");
        const json = await res.json();
        if (!ignore) setGuests(json.data);
      })
      .catch((err) => {
        if (!ignore) setError(err instanceof Error ? err.message : "Error inesperado");
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  const updateGuestStatus = useCallback(
    (guestId: string, status: Guest["status"]) => {
      setGuests((prev) =>
        prev.map((g) =>
          g.id === guestId ? { ...g, status, updatedAt: new Date().toISOString() } : g
        )
      );
    },
    []
  );

  const addGuest = useCallback(async (name: string): Promise<Guest> => {
    const res = await fetch("/api/guests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.error || "Error al agregar el invitado");
    }
    const newGuest: Guest = json.data;
    setGuests((prev) => [...prev, newGuest].sort((a, b) => a.name.localeCompare(b.name)));
    return newGuest;
  }, []);

  const updateGuestName = useCallback(async (guestId: string, name: string): Promise<Guest> => {
    const res = await fetch(`/api/guests/${guestId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.error || "Error al actualizar el invitado");
    }
    const updatedGuest: Guest = json.data;
    setGuests((prev) =>
      prev
        .map((g) => (g.id === guestId ? updatedGuest : g))
        .sort((a, b) => a.name.localeCompare(b.name))
    );
    return updatedGuest;
  }, []);

  const deleteGuest = useCallback(async (guestId: string): Promise<void> => {
    const res = await fetch(`/api/guests/${guestId}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      const json = await res.json();
      throw new Error(json.error || "Error al eliminar el invitado");
    }
    setGuests((prev) => prev.filter((g) => g.id !== guestId));
  }, []);

  return {
    guests,
    stats: computeStats(guests),
    loading,
    error,
    refresh: fetchGuests,
    updateGuestStatus,
    addGuest,
    updateGuestName,
    deleteGuest,
  };
}

