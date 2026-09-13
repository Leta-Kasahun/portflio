import { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function PublicLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[#0E1113] font-sans text-[#E7EAEA] selection:bg-[#3FC7B0]/20 selection:text-[#3FC7B0]">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
