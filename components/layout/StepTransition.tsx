// StepTransition — animated wrapper for step-to-step transitions. (SRP)
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface StepTransitionProps {
  stepKey: string;
  children: ReactNode;
}

const variants = {
  enter: { opacity: 0, y: 30, scale: 0.97 },
  center: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.97 },
};

export function StepTransition({ stepKey, children }: StepTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepKey}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-lg"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
