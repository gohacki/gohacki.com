// src/app/about/page.tsx
"use client";

import React from "react";

// Sample data for books and hobbies
const books = [
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    coverImage: "/images/books/clean_code.jpg",
    summary:
      "A Handbook of Agile Software Craftsmanship that emphasizes the importance of writing clean and maintainable code.",
  },
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    coverImage: "/images/books/pragmatic_programmer.jpg",
    summary:
      "A guide to becoming a better programmer by adopting pragmatic practices and mindsets.",
  },
  {
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    coverImage: "/images/books/intro_to_algorithms.jpg",
    summary:
      "Comprehensive textbook covering a wide range of algorithms in depth.",
  },
];

const hobbies = [
  { icon: "🎨", name: "Painting" },
  { icon: "📚", name: "Reading" },
  { icon: "🎸", name: "Playing Guitar" },
  { icon: "🏃‍♂️", name: "Running" },
  { icon: "🍳", name: "Cooking" },
  { icon: "🎮", name: "Gaming" },
];

export default function About() {
  return (
    <div className="pt-32 animate-fadeInUp px-4">
      {/* Header Section */}
      <h1 className="text-5xl text-center md:text-6xl font-extrabold gradient-text drop-shadow-lg pb-2 mb-16 animate-fadeInUp">About Me</h1>
      <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 max-w-2xl mx-auto text-center">
        A small subset of themes in my personal life.
      </p>
      {/* Spotify Embed Section */}
      <section className="mt-16 mb-16 px-4">
        <div className="glass p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-4 text-center">Some of my All time Favorites</h2>
          <div className="flex gap-x-2 flex-col md:flex-row">
            <div className="flex-auto spotify-embed-container mx-auto max-w-xl">
              <iframe src="https://open.spotify.com/embed/track/2eDdFHgqNJltzlvlZFVDWd?utm_source=generator" width="100%" height="500" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            </div>
            <div className="flex-auto spotify-embed-container mx-auto max-w-xl">
              <iframe src="https://open.spotify.com/embed/album/0Lg1uZvI312TPqxNWShFXL?utm_source=generator" width="100%" height="500" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            </div>
            <div className="flex-auto spotify-embed-container mx-auto max-w-xl">
              <iframe src="https://open.spotify.com/embed/album/0Lg1uZvI312TPqxNWShFXL?utm_source=generator" width="100%" height="500" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Currently Reading Section */}
      <section className="mt-16 mb-16 px-4">
        <div className="glass p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-4 text-center">Currently Reading</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {books.map((book, index) => (
              <div key={index} className="group perspective">
                <div className="relative preserve-3d group-hover:rotate-y-180 transition-transform duration-700">
                  {/* Front of the card */}
                  <div className="absolute w-full h-full backface-hidden">
                    <img
                      src={book.coverImage}
                      alt={`${book.title} cover`}
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                  </div>
                  {/* Back of the card */}
                  <div className="absolute w-full h-full backface-hidden rotate-y-180 flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
                    <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
                    <p className="text-gray-700 dark:text-gray-200">{book.author}</p>
                    <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm text-center">
                      {book.summary}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Hobbies Section */}
      <section className="mt-16 mb-16 px-4">
        <div className="glass p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-8 text-center">Other Hobbies</h2>
          <div className="relative mx-auto w-64 h-64 md:w-80 md:h-80">
            {hobbies.map((hobby, i) => {
              const angle = (360 / hobbies.length) * i;
              const radius = 100; // Adjust the radius as needed
              const x = radius * Math.cos((angle * Math.PI) / 180);
              const y = radius * Math.sin((angle * Math.PI) / 180);
              return (
                <div
                  key={i}
                  className="absolute flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:scale-110 transition-transform"
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                  title={hobby.name}
                >
                  <span className="text-2xl">{hobby.icon}</span>
                </div>
              );
            })}
            {/* Central Icon or Text */}
            <div className="absolute flex items-center justify-center w-16 h-16 rounded-full bg-pink-500 text-white shadow-lg left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              💡
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}