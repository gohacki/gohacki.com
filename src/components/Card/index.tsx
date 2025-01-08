"use client";

import Image from "next/image";
import styles from "./style.module.scss";
import { useTransform, motion, useScroll } from "framer-motion";
import React, { useRef } from "react";

interface CardProps {
  i: number;
  title: string;
  description: string;
  src: string;
  url?: string;      // e.g. "See more" link
  color?: string;    // background color
  progress?: any;    // scrollYProgress from parent
  range?: number[];  // e.g. [start, end]
  targetScale?: number;
}

/**
 * Card component that scales and parallax-transforms 
 * while scrolling.
 */
const Card: React.FC<CardProps> = ({
  i,
  title,
  description,
  src,
  url,
  color = "#bbb",       // fallback color
  progress,
  range = [0, 1],       // start -> end
  targetScale = 0.9,
}) => {
  const container = useRef<HTMLDivElement>(null);

  // A second scrollYProgress if needed for the image itself
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  // Scale the entire card from 1.0 -> targetScale
  const scale = useTransform(progress, range, [1, targetScale]);

  // For example, scale the image from 2 -> 1
  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);

  return (
    <div ref={container} className={styles.cardContainer}>
      <motion.div
        className={styles.card}
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`, // similar to your example
        }}
      >
        <h2>{title}</h2>
        <div className={styles.body}>
          <div className={styles.description}>
            <p>{description}</p>
            {url && (
              <span>
                <a href={url} target="_blank" rel="noreferrer">
                  See more
                </a>
                <svg
                  width="22"
                  height="12"
                  viewBox="0 0 22 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.5303 6.53033C21.8232 6.23744 21.8232 
                    5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 
                    15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 
                    15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 
                    10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 
                    11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 
                    11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 
                    5.25L0 6.75Z"
                    fill="black"
                  />
                </svg>
              </span>
            )}
          </div>

          <div className={styles.imageContainer}>
            <motion.div
              className={styles.inner}
              style={{ scale: imageScale }}
            >
              <Image
                fill
                src={src}
                alt={title}
                priority={i === 0} // maybe prioritize the first image
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Card;
