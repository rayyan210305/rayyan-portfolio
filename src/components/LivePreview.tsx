"use client";

import { useState } from "react";

interface LivePreviewProps {
  url: string;
  title: string;
}

export default function LivePreview({ url, title }: LivePreviewProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-[28rem] sm:h-[32rem] md:h-[36rem] overflow-hidden rounded-t-2xl bg-[#111119]">
      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 border-2 border-accent/40 border-t-accent rounded-full animate-spin" />
          <span className="text-xs font-mono text-white/40">
            Loading live preview…
          </span>
        </div>
      )}

      {/* Iframe */}
      <iframe
        src={url}
        title={title}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-popups"
        className={`absolute inset-0 w-full h-full border-0 transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transformOrigin: "top center",
          transform: "scale(1)",
          width: "100%",
          height: "100%",
        }}
        onLoad={() => setIsLoaded(true)}
      />

      {/* "Live" badge */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 bg-green-500/20 backdrop-blur-sm border border-green-500/30 px-2.5 py-1 rounded-full">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-[10px] font-mono text-green-300">LIVE</span>
      </div>
    </div>
  );
}
