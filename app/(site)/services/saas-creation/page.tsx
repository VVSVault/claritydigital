import type { Metadata } from 'next'
import { ServiceHero } from '@/components/services/service-hero'
import { ServiceContent } from '@/components/services/service-content'
import { ServiceFaq } from '@/components/services/service-faq'
import { CtaBlock } from '@/components/sections/cta-block'

export const metadata: Metadata = {
  title: 'SaaS Creation',
  description: 'Full-service development for software-as-a-service products. From idea and architecture through launch and iteration.',
}

const businessImpact = `A SaaS product is not a website with a login page. It is a software application that solves a specific problem for a specific audience, delivered through the browser instead of installed on a computer. Building one requires different thinking than building a website.

SaaS products have user accounts and permissions. They store and process customer data. They handle payments and subscriptions. They need to stay online and perform consistently. They evolve based on user feedback. Getting these fundamentals wrong creates problems that compound over time.`

const whatIncluded = {
  title: 'What Professional SaaS Development Includes',
  content: 'Building a SaaS product requires technical expertise across multiple domains: product strategy, architecture, authentication, data management, payments, and ongoing operations.',
  subsections: [
    {
      title: 'Product Strategy',
      content: 'Before writing code, I help you define what you are actually building. Who is this for? What problem does it solve? What is the minimum feature set that delivers value? What does the business model look like? These questions shape technical decisions that are expensive to change later.',
    },
    {
      title: 'Architecture Design',
      content: 'SaaS products need to handle growth. A database structure that works for 100 users might collapse at 10,000. An architecture decision that saves time now might create scaling nightmares later. Professional development thinks through these scenarios before they become emergencies.',
    },
    {
      title: 'Authentication and Permissions',
      content: 'Users need to sign up, log in, reset passwords, and manage their accounts. Different users need different access levels. Teams need to share accounts. Single sign-on might be required for enterprise customers. Authentication sounds simple but the details matter.',
    },
    {
      title: 'Data Management',
      content: 'What data do you collect? Where is it stored? How is it backed up? Who can access it? How long do you keep it? What happens when a user wants to delete their account? Professional development addresses these questions with proper database design, backup systems, and data policies.',
    },
    {
      title: 'Payment Integration',
      content: 'Subscription billing, usage-based pricing, free trials, upgrades, downgrades, refunds, failed payments, invoicing. Payment systems are complex and getting them wrong means lost revenue or angry customers.',
    },
    {
      title: 'Deployment and Operations',
      content: 'Your product needs to be online and working. Professional development includes deployment pipelines, monitoring, error tracking, and the infrastructure to keep things running smoothly.',
    },
  ],
}

const whyAlternativesFail = {
  title: 'Why No-Code and Low-Code Have Limits',
  content: 'No-code platforms like Bubble and low-code tools have made it possible to build functional applications without traditional development. For prototyping and simple internal tools, they can be valuable. For products you plan to scale into a real business, they create constraints.',
  subsections: [
    {
      title: 'Performance Limitations',
      content: 'No-code platforms generate inefficient code because they need to handle any possible configuration. As your user base grows, performance degrades faster than it would with custom development.',
    },
    {
      title: 'Feature Constraints',
      content: 'Every no-code platform has boundaries. When you hit them, you cannot code around them. You are dependent on the platform adding the feature you need or finding a workaround that compromises your product.',
    },
    {
      title: 'Integration Challenges',
      content: 'Connecting to external services, APIs, and data sources often requires custom code. No-code platforms support common integrations but struggle with anything outside their predetermined list.',
    },
    {
      title: 'Ownership Questions',
      content: 'If your product is built on Bubble and Bubble changes their pricing, shuts down, or makes decisions you disagree with, your options are limited. You cannot take your code and move elsewhere because there is no code to take.',
    },
    {
      title: 'Investor and Acquirer Concerns',
      content: 'If you plan to raise funding or eventually sell your company, technical due diligence will examine your stack. Products built on no-code platforms often raise concerns about scalability, maintainability, and long-term viability.',
    },
  ],
}

const idealFor = [
  'Entrepreneurs with a software idea ready to build',
  'Businesses that need internal tools too complex for spreadsheets',
  'Companies with a manual process that should be automated',
  'Anyone who has validated demand and needs to build the product',
]

const faqs = [
  {
    question: 'How long does it take to build a SaaS product?',
    answer: 'An MVP typically takes 8-12 weeks. More complex products may take longer. We will define scope and timeline together during the planning phase.',
  },
  {
    question: 'Do you handle ongoing maintenance?',
    answer: 'Yes, I offer ongoing support and maintenance packages to keep your product running smoothly and help you iterate based on user feedback.',
  },
  {
    question: 'Can you help validate my idea first?',
    answer: 'Absolutely. We can start with a discovery phase to validate your idea, define features, and plan the technical approach before building.',
  },
]

export default function SaasCreationPage() {
  return (
    <>
      <ServiceHero
        title="SaaS Creation"
        tagline="Your software idea, built and launched"
        description="Full-service development for software-as-a-service products. From idea and architecture through launch and iteration."
        icon="rocket"
      />

      <ServiceContent
        businessImpact={businessImpact}
        whatIncluded={whatIncluded}
        whyAlternativesFail={whyAlternativesFail}
        idealFor={idealFor}
      />

      <ServiceFaq faqs={faqs} />
      <CtaBlock />
    </>
  )
}
