// Badge component for guest status display. (SRP)

import type { GuestStatus } from "@/types";

interface BadgeProps {
  status: GuestStatus;
}

const badgeConfig: Record<GuestStatus, { label: string; className: string }> = {
  CONFIRMED: {
    label: "Confirmado",
    className: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  },
  DECLINED: {
    label: "No puede",
    className: "bg-red-500/20 text-red-300 border-red-500/30",
  },
  PENDING: {
    label: "Pendiente",
    className: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  },
};

export function Badge({ status }: BadgeProps) {
  const { label, className } = badgeConfig[status];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${className}`}
    >
      {label}
    </span>
  );
}
