"use client";

import { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  CheckCircle2,
  Users,
  FileSpreadsheet,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { generateGuestsExcel } from "@/lib/excel";
import type { Guest } from "@/types";

interface ExportExcelButtonProps {
  guests: Guest[];
}

export function ExportExcelButton({ guests }: ExportExcelButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const confirmedGuests = guests.filter((g) => g.status === "CONFIRMED");

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getFormattedDate = () => {
    return new Date().toLocaleDateString("es-AR").replace(/\//g, "-");
  };

  const handleExportConfirmed = () => {
    if (confirmedGuests.length === 0) return;
    const date = getFormattedDate();
    generateGuestsExcel(confirmedGuests, `confirmados-cumple25-${date}.xlsx`);
    setIsOpen(false);
  };

  const handleExportAll = () => {
    if (guests.length === 0) return;
    const date = getFormattedDate();
    generateGuestsExcel(guests, `invitados-completos-cumple25-${date}.xlsx`);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <Button
        id="export-excel-dropdown-btn"
        variant="success"
        size="sm"
        onClick={() => setIsOpen((prev) => !prev)}
        disabled={guests.length === 0}
        className="flex items-center gap-2 font-medium"
      >
        <FileSpreadsheet size={15} />
        <span>Descargar Lista</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-64 z-50 rounded-xl bg-slate-900/95 backdrop-blur-md border border-slate-700/60 shadow-2xl shadow-emerald-950/40 overflow-hidden p-1.5"
          >
            <div className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase px-3 py-1.5 border-b border-slate-800 mb-1">
              Opciones de descarga (Excel)
            </div>

            <button
              id="export-confirmed-opt"
              onClick={handleExportConfirmed}
              disabled={confirmedGuests.length === 0}
              className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-emerald-300 hover:bg-emerald-500/15 hover:text-emerald-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed group"
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle2
                  size={16}
                  className="text-emerald-400 group-hover:scale-110 transition-transform"
                />
                <span>Confirmados</span>
              </div>
              <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                {confirmedGuests.length}
              </span>
            </button>

            <button
              id="export-all-opt"
              onClick={handleExportAll}
              disabled={guests.length === 0}
              className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-cyan-500/15 hover:text-cyan-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed group"
            >
              <div className="flex items-center gap-2.5">
                <Users
                  size={16}
                  className="text-cyan-400 group-hover:scale-110 transition-transform"
                />
                <span>Lista completa</span>
              </div>
              <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700">
                {guests.length}
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
