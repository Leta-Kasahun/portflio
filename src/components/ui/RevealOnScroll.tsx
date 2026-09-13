"use client";

import { useEffect, useRef, useState, ReactNode, CSSProperties } from "react";

type RevealDirection = "up" | "down" | "left" | "right" | "none";

type RevealOnScrollProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: RevealDirection;
  duration?: number;
  threshold?: number;
};

function getTransformClasses(direction: RevealDirection, isVisible: boolean): string {
  if (isVisible) {
    return "opacity-100 translate-x-0 translate-y-0 scale-100";
  }

  switch (direction) {
    case "up":
      return "opacity-0 translate-y-8";
    case "down":
      return "opacity-0 -translate-y-8";
    case "left":
      return "opacity-0 translate-x-8";
    case "right":
      return "opacity-0 -translate-x-8";
    case "none":
      return "opacity-0";
  }
}

export function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 800,
  threshold = 0.12,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px 40px 0px",
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  const style: CSSProperties = {
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
  };

  const transformClass = getTransformClasses(direction, isVisible);

  return (
    <div
      ref={ref}
      style={style}
      className={`transition-all will-change-transform ${transformClass} ${className}`}
    >
      {children}
    </div>
  );
}
