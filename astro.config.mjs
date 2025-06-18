// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "My Docs",
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
          label: "Integrations",
          link: "/integrations",
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
