// PageWrapper — global layout with bioluminous starfield background and dragon imagery.
"use client";

import { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
}

const STARS = Array.from({ length: 50 }, (_, i) => ({
  size: ((i * 17) % 20) / 10 + 1,
  top: `${(i * 37) % 100}%`,
  left: `${(i * 53) % 100}%`,
  opacity: (((i * 13) % 50) + 20) / 100,
  duration: `${((i * 7) % 30) / 10 + 2}s`,
  delay: `${((i * 11) % 50) / 10}s`,
}));

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#050A18]">
      {/* Deep space gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(0, 200, 255, 0.07) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(120, 40, 200, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 60% 80%, rgba(16, 185, 129, 0.06) 0%, transparent 50%)",
        }}
      />

      {/* Animated stars layer */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {STARS.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              top: star.top,
              left: star.left,
              opacity: star.opacity,
              animation: `twinkle ${star.duration} ease-in-out infinite`,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      {/* Bioluminous orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute rounded-full opacity-20 blur-3xl"
          style={{
            width: "400px",
            height: "400px",
            top: "-100px",
            right: "-100px",
            background: "radial-gradient(circle, #00F2FE 0%, transparent 70%)",
            animation: "floatOrb 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute rounded-full opacity-15 blur-3xl"
          style={{
            width: "300px",
            height: "300px",
            bottom: "10%",
            left: "-80px",
            background: "radial-gradient(circle, #7928CA 0%, transparent 70%)",
            animation: "floatOrb 10s ease-in-out infinite reverse",
          }}
        />
        <div
          className="absolute rounded-full opacity-10 blur-3xl"
          style={{
            width: "250px",
            height: "250px",
            bottom: "30%",
            right: "15%",
            background: "radial-gradient(circle, #10B981 0%, transparent 70%)",
            animation: "floatOrb 12s ease-in-out infinite",
            animationDelay: "3s",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        {children}
      </div>
    </div>
  );
}
