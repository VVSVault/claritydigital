import type { Metadata } from 'next'
import { ServiceHero } from '@/components/services/service-hero'
import { ServiceContent } from '@/components/services/service-content'
import { ServiceFaq } from '@/components/services/service-faq'
import { CtaBlock } from '@/components/sections/cta-block'

export const metadata: Metadata = {
  title: 'SEO Services for Small Business',
  description: 'SEO that drives qualified traffic to your business. Technical optimization, keyword strategy, and ongoing performance monitoring for small businesses.',
  alternates: {
    canonical: 'https://claritydigital.dev/services/seo',
  },
  openGraph: {
    title: 'SEO Services for Small Business | Clarity Digital',
    description: 'SEO that drives qualified traffic to your business. Technical optimization, keyword strategy, and ongoing performance monitoring.',
    url: 'https://claritydigital.dev/services/seo',
  },
}

const businessImpact = `Over half of all website traffic comes from organic search. When someone searches for what you offer, you either appear in the results or your competitors do. SEO is the work that determines which side of that equation you land on.

SEO is not a one-time project. Search engines constantly update their algorithms. Competitors are working on their own rankings. Content gets stale. Technical issues creep in. Sustainable search visibility requires ongoing attention.`

const whatIncluded = {
  title: 'What Professional SEO Includes',
  content: 'Professional SEO combines technical optimization, strategic content, and ongoing refinement to improve your search visibility and drive qualified traffic to your business.',
  subsections: [
    {
      title: 'Technical Foundation',
      content: 'Before search engines can rank your content, they need to find it, crawl it, and understand it. Technical SEO addresses the infrastructure: site speed, mobile responsiveness, URL structure, XML sitemaps, robots.txt, canonical tags, schema markup, and the dozens of other technical factors that affect how search engines see your site.',
    },
    {
      title: 'Keyword Research and Strategy',
      content: 'Understanding what your potential customers actually search for shapes everything else. Professional keyword research identifies the terms worth targeting based on search volume, competition, and relevance to your business. This informs content creation, page structure, and optimization priorities.',
    },
    {
      title: 'On-Page Optimization',
      content: 'Every page on your site is an opportunity to rank for relevant searches. On-page optimization ensures each page has proper title tags, meta descriptions, heading structures, internal links, and content that serves both users and search engines.',
    },
    {
      title: 'Content Strategy',
      content: 'Search engines reward sites that provide valuable, comprehensive content. Content strategy identifies what topics to cover, what formats to use, and how to structure content to capture search traffic while serving your audience.',
    },
    {
      title: 'Local SEO',
      content: 'For businesses serving specific geographic areas, local SEO is critical. This includes Google Business Profile optimization, local citation building, review management, and location-specific content.',
    },
    {
      title: 'Analytics and Reporting',
      content: 'SEO without measurement is guessing. Professional SEO includes proper tracking setup, regular reporting on rankings and traffic, and analysis that connects search performance to business outcomes.',
    },
  ],
}

const whyAlternativesFail = {
  title: 'Why DIY SEO Often Backfires',
  content: 'SEO information is everywhere online. Blog posts, YouTube videos, and courses promise to teach you everything you need to know. Some of this information is good. Much of it is outdated, incomplete, or flat-out wrong.',
  subsections: [
    {
      title: 'The Information Problem',
      content: `Search engines do not publish their ranking algorithms. Everything in SEO is based on testing, observation, and educated inference. What worked two years ago might be ineffective or even harmful today. Advice from 2019 about keyword density or backlink building could actively hurt your site in 2024.

Professional SEO means staying current with algorithm updates, testing what actually works, and applying knowledge from working across multiple sites and industries.`,
    },
    {
      title: 'The Technical Complexity',
      content: `Technical SEO requires understanding how websites work at a fundamental level. Implementing schema markup, fixing crawl errors, resolving duplicate content issues, and improving Core Web Vitals are not tasks most business owners can handle without development experience.

Getting technical SEO wrong can make things worse. A misconfigured robots.txt can block search engines entirely. Incorrect redirects can tank your rankings overnight. Duplicate content issues can dilute your authority across hundreds of pages.`,
    },
    {
      title: 'The Time Investment',
      content: `SEO takes time to show results. Rankings do not improve overnight. The work you do today shows up in rankings months from now. This creates a dangerous situation for DIY SEO: you make changes, see no immediate results, assume it is not working, and try something else. The lack of patience leads to constant strategy shifts that never gain momentum.

Professional SEO includes the patience and consistency that results require, plus the experience to know whether something is not working or just needs more time.`,
    },
    {
      title: 'The Opportunity Cost',
      content: 'Hours spent learning SEO basics, auditing your site, researching keywords, and creating content are hours not spent on your actual business. For most business owners, that time is worth more focused on what they do best.',
    },
  ],
}

const idealFor = [
  'Businesses not appearing in search results for relevant terms',
  'Companies dependent on paid advertising who want organic alternatives',
  'Anyone whose competitors consistently outrank them',
  'Businesses in new markets who need to establish search presence',
  'Anyone who tried SEO themselves and did not see results',
]

const faqs = [
  {
    question: 'How long does SEO take to show results?',
    answer: 'SEO is a long-term investment. You may see improvements within 3-6 months, with significant results typically appearing after 6-12 months of consistent effort.',
  },
  {
    question: 'Do you guarantee rankings?',
    answer: 'No legitimate SEO provider can guarantee specific rankings. What I can promise is following best practices and transparent reporting on progress.',
  },
  {
    question: 'Is SEO included with web development?',
    answer: 'Basic technical SEO is included with all websites I build. For ongoing SEO efforts and content strategy, we can discuss a dedicated SEO package.',
  },
]

export default function SeoPage() {
  return (
    <>
      <ServiceHero
        title="SEO Solutions"
        tagline="Get found by the people searching for what you offer"
        description="Technical SEO, content strategy, and ongoing optimization to improve your search rankings and organic traffic."
        icon="search"
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
