"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const fadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const ImageCarousel = () => {
  const [theme, setTheme] = useState<string>("light");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const lightImages = [
    "/ui/light/light (1).png",
    "/ui/light/light (2).png",
    "/ui/light/light (3).png",
    "/ui/light/light (4).png",
    "/ui/light/light (5).png",
    "/ui/light/light (6).png",
  ];

  const darkImages = [
    "/ui/dark/dark (1).png",
    "/ui/dark/dark (2).png",
    "/ui/dark/dark (3).png",
    "/ui/dark/dark (4).png",
    "/ui/dark/dark (5).png",
    "/ui/dark/dark (6).png",
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      const themeSaved = storedTheme ? storedTheme : "light";
      setTheme(themeSaved);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) =>
          (prevIndex + 1) %
          (theme === "dark" ? darkImages.length : lightImages.length)
      );
    }, 3200);

    const initialDelay = setTimeout(() => {
      setIsLoaded(true);
    }, 50);

    return () => {
      clearInterval(interval);
      clearTimeout(initialDelay);
    };
  }, [theme]);

  const images = theme === "dark" ? darkImages : lightImages;

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      <AnimatePresence>
        {isLoaded &&
          images.map((src, index) =>
            index === currentIndex ? (
              <motion.div
                key={src}
                variants={fadeVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 1.4 }}
                className="absolute w-full h-full top-0 left-0"
              >
                <Image
                  src={src}
                  width={1200}
                  height={900}
                  alt={`Image ${index}`}
                  priority={index === 0}
                />
              </motion.div>
            ) : null
          )}
      </AnimatePresence>
    </div>
  );
};

export default ImageCarousel;
