import { defineCollection, z } from "astro:content";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { remoteLoader } from "../loaders.ts";

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema(),
  }),
  remote_integrations: defineCollection({
    loader: remoteLoader({
      path: "content/en/integrations",
      owner: "DataDog",
      repo: "websites-sources",
      branch: "main",
    }),
    schema: z.object({
      name: z.string(),
      fm: z.object({
        algolia: z.optional(z.record(z.any())),
        aliases: z.optional(z.array(z.string())),
        app_id: z.string(),
        categories: z.array(z.string()),
        custom_kind: z.string(),
        description: z.string(),
        further_reading: z.optional(z.array(z.object({
          link: z.string(),
          text: z.string(),
          tag: z.string(),
        }))),
        integration_version: z.optional(z.string()),
        media: z.optional(z.array(z.object({
          caption: z.string(),
          media_type: z.string(),
          image_url: z.string()
        }))),
        supported_os: z.optional(z.array(z.string())),
        title: z.string(),
      }),
      content: z.string(),
    }),
  }),
};
