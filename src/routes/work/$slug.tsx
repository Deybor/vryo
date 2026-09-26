import { usePageReady } from "@/components/loading-screen";
import { createFileRoute, Link } from "@tanstack/react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import { CampaignFilm } from "@/components/campaign-film";
import { getStudy, studies, territoryLabel } from "@/data/studies";
import { registerGsap } from "@/lib/scroll";
import { useIsomorphicLayoutEffect } from "@/lib/use-isomorphic-layout-effect";

export const Route = createFileRoute("/work/$slug")({
  head: ({ params }) => {
    const study = getStudy(params.slug);
    const title = study ? `${study.title} — VYRO` : "Work — VYRO";
    return {
      meta: [
        { title },
        {
          name: "description",
          content: study
            ? `${study.decision} A VYRO studio study, not a client project.`
            : "Selected work from VYRO Creative Studio.",
        },
      ],
    };
  },
  component: StudyPage,
});

const questions = [
  { n: "01", title: "What needed to change?", key: "change" },
  { n: "02", title: "What was the idea?", key: "idea" },
  { n: "03", title: "What did VYRO make?", key: "made" },
  { n: "04", title: "What did it achieve?", key: "achieved" },
] as const;

function StudyPage() {
  const ready = usePageReady();
  const { slug } = Route.useParams();
  const study = getStudy(slug);
  const heroRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);

  useIsomorphicLayoutEffect(() => {
    if (!ready) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hero = heroRef.current;
    const media = mediaRef.current;
    if (reduce || !hero || !media) return;
    registerGsap();
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        media,
        { scale: 1.08 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        },
      );
      ScrollTrigger.create({
        trigger: hero,
        start: "bottom 35%",
        onLeave: () => {
          const video = hero.querySelector("video");
          if (video instanceof HTMLVideoElement) video.pause();
        },
        onEnterBack: () => {
          const video = hero.querySelector("video");
          if (video instanceof HTMLVideoElement) void video.play().catch(() => {});
        },
      });
    });
    return () => ctx.revert();
  }, [slug, ready]);

  if (!study) {
    return (
      <section className="bg-chalk px-5 py-32 text-carbon md:px-16">
        <h1 className="display-xl">This study is not on the site.</h1>
        <Link to="/work" className="mt-6 inline-block underline underline-offset-4">
          Back to selected work
        </Link>
      </section>
    );
  }

  const index = studies.findIndex((item) => item.slug === study.slug);
  const next = studies[(index + 1) % studies.length];

  return (
    <article>
      <div className="relative">
        <header ref={heroRef} className="sticky top-0 z-0 h-dvh overflow-hidden bg-carbon text-chalk">
          <div ref={mediaRef} className="absolute inset-0">
            <CampaignFilm
              src={study.film}
              poster={study.image}
              alt={study.alt}
              width={study.width}
              height={study.height}
              priority
              play="visible"
              muted={muted}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="scrim pointer-events-none absolute inset-0" />
          <button
            type="button"
            className="label absolute top-24 right-5 z-20 min-h-11 text-chalk md:right-16"
            onClick={() => setMuted((value) => !value)}
          >
            {muted ? "Sound" : "Mute"}
          </button>
          <div className="relative z-10 flex h-full flex-col justify-end px-5 pb-12 md:px-16 md:pb-16">
            <Link to="/work" className="label w-fit text-chalk underline-offset-4 hover:underline">
              Selected work
            </Link>
            <p className="label mt-6 text-chalk">
              {String(index + 1).padStart(2, "0")} / {String(studies.length).padStart(2, "0")} —{" "}
              {territoryLabel(study.territory)} · Studio study · {study.duration}
            </p>
            <h1 className="hero-title mt-3 max-w-[12ch]">{study.title}</h1>
          </div>
        </header>

        <div className="relative z-10 bg-chalk text-carbon">
          <div className="px-5 pt-16 md:px-16 md:pt-24">
            <p className="label text-oxblood">The campaign</p>
            <h2 className="display-xl mt-4 max-w-[16ch]">One treatment, carried through every piece.</h2>
            <p className="mt-6 max-w-prose text-lg">
              A commissioned campaign is cut the same way: a hero film, the frame held from it, and the
              adaptations taken from that master. This page is a studio study of that standard, not a client
              credit.
            </p>
            <ol className="mt-12">
              {study.pieces.map((piece) => (
                <li key={piece.n} className="grid gap-3 border-t border-silver/80 py-7 md:grid-cols-12 md:items-baseline">
                  <p className="label text-oxblood md:col-span-2">{piece.n}</p>
                  <h3 className="heading text-2xl md:col-span-4">{piece.name}</h3>
                  <p className="max-w-prose text-lg md:col-span-6">{piece.detail}</p>
                </li>
              ))}
            </ol>
          </div>
          <figure className="mt-6 px-5 md:px-16">
            <img src={study.image} alt={study.alt} width={study.width} height={study.height} className="h-auto w-full" />
            <figcaption className="label mt-4 text-oxblood">Held frame · same light as the film</figcaption>
          </figure>
          <div className="grid gap-12 px-5 py-16 md:grid-cols-12 md:px-16 md:py-24">
            <div className="md:col-span-5">
              <p className="display-xl">{study.decision}</p>
              <p className="mt-8 max-w-prose text-lg">{study.role}</p>
            </div>
            <ol className="md:col-span-6 md:col-start-7">
              {questions.map((question) => (
                <li key={question.n} className="border-t border-silver/80 py-7">
                  <p className="label text-oxblood">{question.n}</p>
                  <h2 className="heading mt-2 text-2xl">{question.title}</h2>
                  <p className="mt-3 max-w-prose text-lg">{study[question.key]}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <Link
        to="/work/$slug"
        params={{ slug: next.slug }}
        data-cursor="Next"
        className="relative z-10 block h-[80dvh] overflow-hidden bg-carbon text-chalk"
      >
        <div className="absolute inset-0">
          <CampaignFilm
            src={next.film}
            poster={next.image}
            alt=""
            play="visible"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="scrim pointer-events-none absolute inset-0" />
        <div className="relative flex h-full flex-col justify-end px-5 pb-12 md:px-16 md:pb-16">
          <p className="label">Next campaign</p>
          <p className="display-xl mt-3">{next.title}</p>
        </div>
      </Link>
    </article>
  );
}

