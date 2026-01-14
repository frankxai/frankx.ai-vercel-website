'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { List, X } from 'lucide-react';
import type { TOCItem } from '../types';

interface TableOfContentsProps {
  items: TOCItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
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
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-24 right-6 z-40 p-3 bg-white dark:bg-slate-900 border-2 border-gray-200 dark:border-gray-800 rounded-lg shadow-lg hover:border-gray-900 dark:hover:border-white transition-colors cursor-pointer"
        aria-label="Toggle table of contents"
        aria-expanded={isOpen}
        aria-controls="toc-panel"
      >
        {isOpen ? <X className="w-5 h-5" /> : <List className="w-5 h-5" />}
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          />
        )}
      </AnimatePresence>

      {/* Table of Contents */}
      <motion.aside
        id="toc-panel"
        role="navigation"
        aria-label="Table of contents"
        initial={false}
        animate={{
          x: isOpen ? 0 : '100%',
        }}
        className={`
          fixed top-24 right-6 w-72 max-h-[calc(100vh-8rem)] overflow-y-auto
          bg-white dark:bg-slate-900 border-2 border-gray-200 dark:border-gray-800 rounded-xl shadow-xl
          p-6 space-y-4 z-40
          lg:translate-x-0
          scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700
        `}
      >
        <div className="space-y-2">
          <h3 className="font-serif text-lg font-bold text-gray-900 dark:text-white">
            Table of Contents
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Click to navigate
          </p>
        </div>

        <nav className="space-y-1">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`
                w-full text-left px-3 py-2 rounded-lg text-sm transition-all cursor-pointer
                ${item.level === 2 ? 'pl-3' : 'pl-6'}
                ${
                  activeId === item.id
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                }
              `}
            >
              {item.text}
            </button>
          ))}
        </nav>
      </motion.aside>
    </>
  );
}
