"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add newsletter signup logic here
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <section className="py-24 px-6 gradient-bg-secondary">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-white"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Weekly Transmissions from the Edge
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Stories, frameworks, and breakthroughs from where AI meets creative consciousness.
            <br />
            No fluff, just transformation.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-6 py-4 rounded-full text-arcanea-shadow focus:outline-none focus:ring-2 focus:ring-frankx-gold"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-frankx-gold text-arcanea-void rounded-full font-bold hover:scale-105 transition-transform shadow-lg whitespace-nowrap"
              >
                Join the Frequency
              </button>
            </div>
          </form>

          <p className="mt-6 text-sm text-white/70">
            Join 10,000+ creators already on the journey. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
