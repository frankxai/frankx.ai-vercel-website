"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Communities from "@/components/Communities";
import Platforms from "@/components/Platforms";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />

      {/* Transition Section */}
      <section className="py-16 px-6 bg-gradient-to-b from-frankx-cloud to-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl md:text-2xl text-arcanea-twilight leading-relaxed font-light">
            I built my first enterprise AI system thinking technology was about efficiency.
            Then I created my first song and realized: <span className="gradient-text font-semibold">technology is about expansion</span>.
            Here's how you expand.
          </p>
        </div>
      </section>

      <Products />

      {/* Transition to Communities */}
      <section className="py-16 px-6 constellation-bg">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl md:text-2xl text-arcanea-shadow leading-relaxed font-light">
            The right operating system changes what's possible.
            The right <span className="gradient-text font-semibold">community changes who you become</span>.
          </p>
        </div>
      </section>

      <Communities />

      {/* Transition to Platforms */}
      <section className="py-16 px-6 bg-gradient-to-b from-white to-arcanea-void/5">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl md:text-2xl text-arcanea-twilight leading-relaxed font-light">
            Communities inspire. <span className="gradient-text font-semibold">Platforms enable</span>.
            Together, they transform.
          </p>
        </div>
      </section>

      <Platforms />
      <Newsletter />

      {/* Final Message */}
      <section className="py-20 px-6 bg-gradient-to-b from-arcanea-void to-arcanea-shadow text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl md:text-2xl leading-relaxed font-light mb-8">
            Every enterprise system I've built. Every song I've created. Every framework I've discovered.
          </p>
          <p className="text-2xl md:text-3xl gradient-text font-semibold">
            It all led here—to helping you build the creative future you were born for.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
