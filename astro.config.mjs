// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import vercel from "@astrojs/vercel";
import markdoc from "@astrojs/markdoc";
import tailwindcss from "@tailwindcss/vite";
import yaml from '@rollup/plugin-yaml';

// https://astro.build/config
export default defineConfig({
  // site: "https://docs.datadoghq.com",
  site: process.env.SITE_URL || "http://localhost:4321",
  experimental: {
    liveContentCollections: true,
  },
  output: 'static',
  prefetch: false,
  adapter: vercel({
    imageService: true,
    excludeFiles: ['./src/pages/**/*.astro']
  }),
  image: {
    remotePatterns: [{ protocol: "https" }],
  },
  integrations: [
    starlight({
      // Starlight content lives within content/docs/. This is pretty strict outside of remote content.
      title: "My Docs POC",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/StefonSimmons/poc-docs-replatform",
        },
      ],
      sidebar: [
        {
          label: "Integrations - Github API",
          items: [
            {
              label: "SSR REST Solution",
              link: "/integrations/ssr-rest",
            },
            {
              label: "SSR GQL Solution",
              link: "/integrations/ssr-gql",
            },
            {
              label: "SSR LCC On-Demand Solution",
              link: "/integrations/ssr-lcc",
            },
            {
              label: "SSG CL Build-time Solution",
              link: "/integrations/ssg-cl",
            },
          ],
          collapsed: true,
        },
        {
          // Autogenerate a group of links for the 'components' directory within /content/docs.
          label: "Components",
          autogenerate: { directory: "components" },
          collapsed: true,
        },
        {
          label: "Documentation",
          autogenerate: { directory: "content"},
          collapsed: true,
        },
        {
          label: "Starlight",
          // Autogenerate a group of links for the 'how_to' directory within /content/docs
          autogenerate: { directory: "starlight_how_to" },
          collapsed: true,
          badge: { text: 'How to', variant: 'caution' }
        },
      ],
      customCss: [
        // Path to your Tailwind base styles:
        './src/styles/global.css',
      ],
    }), markdoc({
      allowHTML: true
    })
  ],

  vite: {
    plugins: [tailwindcss(), yaml()]
  }
});