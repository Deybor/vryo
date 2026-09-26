import { createFileRoute } from "@tanstack/react-router";
import { FilmHome } from "@/components/film-home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VYRO Creative Studio — Make the product felt." },
      {
        name: "description",
        content:
          "VYRO directs cinematic campaigns for technology and design-led brands. Direction, CGI, film and design.",
      },
    ],
  }),
  component: FilmHome,
});
