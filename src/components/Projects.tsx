"use client";

import { motion } from "framer-motion";
import {
  fadeUp,
  scaleIn,
  staggerContainer,
  staggerItem,
  VIEWPORT,
} from "@/lib/animations";
import ProjectCard from "./ProjectCard";
import ImageCarousel from "./ImageCarousel";

const featuredProject = {
  title: "LP3 Putra XVII 2026 — Sistem Absensi QR",
  description:
    "Sistem absensi digital berbasis barcode & QR code untuk Lomba Perkemahan Pramuka Pesantren (LP3) Putra XVII 2026, Satuan Komunitas Gerakan Pramuka Aceh. Peserta di-scan via kamera, QR di-generate otomatis, dan kehadiran tercatat real-time.",
  tags: ["QR Code", "Barcode Scanner", "HTML/CSS", "JavaScript", "Node.js"],
  images: [
    { src: "/projects/lp3-dashboard.png", alt: "Dashboard LP3 — statistik kehadiran & scan log" },
    { src: "/projects/lp3-scanner.png", alt: "Halaman scanner absensi QR/Barcode" },
    { src: "/projects/lp3-participants.png", alt: "Data peserta LP3 Putra XVII" },
    { src: "/projects/lp3-attendance.png", alt: "Histori absensi real-time" },
  ],
  githubUrl: "https://github.com/rayyan210305/pramuka-attendance-2026",
  demoUrl: "https://pramuka-attendance-2026.vercel.app",
};

const otherProjects = [
  {
    title: "Portfolio Website",
    description:
      "Website portfolio pribadi dengan desain modern menggunakan Three.js, glass morphism, dan visualisasi 3D network.",
    tags: ["Next.js", "Three.js", "Tailwind"],
    image: "/projects/portfolio.svg",
    githubUrl: "https://github.com/rayyan210305/rayyan-portfolio",
    demoUrl: "https://rayyan-portfolio-nu.vercel.app",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6">
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
            Featured Projects
          </h2>
        </motion.div>

        {/* Featured Project — full width with carousel */}
        <motion.div
          className="mb-6"
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <div className="group relative rounded-2xl glass overflow-hidden transition-all duration-300 hover:scale-[1.01] border border-white/5 hover:border-accent/20">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <ImageCarousel images={featuredProject.images} />

            <div className="relative p-8">
              {/* Badge */}
              <div className="relative flex items-center gap-2 mb-4">
                <span className="text-xs font-mono text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
                  ★ Featured
                </span>
              </div>

              {/* Tags */}
              <motion.div
                className="relative flex flex-wrap gap-2 mb-4"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
              >
                {featuredProject.tags.map((tag) => (
                  <motion.span
                    key={tag}
                    variants={staggerItem}
                    className="text-xs font-mono text-accent/80 bg-accent/10 px-2 py-1 rounded-md"
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>

              {/* Title */}
              <h3 className="relative text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
                {featuredProject.title}
              </h3>

              {/* Description */}
              <p className="relative text-white/60 text-sm leading-relaxed mb-6 max-w-2xl">
                {featuredProject.description}
              </p>

              {/* Links */}
              <div className="relative flex items-center gap-4">
                {featuredProject.demoUrl && (
                  <a
                    href={featuredProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-1"
                  >
                    Live Demo →
                  </a>
                )}
                {featuredProject.githubUrl && (
                  <a
                    href={featuredProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-1"
                  >
                    GitHub →
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other Projects */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {otherProjects.map((project) => (
            <motion.div key={project.title} variants={staggerItem}>
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
