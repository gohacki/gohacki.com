// src/app/page.tsx
import SpiralArrow from '../components/SpiralArrow';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col items-center text-center pt-32">
      <div className="relative z-10 mb-8"> {/* Adjust margin-top as needed */}
        <Image
          src="/images/miro.png" // Ensure your picture is in public/images/
          alt="Miro Gohacki"
          width={200}
          height={200}
          className="rounded-full border-4 border-pink-500 shadow-lg"
        />
      </div>
      {/* <SpiralArrow /> */}
      <h1 className="text-5xl md:text-6xl font-extrabold gradient-text drop-shadow-lg mb-6 animate-fadeInUp">
        Miro Gohacki
      </h1>
      <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 max-w-xl mb-8 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
        Hi! I&apos;m Miro, a Computer Science Student. Welcome to my personal website where you can learn more about me, my work, and how to get in touch.
      </p>
      <div className="space-x-4 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
        <a 
          href="/about" 
          className="inline-block px-6 py-3 rounded-full bg-pink-500 text-white font-medium hover:bg-pink-600 transition-all duration-300 transform hover:scale-105"
        >
          Learn More About Me
        </a>
        <a 
          href="/contact" 
          className="inline-block px-6 py-3 rounded-full bg-gray-300 dark:bg-gray-800 text-gray-800 dark:text-gray-100 font-medium hover:bg-gray-400 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
        >
          Get in Touch
        </a>
      </div>
    </div>
  );
}