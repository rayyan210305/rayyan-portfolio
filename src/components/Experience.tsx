"use client";

import { motion } from "framer-motion";
import {
  fadeUp,
  slideInLeft,
  slideInRight,
  staggerContainer,
  staggerItem,
  VIEWPORT,
} from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";

export default function Experience() {
  const { t } = useLanguage();
  const experiences = t.experience.items.map((item, i) => ({
    id: i + 1,
    role: item.role,
    company: item.company,
    period: item.period,
    description: item.description,
    tags: item.tags,
  }));

  return (
    <section id="experience" className="py-32 px-6">
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            {t.experience.title}
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                } items-center md:items-start gap-6`}
                variants={index % 2 === 0 ? slideInRight : slideInLeft}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-accent border-4 border-background -translate-x-1/2 z-10" />

                {/* Content */}
                <div
                  className={`flex-1 ml-10 md:ml-0 ${
                    index % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"
                  }`}
                >
                  <div className="p-6 rounded-2xl glass">
                    <p className="font-mono text-xs text-accent/90 mb-2">
                      {exp.period}
                    </p>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {exp.role}
                    </h3>
                    <p className="text-sm text-white/60 mb-3">{exp.company}</p>
                    <p className="text-sm text-white/60 leading-relaxed mb-4">
                      {exp.description}
                    </p>
                    <motion.div
                      className="flex flex-wrap gap-2"
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="visible"
                      viewport={VIEWPORT}
                    >
                      {exp.tags.map((tag) => (
                        <motion.span
                          key={tag}
                          variants={staggerItem}
                          className="text-xs font-mono text-accent/80 bg-accent/10 px-2 py-1 rounded"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
