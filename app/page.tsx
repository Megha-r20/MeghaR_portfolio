"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Sparkles,
  Mail,
  Loader2,
  CheckCircle2,
  Link2,
  Download,
  Menu,
  X,
} from "lucide-react";
import { ScrollProgressBar } from "@/components/effects/ScrollProgressBar";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { BackgroundTypography } from "@/components/effects/BackgroundTypography";
import { StatsMarquee } from "@/components/shared/StatsMarquee";
import { Credentials } from "@/components/sections/Credentials";
import { About } from "@/components/sections/About";
import { Expertise } from "@/components/sections/Expertise";
import { TypewriterTitle } from "@/components/hero/TypewriterTitle";
import { IntroPreloader } from "@/components/effects/IntroPreloader";
import { MagneticNavGroup } from "@/components/navigation/MagneticNavItem";
import { ProximityPillRow } from "@/components/ui/TechPill";
import { AnimatedHeroHeading } from "@/components/hero/AnimatedHeroHeading";
import { WordReveal } from "@/components/ui/WordReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { Magnetic } from "@/components/ui/Magnetic";
import { GlowButton } from "@/components/ui/glow";
import { TimePill } from "@/components/hero/TimePill";
import { StatsCard } from "@/components/shared/StatsCard";
import { BottomTicker } from "@/components/shared/BottomTicker";
import { DinoRunner } from "@/components/hero/DinoRunner";
import { HireMeModal } from "@/components/shared/HireMeModal";

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// ─── Types ────────────────────────────────────────────────────────────────────

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

type TimelineNode = {
  year: string;
  role: string;
  desc: string;
  side: string;
  logoSrc?: string;
  logoClass?: string;
};

