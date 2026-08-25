"use client";

import React from "react";
import { motion } from "framer-motion";

export const About = () => {
  return (
    <section
      id="about-education"
      className="relative mx-auto max-w-[1600px] px-6 py-[100px] md:px-12 md:py-[120px]"
    >
      {/* ── Section layout: flex column, generous spacing for scrolling ── */}
      <div className="flex flex-col gap-24 md:gap-32">

        {/* ── SECTION HEADER ── */}
        <div className="mb-12 flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-[#a89c8d]/70 font-researcher md:mb-16">
          <span>02</span>
          <span className="h-px w-12 bg-[#5a3f2a]/60 dark:bg-[#5a3f2a]/60 light:bg-black/10"></span>
          <span className="text-[#ff8a3d] font-black text-[13px] md:text-[15px] tracking-[0.4em]">About</span>
        </div>


        {/* ══════════════════════════════════════════════════════════
            ENTRY 1 — Kalasalingam Academy  (top-right)
        ══════════════════════════════════════════════════════════ */}
        <div className="relative">
          {/* Decorative watermark year */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            aria-hidden="true"
            className="absolute inset-0 overflow-hidden"
            style={{ zIndex: 0, pointerEvents: "none", userSelect: "none" }}
          >
            <span
              className="font-researcher absolute right-[0%] top-[50%] -translate-y-[50%] text-[9rem] md:text-[15rem] lg:text-[20rem] font-semibold leading-none tracking-tighter"
              style={{ color: "rgb(58, 50, 43)", opacity: 0.10 }}
            >
              2028
            </span>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex w-full justify-end"
            style={{ zIndex: 10 }}
          >
            <div className="flex flex-col items-end text-right">
              {/* Arrow */}
              <div className="mb-4 flex items-center gap-2">
                <span className="font-researcher text-sm text-[#ff8a3d]">&larr;</span>
                <div className="h-px w-14 md:w-24 bg-[#ff8a3d]" />
              </div>

              {/* Institution */}
              <h3 className="font-geist text-[2.5rem] md:text-[4rem] lg:text-[5rem] font-black leading-[0.9] tracking-tighter text-[#f2ece1] dark:text-[#f2ece1] light:text-[#1a1612] scale-x-[1.25] origin-right inline-block">
                Kalasalingam Academy of<br/>Research and Education
              </h3>

              {/* Degree */}
              <h4 className="font-syne mt-2 text-[1.75rem] md:text-[2.75rem] lg:text-[3.25rem] font-black leading-[0.9] tracking-tighter text-[#ff8a3d]">
                B.Tech In Computer Science
              </h4>

              {/* Subtitle */}
              <p className="font-syne mt-4 text-base md:text-2xl lg:text-[30px] font-semibold tracking-wide text-[#a89c8d] dark:text-[#a89c8d] light:text-[#7a6f62]">
                Software Product Engineering
              </p>

              {/* Location & years */}
              <div className="mt-8 flex flex-col items-end gap-1 font-researcher text-[9px] md:text-[10px] font-bold uppercase tracking-[0.25em] text-[#a89c8d] dark:text-[#a89c8d] light:text-[#7a6f62]">
                <span>Virudhunagar, Tamil Nadu</span>
                <span>2024 &ndash; Present</span>
              </div>
            </div>
          </motion.div>
        </div>


        {/* ══════════════════════════════════════════════════════════
            FUTURE ENTRY TEMPLATE (left)
            Uncomment and duplicate to add future alternating entries
        ══════════════════════════════════════════════════════════ */}
        {/*
        <div className="relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            aria-hidden="true"
            className="absolute inset-0 overflow-hidden"
            style={{ zIndex: 0, pointerEvents: "none", userSelect: "none" }}
          >
            <span
              className="font-researcher absolute left-[0%] top-[50%] -translate-y-[50%] text-[9rem] md:text-[15rem] lg:text-[20rem] font-semibold leading-none tracking-tighter"
              style={{ color: "rgb(58, 50, 43)", opacity: 0.10 }}
            >
              2025
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex w-full justify-start"
            style={{ zIndex: 10 }}
          >
            <div className="flex flex-col items-start text-left">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-px w-14 md:w-24 bg-[#ff8a3d]" />
                <span className="font-researcher text-sm text-[#ff8a3d]">&rarr;</span>
              </div>

              <h3 className="font-geist text-[2.5rem] md:text-[4rem] lg:text-[5rem] font-black leading-[0.9] tracking-tighter text-[#f2ece1] dark:text-[#f2ece1] light:text-[#1a1612] inline-block scale-x-[1.25] origin-left">
                Future Company / Role
              </h3>

              <h4 className="font-syne mt-2 text-[1.75rem] md:text-[2.75rem] lg:text-[3.25rem] font-black leading-[0.9] tracking-tighter text-[#ff8a3d]">
                Software Engineer
              </h4>

              <p className="mt-4 font-syne text-base md:text-2xl lg:text-[30px] font-semibold tracking-wide text-[#a89c8d] dark:text-[#a89c8d] light:text-[#7a6f62]">
                Key achievements or technologies used
              </p>

              <div className="mt-8 flex flex-col items-start gap-1 font-researcher text-[9px] md:text-[10px] font-bold uppercase tracking-[0.25em] text-[#a89c8d] dark:text-[#a89c8d] light:text-[#7a6f62]">
                <span>City, State</span>
                <span>Year &ndash; Year</span>
              </div>
            </div>
          </motion.div>
        </div>
        */}

      </div>
    </section>
  );
};
