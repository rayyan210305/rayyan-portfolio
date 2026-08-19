import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  demoUrl?: string;
  githubUrl?: string;
}

export default function ProjectCard({
  title,
  description,
  tags,
  image,
  demoUrl,
  githubUrl,
}: ProjectCardProps) {
  return (
    <div className="group relative rounded-2xl glass overflow-hidden transition-all duration-300 hover:scale-[1.02]">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {image && (
        <div className="relative w-full h-48 overflow-hidden rounded-t-2xl">
          <Image
            src={image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent" />
        </div>
      )}

      <div className="p-6">
        <div className="relative flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono text-accent/80 bg-accent/10 px-2 py-1 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="relative text-xl font-semibold text-white mb-2 group-hover:text-accent transition-colors">
          {title}
        </h3>

        <p className="relative text-white/60 text-sm leading-relaxed mb-6">
          {description}
        </p>

        <div className="relative flex items-center gap-4">
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-1"
            >
              Live Demo →
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
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
  );
}
