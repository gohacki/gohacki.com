// src/components/BackgroundCanvas.tsx
"use client";

import React, { useRef, useEffect, useCallback } from "react";

/** Interface representing a single star */
interface Star {
  x: number;            // X position
  y: number;            // Y position
  radius: number;       // Star size (radius)
  color: string;        // Star color (pink/purple)
  alpha: number;        // Current opacity
  alphaChange: number;  // Rate at which alpha changes (for twinkle)
}

const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const starsRef = useRef<Star[]>([]);

  /** A palette of pink & purple colors for the stars */
  const starColors = [
    "#ff99ff",
    "#ff66ff",
    "#fa4dff",
    "#ff66cc",
    "#ff33cc",
    "#ff99cc",
    "#e573ff",
    "#c99eff",
    "#cc66ff",
    "#cc99ff",
    "#9933ff",
  ];

  /**
   * Utility to generate a random star object
   */
  const createStar = useCallback((canvasWidth: number, canvasHeight: number): Star => {
    return {
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight,
      radius: 0.5 + Math.random() * 5.5, // star size range
      color: starColors[Math.floor(Math.random() * starColors.length)],
      alpha: Math.random(),              // initial alpha (0–1)
      alphaChange: (Math.random() * 0.02 + 0.01) * (Math.random() < 0.5 ? 1 : -1),
      // ^ random twinkle rate, with a random sign so some fade in, others fade out initially
    };
  }, [starColors]);

  /**
   * Resize the canvas to fill the window
   */
  const resizeCanvas = useCallback(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }, []);

  /**
   * Initialize a bunch of stars
   */
  const initializeStars = useCallback(() => {
    if (!canvasRef.current) return;
    const canvasWidth = canvasRef.current.width;
    const canvasHeight = canvasRef.current.height;
    const numStars = 200; // Adjust how many stars you want

    const newStars: Star[] = [];
    for (let i = 0; i < numStars; i++) {
      newStars.push(createStar(canvasWidth, canvasHeight));
    }
    starsRef.current = newStars;
  }, [createStar]);

  /**
   * Main animation loop (twinkle effect)
   */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      // Clear the canvas on each frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw each star
      starsRef.current.forEach((star) => {
        // Update star alpha for twinkle
        star.alpha += star.alphaChange;

        // Reverse direction if alpha goes out of [0,1]
        if (star.alpha <= 0) {
          star.alpha = 0;
          star.alphaChange *= -1;
        } else if (star.alpha >= 1) {
          star.alpha = 1;
          star.alphaChange *= -1;
        }

        // Draw the star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${hexToRgb(star.color)}, ${star.alpha})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Kick off the animation loop
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  /**
   * On initial mount, resize canvas, create stars, and set up resize listener
   */
  useEffect(() => {
    resizeCanvas();
    initializeStars();
    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [initializeStars, resizeCanvas]);

  /**
   * Helper function to convert HEX color to RGB string
   * (so we can apply alpha in `rgba(...)`)
   */
  const hexToRgb = (hex: string): string => {
    let processedHex = hex.replace("#", "");
    if (processedHex.length === 3) {
      processedHex = processedHex
        .split("")
        .map((char) => char + char)
        .join("");
    }
    const bigint = parseInt(processedHex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
  };

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-[-1] pointer-events-none"
    />
  );
};

export default BackgroundCanvas;
