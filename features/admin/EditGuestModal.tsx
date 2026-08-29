// Modal to edit guest's name. (SRP)
"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { updateGuestSchema } from "@/lib/validations";
import type { Guest } from "@/types";

interface EditGuestModalProps {
  guest: Guest | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (guestId: string, name: string) => Promise<void>;
}

export function EditGuestModal({
  guest,
  isOpen,
  onClose,
  onSave,
}: EditGuestModalProps) {
  const [prevGuest, setPrevGuest] = useState(guest);
  const [name, setName] = useState(guest?.name ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (guest !== prevGuest) {
    setPrevGuest(guest);
    setName(guest?.name ?? "");
    setError(null);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guest) return;

    setError(null);
    const validation = updateGuestSchema.safeParse({ name });
    if (!validation.success) {
      setError(validation.error.issues[0]?.message || "Nombre inválido");
      return;
    }

    setLoading(true);
    try {
      await onSave(guest.id, name.trim());
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo actualizar el nombre");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editar Nombre de Invitado">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
        <Input
          id="edit-guest-name"
          label="Nombre del invitado"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
          autoFocus
        />

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
            type="submit"
            variant="primary"
            size="sm"
            disabled={loading}
            className="flex items-center gap-1.5"
          >
            <Save size={14} />
            {loading ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
