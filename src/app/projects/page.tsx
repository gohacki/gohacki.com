"use client";

import React, { useEffect, useRef } from "react";
import { useScroll } from "framer-motion";
import Lenis from "lenis"; 
import Card from "@/components/Card"; // Adjust to your path
import "./projects.scss";            // optional additional styling

// Example "projects" data — you can adapt
// Example "projects" data with purple-pink styled gradients
const projectsData = [
  {
    title: "Tower Defence Project",
    description: "A small tower defense game built in X.",
    src: "/images/TowerDefence.png",
    url: "https://github.com/...",
    // Purple 500 -> Pink 500
    color: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
  },
  {
    title: "GiveGyftly.com",
    description: "Detailed overview of project two.",
    src: "/images/Gyftly.png",
    color: "linear-gradient(135deg, #c084fc 0%, #f9a8d4 100%)",
  },
  {
    title: "Project Three Details",
    description: "Exploring key challenges and solutions.",
    src: "/images/CodeBuilder.png",
    color: "linear-gradient(135deg, #d946ef 0%, #f472b6 100%)",
  },
  {
    title: "Real Estate Listing Platform",
    description: "Lessons learned and future directions.",
    src: "/images/RealEstate.png",
    color: "linear-gradient(135deg, #9333ea 0%, #db2777 100%)",
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
    <>
    <div className="flex flex-col items-center text-center">
    <div className="pt-32 animate-fadeInUp px-4">
      {/* Header Section */}
      <h1 className="text-5xl text-center md:text-6xl font-extrabold gradient-text drop-shadow-lg pb-2 mb-16 animate-fadeInUp">Projects</h1>
    </div>
    <p
        className="text-lg md:text-xl text-gray-700 dark:text-gray-200 max-w-xl mb-8 animate-fadeInUp"
      >
        These are a few notable projects I am currently working on or have completed while attending college.
      </p>
      </div>
    <div className="pageContainer" ref={containerRef}>
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
    </>
  );
}
