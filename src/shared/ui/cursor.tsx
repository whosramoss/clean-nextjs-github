"use client";

import React from "react";
import { useAnimationCursor } from "src/shared/hooks/useAnimationCursor";
import Utils from "src/shared/utils/utils";

export default function CustomCursor({ speed = 0.1 }) {
  const { cursorRef, visible } = useAnimationCursor(speed);
  return (
    <div className="cursor-wrapper">
      <div
        ref={cursorRef}
        className={Utils.cn(
          "pointer-events-none fixed left-0 z-50 h-[10px] w-[10px] rounded-[100%] bg-[#ffffff] opacity-0 mix-blend-difference transition-opacity duration-[2s] ease-[cubic-bezier(0.075,0.82,0.165,1)]",
          { "opacity-1": visible },
        )}
      ></div>
    </div>
  );
}