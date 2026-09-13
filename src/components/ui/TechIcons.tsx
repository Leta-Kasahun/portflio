import React from "react";

type TechIconProps = {
  name: string;
  className?: string;
  useOfficialColor?: boolean;
};

export function getOfficialTechColor(name: string): string {
  const norm = name.toLowerCase().replace(/[\s.-]/g, "");
  if (norm.includes("typescript") || norm === "ts") return "#3178C6";
  if (norm.includes("javascript") || norm === "js") return "#F7DF1E";
  if (norm.includes("next")) return "#FFFFFF";
  if (norm.includes("tailwind")) return "#38BDF8";
  if (norm.includes("php")) return "#777BB4";
  if (norm.includes("mysql")) return "#00758F";
  if (norm.includes("springboot") || norm.includes("spring")) return "#6DB33F";
  if (norm.includes("java")) return "#ED8B00";
  if (norm.includes("postgres") || norm.includes("psql")) return "#4169E1";
  if (norm.includes("react")) return "#61DAFB";
  if (norm.includes("node")) return "#5FA04E";
  if (norm.includes("express")) return "#FFFFFF";
  if (norm.includes("mongo")) return "#47A248";
  if (norm.includes("python")) return "#3776AB";
  if (norm.includes("docker")) return "#2496ED";
  if (norm.includes("redis")) return "#DC382D";
  if (norm.includes("graphql")) return "#E10098";
  return "#3FC7B0";
}

