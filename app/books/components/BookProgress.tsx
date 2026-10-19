'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

interface BookProgressProps {
  gradientClass: string;
}

export default function BookProgress({ gradientClass }: BookProgressProps) {
  const [isVisible, setIsVisible] = useState(false);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 100);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.div
        className={`fixed top-0 left-0 right-0 h-1 ${gradientClass} origin-left z-50`}
        style={{ scaleX: reducedMotion ? scrollYProgress : scaleX }}
      />
      {isVisible && <motion.button
        initial={reducedMotion ? false : { opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reducedMotion ? 0 : 0.2 }}
        onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })}
        className="fixed right-8 min-h-11 min-w-11 p-4 bg-white/10 backdrop-blur-md text-white rounded-full shadow-lg hover:scale-110 motion-reduce:transform-none transition-transform motion-reduce:transition-none z-40 border border-white/10 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        aria-label="Scroll to top"
        style={{ bottom: 'calc(var(--music-dock-height, 4rem) + 1rem)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>}
    </>
  );
}
