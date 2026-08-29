import * as XLSX from "xlsx";
import type { Guest } from "@/types";

const statusLabels: Record<Guest["status"], string> = {
  CONFIRMED: "Confirmado",
  DECLINED: "Rechazó",
  PENDING: "Pendiente",
};

export function generateGuestsExcel(guests: Guest[], filename: string): void {
  const rows = guests.map((g) => {
    const companions = g.companions || 0;
    const totalPeople = g.status === "DECLINED" ? 0 : companions + 1;

    return {
      Nombre: g.name,
      Estado: statusLabels[g.status] || g.status,
      Acompañantes: companions,
      "Total Personas": totalPeople,
      "Fecha de respuesta": g.updatedAt
        ? new Date(g.updatedAt).toLocaleDateString("es-AR")
        : "-",
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(rows);

  worksheet["!cols"] = [
    { wch: 28 },
    { wch: 15 },
    { wch: 15 },
    { wch: 16 },
    { wch: 22 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Invitados");

  XLSX.writeFile(workbook, filename);
}
