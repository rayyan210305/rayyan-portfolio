"use client";

import { motion } from "framer-motion";
import Network3D from "./Network3D";
import { useLanguage } from "@/lib/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Network Background */}
      <div className="absolute inset-0 -z-10">
        <Network3D />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold text-white tracking-tighter mb-6"
        >
          RAYYAN
          <br />
          <span className="text-5xl md:text-7xl font-light text-white/80 tracking-tight">
            Mardhatillah
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-4"
        >
          <p className="text-lg md:text-xl text-white/80 font-light">
            {t.hero.subtitle}
          </p>
          <p className="text-sm text-white/60 mt-1 font-mono">
            {t.hero.tagline}
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-24 h-px bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-8"
        />

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="px-8 py-3 bg-accent/10 border border-accent/30 rounded-full text-sm font-medium text-white hover:bg-accent/20 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10"
          >
            {t.hero.viewWork}
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-white/10 rounded-full text-sm font-medium text-white/70 hover:text-white hover:border-white/30 transition-all duration-300"
          >
            {t.hero.contactMe}
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-1 bg-white/40 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
