"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// ─── IntroLoadingBar ──────────────────────────────────────────────────────────
// An 8-bit retro progress bar embedded inside the intro preloader.
// Matches the user's requested visual style while keeping the deterministic onComplete.

interface IntroLoadingBarProps {
  startDelay?: number;
  duration?: number;
  onComplete?: () => void;
}

const PIXEL_COLS = 24; // number of pixel columns in the bar

export function IntroLoadingBar({
  startDelay = 300,
  duration = 1300,
  onComplete,
}: IntroLoadingBarProps) {
  const [progress, setProgress] = useState(0);        // 0–100
  const [filledCols, setFilledCols] = useState(0);    // 0–PIXEL_COLS
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
        setFilledCols(Math.floor((pct / 100) * PIXEL_COLS));

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
      <div className="flex items-center justify-between w-full max-w-xs md:max-w-sm px-0.5">
        <span
          className="text-[9px] md:text-[10px] uppercase tracking-[0.35em] text-[var(--preloader-label)]"
          style={{ fontFamily: "'Courier New', monospace" }}
        >
          LOADING
        </span>
        <span
          className="text-[9px] md:text-[10px] tracking-[0.2em] text-[var(--preloader-label)] tabular-nums"
          style={{ fontFamily: "'Courier New', monospace" }}
        >
          {pctLabel}
        </span>
      </div>

      {/* Pixel bar track */}
      <div
        className="relative w-full max-w-xs md:max-w-sm h-[10px] md:h-[12px] border border-[var(--preloader-track-border)] bg-[var(--preloader-track-bg)] rounded-sm overflow-hidden"
        style={{ imageRendering: "pixelated" }}
      >
        {/* Pixel columns grid */}
        <div className="absolute inset-0 flex gap-[2px] p-[2px]">
          {Array.from({ length: PIXEL_COLS }).map((_, i) => {
            const filled = i < filledCols;
            const isEdge = filled && i === filledCols - 1;

            return (
              <div
                key={i}
                className={`flex-1 h-full rounded-[1px] transition-colors duration-100 ${
                  filled
                    ? isEdge
                      ? "bg-[#b40023]"
                      : i % 3 === 0
                      ? "bg-[#b40023]/80"
                      : "bg-[var(--preloader-text)]/40"
                    : "bg-transparent"
                }`}
              />
            );
          })}
        </div>

        {/* Scan-line shimmer overlay — only while in progress */}
        {!done && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ x: ["0%", "100%", "0%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(180, 0, 35, 0.08) 50%, transparent 100%)",
              width: "40%",
            }}
          />
        )}
      </div>
    </motion.div>
  );
}

