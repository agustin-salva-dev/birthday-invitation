// GuestsTable — searchable, filterable table of all guests. (SRP)
"use client";

import { useState, useMemo } from "react";
import { Search, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { EditGuestModal } from "@/features/admin/EditGuestModal";
import { DeleteGuestModal } from "@/features/admin/DeleteGuestModal";
import type { Guest, GuestStatus } from "@/types";

interface GuestsTableProps {
  guests: Guest[];
  onSaveName: (guestId: string, name: string) => Promise<void>;
  onDeleteGuest: (guestId: string) => Promise<void>;
}

const STATUS_FILTERS: { label: string; value: GuestStatus | "ALL" }[] = [
  { label: "Todos", value: "ALL" },
  { label: "Confirmados", value: "CONFIRMED" },
  { label: "No pueden", value: "DECLINED" },
  { label: "Pendientes", value: "PENDING" },
];

export function GuestsTable({
  guests,
  onSaveName,
  onDeleteGuest,
}: GuestsTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<GuestStatus | "ALL">("ALL");

  // Selection states for modales
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null);
  const [deletingGuest, setDeletingGuest] = useState<Guest | null>(null);

  const filtered = useMemo(() => {
    return guests.filter((g) => {
      const matchesSearch = g.name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "ALL" || g.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [guests, search, statusFilter]);

  return (
    <div className="flex flex-col gap-4">
      {/* Filters row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          id="admin-guest-search"
          placeholder="Buscar invitado..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<Search size={14} />}
          className="sm:max-w-xs"
        />
        <div className="flex gap-2 flex-wrap">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              id={`filter-${f.value.toLowerCase()}`}
              onClick={() => setStatusFilter(f.value)}
              className={[
                "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                statusFilter === f.value
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                  : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 hover:text-white/80",
              ].join(" ")}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-white/40 text-left">
              <th className="px-4 py-3 font-medium">Nombre</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3 font-medium">Acompañantes</th>
              <th className="px-4 py-3 font-medium hidden sm:table-cell">
                Actualizado
              </th>
              <th className="px-4 py-3 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-white/30">
                  No hay invitados que coincidan
                </td>
              </tr>
            ) : (
              filtered.map((guest, i) => (
                <tr
                  key={guest.id}
                  className={`border-b border-white/5 transition-colors hover:bg-white/5 ${
                    i % 2 === 0 ? "bg-white/[0.02]" : ""
                  }`}
                >
                  <td className="px-4 py-3 text-white font-medium">{guest.name}</td>
                  <td className="px-4 py-3">
                    <Badge status={guest.status} />
                  </td>
                  <td className="px-4 py-3 text-white/70 font-semibold">
                    {guest.status === "CONFIRMED" ? (
                      <span className="inline-flex items-center gap-1 rounded-md bg-cyan-500/10 px-2 py-0.5 text-xs text-cyan-300 border border-cyan-500/20">
                        {guest.companions}{" "}
                        <span className="text-[10px] opacity-70">
                          {guest.companions === 1 ? "persona extra" : "extra"}
                        </span>
                      </span>
                    ) : (
                      <span className="text-white/30 text-xs">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-white/30 text-xs hidden sm:table-cell">
                    {new Date(guest.updatedAt).toLocaleDateString("es-AR")}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setEditingGuest(guest)}
                        title="Editar nombre"
                        aria-label={`Editar ${guest.name}`}
                        className="rounded-lg p-1.5 text-white/40 hover:text-cyan-300 hover:bg-cyan-500/10 transition-colors"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => setDeletingGuest(guest)}
                        title="Eliminar invitado"
                        aria-label={`Eliminar ${guest.name}`}
                        className="rounded-lg p-1.5 text-white/40 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="px-4 py-2 text-xs text-white/30 border-t border-white/5">
          Mostrando {filtered.length} de {guests.length} invitados
        </div>
      </div>

      {/* Modales */}
      <EditGuestModal
        guest={editingGuest}
        isOpen={Boolean(editingGuest)}
        onClose={() => setEditingGuest(null)}
        onSave={onSaveName}
      />

      <DeleteGuestModal
        guest={deletingGuest}
        isOpen={Boolean(deletingGuest)}
        onClose={() => setDeletingGuest(null)}
        onConfirm={onDeleteGuest}
      />
    </div>
  );
}

