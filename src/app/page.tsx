// src/app/page.tsx
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import blurDataURL from '../data/blurDataURL.json';
import Link from 'next/link';


export default function Home() {
  const [isImageLoaded, setImageLoaded] = useState(false);
  const [colorValue, setColorValue] = useState<number>(260); // Default hue for sparkles

  return (
    <div className="relative flex flex-col items-center text-center pt-32">
      {/* Background Canvas */}
    
      {/* Profile Image */}
      <div className="relative z-10 mb-8">
        <Image
          src="/images/miro.png"
          alt="Miro Gohacki"
          width={400}
          height={400}
          className={`rounded-full border-2 border-pink-500 shadow-lg transition-opacity duration-700 ease-in-out ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          placeholder="blur"
          blurDataURL={blurDataURL.blurDataURL}
          priority
        />
      </div>

      {/* Title */}
      <h1 className="text-5xl md:text-6xl font-extrabold gradient-text drop-shadow-lg mb-6 animate-fadeInUp">
        Miro Gohacki
      </h1>

      {/* Subtitle */}
      <p
        className="text-lg md:text-xl text-gray-700 dark:text-gray-200 max-w-xl mb-8 animate-fadeInUp"
        style={{ animationDelay: '0.2s' }}
      >
        Hi! I&apos;m Miro, a Computer Science Student. Welcome to my personal website where you can learn more about me, my work, and how to get in touch.
      </p>

      {/* Sparkly Buttons */}
      <div
        className="flex justify-center space-x-4 animate-fadeInUp"
        style={{ animationDelay: '0.4s' }}
      >
      <Link href="/about" className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          About Me
        </span>
      </Link>

      <Link href="/contact" className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Get in Touch
        </span>
      </Link>
      </div>
    </div>
  );
}