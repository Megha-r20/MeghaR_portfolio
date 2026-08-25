
"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Link2 } from "lucide-react";
import { GlowButton } from "@/components/ui/glow";
import { TiltCard } from "@/components/ui/TiltCard";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

type Project = {
  num: string;
  title: string;
  cat: string;
  desc: string;
  tags: string[];
  status: string;
  year: string;
  link: string;
  github: string;
  image: string;
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rainbow-glow group relative rounded-[28px] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 md:rounded-[40px]">
      <span aria-hidden="true" className="rainbow-halo"><span className="rainbow-conic" /></span>
      <span aria-hidden="true" className="rainbow-ring"><span className="rainbow-conic" /></span>
      {/* Hover shadow — pre-rendered on its own layer, faded via opacity (composited).
          Animating box-shadow directly repaints the whole card every frame. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[28px] md:rounded-[40px] shadow-[0_45px_100px_-30px_rgba(255,138,61,0.35)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      ></div>
      <div className="relative overflow-hidden rounded-[28px] md:rounded-[40px] border border-[#3a322b]/10 bg-gradient-to-br from-white via-[#faf5ec] to-[#f3ecdf] shadow-[0_30px_80px_-30px_rgba(58,50,43,0.28)] transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#ff8a3d]/30">
        {/* Ambient orange glow on hover */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#ff8a3d]/10 opacity-0 blur-[80px] transition-opacity duration-700 group-hover:opacity-100"></div>

        <div className="relative grid grid-cols-1 items-center gap-10 p-8 md:p-12 lg:grid-cols-2 lg:gap-12 lg:p-16">

          {/* ── Left: Icons, Title, Description, Tech Tags ── */}
          <div className="flex flex-col">
            {/* Icon buttons */}
            <div className="mb-8 flex items-center gap-4 md:mb-10">
              <GlowButton
                asChild
                mode="rotate"
                blur="soft"
                glowScale={1.1}
                colors={["#ff8a3d", "#3a322b", "#ffaf7a"]}
                variant="unstyled"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1a1612] text-[#f2ece1] transition-all duration-300 hover:scale-110 hover:bg-[#ff8a3d] hover:text-[#1a1612] border-0 outline-none"
              >
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} source on GitHub`}
                >
                  <Github className="h-5 w-5" />
                </a>
              </GlowButton>
              <GlowButton
                asChild
                mode="rotate"
                blur="soft"
                glowScale={1.1}
                colors={["#ff8a3d", "#3a322b", "#ffaf7a"]}
                variant="unstyled"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1a1612] text-[#f2ece1] transition-all duration-300 hover:scale-110 hover:bg-[#ff8a3d] hover:text-[#1a1612] border-0 outline-none"
              >
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${project.title} live site`}
                >
                  <Link2 className="h-5 w-5" />
                </a>
              </GlowButton>
            </div>

            {/* Title */}
            <h3 className="font-montserrat text-4xl font-black leading-[0.95] tracking-tight text-[#1a1612] transition-colors duration-500 group-hover:text-[#ff8a3d] md:text-5xl xl:text-6xl">
              {project.title}
            </h3>

            {/* Description */}
            <p className="font-syne mt-4 w-[90%] max-w-[457px] text-[16px] font-semibold leading-[24px] text-[#95979D]">
              {project.desc}
            </p>

            {/* Tech tags */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-syne text-[13px] font-bold uppercase tracking-[0.12em] text-[#3a322b] transition-colors duration-300 group-hover:text-[#1a1612] md:text-[15px]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right: MacBook mockup ── */}
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title}`}
            className="relative block w-full"
          >
            <TiltCard>
              <div className="relative mx-auto w-full max-w-[580px] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1">
                {/* Screen + bezel */}
                <div className="relative rounded-t-[16px] border-[10px] border-b-0 border-[#2b2b2f] bg-[#2b2b2f] shadow-[0_25px_60px_-20px_rgba(0,0,0,0.5)] md:rounded-t-[20px] md:border-[14px] md:border-b-0">
                  <div className="relative overflow-hidden rounded-[4px] bg-black">
                    <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#ff8a3d]/25 to-transparent opacity-0 mix-blend-overlay transition-opacity duration-700 group-hover:opacity-100"></div>
                    {/* Bottom-up wipe reveal */}
                    <motion.div
                      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
                      viewport={{ once: true, margin: "-10%" }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Image
                        src={project.image}
                        alt={`${project.title} Preview`}
                        width={1600}
                        height={1000}
                        className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                        loading="eager"
                      />
                    </motion.div>
                  </div>
                </div>
                {/* Base / hinge */}
                <div className="relative left-1/2 h-3.5 w-[112%] -translate-x-1/2 rounded-b-[10px] bg-gradient-to-b from-[#d8d8db] via-[#bcbcc0] to-[#96969b] shadow-[0_12px_24px_-8px_rgba(0,0,0,0.4)] md:h-4">
                  {/* Notch */}
                  <div className="absolute left-1/2 top-0 h-1.5 w-[14%] -translate-x-1/2 rounded-b-[6px] bg-[#7c7c82]"></div>
                </div>
              </div>
            </TiltCard>
          </a>

        </div>
      </div>
    </div>
  );
}

// ─── ProjectsShowcase ─────────────────────────────────────────────────────────
// Simple vertical stack of full project cards with scroll reveals,
// on every screen size.

function ProjectsShowcase({ projects }: { projects: Project[] }) {
  return (
    <div className="mx-auto mt-8 flex max-w-[1600px] flex-col gap-y-12 px-6 md:gap-y-20 md:px-12">
      {projects.map((project) => (
        <ScrollReveal key={project.title} initialTransform="translateY(80px)">
          <ProjectCard project={project} />
        </ScrollReveal>
      ))}
    </div>
  );
}

export function Projects() {
  const projects = [
    {
      num: "/01",
      title: "KADENCE",
      cat: "MUSIC • 3D UNIVERSE",
      desc: "Step into a living, breathing 3D universe of music where every artist and album becomes a world to explore.",
      tags: ["REACT", "THREE.JS", "NEXT.JS"],
      status: "LIVE",
      year: "2024",
      link: "https://github.com/Megha-r20",
      github: "https://github.com/Megha-r20",
      image: "/kadence-preview.png",
    },
    {
      num: "/02",
      title: "DevMentor AI",
      cat: "AI • DEVELOPER TOOL",
      desc: "An intelligent platform that analyzes your coding patterns and provides personalized mentorship, architecture reviews, and growth paths.",
      tags: ["NEXT.JS", "OPENAI", "TAILWIND", "SUPABASE"],
      status: "BETA",
      year: "2024",
      link: "https://github.com/Megha-r20",
      github: "https://github.com/Megha-r20",
      image: "/devmentor-preview.png",
    },
    {
      num: "/03",
      title: "VELARI",
      cat: "CREATIVE • AI",
      desc: "A generative AI interface for creating and orchestrating complex digital visual experiences in real-time.",
      tags: ["REACT", "WEBGL", "PYTHON", "FASTAPI"],
      status: "LIVE",
      year: "2023",
      link: "https://github.com/Megha-r20",
      github: "https://github.com/Megha-r20",
      image: "/velari-preview.png",
    },
    {
      num: "/04",
      title: "DevScore",
      cat: "SAAS • ANALYTICS",
      desc: "Comprehensive developer analytics platform tracking productivity, code quality, and team velocity across GitHub and Jira.",
      tags: ["NEXT.JS", "POSTGRES", "PRISMA", "D3.JS"],
      status: "PRODUCTION",
      year: "2023",
      link: "https://github.com/Megha-r20",
      github: "https://github.com/Megha-r20",
      image: "/devscore-preview.png",
    }
  ];

  return (
    <section id="work" className="relative mx-auto w-full pt-16 pb-32 md:pt-20 md:pb-40 z-10 block">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12 relative z-10 w-full">
        <div className="mb-6 flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-[#8c7d6e] font-researcher">
          <span>05</span>
          <span className="h-px w-12 bg-[#ff8a3d]/40"></span>
          <span className="text-[#ff8a3d] font-black text-[13px] md:text-[15px] tracking-[0.4em]">Selected Projects</span>
        </div>
        <h2 className="font-display max-w-5xl text-[clamp(3rem,7vw,8rem)] font-black leading-[0.9] tracking-[-0.03em] mb-12 text-[#f2ece1] light:text-[#110e0c]">
          Featured <span className="text-[#ff8a3d]">Work.</span>
        </h2>
      </div>
      <ProjectsShowcase projects={projects} />
    </section>
  );
}
