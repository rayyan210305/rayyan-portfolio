"use client";

import { motion } from "framer-motion";
import {
  fadeUp,
  scaleIn,
  staggerContainer,
  staggerItem,
  VIEWPORT,
} from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";

export default function Education() {
  const { t } = useLanguage();
  return (
    <section id="education" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            {t.education.title}
          </h2>
        </motion.div>

        {/* Education Card */}
        <motion.div
          className="glass rounded-2xl p-8 relative overflow-hidden group hover:shadow-lg hover:shadow-accent/10 transition-all duration-500"
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {/* Accent line */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Left: Year badge */}
            <div className="flex-shrink-0">
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2">
                <span className="font-mono text-sm text-accent font-medium">
                  2023 — Present
                </span>
              </div>
            </div>

            {/* Right: Content */}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-foreground mb-1">
                {t.education.university}
              </h3>
              <p className="text-foreground/70 font-medium mb-2">
                {t.education.major}
              </p>
              <p className="text-muted text-sm leading-relaxed mb-4">
                {t.education.location}
              </p>

              {/* Relevant Coursework */}
              <div>
                <p className="text-foreground/80 text-xs font-mono mb-3">
                  {t.education.coursework}
                </p>
                <motion.div
                  className="flex flex-wrap gap-2"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT}
                >
                  {[
                    t.education.courses.computerNetworks,
                    t.education.courses.webDevelopment,
                    t.education.courses.databaseSystems,
                    t.education.courses.operatingSystems,
                    t.education.courses.softwareEngineering,
                    t.education.courses.dataStructures,
                  ].map((course) => (
                    <motion.span
                      key={course}
                      variants={staggerItem}
                      className="text-xs font-mono text-accent/80 bg-accent/10 border border-accent/10 rounded-lg px-3 py-1.5"
                    >
                      {course}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
