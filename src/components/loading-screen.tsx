import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis } from "@/lib/scroll";

const ReadyContext = createContext(false);
export const usePageReady = () => useContext(ReadyContext);

export function LoadingScreen({ children }: { children: React.ReactNode }) {
  const path = useRouterState({ select: (state) => state.location.pathname });
  return <PageGate key={path}>{children}</PageGate>;
}

function PageGate({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const cleanup: (() => void)[] = [];
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    getLenis()?.stop();
    window.scrollTo(0, 0);
    const waitFor = (el: HTMLImageElement | HTMLVideoElement) => new Promise<void>((resolve) => {
      const done = () => { resolve(); };
      const events = el instanceof HTMLVideoElement ? ["canplay", "error"] : ["load", "error"];
      events.forEach(event => el.addEventListener(event, done, { once: true }));
      cleanup.push(() => events.forEach(event => el.removeEventListener(event, done)));
      if (el instanceof HTMLVideoElement) {
        el.preload = "auto";
        if (el.readyState >= 3 || el.error) done();
        else el.load();
      } else if (el.complete) done();
    });
    // Let the film components replace their SSR posters with video elements first.
    const frame = requestAnimationFrame(() => {
      const media = [...(root.current?.querySelectorAll<HTMLImageElement | HTMLVideoElement>("img, video") ?? [])];
      const assets = media.map(el => waitFor(el).then(async () => {
        if (el instanceof HTMLImageElement) await el.decode().catch(() => {});
      }));
      let timeout: ReturnType<typeof setTimeout>;
      let minimum: ReturnType<typeof setTimeout>;
      const deadline = new Promise<void>(resolve => { timeout = setTimeout(resolve, 8000); });
      const intro = new Promise<void>(resolve => { minimum = setTimeout(resolve, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 2600); });
      cleanup.push(() => { clearTimeout(timeout); clearTimeout(minimum); });
      void Promise.all([intro, Promise.race([Promise.allSettled([document.fonts.ready, ...assets]), deadline])]).then(() => {
        if (!cancelled) setReady(true);
      });
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      cleanup.forEach(fn => fn());
      document.body.style.overflow = previous;
      getLenis()?.start();
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        setRevealed(true);
        document.body.style.overflow = "";
        getLenis()?.start();
      });
    });
    const exit = setTimeout(() => setRemoved(true), 750);
    return () => { cancelAnimationFrame(first); cancelAnimationFrame(second); clearTimeout(exit); };
  }, [ready]);

  return <ReadyContext.Provider value={ready}>
    <div ref={root} inert={!revealed} aria-hidden={!revealed} style={{ visibility: revealed ? "visible" : "hidden" }}>{children}</div>
    {!removed && <div className={`vyro-loader${revealed ? " is-ready" : ""}`} role="status" aria-label="Loading VYRO">
      <div className="vyro-ident" aria-hidden="true"><div className="vyro-aperture"><div className="vyro-chrome"><img className="vyro-chrome-motion" src="/brand/loading-chrome.svg" alt="" /><img className="vyro-chrome-still" src="/brand/wordmark.svg" alt="" /></div></div><p className="vyro-ident-caption">Make the product felt.</p></div>
    </div>}
  </ReadyContext.Provider>;
}


