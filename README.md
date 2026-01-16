# 🚀 vite-plugin-prerender-static

Dead Simple Static Prerendering for Vite, done the right way.
Static prerendering for Vite with **SEO meta tags**, **multi-route generation**, and **zero runtime dependencies**.
Generate fully static HTML pages from your SPA at build time — ideal for SEO-friendly Vite apps.

---

## ✨ Features

- ⚡ **Vite-native plugin** (runs on `build`)
- 🧠 **Static prerendering** for multiple routes
- 🔍 **SEO meta tag generation** (Open Graph, Twitter, JSON-LD)
- 🧩 **Framework-agnostic core**
- 📂 Correct handling of **nested routes**
- 🔁 **Drop-in replacement** (no breaking changes)
- 🛠️ Works with **React, Vue, Svelte, Solid, Vanilla**

---

## 📦 Installation

```bash
npm install vite-plugin-prerender-static
```

or

```bash
pnpm add vite-plugin-prerender-static
```

---

## 🔧 Usage

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

## 🧠 SEO Configuration

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

## 🧩 Template System

By default, the plugin looks for `template.html` in your project root.

### Default Template (auto-generated)

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

## 🧪 Default Behavior

- If `template.html` is missing → it is **auto-created**
- If `render()` is not provided → a fallback HTML is used
- Relative asset paths are **fixed automatically**
- Runs only during **Vite build**

---

## ⚙️ Options

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

## 📦 Core Package

This plugin uses a framework-agnostic core:

```ts
import { generateSEOTags } from "prerender-core";
```

You can use it independently in:

- Node scripts
- Custom SSGs
- Other build tools

---

## 🔒 Compatibility

| Tool       | Supported                 |
| ---------- | ------------------------- |
| Vite       | v4 → v7                   |
| Node       | v18+                      |
| Frameworks | React, Vue, Svelte, Solid |

---

## 🏁 When Should I Use This?

Use this plugin if:

- You want **SEO for SPAs**
- You don’t want SSR complexity
- You want **static hosting**
- You want full control over HTML output

---

## 🧑‍💻 Author

**Rahul Sharma**
📧 [rahu8299@gmail.com](mailto:rahu8299@gmail.com)
🔗 [https://github.com/rahulsushilsharma](https://github.com/rahulsushilsharma)

---

## 📄 License

MIT © Rahul Sharma

---

## ⭐ Roadmap

- CLI prerender tool
- Astro adapter
- Automatic route discovery
- Parallel rendering
- HTML transform hooks

---

## ❤️ Contributing

PRs welcome!
Please open an issue before major changes.
