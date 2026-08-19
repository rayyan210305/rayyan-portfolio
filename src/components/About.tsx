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

const skillGroups = [
  { label: "Languages", skills: ["JavaScript", "Python", "HTML/CSS"] },
  { label: "Web Development", skills: ["React", "Node.js"] },
  { label: "Networking", skills: ["TCP/IP", "Network Configuration"] },
  { label: "Tools", skills: ["Git", "Linux"] },
];

export default function About() {
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
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            About Me
          </h2>
        </motion.div>

        {/* Profile Photo + Bio */}
        <motion.div
          className="flex flex-col md:flex-row items-center md:items-start gap-10 mb-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {/* Profile Photo */}
          <motion.div className="relative shrink-0" variants={fadeUp}>
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
            className="flex-1 space-y-5 text-white/60 leading-relaxed text-center md:text-left"
            variants={fadeUp}
          >
            <p>
              Mahasiswa Teknik Komputer yang memiliki ketertarikan pada bidang
              networking dan web development. Saat ini saya terus mengembangkan
              kemampuan dalam membangun sistem berbasis web, memahami
              infrastruktur jaringan, serta memanfaatkan AI sebagai tools untuk
              membantu proses development dan pembelajaran.
            </p>
            <p>
              Saya memiliki tujuan untuk berkembang menjadi Network &amp; Web
              Engineer yang mampu membangun sistem yang efektif dan terintegrasi.
            </p>
          </motion.div>
        </motion.div>

        {/* Skills & Tools Glass Panel */}
        <motion.div
          className="p-8 rounded-2xl glass border border-white/10"
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <h3 className="font-mono text-sm text-accent/80 tracking-wider uppercase mb-6">
            Skills &amp; Tools
          </h3>
          <div className="space-y-5">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <p className="font-mono text-xs text-white/50 mb-2">
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
                      className="px-3 py-1.5 text-xs text-white/70 bg-white/5 border border-white/10 rounded-lg hover:border-accent/30 transition-colors"
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
