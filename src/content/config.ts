import { defineCollection, z } from "astro:content"

// Blog collection schema
const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
})

// Unicode collection schema
const unicodeCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    code: z.string(),
    description: z.string(),
    category: z.enum(["zero-width", "space", "special", "formatting", "invisible", "braille"]),
    html: z.string(),
    example: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    longDescription: z.string().optional(),
    useCases: z.array(z.string()).default([]),
  }),
})

// Export collections
export const collections = {
  blog: blogCollection,
  unicode: unicodeCollection,
}

