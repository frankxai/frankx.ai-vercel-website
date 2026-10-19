'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TOCItem } from '../types';

interface BookTOCProps {
  items: TOCItem[];
  activeClass: string;
}

export default function BookTOC({ items, activeClass }: BookTOCProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -35% 0px' }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const pos = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: pos, behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-24 right-6 z-40 p-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg hover:border-white/20 transition-all cursor-pointer"
        aria-label="Toggle table of contents"
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <svg className="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg className="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        )}
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
          />
        )}
      </AnimatePresence>

      {/* TOC Panel */}
      <motion.aside
        role="navigation"
        aria-label="Table of contents"
        initial={false}
        animate={{ x: isOpen ? 0 : '100%' }}
        className="fixed top-24 right-6 w-72 max-h-[calc(100vh-8rem)] overflow-y-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl p-6 space-y-4 z-40 lg:translate-x-0 scrollbar-thin scrollbar-thumb-white/10"
      >
        <div className="space-y-2">
          <h3 className="font-serif text-lg font-bold text-white">Contents</h3>
          <p className="text-xs text-white/40">Click to navigate</p>
        </div>

        <nav className="space-y-1">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all cursor-pointer ${
                item.level === 2 ? 'pl-3' : 'pl-6'
              } ${
                activeId === item.id
                  ? activeClass
                  : 'text-white/40 hover:bg-white/5 hover:text-white/70'
              }`}
            >
              {item.text}
            </button>
          ))}
        </nav>
      </motion.aside>
    </>
  );
}
