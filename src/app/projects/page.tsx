"use client";

import React, { useEffect, useRef } from "react";
import { useScroll } from "framer-motion";
import Lenis from "lenis"; 
import Card from "@/components/Card"; // Adjust to your path
import "./projects.scss";            // optional additional styling

// Example "projects" data — you can adapt
const projectsData = [
  {
    title: "Tower Defence Project",
    description: "A small tower defense game built in X.",
    src: "/images/towerdef.png", // change to your images
    url: "https://github.com/...",
    color: "#BBACAF",
  },
  {
    title: "Project Two Overview",
    description: "Detailed overview of project two.",
    src: "/images/project2.png",
    color: "#977F6D",
  },
  {
    title: "Project Three Details",
    description: "Exploring the key challenges and solutions.",
    src: "/images/project3.png",
    color: "#C2491D",
  },
  {
    title: "Project Four Insights",
    description: "Lessons learned and future directions.",
    src: "/images/project4.png",
    color: "#B62429",
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Hook to track overall scroll progress for the entire page
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // (Optional) Lenis: for a smooth scroll effect
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      // no cleanup necessary for lenis, but you can add if needed
    };
  }, []);

  return (
    <div className="pageContainer" ref={containerRef}>
      {/* You can style this container with a top margin, etc. */}
      {projectsData.map((project, i) => {
        // Calculate the scale for each card so they stack smaller & smaller
        const targetScale = 1 - (projectsData.length - i) * 0.05;

        return (
          <Card
            key={i}
            i={i}
            title={project.title}
            description={project.description || ""}
            src={project.src}
            url={project.url}
            color={project.color}
            progress={scrollYProgress}
            range={[i * 0.25, 1]}      // a rough example range
            targetScale={targetScale}
          />
        );
      })}
    </div>
  );
}
