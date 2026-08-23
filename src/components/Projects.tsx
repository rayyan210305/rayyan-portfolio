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
import { useLanguage } from "@/lib/LanguageContext";

interface FeaturedProject {
  title: string;
  description: string;
  tags: string[];
  images: { src: string; alt: string }[];
  githubUrl?: string;
  demoUrl?: string;
  demoLabel: string;
}

export default function Projects() {
  const { t } = useLanguage();

  const featuredProjects: FeaturedProject[] = [
    {
      title: t.projects.featuredTitle,
      description: t.projects.featuredDesc,
      tags: ["QR Code", "Barcode Scanner", "HTML/CSS", "JavaScript", "Node.js"],
      images: [
        { src: "/projects/lp3-login-hq.webp", alt: t.projects.imgLogin },
        { src: "/projects/lp3-dashboard-hq.webp", alt: t.projects.imgDashboard },
        { src: "/projects/lp3-scanner-hq.webp", alt: t.projects.imgScanner },
        { src: "/projects/lp3-participants-hq.webp", alt: t.projects.imgParticipants },
        { src: "/projects/lp3-attendance-hq.webp", alt: t.projects.imgAttendance },
      ],
      githubUrl: "https://github.com/rayyan210305/pramuka-attendance-2026",
      demoUrl: "https://pramuka-attendance-2026.vercel.app",
      demoLabel: t.projects.liveDemo,
    },
    {
      title: t.projects.kecapiTitle,
      description: t.projects.kecapiDesc,
      tags: ["Arduino", "IoT", "Servo Motor", "Piezo Sensor", "Assistive Tech"],
      images: [
        { src: "/projects/kecapi-innovillage.jpg", alt: t.projects.kecapiImgAlt },
      ],
      demoUrl: "https://youtu.be/K-NTwT_pkmY",
      demoLabel: t.projects.kecapiDemoLabel,
    },
  ];

  const otherProjects = [
    {
      title: t.projects.portfolioTitle,
      description: t.projects.portfolioDesc,
      tags: ["Next.js", "Three.js", "Tailwind"],
      image: "/projects/portfolio.svg",
      githubUrl: "https://github.com/rayyan210305/rayyan-portfolio",
      demoUrl: "https://rayyan-portfolio-nu.vercel.app",
    },
  ];
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
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            {t.projects.title}
          </h2>
        </motion.div>

        {/* Featured Projects — full width with carousel */}
        {featuredProjects.map((project) => (
          <motion.div
            key={project.title}
            className="mb-6"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            <div className="group relative rounded-2xl glass overflow-hidden transition-all duration-300 hover:scale-[1.01] border border-foreground/5 hover:border-accent/20">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <ImageCarousel images={project.images} />

              <div className="relative p-8">
                {/* Badge */}
                <div className="relative flex items-center gap-2 mb-4">
                  <span className="text-xs font-mono text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
                    {t.projects.featured}
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
                  {project.tags.map((tag) => (
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
                <h3 className="relative text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="relative text-muted text-sm leading-relaxed mb-6 max-w-2xl">
                  {project.description}
                </p>

                {/* Links */}
                <div className="relative flex items-center gap-4">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted hover:text-foreground transition-colors flex items-center gap-1"
                    >
                      {project.demoLabel}
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted hover:text-foreground transition-colors flex items-center gap-1"
                    >
                      GitHub →
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

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
