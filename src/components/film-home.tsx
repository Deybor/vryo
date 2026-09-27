import { asset } from "@/lib/asset";
import { usePageReady } from "@/components/loading-screen";
import { Link } from "@tanstack/react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { CampaignFilm } from "@/components/campaign-film";
import { studies, territoryCopy, territoryLabel } from "@/data/studies";
import { registerGsap } from "@/lib/scroll";
import { useIsomorphicLayoutEffect } from "@/lib/use-isomorphic-layout-effect";

const beats = [
  {
    kicker: "Direction",
    line: "Direct the picture before you make it.",
    image: asset("/work/fold.jpg"),
    film: asset("/work/fold.mp4"),
    alt: "A brushed aluminium object, half open, with the hinge catching a single light against a dark ground.",
  },
  {
    kicker: "Material",
    line: "Let the material introduce itself.",
    image: asset("/work/vessel.jpg"),
    film: asset("/work/vessel.mp4"),
    alt: "An unlabelled clear glass vessel holding a deep red liquid, lit from the side on a warm paper ground.",
  },
  {
    kicker: "Mechanism",
    line: "The fit has to read before the whole product.",
    image: asset("/work/tolerance.jpg"),
    film: asset("/work/tolerance.mp4"),
    alt: "Extreme close-up of a brushed steel hinge, with light raking across the metal grain.",
  },
  {
    kicker: "Hold",
    line: "Hold until the weight is felt.",
    image: asset("/work/drape.jpg"),
    film: asset("/work/drape.mp4"),
    alt: "Heavy oxblood silk falling in one fold over a matte chalk form.",
  },
];

