import fs from "fs";
import path from "path";
import { prerender, type PrerenderOptions } from "spa-prerender-static";
import type { Plugin } from "vite";

export default function prerenderStaticPlugin(
  options: Omit<PrerenderOptions, "template" | "dist"> & {
    template?: string;
    dist?: string;
  }
): Plugin {
  return {
    name: "vite-plugin-prerender-static",
    apply: "build",

    closeBundle() {
      const dist = options.dist ?? path.resolve(process.cwd(), "dist");
      const html = fs.readFileSync(path.join(dist, "index.html"), "utf8");
      const template =
        options.template ?? path.resolve(process.cwd(), "template.html");
      const scripts = html.match(/<script\b[^>]*>[\s\S]*?<\/script>/gi) ?? [];
      const links = html.match(/<link\b[^>]*>/gi) ?? [];

      const headTags = [...scripts, ...links].join("\n");

      prerender({
        ...options,
        dist,
        template,
        headTags,
      });
    },
  };
}
