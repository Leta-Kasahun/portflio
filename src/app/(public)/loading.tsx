export default function PublicLoading() {
  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center bg-[#0E1113] py-20">
      <div className="relative flex items-center justify-center">
        <div className="h-12 w-12 rounded-full border-2 border-[#22282B] border-t-[#3FC7B0] animate-spin" />
        <div className="absolute h-7 w-7 rounded-full border border-[#22282B]/80 border-b-[#3FC7B0]/60 animate-spin [animation-direction:reverse] [animation-duration:1.2s]" />
        <div className="absolute h-1.5 w-1.5 rounded-full bg-[#3FC7B0] shadow-[0_0_8px_rgba(63,199,176,0.8)] animate-ping" />
      </div>
      <div className="mt-5 flex flex-col items-center gap-1">
        <span className="font-mono text-xs font-medium tracking-[0.2em] text-[#3FC7B0] uppercase animate-pulse">
          Loading
        </span>
      </div>
    </div>
  );
}
