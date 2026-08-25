
"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll } from "framer-motion";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

type TimelineNode = {
  year: string;
  role: string;
  desc: string;
  side: string;
  logoSrc?: string;
  logoClass?: string;
};

function JourneyTimeline({ timeline }: { timeline: TimelineNode[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 70%"],
  });

  return (
    <div ref={ref} className="relative">
      <motion.div
        style={{ scaleY: scrollYProgress }}
        className="absolute left-0 top-0 h-full w-px origin-top bg-gradient-to-b from-[#ff8a3d]/40 via-[#5a3f2a]/30 to-transparent md:left-1/2"
      />

      {timeline.map((node) => (
        <ScrollReveal
          key={node.year}
          initialTransform="translateY(40px)"
          className={`relative mb-24 md:mb-32 last:mb-0 grid grid-cols-12 items-start gap-6 ${
            node.side === "right" ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Left Column (Content for left side, empty for right) */}
          <div
            className={`col-span-12 pl-8 md:col-span-5 md:pl-0 ${
              node.side === "left" ? "md:text-right" : "md:hidden"
            }`}
          >
            <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 ${node.side === "left" ? "md:justify-end" : ""}`}>
              {node.side === "left" && node.logoSrc && (
                <div className="group/logo flex h-16 sm:h-20 px-6 sm:px-8 items-center justify-center rounded-[20px] bg-white shadow-[0_15px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.2)] light:shadow-[0_15px_40px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-2 hover:scale-105 hover:shadow-[0_0_50px_rgba(255,138,61,0.25)] overflow-hidden border border-black/5 dark:border-white/10 shrink-0">
                  <Image src={node.logoSrc} alt={node.role} width={200} height={80} className={`object-contain h-10 sm:h-12 w-auto ${node.logoClass || ""}`} priority />
                </div>
              )}
              <div className="font-display text-5xl font-semibold tracking-tight md:text-7xl">
                {node.year}
              </div>
            </div>
            <div className="mt-4 font-display text-xl text-[#dfd3c0] md:text-2xl dark:text-[#dfd3c0] light:text-[#3a352f] font-medium">
              {node.role}
            </div>
            <p className="mt-2 text-sm text-[#a89c8d]/70 font-syne">
              {node.desc}
            </p>
          </div>

          {/* Center Dot — springs in on first view */}
          <div className="absolute left-0 top-2 flex h-4 w-4 -translate-x-1/2 items-center justify-center md:left-1/2">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ type: "spring", stiffness: 320, damping: 16 }}
              className="relative flex h-full w-full items-center justify-center"
            >
              <div className="h-3 w-3 rounded-full bg-[#ff8a3d] shadow-[0_0_18px_rgba(255,138,61,0.7)] animate-pulse"></div>
              <div className="absolute h-6 w-6 rounded-full border border-[#5a3f2a]/70 dark:border-[#5a3f2a]/70 light:border-black/10"></div>
            </motion.div>
          </div>

          {/* Right Column (Content for right side, empty for left) */}
          <div
            className={`col-span-12 pl-8 md:col-span-5 md:col-start-8 md:pl-0 ${
              node.side === "right" ? "block" : "hidden md:block opacity-0"
            }`}
          >
            {node.side === "right" && (
              <>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
                  <div className="font-display text-5xl font-semibold tracking-tight md:text-7xl">
                    {node.year}
                  </div>
                  {node.logoSrc && (
                    <div className="group/logo flex h-16 sm:h-20 px-6 sm:px-8 items-center justify-center rounded-[20px] bg-white shadow-[0_15px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.2)] light:shadow-[0_15px_40px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-2 hover:scale-105 hover:shadow-[0_0_50px_rgba(255,138,61,0.25)] overflow-hidden border border-black/5 dark:border-white/10 shrink-0">
                      <Image src={node.logoSrc} alt={node.role} width={200} height={80} className={`object-contain h-10 sm:h-12 w-auto ${node.logoClass || ""}`} priority />
                    </div>
                  )}
                </div>
                <div className="mt-4 font-display text-xl text-[#dfd3c0] md:text-2xl dark:text-[#dfd3c0] light:text-[#3a352f] font-medium">
                  {node.role}
                </div>
                <p className="mt-2 text-sm text-[#a89c8d]/70 font-syne">
                  {node.desc}
                </p>
              </>
            )}
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}

export function Journey() {
  const TIMELINE: TimelineNode[] = [
    {
      year: "2026+",
      role: "Software Product Engineer",
      desc: "Building, scaling, and architecting the next generation of web products and intelligent systems.",
      side: "left",
    },
    {
      year: "2024",
      role: "Full-Stack Developer",
      desc: "Exploring React, Next.js, and modern web architectures to create seamless user experiences.",
      side: "right",
    },
    {
      year: "2023",
      role: "B.Tech Computer Science",
      desc: "Started my journey in Software Product Engineering at Kalasalingam Academy of Research and Education.",
      side: "left",
    },
  ];

  return (
    <section id="journey" className="relative w-full pt-32 pb-40 overflow-hidden bg-gradient-to-b from-transparent via-[#0a0807]/50 to-transparent">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12 relative z-10">
        <div className="mb-16 md:mb-24 flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-[#8c7d6e] font-researcher">
          <span>07</span>
          <span className="h-px w-12 bg-[#ff8a3d]/40"></span>
          <span className="text-[#ff8a3d] font-black text-[13px] md:text-[15px] tracking-[0.4em]">The Journey</span>
        </div>
        <JourneyTimeline timeline={TIMELINE} />
      </div>
    </section>
  );
}
