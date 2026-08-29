"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { generateGuestsCsv, downloadCsv } from "@/lib/csv";
import type { Guest } from "@/types";

interface ExportCsvButtonProps {
  guests: Guest[];
}

export function ExportCsvButton({ guests }: ExportCsvButtonProps) {
  const confirmedGuests = guests.filter((g) => g.status === "CONFIRMED");

  const handleExport = () => {
    if (confirmedGuests.length === 0) return;
    const csv = generateGuestsCsv(confirmedGuests);
    const date = new Date().toLocaleDateString("es-AR").replace(/\//g, "-");
    downloadCsv(csv, `confirmados-cumple25-${date}.csv`);
  };

  return (
    <Button
      id="export-csv-btn"
      variant="success"
      size="sm"
      onClick={handleExport}
      disabled={confirmedGuests.length === 0}
    >
      <Download size={14} />
      Descargar confirmados ({confirmedGuests.length})
    </Button>
  );
}
