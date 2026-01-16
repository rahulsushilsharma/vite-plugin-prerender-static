import fs from "fs";
import path from "path";
import { prerender, type RouteConfig } from "spa-prerender-static";
import type { Plugin } from "vite";

function updatePathAttribute(tag: string) {
  return tag.replace(/\.\//g, "../");
}

export default function prerenderStaticPlugin(options: {
  routes: RouteConfig[];
  render?: (route: RouteConfig) => string;
  template?: string;
  dist?: string;
}): Plugin {
  return {
    name: "vite-plugin-prerender-static",
    apply: "build",

    closeBundle() {
      const dist = options.dist ?? path.resolve(process.cwd(), "dist");
      const template =
        options.template ?? path.resolve(process.cwd(), "template.html");

      const indexHtml = path.join(dist, "index.html");
      if (!fs.existsSync(indexHtml)) {
        console.warn("Missing index.html — skipping prerender");
        return;
      }

      if (!fs.existsSync(template)) {
        const defaultTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
%LINKS%
<title>%TITLE%</title>
</head>
<body>
<div id="root">%APP%</div>
</body>
</html>`;
        fs.writeFileSync(template, defaultTemplate);
      }

      const html = fs.readFileSync(indexHtml, "utf8");

      const scriptTags =
        html.match(/<script\b[^>]*>[\s\S]*?<\/script>/gi) ?? [];
      const linkTags = html.match(/<link\b[^>]*>/gi) ?? [];

      const headTags = [...scriptTags, ...linkTags]
        .map(updatePathAttribute)
        .join("\n");

      prerender({
        routes: options.routes,
        template,
        dist,
        headTags,
        render:
          options.render ??
          (() => "<p style='height:100vh;text-align:center'>hello world</p>"),
      });

      console.log("🏁 Prerender complete!");
    },
  };
}
