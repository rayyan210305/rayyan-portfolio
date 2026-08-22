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
    <div className="relative w-full h-[28rem] sm:h-[32rem] md:h-[36rem] overflow-hidden group/carousel select-none">
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
              sizes="(max-width: 768px) 100vw, 900px"
              className="object-cover object-top"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {/* Bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/50 to-transparent pointer-events-none" />

      {/* Caption */}
      {images[current] && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
          <span className="text-xs font-mono text-white/50 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
            {images[current].alt}
          </span>
        </div>
      )}

      {/* Navigation arrows — always visible */}
      {total > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous screenshot"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/80 hover:text-white hover:bg-black/80 flex items-center justify-center transition-all duration-200 z-10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next screenshot"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/80 hover:text-white hover:bg-black/80 flex items-center justify-center transition-all duration-200 z-10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots + counter */}
      {total > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
          <span className="text-[10px] font-mono text-white/40 tabular-nums">
            {current + 1}/{total}
          </span>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Screenshot ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "bg-accent w-6"
                  : "bg-white/25 w-2 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
