import { defineField, defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
    }),
    defineField({
      name: 'serviceType',
      title: 'Service Type',
      type: 'string',
      description: 'Primary service type for this project',
      options: {
        list: [
          { title: 'Web Design', value: 'Web Design' },
          { title: 'Web Development', value: 'Web Development' },
          { title: 'SaaS Platform', value: 'SaaS Platform' },
          { title: 'E-Commerce', value: 'E-Commerce' },
          { title: 'SEO', value: 'SEO' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
      description: 'Industry context (shown as subtle badge)',
    }),
    defineField({
      name: 'services',
      title: 'Additional Services Used',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
      description: 'Optional: Other services involved in this project',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', title: 'Alt Text', type: 'string' }
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Project Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Alt Text', type: 'string' },
            { name: 'caption', title: 'Caption', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'challenge',
      title: 'The Challenge',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'approach',
      title: 'The Approach',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'solution',
      title: 'The Solution',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'results',
      title: 'Results',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'metric', title: 'Metric', type: 'string' },
            { name: 'value', title: 'Value', type: 'string' },
            { name: 'description', title: 'Description', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'testimonial',
      title: 'Client Testimonial',
      type: 'reference',
      to: [{ type: 'testimonial' }],
    }),
    defineField({
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Next.js', value: 'nextjs' },
          { title: 'React', value: 'react' },
          { title: 'TypeScript', value: 'typescript' },
          { title: 'Tailwind CSS', value: 'tailwind' },
          { title: 'Node.js', value: 'nodejs' },
          { title: 'PostgreSQL', value: 'postgresql' },
          { title: 'Supabase', value: 'supabase' },
          { title: 'Vercel', value: 'vercel' },
          { title: 'Sanity', value: 'sanity' },
          { title: 'Stripe', value: 'stripe' },
          { title: 'OpenAI', value: 'openai' },
          { title: 'Framer Motion', value: 'framer' },
        ],
      },
    }),
    defineField({
      name: 'projectUrl',
      title: 'Live Project URL',
      type: 'url',
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
    defineField({
      name: 'completedAt',
      title: 'Completion Date',
      type: 'date',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      serviceType: 'serviceType',
      industry: 'industry',
      media: 'featuredImage',
    },
    prepare({ title, serviceType, industry, media }) {
      return {
        title,
        subtitle: [serviceType, industry].filter(Boolean).join(' • '),
        media,
      }
    },
  },
})
