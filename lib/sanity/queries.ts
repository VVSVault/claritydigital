import { groq } from 'next-sanity'

export const settingsQuery = groq`
  *[_type == "siteSettings"][0] {
    title,
    description,
    heroHeadline,
    heroSubheadline,
    email,
    phone,
    location,
    socialLinks
  }
`

export const allProjectsQuery = groq`
  *[_type == "project"] | order(order asc) {
    _id,
    title,
    slug,
    excerpt,
    client,
    serviceType,
    industry,
    "services": services[]->{title, slug},
    featuredImage,
    techStack,
    featured,
    completedAt
  }
`

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(order asc) [0...5] {
    _id,
    title,
    slug,
    excerpt,
    serviceType,
    industry,
    featuredImage
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    client,
    serviceType,
    industry,
    "services": services[]->{title, slug, icon},
    featuredImage,
    gallery,
    challenge,
    approach,
    solution,
    results,
    "testimonial": testimonial->{quote, author, role, company, image},
    techStack,
    projectUrl,
    githubUrl,
    completedAt
  }
`

export const projectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)][].slug.current
`

export const projectsByServiceTypeQuery = groq`
  *[_type == "project" && serviceType == $serviceType] | order(order asc) {
    _id,
    title,
    slug,
    excerpt,
    serviceType,
    industry,
    featuredImage
  }
`

export const allServicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    slug,
    tagline,
    description,
    icon,
    deliverables
  }
`

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    tagline,
    description,
    fullDescription,
    icon,
    deliverables,
    idealFor,
    process,
    faq
  }
`

export const projectsByServiceQuery = groq`
  *[_type == "project" && references($serviceId)] | order(order asc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    serviceType,
    industry,
    featuredImage
  }
`

export const featuredTestimonialsQuery = groq`
  *[_type == "testimonial" && featured == true] {
    _id,
    quote,
    author,
    role,
    company,
    image
  }
`
