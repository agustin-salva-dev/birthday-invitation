import type { Guest } from "@/types";

function escapeCsvField(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function generateGuestsCsv(guests: Guest[]): string {
  const headers = [
    "Nombre",
    "Estado",
    "Acompañantes",
    "Total Personas",
    "Fecha de respuesta",
  ];

  const statusLabels: Record<Guest["status"], string> = {
    CONFIRMED: "Confirmado",
    DECLINED: "Rechazó",
    PENDING: "Pendiente",
  };

  const rows = guests.map((g) => [
    escapeCsvField(g.name),
    escapeCsvField(statusLabels[g.status]),
    escapeCsvField(String(g.companions || 0)),
    escapeCsvField(String((g.companions || 0) + 1)),
    escapeCsvField(new Date(g.updatedAt).toLocaleDateString("es-AR")),
  ]);

  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
}

export function downloadCsv(content: string, filename: string): void {
  const blob = new Blob(["\uFEFF" + content], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
