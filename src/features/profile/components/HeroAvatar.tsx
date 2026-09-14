"use client";

import { useState } from "react";
import Image from "next/image";

type HeroAvatarProps = {
  src: string;
  alt: string;
};

export function HeroAvatar({ src, alt }: HeroAvatarProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-tl-[28px] sm:rounded-tl-[44px] rounded-br-[28px] sm:rounded-br-[44px] rounded-tr-none rounded-bl-none border-2 border-[#3FC7B0]/70 bg-[#171B1D]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 300px, (max-width: 1024px) 380px, 460px"
        className={`object-cover object-top transition-all duration-700 ease-out ${
          loaded ? "opacity-100 scale-100" : "opacity-90 scale-[1.02]"
        }`}
        onLoad={() => setLoaded(true)}
        priority
      />
    </div>
  );
}
