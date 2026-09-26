import type { ErrorComponentProps } from "@tanstack/react-router";

const FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";

function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  return FALLBACK_MESSAGE;
}

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main className="flex min-h-screen flex-col items-start justify-center gap-4 bg-chalk px-5 text-carbon md:px-16">
      <p className="text-xs font-medium tracking-[0.06em] text-[#6b303e] uppercase">VYRO</p>
      <h1 className="text-3xl font-medium">Something went wrong</h1>
      <p className="max-w-md text-base break-words">{errorMessage(error)}</p>
    </main>
  );
}
