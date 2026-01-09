import type { Metadata } from 'next'
import { ServiceHero } from '@/components/services/service-hero'
import { ServiceContent } from '@/components/services/service-content'
import { ServiceFaq } from '@/components/services/service-faq'
import { CtaBlock } from '@/components/sections/cta-block'

export const metadata: Metadata = {
  title: 'Web Design',
  description: 'Conversion-focused website design that turns visitors into customers. Every layout decision, color choice, and interaction is intentional.',
}

const businessImpact = `A website is not a digital brochure. It is a 24/7 salesperson, a first impression machine, and often the deciding factor in whether someone chooses you or your competitor. The difference between a website that generates leads and one that just exists comes down to design decisions that most business owners never think about.

Where do visitors look first when they land on your homepage? What makes them scroll instead of bounce? When they are ready to take action, is the path obvious or do they have to hunt for it? These questions have answers backed by data and user behavior research. Professional web design applies that knowledge to your specific business.`

const whatIncluded = {
  title: 'What Professional Design Includes',
  content: 'Professional web design is strategic, not decorative. Every design decision serves a business purpose and is informed by your specific audience and goals.',
  subsections: [
    {
      title: 'Discovery and Strategy',
      content: 'Before any design work begins, I research your industry, study your competitors, and understand your customers. What works for a law firm does not work for a fitness studio. Design decisions should be informed by who you are trying to reach and what action you want them to take.',
    },
    {
      title: 'Conversion Architecture',
      content: 'Every page has a job. The homepage builds trust and directs traffic. Service pages educate and persuade. The contact page removes friction. Professional design maps out these user journeys before picking fonts and colors.',
    },
    {
      title: 'Visual Hierarchy',
      content: 'Visitors do not read websites, they scan them. Professional design controls what they see first, second, and third. Headlines, images, buttons, and white space are arranged to guide attention toward your goals.',
    },
    {
      title: 'Mobile-First Approach',
      content: 'Over 60% of web traffic comes from mobile devices. Professional design starts with the mobile experience and scales up, not the other way around. This is not just resizing elements to fit smaller screens. It is rethinking navigation, touch targets, content priority, and load times for users on the go.',
    },
    {
      title: 'Brand Consistency',
      content: 'Your website should feel like an extension of your business, not a generic template with your logo dropped in. Colors, typography, imagery, and tone of voice work together to reinforce who you are and build recognition.',
    },
  ],
}

const whyAlternativesFail = {
  title: 'Why Templates Fall Short',
  content: 'Template marketplaces sell the promise of professional design for $49. What they actually deliver is a starting point that requires significant work to become functional, and even more work to become effective.',
  subsections: [
    {
      title: 'The Hidden Costs of Templates',
      content: `Templates are designed to appeal to buyers, not to convert visitors. They prioritize looking good in a preview thumbnail over actually performing for a business. That hero section with the massive background video? It tanks your page speed. Those fancy animations? They distract from your call to action.

Customizing a template to match your brand takes longer than most people expect. Changing colors sounds simple until you realize the template uses 47 different color values and updating them means hunting through thousands of lines of code. Adding a section that was not in the original design means fighting against the template's structure.

Templates are built for everyone, which means they are optimized for no one. A template does not know that your customers care about pricing transparency, or that your industry requires specific trust signals, or that your sales cycle is six months long and needs nurturing content. It just gives you the same layout it gives everyone else.`,
    },
    {
      title: 'What You Lose With Templates',
      content: `• Conversion optimization based on your specific audience
• Page layouts designed around your actual content
• User flows that match your sales process
• Performance optimization for your specific needs
• Brand differentiation - competitors can buy the same template
• SEO structure built around your target keywords`,
    },
  ],
}

const idealFor = [
  'Businesses whose website is not generating leads or sales',
  'Companies embarrassed to send prospects to their current site',
  'Brands that have outgrown their template',
  'Anyone who tried DIY and ended up with something that does not feel right',
]

const faqs = [
  {
    question: 'How long does a web design project take?',
    answer: 'Most web design projects take 4-8 weeks depending on complexity. I will provide a detailed timeline during our discovery call based on your specific needs.',
  },
  {
    question: 'Do I need to provide content?',
    answer: 'You will need to provide the core information about your business, but I can help guide you on structure and can recommend copywriters if needed.',
  },
  {
    question: 'What if I need changes after the design is complete?',
    answer: 'The design process includes revision rounds built in. After launch, changes can be made through ongoing support or as one-off requests.',
  },
]

export default function WebDesignPage() {
  return (
    <>
      <ServiceHero
        title="Web Design"
        tagline="Design that converts, not just decorates"
        description="Conversion-focused website design that turns visitors into customers. Every layout decision, color choice, and interaction is intentional."
        icon="palette"
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
