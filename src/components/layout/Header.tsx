"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { NavBar } from "@/components/navigation/NavBar";
import { MobileNav } from "@/components/navigation/MobileNav";
import { Logo } from "@/components/ui/Logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-all duration-300 ${
        scrolled
          ? "border-[#22282B] bg-[#0E1113]/90 backdrop-blur-md shadow-2xl"
          : "border-[#22282B]/60 bg-[#0E1113]/70 backdrop-blur-md"
      }`}
    >
      <Container className="flex h-16 items-center justify-between">
        <Logo />
        <NavBar />
        <MobileNav />
      </Container>
    </header>
  );
}
