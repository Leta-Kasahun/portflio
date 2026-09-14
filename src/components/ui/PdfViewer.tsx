"use client";

import { useState, useEffect, useRef, useCallback } from "react";

type PdfViewerProps = {
  url: string;
  title?: string;
  className?: string;
};

type PdfModalProps = {
  url: string;
  title?: string;
  isOpen: boolean;
  onClose: () => void;
};

type PdfRenderTask = {
  promise: Promise<void>;
  cancel: () => void;
};

type PdfPage = {
  getViewport: (options: { scale: number; rotation: number }) => {
    width: number;
    height: number;
  };
  render: (context: {
    canvasContext: CanvasRenderingContext2D;
    viewport: { width: number; height: number };
  }) => PdfRenderTask;
};

type PdfDocumentProxy = {
  numPages: number;
  getPage: (pageNumber: number) => Promise<PdfPage>;
  destroy?: () => Promise<void>;
};

type PdfJsLib = {
  GlobalWorkerOptions: {
    workerSrc: string;
  };
  getDocument: (options: {
    url: string;
    withCredentials?: boolean;
    cMapUrl?: string;
    cMapPacked?: boolean;
  }) => {
    promise: Promise<PdfDocumentProxy>;
  };
};

function getPdfJs(): Promise<PdfJsLib> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Window not available"));
  }

  const win = window as unknown as Window & { pdfjsLib?: PdfJsLib };
  if (win.pdfjsLib) {
    return Promise.resolve(win.pdfjsLib);
  }

  return new Promise((resolve, reject) => {
    const existing = document.getElementById("pdfjs-lib-script");
    if (existing) {
      if (win.pdfjsLib) {
        resolve(win.pdfjsLib);
        return;
      }
      existing.addEventListener("load", () => {
        if (win.pdfjsLib) {
          win.pdfjsLib.GlobalWorkerOptions.workerSrc =
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
          resolve(win.pdfjsLib);
        } else {
          reject(new Error("PDF.js unavailable"));
        }
      });
      existing.addEventListener("error", () => reject(new Error("Failed to load script")));
      return;
    }

    const script = document.createElement("script");
    script.id = "pdfjs-lib-script";
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    script.async = true;
    script.onload = () => {
      if (win.pdfjsLib) {
        win.pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        resolve(win.pdfjsLib);
      } else {
        reject(new Error("PDF.js not loaded"));
      }
    };
    script.onerror = () => reject(new Error("Network error"));
    document.head.appendChild(script);
  });
}

