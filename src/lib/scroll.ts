import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

let registered = false;
let lenis: Lenis | null = null;

export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export function getLenis() {
  return lenis;
}

export function formatReel(progress: number) {
  const safe = Number.isFinite(progress) ? Math.min(1, Math.max(0, progress)) : 0;
  const frames = Math.round(safe * 24 * 48);
  const f = frames % 24;
  const total = Math.floor(frames / 24);
  const s = total % 60;
  const m = Math.floor(total / 60);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(m)}:${pad(s)}:${pad(f)}`;
}

export function scrollProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (max <= 0) return 0;
  return window.scrollY / max;
}

export function mountLenis() {
  registerGsap();
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return () => {};

  const instance = new Lenis({
    lerp: 0.085,
    smoothWheel: true,
    syncTouch: false,
    autoRaf: false,
  });
  lenis = instance;
  instance.on("scroll", ScrollTrigger.update);

  const onTick = (time: number) => {
    instance.raf(time * 1000);
  };
  gsap.ticker.add(onTick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(onTick);
    instance.destroy();
    if (lenis === instance) lenis = null;
  };
}
