import fs from "fs";
import path from "path";
import { prerender, type PrerenderOptions } from "spa-prerender-static";
import type { Plugin } from "vite";

export default function prerenderStaticPlugin(
  options: Omit<PrerenderOptions, "template" | "dist"> & {
    template?: string;
    dist?: string;
  },
): Plugin {
  return {
    name: "vite-plugin-prerender-static",
    apply: "build",

    closeBundle() {
      // add error handling
      if (!fs.existsSync("index.html")) {
        console.warn("Missing index.html — skipping prerender");
        console.warn("Make sure to build your project before prerendering.");
        return;
      }
      if (options.dist && !fs.existsSync(options.dist)) {
        console.warn(`Missing ${options.dist} — skipping prerender`);
        console.warn("Make sure to build your project before prerendering.");
        return;
      } else if (!options.dist && !fs.existsSync("dist")) {
        console.warn("Missing dist/ — skipping prerender");
        console.warn("Make sure to build your project before prerendering.");
        return;
      }

      if (options.routes && options.routes.length === 0) {
        console.warn("No routes specified — skipping prerender");
        console.warn("Make sure to provide at least one route to prerender.");
        return;
      }

      if (!options.template && !fs.existsSync("template.html")) {
        console.warn("Missing template.html — skipping prerender");
        console.warn(
          "Make sure to provide a template file. See README for details.",
        );
        return;
      }

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
