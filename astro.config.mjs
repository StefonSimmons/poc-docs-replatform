// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import vercel from "@astrojs/vercel";

import markdoc from "@astrojs/markdoc";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  experimental: {
    liveContentCollections: true,
  },

  output: 'static',
  adapter: vercel(),

  integrations: [
    starlight({
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
          // Autogenerate a group of links for the 'components' directory.
          label: "Components",
          autogenerate: { directory: "components" },
        },
        {
          label: "Reference",
          // Autogenerate a group of links for the 'reference' directory.
          autogenerate: { directory: "reference" },
        },
        {
          label: "Guides",
          // Autogenerate a group of links for the 'guides' directory.
          autogenerate: { directory: "guides" },
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
    plugins: [tailwindcss()]
  }
});