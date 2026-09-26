import { usePageReady } from "@/components/loading-screen";
import { useEffect, useRef, useState } from "react";
import { useIsomorphicLayoutEffect } from "@/lib/use-isomorphic-layout-effect";

export function CampaignFilm({
  src,
  poster,
  alt,
  width,
  height,
  priority = false,
  play = "visible",
  start = false,
  muted = true,
  className = "",
}: {
  src?: string;
  poster: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  play?: "visible" | "manual";
  start?: boolean;
  muted?: boolean;
  className?: string;
}) {
  const ready = usePageReady();
  const ref = useRef<HTMLVideoElement>(null);
  const [motion, setMotion] = useState(false);

  useIsomorphicLayoutEffect(() => {
    setMotion(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = muted;
  }, [muted, motion]);

  useEffect(() => {
    const video = ref.current;
    if (!video || !motion || !ready || !start) return;
    void video.play().catch(() => {});
  }, [motion, ready, start, src]);

  useEffect(() => {
    const video = ref.current;
    if (!video || !motion || !ready || play !== "visible") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: [0, 0.45, 0.8] },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [motion, ready, play, src]);

  if (!src || !motion) {
    return (
      <img
        src={poster}
        alt={alt}
        width={width}
        height={height}
        className={className}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
    );
  }

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      muted={muted}
      loop
      playsInline
      preload={priority ? "auto" : "none"}
      aria-label={alt}
    />
  );
}

