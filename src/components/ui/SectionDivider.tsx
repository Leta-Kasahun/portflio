"use client";

import { useEffect, useRef } from "react";

type SectionDividerProps = {
  speed?: number;
  className?: string;
};

export function SectionDivider({
  speed = 1,
  className = "",
}: SectionDividerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const orb = orbRef.current;
    const trail = trailRef.current;
    if (!container || !orb) return;

    let isVisible = true;
    let animId: number;
    let currentX = Math.random() * 60;
    let isMoving = true;
    let pauseFrames = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(container);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const width = container.clientWidth || window.innerWidth;
      const trailWidth = Math.min(180, Math.max(80, width * 0.22));

      if (!isMoving) {
        pauseFrames--;
        orb.style.opacity = "0";
        if (trail) trail.style.opacity = "0";
        if (pauseFrames <= 0) {
          currentX = -30;
          isMoving = true;
        }
        return;
      }

      const step = 4.2 * speed;
      currentX += step;

      if (currentX >= width + 30) {
        currentX = width + 30;
        isMoving = false;
        orb.style.opacity = "0";
        if (trail) trail.style.opacity = "0";
        pauseFrames = Math.floor(14 + Math.random() * 12);
      } else {
        const edgeDist = Math.min(currentX, width - currentX);
        const edgeFade = Math.max(0, Math.min(1, edgeDist / 120));

        orb.style.opacity = `${edgeFade}`;
        orb.style.transform = `translate3d(${currentX}px, -50%, 0)`;

        if (trail) {
          const trailLeft = Math.max(0, currentX - trailWidth);
          const currentTrailWidth = Math.max(0, currentX - trailLeft);
          trail.style.left = `${trailLeft}px`;
          trail.style.width = `${currentTrailWidth}px`;
          trail.style.opacity = `${edgeFade * 0.9}`;
        }
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, [speed]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-6 flex items-center overflow-hidden my-1 sm:my-1.5 ${className}`}
      aria-hidden="true"
    >
      <div
        className="relative w-full h-[1px] shadow-[0_0_6px_rgba(63,199,176,0.2)]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(63,199,176,0.04) 6%, rgba(63,199,176,0.2) 18%, rgba(63,199,176,0.38) 50%, rgba(63,199,176,0.2) 82%, rgba(63,199,176,0.04) 94%, transparent 100%)",
        }}
      >
        <div
          ref={trailRef}
          className="absolute top-0 h-full bg-gradient-to-r from-transparent via-[#3FC7B0]/25 to-[#3FC7B0]/80 shadow-[0_0_6px_rgba(63,199,176,0.3)] pointer-events-none"
          style={{ willChange: "left, width, opacity" }}
        />

        <div
          ref={orbRef}
          className="absolute top-1/2 left-0 -translate-y-1/2 -ml-[9px] flex items-center justify-center pointer-events-none"
          style={{ willChange: "transform, opacity" }}
        >
          <div className="absolute h-5 w-5 rounded-full bg-[#3FC7B0]/20 blur-[4px]" />
          <div className="relative h-[5px] w-[5px] rounded-full bg-[#3FC7B0] shadow-[0_0_6px_#3FC7B0,0_0_12px_rgba(63,199,176,0.5)]" />
        </div>
      </div>
    </div>
  );
}
