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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 backdrop-blur-md ${
        scrolled
          ? "border-b border-[#22282B]/60 bg-[#0E1113]/40"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-2">
        <Logo />
        <NavBar />
        <MobileNav />
      </Container>
    </header>
  );
}
