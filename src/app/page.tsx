// src/app/page.tsx
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import BackgroundCanvas from '../components/BackgroundCanvas';
import blurDataURL from '../data/blurDataURL.json';
import SparklyButton from '../components/SparklyButton'; // Import the SparklyButton component

export default function Home() {
  const [isImageLoaded, setImageLoaded] = useState(false);
  const [colorValue, setColorValue] = useState<number>(260); // Default hue for sparkles

  return (
    <div className="relative flex flex-col items-center text-center pt-32">
      {/* Background Canvas */}
      <BackgroundCanvas />
    
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
        <SparklyButton href="/about" color={colorValue}>
          Learn More About Me
        </SparklyButton>
        <SparklyButton href="/contact" color={colorValue}>
          Get in Touch
        </SparklyButton>
      </div>

      {/* Hue Slider */}
      <input
        type="range"
        min={0}
        max={360}
        className="mt-4"
        value={colorValue}
        onChange={(e) => setColorValue(Number(e.target.value))}
      />
    </div>
  );
}