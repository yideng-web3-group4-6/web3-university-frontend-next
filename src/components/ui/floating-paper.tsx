"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Coins, Wallet, Trophy } from "lucide-react";

export function FloatingPaper({ count = 5 }) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set isClient to true when component mounts on client
    setIsClient(true);

    // Update dimensions only on client side
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Only render floating papers when on client side and dimensions are set
  if (!isClient || dimensions.width === 0) {
    return <div className="relative w-full h-full"></div>;
  }

  const icons = [
    { icon: BookOpen, color: "text-blue-400/50" },
    { icon: Coins, color: "text-green-400/50" },
    { icon: Wallet, color: "text-purple-400/50" },
    { icon: Trophy, color: "text-orange-400/50" },
  ];

  return (
    <div className="relative w-full h-full">
      {Array.from({ length: count }).map((_, i) => {
        // Generate random values only on client side
        const initialX = Math.random() * dimensions.width;
        const initialY = Math.random() * dimensions.height;
        const animateX = [
          Math.random() * dimensions.width,
          Math.random() * dimensions.width,
          Math.random() * dimensions.width,
        ];
        const animateY = [
          Math.random() * dimensions.height,
          Math.random() * dimensions.height,
          Math.random() * dimensions.height,
        ];
        const duration = 20 + Math.random() * 10;
        const scale = 0.8 + Math.random() * 0.4;
        const selectedIcon = icons[Math.floor(Math.random() * icons.length)];

        return (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: initialX,
              y: initialY,
              scale: scale,
            }}
            animate={{
              x: animateX,
              y: animateY,
              rotate: [0, 180, 360],
              scale: [scale, scale * 1.2, scale],
            }}
            transition={{
              duration: duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <div className="relative w-16 h-20 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-center transform hover:scale-110 transition-transform">
              <selectedIcon.icon className={`w-8 h-8 ${selectedIcon.color}`} />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
