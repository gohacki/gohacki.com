// src/components/BackgroundCanvas.tsx
"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { createNoise2D } from "simplex-noise";

interface Line {
  startX: number;
  startY: number;
  controlX: number;
  controlY: number;
  endX: number;
  endY: number;
  color: string;
  lineWidth: number;
  opacity: number;
  speed: number;
  gradient: CanvasGradient | null;
  progress: number; // Tracks drawing progress (0 to 1)
  isFading: boolean; // Tracks if the line is in the fade-out phase
}

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  opacity: number;
  direction: number;
}

const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const linesRef = useRef<Line[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const noise2D = createNoise2D();
  const mousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastTimeRef = useRef<number>(0); // To track deltaTime

  const gradientColors = [
    ["#6d28d9", "#ef4444"],
    ["#34d399", "#f59e0b"],
    ["#ec4899", "#34d399"],
    // Add more color pairs as desired
  ];

  // Helper function to convert hex to RGB
  const hexToRgb = (hex: string): string => {
    hex = hex.replace("#", "");
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((char) => char + char)
        .join("");
    }
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
  };

  // Function to create a random line with control points for waviness
  const createRandomLine = (): Line => {
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    const endX = Math.random() * window.innerWidth;
    const endY = Math.random() * window.innerHeight;

    // Control points are offset from the straight line to create a wave
    const controlX = (startX + endX) / 2 + (Math.random() - 0.5) * 500; // Adjust for waviness
    const controlY = (startY + endY) / 2 + (Math.random() - 0.5) * 500;

    const colorPair = gradientColors[Math.floor(Math.random() * gradientColors.length)];
    const gradient = (() => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;
      const grd = ctx.createLinearGradient(startX, startY, endX, endY);
      grd.addColorStop(0, colorPair[0]);
      grd.addColorStop(1, colorPair[1]);
      return grd;
    })();

    return {
      startX,
      startY,
      controlX,
      controlY,
      endX,
      endY,
      color: colorPair[0],
      lineWidth: 1 + Math.random() * 5,
      opacity: 0,
      speed: 0.5 + Math.random() * 5,
      gradient,
      progress: 0, // Initialize progress
      isFading: false, // Initialize fade-out phase
    };
  };

  // Function to create a random particle
  const createRandomParticle = (line?: Line): Particle => {
    let x: number;
    let y: number;
    let color: string;

    if (line) {
      // Spawn near a line's midpoint
      const t = 0.5; // Midpoint of the line for particle spawn
      x = line.startX + (line.endX - line.startX) * t + (Math.random() - 0.5) * 100;
      y = line.startY + (line.endY - line.startY) * t + (Math.random() - 0.5) * 100;
      color = line.color;
    } else {
      // Spawn near the mouse position or randomly
      x = mousePosRef.current.x + (Math.random() - 0.5) * 200;
      y = mousePosRef.current.y + (Math.random() - 0.5) * 200;
      const colorPair = gradientColors[Math.floor(Math.random() * gradientColors.length)];
      color = colorPair[Math.floor(Math.random() * colorPair.length)];
    }

    return {
      x,
      y,
      size: 2 + Math.random() * 2,
      color,
      speed: 0.5 + Math.random(),
      opacity: 0.5 + Math.random() * 0.5,
      direction: Math.random() * Math.PI * 2,
    };
  };

  // Initialize lines
  const initializeLines = useCallback(() => {
    const initialLines: Line[] = [];
    const numberOfLines = 20; // Adjust based on performance

    for (let i = 0; i < numberOfLines; i++) {
      initialLines.push(createRandomLine());
    }

    linesRef.current = initialLines;
  }, []);

  // Resize canvas to fill the window
  const resizeCanvas = useCallback(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }, []);

  // Handle initial setup and window resize
  useEffect(() => {
    resizeCanvas();
    initializeLines();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [initializeLines, resizeCanvas]);

  // Handle mouse movements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineCap = "round";
    ctx.globalCompositeOperation = "lighter"; // For glow effects

    const animate = (currentTime: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = currentTime;
      }
      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw lines
      linesRef.current.forEach((line) => {
        if (!line.isFading) {
          // Apply noise to control points for natural movement
          const noiseX = noise2D(line.startX, currentTime / 10000);
          const noiseY = noise2D(line.startY, currentTime / 10000);
          line.controlX += noiseX * 0.5;
          line.controlY += noiseY * 0.5;

          // Update progress based on speed and deltaTime
          line.progress += line.speed * deltaTime * 0.00002; // Adjusted multiplier for smoother progress
          if (line.progress >= 1) {
            line.progress = 1;
            line.isFading = true; // Start fade-out phase
          }

          // Gradually increase opacity
          if (line.opacity < 1) {
            line.opacity += 0.005 * line.speed; // Adjust the speed of fade-in
          }

          // Draw the line up to the current progress
          ctx.beginPath();
          ctx.strokeStyle = line.gradient
            ? line.gradient
            : `rgba(${hexToRgb(line.color)}, ${Math.min(line.opacity, 1)})`;
          ctx.lineWidth = line.lineWidth;

          // Calculate points along the quadratic curve up to 'progress'
          const segments = 200; // Increased from 100 to 200 for smoother curves
          ctx.moveTo(line.startX, line.startY);
          for (let i = 1; i <= segments * line.progress; i++) {
            const t = i / segments;
            const x =
              Math.pow(1 - t, 2) * line.startX +
              2 * (1 - t) * t * line.controlX +
              Math.pow(t, 2) * line.endX;
            const y =
              Math.pow(1 - t, 2) * line.startY +
              2 * (1 - t) * t * line.controlY +
              Math.pow(t, 2) * line.endY;
            ctx.lineTo(x, y);
          }

          ctx.stroke();
        } else {
          // Fade-out phase
          // Decrease opacity
          if (line.opacity > 0) {
            line.opacity -= 0.005 * line.speed; // Adjust fade-out speed
          }

          // Draw the complete line with decreasing opacity
          ctx.beginPath();
          ctx.strokeStyle = line.gradient
            ? line.gradient
            : `rgba(${hexToRgb(line.color)}, ${Math.max(line.opacity, 0)})`;
          ctx.lineWidth = line.lineWidth;

          ctx.moveTo(line.startX, line.startY);
          ctx.quadraticCurveTo(line.controlX, line.controlY, line.endX, line.endY);

          ctx.stroke();

          // Once opacity is 0, reset the line
          if (line.opacity <= 0) {
            line.progress = 0;
            line.isFading = false;
            // Randomize start, end, and control points for a new wave
            line.startX = Math.random() * canvas.width;
            line.startY = Math.random() * canvas.height;
            line.endX = Math.random() * canvas.width;
            line.endY = Math.random() * canvas.height;
            line.controlX = (line.startX + line.endX) / 2 + (Math.random() - 0.5) * 200;
            line.controlY = (line.startY + line.endY) / 2 + (Math.random() - 0.5) * 200;

            // Optionally, add new particles
            particlesRef.current.push(createRandomParticle(line));
          }
        }
      });

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Move particle
        particle.x += Math.cos(particle.direction) * particle.speed;
        particle.y += Math.sin(particle.direction) * particle.speed;

        // Fade out
        if (particle.opacity > 0) {
          particle.opacity -= 0.005;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${hexToRgb(particle.color)}, ${particle.opacity})`;
        ctx.fill();

        // Remove faded particles
        if (particle.opacity <= 0) {
          particlesRef.current.splice(index, 1);
        }
      });

      // Adjust lines based on mouse position with enhanced influence
      linesRef.current.forEach((line) => {
        const midX = (line.startX + line.endX) / 2;
        const midY = (line.startY + line.endY) / 2;
        const dx = mousePosRef.current.x - midX;
        const dy = mousePosRef.current.y - midY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Avoid division by zero and set a minimum distance
        const safeDistance = Math.max(distance, 50);
        const influence = Math.min(200 / safeDistance, 2); // Increased influence multiplier

        line.controlX += dx * influence * 0.05; // Increased from 0.01 to 0.05
        line.controlY += dy * influence * 0.05; // Increased from 0.01 to 0.05
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [hexToRgb, noise2D]);

  // **New UseEffect: Constant Particle Generation**
  useEffect(() => {
    const generateParticles = () => {
      // Number of particles to generate each interval
      const numberOfParticles = 2; // Adjust as needed

      for (let i = 0; i < numberOfParticles; i++) {
        // Optionally, spawn particles near the mouse or randomly
        const newParticle = createRandomParticle();
        particlesRef.current.push(newParticle);
      }
    };

    // Generate particles every 500 milliseconds
    const intervalId = setInterval(generateParticles, 500); // Adjust interval as needed

    return () => {
      clearInterval(intervalId);
    };
  }, [gradientColors]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-[-1] pointer-events-none"
    />
  );
};

export default BackgroundCanvas;