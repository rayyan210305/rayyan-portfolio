"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  fadeUp,
  fadeIn,
  scaleIn,
  staggerContainer,
  staggerItem,
  VIEWPORT,
} from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";

export default function About() {
  const { t } = useLanguage();

  const skillGroups = [
    { label: t.about.skillGroups.languages, skills: ["JavaScript", "Python", "HTML/CSS"] },
    { label: t.about.skillGroups.webDev, skills: ["React", "Node.js"] },
    { label: t.about.skillGroups.networking, skills: ["TCP/IP", "Network Configuration"] },
    { label: t.about.skillGroups.tools, skills: ["Git", "Linux"] },
  ];

  return (
    <section id="about" className="py-32 px-6">
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            {t.about.title}
          </h2>
        </motion.div>

        {/* Profile Photo + Bio — each animates independently on scroll */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10 mb-12">
          {/* Profile Photo */}
          <motion.div
            className="relative shrink-0"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            <div className="w-40 h-40 rounded-2xl glass overflow-hidden">
              <Image
                src="/profile.jpg"
                alt="Rayyan Mardhatillah"
                width={160}
                height={160}
                priority
                className="w-full h-full object-cover"
                style={{ objectPosition: "50% 15%" }}
                sizes="160px"
              />
            </div>
            {/* Online indicator */}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-background" />
          </motion.div>

          {/* Bio Text */}
          <motion.div
            className="flex-1 space-y-5 text-muted leading-relaxed text-center md:text-left"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            <p>{t.about.bio1}</p>
            <p>{t.about.bio2}</p>
          </motion.div>
        </div>

        {/* Skills & Tools Glass Panel */}
        <motion.div
          className="p-8 rounded-2xl glass"
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <h3 className="font-mono text-sm text-accent/80 tracking-wider uppercase mb-6">
            {t.about.skillsTitle}
          </h3>
          <div className="space-y-5">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <p className="font-mono text-xs text-muted/80 mb-2">
                  {group.label}
                </p>
                <motion.div
                  className="flex flex-wrap gap-2"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT}
                >
                  {group.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      variants={staggerItem}
                      className="px-3 py-1.5 text-xs text-foreground/70 bg-surface border border-foreground/10 rounded-lg hover:border-accent/30 transition-colors"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
