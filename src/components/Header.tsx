// src/components/Header.tsx
"use client";
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="fixed w-full z-50 top-0 left-0 px-4 py-2 md:py-3 glass backdrop-blur-sm shadow-lg transition-all duration-300">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-black gradient-text hover:scale-105 transform transition-transform duration-300">
          <Link href="/">Miro Gohacki</Link>
        </div>
        <div className="flex items-center space-x-6">
          <Link
            className="text-lg font-semibold hover:text-pink-500 transition-colors duration-300 hover:scale-105 transform"
            href="/"
          >
            Home
          </Link>
          <Link
            className="text-lg font-semibold hover:text-pink-500 transition-colors duration-300 hover:scale-105 transform"
            href="/about"
          >
            About
          </Link>
          <Link
            className="text-lg font-semibold hover:text-pink-500 transition-colors duration-300 hover:scale-105 transform"
            href="/contact"
          >
            Contact
          </Link>
          {/* Theme Toggle Button */}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}