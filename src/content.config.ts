import { defineCollection, z } from "astro:content";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { remoteLoader } from "../loaders";
import { glob } from "astro/loaders";

/**
 * This file exports a collections object that defines the collections for the project.
 * A collection is a group of documents that share the same schema.
 * Each collection is defined using the defineCollection function.
 */
export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      // need to extend the built-in docs schema in order to make these frontmatter params available as variables
      extend: z.object({
        further_reading: z.object({
          link: z.string(),
          text: z.string(),
          tag: z.string().optional(),
        }).array().optional(),
      }),
    }),
  }),
  components: defineCollection({
    // For all components in content/docs/components
    loader: glob({ pattern:"**/*.mdoc", base: "./src/content/docs/components" }),
    schema: z.object({
      title: z.string(),
      description: z.string(),
      further_reading: z.object({
        link: z.string(),
        text: z.string(),
        tag: z.string().optional(),
      }).array().optional(),
    }),
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
        app_id: z.optional(z.string()),
        categories: z.optional(z.array(z.string())),
        custom_kind: z.optional(z.string()),
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
