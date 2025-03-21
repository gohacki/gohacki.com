"use client"; // Add this directive

import { useEffect, useState } from 'react';

export default function Footer() {
  const [year, setYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative mt-8 p-8 text-center text-sm font-light text-gray-600 dark:text-gray-300">
      <p className="opacity-80">
         Miro Gohacki. {year}
      </p>
    </footer>
  );
}