"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

export default function EpicWaysMotionLayer() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to("[data-epic-float]", {
        y: -10,
        duration: 3.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.35,
      });

      gsap.to("[data-epic-pulse]", {
        opacity: 0.42,
        scale: 1.05,
        duration: 2.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
      });

      gsap.to("[data-epic-gleam]", {
        backgroundPosition: "180% 0%",
        duration: 5.5,
        ease: "none",
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
