"use client";

import { useEffect, useRef } from "react";

export default function GradientMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const draw = () => {
      time += 0.003;

      const width = canvas.width;
      const height = canvas.height;

      // Clear with dark background
      ctx.fillStyle = "#0a0a0f";
      ctx.fillRect(0, 0, width, height);

      // Gradient blobs
      const blobs = [
        {
          x: width * 0.3 + Math.sin(time * 0.7) * width * 0.1,
          y: height * 0.4 + Math.cos(time * 0.5) * height * 0.1,
          radius: Math.min(width, height) * 0.4,
          color1: "rgba(99, 102, 241, 0.15)",
          color2: "rgba(99, 102, 241, 0)",
        },
        {
          x: width * 0.7 + Math.cos(time * 0.6) * width * 0.1,
          y: height * 0.6 + Math.sin(time * 0.8) * height * 0.1,
          radius: Math.min(width, height) * 0.35,
          color1: "rgba(167, 139, 250, 0.12)",
          color2: "rgba(167, 139, 250, 0)",
        },
        {
          x: width * 0.5 + Math.sin(time * 0.9) * width * 0.15,
          y: height * 0.3 + Math.cos(time * 0.4) * height * 0.15,
          radius: Math.min(width, height) * 0.3,
          color1: "rgba(96, 165, 250, 0.1)",
          color2: "rgba(96, 165, 250, 0)",
        },
      ];

      for (const blob of blobs) {
        const gradient = ctx.createRadialGradient(
          blob.x,
          blob.y,
          0,
          blob.x,
          blob.y,
          blob.radius
        );
        gradient.addColorStop(0, blob.color1);
        gradient.addColorStop(1, blob.color2);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      aria-hidden="true"
    />
  );
}