export function PdfViewer({ url, title = "Document Viewer", className = "" }: PdfViewerProps) {
  const [pdfDoc, setPdfDoc] = useState<PdfDocumentProxy | null>(null);
  const [numPages, setNumPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoom, setZoom] = useState<number>(100);
  const [rotation, setRotation] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const renderTaskRef = useRef<PdfRenderTask | null>(null);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 20, 260));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 20, 40));
  const handleResetZoom = () => setZoom(100);

  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, numPages));

  const toggleFullscreen = () => setIsFullscreen((prev) => !prev);

  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);
    setHasError(false);

    getPdfJs()
      .then((pdfjs) => {
        return pdfjs.getDocument({
          url,
          cMapUrl: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/",
          cMapPacked: true,
        }).promise;
      })
      .then((doc) => {
        if (isCancelled) return;
        setPdfDoc(doc);
        setNumPages(doc.numPages || 1);
        setCurrentPage(1);
        setIsLoading(false);
      })
      .catch(() => {
        if (isCancelled) return;
        setHasError(true);
        setIsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [url]);

  const renderPage = useCallback(async () => {
    if (!pdfDoc || !canvasRef.current) return;

    if (renderTaskRef.current) {
      try {
        renderTaskRef.current.cancel();
      } catch {
      }
    }

    try {
      const page = await pdfDoc.getPage(currentPage);
      if (!canvasRef.current) return;

      const unscaledViewport = page.getViewport({ scale: 1.0, rotation });
      const containerWidth = containerRef.current?.clientWidth
        ? containerRef.current.clientWidth - 48
        : 800;

      const baseScale = Math.min(
        1.25,
        Math.max(0.55, containerWidth / unscaledViewport.width)
      );

      const effectiveScale = baseScale * (zoom / 100);
      const viewport = page.getViewport({ scale: effectiveScale, rotation });

      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (!context) return;

      const pixelRatio = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

      canvas.width = Math.floor(viewport.width * pixelRatio);
      canvas.height = Math.floor(viewport.height * pixelRatio);
      canvas.style.width = `${Math.floor(viewport.width)}px`;
      canvas.style.height = `${Math.floor(viewport.height)}px`;

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const renderContext = {
        canvasContext: context,
        viewport,
      };

      const task = page.render(renderContext);
      renderTaskRef.current = task;
      await task.promise;
      renderTaskRef.current = null;
    } catch (err: unknown) {
      if (
        err &&
        typeof err === "object" &&
        "name" in err &&
        (err as { name: string }).name === "RenderingCancelledException"
      ) {
        return;
      }
    }
  }, [pdfDoc, currentPage, zoom, rotation]);

  useEffect(() => {
    if (!isLoading && pdfDoc) {
      renderPage();
    }
  }, [renderPage, isLoading, pdfDoc]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      } else if (e.key === "+" || (e.ctrlKey && e.key === "=")) {
        e.preventDefault();
        setZoom((prev) => Math.min(prev + 20, 260));
      } else if (e.key === "-" || (e.ctrlKey && e.key === "-")) {
        e.preventDefault();
        setZoom((prev) => Math.max(prev - 20, 40));
      } else if (e.key === "0" && e.ctrlKey) {
        e.preventDefault();
        setZoom(100);
      } else if (e.key === "ArrowLeft" && currentPage > 1) {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
      } else if (e.key === "ArrowRight" && currentPage < numPages) {
        setCurrentPage((prev) => Math.min(prev + 1, numPages));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen, currentPage, numPages]);

  return (
    <div
      className={`flex flex-col w-full overflow-hidden border-2 border-[#22282B] bg-[#171B1D] ${
        isFullscreen
          ? "fixed inset-0 z-50 rounded-none h-screen"
          : "rounded-tl-[20px] sm:rounded-tl-[28px] rounded-br-[20px] sm:rounded-br-[28px] h-[75vh] sm:h-[84vh]"
      } ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#22282B] bg-[#121517] px-3 xs:px-4 py-2.5 shrink-0 select-none">
        <div className="flex items-center gap-2 min-w-0">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-[#3FC7B0]/40 bg-[#3FC7B0]/10 text-[#3FC7B0]">
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </span>
          <span className="truncate font-mono text-xs sm:text-sm font-medium text-white max-w-[140px] xs:max-w-[200px] sm:max-w-xs">
            {title}
          </span>
          <span className="hidden sm:inline-flex rounded border border-[#22282B] bg-[#0E1113] px-1.5 py-0.5 font-mono text-[10px] text-[#3FC7B0]">
            PDF
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1 xs:gap-1.5">
          {numPages > 1 ? (
            <div className="flex items-center rounded-lg border border-[#22282B] bg-[#0E1113] p-0.5">
              <button
                type="button"
                onClick={handlePrevPage}
                disabled={currentPage <= 1}
                className="flex h-7 w-7 items-center justify-center rounded text-[#8A9295] transition-colors hover:text-[#3FC7B0] disabled:opacity-30 disabled:hover:text-[#8A9295]"
                title="Previous Page"
                aria-label="Previous Page"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <span className="px-1.5 font-mono text-[11px] text-[#E7EAEA] select-none">
                {currentPage}/{numPages}
              </span>
              <button
                type="button"
                onClick={handleNextPage}
                disabled={currentPage >= numPages}
                className="flex h-7 w-7 items-center justify-center rounded text-[#8A9295] transition-colors hover:text-[#3FC7B0] disabled:opacity-30 disabled:hover:text-[#8A9295]"
                title="Next Page"
                aria-label="Next Page"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          ) : null}

          <div className="flex items-center rounded-lg border border-[#22282B] bg-[#0E1113] p-0.5">
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={zoom <= 40}
              className="flex h-7 w-7 items-center justify-center rounded text-[#8A9295] transition-colors hover:text-[#3FC7B0] disabled:opacity-30 disabled:hover:text-[#8A9295]"
              title="Zoom Out"
              aria-label="Zoom Out"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>

            <button
              type="button"
              onClick={handleResetZoom}
              className="px-2 font-mono text-[11px] font-medium text-[#E7EAEA] transition-colors hover:text-[#3FC7B0]"
              title="Reset Zoom to 100%"
            >
              {zoom}%
            </button>

            <button
              type="button"
              onClick={handleZoomIn}
              disabled={zoom >= 260}
              className="flex h-7 w-7 items-center justify-center rounded text-[#8A9295] transition-colors hover:text-[#3FC7B0] disabled:opacity-30 disabled:hover:text-[#8A9295]"
              title="Zoom In"
              aria-label="Zoom In"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>

          <button
            type="button"
            onClick={handleRotate}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#22282B] bg-[#0E1113] text-[#8A9295] transition-colors hover:border-[#3FC7B0] hover:text-[#3FC7B0]"
            title="Rotate 90°"
            aria-label="Rotate"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
          </button>

          <a
            href={url}
            download
            className="flex h-8 items-center gap-1 rounded-lg border border-[#22282B] bg-[#0E1113] px-2.5 font-mono text-xs text-[#E7EAEA] transition-colors hover:border-[#3FC7B0] hover:text-[#3FC7B0]"
            title="Download PDF"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span className="hidden sm:inline">Download</span>
          </a>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 items-center gap-1 rounded-lg border border-[#22282B] bg-[#0E1113] px-2.5 font-mono text-xs text-[#E7EAEA] transition-colors hover:border-[#3FC7B0] hover:text-[#3FC7B0]"
            title="Open in New Tab"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            <span className="hidden sm:inline">Open</span>
          </a>

          <button
            type="button"
            onClick={toggleFullscreen}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#22282B] bg-[#0E1113] text-[#8A9295] transition-colors hover:border-[#3FC7B0] hover:text-[#3FC7B0]"
            title={isFullscreen ? "Exit Fullscreen (Esc)" : "Fullscreen"}
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? (
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 14 10 14 10 20" />
                <polyline points="20 10 14 10 14 4" />
                <line x1="14" y1="10" x2="21" y2="3" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            ) : (
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative flex-1 overflow-auto bg-[#0A0D0E] p-3 xs:p-4 sm:p-6 flex justify-center items-start min-h-[60vh]"
      >
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-12 text-center my-auto">
            <div className="h-9 w-9 animate-spin rounded-full border-2 border-[#22282B] border-t-[#3FC7B0]" />
            <span className="mt-4 font-mono text-xs text-[#8A9295] tracking-wider">
              Rendering PDF pages...
            </span>
          </div>
        ) : hasError ? (
          <div className="flex flex-col items-center justify-center p-8 text-center max-w-md my-auto">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#3FC7B0]/30 bg-[#3FC7B0]/10 text-[#3FC7B0] mb-4">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <h3 className="font-mono text-sm font-semibold text-white">Document Ready</h3>
            <p className="mt-1 font-mono text-xs text-[#8A9295]">
              Preview unavailable in canvas mode. You can open or download the file directly.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
              <a
                href={url}
                download
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#3FC7B0]/50 bg-[#3FC7B0]/10 px-4 py-2 font-mono text-xs font-semibold text-[#3FC7B0] transition-colors hover:bg-[#3FC7B0] hover:text-[#0E1113]"
              >
                <span>Download PDF</span>
              </a>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#22282B] bg-[#171B1D] px-4 py-2 font-mono text-xs font-semibold text-white transition-colors hover:border-[#3FC7B0] hover:text-[#3FC7B0]"
              >
                <span>Open in Tab</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center my-auto transition-all duration-200">
            <canvas
              ref={canvasRef}
              className="rounded-sm border border-[#22282B] bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export function PdfViewerModal({ url, title = "Document Viewer", isOpen, onClose }: PdfModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 xs:p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative flex flex-col w-full max-w-5xl h-[88vh] sm:h-[92vh] overflow-hidden rounded-tl-[20px] sm:rounded-tl-[32px] rounded-br-[20px] sm:rounded-br-[32px] rounded-tr-none rounded-bl-none border-2 border-[#22282B] bg-[#171B1D] shadow-2xl z-10">
        <div className="absolute top-2.5 right-2.5 z-20">
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#22282B] bg-[#0E1113]/90 text-[#8A9295] backdrop-blur-sm transition-all hover:border-[#3FC7B0] hover:text-[#3FC7B0]"
            title="Close (Esc)"
            aria-label="Close"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <PdfViewer url={url} title={title} className="h-full border-0 rounded-none" />
      </div>
    </div>
  );
}

export function PdfThumbnail({
  url,
  title,
  className = "",
}: {
  url: string;
  title?: string;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    let renderTask: PdfRenderTask | null = null;
    setIsLoaded(false);
    setHasError(false);

    getPdfJs()
      .then((pdfjs) => {
        return pdfjs.getDocument({
          url,
          cMapUrl: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/",
          cMapPacked: true,
        }).promise;
      })
      .then(async (doc) => {
        if (isCancelled) return;
        const page = await doc.getPage(1);
        if (isCancelled || !canvasRef.current) return;

        const viewport = page.getViewport({ scale: 1.0, rotation: 0 });
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (!context) return;

        const targetWidth = 600;
        const scale = targetWidth / viewport.width;
        const scaledViewport = page.getViewport({ scale, rotation: 0 });

        const pixelRatio = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
        canvas.width = Math.floor(scaledViewport.width * pixelRatio);
        canvas.height = Math.floor(scaledViewport.height * pixelRatio);
        canvas.style.width = "100%";
        canvas.style.height = "100%";

        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

        renderTask = page.render({
          canvasContext: context,
          viewport: scaledViewport,
        });

        await renderTask.promise;
        if (!isCancelled) {
          setIsLoaded(true);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setHasError(true);
        }
      });

    return () => {
      isCancelled = true;
      if (renderTask) {
        try {
          renderTask.cancel();
        } catch {
        }
      }
    };
  }, [url]);

  return (
    <div className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-[#0A0D0E] ${className}`}>
      <canvas
        ref={canvasRef}
        className={`w-full h-full object-contain transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0E1113] p-4 text-center">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#22282B] border-t-[#3FC7B0]" />
          <span className="mt-2 font-mono text-[10px] text-[#8A9295] tracking-wider">
            Loading document...
          </span>
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0E1113] p-4 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#3FC7B0]/30 bg-[#3FC7B0]/10 text-[#3FC7B0] mb-2">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <span className="font-mono text-xs font-semibold text-white truncate max-w-full">
            {title || "PDF Certificate"}
          </span>
          <span className="mt-1 font-mono text-[10px] text-[#3FC7B0]">
            Verified Document
          </span>
        </div>
      )}
    </div>
  );
}

