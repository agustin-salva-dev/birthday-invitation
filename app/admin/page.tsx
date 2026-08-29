"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw, LogOut, Shield, UserPlus } from "lucide-react";
import { AdminGuard } from "@/features/admin/AdminGuard";
import { StatsCards } from "@/features/admin/StatsCards";
import { GuestsTable } from "@/features/admin/GuestsTable";
import { ExportExcelButton } from "@/features/admin/ExportExcelButton";
import { AddGuestModal } from "@/features/admin/AddGuestModal";
import { useAdminData } from "@/features/admin/hooks/useAdminData";
import { Button } from "@/components/ui/Button";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { PageWrapper } from "@/components/layout/PageWrapper";

function AdminDashboard() {
  const {
    guests,
    stats,
    loading,
    error,
    refresh,
    addGuest,
    updateGuestName,
    deleteGuest,
  } = useAdminData();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    window.location.reload();
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-cyan-500/10 p-2 border border-cyan-500/20">
            <Shield size={20} className="text-cyan-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Panel Admin</h1>
            <p className="text-white/40 text-xs">Cumpleaños 25 · Vanesa</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            id="admin-refresh-btn"
            variant="ghost"
            size="sm"
            onClick={refresh}
            disabled={loading}
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </Button>
          <Button
            id="admin-logout-btn"
            variant="ghost"
            size="sm"
            onClick={handleLogout}
          >
            <LogOut size={14} />
          </Button>
        </div>
      </motion.div>

      <StatsCards stats={stats} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-8 flex flex-col gap-4"
      >
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h2 className="text-lg font-semibold text-white">
            Lista de Invitados
          </h2>
          <div className="flex items-center gap-2">
            <Button
              id="admin-add-guest-btn"
              variant="primary"
              size="sm"
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1.5"
            >
              <UserPlus size={14} />
              Agregar Invitado
            </Button>
            <ExportExcelButton guests={guests} />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <GuestsTable
            guests={guests}
            onSaveName={async (id, name) => {
              await updateGuestName(id, name);
            }}
            onDeleteGuest={async (id) => {
              await deleteGuest(id);
            }}
          />
        )}
      </motion.div>

      <AddGuestModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={async (name) => {
          await addGuest(name);
        }}
      />
    </div>
  );
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <PageWrapper>
      <AdminGuard
        isAuthenticated={isAuthenticated}
        onAuthenticated={() => setIsAuthenticated(true)}
      >
        <AdminDashboard />
      </AdminGuard>
    </PageWrapper>
  );
}
