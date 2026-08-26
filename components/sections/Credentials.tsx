"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock } from "lucide-react";

export type Credential = {
  id: string;
  tickerLabel: string;
  title: string;
  status: string;
  description: string;
  skills: string[];
};

export const CREDENTIALS: Credential[] = [
  {
    id: "mern-fullstack",
    tickerLabel: "MERN Stack",
    title: "MERN Stack & Full-Stack Development",
    status: "IN PROGRESS",
    description: "Currently learning, exploring, and working toward certifications that strengthen my technical skills and professional journey.",
    skills: ["MongoDB", "Express.js", "React", "Node.js", "Next.js"],
  },
  {
    id: "ai-genai",
    tickerLabel: "Generative AI",
    title: "AI & Generative AI",
    status: "FUTURE GOAL",
    description: "Currently learning, exploring, and working toward certifications that strengthen my technical skills and professional journey.",
    skills: ["LLMs", "Prompt Engineering", "AI Integration", "RAG"],
  },
  {
    id: "data-emerging",
    tickerLabel: "Data Tech",
    title: "Data & Emerging Technologies",
    status: "FUTURE GOAL",
    description: "Currently learning, exploring, and working toward certifications that strengthen my technical skills and professional journey.",
    skills: ["Data Pipelines", "Machine Learning Concepts", "Cloud Architectures"],
  },
  {
    id: "swe",
    tickerLabel: "Software Engineering",
    title: "Software Engineering",
    status: "IN PROGRESS",
    description: "Currently learning, exploring, and working toward certifications that strengthen my technical skills and professional journey.",
    skills: ["System Design", "Backend Systems", "APIs", "Scalability"],
  }
];

