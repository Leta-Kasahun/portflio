export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0E1113]">
      <div className="relative flex items-center justify-center">
        <div className="h-14 w-14 rounded-full border-2 border-[#22282B] border-t-[#3FC7B0] animate-spin" />
        <div className="absolute h-8 w-8 rounded-full border border-[#22282B]/80 border-b-[#3FC7B0]/60 animate-spin [animation-direction:reverse] [animation-duration:1.2s]" />
        <div className="absolute h-2 w-2 rounded-full bg-[#3FC7B0] shadow-[0_0_10px_rgba(63,199,176,0.8)] animate-ping" />
      </div>
      <div className="mt-6 flex flex-col items-center gap-1.5">
        <span className="font-mono text-xs font-medium tracking-[0.25em] text-[#3FC7B0] uppercase animate-pulse">
          Initializing
        </span>
        <span className="font-mono text-[11px] font-light tracking-wider text-[#8A9295]">
          Loading telemetry & systems...
        </span>
      </div>
    </div>
  );
}
