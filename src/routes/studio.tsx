import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "Studio — VYRO" },
      {
        name: "description",
        content:
          "VYRO is a creative studio directing cinematic campaigns for technology and design-led brands. Vision, yield, refine, own.",
      },
    ],
  }),
  component: Studio,
});

const letters = [
  {
    mark: "V",
    name: "Vision",
    line: "Find the product truth.",
    body: "Name the audience, the useful difference and the feeling the campaign should leave.",
    image: "/work/fold.jpg",
    ground: "bg-carbon text-chalk",
  },
  {
    mark: "Y",
    name: "Yield",
    line: "Make the idea produce.",
    body: "Turn the direction into useful, purposeful work. Yield means tangible output. It is not a sales guarantee.",
    image: "/work/vessel.jpg",
    ground: "bg-oxblood text-chalk",
  },
  {
    mark: "R",
    name: "Refine",
    line: "Make each choice earn its place.",
    body: "Test the light, timing, type and composition. Remove anything that weakens the idea.",
    image: "/work/joint.jpg",
    ground: "bg-chalk text-carbon",
  },
  {
    mark: "O",
    name: "Own",
    line: "Take responsibility for the finish.",
    body: "Carry the agreed direction through delivery. Own means accountability for quality, not a claim over client rights.",
    image: "/work/drape.jpg",
    ground: "bg-carbon text-chalk",
  },
];

const steps = [
  {
    name: "Vision",
    body: "An agreed brief, audience, product truth and visual treatment.",
    who: "Creative Director / Editor",
  },
  {
    name: "Yield",
    body: "Styleframes, assets and motion tests that prove the treatment.",
    who: "CGI Lead + Design Lead",
  },
  {
    name: "Refine",
    body: "A coherent light, material, typography, sound and edit system.",
    who: "Discipline leads / Creative Director review",
  },
  {
    name: "Own",
    body: "Approved masters, checked adaptations and a usable handoff.",
    who: "Creative Director / Editor",
  },
];

const beats = [
  { name: "Reveal", time: "0.00–0.50 s", body: "A controlled reveal establishes the subject." },
  { name: "Hold", time: "0.50–1.30 s", body: "A hold lets the viewer read." },
  { name: "Resolve", time: "1.30–2.00 s", body: "A clean resolution signs the work." },
];

