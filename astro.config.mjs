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
  site: "http://localhost:4321",
  experimental: {
    liveContentCollections: true,
  },
  output: 'static',
  adapter: vercel({
    imageService: true,
    excludeFiles: ['./src/pages/**/*.astro']
  }),
  integrations: [
    starlight({
      // Starlight content lives within content/docs/. This is pretty strict outside of remote content.
      title: "My Docs POC",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/withastro/starlight",
        },
      ],
      sidebar: [
        {
          label: "Integrations-SSR-REST",
          link: "/integrations-ssr-rest",
        },
        {
          label: "Integrations-SSR-GQL",
          link: "/integrations-ssr-gql",
        },
        {
          label: "Integrations-SSG-ACL",
          link: "/integrations-ssg-acl",
        },
        {
          label: "Integrations-SSR-LCC",
          link: "/integrations-ssr-lcc",
        },
        {
          // Autogenerate a group of links for the 'components' directory within /content/docs.
          label: "Components",
          autogenerate: { directory: "components" },
        },
        {
          label: "Reference",
          // Autogenerate a group of links for the 'reference' directory within /content/docs
          autogenerate: { directory: "reference" },
        },
        {
          label: "Guides",
          // Autogenerate a group of links for the 'guides' directory within /content/docs.
          autogenerate: { directory: "guides" },
        },
        {
          label: "Supported Platforms",
          autogenerate: { directory: "supported_platforms" }
        }
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