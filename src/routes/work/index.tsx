import { usePageReady } from "@/components/loading-screen";
import { createFileRoute, Link } from "@tanstack/react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState } from "react";
import { CampaignFilm } from "@/components/campaign-film";
import { studies, territoryLabel } from "@/data/studies";
import { registerGsap } from "@/lib/scroll";
import { useIsomorphicLayoutEffect } from "@/lib/use-isomorphic-layout-effect";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Selected work — VYRO" },
      {
        name: "description",
        content:
          "Studio studies from VYRO. Technology and design-led product campaigns, labelled clearly until client work is ready.",
      },
    ],
  }),
  component: WorkIndex,
});

const filters = [
  { id: "all", label: "All" },
  { id: "technology", label: "Technology" },
  { id: "material", label: "Design-led" },
] as const;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function WorkIndex() {
  const ready = usePageReady();
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const visible = studies.filter((study) => filter === "all" || study.territory === filter);

  useIsomorphicLayoutEffect(() => {
    if (!ready) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    registerGsap();
    gsap.registerPlugin(ScrollTrigger);
    const cards = gsap.utils.toArray<HTMLElement>(".stack-card");
    const sync = () => {
      let active = cards[0];
      cards.forEach((card) => {
        if (card.getBoundingClientRect().top < window.innerHeight * 0.4) active = card;
      });
      cards.forEach((card) => {
        const video = card.querySelector("video");
        if (!(video instanceof HTMLVideoElement)) return;
        if (card === active) {
          if (video.paused) void video.play().catch(() => {});
        } else if (!video.paused) {
          video.pause();
        }
      });
    };
    sync();
    const later = window.setTimeout(sync, 600);
    window.addEventListener("scroll", sync, { passive: true });
    const ctx = gsap.context(() => {
      cards.forEach((card, index) => {
        const next = cards[index + 1];
        const media = card.querySelector(".stack-media");
        if (!next || !media) return;
        gsap.to(media, {
          scale: 0.92,
          opacity: 0.45,
          ease: "none",
          scrollTrigger: {
            trigger: next,
            start: "top bottom",
            end: "top 15%",
            scrub: true,
          },
        });
      });
    });
    return () => {
      window.clearTimeout(later);
      window.removeEventListener("scroll", sync);
      ctx.revert();
    };
  }, [filter, ready]);

  return (
    <>
      <section className="bg-chalk px-5 pt-28 pb-12 text-carbon md:px-16 md:pt-36 md:pb-16">
        <p className="label text-oxblood">Work</p>
        <h1 className="hero-title mt-3 max-w-[8ch]">Selected work</h1>
        <p className="mt-8 max-w-prose text-lg">
          Each study is a campaign, not a single frame: a hero film, the still held from it, and the pieces
          cut from that treatment. Self-initiated work is labelled. A client campaign uses the same four
          questions.
        </p>
        <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter studies">
          {filters.map((item) => {
            const pressed = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={pressed}
                onClick={() => setFilter(item.id)}
                className={`min-h-11 px-4 underline-offset-4 ${
                  pressed ? "bg-carbon text-chalk" : "text-carbon underline hover:no-underline"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </section>

      {visible.length === 0 ? (
        <p className="bg-chalk px-5 pb-24 text-carbon md:px-16">Nothing in this set.</p>
      ) : (
        <div>
          {visible.map((study, index) => (
            <article key={study.slug} className="stack-card" style={{ zIndex: index + 1 }}>
              <div className="stack-media">
                <CampaignFilm
                  src={study.film}
                  poster={study.image}
                  alt={study.alt}
                  width={study.width}
                  height={study.height}
                  play="manual"
                  className="h-full w-full object-cover"
                />
                <div className="scrim absolute inset-0" />
              </div>
              <Link
                to="/work/$slug"
                params={{ slug: study.slug }}
                data-cursor="View"
                className="relative z-10 flex h-full flex-col justify-end px-5 pb-12 text-chalk md:px-16 md:pb-16"
              >
                <p className="label text-chalk">
                  {pad(index + 1)} — {territoryLabel(study.territory)} · Film {study.duration}
                </p>
                <h2 className="display-xl mt-3 max-w-[12ch]">{study.title}</h2>
                <p className="mt-4 max-w-md text-lg">{study.decision}</p>
              </Link>
            </article>
          ))}
        </div>
      )}
    </>
  );
}

