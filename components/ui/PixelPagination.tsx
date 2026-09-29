"use client";

import React, { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

interface PixelPaginationProps {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

export function PixelPagination({
  currentPage,
  totalPages,
  onPrev,
  onNext,
}: PixelPaginationProps) {
  const dinoRef = useRef<SVGPathElement>(null);
  const dinoContainerRef = useRef<HTMLDivElement>(null);
  const obstaclesRef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<HTMLDivElement>(null);

  const gameState = useRef({
    dinoY: 0,
    dinoVy: 0,
    isJumping: false,
    obstacles: [] as { id: number; x: number; hasJumped?: boolean; passed?: boolean }[],
    clouds: [
      { id: 1, x: 20, y: 12, speed: 0.005 },
      { id: 2, x: 70, y: 22, speed: 0.007 },
    ],
    lastSpawnTime: 0,
    lastTime: 0,
    walkFrame: 0,
    timeSinceLastWalkFrame: 0,
    obsIdCounter: 0,
  });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let requestRef: number;

    const update = (time: number) => {
      if (!gameState.current.lastTime || time - gameState.current.lastTime > 100) {
        gameState.current.lastTime = time;
      }
      const dt = time - gameState.current.lastTime;
      gameState.current.lastTime = time;

      const state = gameState.current;

      // --- Dino Animation ---
      if (!state.isJumping) {
        state.timeSinceLastWalkFrame += dt;
        if (state.timeSinceLastWalkFrame > 150) {
          state.walkFrame = state.walkFrame === 0 ? 1 : 0;
          state.timeSinceLastWalkFrame = 0;
        }
      } else {
        state.walkFrame = 0;
      }

      // --- Dino Jump Physics ---
      if (state.isJumping) {
        state.dinoVy -= 0.00085 * dt; // Gravity
        state.dinoY += state.dinoVy * dt;
        if (state.dinoY <= 0) {
          state.dinoY = 0;
          state.isJumping = false;
          state.dinoVy = 0;
        }
      }

      // --- Moving Clouds ---
      state.clouds.forEach((c) => {
        c.x -= c.speed * dt;
        if (c.x < -20) c.x = 120;
      });

      // --- Moving Obstacles ---
      const speed = 0.032 * dt;
      state.obstacles.forEach((o) => {
        o.x -= speed;
      });

      // --- Spawning Obstacles ---
      if (time - state.lastSpawnTime > 2000 + Math.random() * 2000) {
        state.obstacles.push({ id: state.obsIdCounter++, x: 120, hasJumped: false, passed: false });
        state.lastSpawnTime = time;
      }

      // --- Cleanup old obstacles ---
      state.obstacles = state.obstacles.filter((o) => o.x > -20);

      // --- Auto-Jump Logic (Dino at left position ~6%) ---
      const upcomingObstacle = state.obstacles.find((o) => o.x > 0 && !o.passed);
      if (upcomingObstacle) {
        if (upcomingObstacle.x <= 15 && !upcomingObstacle.hasJumped) {
          upcomingObstacle.hasJumped = true;
          if (!state.isJumping) {
            state.isJumping = true;
            state.dinoVy = 0.24;
          }
        }
        if (upcomingObstacle.x < 3) {
          upcomingObstacle.passed = true;
        }
      }

      // --- DOM Updates ---
      if (dinoContainerRef.current) {
        dinoContainerRef.current.style.transform = `translateY(-${state.dinoY}px)`;
      }
      if (dinoRef.current) {
        dinoRef.current.setAttribute(
          "d",
          state.walkFrame === 0
            ? "M8 0 h1 v1 h-1 Z M9 0 h1 v1 h-1 Z M10 0 h1 v1 h-1 Z M11 0 h1 v1 h-1 Z M12 0 h1 v1 h-1 Z M13 0 h1 v1 h-1 Z M14 0 h1 v1 h-1 Z M15 0 h1 v1 h-1 Z M7 1 h1 v1 h-1 Z M8 1 h1 v1 h-1 Z M9 1 h1 v1 h-1 Z M10 1 h1 v1 h-1 Z M11 1 h1 v1 h-1 Z M12 1 h1 v1 h-1 Z M13 1 h1 v1 h-1 Z M14 1 h1 v1 h-1 Z M15 1 h1 v1 h-1 Z M7 2 h1 v1 h-1 Z M8 2 h1 v1 h-1 Z M10 2 h1 v1 h-1 Z M12 2 h1 v1 h-1 Z M13 2 h1 v1 h-1 Z M14 2 h1 v1 h-1 Z M15 2 h1 v1 h-1 Z M7 3 h1 v1 h-1 Z M8 3 h1 v1 h-1 Z M9 3 h1 v1 h-1 Z M10 3 h1 v1 h-1 Z M11 3 h1 v1 h-1 Z M12 3 h1 v1 h-1 Z M13 3 h1 v1 h-1 Z M14 3 h1 v1 h-1 Z M15 3 h1 v1 h-1 Z M7 4 h1 v1 h-1 Z M8 4 h1 v1 h-1 Z M9 4 h1 v1 h-1 Z M10 4 h1 v1 h-1 Z M11 4 h1 v1 h-1 Z M12 4 h1 v1 h-1 Z M13 4 h1 v1 h-1 Z M14 4 h1 v1 h-1 Z M15 4 h1 v1 h-1 Z M7 5 h1 v1 h-1 Z M8 5 h1 v1 h-1 Z M9 5 h1 v1 h-1 Z M10 5 h1 v1 h-1 Z M7 6 h1 v1 h-1 Z M8 6 h1 v1 h-1 Z M9 6 h1 v1 h-1 Z M10 6 h1 v1 h-1 Z M11 6 h1 v1 h-1 Z M12 6 h1 v1 h-1 Z M13 6 h1 v1 h-1 Z M0 7 h1 v1 h-1 Z M1 7 h1 v1 h-1 Z M7 7 h1 v1 h-1 Z M8 7 h1 v1 h-1 Z M9 7 h1 v1 h-1 Z M10 7 h1 v1 h-1 Z M11 7 h1 v1 h-1 Z M0 8 h1 v1 h-1 Z M1 8 h1 v1 h-1 Z M2 8 h1 v1 h-1 Z M6 8 h1 v1 h-1 Z M7 8 h1 v1 h-1 Z M8 8 h1 v1 h-1 Z M9 8 h1 v1 h-1 Z M10 8 h1 v1 h-1 Z M11 8 h1 v1 h-1 Z M0 9 h1 v1 h-1 Z M1 9 h1 v1 h-1 Z M2 9 h1 v1 h-1 Z M3 9 h1 v1 h-1 Z M5 9 h1 v1 h-1 Z M6 9 h1 v1 h-1 Z M7 9 h1 v1 h-1 Z M8 9 h1 v1 h-1 Z M9 9 h1 v1 h-1 Z M10 9 h1 v1 h-1 Z M11 9 h1 v1 h-1 Z M0 10 h1 v1 h-1 Z M1 10 h1 v1 h-1 Z M2 10 h1 v1 h-1 Z M3 10 h1 v1 h-1 Z M4 10 h1 v1 h-1 Z M5 10 h1 v1 h-1 Z M6 10 h1 v1 h-1 Z M7 10 h1 v1 h-1 Z M8 10 h1 v1 h-1 Z M9 10 h1 v1 h-1 Z M10 10 h1 v1 h-1 Z M11 10 h1 v1 h-1 Z M1 11 h1 v1 h-1 Z M2 11 h1 v1 h-1 Z M3 11 h1 v1 h-1 Z M4 11 h1 v1 h-1 Z M5 11 h1 v1 h-1 Z M6 11 h1 v1 h-1 Z M7 11 h1 v1 h-1 Z M8 11 h1 v1 h-1 Z M9 11 h1 v1 h-1 Z M10 11 h1 v1 h-1 Z M11 11 h1 v1 h-1 Z M2 12 h1 v1 h-1 Z M3 12 h1 v1 h-1 Z M4 12 h1 v1 h-1 Z M5 12 h1 v1 h-1 Z M6 12 h1 v1 h-1 Z M7 12 h1 v1 h-1 Z M8 12 h1 v1 h-1 Z M9 12 h1 v1 h-1 Z M10 12 h1 v1 h-1 Z M3 13 h1 v1 h-1 Z M4 13 h1 v1 h-1 Z M5 13 h1 v1 h-1 Z M6 13 h1 v1 h-1 Z M7 13 h1 v1 h-1 Z M8 13 h1 v1 h-1 Z M9 13 h1 v1 h-1 Z M4 14 h1 v1 h-1 Z M5 14 h1 v1 h-1 Z M8 14 h1 v1 h-1 Z M4 15 h1 v1 h-1 Z M5 15 h1 v1 h-1 Z M8 15 h1 v1 h-1 Z M4 16 h1 v1 h-1 Z M8 16 h1 v1 h-1 Z M3 17 h1 v1 h-1 Z M4 17 h1 v1 h-1 Z M8 17 h1 v1 h-1 Z M9 17 h1 v1 h-1 Z "
            : "M8 0 h1 v1 h-1 Z M9 0 h1 v1 h-1 Z M10 0 h1 v1 h-1 Z M11 0 h1 v1 h-1 Z M12 0 h1 v1 h-1 Z M13 0 h1 v1 h-1 Z M14 0 h1 v1 h-1 Z M15 0 h1 v1 h-1 Z M7 1 h1 v1 h-1 Z M8 1 h1 v1 h-1 Z M9 1 h1 v1 h-1 Z M10 1 h1 v1 h-1 Z M11 1 h1 v1 h-1 Z M12 1 h1 v1 h-1 Z M13 1 h1 v1 h-1 Z M14 1 h1 v1 h-1 Z M15 1 h1 v1 h-1 Z M7 2 h1 v1 h-1 Z M8 2 h1 v1 h-1 Z M10 2 h1 v1 h-1 Z M12 2 h1 v1 h-1 Z M13 2 h1 v1 h-1 Z M14 2 h1 v1 h-1 Z M15 2 h1 v1 h-1 Z M7 3 h1 v1 h-1 Z M8 3 h1 v1 h-1 Z M9 3 h1 v1 h-1 Z M10 3 h1 v1 h-1 Z M11 3 h1 v1 h-1 Z M12 3 h1 v1 h-1 Z M13 3 h1 v1 h-1 Z M14 3 h1 v1 h-1 Z M15 3 h1 v1 h-1 Z M7 4 h1 v1 h-1 Z M8 4 h1 v1 h-1 Z M9 4 h1 v1 h-1 Z M10 4 h1 v1 h-1 Z M11 4 h1 v1 h-1 Z M12 4 h1 v1 h-1 Z M13 4 h1 v1 h-1 Z M14 4 h1 v1 h-1 Z M15 4 h1 v1 h-1 Z M7 5 h1 v1 h-1 Z M8 5 h1 v1 h-1 Z M9 5 h1 v1 h-1 Z M10 5 h1 v1 h-1 Z M7 6 h1 v1 h-1 Z M8 6 h1 v1 h-1 Z M9 6 h1 v1 h-1 Z M10 6 h1 v1 h-1 Z M11 6 h1 v1 h-1 Z M12 6 h1 v1 h-1 Z M13 6 h1 v1 h-1 Z M0 7 h1 v1 h-1 Z M1 7 h1 v1 h-1 Z M7 7 h1 v1 h-1 Z M8 7 h1 v1 h-1 Z M9 7 h1 v1 h-1 Z M10 7 h1 v1 h-1 Z M11 7 h1 v1 h-1 Z M0 8 h1 v1 h-1 Z M1 8 h1 v1 h-1 Z M2 8 h1 v1 h-1 Z M6 8 h1 v1 h-1 Z M7 8 h1 v1 h-1 Z M8 8 h1 v1 h-1 Z M9 8 h1 v1 h-1 Z M10 8 h1 v1 h-1 Z M11 8 h1 v1 h-1 Z M0 9 h1 v1 h-1 Z M1 9 h1 v1 h-1 Z M2 9 h1 v1 h-1 Z M3 9 h1 v1 h-1 Z M5 9 h1 v1 h-1 Z M6 9 h1 v1 h-1 Z M7 9 h1 v1 h-1 Z M8 9 h1 v1 h-1 Z M9 9 h1 v1 h-1 Z M10 9 h1 v1 h-1 Z M11 9 h1 v1 h-1 Z M0 10 h1 v1 h-1 Z M1 10 h1 v1 h-1 Z M2 10 h1 v1 h-1 Z M3 10 h1 v1 h-1 Z M4 10 h1 v1 h-1 Z M5 10 h1 v1 h-1 Z M6 10 h1 v1 h-1 Z M7 10 h1 v1 h-1 Z M8 10 h1 v1 h-1 Z M9 10 h1 v1 h-1 Z M10 10 h1 v1 h-1 Z M11 10 h1 v1 h-1 Z M1 11 h1 v1 h-1 Z M2 11 h1 v1 h-1 Z M3 11 h1 v1 h-1 Z M4 11 h1 v1 h-1 Z M5 11 h1 v1 h-1 Z M6 11 h1 v1 h-1 Z M7 11 h1 v1 h-1 Z M8 11 h1 v1 h-1 Z M9 11 h1 v1 h-1 Z M10 11 h1 v1 h-1 Z M11 11 h1 v1 h-1 Z M2 12 h1 v1 h-1 Z M3 12 h1 v1 h-1 Z M4 12 h1 v1 h-1 Z M5 12 h1 v1 h-1 Z M6 12 h1 v1 h-1 Z M7 12 h1 v1 h-1 Z M8 12 h1 v1 h-1 Z M9 12 h1 v1 h-1 Z M10 12 h1 v1 h-1 Z M3 13 h1 v1 h-1 Z M4 13 h1 v1 h-1 Z M5 13 h1 v1 h-1 Z M6 13 h1 v1 h-1 Z M7 13 h1 v1 h-1 Z M8 13 h1 v1 h-1 Z M9 13 h1 v1 h-1 Z M4 14 h1 v1 h-1 Z M5 14 h1 v1 h-1 Z M8 14 h1 v1 h-1 Z M4 15 h1 v1 h-1 Z M5 15 h1 v1 h-1 Z M8 15 h1 v1 h-1 Z M4 16 h1 v1 h-1 Z M8 16 h1 v1 h-1 Z M3 17 h1 v1 h-1 Z M4 17 h1 v1 h-1 Z M8 17 h1 v1 h-1 Z M9 17 h1 v1 h-1 Z "
        );
      }
      if (cloudsRef.current) {
        const children = cloudsRef.current.children;
        for (let i = 0; i < state.clouds.length; i++) {
          const el = children[i] as HTMLElement;
          if (el) el.style.left = `${state.clouds[i].x}%`;
        }
      }
      if (obstaclesRef.current) {
        const children = obstaclesRef.current.children;
        for (let i = 0; i < 4; i++) {
          const obs = state.obstacles[i];
          const el = children[i] as HTMLElement;
          if (!el) continue;
          if (obs) {
            el.style.display = "block";
            el.style.left = `${obs.x}%`;
          } else {
            el.style.display = "none";
          }
        }
      }

      requestRef = requestAnimationFrame(update);
    };

    requestRef = requestAnimationFrame(update);
    return () => cancelAnimationFrame(requestRef);
  }, []);

  const formattedCurrent = String(currentPage).padStart(2, "0");
  const formattedTotal = String(totalPages).padStart(2, "0");

  return (
    <>
      <style>
        {`
          @keyframes dashMove {
            to { stroke-dashoffset: -40; }
          }
          .pixel-border {
            stroke-dasharray: 20 8 40 8 80 8;
            animation: dashMove 30s linear infinite;
          }
        `}
      </style>

      <div
        className={twMerge(
          "relative w-full max-w-[500px] sm:max-w-[560px] md:max-w-[620px] h-[72px] md:h-[80px] mx-auto flex items-center justify-between px-4 sm:px-8",
          "rounded-[36px] md:rounded-[40px] bg-[#ffffff] transition-all duration-300",
          "shadow-[0_8px_32px_rgba(30,30,47,0.06),0_0_24px_rgba(180,0,35,0.05)] hover:shadow-[0_8px_32px_rgba(180,0,35,0.15)]",
          "overflow-hidden select-none"
        )}
      >
        {/* Animated SVG Pill Border */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none rounded-[36px] md:rounded-[40px]"
          preserveAspectRatio="none"
          width="100%"
          height="100%"
        >
          <rect
            x="1.5"
            y="1.5"
            width="calc(100% - 3px)"
            height="calc(100% - 3px)"
            rx="36"
            ry="36"
            fill="none"
            stroke="#b40023"
            strokeWidth="2.5"
            className="pixel-border opacity-85 transition-opacity duration-300"
          />
        </svg>

        {/* Pixel Ground Line */}
        <div className="absolute bottom-[13px] left-5 right-5 border-b-[2px] border-dotted border-[#b40023]/40 pointer-events-none" />

        {/* Moving Clouds in Background */}
        <div ref={cloudsRef} className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg
            viewBox="0 0 16 4"
            className="absolute top-[14%] w-[32px] h-[8px] fill-[#b40023] opacity-20"
            style={{ shapeRendering: "crispEdges", left: "20%" }}
          >
            <path d="M6 0 h1 v1 h-1 Z M7 0 h1 v1 h-1 Z M8 0 h1 v1 h-1 Z M9 0 h1 v1 h-1 Z M3 1 h1 v1 h-1 Z M4 1 h1 v1 h-1 Z M5 1 h1 v1 h-1 Z M6 1 h1 v1 h-1 Z M7 1 h1 v1 h-1 Z M8 1 h1 v1 h-1 Z M9 1 h1 v1 h-1 Z M10 1 h1 v1 h-1 Z M11 1 h1 v1 h-1 Z M14 1 h1 v1 h-1 Z M1 2 h1 v1 h-1 Z M2 2 h1 v1 h-1 Z M3 2 h1 v1 h-1 Z M4 2 h1 v1 h-1 Z M5 2 h1 v1 h-1 Z M6 2 h1 v1 h-1 Z M7 2 h1 v1 h-1 Z M8 2 h1 v1 h-1 Z M9 2 h1 v1 h-1 Z M10 2 h1 v1 h-1 Z M11 2 h1 v1 h-1 Z M12 2 h1 v1 h-1 Z M13 2 h1 v1 h-1 Z M14 2 h1 v1 h-1 Z M15 2 h1 v1 h-1 Z M0 3 h1 v1 h-1 Z M1 3 h1 v1 h-1 Z M2 3 h1 v1 h-1 Z M3 3 h1 v1 h-1 Z M4 3 h1 v1 h-1 Z M5 3 h1 v1 h-1 Z M6 3 h1 v1 h-1 Z M7 3 h1 v1 h-1 Z M8 3 h1 v1 h-1 Z M9 3 h1 v1 h-1 Z M10 3 h1 v1 h-1 Z M11 3 h1 v1 h-1 Z M12 3 h1 v1 h-1 Z M13 3 h1 v1 h-1 Z M14 3 h1 v1 h-1 Z M15 3 h1 v1 h-1 Z " />
          </svg>
          <svg
            viewBox="0 0 16 4"
            className="absolute top-[24%] w-[24px] h-[6px] fill-[#b40023] opacity-15"
            style={{ shapeRendering: "crispEdges", left: "70%" }}
          >
            <path d="M6 0 h1 v1 h-1 Z M7 0 h1 v1 h-1 Z M8 0 h1 v1 h-1 Z M9 0 h1 v1 h-1 Z M3 1 h1 v1 h-1 Z M4 1 h1 v1 h-1 Z M5 1 h1 v1 h-1 Z M6 1 h1 v1 h-1 Z M7 1 h1 v1 h-1 Z M8 1 h1 v1 h-1 Z M9 1 h1 v1 h-1 Z M10 1 h1 v1 h-1 Z M11 1 h1 v1 h-1 Z M14 1 h1 v1 h-1 Z M1 2 h1 v1 h-1 Z M2 2 h1 v1 h-1 Z M3 2 h1 v1 h-1 Z M4 2 h1 v1 h-1 Z M5 2 h1 v1 h-1 Z M6 2 h1 v1 h-1 Z M7 2 h1 v1 h-1 Z M8 2 h1 v1 h-1 Z M9 2 h1 v1 h-1 Z M10 2 h1 v1 h-1 Z M11 2 h1 v1 h-1 Z M12 2 h1 v1 h-1 Z M13 2 h1 v1 h-1 Z M14 2 h1 v1 h-1 Z M15 2 h1 v1 h-1 Z M0 3 h1 v1 h-1 Z M1 3 h1 v1 h-1 Z M2 3 h1 v1 h-1 Z M3 3 h1 v1 h-1 Z M4 3 h1 v1 h-1 Z M5 3 h1 v1 h-1 Z M6 3 h1 v1 h-1 Z M7 3 h1 v1 h-1 Z M8 3 h1 v1 h-1 Z M9 3 h1 v1 h-1 Z M10 3 h1 v1 h-1 Z M11 3 h1 v1 h-1 Z M12 3 h1 v1 h-1 Z M13 3 h1 v1 h-1 Z M14 3 h1 v1 h-1 Z M15 3 h1 v1 h-1 Z " />
          </svg>
        </div>

        {/* Moving Obstacles Pool */}
        <div ref={obstaclesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 10 9" className="absolute bottom-[13px] w-[14px] h-[12.6px] fill-[#b40023] opacity-80 hidden" style={{ shapeRendering: "crispEdges" }}>
            <path d="M4 0 h1 v1 h-1 Z M5 0 h1 v1 h-1 Z M1 1 h1 v1 h-1 Z M4 1 h1 v1 h-1 Z M5 1 h1 v1 h-1 Z M8 1 h1 v1 h-1 Z M0 2 h1 v1 h-1 Z M1 2 h1 v1 h-1 Z M4 2 h1 v1 h-1 Z M5 2 h1 v1 h-1 Z M8 2 h1 v1 h-1 Z M9 2 h1 v1 h-1 Z M0 3 h1 v1 h-1 Z M1 3 h1 v1 h-1 Z M4 3 h1 v1 h-1 Z M5 3 h1 v1 h-1 Z M8 3 h1 v1 h-1 Z M9 3 h1 v1 h-1 Z M0 4 h1 v1 h-1 Z M1 4 h1 v1 h-1 Z M4 4 h1 v1 h-1 Z M5 4 h1 v1 h-1 Z M8 4 h1 v1 h-1 Z M9 4 h1 v1 h-1 Z M1 5 h1 v1 h-1 Z M2 5 h1 v1 h-1 Z M3 5 h1 v1 h-1 Z M4 5 h1 v1 h-1 Z M5 5 h1 v1 h-1 Z M8 5 h1 v1 h-1 Z M9 5 h1 v1 h-1 Z M2 6 h1 v1 h-1 Z M3 6 h1 v1 h-1 Z M4 6 h1 v1 h-1 Z M5 6 h1 v1 h-1 Z M7 6 h1 v1 h-1 Z M8 6 h1 v1 h-1 Z M9 6 h1 v1 h-1 Z M4 7 h1 v1 h-1 Z M5 7 h1 v1 h-1 Z M4 8 h1 v1 h-1 Z M5 8 h1 v1 h-1 Z " />
          </svg>
          <svg viewBox="0 0 10 9" className="absolute bottom-[13px] w-[14px] h-[12.6px] fill-[#b40023] opacity-80 hidden" style={{ shapeRendering: "crispEdges" }}>
            <path d="M4 0 h1 v1 h-1 Z M5 0 h1 v1 h-1 Z M1 1 h1 v1 h-1 Z M4 1 h1 v1 h-1 Z M5 1 h1 v1 h-1 Z M8 1 h1 v1 h-1 Z M0 2 h1 v1 h-1 Z M1 2 h1 v1 h-1 Z M4 2 h1 v1 h-1 Z M5 2 h1 v1 h-1 Z M8 2 h1 v1 h-1 Z M9 2 h1 v1 h-1 Z M0 3 h1 v1 h-1 Z M1 3 h1 v1 h-1 Z M4 3 h1 v1 h-1 Z M5 3 h1 v1 h-1 Z M8 3 h1 v1 h-1 Z M9 3 h1 v1 h-1 Z M0 4 h1 v1 h-1 Z M1 4 h1 v1 h-1 Z M4 4 h1 v1 h-1 Z M5 4 h1 v1 h-1 Z M8 4 h1 v1 h-1 Z M9 4 h1 v1 h-1 Z M1 5 h1 v1 h-1 Z M2 5 h1 v1 h-1 Z M3 5 h1 v1 h-1 Z M4 5 h1 v1 h-1 Z M5 5 h1 v1 h-1 Z M8 5 h1 v1 h-1 Z M9 5 h1 v1 h-1 Z M2 6 h1 v1 h-1 Z M3 6 h1 v1 h-1 Z M4 6 h1 v1 h-1 Z M5 6 h1 v1 h-1 Z M7 6 h1 v1 h-1 Z M8 6 h1 v1 h-1 Z M9 6 h1 v1 h-1 Z M4 7 h1 v1 h-1 Z M5 7 h1 v1 h-1 Z M4 8 h1 v1 h-1 Z M5 8 h1 v1 h-1 Z " />
          </svg>
          <svg viewBox="0 0 10 9" className="absolute bottom-[13px] w-[14px] h-[12.6px] fill-[#b40023] opacity-80 hidden" style={{ shapeRendering: "crispEdges" }}>
            <path d="M4 0 h1 v1 h-1 Z M5 0 h1 v1 h-1 Z M1 1 h1 v1 h-1 Z M4 1 h1 v1 h-1 Z M5 1 h1 v1 h-1 Z M8 1 h1 v1 h-1 Z M0 2 h1 v1 h-1 Z M1 2 h1 v1 h-1 Z M4 2 h1 v1 h-1 Z M5 2 h1 v1 h-1 Z M8 2 h1 v1 h-1 Z M9 2 h1 v1 h-1 Z M0 3 h1 v1 h-1 Z M1 3 h1 v1 h-1 Z M4 3 h1 v1 h-1 Z M5 3 h1 v1 h-1 Z M8 3 h1 v1 h-1 Z M9 3 h1 v1 h-1 Z M0 4 h1 v1 h-1 Z M1 4 h1 v1 h-1 Z M4 4 h1 v1 h-1 Z M5 4 h1 v1 h-1 Z M8 4 h1 v1 h-1 Z M9 4 h1 v1 h-1 Z M1 5 h1 v1 h-1 Z M2 5 h1 v1 h-1 Z M3 5 h1 v1 h-1 Z M4 5 h1 v1 h-1 Z M5 5 h1 v1 h-1 Z M8 5 h1 v1 h-1 Z M9 5 h1 v1 h-1 Z M2 6 h1 v1 h-1 Z M3 6 h1 v1 h-1 Z M4 6 h1 v1 h-1 Z M5 6 h1 v1 h-1 Z M7 6 h1 v1 h-1 Z M8 6 h1 v1 h-1 Z M9 6 h1 v1 h-1 Z M4 7 h1 v1 h-1 Z M5 7 h1 v1 h-1 Z M4 8 h1 v1 h-1 Z M5 8 h1 v1 h-1 Z " />
          </svg>
          <svg viewBox="0 0 10 9" className="absolute bottom-[13px] w-[14px] h-[12.6px] fill-[#b40023] opacity-80 hidden" style={{ shapeRendering: "crispEdges" }}>
            <path d="M4 0 h1 v1 h-1 Z M5 0 h1 v1 h-1 Z M1 1 h1 v1 h-1 Z M4 1 h1 v1 h-1 Z M5 1 h1 v1 h-1 Z M8 1 h1 v1 h-1 Z M0 2 h1 v1 h-1 Z M1 2 h1 v1 h-1 Z M4 2 h1 v1 h-1 Z M5 2 h1 v1 h-1 Z M8 2 h1 v1 h-1 Z M9 2 h1 v1 h-1 Z M0 3 h1 v1 h-1 Z M1 3 h1 v1 h-1 Z M4 3 h1 v1 h-1 Z M5 3 h1 v1 h-1 Z M8 3 h1 v1 h-1 Z M9 3 h1 v1 h-1 Z M0 4 h1 v1 h-1 Z M1 4 h1 v1 h-1 Z M4 4 h1 v1 h-1 Z M5 4 h1 v1 h-1 Z M8 4 h1 v1 h-1 Z M9 4 h1 v1 h-1 Z M1 5 h1 v1 h-1 Z M2 5 h1 v1 h-1 Z M3 5 h1 v1 h-1 Z M4 5 h1 v1 h-1 Z M5 5 h1 v1 h-1 Z M8 5 h1 v1 h-1 Z M9 5 h1 v1 h-1 Z M2 6 h1 v1 h-1 Z M3 6 h1 v1 h-1 Z M4 6 h1 v1 h-1 Z M5 6 h1 v1 h-1 Z M7 6 h1 v1 h-1 Z M8 6 h1 v1 h-1 Z M9 6 h1 v1 h-1 Z M4 7 h1 v1 h-1 Z M5 7 h1 v1 h-1 Z M4 8 h1 v1 h-1 Z M5 8 h1 v1 h-1 Z " />
          </svg>
        </div>

        {/* ── Foreground Layout: [ dinosaur ]   ← PREVIOUS        02 / 02        NEXT → ── */}
        <div className="relative z-20 flex items-center justify-between w-full h-full">
          {/* Left Side: Dedicated Dinosaur Area + PREVIOUS Button */}
          <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
            {/* Dedicated Dinosaur Running Box */}
            <div className="relative flex items-end h-[36px] w-[30px] sm:w-[34px] shrink-0 pointer-events-none pb-[1px]">
              <div ref={dinoContainerRef} className="w-[28px] h-[31.5px] origin-bottom">
                <svg
                  viewBox="0 0 16 18"
                  className="w-full h-full fill-[#b40023] opacity-100 drop-shadow-[0_0_8px_rgba(180,0,35,0.45)]"
                  style={{ shapeRendering: "crispEdges" }}
                >
                  <path ref={dinoRef} d="M8 0 h1 v1 h-1 Z M9 0 h1 v1 h-1 Z M10 0 h1 v1 h-1 Z M11 0 h1 v1 h-1 Z M12 0 h1 v1 h-1 Z M13 0 h1 v1 h-1 Z M14 0 h1 v1 h-1 Z M15 0 h1 v1 h-1 Z M7 1 h1 v1 h-1 Z M8 1 h1 v1 h-1 Z M9 1 h1 v1 h-1 Z M10 1 h1 v1 h-1 Z M11 1 h1 v1 h-1 Z M12 1 h1 v1 h-1 Z M13 1 h1 v1 h-1 Z M14 1 h1 v1 h-1 Z M15 1 h1 v1 h-1 Z M7 2 h1 v1 h-1 Z M8 2 h1 v1 h-1 Z M10 2 h1 v1 h-1 Z M12 2 h1 v1 h-1 Z M13 2 h1 v1 h-1 Z M14 2 h1 v1 h-1 Z M15 2 h1 v1 h-1 Z M7 3 h1 v1 h-1 Z M8 3 h1 v1 h-1 Z M9 3 h1 v1 h-1 Z M10 3 h1 v1 h-1 Z M11 3 h1 v1 h-1 Z M12 3 h1 v1 h-1 Z M13 3 h1 v1 h-1 Z M14 3 h1 v1 h-1 Z M15 3 h1 v1 h-1 Z M7 4 h1 v1 h-1 Z M8 4 h1 v1 h-1 Z M9 4 h1 v1 h-1 Z M10 4 h1 v1 h-1 Z M11 4 h1 v1 h-1 Z M12 4 h1 v1 h-1 Z M13 4 h1 v1 h-1 Z M14 4 h1 v1 h-1 Z M15 4 h1 v1 h-1 Z M7 5 h1 v1 h-1 Z M8 5 h1 v1 h-1 Z M9 5 h1 v1 h-1 Z M10 5 h1 v1 h-1 Z M7 6 h1 v1 h-1 Z M8 6 h1 v1 h-1 Z M9 6 h1 v1 h-1 Z M10 6 h1 v1 h-1 Z M11 6 h1 v1 h-1 Z M12 6 h1 v1 h-1 Z M13 6 h1 v1 h-1 Z M0 7 h1 v1 h-1 Z M1 7 h1 v1 h-1 Z M7 7 h1 v1 h-1 Z M8 7 h1 v1 h-1 Z M9 7 h1 v1 h-1 Z M10 7 h1 v1 h-1 Z M11 7 h1 v1 h-1 Z M0 8 h1 v1 h-1 Z M1 8 h1 v1 h-1 Z M2 8 h1 v1 h-1 Z M6 8 h1 v1 h-1 Z M7 8 h1 v1 h-1 Z M8 8 h1 v1 h-1 Z M9 8 h1 v1 h-1 Z M10 8 h1 v1 h-1 Z M11 8 h1 v1 h-1 Z M0 9 h1 v1 h-1 Z M1 9 h1 v1 h-1 Z M2 9 h1 v1 h-1 Z M3 9 h1 v1 h-1 Z M5 9 h1 v1 h-1 Z M6 9 h1 v1 h-1 Z M7 9 h1 v1 h-1 Z M8 9 h1 v1 h-1 Z M9 9 h1 v1 h-1 Z M10 9 h1 v1 h-1 Z M11 9 h1 v1 h-1 Z M0 10 h1 v1 h-1 Z M1 10 h1 v1 h-1 Z M2 10 h1 v1 h-1 Z M3 10 h1 v1 h-1 Z M4 10 h1 v1 h-1 Z M5 10 h1 v1 h-1 Z M6 10 h1 v1 h-1 Z M7 10 h1 v1 h-1 Z M8 10 h1 v1 h-1 Z M9 10 h1 v1 h-1 Z M10 10 h1 v1 h-1 Z M11 10 h1 v1 h-1 Z M1 11 h1 v1 h-1 Z M2 11 h1 v1 h-1 Z M3 11 h1 v1 h-1 Z M4 11 h1 v1 h-1 Z M5 11 h1 v1 h-1 Z M6 11 h1 v1 h-1 Z M7 11 h1 v1 h-1 Z M8 11 h1 v1 h-1 Z M9 11 h1 v1 h-1 Z M10 11 h1 v1 h-1 Z M11 11 h1 v1 h-1 Z M2 12 h1 v1 h-1 Z M3 12 h1 v1 h-1 Z M4 12 h1 v1 h-1 Z M5 12 h1 v1 h-1 Z M6 12 h1 v1 h-1 Z M7 12 h1 v1 h-1 Z M8 12 h1 v1 h-1 Z M9 12 h1 v1 h-1 Z M10 12 h1 v1 h-1 Z M3 13 h1 v1 h-1 Z M4 13 h1 v1 h-1 Z M5 13 h1 v1 h-1 Z M6 13 h1 v1 h-1 Z M7 13 h1 v1 h-1 Z M8 13 h1 v1 h-1 Z M9 13 h1 v1 h-1 Z M4 14 h1 v1 h-1 Z M5 14 h1 v1 h-1 Z M8 14 h1 v1 h-1 Z M4 15 h1 v1 h-1 Z M5 15 h1 v1 h-1 Z M8 15 h1 v1 h-1 Z M4 16 h1 v1 h-1 Z M8 16 h1 v1 h-1 Z M3 17 h1 v1 h-1 Z M4 17 h1 v1 h-1 Z M8 17 h1 v1 h-1 Z M9 17 h1 v1 h-1 Z " />
                </svg>
              </div>
            </div>

            {/* ← PREVIOUS Button */}
            <button
              onClick={onPrev}
              disabled={currentPage === 1}
              aria-label="Previous projects"
              className="group flex items-center gap-1.5 sm:gap-2 font-researcher text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#1e1e2f] transition-all duration-300 hover:text-[#b40023] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-[#1e1e2f] cursor-pointer outline-none whitespace-nowrap"
            >
              <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1 group-disabled:translate-x-0 text-[13px] sm:text-[14px]">
                ←
              </span>
              <span>PREVIOUS</span>
            </button>
          </div>

          {/* Center: Page Indicator 01 / XX */}
          <div className="flex items-center gap-1.5 sm:gap-2 font-researcher text-[12px] sm:text-[13px] font-black tracking-[0.2em] px-3.5 sm:px-4 py-1.5 rounded-full border border-[#1e1e2f]/15 bg-[#ffffff]/90 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] backdrop-blur-sm select-none mx-2 sm:mx-4 shrink-0">
            <span className="text-[#b40023]">{formattedCurrent}</span>
            <span className="text-[#746f70]/40">/</span>
            <span className="text-[#1e1e2f]">{formattedTotal}</span>
          </div>

          {/* Right Side: NEXT → Button */}
          <button
            onClick={onNext}
            disabled={currentPage === totalPages}
            aria-label="Next projects"
            className="group flex items-center gap-1.5 sm:gap-2 font-researcher text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#1e1e2f] transition-all duration-300 hover:text-[#b40023] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-[#1e1e2f] cursor-pointer outline-none whitespace-nowrap shrink-0"
          >
            <span>NEXT</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-disabled:translate-x-0 text-[13px] sm:text-[14px]">
              →
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
