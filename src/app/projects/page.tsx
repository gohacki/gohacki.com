// src/app/projects/page.tsx
import React from 'react';
import styles from './Projects.module.css'; // Import the CSS module
import Image from 'next/image';

export default function Projects() {
  return (
    <div className="pt-32 animate-fadeInUp flex flex-col items-center">
      <h1 className="text-5xl md:text-6xl font-extrabold gradient-text drop-shadow-lg pb-2 mb-20 animate-fadeInUp">
        Projects
      </h1>
      <div className={styles.gallery}>
        <img
          src="https://picsum.photos/id/174/400/400"
          alt="A hot air balloon"
        />
        <img
          src="https://picsum.photos/id/188/400/400"
          alt="A sky photo of an old city"
        />
        <img
          src="https://picsum.photos/id/211/400/400"
          alt="A small boat"
        />
        <img
          src="https://picsum.photos/id/28/400/400"
          alt="A forest"
        />
      </div>
    </div>
  );
}