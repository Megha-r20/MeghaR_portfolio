
"use client";

import React from "react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { ProximityPillRow } from "@/components/ui/TechPill";

export function TechnologyArsenal() {
  const capabilities = [
    { num: "01", title: "Full-Stack Development", desc: "End-to-end product engineering, from interface to infra." },
    { num: "02", title: "AI Integration", desc: "LLMs, RAG, agents, and intelligent product layers." },
    { num: "03", title: "Backend Systems", desc: "Resilient, scalable APIs and real-time pipelines." },
    { num: "04", title: "UI / UX Engineering", desc: "Cinematic interfaces with motion-rich micro-interactions." },
    { num: "05", title: "API Development", desc: "Clean REST & GraphQL contracts built to last." },
    { num: "06", title: "Cloud & Deployment", desc: "Vercel, AWS, Docker — shipping confidently." },
    { num: "07", title: "Database Architecture", desc: "Designing schemas that scale with the product." },
    { num: "08", title: "Performance Optimization", desc: "Sub-second experiences, every load, every device." },
  ];

  return (
    <section id="stack" className="relative mx-auto w-full pt-16 pb-20 md:pt-24 md:pb-32 z-10 block">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12 relative z-10 w-full">
                    <span>03</span>
            <span className="h-px w-12 bg-[#5a3f2a]/60 dark:bg-[#5a3f2a]/60 light:bg-black/10"></span>
            <span className="text-[#ff8a3d] font-black text-[13px] md:text-[15px] tracking-[0.4em]">Technology Arsenal</span>
          </div>
          <WordReveal
            text="A modern arsenal for"
            accentText="building at the edge."
            className="font-display max-w-5xl text-[clamp(3rem,7vw,8rem)] font-black leading-[0.9] tracking-[-0.03em] mb-20 md:mb-32 text-[#f2ece1] dark:text-[#f2ece1] light:text-[#1a1612]"
          />
        </div>

        {/* Marquees */}
        <ScrollReveal initialTransform="translateY(40px)" delay={200}>
          <div className="flex flex-col gap-6 select-none mt-10 w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] overflow-hidden">
            {/* Row 1 */}
            <ProximityPillRow
              techs={["React", "Next.js", "TypeScript", "TailwindCSS", "Node.js", "Express", "MongoDB", "PostgreSQL", "OpenAI", "LLMs"]}
              rowKey="row1"
              animClass="animate-marquee"
            />

            {/* Row 2 */}
            <ProximityPillRow
              techs={["RAG", "AI Agents", "Docker", "AWS", "Vercel", "GitHub", "REST APIs", "Authentication", "Prompt Engineering", "AI Workflows"]}
              rowKey="row2"
              reverse
              dimmed
              animClass="animate-marquee-slow"
            />
          </div>
        </ScrollReveal>
      </section>



      {/* Section 4: Expertise */}
      <Expertise />

      {/* Section 5: Projects */}
      <section id="projects" className="relative py-32 md:py-48">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="mb-8 flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-[#a89c8d]/70 font-researcher">
            <span>05</span>
            <span className="h-px w-12 bg-[#5a3f2a]/60 dark:bg-[#5a3f2a]/60 light:bg-black/10"></span>
            <span className="text-[#ff8a3d] font-black text-[13px] md:text-[15px] tracking-[0.4em]">Projects</span>
          </div>

          <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
            <WordReveal
              text="Projects that"
              accentText="define me."
              className="font-display max-w-5xl text-[clamp(3rem,7vw,8rem)] font-black leading-[0.9] tracking-[-0.03em] text-[#f2ece1] dark:text-[#f2ece1] light:text-[#1a1612]"
            />
            <div className="text-[11px] uppercase tracking-[0.25em] text-[#a89c8d]/70 font-researcher">
              {projects.length} works
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
