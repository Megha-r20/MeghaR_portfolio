"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// ─── IntroLoadingBar ──────────────────────────────────────────────────────────
// A premium, sleek continuous progress bar for the intro preloader.

interface IntroLoadingBarProps {
  startDelay?: number;
  duration?: number;
  onComplete?: () => void;
}

export function IntroLoadingBar({
  startDelay = 300,
  duration = 1300,
  onComplete,
}: IntroLoadingBarProps) {
  const [progress, setProgress] = useState(0);        // 0–100
  const [done, setDone] = useState(false);

  // Smoothly animate progress from 0→100 after startDelay
  useEffect(() => {
    let raf: number;
    let startTime: number | null = null;

    const delay = setTimeout(() => {
      const tick = (ts: number) => {
        if (!startTime) startTime = ts;
        const elapsed = ts - startTime;
        const pct = Math.min((elapsed / duration) * 100, 100);
        setProgress(pct);

        if (pct < 100) {
          raf = requestAnimationFrame(tick);
        } else {
          setDone(true);
          onComplete?.();
        }
      };
      raf = requestAnimationFrame(tick);
    }, startDelay);

    return () => {
      clearTimeout(delay);
      cancelAnimationFrame(raf);
    };
  }, [startDelay, duration, onComplete]);

  const pctLabel = `${Math.floor(progress)}%`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: startDelay / 1000, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-3 w-full"
    >
      {/* Top label row */}
      <div className="flex items-center justify-between w-full max-w-xs md:max-w-sm px-1">
        <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em] text-[#1a1612] font-researcher">
          LOADING
        </span>
        <span className="text-[10px] md:text-[11px] font-bold tracking-[0.1em] text-[#1a1612] tabular-nums font-researcher">
          {pctLabel}
        </span>
      </div>

      {/* Smooth track */}
      <div className="relative w-full max-w-xs md:max-w-sm h-[3px] md:h-[4px] bg-[#1a1612]/10 rounded-full overflow-hidden">
        {/* Fill */}
        <div
          className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#ff8a3d] via-[#e8742c] to-[#c2410c] rounded-full will-change-transform"
          style={{ width: `${progress}%` }}
        />
        
        {/* Shimmer overlay */}
        {!done && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
              width: "50%",
            }}
          />
        )}
      </div>

      {/* Completion label (optional, keeps layout stable) */}
      <div className="h-4">
        {done && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.7] }}
            transition={{ duration: 0.3, times: [0, 0.2, 1] }}
            className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em] text-[#ff8a3d] font-researcher"
          >
            READY
          </motion.span>
        )}
      </div>
    </motion.div>
  );
}

