// src/components/SparklyButton.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface SparklyButtonProps {
  href: string;
  children: React.ReactNode;
  color?: number; // Hue value for the sparkles
}

const SparklyButton: React.FC<SparklyButtonProps> = ({ href, children, color = 260 }) => {
  const router = useRouter();
  const btnRef = useRef<HTMLButtonElement>(null);

  // Add the "over" class on mount for initial animation
  useEffect(() => {
    const btn = btnRef.current;
    if (btn) {
      btn.classList.add("over");
      const timer = setTimeout(() => {
        btn.classList.remove("over");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Handle navigation on button click
  const handleClick = () => {
    router.push(href);
  };

  return (
    <button
      ref={btnRef}
      className="sparkles"
      style={{ "--clr": color } as React.CSSProperties}
      onClick={handleClick}
    >
      <span>{children}</span>
    </button>
  );
};

export default SparklyButton;