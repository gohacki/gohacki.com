// src/app/layout.tsx
"use client";

import "../styles/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;900&display=swap"
          rel="stylesheet"
        />
        {/* Inline script to set initial theme to prevent FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const storageKey = 'theme-preference';
                const getColorPreference = () => {
                  const storedTheme = localStorage.getItem(storageKey);
                  if (storedTheme === 'light' || storedTheme === 'dark') {
                    return storedTheme;
                  }
                  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                };
                const theme = getColorPreference();
                const root = document.documentElement;
                
                // Set data-theme attribute
                root.setAttribute('data-theme', theme);
                
                // Toggle 'dark' class for Tailwind CSS
                if (theme === 'dark') {
                  root.classList.add('dark');
                } else {
                  root.classList.remove('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-[#0a0a0a] dark:to-[#1a1a1a] transition-all duration-500 ease-in-out">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}