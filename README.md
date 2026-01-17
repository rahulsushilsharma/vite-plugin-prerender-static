# vite-plugin-prerender-static

Dead-simple static prerendering for Vite, implemented correctly.

A lightweight static prerendering solution for Vite with built-in SEO meta tag support, multi-route generation, and zero runtime dependencies.
It generates fully static HTML pages from your SPA at build time, making it ideal for SEO-focused Vite applications without the complexity of SSR.

---

## Features

- Vite-native plugin (runs during `build`)
- Static prerendering for multiple routes
- SEO meta tag generation (Open Graph, Twitter, JSON-LD)
- Framework-agnostic core
- Correct handling of nested routes
- Drop-in replacement with no breaking changes
- Compatible with React, Vue, Svelte, Solid, and Vanilla JS

---

## Installation

```bash
npm install vite-plugin-prerender-static
```

or

```bash
pnpm add vite-plugin-prerender-static
```

---

## Usage

### `vite.config.ts`

```ts
import { defineConfig } from "vite";
import prerenderStatic from "vite-plugin-prerender-static";

export default defineConfig({
  plugins: [
    prerenderStatic({
      routes: [
        {
          path: "/",
          tags: {
            title: "Home",
            description: "Welcome to my site",
          },
        },
        {
          path: "/about",
          tags: {
            title: "About",
            description: "About us page",
          },
        },
      ],

      render: (route) => {
        return `<div id="root">Static content for ${route.path}</div>`;
      },
    }),
  ],
});
```

---

## SEO Configuration

### Using Structured SEO Tags

```ts
{
  path: "/blog",
  tags: {
    title: "Blog",
    description: "Latest posts",
    author: "Rahul Sharma",
    url: "https://example.com/blog",
    image: "https://example.com/og.png",
    keywords: "vite, seo, prerender",
    canonical: "https://example.com/blog",
    robots: "index, follow",
    schema: {
      "@context": "https://schema.org",
      "@type": "Blog"
    }
  }
}
```

---

## Template System

By default, the plugin looks for `template.html` in the project root.

### Default Template (Auto-generated)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    %LINKS%
    <title>%TITLE%</title>
  </head>
  <body>
    <div id="root">%APP%</div>
  </body>
</html>
```

### Placeholders

| Placeholder | Description                        |
| ----------- | ---------------------------------- |
| `%LINKS%`   | Injected scripts, styles, SEO tags |
| `%TITLE%`   | Page title                         |
| `%APP%`     | Rendered HTML content              |

---

## Default Behavior

- If `template.html` is missing, it is automatically created
- If `render()` is not provided, a fallback HTML output is used
- Relative asset paths are fixed automatically
- The plugin runs only during the Vite build phase

---

## Options

```ts
prerenderStatic({
  routes: {
    path: string
    tags: string | SEOTagOptions
  }[],

  render?: (route) => string,
  template?: string,
  dist?: string
})
```

---

## Core Package

This plugin is built on a framework-agnostic core:

```ts
import { generateSEOTags } from "prerender-core";
```

The core package can be used independently in:

- Node.js scripts
- Custom static site generators
- Other build pipelines

---

## Compatibility

| Tool       | Supported Versions        |
| ---------- | ------------------------- |
| Vite       | v4 → v7                   |
| Node.js    | v18+                      |
| Frameworks | React, Vue, Svelte, Solid |

---

## When Should I Use This?

This plugin is a good fit if:

- You need SEO support for SPAs
- You want to avoid SSR complexity
- You are deploying to static hosting
- You want full control over the generated HTML

---

## Author

**Rahul Sharma**
Email: [rahu8299@gmail.com](mailto:rahu8299@gmail.com)
GitHub: [https://github.com/rahulsushilsharma](https://github.com/rahulsushilsharma)

---

## License

MIT © Rahul Sharma

---

## Roadmap

- CLI prerender tool
- Automatic route discovery
- HTML transformation hooks

---

## Contributing

Pull requests are welcome.
Please open an issue before proposing major changes.
