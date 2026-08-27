"use client";

import React, { useState, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  onClick: () => void;
  expanded: boolean;
}

export function PixelSeeMoreButton({ onClick, expanded }: Props) {
  const dinoRef = useRef<SVGPathElement>(null);
  const dinoContainerRef = useRef<HTMLDivElement>(null);
  const obstaclesRef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<HTMLDivElement>(null);

  const gameState = useRef({
    dinoY: 0,
    dinoVy: 0,
    isJumping: false,
    obstacles: [] as { id: number; x: number }[],
    clouds: [
      { id: 1, x: 20, y: 15, speed: 0.005 },
      { id: 2, x: 70, y: 30, speed: 0.007 },
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
      if (!gameState.current.lastTime) gameState.current.lastTime = time;
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
        state.walkFrame = 0; // Freeze frame when jumping
      }

      // --- Dino Jump Physics ---
      if (state.isJumping) {
        state.dinoVy -= 0.0008 * dt; // Gravity
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
      const speed = 0.03 * dt; // Obstacle speed
      state.obstacles.forEach((o) => {
        o.x -= speed;
      });

      // --- Spawning Obstacles ---
      if (time - state.lastSpawnTime > 1800 + Math.random() * 1500) {
        state.obstacles.push({ id: state.obsIdCounter++, x: 120 });
        state.lastSpawnTime = time;
      }

      // --- Cleanup old obstacles ---
      state.obstacles = state.obstacles.filter((o) => o.x > -20);

      // --- Auto-Jump Logic ---
      // Dino is fixed around x=12%. Jump takes exactly 550ms.
      // Max height is 30px (clears the 12.6px cactus safely).
      // Trigger jump when obstacle is exactly between 18% and 21.5% to ensure it clears underneath.
      const closestObstacle = state.obstacles.find((o) => o.x > 18 && o.x <= 21.5);
      if (closestObstacle && !state.isJumping) {
        state.isJumping = true;
        state.dinoVy = 0.22; // Initial jump velocity
      }

      // --- DOM Updates ---
      if (dinoContainerRef.current) {
        dinoContainerRef.current.style.transform = `translateY(-${state.dinoY}px)`;
      }
      if (dinoRef.current) {
        dinoRef.current.setAttribute("d", state.walkFrame === 0 ? "M8 0 h1 v1 h-1 Z M9 0 h1 v1 h-1 Z M10 0 h1 v1 h-1 Z M11 0 h1 v1 h-1 Z M12 0 h1 v1 h-1 Z M13 0 h1 v1 h-1 Z M14 0 h1 v1 h-1 Z M15 0 h1 v1 h-1 Z M7 1 h1 v1 h-1 Z M8 1 h1 v1 h-1 Z M9 1 h1 v1 h-1 Z M10 1 h1 v1 h-1 Z M11 1 h1 v1 h-1 Z M12 1 h1 v1 h-1 Z M13 1 h1 v1 h-1 Z M14 1 h1 v1 h-1 Z M15 1 h1 v1 h-1 Z M7 2 h1 v1 h-1 Z M8 2 h1 v1 h-1 Z M10 2 h1 v1 h-1 Z M12 2 h1 v1 h-1 Z M13 2 h1 v1 h-1 Z M14 2 h1 v1 h-1 Z M15 2 h1 v1 h-1 Z M7 3 h1 v1 h-1 Z M8 3 h1 v1 h-1 Z M9 3 h1 v1 h-1 Z M10 3 h1 v1 h-1 Z M11 3 h1 v1 h-1 Z M12 3 h1 v1 h-1 Z M13 3 h1 v1 h-1 Z M14 3 h1 v1 h-1 Z M15 3 h1 v1 h-1 Z M7 4 h1 v1 h-1 Z M8 4 h1 v1 h-1 Z M9 4 h1 v1 h-1 Z M10 4 h1 v1 h-1 Z M11 4 h1 v1 h-1 Z M12 4 h1 v1 h-1 Z M13 4 h1 v1 h-1 Z M14 4 h1 v1 h-1 Z M15 4 h1 v1 h-1 Z M7 5 h1 v1 h-1 Z M8 5 h1 v1 h-1 Z M9 5 h1 v1 h-1 Z M10 5 h1 v1 h-1 Z M7 6 h1 v1 h-1 Z M8 6 h1 v1 h-1 Z M9 6 h1 v1 h-1 Z M10 6 h1 v1 h-1 Z M11 6 h1 v1 h-1 Z M12 6 h1 v1 h-1 Z M13 6 h1 v1 h-1 Z M0 7 h1 v1 h-1 Z M1 7 h1 v1 h-1 Z M7 7 h1 v1 h-1 Z M8 7 h1 v1 h-1 Z M9 7 h1 v1 h-1 Z M10 7 h1 v1 h-1 Z M11 7 h1 v1 h-1 Z M0 8 h1 v1 h-1 Z M1 8 h1 v1 h-1 Z M2 8 h1 v1 h-1 Z M6 8 h1 v1 h-1 Z M7 8 h1 v1 h-1 Z M8 8 h1 v1 h-1 Z M9 8 h1 v1 h-1 Z M10 8 h1 v1 h-1 Z M11 8 h1 v1 h-1 Z M0 9 h1 v1 h-1 Z M1 9 h1 v1 h-1 Z M2 9 h1 v1 h-1 Z M3 9 h1 v1 h-1 Z M5 9 h1 v1 h-1 Z M6 9 h1 v1 h-1 Z M7 9 h1 v1 h-1 Z M8 9 h1 v1 h-1 Z M9 9 h1 v1 h-1 Z M10 9 h1 v1 h-1 Z M11 9 h1 v1 h-1 Z M0 10 h1 v1 h-1 Z M1 10 h1 v1 h-1 Z M2 10 h1 v1 h-1 Z M3 10 h1 v1 h-1 Z M4 10 h1 v1 h-1 Z M5 10 h1 v1 h-1 Z M6 10 h1 v1 h-1 Z M7 10 h1 v1 h-1 Z M8 10 h1 v1 h-1 Z M9 10 h1 v1 h-1 Z M10 10 h1 v1 h-1 Z M11 10 h1 v1 h-1 Z M1 11 h1 v1 h-1 Z M2 11 h1 v1 h-1 Z M3 11 h1 v1 h-1 Z M4 11 h1 v1 h-1 Z M5 11 h1 v1 h-1 Z M6 11 h1 v1 h-1 Z M7 11 h1 v1 h-1 Z M8 11 h1 v1 h-1 Z M9 11 h1 v1 h-1 Z M10 11 h1 v1 h-1 Z M11 11 h1 v1 h-1 Z M2 12 h1 v1 h-1 Z M3 12 h1 v1 h-1 Z M4 12 h1 v1 h-1 Z M5 12 h1 v1 h-1 Z M6 12 h1 v1 h-1 Z M7 12 h1 v1 h-1 Z M8 12 h1 v1 h-1 Z M9 12 h1 v1 h-1 Z M10 12 h1 v1 h-1 Z M3 13 h1 v1 h-1 Z M4 13 h1 v1 h-1 Z M5 13 h1 v1 h-1 Z M6 13 h1 v1 h-1 Z M7 13 h1 v1 h-1 Z M8 13 h1 v1 h-1 Z M9 13 h1 v1 h-1 Z M4 14 h1 v1 h-1 Z M5 14 h1 v1 h-1 Z M8 14 h1 v1 h-1 Z M4 15 h1 v1 h-1 Z M5 15 h1 v1 h-1 Z M8 15 h1 v1 h-1 Z M4 16 h1 v1 h-1 Z M8 16 h1 v1 h-1 Z M3 17 h1 v1 h-1 Z M4 17 h1 v1 h-1 Z M8 17 h1 v1 h-1 Z M9 17 h1 v1 h-1 Z " : "M8 0 h1 v1 h-1 Z M9 0 h1 v1 h-1 Z M10 0 h1 v1 h-1 Z M11 0 h1 v1 h-1 Z M12 0 h1 v1 h-1 Z M13 0 h1 v1 h-1 Z M14 0 h1 v1 h-1 Z M15 0 h1 v1 h-1 Z M7 1 h1 v1 h-1 Z M8 1 h1 v1 h-1 Z M9 1 h1 v1 h-1 Z M10 1 h1 v1 h-1 Z M11 1 h1 v1 h-1 Z M12 1 h1 v1 h-1 Z M13 1 h1 v1 h-1 Z M14 1 h1 v1 h-1 Z M15 1 h1 v1 h-1 Z M7 2 h1 v1 h-1 Z M8 2 h1 v1 h-1 Z M10 2 h1 v1 h-1 Z M12 2 h1 v1 h-1 Z M13 2 h1 v1 h-1 Z M14 2 h1 v1 h-1 Z M15 2 h1 v1 h-1 Z M7 3 h1 v1 h-1 Z M8 3 h1 v1 h-1 Z M9 3 h1 v1 h-1 Z M10 3 h1 v1 h-1 Z M11 3 h1 v1 h-1 Z M12 3 h1 v1 h-1 Z M13 3 h1 v1 h-1 Z M14 3 h1 v1 h-1 Z M15 3 h1 v1 h-1 Z M7 4 h1 v1 h-1 Z M8 4 h1 v1 h-1 Z M9 4 h1 v1 h-1 Z M10 4 h1 v1 h-1 Z M11 4 h1 v1 h-1 Z M12 4 h1 v1 h-1 Z M13 4 h1 v1 h-1 Z M14 4 h1 v1 h-1 Z M15 4 h1 v1 h-1 Z M7 5 h1 v1 h-1 Z M8 5 h1 v1 h-1 Z M9 5 h1 v1 h-1 Z M10 5 h1 v1 h-1 Z M7 6 h1 v1 h-1 Z M8 6 h1 v1 h-1 Z M9 6 h1 v1 h-1 Z M10 6 h1 v1 h-1 Z M11 6 h1 v1 h-1 Z M12 6 h1 v1 h-1 Z M13 6 h1 v1 h-1 Z M0 7 h1 v1 h-1 Z M1 7 h1 v1 h-1 Z M7 7 h1 v1 h-1 Z M8 7 h1 v1 h-1 Z M9 7 h1 v1 h-1 Z M10 7 h1 v1 h-1 Z M11 7 h1 v1 h-1 Z M0 8 h1 v1 h-1 Z M1 8 h1 v1 h-1 Z M2 8 h1 v1 h-1 Z M6 8 h1 v1 h-1 Z M7 8 h1 v1 h-1 Z M8 8 h1 v1 h-1 Z M9 8 h1 v1 h-1 Z M10 8 h1 v1 h-1 Z M11 8 h1 v1 h-1 Z M0 9 h1 v1 h-1 Z M1 9 h1 v1 h-1 Z M2 9 h1 v1 h-1 Z M3 9 h1 v1 h-1 Z M5 9 h1 v1 h-1 Z M6 9 h1 v1 h-1 Z M7 9 h1 v1 h-1 Z M8 9 h1 v1 h-1 Z M9 9 h1 v1 h-1 Z M10 9 h1 v1 h-1 Z M11 9 h1 v1 h-1 Z M0 10 h1 v1 h-1 Z M1 10 h1 v1 h-1 Z M2 10 h1 v1 h-1 Z M3 10 h1 v1 h-1 Z M4 10 h1 v1 h-1 Z M5 10 h1 v1 h-1 Z M6 10 h1 v1 h-1 Z M7 10 h1 v1 h-1 Z M8 10 h1 v1 h-1 Z M9 10 h1 v1 h-1 Z M10 10 h1 v1 h-1 Z M11 10 h1 v1 h-1 Z M1 11 h1 v1 h-1 Z M2 11 h1 v1 h-1 Z M3 11 h1 v1 h-1 Z M4 11 h1 v1 h-1 Z M5 11 h1 v1 h-1 Z M6 11 h1 v1 h-1 Z M7 11 h1 v1 h-1 Z M8 11 h1 v1 h-1 Z M9 11 h1 v1 h-1 Z M10 11 h1 v1 h-1 Z M11 11 h1 v1 h-1 Z M2 12 h1 v1 h-1 Z M3 12 h1 v1 h-1 Z M4 12 h1 v1 h-1 Z M5 12 h1 v1 h-1 Z M6 12 h1 v1 h-1 Z M7 12 h1 v1 h-1 Z M8 12 h1 v1 h-1 Z M9 12 h1 v1 h-1 Z M10 12 h1 v1 h-1 Z M3 13 h1 v1 h-1 Z M4 13 h1 v1 h-1 Z M5 13 h1 v1 h-1 Z M6 13 h1 v1 h-1 Z M7 13 h1 v1 h-1 Z M8 13 h1 v1 h-1 Z M9 13 h1 v1 h-1 Z M4 14 h1 v1 h-1 Z M8 14 h1 v1 h-1 Z M9 14 h1 v1 h-1 Z M4 15 h1 v1 h-1 Z M5 15 h1 v1 h-1 Z M5 16 h1 v1 h-1 Z M5 17 h1 v1 h-1 Z M6 17 h1 v1 h-1 Z ");
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

  const text = expanded ? "SHOW LESS" : "SEE MORE";

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
          
          @keyframes dashMove {
            to { stroke-dashoffset: -40; }
          }
          .pixel-border {
            stroke-dasharray: 20 8 40 8 80 8;
            animation: dashMove 30s linear infinite;
          }
        `}
      </style>

      <button
        onClick={onClick}
        className={twMerge(
          "group relative w-full max-w-[340px] md:max-w-[380px] h-[65px] md:h-[75px] mx-auto flex items-center justify-center",
          "rounded-[30px] bg-[#ffffff] transition-all duration-300",
          "hover:-translate-y-[2px] hover:shadow-[0_4px_30px_rgba(180,0,35,0.25)]",
          "overflow-hidden cursor-pointer outline-none shadow-sm"
        )}
      >
        {/* SVG Pill Border */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none rounded-[30px]"
          preserveAspectRatio="none"
          width="100%"
          height="100%"
        >
          <rect
            x="1.5"
            y="1.5"
            width="calc(100% - 3px)"
            height="calc(100% - 3px)"
            rx="30"
            ry="30"
            fill="none"
            stroke="#b40023"
            strokeWidth="2.5"
            className="pixel-border opacity-75 group-hover:opacity-100 transition-opacity duration-300"
          />
        </svg>

        {/* Pixel Ground Line */}
        <div className="absolute bottom-[14px] left-6 right-6 border-b-[2px] border-dotted border-[#b40023]/30 group-hover:border-[#b40023]/50 transition-colors duration-300" />

        {/* Moving Clouds */}
        <div ref={cloudsRef} className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 16 4" className="absolute top-[20%] w-[32px] h-[8px] fill-[#b40023] opacity-15" style={{ shapeRendering: "crispEdges", left: '20%' }}>
            <path d="M6 0 h1 v1 h-1 Z M7 0 h1 v1 h-1 Z M8 0 h1 v1 h-1 Z M9 0 h1 v1 h-1 Z M3 1 h1 v1 h-1 Z M4 1 h1 v1 h-1 Z M5 1 h1 v1 h-1 Z M6 1 h1 v1 h-1 Z M7 1 h1 v1 h-1 Z M8 1 h1 v1 h-1 Z M9 1 h1 v1 h-1 Z M10 1 h1 v1 h-1 Z M11 1 h1 v1 h-1 Z M14 1 h1 v1 h-1 Z M1 2 h1 v1 h-1 Z M2 2 h1 v1 h-1 Z M3 2 h1 v1 h-1 Z M4 2 h1 v1 h-1 Z M5 2 h1 v1 h-1 Z M6 2 h1 v1 h-1 Z M7 2 h1 v1 h-1 Z M8 2 h1 v1 h-1 Z M9 2 h1 v1 h-1 Z M10 2 h1 v1 h-1 Z M11 2 h1 v1 h-1 Z M12 2 h1 v1 h-1 Z M13 2 h1 v1 h-1 Z M14 2 h1 v1 h-1 Z M15 2 h1 v1 h-1 Z M0 3 h1 v1 h-1 Z M1 3 h1 v1 h-1 Z M2 3 h1 v1 h-1 Z M3 3 h1 v1 h-1 Z M4 3 h1 v1 h-1 Z M5 3 h1 v1 h-1 Z M6 3 h1 v1 h-1 Z M7 3 h1 v1 h-1 Z M8 3 h1 v1 h-1 Z M9 3 h1 v1 h-1 Z M10 3 h1 v1 h-1 Z M11 3 h1 v1 h-1 Z M12 3 h1 v1 h-1 Z M13 3 h1 v1 h-1 Z M14 3 h1 v1 h-1 Z M15 3 h1 v1 h-1 Z " />
          </svg>
          <svg viewBox="0 0 16 4" className="absolute top-[35%] w-[24px] h-[6px] fill-[#b40023] opacity-10" style={{ shapeRendering: "crispEdges", left: '70%' }}>
            <path d="M6 0 h1 v1 h-1 Z M7 0 h1 v1 h-1 Z M8 0 h1 v1 h-1 Z M9 0 h1 v1 h-1 Z M3 1 h1 v1 h-1 Z M4 1 h1 v1 h-1 Z M5 1 h1 v1 h-1 Z M6 1 h1 v1 h-1 Z M7 1 h1 v1 h-1 Z M8 1 h1 v1 h-1 Z M9 1 h1 v1 h-1 Z M10 1 h1 v1 h-1 Z M11 1 h1 v1 h-1 Z M14 1 h1 v1 h-1 Z M1 2 h1 v1 h-1 Z M2 2 h1 v1 h-1 Z M3 2 h1 v1 h-1 Z M4 2 h1 v1 h-1 Z M5 2 h1 v1 h-1 Z M6 2 h1 v1 h-1 Z M7 2 h1 v1 h-1 Z M8 2 h1 v1 h-1 Z M9 2 h1 v1 h-1 Z M10 2 h1 v1 h-1 Z M11 2 h1 v1 h-1 Z M12 2 h1 v1 h-1 Z M13 2 h1 v1 h-1 Z M14 2 h1 v1 h-1 Z M15 2 h1 v1 h-1 Z M0 3 h1 v1 h-1 Z M1 3 h1 v1 h-1 Z M2 3 h1 v1 h-1 Z M3 3 h1 v1 h-1 Z M4 3 h1 v1 h-1 Z M5 3 h1 v1 h-1 Z M6 3 h1 v1 h-1 Z M7 3 h1 v1 h-1 Z M8 3 h1 v1 h-1 Z M9 3 h1 v1 h-1 Z M10 3 h1 v1 h-1 Z M11 3 h1 v1 h-1 Z M12 3 h1 v1 h-1 Z M13 3 h1 v1 h-1 Z M14 3 h1 v1 h-1 Z M15 3 h1 v1 h-1 Z " />
          </svg>
        </div>

        {/* Moving Obstacles Pool (Max 4 on screen) */}
        <div ref={obstaclesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 10 9" className="absolute bottom-[14px] w-[14px] h-[12.6px] fill-[#b40023] opacity-60 hidden" style={{ shapeRendering: "crispEdges" }}>
            <path d="M4 0 h1 v1 h-1 Z M5 0 h1 v1 h-1 Z M1 1 h1 v1 h-1 Z M4 1 h1 v1 h-1 Z M5 1 h1 v1 h-1 Z M8 1 h1 v1 h-1 Z M0 2 h1 v1 h-1 Z M1 2 h1 v1 h-1 Z M4 2 h1 v1 h-1 Z M5 2 h1 v1 h-1 Z M8 2 h1 v1 h-1 Z M9 2 h1 v1 h-1 Z M0 3 h1 v1 h-1 Z M1 3 h1 v1 h-1 Z M4 3 h1 v1 h-1 Z M5 3 h1 v1 h-1 Z M8 3 h1 v1 h-1 Z M9 3 h1 v1 h-1 Z M0 4 h1 v1 h-1 Z M1 4 h1 v1 h-1 Z M4 4 h1 v1 h-1 Z M5 4 h1 v1 h-1 Z M8 4 h1 v1 h-1 Z M9 4 h1 v1 h-1 Z M1 5 h1 v1 h-1 Z M2 5 h1 v1 h-1 Z M3 5 h1 v1 h-1 Z M4 5 h1 v1 h-1 Z M5 5 h1 v1 h-1 Z M8 5 h1 v1 h-1 Z M9 5 h1 v1 h-1 Z M2 6 h1 v1 h-1 Z M3 6 h1 v1 h-1 Z M4 6 h1 v1 h-1 Z M5 6 h1 v1 h-1 Z M7 6 h1 v1 h-1 Z M8 6 h1 v1 h-1 Z M9 6 h1 v1 h-1 Z M4 7 h1 v1 h-1 Z M5 7 h1 v1 h-1 Z M4 8 h1 v1 h-1 Z M5 8 h1 v1 h-1 Z " />
          </svg>
          <svg viewBox="0 0 10 9" className="absolute bottom-[14px] w-[14px] h-[12.6px] fill-[#b40023] opacity-60 hidden" style={{ shapeRendering: "crispEdges" }}>
            <path d="M4 0 h1 v1 h-1 Z M5 0 h1 v1 h-1 Z M1 1 h1 v1 h-1 Z M4 1 h1 v1 h-1 Z M5 1 h1 v1 h-1 Z M8 1 h1 v1 h-1 Z M0 2 h1 v1 h-1 Z M1 2 h1 v1 h-1 Z M4 2 h1 v1 h-1 Z M5 2 h1 v1 h-1 Z M8 2 h1 v1 h-1 Z M9 2 h1 v1 h-1 Z M0 3 h1 v1 h-1 Z M1 3 h1 v1 h-1 Z M4 3 h1 v1 h-1 Z M5 3 h1 v1 h-1 Z M8 3 h1 v1 h-1 Z M9 3 h1 v1 h-1 Z M0 4 h1 v1 h-1 Z M1 4 h1 v1 h-1 Z M4 4 h1 v1 h-1 Z M5 4 h1 v1 h-1 Z M8 4 h1 v1 h-1 Z M9 4 h1 v1 h-1 Z M1 5 h1 v1 h-1 Z M2 5 h1 v1 h-1 Z M3 5 h1 v1 h-1 Z M4 5 h1 v1 h-1 Z M5 5 h1 v1 h-1 Z M8 5 h1 v1 h-1 Z M9 5 h1 v1 h-1 Z M2 6 h1 v1 h-1 Z M3 6 h1 v1 h-1 Z M4 6 h1 v1 h-1 Z M5 6 h1 v1 h-1 Z M7 6 h1 v1 h-1 Z M8 6 h1 v1 h-1 Z M9 6 h1 v1 h-1 Z M4 7 h1 v1 h-1 Z M5 7 h1 v1 h-1 Z M4 8 h1 v1 h-1 Z M5 8 h1 v1 h-1 Z " />
          </svg>
          <svg viewBox="0 0 10 9" className="absolute bottom-[14px] w-[14px] h-[12.6px] fill-[#b40023] opacity-60 hidden" style={{ shapeRendering: "crispEdges" }}>
            <path d="M4 0 h1 v1 h-1 Z M5 0 h1 v1 h-1 Z M1 1 h1 v1 h-1 Z M4 1 h1 v1 h-1 Z M5 1 h1 v1 h-1 Z M8 1 h1 v1 h-1 Z M0 2 h1 v1 h-1 Z M1 2 h1 v1 h-1 Z M4 2 h1 v1 h-1 Z M5 2 h1 v1 h-1 Z M8 2 h1 v1 h-1 Z M9 2 h1 v1 h-1 Z M0 3 h1 v1 h-1 Z M1 3 h1 v1 h-1 Z M4 3 h1 v1 h-1 Z M5 3 h1 v1 h-1 Z M8 3 h1 v1 h-1 Z M9 3 h1 v1 h-1 Z M0 4 h1 v1 h-1 Z M1 4 h1 v1 h-1 Z M4 4 h1 v1 h-1 Z M5 4 h1 v1 h-1 Z M8 4 h1 v1 h-1 Z M9 4 h1 v1 h-1 Z M1 5 h1 v1 h-1 Z M2 5 h1 v1 h-1 Z M3 5 h1 v1 h-1 Z M4 5 h1 v1 h-1 Z M5 5 h1 v1 h-1 Z M8 5 h1 v1 h-1 Z M9 5 h1 v1 h-1 Z M2 6 h1 v1 h-1 Z M3 6 h1 v1 h-1 Z M4 6 h1 v1 h-1 Z M5 6 h1 v1 h-1 Z M7 6 h1 v1 h-1 Z M8 6 h1 v1 h-1 Z M9 6 h1 v1 h-1 Z M4 7 h1 v1 h-1 Z M5 7 h1 v1 h-1 Z M4 8 h1 v1 h-1 Z M5 8 h1 v1 h-1 Z " />
          </svg>
          <svg viewBox="0 0 10 9" className="absolute bottom-[14px] w-[14px] h-[12.6px] fill-[#b40023] opacity-60 hidden" style={{ shapeRendering: "crispEdges" }}>
            <path d="M4 0 h1 v1 h-1 Z M5 0 h1 v1 h-1 Z M1 1 h1 v1 h-1 Z M4 1 h1 v1 h-1 Z M5 1 h1 v1 h-1 Z M8 1 h1 v1 h-1 Z M0 2 h1 v1 h-1 Z M1 2 h1 v1 h-1 Z M4 2 h1 v1 h-1 Z M5 2 h1 v1 h-1 Z M8 2 h1 v1 h-1 Z M9 2 h1 v1 h-1 Z M0 3 h1 v1 h-1 Z M1 3 h1 v1 h-1 Z M4 3 h1 v1 h-1 Z M5 3 h1 v1 h-1 Z M8 3 h1 v1 h-1 Z M9 3 h1 v1 h-1 Z M0 4 h1 v1 h-1 Z M1 4 h1 v1 h-1 Z M4 4 h1 v1 h-1 Z M5 4 h1 v1 h-1 Z M8 4 h1 v1 h-1 Z M9 4 h1 v1 h-1 Z M1 5 h1 v1 h-1 Z M2 5 h1 v1 h-1 Z M3 5 h1 v1 h-1 Z M4 5 h1 v1 h-1 Z M5 5 h1 v1 h-1 Z M8 5 h1 v1 h-1 Z M9 5 h1 v1 h-1 Z M2 6 h1 v1 h-1 Z M3 6 h1 v1 h-1 Z M4 6 h1 v1 h-1 Z M5 6 h1 v1 h-1 Z M7 6 h1 v1 h-1 Z M8 6 h1 v1 h-1 Z M9 6 h1 v1 h-1 Z M4 7 h1 v1 h-1 Z M5 7 h1 v1 h-1 Z M4 8 h1 v1 h-1 Z M5 8 h1 v1 h-1 Z " />
          </svg>
        </div>

        {/* Left Side: Pixel Dinosaur (Fixed X position, dynamic Y) */}
        <div className="absolute left-[12%] bottom-[14px] z-10 flex items-end">
          <div ref={dinoContainerRef} className="w-[24px] h-[27px] origin-bottom">
            <svg
              viewBox="0 0 16 18"
              className="w-full h-full fill-[#b40023] drop-shadow-[0_0_0px_rgba(180,0,35,0)] group-hover:drop-shadow-[0_0_6px_rgba(180,0,35,0.4)] transition-all duration-300"
              style={{ shapeRendering: "crispEdges" }}
            >
              <path ref={dinoRef} d="M8 0 h1 v1 h-1 Z M9 0 h1 v1 h-1 Z M10 0 h1 v1 h-1 Z M11 0 h1 v1 h-1 Z M12 0 h1 v1 h-1 Z M13 0 h1 v1 h-1 Z M14 0 h1 v1 h-1 Z M15 0 h1 v1 h-1 Z M7 1 h1 v1 h-1 Z M8 1 h1 v1 h-1 Z M9 1 h1 v1 h-1 Z M10 1 h1 v1 h-1 Z M11 1 h1 v1 h-1 Z M12 1 h1 v1 h-1 Z M13 1 h1 v1 h-1 Z M14 1 h1 v1 h-1 Z M15 1 h1 v1 h-1 Z M7 2 h1 v1 h-1 Z M8 2 h1 v1 h-1 Z M10 2 h1 v1 h-1 Z M12 2 h1 v1 h-1 Z M13 2 h1 v1 h-1 Z M14 2 h1 v1 h-1 Z M15 2 h1 v1 h-1 Z M7 3 h1 v1 h-1 Z M8 3 h1 v1 h-1 Z M9 3 h1 v1 h-1 Z M10 3 h1 v1 h-1 Z M11 3 h1 v1 h-1 Z M12 3 h1 v1 h-1 Z M13 3 h1 v1 h-1 Z M14 3 h1 v1 h-1 Z M15 3 h1 v1 h-1 Z M7 4 h1 v1 h-1 Z M8 4 h1 v1 h-1 Z M9 4 h1 v1 h-1 Z M10 4 h1 v1 h-1 Z M11 4 h1 v1 h-1 Z M12 4 h1 v1 h-1 Z M13 4 h1 v1 h-1 Z M14 4 h1 v1 h-1 Z M15 4 h1 v1 h-1 Z M7 5 h1 v1 h-1 Z M8 5 h1 v1 h-1 Z M9 5 h1 v1 h-1 Z M10 5 h1 v1 h-1 Z M7 6 h1 v1 h-1 Z M8 6 h1 v1 h-1 Z M9 6 h1 v1 h-1 Z M10 6 h1 v1 h-1 Z M11 6 h1 v1 h-1 Z M12 6 h1 v1 h-1 Z M13 6 h1 v1 h-1 Z M0 7 h1 v1 h-1 Z M1 7 h1 v1 h-1 Z M7 7 h1 v1 h-1 Z M8 7 h1 v1 h-1 Z M9 7 h1 v1 h-1 Z M10 7 h1 v1 h-1 Z M11 7 h1 v1 h-1 Z M0 8 h1 v1 h-1 Z M1 8 h1 v1 h-1 Z M2 8 h1 v1 h-1 Z M6 8 h1 v1 h-1 Z M7 8 h1 v1 h-1 Z M8 8 h1 v1 h-1 Z M9 8 h1 v1 h-1 Z M10 8 h1 v1 h-1 Z M11 8 h1 v1 h-1 Z M0 9 h1 v1 h-1 Z M1 9 h1 v1 h-1 Z M2 9 h1 v1 h-1 Z M3 9 h1 v1 h-1 Z M5 9 h1 v1 h-1 Z M6 9 h1 v1 h-1 Z M7 9 h1 v1 h-1 Z M8 9 h1 v1 h-1 Z M9 9 h1 v1 h-1 Z M10 9 h1 v1 h-1 Z M11 9 h1 v1 h-1 Z M0 10 h1 v1 h-1 Z M1 10 h1 v1 h-1 Z M2 10 h1 v1 h-1 Z M3 10 h1 v1 h-1 Z M4 10 h1 v1 h-1 Z M5 10 h1 v1 h-1 Z M6 10 h1 v1 h-1 Z M7 10 h1 v1 h-1 Z M8 10 h1 v1 h-1 Z M9 10 h1 v1 h-1 Z M10 10 h1 v1 h-1 Z M11 10 h1 v1 h-1 Z M1 11 h1 v1 h-1 Z M2 11 h1 v1 h-1 Z M3 11 h1 v1 h-1 Z M4 11 h1 v1 h-1 Z M5 11 h1 v1 h-1 Z M6 11 h1 v1 h-1 Z M7 11 h1 v1 h-1 Z M8 11 h1 v1 h-1 Z M9 11 h1 v1 h-1 Z M10 11 h1 v1 h-1 Z M11 11 h1 v1 h-1 Z M2 12 h1 v1 h-1 Z M3 12 h1 v1 h-1 Z M4 12 h1 v1 h-1 Z M5 12 h1 v1 h-1 Z M6 12 h1 v1 h-1 Z M7 12 h1 v1 h-1 Z M8 12 h1 v1 h-1 Z M9 12 h1 v1 h-1 Z M10 12 h1 v1 h-1 Z M3 13 h1 v1 h-1 Z M4 13 h1 v1 h-1 Z M5 13 h1 v1 h-1 Z M6 13 h1 v1 h-1 Z M7 13 h1 v1 h-1 Z M8 13 h1 v1 h-1 Z M9 13 h1 v1 h-1 Z M4 14 h1 v1 h-1 Z M5 14 h1 v1 h-1 Z M8 14 h1 v1 h-1 Z M4 15 h1 v1 h-1 Z M5 15 h1 v1 h-1 Z M8 15 h1 v1 h-1 Z M4 16 h1 v1 h-1 Z M8 16 h1 v1 h-1 Z M3 17 h1 v1 h-1 Z M4 17 h1 v1 h-1 Z M8 17 h1 v1 h-1 Z M9 17 h1 v1 h-1 Z " />
            </svg>
          </div>
        </div>

        {/* Center: Retro Text */}
        <div className="relative z-20 flex items-center justify-center px-4 py-1 rounded bg-white/40 backdrop-blur-[2px]">
          <span 
            style={{ fontFamily: "'Press Start 2P', monospace" }}
            className="text-[#b40023] text-[10px] md:text-[12px] tracking-[0.1em] drop-shadow-[0_0_0px_rgba(180,0,35,0)] group-hover:drop-shadow-[0_0_6px_rgba(180,0,35,0.6)] transition-all duration-300 select-none whitespace-nowrap pt-1"
          >
            {text}
          </span>
        </div>

        {/* Right Side: Pixel Arrow */}
        <div className="absolute right-[8%] z-10 flex items-center group-hover:translate-x-1 transition-transform duration-300">
          <svg
            viewBox="0 0 8 7"
            className="w-[16px] h-[14px] fill-[#b40023] drop-shadow-[0_0_0px_rgba(180,0,35,0)] group-hover:drop-shadow-[0_0_6px_rgba(180,0,35,0.4)] transition-all duration-300 group-hover:animate-pulse"
            style={{ shapeRendering: "crispEdges" }}
          >
            <path d="M3 0 h1 v1 h-1 Z M4 0 h1 v1 h-1 Z M3 1 h1 v1 h-1 Z M4 1 h1 v1 h-1 Z M5 1 h1 v1 h-1 Z M6 1 h1 v1 h-1 Z M5 2 h1 v1 h-1 Z M6 2 h1 v1 h-1 Z M7 2 h1 v1 h-1 Z M6 3 h1 v1 h-1 Z M7 3 h1 v1 h-1 Z M5 4 h1 v1 h-1 Z M6 4 h1 v1 h-1 Z M7 4 h1 v1 h-1 Z M3 5 h1 v1 h-1 Z M4 5 h1 v1 h-1 Z M5 5 h1 v1 h-1 Z M6 5 h1 v1 h-1 Z M3 6 h1 v1 h-1 Z M4 6 h1 v1 h-1 Z " />
          </svg>
        </div>
      </button>
    </>
  );
}
