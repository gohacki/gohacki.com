// src/components/SpiralArrow.tsx
"use client";
import React from 'react';

const SpiralArrow = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 800" /* Expanded viewBox for larger coverage */
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      aria-labelledby="spiralArrowTitle"
      role="img"
    >
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6d28d9" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
      </defs>
      <title id="spiralArrowTitle">Animated Squiggly Lines Background</title>

      {/* Lines originating from the left */}
      <path
        className="draw-path"
        d="M-100,100 C200,150 400,50 600,100 S1000,150 1400,100"
        stroke="url(#lineGradient)"
        strokeWidth="4"
        fill="none"
      />

      {/* Lines originating from the right */}
      <path
        className="draw-path"
        d="M1400,900 C1000,250 800,150 600,200 S200,250 -100,200"
        stroke="url(#lineGradient)"
        strokeWidth="4"
        fill="none"
      />

      {/* Lines originating from the top */}
      <path
        className="draw-path"
        d="M100,0 C150,200 50,400 100,600 S150,800 100,1000"
        stroke="url(#lineGradient)"
        strokeWidth="4"
        fill="none"
      />

      {/* Lines originating from the bottom */}
      <path
        className="draw-path"
        d="M200,800 C250,600 150,400 700,200 S250,0 1200,-200"
        stroke="url(#lineGradient)"
        strokeWidth="4"
        fill="none"
      />

      <path
        className="draw-path"
        d="M0,0 C300,300 600,-300 900,0 S1500,300 1800,0"
        stroke="url(#lineGradient)"
        strokeWidth="4"
        fill="none"
      />

      <path
        className="draw-path"
        d="M0,800 C300,500 600,1100 900,800 S1500,500 1800,800"
        stroke="url(#lineGradient)"
        strokeWidth="4"
        fill="none"
      />
    </svg>
  );
};

export default SpiralArrow;