// ─── ProjectCard ──────────────────────────────────────────────────────────────
// One project card: rainbow hover border, glow icon buttons, tilt mockup,
// and a bottom-up clip-path wipe on the screenshot when it enters the viewport.

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rainbow-glow group relative rounded-[28px] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 md:rounded-[40px]">
      <span aria-hidden="true" className="rainbow-halo">
        <span className="rainbow-conic" />
      </span>
      <span aria-hidden="true" className="rainbow-ring">
        <span className="rainbow-conic" />
      </span>
      {/* Hover shadow — pre-rendered on its own layer, faded via opacity (composited).
          Animating box-shadow directly repaints the whole card every frame. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[28px] md:rounded-[40px] shadow-[0_45px_100px_-30px_rgba(255,138,61,0.35)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      ></div>
      <div className="relative overflow-hidden rounded-[28px] md:rounded-[40px] border border-[#3a322b]/10 bg-gradient-to-br from-white via-[#faf5ec] to-[#f3ecdf] shadow-[0_30px_80px_-30px_rgba(58,50,43,0.28)] transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#ff8a3d]/30">

        <div className="relative grid grid-cols-1 items-center gap-10 p-8 md:p-12 lg:grid-cols-2 lg:gap-12 lg:p-16">
          {/* ── Left: Icons, Title, Description, Tech Tags ── */}
          <div className="flex flex-col">
            {/* Icon buttons */}
            <div className="mb-8 flex items-center gap-4 md:mb-10">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} source on GitHub`}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1a1612] text-[#f2ece1] shadow-[0_2px_10px_rgba(26,22,18,0.1)] transition-colors duration-300 hover:bg-[#ff8a3d] hover:text-[#1a1612]"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${project.title} live site`}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1a1612] text-[#f2ece1] shadow-[0_2px_10px_rgba(26,22,18,0.1)] transition-colors duration-300 hover:bg-[#ff8a3d] hover:text-[#1a1612]"
              >
                <Link2 className="h-5 w-5" />
              </a>
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

          {/* ── Right: Static Project Preview ── */}
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title}`}
            className="relative block w-full"
          >
            <div className="relative mx-auto w-full max-w-[650px] overflow-hidden rounded-[14px] border-[1.5px] border-[#1a1612] bg-[#f8f5f0] shadow-[0_24px_50px_-12px_rgba(26,22,18,0.3),0_0_60px_-15px_rgba(255,138,61,0.35)]">
              
              {/* Dark Browser Chrome */}
              <div className="flex h-[38px] w-full items-center justify-between border-b-[1.5px] border-[#1a1612] bg-[#1a1612] px-4">
                {/* Colored window-control dots */}
                <div className="flex gap-[6px]">
                  <div className="h-[10px] w-[10px] rounded-full bg-[#ff5f56]"></div>
                  <div className="h-[10px] w-[10px] rounded-full bg-[#ffbd2e]"></div>
                  <div className="h-[10px] w-[10px] rounded-full bg-[#27c93f]"></div>
                </div>
                
                {/* Address bar */}
                <div className="flex h-[22px] items-center justify-center rounded-[4px] bg-[#ffffff]/10 px-6 md:px-10">
                  <span className="font-sans text-[10px] font-medium tracking-wide text-[#ffffff]/60">
                    {project.link.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                  </span>
                </div>
                
                {/* Spacer to balance flex layout */}
                <div className="w-[42px]"></div>
              </div>

              {/* Browser Screen / Screenshot */}
              <div className="relative w-full bg-[#f2ece1]">
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
                    className="aspect-video w-full object-cover object-top"
                    loading="eager"
                  />
                </motion.div>
              </div>
            </div>
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

// ─── JourneyTimeline ──────────────────────────────────────────────────────────
// The center line draws itself in as you scroll through the section,
// and each node's dot pops in with a spring when it enters the viewport.

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
            <div
              className={`flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 ${node.side === "left" ? "md:justify-end" : ""}`}
            >
              {node.side === "left" && node.logoSrc && (
                <div className="group/logo flex h-16 sm:h-20 px-6 sm:px-8 items-center justify-center rounded-[20px] bg-white shadow-[0_15px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.2)] light:shadow-[0_15px_40px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-2 hover:scale-105 hover:shadow-[0_0_50px_rgba(255,138,61,0.25)] overflow-hidden border border-black/5 dark:border-white/10 shrink-0">
                  <Image
                    src={node.logoSrc}
                    alt={node.role}
                    width={200}
                    height={80}
                    className={`object-contain h-10 sm:h-12 w-auto ${node.logoClass || ""}`}
                    priority
                  />
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
                      <Image
                        src={node.logoSrc}
                        alt={node.role}
                        width={200}
                        height={80}
                        className={`object-contain h-10 sm:h-12 w-auto ${node.logoClass || ""}`}
                        priority
                      />
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

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isReadyToReveal, setIsReadyToReveal] = useState(false);
  const [hoveredPillar, setHoveredPillar] = useState<number | null>(null);
  const [formState, setFormState] = useState<"idle" | "loading" | "success">(
    "idle",
  );
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [hireMeOpen, setHireMeOpen] = useState(false);
  // Mouse-driven effects (WebGL hero mesh) only make sense with a fine pointer
  const [isFinePointer, setIsFinePointer] = useState(false);

  // Form Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Scroll-linked hero exit: title shrinks, drifts down and fades as you scroll away
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 700], [1, 0.9]);
  const heroOpacity = useTransform(scrollY, [0, 700], [1, 0.15]);
  const heroY = useTransform(scrollY, [0, 700], [0, 60]);

  useEffect(() => {
    setMounted(true);
    setIsFinePointer(window.matchMedia("(pointer: fine)").matches);

    // Scroll spy logic to highlight active link using IntersectionObserver
    const sections = [
      "hero",
      "projects",
      "about",
      "stack",
      "journey",
      "contact",
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -60% 0px", threshold: 0 },
    );

    sections.forEach((section) => {
      const el = document.getElementById(section);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setFormState("loading");
    setTimeout(() => {
      setFormState("success");
      setName("");
      setEmail("");
      setMessage("");
      // Reset after 3 seconds
      setTimeout(() => setFormState("idle"), 3000);
    }, 1800);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen w-full bg-[#f2ece1] flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-[#ff8a3d]" />
      </div>
    );
  }

  const buildPillars = [
    {
      num: "01",
      title: "AI Products",
      desc: "Applying LLMs, agents, and intelligent workflows to real products.",
      image: "/meraki-preview.png",
    },
    {
      num: "02",
      title: "Creative Technology",
      desc: "Combining interaction design and immersive digital experiences.",
      image: "/meraki-preview.png",
    },
    {
      num: "03",
      title: "Developer Platforms",
      desc: "Built products focused on developer growth, mentorship, analysis, and productivity.",
      image: "/meraki-preview.png",
    },
    {
      num: "04",
      title: "Full-Stack Systems",
      desc: "Engineering complete products from frontend experiences to backend infrastructure and deployment.",
      image: "/meraki-preview.png",
    },
  ];

  const capabilities = [
    {
      num: "01",
      title: "Full-Stack Development",
      desc: "End-to-end product engineering, from interface to infra.",
    },
    {
      num: "02",
      title: "AI Integration",
      desc: "LLMs, RAG, agents, and intelligent product layers.",
    },
    {
      num: "03",
      title: "Backend Systems",
      desc: "Resilient, scalable APIs and real-time pipelines.",
    },
    {
      num: "04",
      title: "UI / UX Engineering",
      desc: "Cinematic interfaces with motion-rich micro-interactions.",
    },
    {
      num: "05",
      title: "API Development",
      desc: "Clean REST & GraphQL contracts built to last.",
    },
    {
      num: "06",
      title: "Cloud & Deployment",
      desc: "Vercel, AWS, Docker — shipping confidently.",
    },
    {
      num: "07",
      title: "Database Architecture",
      desc: "Designing schemas that scale with the product.",
    },
    {
      num: "08",
      title: "Performance Optimization",
      desc: "Sub-second experiences, every load, every device.",
    },
  ];

  const projects = [
    {
      num: "/01",
      title: "MERAKI",
      cat: "FULL-STACK • VOLUNTEER PLATFORM",
      desc: "A volunteer platform that connects NGOs and volunteers through opportunities, applications, and role-based dashboards.",
      tags: ["NODE.JS", "EXPRESS", "MONGODB"],
      status: "LIVE",
      year: "2025",
      link: "https://meraki-ngo-platform.netlify.app/",
      github: "https://github.com/kalviumcommunity/s82_Megha_Capstone_Meraki",
      image: "/meraki-preview.png",
    },
  ];

  const timeline = [
    {
      year: "2026",
      role: "Exploring & Preparing",
      desc: "Currently seeking internship opportunities, strengthening my MERN and full-stack development skills, building meaningful projects, improving problem-solving, and preparing for the industry.",
      side: "left",
    },
    {
      year: "2027",
      role: "On-Site Internship",
      desc: "Aim to gain on-site industry experience, work with professional teams, contribute to real-world projects, and strengthen my skills in full-stack development, backend systems, and software engineering.",
      side: "right",
    },
    {
      year: "2028",
      role: "Graduate & Begin My Career",
      desc: "Graduate with my B.Tech and begin my professional journey as a software engineer, applying my full-stack development skills while continuing to learn, build, and grow.",
      side: "left",
    },
    {
      year: "2030+",
      role: "Growth & Specialization",
      desc: "Continue evolving as a software engineer by deepening my expertise in full-stack development while exploring AI, data, cloud, and emerging technologies that shape the future of software.",
      side: "right",
    },
    {
      year: "Long-Term",
      role: "Build & Innovate",
      desc: "Create impactful technology products, explore entrepreneurship, and turn ambitious ideas into scalable solutions that solve meaningful real-world problems.",
      side: "left",
    },
  ];

  const navItems = [
    { id: "projects", label: "Work" },
    { id: "about", label: "About" },
    { id: "stack", label: "Stack" },
    { id: "journey", label: "Journey" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <main className="relative min-h-screen w-full overflow-x-clip bg-[#f2ece1]">
      <IntroPreloader onReadyToReveal={() => setIsReadyToReveal(true)} />

      <div
        style={{
          pointerEvents: isReadyToReveal ? "auto" : "none",
        }}
      >
        <ScrollProgressBar />

        {/* Floating quick-access dock — GitHub / LinkedIn / Gmail, always on screen */}
        <div className="fixed z-[90] flex gap-3 max-md:bottom-5 max-md:left-1/2 max-md:-translate-x-1/2 max-md:flex-row md:right-5 md:top-1/2 md:-translate-y-1/2 md:flex-col">
          {[
            {
              label: "Github",
              href: "https://github.com/Megha-r20",
              icon: (
                <svg
                  className="h-[24px] w-[24px]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              ),
            },
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/in/megha-r20/",
              icon: (
                <svg
                  className="h-[24px] w-[24px]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              ),
            },
            {
              label: "Gmail",
              href: "https://mail.google.com/mail/?view=cm&fs=1&to=megha.ragumani@gmail.com",
              icon: (
                <svg
                  className="h-[24px] w-[24px]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              ),
            },
            {
              label: "Resume",
              href: "/resume.pdf",
              icon: (
                <svg
                  className="h-[24px] w-[24px]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H6V4h12v16z" />
                  <circle cx="9" cy="9" r="2.5" />
                  <path d="M13 7.5h4v1.5h-4zm0 3h4v1.5h-4zm-6 4h10v1.5H7zm0 3h7v1.5H7z" />
                </svg>
              ),
            },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={item.label}
              className="group relative block rounded-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              {/* Always-on pulsing orange glow — same as the resume button */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-1.5 rounded-full bg-gradient-to-r from-[#ff8a3d] via-[#e8742c] to-[#c2410c] opacity-40 blur-lg animate-pulse transition-opacity duration-500 group-hover:opacity-80"
              />
              {/* Liquid glass circle */}
              <span className="relative z-10 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-[var(--dock-glass-border)] bg-[var(--dock-glass-bg)] text-[var(--fg-body)] backdrop-blur-xl shadow-[var(--dock-glass-shadow)] transition-all duration-300 group-hover:border-[var(--amber)]/50 group-hover:text-[var(--amber)] group-hover:shadow-[var(--dock-glass-hover-shadow)]">
                {/* Specular sheen */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(155deg,rgba(255,255,255,0.85)_0%,rgba(255,255,255,0.25)_28%,rgba(255,255,255,0)_50%)]"
                />
                <span className="relative z-10">{item.icon}</span>
              </span>
              {/* Hover label — glowing orange text */}
              <span
                className="pointer-events-none absolute right-full top-1/2 z-20 mr-3 hidden -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-full border border-[var(--amber)]/30 bg-[var(--dock-label-bg)] px-3.5 py-2 font-researcher text-[9px] font-bold uppercase tracking-[0.3em] opacity-0 shadow-[0_8px_24px_rgba(255,138,61,0.2),0_0_12px_rgba(255,138,61,0.15)] backdrop-blur-md transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:block"
                style={{
                  color: "var(--amber)",
                  textShadow:
                    "0 0 8px rgba(255,138,61,0.7), 0 0 20px rgba(255,138,61,0.4)",
                }}
              >
                {item.label}
              </span>
            </a>
          ))}
        </div>

        {/* Static Glow Orb */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed top-0 left-0 z-[1] h-[500px] w-[500px] rounded-full opacity-70 mix-blend-screen transition-transform duration-500"
          style={{ transform: "translateX(-200px) translateY(-200px)" }}
        >
          <div className="glow-orb h-full w-full rounded-full"></div>
        </div>

        <div className="grid-overlay"></div>
        <div className="grain"></div>
        <div className="vignette"></div>

        {/* Floating Header Navbar */}
        <nav
          className="fixed top-4 left-[calc(50%+16px)] z-50 -translate-x-1/2 transition-all duration-700 w-[min(95%,760px)]"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted
              ? "translateX(-50%) translateY(0)"
              : "translateX(-50%) translateY(-40px)",
          }}
        >
          <div className="flex items-center justify-between gap-3 rounded-full border border-[var(--nav-border)] bg-[var(--nav-bg)] backdrop-blur-xl px-6 py-2.5 shadow-[var(--nav-shadow)]">
            <a
              href="#hero"
              className="flex items-center gap-2 text-sm font-medium tracking-tight"
            >
              <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[var(--nav-border)] shadow-[0_0_15px_rgba(255,138,61,0.2)]">
                <Image
                  src="/mr_logo_v2.png"
                  alt="MR Logo"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </span>
              <span className="hidden sm:inline text-[var(--fg-body)] font-researcher font-bold tracking-[0.2em] text-[11px] whitespace-nowrap">
                MEGHA R
              </span>
            </a>

            <MagneticNavGroup items={navItems} activeSection={activeSection} />

            <div className="flex items-center gap-2">
              {/* IST Time Pill — only visible md+ */}
              <TimePill />

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--fg-body)] transition-colors hover:text-[var(--amber)] md:hidden"
              >
                {menuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile dropdown — glass panel */}
          <div
            className={`mt-2 overflow-hidden rounded-3xl border bg-[var(--dropdown-bg)] backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
              menuOpen
                ? "max-h-96 border-[var(--border-subtle)] opacity-100"
                : "max-h-0 border-transparent opacity-0"
            }`}
          >
            <div className="flex flex-col p-3">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMenuOpen(false)}
                  className={`font-syne rounded-2xl px-4 py-3 text-[15px] font-semibold transition-colors ${
                    activeSection === item.id
                      ? "bg-[var(--dropdown-active-bg)] text-[var(--amber)]"
                      : "text-[var(--fg-body)]/70 active:bg-[var(--fg-body)]/5"
                  }`}
                >
                  {item.label}
                </a>
              ))}

              <a
                href="/Prajit_Balaji_Resume.pdf"
                download="Prajit_Balaji_Resume.pdf"
                onClick={() => setMenuOpen(false)}
                className="font-syne mt-1 flex items-center gap-2 rounded-2xl border-t border-[var(--border-subtle)] px-4 py-3 text-[15px] font-semibold text-[var(--fg-body)]"
              >
                <Download className="h-4 w-4 text-[var(--amber)]" />
                My Resume
              </a>
            </div>
          </div>
        </nav>

        {/* Hire Me Premium Modal */}
        <HireMeModal isOpen={hireMeOpen} onClose={() => setHireMeOpen(false)} />

        {/* Hero Section */}
        <section
          id="hero"
          className="relative min-h-screen w-full overflow-hidden"
        >
          {/* Background Typography */}
          <BackgroundTypography
            rows={[
              "MEGHA R • CREATIVE ENGINEER •",
              "ARTIFICIAL INTELLIGENCE • NEXT.JS • REACT •",
              "SYSTEM ARCHITECTURE • UI/UX PRO MAX •",
              "BUILDING THE FUTURE • SCALING SYSTEMS •",
            ]}
            opacity={0.06}
          />

          {/* Background */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(255,240,225,0.4),transparent_60%)]"></div>
            <div className="absolute left-[8%] top-[18%] h-[400px] w-[400px] rounded-full bg-[#c2410c]/8 blur-[80px]"></div>
            <div className="absolute right-[5%] top-[35%] h-[500px] w-[500px] rounded-full bg-[#ff8a3d]/6 blur-[100px]"></div>
            <div className="absolute bottom-[-10%] left-1/2 h-[350px] w-[70%] -translate-x-1/2 rounded-full bg-[#b87333]/8 blur-[80px]"></div>
            <div className="absolute inset-x-0 bottom-0 h-[40vh] bg-gradient-to-t from-[#f5efe6] to-transparent"></div>
          </div>

          {/* Ambient pixel-art infinite runner Easter egg */}
          <DinoRunner />

          {/* Hero layout: flex column filling full viewport height */}
          <div className="relative z-10 flex min-h-[100svh] flex-col justify-between pt-32 pb-10">
            {/* Top metadata row — constrained to 1600px */}
            <ScrollReveal
              initialTransform="translateY(20px)"
              className="mx-auto mt-12 w-full max-w-[1600px] px-6 md:px-12 flex items-center justify-between text-[9.5px] uppercase tracking-[0.3em] text-[#1A1612] font-researcher font-bold"
            >
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff8a3d] opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff8a3d]"></span>
                </span>
                <span>Available for projects · 2026</span>
              </div>
              <div className="hidden md:block">Portfolio · v0.26</div>
            </ScrollReveal>

            {/* ── MASSIVE HERO TITLE — full viewport width, no container constraint ── */}
            {/* Circular badge floats at left; title is full-width centred */}
            <div className="relative flex flex-1 flex-col justify-center items-center text-center w-full">
              <div className="relative">
                <h1
                  className="font-montserrat whitespace-nowrap font-black text-[#f2ece1] dark:text-[#f2ece1] light:text-[#1a1612] text-glow pointer-events-none select-text"
                  style={{
                    fontSize: "clamp(2rem, 12.5vw, 18rem)",
                    lineHeight: "0.85",
                    letterSpacing: "-0.06em",
                    position: "relative",
                  }}
                >
                  MEGHA R
                </h1>
              </div>

              {/* Sub-info row — centered directly underneath */}
              <div className="mt-12 flex flex-col items-center justify-center gap-6 px-6 md:px-12 w-full max-w-[1600px]">
                <ScrollReveal
                  initialTransform="translateY(30px)"
                  className="relative w-full flex justify-center"
                >
                  <p className="font-display text-2xl leading-tight tracking-tight md:text-4xl text-[#f2ece1] dark:text-[#f2ece1] light:text-[#1a1612] text-center">
                    Full-Stack Developer
                    <br />
                    <TypewriterTitle />
                    <br />
                    <span className="font-syne text-[#a89c8d] text-xl md:text-2xl mt-3 inline-block">
                      Building scalable web experiences.
                    </span>
                  </p>
                </ScrollReveal>

                <ScrollReveal
                  initialTransform="translateY(30px)"
                  className="text-[13px] uppercase tracking-[0.15em] text-[#110e0c] font-researcher font-black text-center mt-2"
                >
                  <div>
                    OPEN TO{" "}
                    <span className="text-[#ff8a3d] font-bold">
                      INTERNSHIPS
                    </span>{" "}
                    &middot; 2026+
                  </div>
                  <div className="mt-1">
                    BUILDING &middot;{" "}
                    <span className="text-[#ff8a3d] font-bold">LEARNING</span>{" "}
                    &middot; CREATING
                  </div>
                </ScrollReveal>

                {/* Stats card + resume */}
                <ScrollReveal
                  initialTransform="translateY(30px)"
                  className="mt-8 flex justify-center w-full"
                >
                  <StatsCard />
                </ScrollReveal>
              </div>
            </div>

            {/* Bottom row — constrained to 1600px */}
            <ScrollReveal
              initialTransform="translateY(20px)"
              className="mx-auto w-full max-w-[1600px] px-6 md:px-12 flex items-center justify-between text-[9px] uppercase tracking-[0.3em] text-[#1A1612] font-researcher font-bold"
            >
              <span className="flex items-center gap-2">Scroll to explore</span>

              <span className="hidden md:inline">© 2026</span>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Bottom Ticker — fixed to viewport bottom, visible immediately ── */}
        <div className="fixed bottom-0 left-0 w-full z-[60]">
          <BottomTicker />
        </div>

        {/* Section 1: About (Introduction) */}
        <section
          id="about"
          className="relative mx-auto max-w-[1600px] min-h-[100vh] flex flex-col justify-center px-6 py-24 md:px-12 lg:px-20 overflow-hidden"
        >
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
            <span className="text-[#ff8a3d] font-black text-[13px] md:text-[15px] tracking-[0.4em]">
              Introduction
            </span>
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
                  </span>{" "}
                  — a 3rd-year B.Tech Computer Science student specializing in{" "}
                  <span className="text-[#ff8a3d] font-medium">
                    Software Product Engineering
                  </span>{" "}
                  at{" "}
                  <span className="text-[#ff8a3d] font-medium">
                    Kalasalingam Academy of Research and Education
                  </span>
                  .
                </p>

                <p>
                  I'm a{" "}
                  <span className="text-[#ff8a3d]/90 font-medium">
                    Full-Stack Developer
                  </span>{" "}
                  who enjoys turning ideas into responsive, functional, and
                  engaging web experiences.
                </p>

                <p>
                  I work with{" "}
                  <span className="text-[#ff8a3d]/90 font-medium">
                    React, JavaScript, modern web technologies
                  </span>
                  , and full-stack development, while also exploring UI/UX to
                  create interfaces that are clean, intuitive, and enjoyable to
                  use.
                </p>

                <p>
                  I enjoy building real-world projects, experimenting with new
                  technologies, and continuously improving my development and
                  design skills.
                </p>
              </div>

              {/* CTA links */}
              <div className="mt-10 flex items-center gap-6">
                <Magnetic strength={0.2}>
                  <a
                    href="#projects"
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
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Stats Marquee Strip */}
        <StatsMarquee />

        {/* Section 2: About */}
        <About />

        {/* Section 3: Technology Arsenal */}
        <section
          id="stack"
          className="relative mx-auto max-w-[1600px] pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden"
        >
          <div className="px-6 md:px-12">
            <div className="mb-8 flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-[#a89c8d]/70 font-researcher">
              <span>03</span>
              <span className="h-px w-12 bg-[#5a3f2a]/60 dark:bg-[#5a3f2a]/60 light:bg-black/10"></span>
              <span className="text-[#ff8a3d] font-black text-[13px] md:text-[15px] tracking-[0.4em]">
                Technology Arsenal
              </span>
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
                techs={[
                  "React",
                  "Next.js",
                  "TypeScript",
                  "TailwindCSS",
                  "Node.js",
                  "Express",
                  "MongoDB",
                  "PostgreSQL",
                  "OpenAI",
                  "LLMs",
                ]}
                rowKey="row1"
                animClass="animate-marquee"
              />

              {/* Row 2 */}
              <ProximityPillRow
                techs={[
                  "RAG",
                  "AI Agents",
                  "Docker",
                  "AWS",
                  "Vercel",
                  "GitHub",
                  "REST APIs",
                  "Authentication",
                  "Prompt Engineering",
                  "AI Workflows",
                ]}
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
              <span className="text-[#ff8a3d] font-black text-[13px] md:text-[15px] tracking-[0.4em]">
                Projects
              </span>
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

          <ProjectsShowcase projects={projects} />
        </section>

        {/* Section 6: Credentials */}
        <Credentials />

        {/* Section 7: Journey */}
        <section
          id="journey"
          className="relative mx-auto max-w-[1600px] px-6 pt-8 pb-16 md:px-12 md:pt-12 md:pb-24"
        >
          <div className="mb-8 flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-[#a89c8d]/70 font-researcher">
            <span>07</span>
            <span className="h-px w-12 bg-[#5a3f2a]/60 dark:bg-[#5a3f2a]/60 light:bg-black/10"></span>
            <span className="text-[#ff8a3d] font-black text-[13px] md:text-[15px] tracking-[0.4em]">
              Journey
            </span>
          </div>

          <WordReveal
            text="My vision towards"
            accentText="what I am striving to."
            className="font-display mb-24 max-w-5xl text-[clamp(3rem,7vw,8rem)] font-black leading-[0.9] tracking-[-0.03em] text-[#f2ece1] dark:text-[#f2ece1] light:text-[#1a1612]"
          />

          {/* Timeline Grid — line draws in on scroll, dots spring in */}
          <JourneyTimeline timeline={timeline} />
        </section>

        {/* Section 8: Contact */}
        <section id="contact" className="relative overflow-hidden">
          <div className="mx-auto max-w-[1600px] px-6 pt-16 pb-12 md:px-12 md:pt-24 md:pb-12">
            <div className="mb-8 flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-[#a89c8d]/70 font-researcher">
              <span>08</span>
              <span className="h-px w-12 bg-[#5a3f2a]/60 dark:bg-[#5a3f2a]/60 light:bg-black/10"></span>
              <span className="text-[#ff8a3d] font-black text-[13px] md:text-[15px] tracking-[0.4em]">
                Let&apos;s Talk
              </span>
            </div>

            <WordReveal
              text="Let's build the"
              accentText="future."
              className="font-display max-w-6xl text-[clamp(2.5rem,8vw,10rem)] font-semibold leading-[0.9] tracking-tight"
            />

            <div className="mt-16 md:mt-20 grid grid-cols-1 gap-16 md:grid-cols-12">
              {/* Form */}
              <ScrollReveal
                initialTransform="translateY(40px)"
                className="md:col-span-7"
              >
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-[10px] uppercase tracking-[0.25em] text-[#a89c8d]/70 font-semibold font-researcher">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={
                          formState === "loading" || formState === "success"
                        }
                        className="flex w-full py-1 transition-colors h-12 rounded-none border-0 border-b border-[#3a2a1c]/70 bg-transparent px-0 text-base text-[#f2ece1] placeholder:text-[#a89c8d]/55 focus:outline-none focus:border-[#ff8a3d] dark:text-[#f2ece1] dark:border-[#3a2a1c]/70 dark:placeholder:text-[#a89c8d]/55 light:text-black light:border-black/20 focus:ring-0"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-[10px] uppercase tracking-[0.25em] text-[#a89c8d]/70 font-semibold font-researcher">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={
                          formState === "loading" || formState === "success"
                        }
                        className="flex w-full py-1 transition-colors h-12 rounded-none border-0 border-b border-[#3a2a1c]/70 bg-transparent px-0 text-base text-[#f2ece1] placeholder:text-[#a89c8d]/55 focus:outline-none focus:border-[#ff8a3d] dark:text-[#f2ece1] dark:border-[#3a2a1c]/70 dark:placeholder:text-[#a89c8d]/55 light:text-black light:border-black/20 focus:ring-0"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-[10px] uppercase tracking-[0.25em] text-[#a89c8d]/70 font-semibold font-researcher">
                      Tell me about it
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="A project, an idea, anything..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={
                        formState === "loading" || formState === "success"
                      }
                      className="flex w-full py-2 transition-colors rounded-none border-0 border-b border-[#3a2a1c]/70 bg-transparent px-0 text-base text-[#f2ece1] placeholder:text-[#a89c8d]/55 focus:outline-none focus:border-[#ff8a3d] dark:text-[#f2ece1] dark:border-[#3a2a1c]/70 dark:placeholder:text-[#a89c8d]/55 light:text-black light:border-black/20 focus:ring-0 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={
                      formState === "loading" || formState === "success"
                    }
                    className="mt-4 group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-[#ff8a3d]/50 bg-gradient-to-br from-[#ff8a3d] via-[#e8742c] to-[#c2410c] px-7 py-4 text-sm font-medium text-[#1a0d05] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_60px_rgba(255,138,61,0.45),inset_0_1px_0_rgba(255,220,180,0.4)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {formState === "loading" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Transmitting...
                      </>
                    ) : formState === "success" ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-green-950" />
                        Transmission Received!
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        Send transmission
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>
                </form>
              </ScrollReveal>

              {/* Direct details */}
              <ScrollReveal
                initialTransform="translateX(-40px)"
                className="md:col-span-4 md:col-start-9 space-y-8"
              >
                <div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-[#a89c8d]/70 font-semibold font-researcher">
                    Direct
                  </div>
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=megha.ragumani@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display mt-2 block text-2xl tracking-tight hover:text-[#c9bcaa] md:text-3xl text-[#f2ece1] dark:text-[#f2ece1] light:text-[#1a1612] transition-colors"
                  >
                    megha.ragumani@gmail.com
                  </a>
                </div>

                <div className="space-y-3 pt-4">
                  {[
                    {
                      label: "Github",
                      href: "https://github.com/Megha-r20",
                      icon: <Github className="h-4 w-4" />,
                    },
                    {
                      label: "LinkedIn",
                      href: "https://www.linkedin.com/in/megha-r20/",
                      icon: <Linkedin className="h-4 w-4" />,
                    },
                    {
                      label: "Email",
                      href: "https://mail.google.com/mail/?view=cm&fs=1&to=megha.ragumani@gmail.com",
                      icon: <Mail className="h-4 w-4" />,
                    },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between border-b border-[#3a2a1c]/55 dark:border-[#3a2a1c]/55 light:border-black/10 py-3 text-sm transition-colors hover:text-[#f2ece1] text-[#a89c8d]"
                    >
                      <span className="flex items-center gap-3 text-[#c9bcaa] group-hover:text-[#ff8a3d] transition-colors">
                        {social.icon}
                        {social.label}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-[#a89c8d]/55 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#ff8a3d]" />
                    </a>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Footer Accent bar / text */}
          <div className="relative border-t border-[#3a2a1c]/55 dark:border-[#3a2a1c]/55 light:border-black/10 overflow-hidden">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-x-0 bottom-0 h-full bg-[radial-gradient(ellipse_at_50%_120%,rgba(255,138,61,0.28),rgba(194,65,12,0.12)_30%,transparent_60%)]"></div>
              <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff8a3d]/60 to-transparent"></div>
            </div>

            <div className="relative mx-auto max-w-[1600px] px-6 pt-8 pb-20 md:px-12 md:pt-10 md:pb-24">
              <ScrollReveal initialTransform="translateY(100px)">
                <h3 className="font-montserrat text-balance text-[clamp(3.5rem,12vw,12rem)] font-black leading-[0.85] tracking-[-0.06em] text-[#f2ece1] dark:text-[#f2ece1] light:text-[#1a1612] text-glow">
                  HIRE ME !!
                </h3>
              </ScrollReveal>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-[10px] uppercase tracking-[0.3em] text-[#a89c8d]/70 font-semibold font-researcher">
                <span>© 2026 · All systems imagined</span>
                <span>Crafted in the dark · v0.26</span>
                <span>Made with code, motion & care</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