export function Credentials() {
  const [activeId, setActiveId] = useState(CREDENTIALS[0].id);
  const activeCredential = CREDENTIALS.find(c => c.id === activeId) || CREDENTIALS[0];
  const [inView, setInView] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="credentials" className="relative mx-auto w-full py-[100px] md:py-[120px] z-10 block">
      {/* Background soft glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#a83050]/[0.02] rounded-full blur-[80px] pointer-events-none"></div>

      <div className="mx-auto max-w-[1600px] px-6 md:px-12 relative z-10 w-full">
        <div className="mb-[40px] md:mb-[50px] flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-[#8c7d6e] font-researcher">
          <span>06</span>
          <span className="h-px w-12 bg-[#a83050]/40"></span>
          <span className="text-[#a83050] font-black text-[13px] md:text-[15px] tracking-[0.4em]">Credentials</span>
        </div>
        
        <h2 className="font-display max-w-5xl text-[clamp(3rem,7vw,8rem)] font-black leading-[0.9] tracking-[-0.03em] mb-[50px] md:mb-[70px] text-[#211a18]">
          Certifications <span className="text-[#a83050]">Ahead.</span>
        </h2>
      </div>

      {/* Ticker Tape Menu */}
      <div 
        className="relative z-[100] w-full pb-4 pt-2"
      >
        <div 
          className="group/ticker relative w-full border-y border-[#211a18]/5 bg-[#f7f1ea]/45 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.02)] overflow-hidden"
        >
          {/* Edge Fade Masks */}
          <div className="absolute inset-y-0 left-0 w-24 md:w-32 bg-gradient-to-r from-[#f7f1ea] via-[#f7f1ea]/50 to-transparent z-20 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-24 md:w-32 bg-gradient-to-l from-[#f7f1ea] via-[#f7f1ea]/50 to-transparent z-20 pointer-events-none"></div>
          
          <div
            className="flex w-max py-5 md:py-6 pr-16 gap-12 md:gap-16 items-center animate-marquee hover:[animation-play-state:paused] group-hover/ticker:[animation-play-state:paused] will-change-transform"
            style={{
              animationDuration: "40s",
              animationPlayState: inView ? undefined : "paused",
            }}
          >
            {/* Duplicated credentials arrays for seamless CSS loop */}
            {[...CREDENTIALS, ...CREDENTIALS].map((cred, idx) => {
              const isActive = activeId === cred.id;
              return (
                <button
                  key={`${cred.id}-${idx}`}
                  onClick={() => setActiveId(cred.id)}
                  onMouseEnter={() => setActiveId(cred.id)}
                  onFocus={() => setActiveId(cred.id)}
                  className={`group relative flex items-center gap-4 whitespace-nowrap transition-all duration-300 outline-none ${
                    isActive ? "opacity-100 scale-105" : "opacity-40 hover:opacity-80"
                  }`}
                >
                  {/* Active Indicator Dot */}
                  <div className={`relative flex items-center justify-center h-2 w-2 transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0"}`}>
                    <div className="h-full w-full rounded-full bg-[#a83050] shadow-[0_0_12px_rgba(168, 48, 80,0.6)]"></div>
                    <div className="absolute inset-0 rounded-full border border-[#a83050]/40 animate-ping"></div>
                  </div>
                  
                  <span className={`font-display text-2xl md:text-3xl font-semibold tracking-tight transition-colors duration-300 ${
                    isActive ? "text-[#211a18]" : "text-[#8c7d6e]"
                  }`}>
                    {cred.tickerLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="mx-auto max-w-[1600px] w-full px-6 md:px-12 relative z-10 pt-12 md:pt-16 min-h-[700px] lg:min-h-[550px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, filter: "blur(6px)", y: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(6px)", y: -10 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start lg:items-center"
          >
            {/* Left: Certificate Placeholder (50%) */}
            <div className="relative group perspective-[1200px]">
              <motion.div 
                className="relative rounded-[1.5rem] overflow-hidden bg-white shadow-[0_15px_40px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.04)] transition-transform duration-700 ease-out group-hover:scale-[1.01] group-hover:shadow-[0_20px_50px_rgba(168, 48, 80,0.08),0_0_0_1px_rgba(0,0,0,0.04)]"
                whileHover={{ rotateY: 2, rotateX: 2 }}
              >
                <div className="relative aspect-[1.4/1] w-full bg-[#fdfdfc] flex items-center justify-center">
                  {/* Fallback pattern */}
                  <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#211a18_1px,transparent_1px)] [background-size:20px_20px]"></div>
                  
                  <div className="relative z-10 flex flex-col items-center justify-center gap-4">
                    <Clock className="w-12 h-12 text-[#a83050]/40 animate-pulse" />
                    <span className="font-researcher text-[#211a18]/40 text-sm tracking-[0.3em] font-bold uppercase">
                      Coming Soon
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: Details (50%) */}
            <div className="flex flex-col space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-[#a83050] font-researcher">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{activeCredential.status}</span>
                </div>
                
                <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.05] tracking-tight text-[#211a18]">
                  {activeCredential.title}
                </h3>
                
                <p className="font-syne text-lg md:text-xl font-medium text-[#8c7d6e]">
                  Continuous <span className="text-[#211a18]">Learning</span>
                </p>
              </div>

              <div className="w-16 h-[2px] bg-gradient-to-r from-[#a83050] to-transparent opacity-40"></div>

              <div className="space-y-6">
                <p className="font-syne text-base md:text-lg leading-[1.6] text-[#6b6054] font-normal">
                  {activeCredential.description}
                </p>
                
                <div className="space-y-3 pt-2">
                  <h4 className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#8c7d6e] font-researcher">Target Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeCredential.skills.map(skill => (
                      <span key={skill} className="px-3 py-1.5 rounded-lg border border-[#e6e0d8] bg-white text-xs md:text-sm font-medium text-[#211a18] shadow-sm transition-all duration-300 hover:border-[#a83050]/40 hover:text-[#a83050] hover:shadow-[0_4px_12px_rgba(168, 48, 80,0.08)]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
