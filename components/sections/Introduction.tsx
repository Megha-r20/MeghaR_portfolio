
"use client";

import React from "react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { AnimatedHeroHeading } from "@/components/hero/AnimatedHeroHeading";
import { Magnetic } from "@/components/ui/Magnetic";
import Link from "next/link";

export function Introduction() {
  return (
    <section id="about" className="relative mx-auto max-w-[1600px] min-h-[100vh] flex flex-col justify-center px-6 py-24 md:px-12 lg:px-20 overflow-hidden">
              {/* Atmospheric name watermark */}
        <div className="absolute inset-0 flex flex-col items-center justify-center select-none pointer-events-none z-0 overflow-hidden opacity-60">
          <span className="font-display font-black leading-[0.85] tracking-[-0.04em] text-[#3a322b]/[0.035] text-[clamp(6rem,16vw,20rem)] whitespace-nowrap">
            MEGHA
          </span>
          <span className="font-display font-black leading-[0.85] tracking-[-0.04em] text-[#3a322b]/[0.035] text-[clamp(6rem,16vw,20rem)] whitespace-nowrap ml-[15%]">
            R
          </span>
        </div>

        {/* ── Section tag / Small eyebrow (Aligned top-left like Credentials) ── */}
        <div className="relative z-10 w-full mb-6 flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-[#8c7d6e] font-researcher self-start">
          <span>01</span>
          <span className="h-px w-12 bg-[#ff8a3d]/40" />
          <span className="text-[#ff8a3d] font-black text-[13px] md:text-[15px] tracking-[0.4em]">Introduction</span>
        </div>

        {/* ── Single Column Editorial Layout ─────────────────────────────── */}
        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col">
          <ScrollReveal
            initialTransform="translateY(50px)"
            className="flex flex-col justify-center w-full"
          >

            {/* Syed-style 3-line animated hero heading */}
            <AnimatedHeroHeading
              lines={[
                "I BUILD WEB PRODUCTS,",
                "DESIGN DIGITAL EXPERIENCES,",
                "TURN IDEAS INTO REALITY.",
              ]}
              accentWords={["products", "experiences", "reality"]}
              className="mb-10"
            />

            {/* Thin separator */}
            <div className="w-12 h-[2px] bg-[#ff8a3d]/40 rounded-full mb-8" />

            {/* Biography block */}
            <div className="font-syne space-y-5 text-[16px] font-semibold leading-[24px] text-[#95979D]">
              <p>
                I'm{" "}
                <span 
                  className="font-extrabold text-[#3a322b] text-[1.05em] tracking-tight"
                  style={{ fontFamily: "var(--next-font-syne), sans-serif" }}
                >
                  MEGHA R
                </span>
                {" "}— a 3rd-year B.Tech Computer Science student specializing in
                {" "}<span className="text-[#ff8a3d] font-medium">Software Product Engineering</span>{" "}
                at{" "}
                <span className="text-[#ff8a3d] font-medium">Kalasalingam Academy of Research and Education</span>.
              </p>

              <p>
                I'm a <span className="text-[#ff8a3d]/90 font-medium">Full-Stack Developer</span> who enjoys turning ideas into responsive, functional, and engaging web experiences.
              </p>

              <p>
                I work with <span className="text-[#ff8a3d]/90 font-medium">React, JavaScript, modern web technologies</span>, and full-stack development, while also exploring UI/UX to create interfaces that are clean, intuitive, and enjoyable to use.
              </p>

              <p>
                I enjoy building real-world projects, experimenting with new technologies, and continuously improving my development and design skills.
              </p>
            </div>

            {/* CTA links */}
            <div className="mt-10 flex items-center gap-6">
              <Magnetic strength={0.2}>
                <a
                  href="/work"
                  className="group relative block rounded-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:scale-105 active:scale-95"
                >
                  {/* Always-on pulsing orange glow */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-1 rounded-full bg-gradient-to-r from-[#ff8a3d] via-[#e8742c] to-[#c2410c] opacity-40 blur-lg animate-pulse transition-opacity duration-500 group-hover:opacity-80"
                  />
                  {/* Pill capsule: solid black & white text at default, turns solid orange & pure black on hover */}
                  <span className="relative z-10 flex h-12 px-8 items-center justify-center gap-2 rounded-full border border-white/10 bg-[#0f0d0b] text-white shadow-[0_4px_20px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300 group-hover:border-[#ff8a3d] group-hover:bg-[#ff8a3d] group-hover:text-black group-hover:shadow-[0_0_30px_rgba(255,138,61,0.65),inset_0_1px_0_rgba(255,255,255,0.4)] text-[11px] font-black uppercase tracking-[0.25em] font-researcher whitespace-nowrap">
                    {/* Subtle top specular border highlight */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(155deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.03)_28%,transparent_50%)] transition-opacity duration-300 group-hover:opacity-0"
                    />
                    <span className="relative z-10">VIEW WORK</span>
                    <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </a>
              </Magnetic>
              <span className="h-px w-8 bg-[#3a322b]/15" />
              <a
                href="#contact"
                className="text-[13px] font-medium uppercase tracking-[0.3em] text-[#3a322b]/45 hover:text-[#3a322b] transition-colors duration-300"
              >
                Let's Talk
              </a>
    </section>
  );
}
