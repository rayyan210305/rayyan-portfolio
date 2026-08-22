"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageCarouselProps {
  images: { src: string; alt: string }[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  function prev() {
    setCurrent((i) => (i === 0 ? total - 1 : i - 1));
  }
  function next() {
    setCurrent((i) => (i === total - 1 ? 0 : i + 1));
  }

  if (total === 0) return null;

  return (
    <div className="relative w-full h-64 sm:h-72 md:h-80 overflow-hidden group/carousel">
      {/* Image */}
      <div className="relative w-full h-full">
        {images.map((img, i) => (
          <div
            key={img.src}
            className="absolute inset-0 transition-opacity duration-500 ease-in-out"
            style={{ opacity: i === current ? 1 : 0 }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover object-top"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {/* Bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/40 to-transparent pointer-events-none" />

      {/* Navigation arrows */}
      {total > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous screenshot"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white/70 hover:text-white hover:bg-black/70 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-200"
          >
            ‹
          </button>
          <button
            onClick={next}
            aria-label="Next screenshot"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white/70 hover:text-white hover:bg-black/70 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-200"
          >
            ›
          </button>
        </>
      )}

      {/* Dots */}
      {total > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Screenshot ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                i === current
                  ? "bg-white w-5"
                  : "bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