function Studio() {
  return (
    <>
      <section className="bg-chalk px-5 pt-28 pb-16 text-carbon md:px-16 md:pt-36 md:pb-24">
        <p className="label text-oxblood">Studio</p>
        <h1 className="hero-title mt-4 max-w-[12ch]">Specific words. Visible proof.</h1>
        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <p className="max-w-prose text-xl md:col-span-7 md:text-2xl">
            VYRO is a creative studio directing cinematic campaigns for technology and design-led brands. We
            shape the idea, build the imagery and carry the direction through the final edit.
          </p>
          <div className="md:col-span-4 md:col-start-9">
            <p className="label text-oxblood">Short bio</p>
            <p className="mt-4 text-lg">
              Cinematic campaigns for technology and design-led brands. Direction, CGI, film and design.
            </p>
            <p className="label mt-8 text-oxblood">Primary line</p>
            <p className="display mt-3 text-4xl">Make the product felt.</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="name">
        <h2 id="name" className="sr-only">
          Vision. Yield. Refine. Own.
        </h2>
        {letters.map((letter, index) => (
          <div key={letter.mark} className="letter-stage" style={{ zIndex: index + 1 }}><article className={`letter-card ${letter.ground}`}>
            <p
              className="letter-fill"
              style={{ backgroundImage: `url(${letter.image})` }}
              aria-hidden
            >
              {letter.mark}
            </p>
            <div className="letter-copy relative z-10 max-w-md md:ml-auto">
              <p className="label">{letter.mark}</p>
              <h3 className="display-xl mt-3">{letter.name}</h3>
              <p className="mt-4 text-xl">{letter.line}</p>
              <p className="mt-3 max-w-prose">{letter.body}</p>
            </div>
          </article></div>
        ))}
      </section>

      <section
        className="relative z-10 bg-chalk text-carbon"
        aria-labelledby="responsibilities"
      >
        <div className="px-5 py-16 md:px-16 md:py-24">
          <h2 id="responsibilities" className="display-xl max-w-[14ch]">
            One direction. Clear responsibilities.
          </h2>
          <div className="mt-12">
            {steps.map((step) => (
              <div
                key={step.name}
                className="grid gap-3 border-t border-silver/80 py-7 md:grid-cols-12 md:items-baseline md:gap-6"
              >
                <p className="label text-oxblood md:col-span-2">{step.name}</p>
                <p className="text-lg md:col-span-6">{step.body}</p>
                <p className="md:col-span-4 md:text-right">{step.who}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-prose text-base">
            The creative lead holds the brief, the client relationship, the direction and the final edit. The
            CGI lead owns cinematic look and lighting. The design lead owns assets and graphic integration.
            Direction stays outside routine 3D production.
          </p>
        </div>
      </section>

      <section className="relative z-10 bg-carbon text-chalk" aria-labelledby="image-direction">
        <div className="px-5 py-16 md:px-16 md:py-24">
          <h2 id="image-direction" className="display-xl max-w-[16ch]">
            Make the difference visible.
          </h2>
          <div className="mt-14 grid gap-12 md:grid-cols-2">
            <div>
              <p className="label text-silver">Structure / technology</p>
              <p className="mt-4 text-lg">
                Start from what the product does. Use a controlled camera path, precise edges and one clear
                interaction. If an interface is in frame, it has to stay readable — a real sequence, not a
                field of floating screens.
              </p>
            </div>
            <div>
              <p className="label text-silver">Sensation / material</p>
              <p className="mt-4 text-lg">
                Start from what the product feels like. Grazing light, tactile surfaces, believable scale and
                patient close-ups. A material detail can carry the story before the full product is revealed.
              </p>
            </div>
          </div>
          <div className="mt-12 grid gap-12 border-t border-silver/40 pt-10 md:grid-cols-2">
            <div>
              <p className="label text-silver">Shared standard</p>
              <p className="mt-4 text-lg">
                One focal subject. A clear light source. Deliberate negative space. Materials that behave
                consistently. Client colours stay inside the work. VYRO’s palette frames the presentation.
              </p>
            </div>
            <div>
              <p className="label text-silver">Edit out</p>
              <p className="mt-4 text-lg">
                Unrelated chrome objects, empty particle effects, arbitrary gradients and borrowed luxury
                props. A technique earns its place when it reveals a product truth.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-chalk text-carbon" aria-labelledby="motion">
        <div className="px-5 py-16 md:px-16 md:py-24">
          <p className="label text-oxblood">Motion</p>
          <h2 id="motion" className="hero-title mt-4 max-w-[12ch]">
            Reveal. Hold. Resolve.
          </h2>
          <p className="mt-8 max-w-prose text-lg">
            Ideas into movement — kept for reels and process, not stacked on the studio line. The same pacing
            applies to type, image and transitions. Interface motion stays between 180 and 240 milliseconds,
            with no bounce, and a static version when reduced motion is requested.
          </p>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {beats.map((beat) => (
              <article key={beat.name}>
                <div className="border-t-2 border-carbon pt-5">
                  <h3 className="display text-4xl">{beat.name}</h3>
                  <p className="label mt-3 text-oxblood">{beat.time}</p>
                  <p className="mt-3 text-lg">{beat.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 border-t border-silver/80 bg-chalk text-carbon">
        <div className="grid gap-10 px-5 py-16 md:grid-cols-2 md:px-16 md:py-20">
          <div>
            <p className="label text-oxblood">Replace</p>
            <p className="mt-4 text-lg">We create breathtaking visuals that elevate ambitious brands.</p>
          </div>
          <div>
            <p className="label text-oxblood">With</p>
            <p className="mt-4 text-lg">
              We directed the campaign around the product’s brushed-metal finish and folding mechanism.
            </p>
          </div>
          <p className="max-w-prose md:col-span-2">
            Show the decision behind the image. Use measured results only when the client can verify them.
          </p>
          <Link to="/enquire" data-cursor="Begin" className="arrow-link display w-fit text-4xl md:col-span-2">
            Start a brief <span className="arrow-shift">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}


