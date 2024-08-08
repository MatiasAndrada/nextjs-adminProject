"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const images = [
  "/ui/dark/dark (1).png",
  "/ui/dark/dark (2).png",
  "/ui/dark/dark (3).png",
  "/ui/dark/dark (4).png",
  "/ui/dark/dark (5).png",
  "/ui/dark/dark (6).png",
  // Añade más rutas de imágenes según sea necesario
];

const fadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3200); // Cambia la imagen cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      <AnimatePresence>
        {images.map((src, index) =>
          index === currentIndex ? (
            <motion.div
              key={src}
              variants={fadeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 1.4 }} // Duración de la animación de desvanecimiento
              className="absolute w-full h-full top-0 left-0"
            >
              <Image
                src={src}
                width={1200}
                height={900}
                alt={`Image ${index}`}
                objectFit="cover"
              />
            </motion.div>
          ) : null
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageCarousel;