export function TechIcon({
  name,
  className = "h-4 w-4",
  useOfficialColor = true,
}: TechIconProps) {
  const norm = name.toLowerCase().replace(/[\s.-]/g, "");
  const color = useOfficialColor ? getOfficialTechColor(name) : undefined;
  const style = color ? { color } : undefined;

  if (norm.includes("next")) {
    return (
      <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.328 14.896l-4.71-6.196v6.196H9.155V7.728h1.463l5.069 6.643V7.728h1.463v9.168h-1.822z" />
      </svg>
    );
  }

  if (norm.includes("typescript") || norm === "ts") {
    return (
      <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 3h18v18H3V3zm10.72 13.52c.41.22.95.38 1.62.38 1.05 0 1.64-.53 1.64-1.34 0-.74-.45-1.15-1.33-1.48l-.58-.22c-1.3-.49-2.07-1.25-2.07-2.39 0-1.44 1.13-2.47 2.92-2.47.8 0 1.41.16 1.77.34l-.36 1.25c-.29-.14-.79-.3-1.42-.3-.98 0-1.48.51-1.48 1.18 0 .69.46 1.07 1.39 1.43l.58.22c1.4.52 2.05 1.29 2.05 2.47 0 1.5-1.16 2.54-3.12 2.54-.86 0-1.63-.2-2.04-.43l.45-1.37zM9.54 7.64v1.39H7.66v7.47H6.12V9.03H4.25V7.64h5.29z" />
      </svg>
    );
  }

  if (norm.includes("javascript") || norm === "js") {
    return (
      <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 3h18v18H3V3zm13.1 14.8c1.9 0 2.9-.9 2.9-2.6v-5.4h-2.1v5.3c0 .8-.4 1.1-1.1 1.1-.6 0-1.1-.3-1.4-.7l-1.3 1.2c.7 1.2 1.8 1.7 3 1.7zm-6.2-3.8c0-1.3-.8-1.9-2.2-2.5l-.6-.3c-.8-.4-1.2-.7-1.2-1.3 0-.6.5-1.1 1.3-1.1.8 0 1.3.4 1.7.9l1.4-1.1c-.8-1.1-1.9-1.5-3.1-1.5-2 0-3.3 1.3-3.3 3 0 1.3.8 2 2.2 2.5l.6.3c.9.4 1.3.8 1.3 1.4 0 .7-.6 1.2-1.5 1.2-.9 0-1.6-.4-2.1-1.2l-1.4 1.1c.8 1.4 2 2 3.5 2 2.1 0 3.5-1.2 3.5-3z" />
      </svg>
    );
  }

  if (norm.includes("tailwind")) {
    return (
      <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
      </svg>
    );
  }

  if (norm.includes("php")) {
    return (
      <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-4.75 13.5l.8-4.25H6.6l.2-1h2.2l.4-2.25h1.25l-.4 2.25h1.45l.2-1h1.25l-.2 1h.75c.8 0 1.45.25 1.75.75.3.45.3 1.1.05 1.8-.3.9-.9 1.5-1.75 1.8-.5.15-1.1.15-1.75.15H11.2l-.4 2h-1.25l.4-2H8.5l-.4 2H7.25zm9.5-2.25c.35-.95.3-1.65-.1-2.05-.4-.4-1.05-.55-1.95-.55h-2.1l-.85 4.5h1.35l.3-1.65h.95c.95 0 1.7-.15 2.15-.65.15-.15.25-.35.3-.6z" />
      </svg>
    );
  }

  if (norm.includes("mysql")) {
    return (
      <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.5 4.5c-2.3 0-3.8 1.4-4.5 2.8-.7-1.4-2.2-2.8-4.5-2.8C4.5 4.5 2 7 2 10.2c0 4.1 4.5 7.8 10 11.3 5.5-3.5 10-7.2 10-11.3 0-3.2-2.5-5.7-5.5-5.7zm-4.5 14.5C7.2 15.7 4 12.8 4 10.2c0-2.1 1.6-3.7 3.5-3.7 2 0 3.2 1.4 3.7 2.4h1.6c.5-1 1.7-2.4 3.7-2.4 1.9 0 3.5 1.6 3.5 3.7 0 2.6-3.2 5.5-8 8.8z" opacity="0.15" />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
      </svg>
    );
  }

  if (norm.includes("springboot") || norm.includes("spring")) {
    return (
      <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.2 12.2c-.4 5.2-4.7 9.3-9.9 9.3-5.5 0-10-4.5-10-10 0-4.3 2.7-7.9 6.6-9.3.5 1.5 1.4 3.2 2.7 4.5 2.1 2.1 4.7 3.3 7.7 3.6.5.6.8 1.2.9 1.9zm-9.9-7.5c-4.2 0-7.7 3.4-7.7 7.7 0 1.2.3 2.4.8 3.4.6-.9 1.4-1.8 2.3-2.6 2.3-1.9 5-3 7.8-3.3-1-2.9-2.2-4.6-3.2-5.2z" />
      </svg>
    );
  }

  if (norm.includes("java")) {
    return (
      <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.85 16.84c-1.8.1-3.26-.25-4.41-.85 2.35 1.7 6.6 1.7 8.85 0-1.2.55-2.8.8-4.44.85zm6.85-2.4c-2.35.5-6.55.5-8.85 0 1.4.35 3 .4 4.45.4s3-.05 4.4-.4zm-4.4-4.8c1.3 1.2 2 2.7 2.1 4.1-1.3-.4-2.5-.9-3.8-1.5-.7-.3-1.4-.7-2-1.1 1.1-.5 2.4-1 3.7-1.5zm6.4 5.7c-1.4.8-3.6 1.3-6 1.4-2.4-.1-4.6-.6-6-1.4 1.4 1.2 3.8 1.9 6 2 2.2-.1 4.6-.8 6-2z" />
      </svg>
    );
  }

  if (norm.includes("postgres") || norm.includes("psql")) {
    return (
      <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.5 15.8c-2.5.3-4.9-.7-5.9-2.7l1.3-.8c.7 1.4 2.4 2.1 4.2 1.9.4-.1.7-.1 1.1-.3l.4 1.4c-.4.3-.7.4-1.1.5zm3-4c-.7 1.5-2 2.5-3.6 2.8l-.3-1.5c1.1-.2 2.1-.9 2.6-1.9.5-1 .5-2.2-.1-3.2-.8-1.3-2.2-2.1-3.8-2.1s-3 1-3.7 2.5l-1.3-.7C7.4 8.7 9 7.4 11.1 7.4c2.2 0 4.1 1.1 5.2 2.9.9 1.4.9 3.2.2 4.7z" />
      </svg>
    );
  }

  if (norm.includes("react")) {
    return (
      <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(30 12 12)" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(90 12 12)" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(150 12 12)" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="1.8" />
      </svg>
    );
  }

  if (norm.includes("node")) {
    return (
      <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l9 5.2v10.4L12 23l-9-5.4V7.2L12 2zm0 2.3L4.8 8.5v7.5L12 20.2l7.2-4.2V8.5L12 4.3zm-1 4.2h2v4.8l3.2-1.9v1.8L11 16.2V8.5z" />
      </svg>
    );
  }

  if (norm.includes("express")) {
    return (
      <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 17l4.5-6L4 5h2.5l3.2 4.4L12.9 5H15l-4.4 6 4.6 6h-2.5l-3.4-4.5L5.9 17H4zm13.5-1.5c-.8 0-1.4-.2-1.8-.7l.9-1c.2.3.6.5 1 .5.5 0 .8-.2.8-.5 0-.8-2.5-.4-2.5-2.2 0-.9.7-1.6 1.8-1.6.7 0 1.2.2 1.6.6l-.8 1.1c-.2-.2-.5-.4-.8-.4-.4 0-.6.2-.6.4 0 .8 2.5.4 2.5 2.2 0 1-.8 1.7-2.1 1.7z" />
      </svg>
    );
  }

  if (norm.includes("mongo")) {
    return (
      <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.1 2.2s-.3.3-.6.7C10.2 4.7 6.5 9.7 6.5 14.2c0 3.8 2.6 7.1 6.1 7.8v.2l.5.2.5-.2v-.2c3.5-.7 6.1-4 6.1-7.8 0-4.5-3.7-9.5-5-11.3-.3-.4-.6-.7-.6-.7zm-.6 18.2c-2.4-.6-4.1-2.9-4.1-5.6 0-3.1 2.5-7.1 4.1-9.2v14.8z" />
      </svg>
    );
  }

  if (norm.includes("docker")) {
    return (
      <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.186.185.186zm0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186zm-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186zm-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186zm5.893 2.714h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185zm-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185zm-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.136a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185zm-2.928 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H2.208a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185zM23.95 12.3c-.225-.333-.762-.572-1.344-.572-.21 0-.414.03-.604.088-.415-.845-1.282-1.428-2.302-1.428-.426 0-.822.102-1.17.279a.214.214 0 00-.097.085c-.328-.517-.89-.854-1.528-.854H1.47a.47.47 0 00-.47.47v.147C1 14.86 3.655 19.5 12.001 19.5c6.38 0 9.878-3.328 11.233-6.07.365-.13.684-.367.716-.83z" />
      </svg>
    );
  }

  if (norm.includes("redis")) {
    return (
      <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    );
  }

  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
