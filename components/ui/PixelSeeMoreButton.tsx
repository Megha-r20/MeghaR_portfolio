"use client";

import React, { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  onClick: () => void;
  expanded: boolean;
}

export function PixelSeeMoreButton({ onClick, expanded }: Props) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFrame((f) => (f === 0 ? 1 : 0));
    }, 250);
    return () => clearInterval(timer);
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
            stroke-dasharray: 40 8 16 8 80 8;
            animation: dashMove 30s linear infinite;
          }
        `}
      </style>

      <button
        onClick={onClick}
        className={twMerge(
          "group relative w-full max-w-[700px] h-[75px] md:h-[85px] mx-auto flex items-center justify-between px-6 md:px-12",
          "rounded-[45px] bg-[#ffffff] transition-all duration-300",
          "hover:-translate-y-[2px] hover:shadow-[0_4px_30px_rgba(180,0,35,0.25)]",
          "overflow-hidden cursor-pointer outline-none shadow-sm"
        )}
      >
        {/* SVG Pill Border */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none rounded-[45px]"
          preserveAspectRatio="none"
          width="100%"
          height="100%"
        >
          <rect
            x="1.5"
            y="1.5"
            width="calc(100% - 3px)"
            height="calc(100% - 3px)"
            rx="40"
            ry="40"
            fill="none"
            stroke="#b40023"
            strokeWidth="2.5"
            className="pixel-border opacity-75 group-hover:opacity-100 transition-opacity duration-300"
          />
        </svg>

        {/* Pixel Ground Line */}
        <div className="absolute bottom-[16px] left-10 right-10 border-b-[3px] border-dotted border-[#b40023]/25 group-hover:border-[#b40023]/40 transition-colors duration-300" />

        {/* Background Decorative Elements */}
        <svg viewBox="0 0 16 4" className="absolute left-[15%] top-[25%] w-[48px] h-[12px] fill-[#b40023] opacity-10 group-hover:opacity-20 transition-opacity duration-300" style={{ shapeRendering: "crispEdges" }}>
          <path d="M6 0 h1 v1 h-1 Z M7 0 h1 v1 h-1 Z M8 0 h1 v1 h-1 Z M9 0 h1 v1 h-1 Z M3 1 h1 v1 h-1 Z M4 1 h1 v1 h-1 Z M5 1 h1 v1 h-1 Z M6 1 h1 v1 h-1 Z M7 1 h1 v1 h-1 Z M8 1 h1 v1 h-1 Z M9 1 h1 v1 h-1 Z M10 1 h1 v1 h-1 Z M11 1 h1 v1 h-1 Z M14 1 h1 v1 h-1 Z M1 2 h1 v1 h-1 Z M2 2 h1 v1 h-1 Z M3 2 h1 v1 h-1 Z M4 2 h1 v1 h-1 Z M5 2 h1 v1 h-1 Z M6 2 h1 v1 h-1 Z M7 2 h1 v1 h-1 Z M8 2 h1 v1 h-1 Z M9 2 h1 v1 h-1 Z M10 2 h1 v1 h-1 Z M11 2 h1 v1 h-1 Z M12 2 h1 v1 h-1 Z M13 2 h1 v1 h-1 Z M14 2 h1 v1 h-1 Z M15 2 h1 v1 h-1 Z M0 3 h1 v1 h-1 Z M1 3 h1 v1 h-1 Z M2 3 h1 v1 h-1 Z M3 3 h1 v1 h-1 Z M4 3 h1 v1 h-1 Z M5 3 h1 v1 h-1 Z M6 3 h1 v1 h-1 Z M7 3 h1 v1 h-1 Z M8 3 h1 v1 h-1 Z M9 3 h1 v1 h-1 Z M10 3 h1 v1 h-1 Z M11 3 h1 v1 h-1 Z M12 3 h1 v1 h-1 Z M13 3 h1 v1 h-1 Z M14 3 h1 v1 h-1 Z M15 3 h1 v1 h-1 Z " />
        </svg>
        <svg viewBox="0 0 16 4" className="absolute right-[20%] top-[30%] w-[32px] h-[8px] fill-[#b40023] opacity-10 group-hover:opacity-20 transition-opacity duration-300" style={{ shapeRendering: "crispEdges" }}>
          <path d="M6 0 h1 v1 h-1 Z M7 0 h1 v1 h-1 Z M8 0 h1 v1 h-1 Z M9 0 h1 v1 h-1 Z M3 1 h1 v1 h-1 Z M4 1 h1 v1 h-1 Z M5 1 h1 v1 h-1 Z M6 1 h1 v1 h-1 Z M7 1 h1 v1 h-1 Z M8 1 h1 v1 h-1 Z M9 1 h1 v1 h-1 Z M10 1 h1 v1 h-1 Z M11 1 h1 v1 h-1 Z M14 1 h1 v1 h-1 Z M1 2 h1 v1 h-1 Z M2 2 h1 v1 h-1 Z M3 2 h1 v1 h-1 Z M4 2 h1 v1 h-1 Z M5 2 h1 v1 h-1 Z M6 2 h1 v1 h-1 Z M7 2 h1 v1 h-1 Z M8 2 h1 v1 h-1 Z M9 2 h1 v1 h-1 Z M10 2 h1 v1 h-1 Z M11 2 h1 v1 h-1 Z M12 2 h1 v1 h-1 Z M13 2 h1 v1 h-1 Z M14 2 h1 v1 h-1 Z M15 2 h1 v1 h-1 Z M0 3 h1 v1 h-1 Z M1 3 h1 v1 h-1 Z M2 3 h1 v1 h-1 Z M3 3 h1 v1 h-1 Z M4 3 h1 v1 h-1 Z M5 3 h1 v1 h-1 Z M6 3 h1 v1 h-1 Z M7 3 h1 v1 h-1 Z M8 3 h1 v1 h-1 Z M9 3 h1 v1 h-1 Z M10 3 h1 v1 h-1 Z M11 3 h1 v1 h-1 Z M12 3 h1 v1 h-1 Z M13 3 h1 v1 h-1 Z M14 3 h1 v1 h-1 Z M15 3 h1 v1 h-1 Z " />
        </svg>

        <svg viewBox="0 0 10 9" className="absolute left-[28%] bottom-[14px] w-[20px] h-[18px] fill-[#b40023] opacity-40 group-hover:opacity-60 transition-opacity duration-300" style={{ shapeRendering: "crispEdges" }}>
          <path d="M4 0 h1 v1 h-1 Z M5 0 h1 v1 h-1 Z M1 1 h1 v1 h-1 Z M4 1 h1 v1 h-1 Z M5 1 h1 v1 h-1 Z M8 1 h1 v1 h-1 Z M0 2 h1 v1 h-1 Z M1 2 h1 v1 h-1 Z M4 2 h1 v1 h-1 Z M5 2 h1 v1 h-1 Z M8 2 h1 v1 h-1 Z M9 2 h1 v1 h-1 Z M0 3 h1 v1 h-1 Z M1 3 h1 v1 h-1 Z M4 3 h1 v1 h-1 Z M5 3 h1 v1 h-1 Z M8 3 h1 v1 h-1 Z M9 3 h1 v1 h-1 Z M0 4 h1 v1 h-1 Z M1 4 h1 v1 h-1 Z M4 4 h1 v1 h-1 Z M5 4 h1 v1 h-1 Z M8 4 h1 v1 h-1 Z M9 4 h1 v1 h-1 Z M1 5 h1 v1 h-1 Z M2 5 h1 v1 h-1 Z M3 5 h1 v1 h-1 Z M4 5 h1 v1 h-1 Z M5 5 h1 v1 h-1 Z M8 5 h1 v1 h-1 Z M9 5 h1 v1 h-1 Z M2 6 h1 v1 h-1 Z M3 6 h1 v1 h-1 Z M4 6 h1 v1 h-1 Z M5 6 h1 v1 h-1 Z M7 6 h1 v1 h-1 Z M8 6 h1 v1 h-1 Z M9 6 h1 v1 h-1 Z M4 7 h1 v1 h-1 Z M5 7 h1 v1 h-1 Z M4 8 h1 v1 h-1 Z M5 8 h1 v1 h-1 Z " />
        </svg>
        <svg viewBox="0 0 10 9" className="absolute right-[32%] bottom-[14px] w-[15px] h-[13.5px] fill-[#b40023] opacity-30 group-hover:opacity-50 transition-opacity duration-300" style={{ shapeRendering: "crispEdges" }}>
          <path d="M4 0 h1 v1 h-1 Z M5 0 h1 v1 h-1 Z M1 1 h1 v1 h-1 Z M4 1 h1 v1 h-1 Z M5 1 h1 v1 h-1 Z M8 1 h1 v1 h-1 Z M0 2 h1 v1 h-1 Z M1 2 h1 v1 h-1 Z M4 2 h1 v1 h-1 Z M5 2 h1 v1 h-1 Z M8 2 h1 v1 h-1 Z M9 2 h1 v1 h-1 Z M0 3 h1 v1 h-1 Z M1 3 h1 v1 h-1 Z M4 3 h1 v1 h-1 Z M5 3 h1 v1 h-1 Z M8 3 h1 v1 h-1 Z M9 3 h1 v1 h-1 Z M0 4 h1 v1 h-1 Z M1 4 h1 v1 h-1 Z M4 4 h1 v1 h-1 Z M5 4 h1 v1 h-1 Z M8 4 h1 v1 h-1 Z M9 4 h1 v1 h-1 Z M1 5 h1 v1 h-1 Z M2 5 h1 v1 h-1 Z M3 5 h1 v1 h-1 Z M4 5 h1 v1 h-1 Z M5 5 h1 v1 h-1 Z M8 5 h1 v1 h-1 Z M9 5 h1 v1 h-1 Z M2 6 h1 v1 h-1 Z M3 6 h1 v1 h-1 Z M4 6 h1 v1 h-1 Z M5 6 h1 v1 h-1 Z M7 6 h1 v1 h-1 Z M8 6 h1 v1 h-1 Z M9 6 h1 v1 h-1 Z M4 7 h1 v1 h-1 Z M5 7 h1 v1 h-1 Z M4 8 h1 v1 h-1 Z M5 8 h1 v1 h-1 Z " />
        </svg>

        {/* Left Side: Pixel Dinosaur */}
        <div className="relative z-10 flex items-end h-full pb-[14px]">
          <svg
            viewBox="0 0 16 18"
            className="w-[32px] h-[36px] fill-[#b40023] drop-shadow-[0_0_0px_rgba(180,0,35,0)] group-hover:drop-shadow-[0_0_8px_rgba(180,0,35,0.4)] transition-all duration-300"
            style={{ shapeRendering: "crispEdges" }}
          >
            <path d={frame === 0 ? "M8 0 h1 v1 h-1 Z M9 0 h1 v1 h-1 Z M10 0 h1 v1 h-1 Z M11 0 h1 v1 h-1 Z M12 0 h1 v1 h-1 Z M13 0 h1 v1 h-1 Z M14 0 h1 v1 h-1 Z M15 0 h1 v1 h-1 Z M7 1 h1 v1 h-1 Z M8 1 h1 v1 h-1 Z M9 1 h1 v1 h-1 Z M10 1 h1 v1 h-1 Z M11 1 h1 v1 h-1 Z M12 1 h1 v1 h-1 Z M13 1 h1 v1 h-1 Z M14 1 h1 v1 h-1 Z M15 1 h1 v1 h-1 Z M7 2 h1 v1 h-1 Z M8 2 h1 v1 h-1 Z M10 2 h1 v1 h-1 Z M12 2 h1 v1 h-1 Z M13 2 h1 v1 h-1 Z M14 2 h1 v1 h-1 Z M15 2 h1 v1 h-1 Z M7 3 h1 v1 h-1 Z M8 3 h1 v1 h-1 Z M9 3 h1 v1 h-1 Z M10 3 h1 v1 h-1 Z M11 3 h1 v1 h-1 Z M12 3 h1 v1 h-1 Z M13 3 h1 v1 h-1 Z M14 3 h1 v1 h-1 Z M15 3 h1 v1 h-1 Z M7 4 h1 v1 h-1 Z M8 4 h1 v1 h-1 Z M9 4 h1 v1 h-1 Z M10 4 h1 v1 h-1 Z M11 4 h1 v1 h-1 Z M12 4 h1 v1 h-1 Z M13 4 h1 v1 h-1 Z M14 4 h1 v1 h-1 Z M15 4 h1 v1 h-1 Z M7 5 h1 v1 h-1 Z M8 5 h1 v1 h-1 Z M9 5 h1 v1 h-1 Z M10 5 h1 v1 h-1 Z M7 6 h1 v1 h-1 Z M8 6 h1 v1 h-1 Z M9 6 h1 v1 h-1 Z M10 6 h1 v1 h-1 Z M11 6 h1 v1 h-1 Z M12 6 h1 v1 h-1 Z M13 6 h1 v1 h-1 Z M0 7 h1 v1 h-1 Z M1 7 h1 v1 h-1 Z M7 7 h1 v1 h-1 Z M8 7 h1 v1 h-1 Z M9 7 h1 v1 h-1 Z M10 7 h1 v1 h-1 Z M11 7 h1 v1 h-1 Z M0 8 h1 v1 h-1 Z M1 8 h1 v1 h-1 Z M2 8 h1 v1 h-1 Z M6 8 h1 v1 h-1 Z M7 8 h1 v1 h-1 Z M8 8 h1 v1 h-1 Z M9 8 h1 v1 h-1 Z M10 8 h1 v1 h-1 Z M11 8 h1 v1 h-1 Z M0 9 h1 v1 h-1 Z M1 9 h1 v1 h-1 Z M2 9 h1 v1 h-1 Z M3 9 h1 v1 h-1 Z M5 9 h1 v1 h-1 Z M6 9 h1 v1 h-1 Z M7 9 h1 v1 h-1 Z M8 9 h1 v1 h-1 Z M9 9 h1 v1 h-1 Z M10 9 h1 v1 h-1 Z M11 9 h1 v1 h-1 Z M0 10 h1 v1 h-1 Z M1 10 h1 v1 h-1 Z M2 10 h1 v1 h-1 Z M3 10 h1 v1 h-1 Z M4 10 h1 v1 h-1 Z M5 10 h1 v1 h-1 Z M6 10 h1 v1 h-1 Z M7 10 h1 v1 h-1 Z M8 10 h1 v1 h-1 Z M9 10 h1 v1 h-1 Z M10 10 h1 v1 h-1 Z M11 10 h1 v1 h-1 Z M1 11 h1 v1 h-1 Z M2 11 h1 v1 h-1 Z M3 11 h1 v1 h-1 Z M4 11 h1 v1 h-1 Z M5 11 h1 v1 h-1 Z M6 11 h1 v1 h-1 Z M7 11 h1 v1 h-1 Z M8 11 h1 v1 h-1 Z M9 11 h1 v1 h-1 Z M10 11 h1 v1 h-1 Z M11 11 h1 v1 h-1 Z M2 12 h1 v1 h-1 Z M3 12 h1 v1 h-1 Z M4 12 h1 v1 h-1 Z M5 12 h1 v1 h-1 Z M6 12 h1 v1 h-1 Z M7 12 h1 v1 h-1 Z M8 12 h1 v1 h-1 Z M9 12 h1 v1 h-1 Z M10 12 h1 v1 h-1 Z M3 13 h1 v1 h-1 Z M4 13 h1 v1 h-1 Z M5 13 h1 v1 h-1 Z M6 13 h1 v1 h-1 Z M7 13 h1 v1 h-1 Z M8 13 h1 v1 h-1 Z M9 13 h1 v1 h-1 Z M4 14 h1 v1 h-1 Z M5 14 h1 v1 h-1 Z M8 14 h1 v1 h-1 Z M4 15 h1 v1 h-1 Z M5 15 h1 v1 h-1 Z M8 15 h1 v1 h-1 Z M4 16 h1 v1 h-1 Z M8 16 h1 v1 h-1 Z M3 17 h1 v1 h-1 Z M4 17 h1 v1 h-1 Z M8 17 h1 v1 h-1 Z M9 17 h1 v1 h-1 Z " : "M8 0 h1 v1 h-1 Z M9 0 h1 v1 h-1 Z M10 0 h1 v1 h-1 Z M11 0 h1 v1 h-1 Z M12 0 h1 v1 h-1 Z M13 0 h1 v1 h-1 Z M14 0 h1 v1 h-1 Z M15 0 h1 v1 h-1 Z M7 1 h1 v1 h-1 Z M8 1 h1 v1 h-1 Z M9 1 h1 v1 h-1 Z M10 1 h1 v1 h-1 Z M11 1 h1 v1 h-1 Z M12 1 h1 v1 h-1 Z M13 1 h1 v1 h-1 Z M14 1 h1 v1 h-1 Z M15 1 h1 v1 h-1 Z M7 2 h1 v1 h-1 Z M8 2 h1 v1 h-1 Z M10 2 h1 v1 h-1 Z M12 2 h1 v1 h-1 Z M13 2 h1 v1 h-1 Z M14 2 h1 v1 h-1 Z M15 2 h1 v1 h-1 Z M7 3 h1 v1 h-1 Z M8 3 h1 v1 h-1 Z M9 3 h1 v1 h-1 Z M10 3 h1 v1 h-1 Z M11 3 h1 v1 h-1 Z M12 3 h1 v1 h-1 Z M13 3 h1 v1 h-1 Z M14 3 h1 v1 h-1 Z M15 3 h1 v1 h-1 Z M7 4 h1 v1 h-1 Z M8 4 h1 v1 h-1 Z M9 4 h1 v1 h-1 Z M10 4 h1 v1 h-1 Z M11 4 h1 v1 h-1 Z M12 4 h1 v1 h-1 Z M13 4 h1 v1 h-1 Z M14 4 h1 v1 h-1 Z M15 4 h1 v1 h-1 Z M7 5 h1 v1 h-1 Z M8 5 h1 v1 h-1 Z M9 5 h1 v1 h-1 Z M10 5 h1 v1 h-1 Z M7 6 h1 v1 h-1 Z M8 6 h1 v1 h-1 Z M9 6 h1 v1 h-1 Z M10 6 h1 v1 h-1 Z M11 6 h1 v1 h-1 Z M12 6 h1 v1 h-1 Z M13 6 h1 v1 h-1 Z M0 7 h1 v1 h-1 Z M1 7 h1 v1 h-1 Z M7 7 h1 v1 h-1 Z M8 7 h1 v1 h-1 Z M9 7 h1 v1 h-1 Z M10 7 h1 v1 h-1 Z M11 7 h1 v1 h-1 Z M0 8 h1 v1 h-1 Z M1 8 h1 v1 h-1 Z M2 8 h1 v1 h-1 Z M6 8 h1 v1 h-1 Z M7 8 h1 v1 h-1 Z M8 8 h1 v1 h-1 Z M9 8 h1 v1 h-1 Z M10 8 h1 v1 h-1 Z M11 8 h1 v1 h-1 Z M0 9 h1 v1 h-1 Z M1 9 h1 v1 h-1 Z M2 9 h1 v1 h-1 Z M3 9 h1 v1 h-1 Z M5 9 h1 v1 h-1 Z M6 9 h1 v1 h-1 Z M7 9 h1 v1 h-1 Z M8 9 h1 v1 h-1 Z M9 9 h1 v1 h-1 Z M10 9 h1 v1 h-1 Z M11 9 h1 v1 h-1 Z M0 10 h1 v1 h-1 Z M1 10 h1 v1 h-1 Z M2 10 h1 v1 h-1 Z M3 10 h1 v1 h-1 Z M4 10 h1 v1 h-1 Z M5 10 h1 v1 h-1 Z M6 10 h1 v1 h-1 Z M7 10 h1 v1 h-1 Z M8 10 h1 v1 h-1 Z M9 10 h1 v1 h-1 Z M10 10 h1 v1 h-1 Z M11 10 h1 v1 h-1 Z M1 11 h1 v1 h-1 Z M2 11 h1 v1 h-1 Z M3 11 h1 v1 h-1 Z M4 11 h1 v1 h-1 Z M5 11 h1 v1 h-1 Z M6 11 h1 v1 h-1 Z M7 11 h1 v1 h-1 Z M8 11 h1 v1 h-1 Z M9 11 h1 v1 h-1 Z M10 11 h1 v1 h-1 Z M11 11 h1 v1 h-1 Z M2 12 h1 v1 h-1 Z M3 12 h1 v1 h-1 Z M4 12 h1 v1 h-1 Z M5 12 h1 v1 h-1 Z M6 12 h1 v1 h-1 Z M7 12 h1 v1 h-1 Z M8 12 h1 v1 h-1 Z M9 12 h1 v1 h-1 Z M10 12 h1 v1 h-1 Z M3 13 h1 v1 h-1 Z M4 13 h1 v1 h-1 Z M5 13 h1 v1 h-1 Z M6 13 h1 v1 h-1 Z M7 13 h1 v1 h-1 Z M8 13 h1 v1 h-1 Z M9 13 h1 v1 h-1 Z M4 14 h1 v1 h-1 Z M8 14 h1 v1 h-1 Z M9 14 h1 v1 h-1 Z M4 15 h1 v1 h-1 Z M5 15 h1 v1 h-1 Z M5 16 h1 v1 h-1 Z M5 17 h1 v1 h-1 Z M6 17 h1 v1 h-1 Z "} />
          </svg>
        </div>

        {/* Center: Retro Text */}
        <div className="relative z-10 flex items-center justify-center flex-grow pt-[4px]">
          <span 
            style={{ fontFamily: "'Press Start 2P', monospace" }}
            className="text-[#b40023] text-[12px] md:text-[15px] tracking-[0.15em] drop-shadow-[0_0_0px_rgba(180,0,35,0)] group-hover:drop-shadow-[0_0_8px_rgba(180,0,35,0.6)] transition-all duration-300 select-none"
          >
            {text}
          </span>
        </div>

        {/* Right Side: Pixel Arrow */}
        <div className="relative z-10 flex items-center h-full pb-[2px] group-hover:translate-x-1.5 transition-transform duration-300">
          <svg
            viewBox="0 0 8 7"
            className="w-[20px] h-[17.5px] fill-[#b40023] drop-shadow-[0_0_0px_rgba(180,0,35,0)] group-hover:drop-shadow-[0_0_8px_rgba(180,0,35,0.4)] transition-all duration-300 group-hover:animate-pulse"
            style={{ shapeRendering: "crispEdges" }}
          >
            <path d="M3 0 h1 v1 h-1 Z M4 0 h1 v1 h-1 Z M3 1 h1 v1 h-1 Z M4 1 h1 v1 h-1 Z M5 1 h1 v1 h-1 Z M6 1 h1 v1 h-1 Z M5 2 h1 v1 h-1 Z M6 2 h1 v1 h-1 Z M7 2 h1 v1 h-1 Z M6 3 h1 v1 h-1 Z M7 3 h1 v1 h-1 Z M5 4 h1 v1 h-1 Z M6 4 h1 v1 h-1 Z M7 4 h1 v1 h-1 Z M3 5 h1 v1 h-1 Z M4 5 h1 v1 h-1 Z M5 5 h1 v1 h-1 Z M6 5 h1 v1 h-1 Z M3 6 h1 v1 h-1 Z M4 6 h1 v1 h-1 Z " />
          </svg>
        </div>
      </button>
    </>
  );
}
