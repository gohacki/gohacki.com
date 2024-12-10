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
      viewBox="0 0 800 800"
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      aria-labelledby="spiralArrowTitle"
      role="img"
    >
      <title id="spiralArrowTitle">Spiral Arrow Animation Pointing to Miro's Picture</title>
      <path
        ref={pathRef}
        d="
          M100,400
          C100,300 700,300 700,400
          C700,500 100,500 100,400
          C100,300 700,300 700,400
          C700,500 100,500 100,400
          C100,300 700,300 700,400
          L750,400
        "
        stroke="#6d28d9"
        strokeWidth="4"
        fill="none"
        markerEnd="url(#arrowhead)"
      />
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="10"
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