"use client";

import { useState } from "react";
import { Trash2, AlertTriangle } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import type { Guest } from "@/types";

interface DeleteGuestModalProps {
  guest: Guest | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (guestId: string) => Promise<void>;
}

export function DeleteGuestModal({
  guest,
  isOpen,
  onClose,
  onConfirm,
}: DeleteGuestModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!guest) return null;

  const handleDelete = async () => {
    setError(null);
    setLoading(true);
    try {
      await onConfirm(guest.id);
      onClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "No se pudo eliminar al invitado",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Eliminar Invitado">
      <div className="flex flex-col gap-4 mt-2">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300">
          <AlertTriangle size={24} className="shrink-0 text-rose-400" />
          <p className="text-xs">
            ¿Estás seguro de que deseas eliminar a{" "}
            <strong className="text-white font-semibold">{guest.name}</strong>{" "}
            de la lista? Esta acción no se puede deshacer.
          </p>
        </div>

        {error && (
          <p className="text-xs text-rose-400 font-medium" role="alert">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-2 mt-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            disabled={loading}
            className="bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/30 flex items-center gap-1.5"
          >
            <Trash2 size={14} />
            {loading ? "Eliminando..." : "Eliminar Invitado"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
