import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/enquire")({
  head: () => ({
    meta: [
      { title: "Enquire — VYRO" },
      {
        name: "description",
        content:
          "Start a VYRO brief with the product, the audience and what the campaign should leave behind.",
      },
    ],
  }),
  component: Enquire,
});

const STUDIO_MAIL = "hello@vyro.studio";

type Fields = {
  name: string;
  email: string;
  organisation: string;
  product: string;
  felt: string;
  territory: "technology" | "material" | "";
  timing: string;
};

const empty: Fields = {
  name: "",
  email: "",
  organisation: "",
  product: "",
  felt: "",
  territory: "",
  timing: "",
};

function briefText(fields: Fields) {
  const territory =
    fields.territory === "technology"
      ? "Technology"
      : fields.territory === "material"
        ? "Design-led"
        : "Not specified";
  return [
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Organisation: ${fields.organisation || "—"}`,
    `Product: ${fields.product}`,
    `What should be felt: ${fields.felt}`,
    `Territory: ${territory}`,
    `Timing: ${fields.timing || "—"}`,
  ].join("\n");
}

function Enquire() {
  const [fields, setFields] = useState<Fields>(empty);
  const [error, setError] = useState("");
  const [ready, setReady] = useState("");
  const [copied, setCopied] = useState(false);

  function update<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((current) => ({ ...current, [key]: value }));
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setCopied(false);
    if (!fields.name.trim() || !fields.product.trim() || !fields.felt.trim()) {
      setError("Name, product and what should be felt are required.");
      setReady("");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
      setError("Add an email we can reply to.");
      setReady("");
      return;
    }
    if (!fields.territory) {
      setError("Choose a territory so the brief has a starting point.");
      setReady("");
      return;
    }
    setError("");
    setReady(briefText(fields));
  }

  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(`To: ${STUDIO_MAIL}\n\n${ready}`);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const mailto = ready
    ? `mailto:${STUDIO_MAIL}?subject=${encodeURIComponent(`VYRO brief — ${fields.product}`)}&body=${encodeURIComponent(ready)}`
    : `mailto:${STUDIO_MAIL}`;

  return (
    <section className="grid min-h-dvh bg-chalk text-carbon md:grid-cols-2">
      <div className="flex flex-col justify-between bg-carbon px-5 py-28 text-chalk md:sticky md:top-0 md:h-dvh md:px-16 md:py-16">
        <p className="label">Enquire</p>
        <div>
          <h1 className="hero-title max-w-[8ch]">Start with the product.</h1>
          <p className="mt-8 max-w-md text-lg">
            A useful brief names the product, the audience and the feeling the work should leave. Price and
            schedule follow that scope.
          </p>
        </div>
        <p className="mt-10 max-w-md">
          Write to{" "}
          <a className="underline underline-offset-4" href={`mailto:${STUDIO_MAIL}`}>
            {STUDIO_MAIL}
          </a>
          , or prepare the brief here and send it yourself. Nothing leaves this page until you do.
        </p>
      </div>

      <div className="px-5 py-16 md:px-16 md:py-28">
        {ready ? (
          <div>
            <p className="label text-oxblood">Brief ready</p>
            <h2 className="display-xl mt-3">Send it when you are ready.</h2>
            <pre className="mt-8 max-w-prose font-sans text-base whitespace-pre-wrap">{ready}</pre>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={mailto} className="inline-flex min-h-12 items-center bg-oxblood px-5 text-chalk">
                Open email
              </a>
              <button
                type="button"
                onClick={copyBrief}
                className="inline-flex min-h-12 items-center border border-carbon px-5"
              >
                {copied ? "Copied" : "Copy brief"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setReady("");
                  setCopied(false);
                }}
                className="inline-flex min-h-12 items-center px-2 underline underline-offset-4"
              >
                Edit
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="flex flex-col gap-7">
            <Field label="Name" value={fields.name} onChange={(value) => update("name", value)} />
            <Field
              label="Email"
              type="email"
              value={fields.email}
              onChange={(value) => update("email", value)}
              autoComplete="email"
            />
            <Field
              label="Organisation"
              value={fields.organisation}
              onChange={(value) => update("organisation", value)}
              optional
            />
            <Field
              label="Product"
              value={fields.product}
              onChange={(value) => update("product", value)}
              hint="What are we looking at?"
            />
            <label className="block">
              <span className="label text-oxblood">What should be felt</span>
              <textarea
                value={fields.felt}
                onChange={(event) => update("felt", event.target.value)}
                rows={4}
                className="mt-2 w-full resize-none border-b border-carbon bg-transparent py-3 text-lg outline-none"
              />
            </label>
            <fieldset>
              <legend className="label text-oxblood">Territory</legend>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:gap-6">
                {(
                  [
                    ["technology", "Technology"],
                    ["material", "Design-led"],
                  ] as const
                ).map(([value, label]) => (
                  <label key={value} className="flex min-h-11 items-center gap-3">
                    <input
                      type="radio"
                      name="territory"
                      value={value}
                      checked={fields.territory === value}
                      onChange={() => update("territory", value)}
                      className="size-4 accent-oxblood"
                    />
                    {label}
                  </label>
                ))}
              </div>
            </fieldset>
            <Field
              label="Timing"
              value={fields.timing}
              onChange={(value) => update("timing", value)}
              optional
              hint="When the work needs to be in the world."
            />
            {error ? (
              <p role="alert" className="text-oxblood">
                {error}
              </p>
            ) : null}
            <button type="submit" className="arrow-link display inline-flex w-fit items-center gap-3 text-4xl">
              Prepare brief <span className="arrow-shift">→</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  optional = false,
  hint,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  optional?: boolean;
  hint?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="label text-oxblood">
        {label}
        {optional ? " — optional" : ""}
      </span>
      {hint ? <span className="mt-1 block text-base">{hint}</span> : null}
      <input
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full border-b border-carbon bg-transparent py-3 text-base outline-none"
      />
    </label>
  );
}
