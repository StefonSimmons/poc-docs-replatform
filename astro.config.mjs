// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
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
          label: "Guides",
          // Autogenerate a group of links for the 'guides' directory.
          autogenerate: { directory: "guides" },
        },
        {
          label: "Integrations-SSR-REST",
          link: "/integrations-ssr-rest",
        },
        {
          label: "Integrations-SSR-GQL",
          link: "/integrations-ssr-gql",
        },
        {
          label: "Reference",
          // Autogenerate a group of links for the 'reference' directory.
          autogenerate: { directory: "reference" },
        },
      ],
    }),
  ],
});
