'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface BookProgressProps {
  gradientClass: string;
}

export default function BookProgress({ gradientClass }: BookProgressProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      setPercentage(Math.round(v * 100));
    });
  }, [scrollYProgress]);

  return (
    <>
      <motion.div
        className={`fixed top-0 left-0 right-0 h-[3px] ${gradientClass} origin-left z-50`}
        style={{ scaleX }}
      />
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.8,
        }}
        transition={{ duration: 0.2 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 flex items-center gap-2 px-4 py-3 bg-white/10 backdrop-blur-md text-white rounded-full shadow-lg hover:scale-105 transition-transform z-40 border border-white/10 cursor-pointer"
        aria-label="Scroll to top"
        style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
      >
        <span className="text-xs font-medium tabular-nums">{percentage}%</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </>
  );
}
