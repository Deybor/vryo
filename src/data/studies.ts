import { asset } from "@/lib/asset";
export type Territory = "technology" | "material";

export type CampaignPiece = {
  n: string;
  name: string;
  detail: string;
};

export type Study = {
  slug: string;
  title: string;
  territory: Territory;
  decision: string;
  image: string;
  film: string;
  duration: string;
  width: number;
  height: number;
  alt: string;
  pieces: CampaignPiece[];
  change: string;
  idea: string;
  made: string;
  achieved: string;
  role: string;
};

export const territoryCopy: Record<Territory, { label: string; body: string }> = {
  technology: {
    label: "Technology",
    body: "For teams launching a digital or physical product whose value is hard to show. Reveal the interaction, mechanism or benefit that makes it matter.",
  },
  material: {
    label: "Design-led brands",
    body: "For beauty, fashion and furniture brands whose difference lives in form, material and detail. Make those qualities visible and memorable.",
  },
};

export const studies: Study[] = [
  {
    slug: "the-fold",
    title: "The fold",
    territory: "technology",
    decision: "Directed around a brushed-metal finish and the folding mechanism.",
    image: asset("/work/fold.jpg"),
    film: asset("/work/fold.mp4"),
    duration: "0:06",
    width: 1792,
    height: 1008,
    alt: "A brushed aluminium object, half open, with the hinge catching a single light against a dark ground.",
    pieces: [
      { n: "01", name: "Hero film", detail: "The object opens once. The light stays on the brushed face." },
      { n: "02", name: "Held frame", detail: "The hinge, readable before the move finishes." },
      { n: "03", name: "Cutdowns", detail: "Taken from this master. No second look for the shorter cuts." },
    ],
    change:
      "Shown closed, the object reads as a slab. The useful difference is the fold itself, and the metal that makes that movement feel precise.",
    idea: "One camera path. The object opens once. The light stays on the brushed face, so the mechanism and the material are the same subject.",
    made: "A hero film, a held view of the joint, and cutdowns from the same treatment. Direction and CGI only — no separate look for the shorter pieces.",
    achieved:
      "The fold is readable in a single frame and in the move. This is a studio study, not a client delivery, so there is no verified result beyond the scope of the test.",
    role: "Direction, CGI, film.",
  },
  {
    slug: "the-vessel",
    title: "The vessel",
    territory: "material",
    decision: "Glass thickness and the colour of the liquid carry the frame before the full object is named.",
    image: asset("/work/vessel.jpg"),
    film: asset("/work/vessel.mp4"),
    duration: "0:06",
    width: 1728,
    height: 1152,
    alt: "An unlabelled clear glass vessel holding a deep red liquid, lit from the side on a warm paper ground.",
    pieces: [
      { n: "01", name: "Hero film", detail: "One light crosses the glass. The hold is long enough to read the thickness." },
      { n: "02", name: "Held frame", detail: "The same light, no label, no second object." },
      { n: "03", name: "Closer pass", detail: "The shoulder of the glass, cut from the same treatment." },
    ],
    change:
      "A beauty object was at risk of being styled with borrowed luxury props. The difference lives in the glass and the liquid, not in the setting around them.",
    idea: "Start on the material. One grazing light, no label, no secondary object. Hold long enough for the thickness of the glass to read.",
    made: "A hero film and a closer pass on the shoulder of the glass, built as one treatment for stills and motion.",
    achieved:
      "The colour and the glass do the introduction. Studio study — not a client project, and not a claim about a finished campaign.",
    role: "Direction, film, material study.",
  },
  {
    slug: "the-joint",
    title: "The joint",
    territory: "material",
    decision: "The piece is introduced at the timber joint, then allowed to become a whole object.",
    image: asset("/work/joint.jpg"),
    film: asset("/work/joint.mp4"),
    duration: "0:06",
    width: 1792,
    height: 1008,
    alt: "A close view of an oak mortise-and-tenon joint, with grain visible in soft daylight.",
    pieces: [
      { n: "01", name: "Hero film", detail: "Daylight moves across the grain. The joint is the subject." },
      { n: "02", name: "Held frame", detail: "The cut, before the whole piece is named." },
      { n: "03", name: "Layout", detail: "Notes for how type sits beside the image in a launch layout." },
    ],
    change:
      "Furniture was being photographed as a room. The difference — how the joint is cut, and how the grain meets — was too far from the lens.",
    idea: "Begin at the joint. One window as the light source. Reveal the whole piece only after the construction is clear.",
    made: "A hero film, a detail still from the same light, and notes for how type would sit beside the image in a launch layout.",
    achieved:
      "The construction is the first thing a viewer understands. Studio study, labelled as such. No client metric is attached.",
    role: "Direction, film, layout notes.",
  },
  {
    slug: "the-tolerance",
    title: "The tolerance",
    territory: "technology",
    decision: "Grazing light makes a machined joint readable before the whole product appears.",
    image: asset("/work/tolerance.jpg"),
    film: asset("/work/tolerance.mp4"),
    duration: "0:06",
    width: 1728,
    height: 1152,
    alt: "Extreme close-up of a brushed steel hinge, with light raking across the metal grain.",
    pieces: [
      { n: "01", name: "Hero film", detail: "The light travels the metal. The fit is the opening." },
      { n: "02", name: "Macro frame", detail: "The line where the two leaves meet, held." },
      { n: "03", name: "Opening cut", detail: "The first seconds of the hero film, used as the campaign open." },
    ],
    change:
      "The product’s value is a tight mechanical fit. Wide beauty shots made the parts look smooth and hid the tolerance that actually matters.",
    idea: "Open on the joint. Let the metal grain and the line where the two leaves meet explain the object. The full product comes later.",
    made: "A macro still and a slow move across the same surface — the opening of a hero film, not a separate setup.",
    achieved:
      "The fit is visible without a diagram. Studio study — a way of seeing the product, not a shipped campaign.",
    role: "Direction, CGI, film.",
  },
  {
    slug: "the-drape",
    title: "The drape",
    territory: "material",
    decision: "Fabric weight and a single light, held long enough to read.",
    image: asset("/work/drape.jpg"),
    film: asset("/work/drape.mp4"),
    duration: "0:06",
    width: 1728,
    height: 1152,
    alt: "Heavy oxblood silk falling in one fold over a matte chalk form.",
    pieces: [
      { n: "01", name: "Hero film", detail: "The cloth settles. The light stays on one fold." },
      { n: "02", name: "Held frame", detail: "Weight, fold and light, with no figure and no prop." },
      { n: "03", name: "Cutdowns", detail: "Shorter holds from this master, not a second setup." },
    ],
    change:
      "A cloth story was being told with a full look before anyone could see how the material behaves. The difference is weight, fold and light.",
    idea: "One length of cloth. One fold. No figure, no prop. The drape is the campaign image; the garment can follow.",
    made: "A hero film and a still of the fold, with the same light for both. Cutdowns come from this master, not a second setup.",
    achieved:
      "The material is understandable on its own. Studio study, not a client fashion film.",
    role: "Direction, film, motion study.",
  },
];

export function getStudy(slug: string) {
  return studies.find((study) => study.slug === slug);
}

export function territoryLabel(territory: Territory) {
  return territory === "technology" ? "Technology" : "Design-led";
}

