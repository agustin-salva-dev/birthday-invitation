// StatsCards — displays summary metrics for the admin dashboard. (SRP)
"use client";

import { motion } from "framer-motion";
import { Users, CheckCircle2, XCircle, Clock } from "lucide-react";
import type { AdminStats } from "@/types";

interface StatsCardsProps {
  stats: AdminStats;
}

const cards = [
  {
    key: "total" as keyof AdminStats,
    label: "Invitados Lista",
    icon: Users,
    color: "text-white",
    bg: "border-white/15 bg-white/5",
  },
  {
    key: "confirmed" as keyof AdminStats,
    label: "Confirmados",
    sublabel: (stats: AdminStats) => `${stats.totalPeople} personas en total`,
    icon: CheckCircle2,
    color: "text-emerald-400",
    bg: "border-emerald-500/20 bg-emerald-500/10",
  },
  {
    key: "declined" as keyof AdminStats,
    label: "No pueden",
    icon: XCircle,
    color: "text-red-400",
    bg: "border-red-500/20 bg-red-500/10",
  },
  {
    key: "pending" as keyof AdminStats,
    label: "Pendientes",
    icon: Clock,
    color: "text-yellow-400",
    bg: "border-yellow-500/20 bg-yellow-500/10",
  },
];

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className={`flex flex-col gap-2 rounded-xl border p-4 ${card.bg}`}
          >
            <Icon size={18} className={card.color} />
            <p className="text-3xl font-bold text-white">{stats[card.key]}</p>
            <div>
              <p className={`text-xs font-medium ${card.color} opacity-90`}>
                {card.label}
              </p>
              {card.sublabel && (
                <p className="text-[10px] text-emerald-300/70 font-normal">
                  {card.sublabel(stats)}
                </p>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
