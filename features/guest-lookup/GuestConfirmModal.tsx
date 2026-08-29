// GuestConfirmModal — "Soy yo / No soy este" confirmation dialog with companion selector. (SRP)
"use client";

import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { UserCheck, UserX } from "lucide-react";
import type { Guest } from "@/types";

interface GuestConfirmModalProps {
  guest: Guest | null;
  onConfirm: (guest: Guest) => void;
  onDeny: () => void;
}

export function GuestConfirmModal({
  guest,
  onConfirm,
  onDeny,
}: GuestConfirmModalProps) {
  if (!guest) return null;

  return (
    <Modal isOpen={!!guest} onClose={onDeny} title="¿Sos vos?">
      <div className="flex flex-col items-center gap-6 py-2 text-center">
        <div className="rounded-full bg-cyan-500/10 p-4 border border-cyan-500/20">
          <UserCheck size={40} className="text-cyan-400" />
        </div>
        <div>
          <p className="text-white/60 text-sm mb-1">Encontramos este nombre:</p>
          <p className="text-2xl font-bold text-white">{guest.name}</p>
        </div>
        <p className="text-white/50 text-sm">
          ¿Confirmás que esta persona sos vos?
        </p>
        <div className="flex gap-3 w-full">
          <Button
            id="confirm-identity-yes"
            variant="primary"
            className="flex-1"
            onClick={() => onConfirm(guest)}
          >
            <UserCheck size={16} />
            Sí, soy yo
          </Button>
          <Button
            id="confirm-identity-no"
            variant="ghost"
            className="flex-1"
            onClick={onDeny}
          >
            <UserX size={16} />
            No soy este
          </Button>
        </div>
      </div>
    </Modal>
  );
}
