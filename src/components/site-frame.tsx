import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Wordmark } from "@/components/marks";
import { formatReel, getLenis, mountLenis, registerGsap, scrollProgress } from "@/lib/scroll";
import { useIsomorphicLayoutEffect } from "@/lib/use-isomorphic-layout-effect";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/studio", label: "Studio" },
  { to: "/enquire", label: "Enquire" },
] as const;

function isCurrent(path: string, to: string) {
  if (to === "/work") return path.startsWith("/work");
  return path === to;
}

export function SiteFrame({ children }: { children: React.ReactNode }) {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const [open, setOpen] = useState(false);
  const [chapter, setChapter] = useState("Opening");
  const clockRef = useRef<HTMLSpanElement>(null);
  const isHome = path === "/";

  useEffect(() => {
    setOpen(false);
    if (path === "/") setChapter("Opening");
    else if (/^\/work\/.+/.test(path)) setChapter("Study");
    else if (path.startsWith("/work")) setChapter("Work");
    else if (path.startsWith("/studio")) setChapter("Studio");
    else if (path.startsWith("/enquire")) setChapter("Enquire");
  }, [path]);

  useIsomorphicLayoutEffect(() => {
    if (clockRef.current) clockRef.current.textContent = formatReel(scrollProgress());
  }, [chapter]);

  useEffect(() => {
    const onChapter = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (typeof detail === "string" && detail) setChapter(detail);
    };
    window.addEventListener("vyro-chapter", onChapter);
    return () => window.removeEventListener("vyro-chapter", onChapter);
  }, []);

  useEffect(() => {
    registerGsap();
    const detach = mountLenis();
    const paint = () => {
      const progress = scrollProgress();
      document.documentElement.style.setProperty("--scroll", progress.toFixed(4));
      if (clockRef.current) clockRef.current.textContent = formatReel(progress);
    };
    paint();
    window.addEventListener("scroll", paint, { passive: true });
    return () => {
      window.removeEventListener("scroll", paint);
      detach();
    };
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
    const id = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [path]);

  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    document.documentElement.classList.toggle("has-cursor", !open);
  }, [open]);

  return (
    <div className={isHome ? "min-h-screen bg-carbon text-chalk" : "min-h-screen bg-chalk text-carbon"}>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-5 focus:z-50 focus:bg-chalk focus:px-3 focus:py-2 focus:text-carbon"
      >
        Skip to content
      </a>
      <div className="scroll-progress pointer-events-none fixed top-0 right-0 left-0 z-40 h-px bg-chalk mix-blend-difference" />
      <header className="fixed top-0 right-0 left-0 z-40 text-chalk mix-blend-difference">
        <div className="flex h-20 items-center justify-between px-5 md:px-16">
          <Link to="/" aria-label="VYRO, home" className="text-chalk">
            <Wordmark className="h-7 w-auto" />
          </Link>
          <p className="label pointer-events-none hidden items-center gap-4 md:flex" aria-hidden>
            <span>{chapter}</span>
            <span ref={clockRef} className="tabular-nums">
              00:00:00
            </span>
          </p>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {NAV.map((item) => {
              const current = isCurrent(path, item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={current ? "page" : undefined}
                  className={`text-base underline-offset-4 hover:underline ${current ? "underline" : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <button
            type="button"
            className="min-h-11 min-w-11 px-1 text-base md:hidden"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen(true)}
          >
            Menu
          </button>
        </div>
      </header>

      {open ? (
        <div
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex flex-col bg-carbon px-5 pt-5 text-chalk"
        >
          <div className="flex h-16 items-center justify-between">
            <Link to="/" aria-label="VYRO, home" className="text-chalk">
              <Wordmark className="h-7 w-auto" />
            </Link>
            <button type="button" className="min-h-11 min-w-11 px-1" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
          <nav className="mt-12 flex flex-col" aria-label="Primary">
            {NAV.map((item) => (
              <Link key={item.to} to={item.to} className="display border-t border-silver/40 py-5 text-6xl">
                {item.label}
              </Link>
            ))}
          </nav>
          <p className="mt-auto mb-10 label text-silver">Direction / CGI / Film / Design</p>
        </div>
      ) : null}

      <Cursor />

      <main id="content">{children}</main>

      {isHome ? null : (
        <footer className="relative z-10 bg-carbon text-chalk">
          <div className="grid gap-10 px-5 py-14 md:grid-cols-12 md:px-16 md:py-16">
            <div className="md:col-span-6">
              <p className="heading text-2xl">VYRO Creative Studio</p>
              <p className="mt-3 max-w-prose text-base text-chalk">
                Cinematic campaigns for technology and design-led brands. Direction, CGI, film and design.
              </p>
            </div>
            <nav className="flex flex-col gap-3 md:col-span-3" aria-label="Footer">
              {NAV.map((item) => (
                <Link key={item.to} to={item.to} className="w-fit underline-offset-4 hover:underline">
                  {item.label}
                </Link>
              ))}
            </nav>
            <p className="display text-3xl md:col-span-3 md:text-right">Make the product felt.</p>
          </div>
        </footer>
      )}
    </div>
  );
}

function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const el = ref.current;
    if (!fine || !el) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;
    let raf = 0;

    let moved = false;
    el.style.opacity = "0";

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!moved) {
        moved = true;
        el.style.opacity = "1";
      }
      const node = event.target instanceof Element ? event.target.closest("[data-cursor]") : null;
      const label = node?.getAttribute("data-cursor") ?? "";
      el.classList.toggle("is-hot", Boolean(label));
      if (labelRef.current) labelRef.current.textContent = label;
    };

    const loop = () => {
      cx += (x - cx) * 0.22;
      cy += (y - cy) * 0.22;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = window.requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove);
    raf = window.requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="studio-cursor" aria-hidden>
      <span ref={labelRef} />
    </div>
  );
}

