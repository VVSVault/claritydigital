export type SanityImage = {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  caption?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

export type SanitySlug = {
  _type: 'slug'
  current: string
}

export type SocialLinks = {
  github?: string
  linkedin?: string
  twitter?: string
  instagram?: string
}

export type SiteSettings = {
  title: string
  description: string
  heroHeadline: string
  heroSubheadline: string
  email: string
  phone?: string
  location: string
  socialLinks?: SocialLinks
}

export type Industry = {
  _id: string
  title: string
  slug: SanitySlug
  description?: string
  challenges?: string[]
  solutions?: string[]
  icon?: string
}

export type Service = {
  _id: string
  title: string
  slug: SanitySlug
  tagline?: string
  description?: string
  fullDescription?: unknown[]
  icon?: string
  deliverables?: string[]
  idealFor?: string[]
  process?: ProcessStep[]
  faq?: FAQ[]
}

export type ProcessStep = {
  step: number
  title: string
  description: string
}

export type FAQ = {
  question: string
  answer: string
}

export type Testimonial = {
  _id: string
  quote: string
  author: string
  role?: string
  company?: string
  image?: SanityImage
}

export type ProjectResult = {
  metric: string
  value: string
  description?: string
}

export type Project = {
  _id: string
  title: string
  slug: SanitySlug | string
  excerpt: string
  client?: string
  serviceType: string
  industry?: string
  services?: Service[]
  featuredImage?: SanityImage
  gallery?: SanityImage[]
  challenge?: string
  approach?: string
  solution?: unknown[]
  results?: ProjectResult[]
  testimonial?: Testimonial
  techStack?: string[]
  projectUrl?: string
  githubUrl?: string
  featured?: boolean
  order?: number
  completedAt?: string
}
