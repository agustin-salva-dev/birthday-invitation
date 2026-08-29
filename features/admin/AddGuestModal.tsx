// Modal to add a new guest. (SRP)
"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { updateGuestSchema } from "@/lib/validations";

interface AddGuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string) => Promise<void>;
}

export function AddGuestModal({ isOpen, onClose, onAdd }: AddGuestModalProps) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validation = updateGuestSchema.safeParse({ name });
    if (!validation.success) {
      setError(validation.error.issues[0]?.message || "Nombre inválido");
      return;
    }

    setLoading(true);
    try {
      await onAdd(name.trim());
      setName("");
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo agregar al invitado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Agregar Nuevo Invitado">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
        <Input
          id="add-guest-name"
          label="Nombre del invitado"
          placeholder="Ej: Juan Pérez"
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
            <UserPlus size={14} />
            {loading ? "Guardando..." : "Agregar Invitado"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
