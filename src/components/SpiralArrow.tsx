// src/components/SpiralArrow.tsx
"use client";

import React, { useRef, useEffect } from 'react';

const SpiralArrow = () => {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (path) {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
      path.style.animation = `draw 5s ease forwards`;
    }
  }, []);

  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    className="w-full h-full"
    aria-labelledby="squigglyArrowTitle"
    role="img"
  >
    <title id="squigglyArrowTitle">Squiggly Arrow from Top Right to Bottom Left</title>
    <path
      d="
        M100,0
        C90,15 80,0 70,15
        S50,30 40,15
        S30,0 20,15
        S10,30 0,100
      "
      stroke="#6d28d9"
      strokeWidth="2"
      fill="none"
      markerEnd="url(#arrowhead)"
      className="squiggly-arrow"
    />
    <defs>
      <marker
        id="arrowhead"
        markerWidth="10"
        markerHeight="7"
        refX="0"
        refY="3.5"
        orient="auto"
      >
        <polygon points="0 0, 10 3.5, 0 7" fill="#6d28d9" />
      </marker>
    </defs>
  </svg>
  );
};

export default SpiralArrow;