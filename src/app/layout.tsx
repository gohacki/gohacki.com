// src/app/layout.tsx
"use client";
import '../styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ThemeProvider } from 'next-themes';
import { useState, useEffect } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('');

  // Dynamically determine the theme during hydration
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    setTheme(storedTheme || 'light'); // Default to light if no theme is stored
  }, []);

  return (
    <html lang="en" className={theme === 'dark' ? 'dark' : ''}>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;900&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="flex flex-col min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-[#0a0a0a] dark:to-[#1a1a1a] transition-all duration-500 ease-in-out">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}