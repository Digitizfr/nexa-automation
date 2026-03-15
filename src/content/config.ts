import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default("NEXA Automation"),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const caseStudies = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    client: z.string(),
    sector: z.string(),
    tools: z.array(z.string()),
    results: z.array(z.string()),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  blog,
  "case-studies": caseStudies,
};
