import { createRouter } from "@tanstack/react-router";
import { AppErrorComponent } from "@/lib/error-component";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  return createRouter({ basepath: import.meta.env.BASE_URL, routeTree, defaultErrorComponent: AppErrorComponent });
}

