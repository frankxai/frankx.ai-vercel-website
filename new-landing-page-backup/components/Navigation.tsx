"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-arcanea-mist/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Image
              src="/images/generated-2025-10-24T23-14-22-718Z-1hbxy5.png"
              alt="FrankX.AI Logo"
              width={50}
              height={50}
              className="rounded-lg"
            />
            <span className="text-2xl font-bold gradient-text">FrankX.AI</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#products" className="text-arcanea-shadow hover:text-frankx-purple transition-colors font-medium">
              Products
            </a>
            <a href="#communities" className="text-arcanea-shadow hover:text-frankx-purple transition-colors font-medium">
              Communities
            </a>
            <a href="#platforms" className="text-arcanea-shadow hover:text-frankx-purple transition-colors font-medium">
              Platforms
            </a>
            <a href="#blog" className="text-arcanea-shadow hover:text-frankx-purple transition-colors font-medium">
              Blog
            </a>
            <a href="#resources" className="text-arcanea-shadow hover:text-frankx-purple transition-colors font-medium">
              Resources
            </a>
            <button className="px-6 py-2 gradient-bg-primary text-white rounded-full font-semibold hover:opacity-90 transition-opacity">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
              <span className={`block h-0.5 w-full bg-frankx-purple transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 w-full bg-frankx-purple transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-full bg-frankx-purple transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 pb-4 space-y-4"
          >
            <a href="#products" className="block text-arcanea-shadow hover:text-frankx-purple transition-colors font-medium">
              Products
            </a>
            <a href="#communities" className="block text-arcanea-shadow hover:text-frankx-purple transition-colors font-medium">
              Communities
            </a>
            <a href="#platforms" className="block text-arcanea-shadow hover:text-frankx-purple transition-colors font-medium">
              Platforms
            </a>
            <a href="#blog" className="block text-arcanea-shadow hover:text-frankx-purple transition-colors font-medium">
              Blog
            </a>
            <a href="#resources" className="block text-arcanea-shadow hover:text-frankx-purple transition-colors font-medium">
              Resources
            </a>
            <button className="w-full px-6 py-2 gradient-bg-primary text-white rounded-full font-semibold">
              Get Started
            </button>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
