// Countdown — animated countdown to the event date. (SRP)
"use client";

import { useEffect, useState } from "react";
import { EVENT } from "@/lib/constants";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  const diff = EVENT.date.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-2xl font-bold text-cyan-300 shadow-lg shadow-cyan-500/10">
        {String(value).padStart(2, "0")}
      </div>
      <span className="text-xs text-white/40 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const isOver =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  if (isOver) {
    return (
      <p className="text-cyan-300 font-semibold text-center">
        🎉 ¡El evento es hoy!
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-white/40 text-xs uppercase tracking-widest">Faltan</p>
      <div className="flex items-end gap-4">
        <TimeUnit value={timeLeft.days} label="días" />
        <span className="mb-8 text-lg text-white/30 font-base">:</span>
        <TimeUnit value={timeLeft.hours} label="hs" />
        <span className="mb-8 text-lg text-white/30 font-base">:</span>
        <TimeUnit value={timeLeft.minutes} label="min" />
        <span className="mb-8 text-lg text-white/30 font-base">:</span>
        <TimeUnit value={timeLeft.seconds} label="seg" />
      </div>
    </div>
  );
}
