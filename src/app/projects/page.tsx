// src/app/projects/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import styles from "./Projects.module.css";
import Image from "next/image";
import Modal from "../../components/Modal";

interface GalleryImage {
  src: string;     // Thumbnail image
  gifSrc: string;  // GIF for modal
  alt: string;
}

const galleryImages: GalleryImage[] = [
  {
    src: "/images/TowerDefence.png",
    gifSrc: "/gifs/TowerDefence.gif",
    alt: "Tower Defence Project",
  },
  {
    src: "/images/ProjectTwo.png",
    gifSrc: "/gifs/ProjectTwo.gif",
    alt: "Project Two Overview",
  },
  {
    src: "/images/ProjectThree.png",
    gifSrc: "/gifs/ProjectThree.gif",
    alt: "Project Three Details",
  },
  {
    src: "/images/ProjectFour.png",
    gifSrc: "/gifs/ProjectFour.gif",
    alt: "Project Four Insights",
  },
];

export default function Projects() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<GalleryImage | null>(null);

  // Preload GIFs after the component mounts
  useEffect(() => {
    galleryImages.forEach((image) => {
      const gif = new window.Image(); // Use window.Image to reference the global constructor
      gif.src = image.gifSrc;
    });
  }, []);

  const openModal = (image: GalleryImage) => {
    setCurrentImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentImage(null);
    setIsModalOpen(false);
  };

  return (
    <div className="pt-32 animate-fadeInUp flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">My Projects</h1>
      <div className={styles.gallery}>
        {galleryImages.map((image, index) => (
          <Image
            key={index}
            src={image.src}
            alt={image.alt}
            width={400}
            height={400}
            className="cursor-pointer"
            onClick={() => openModal(image)}
            loading="lazy" // Ensure thumbnails are lazy-loaded
          />
        ))}
      </div>

      {/* Modal Implementation */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {currentImage && (
          <div className="flex flex-col items-center">
            <Image
              src={currentImage.gifSrc}
              alt={currentImage.alt}
              width={800}
              height={800}
              className="rounded-lg"
              priority // Optional: prioritize loading when in modal
            />
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-200">
              {currentImage.alt}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}