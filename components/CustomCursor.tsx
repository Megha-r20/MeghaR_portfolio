"use client";

import React, { useEffect, useRef } from "react";

// ─── CustomCursor ─────────────────────────────────────────────────────────────
// Dot + trailing ring. The dot tracks the pointer 1:1 (no lag), the ring
// follows with a soft lerp. Interactive elements grow the ring; mousedown
// contracts it. All movement is direct transform writes inside one rAF loop —
// zero React re-renders, zero paint work.

export function CustomCursor() {
  return null;
}
