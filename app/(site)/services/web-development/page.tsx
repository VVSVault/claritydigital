import type { Metadata } from 'next'
import { ServiceHero } from '@/components/services/service-hero'
import { ServiceContent } from '@/components/services/service-content'
import { ServiceFaq } from '@/components/services/service-faq'
import { CtaBlock } from '@/components/sections/cta-block'

export const metadata: Metadata = {
  title: 'Web Development',
  description: 'Modern development that prioritizes performance, maintainability, and your ability to grow. Built right the first time so you are not rebuilding in two years.',
}

const businessImpact = `Development is the foundation your website sits on. Design gets the attention, but development determines whether your site loads in one second or five, whether it shows up in search results or gets buried, whether you can add features next year or need to start over.

The technology choices made during development have consequences that last years. A site built on outdated technology becomes harder and more expensive to maintain over time. A site built on the wrong platform locks you into limitations you did not know existed until you hit them.`

const whatIncluded = {
  title: 'What Professional Development Includes',
  content: 'Professional web development is built on modern technology, clean code, and best practices that ensure your site performs well today and remains maintainable tomorrow.',
  subsections: [
    {
      title: 'Modern Technology Stack',
      content: 'I build on Next.js, React, and TypeScript because they represent the current standard for production web applications. These are the same technologies used by Netflix, Nike, and hundreds of companies that cannot afford slow or unreliable websites. You get enterprise-grade technology without enterprise-grade pricing.',
    },
    {
      title: 'Performance Optimization',
      content: 'Page speed directly impacts your business. A one-second delay in load time can reduce conversions by 7%. Google uses page speed as a ranking factor. Professional development optimizes images, minimizes code, implements caching, and uses content delivery networks to make your site as fast as possible.',
    },
    {
      title: 'Clean, Documented Code',
      content: 'Code quality matters because websites need maintenance. Features get added. Bugs get fixed. Content gets updated. Clean code makes all of this faster and cheaper. Messy code means every small change takes longer than it should because developers have to untangle what the previous person did.',
    },
    {
      title: 'Security Best Practices',
      content: 'Professional development includes secure authentication, protected forms, encrypted data transmission, and defense against common attacks. This is not optional for any site that collects customer information.',
    },
    {
      title: 'Accessibility Compliance',
      content: 'Websites should work for everyone, including people using screen readers, keyboard navigation, or other assistive technologies. Beyond being the right thing to do, accessibility issues can create legal liability and exclude potential customers.',
    },
  ],
}

const whyAlternativesFail = {
  title: 'Why Page Builders Create Problems',
  content: 'Platforms like Wix, Squarespace, and WordPress with visual builders have made it possible for anyone to create a website without code. This is genuinely useful for certain situations. It is also genuinely problematic for businesses that need their website to perform.',
  subsections: [
    {
      title: 'The Performance Problem',
      content: `Page builders generate bloated code. They load resources you do not use because the builder needs to support features you might use. They add tracking scripts, widget libraries, and framework overhead that slow everything down.

A typical Wix site loads 3-5 MB of data. A professionally built site doing the same thing loads 500 KB. That difference matters when 53% of mobile users abandon sites that take longer than three seconds to load.`,
    },
    {
      title: 'The SEO Problem',
      content: `Search engines cannot see your website the way humans do. They read the code. Page builders generate code that is often difficult for search engines to parse correctly. Important content gets buried in nested divs. Heading structures are wrong. Schema markup is missing or incorrect. Internal linking is limited by the platform's structure.

Professional development creates clean, semantic HTML that search engines understand. Metadata is properly implemented. Schema markup tells Google exactly what your content is. The technical foundation supports your SEO efforts instead of undermining them.`,
    },
    {
      title: 'The Customization Ceiling',
      content: `Every page builder has limits. You will not see them until you need something the platform cannot do. Maybe it is a specific integration your business requires. Maybe it is a feature your competitor has. Maybe it is performance that the platform cannot achieve.

At that point, you face a choice: accept the limitation or rebuild on something else. Professional development on an open technology stack means you are never locked in. Any feature that can be built, can be added.`,
    },
    {
      title: 'The Lock-In Problem',
      content: `Your Squarespace site cannot move to another platform. Your Wix content is trapped in Wix. These platforms have no incentive to make leaving easy because keeping you locked in is their business model.

Professional development on open-source technology means you own your code. You can host it anywhere. You can hire any developer to work on it. Your website is an asset you control, not a rental agreement.`,
    },
  ],
}

const idealFor = [
  'Businesses experiencing slow load times or performance issues',
  'Companies that have hit the limits of their current platform',
  'Anyone whose developer keeps saying "the platform cannot do that"',
  'Businesses that need proper analytics and tracking',
  'Anyone who wants to actually own their website',
]

const faqs = [
  {
    question: 'What technologies do you use?',
    answer: 'I primarily build with Next.js, React, and TypeScript for the frontend, with options like Sanity, Supabase, or PostgreSQL for the backend depending on your needs.',
  },
  {
    question: 'Will my website be fast?',
    answer: 'Absolutely. Performance is a priority. I optimize for Core Web Vitals and aim for 90+ Lighthouse scores on every project.',
  },
  {
    question: 'Can you work with my existing design?',
    answer: 'Yes! I can develop from existing designs, whether they are in Figma, Sketch, or another format.',
  },
]

export default function WebDevelopmentPage() {
  return (
    <>
      <ServiceHero
        title="Web Development"
        tagline="Fast, clean code that scales with your business"
        description="Modern development that prioritizes performance, maintainability, and your ability to grow. Built right the first time so you are not rebuilding in two years."
        icon="code"
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
