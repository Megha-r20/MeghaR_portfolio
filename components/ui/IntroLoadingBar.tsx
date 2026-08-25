"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// ─── IntroLoadingBar ──────────────────────────────────────────────────────────
// A retro pixel-art / arcade-style determinate progress bar.

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
      {/* Rounded Outlined Progress Bar */}
      <div className="relative w-full max-w-[220px] md:max-w-[260px] h-[14px] md:h-[16px] rounded-full border-[1.5px] border-[var(--preloader-track-border)] bg-[var(--preloader-track-bg)] p-[2px]">
        {/* Smooth Fill */}
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#ff8a3d] via-[#e8742c] to-[#c2410c] will-change-transform"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Bottom text row (Pixel/Monospace Arcade Style) */}
      <div className="flex items-center justify-between w-full max-w-[220px] md:max-w-[260px] px-1 mt-1">
        <span 
          className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-[var(--preloader-label)]"
          style={{ fontFamily: "'Courier New', Courier, monospace" }}
        >
          {done ? "SYSTEM READY" : "LOADING..."}
        </span>
        <span 
          className="text-[9px] md:text-[10px] tracking-[0.2em] text-[var(--preloader-label)] tabular-nums font-bold"
          style={{ fontFamily: "'Courier New', Courier, monospace" }}
        >
          {pctLabel}
        </span>
      </div>
    </motion.div>
  );
}