const offers = [
  {
    n: "01",
    title: "Campaign direction",
    body: "The central idea, visual treatment, shot logic and a shared standard for the whole campaign.",
  },
  {
    n: "02",
    title: "Product imagery and film",
    body: "CGI, photography and motion chosen around the idea: hero images, films and planned cutdowns.",
  },
  {
    n: "03",
    title: "Campaign systems",
    body: "Typography, layouts and delivery rules that keep launch assets consistent across formats.",
  },
];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function FilmHome() {
  const ready = usePageReady();
  const rootRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!ready) return;
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const rules = root.querySelectorAll<HTMLElement>(".rule-draw");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-in");
        });
      },
      { threshold: 0.01 },
    );
    if (!reduce) rules.forEach((rule) => io.observe(rule));

    if (reduce) return () => io.disconnect();

    registerGsap();
    gsap.registerPlugin(ScrollTrigger);
    root.classList.add("film-live");

    const mm = gsap.matchMedia();

    const heroClip = (inset: string) => {
      const hero = root.querySelector<HTMLElement>(".hero");
      const media = root.querySelector<HTMLElement>(".hero-media");
      const lines = root.querySelectorAll<HTMLElement>(".hero-line");
      const foot = root.querySelector<HTMLElement>(".hero-foot");
      const kicker = root.querySelector<HTMLElement>(".hero-kicker");
      const caption = root.querySelector<HTMLElement>(".hero-caption");
      if (!hero || !media) return;
      gsap
        .timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: 0.65,
            anticipatePin: 1,
          },
        })
        .fromTo(
          media,
          { clipPath: inset, scale: 1.12 },
          { clipPath: "inset(0% 0% 0% 0%)", scale: 1, ease: "none", duration: 1 },
          0,
        )
        .to(lines, { yPercent: -18, opacity: 0, stagger: 0.03, ease: "none", duration: 0.55 }, 0.05)
        .to([foot, kicker], { opacity: 0, y: -12, ease: "none", duration: 0.35 }, 0)
        .fromTo(caption, { opacity: 0, y: 28 }, { opacity: 1, y: 0, ease: "none", duration: 0.35 }, 0.62);
    };

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      heroClip("inset(11% 13% 16% 13%)");
    });

    mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
      heroClip("inset(8% 5% 20% 5%)");
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const stage = root.querySelector<HTMLElement>(".manifesto");
      const beatEls = gsap.utils.toArray<HTMLElement>(".beat", root);
      const meter = root.querySelector<HTMLElement>(".manifesto-meter-bar");
      const indexes = gsap.utils.toArray<HTMLElement>(".beat-index", root);
      if (!stage || beatEls.length === 0) return;

      const apply = (progress: number) => {
        const span = beatEls.length - 1;
        const pos = progress * span;
        beatEls.forEach((beat, i) => {
          const dist = Math.abs(pos - i);
          const opacity = dist >= 1 ? 0 : 1 - dist;
          beat.style.opacity = String(opacity);
          const video = beat.querySelector("video");
          if (video instanceof HTMLVideoElement) {
            const rect = beat.getBoundingClientRect();
            const inView = rect.bottom > 80 && rect.top < window.innerHeight - 80;
            if (opacity > 0.4 && inView) {
              if (video.paused) void video.play().catch(() => {});
            } else if (!video.paused) {
              video.pause();
            }
          }
        });
        const active = Math.min(span, Math.round(pos));
        indexes.forEach((el, idx) => el.classList.toggle("is-on", idx === active));
        if (meter) meter.style.transform = `scaleY(${Math.min(1, Math.max(0, progress))})`;
      };

      apply(0);
      ScrollTrigger.create({
        trigger: stage,
        start: "top top",
        end: "+=320%",
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => apply(self.progress),
        onRefresh: (self) => apply(self.progress),
      });
    });

    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      root.classList.add("film-reel");
      const reel = root.querySelector<HTMLElement>(".reel");
      const track = root.querySelector<HTMLElement>(".reel-track");
      if (!reel || !track) return;

      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: reel,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      const stills = gsap.utils.toArray<HTMLElement>(".reel-still", reel);
      const skew = gsap.quickTo(stills, "skewX", { duration: 0.45, ease: "power3.out" });
      ScrollTrigger.create({
        trigger: reel,
        start: "top top",
        end: () => `+=${distance()}`,
        onUpdate: (self) => {
          skew(gsap.utils.clamp(-3.5, 3.5, self.getVelocity() / -900));
        },
        onLeave: () => skew(0),
        onLeaveBack: () => skew(0),
      });

      return () => {
        root.classList.remove("film-reel");
      };
    });

    const images = root.querySelectorAll("img");
    const refresh = () => ScrollTrigger.refresh();
    images.forEach((img) => {
      if (!img.complete) img.addEventListener("load", refresh, { once: true });
    });
    refresh();
    const later = window.setTimeout(refresh, 700);

    return () => {
      window.clearTimeout(later);
      io.disconnect();
      images.forEach((img) => img.removeEventListener("load", refresh));
      mm.revert();
      root.classList.remove("film-live", "film-reel");
    };
  }, [ready]);  return (
    <div ref={rootRef}>
      <ChapterWatch />

      <section className="hero" data-chapter="Opening">
        <div className="hero-media">
          <CampaignFilm
            src={asset("/work/fold.mp4")}
            poster={asset("/work/fold.jpg")}
            alt="A brushed aluminium object, half open, with the hinge catching a single light against a dark ground."
            width={1792}
            height={1008}
            priority
            play="visible"
            className="h-full w-full object-cover"
          />
          <div className="scrim absolute inset-0" />
        </div>
        <div className="hero-copy">
          <p className="hero-kicker label text-chalk">VYRO Creative Studio</p>
          <h1 className="hero-title">
            <span className="hero-line">Make</span>
            <span className="hero-line">the product</span>
            <span className="hero-line italic">felt.</span>
          </h1>
          <div className="hero-foot flex items-end justify-between gap-6">
            <p className="max-w-xs text-base text-chalk">
              Cinematic campaigns for technology and design-led brands.
            </p>
            <div className="flex items-center gap-3">
              <span className="scroll-line" aria-hidden />
              <span className="label">Scroll</span>
            </div>
          </div>
        </div>
        <div className="hero-caption">
          <p className="label text-chalk">01 — The fold</p>
          <p className="display mt-3 max-w-xl text-3xl text-chalk md:text-5xl">
            Directed around a brushed-metal finish and the folding mechanism.
          </p>
        </div>
      </section>

      <section className="manifesto" data-chapter="Treatment" aria-label="Treatment">
        <div className="manifesto-stage">
          <div className="manifesto-meter" aria-hidden>
            <span className="manifesto-meter-bar" />
          </div>
          <ol className="absolute top-28 right-5 z-10 hidden flex-col gap-3 md:flex md:right-16">
            {beats.map((beat, index) => (
              <li key={beat.kicker} className={`beat-index label text-chalk ${index === 0 ? "is-on" : ""}`}>
                {pad(index + 1)} {beat.kicker}
              </li>
            ))}
          </ol>
          {beats.map((beat, index) => (
            <article className="beat" key={beat.kicker}>
              <CampaignFilm
                src={beat.film}
                poster={beat.image}
                alt={beat.alt}
                play="manual"
                className="beat-img"
              />
              <div className="scrim absolute inset-0" />
              <div className="beat-copy">
                <p className="label text-chalk">
                  {pad(index + 1)} — {beat.kicker}
                </p>
                <h2 className="display-xl mt-4 max-w-[14ch] text-chalk">{beat.line}</h2>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="reel bg-carbon" data-chapter="Studies" aria-labelledby="selected-work">
        <div className="reel-track">
          <div className="reel-card is-title">
            <p className="label text-silver">Selected work</p>
            <h2 id="selected-work" className="hero-title mt-4">
              Studio studies.
            </h2>
            <p className="mt-6 max-w-sm text-lg">
              Not client projects. Each one is a campaign in miniature: a hero film, a held frame, and the
              pieces cut from that treatment.
            </p>
            <Link to="/work" data-cursor="Index" className="arrow-link label mt-8 inline-flex items-center gap-3 text-chalk">
              All studies <span className="arrow-shift">→</span>
            </Link>
          </div>
          {studies.map((study, index) => (
            <Link
              key={study.slug}
              to="/work/$slug"
              params={{ slug: study.slug }}
              data-cursor="View"
              className="reel-card"
            >
              <div className="reel-frame">
                <div className="reel-still">
                  <CampaignFilm
                    src={study.film}
                    poster={study.image}
                    alt={study.alt}
                    width={study.width}
                    height={study.height}
                    play="visible"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div>
                <p className="label text-silver">
                  {pad(index + 1)} — {territoryLabel(study.territory)} · Film {study.duration}
                </p>
                <h3 className="display mt-2 text-4xl md:text-5xl">{study.title}</h3>
              </div>
            </Link>
          ))}
          <div className="reel-end" aria-hidden />
        </div>
      </section>

      <section className="bg-chalk text-carbon" data-chapter="Practice" aria-labelledby="practice">
        <div className="px-5 pt-24 pb-8 md:px-16 md:pt-32">
          <p className="label text-oxblood">Practice</p>
          <h2 id="practice" className="hero-title mt-4 max-w-[8ch]">
            Three moves.
          </h2>
        </div>
        <div className="px-5 pb-8 md:px-16">
          {offers.map((offer) => (
            <article key={offer.n} className="py-8 md:py-12">
              <div className="rule-draw mb-8" />
              <div className="grid items-end gap-4 md:grid-cols-12">
                <p className="display text-3xl text-oxblood md:col-span-2">{offer.n}</p>
                <h3 className="display-xl md:col-span-6">{offer.title}</h3>
                <p className="max-w-prose text-lg md:col-span-4">{offer.body}</p>
              </div>
            </article>
          ))}
          <div className="rule-draw" />
          <p className="max-w-prose py-10 text-lg">
            A defined campaign scope. Price and schedule follow the brief.
          </p>
        </div>
      </section>

      <section data-chapter="Territories" aria-label="Who the work is for">
        <div className="grid md:grid-cols-2">
          <Territory
            image={asset("/work/tolerance.jpg")}
            alt="Extreme close-up of a brushed steel hinge, with light raking across the metal grain."
            label={territoryCopy.technology.label}
            title="Hard to show. Necessary to feel."
            body={territoryCopy.technology.body}
          />
          <Territory
            image={asset("/work/drape.jpg")}
            alt="Heavy oxblood silk falling in one fold over a matte chalk form."
            label={territoryCopy.material.label}
            title="Form, material, and the detail that carries it."
            body={territoryCopy.material.body}
          />
        </div>
      </section>

      <section className="flex min-h-dvh flex-col justify-between bg-oxblood px-5 py-8 text-chalk md:px-16 md:py-12" data-chapter="Enquire">
        <p className="label pt-16">Enquire</p>
        <div>
          <h2 className="hero-title max-w-[10ch]">Start with the product.</h2>
          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-lg">
              Tell us what it does, who it is for, and what the campaign should leave behind. The scope
              follows that, not the other way around.
            </p>
            <Link
              to="/enquire"
              data-cursor="Begin"
              className="arrow-link display inline-flex items-center gap-4 text-5xl md:text-7xl"
            >
              Enquire <span className="arrow-shift">→</span>
            </Link>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-end justify-between gap-6 border-t border-chalk/30 pt-6">
          <nav className="flex gap-6" aria-label="Footer">
            <Link to="/work" className="label">
              Work
            </Link>
            <Link to="/studio" className="label">
              Studio
            </Link>
            <Link to="/enquire" className="label">
              Enquire
            </Link>
          </nav>
          <p className="label text-chalk/80">Direction / CGI / Film / Design</p>
        </div>
      </section>
    </div>
  );
}

function Territory({
  image,
  alt,
  label,
  title,
  body,
}: {
  image: string;
  alt: string;
  label: string;
  title: string;
  body: string;
}) {
  return (
    <article className="relative flex min-h-[88dvh] flex-col justify-end overflow-hidden bg-carbon text-chalk">
      <img src={image} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
      <div className="scrim absolute inset-0" />
      <div className="relative z-10 px-5 py-12 md:px-16 md:py-16">
        <p className="label text-chalk">{label}</p>
        <h2 className="display-xl mt-4 max-w-[14ch]">{title}</h2>
        <p className="mt-5 max-w-prose text-lg">{body}</p>
      </div>
    </article>
  );
}

function ChapterWatch() {
  useIsomorphicLayoutEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-chapter]");
    const mark = (name: string) => {
      window.dispatchEvent(new CustomEvent("vyro-chapter", { detail: name }));
    };
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const name = hit?.target instanceof HTMLElement ? hit.target.dataset.chapter : undefined;
        if (name) mark(name);
      },
      { threshold: [0.25, 0.5], rootMargin: "-30% 0px -35% 0px" },
    );
    nodes.forEach((node) => io.observe(node));
    mark("Opening");
    return () => io.disconnect();
  }, []);

  return null;
}


