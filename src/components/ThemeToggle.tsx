// src/components/ThemeToggle.tsx
"use client";

import { useEffect, useState } from "react";

const storageKey = "theme-preference";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Function to get the current theme preference
  const getColorPreference = (): "light" | "dark" => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem(storageKey);
      if (storedTheme === "light" || storedTheme === "dark") {
        return storedTheme;
      } else {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      }
    }
    return "light"; // Default to light
  };

  // Function to apply the theme to the document
  const reflectPreference = (newTheme: "light" | "dark") => {
    const root = document.documentElement;

    // Set data-theme attribute
    root.setAttribute("data-theme", newTheme);

    // Toggle the 'dark' class for Tailwind CSS
    if (newTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Update aria-label for accessibility
    const toggleButton = document.querySelector(
      "#theme-toggle"
    ) as HTMLButtonElement | null;
    if (toggleButton) {
      toggleButton.setAttribute("aria-label", newTheme);
    }
  };

  // Function to set the theme preference
  const setPreference = (newTheme: "light" | "dark") => {
    localStorage.setItem(storageKey, newTheme);
    reflectPreference(newTheme);
  };

  // Toggle theme on button click
  const onClick = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setPreference(newTheme);
  };

  // Initialize theme on component mount
  useEffect(() => {
    const currentTheme = getColorPreference();
    setTheme(currentTheme);
    reflectPreference(currentTheme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const newSystemTheme = e.matches ? "dark" : "light";
      setTheme(newSystemTheme);
      setPreference(newSystemTheme);
    };
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <button
      className="theme-toggle"
      id="theme-toggle"
      title="Toggle light & dark mode"
      aria-label={theme}
      aria-live="polite"
      onClick={onClick}
    >
      <svg
        className="sun-and-moon"
        aria-hidden="true"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <mask className="moon" id="moon-mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <circle cx="24" cy="10" r="6" fill="black" />
        </mask>
        <circle
          className="sun"
          cx="12"
          cy="12"
          r="6"
          mask="url(#moon-mask)"
          fill="currentColor"
        />
        <g className="sun-beams" stroke="currentColor">
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </g>
      </svg>
    </button>
  );
};

export default ThemeToggle;