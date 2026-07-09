import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro:schema";

const dictionary = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/dictionary" }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    shortDefinition: z.string(),
    plainEnglish: z.string(),
    whyItMatters: z.string(),
    example: z.string(),
    relatedTerms: z.array(z.string()).default([]),
    relatedServices: z.array(z.string()).default([]),
    featured: z.boolean().optional(),
    order: z.number().optional()
  })
});

export const collections = {
  dictionary
};
