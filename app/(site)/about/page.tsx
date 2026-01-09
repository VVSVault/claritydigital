import type { Metadata } from 'next'
import Image from 'next/image'
import { Container } from '@/components/ui/container'
import { MegaCta } from '@/components/sections/mega-cta'

export const metadata: Metadata = {
  title: 'About | Clarity Digital',
  description: 'Learn about Tanner Carlson and the research-driven approach behind Clarity Digital Services.',
}

const techStack = {
  frontend: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  backend: ['Node.js', 'PostgreSQL', 'Supabase', 'Python'],
  infrastructure: ['AWS', 'Vercel', 'Sanity', 'Stripe'],
  ai: ['LLM Integration', 'ML Model Training', 'Agentic Workflows'],
}

const quickFacts = [
  { label: 'Location', value: 'Lexington, Kentucky' },
  { label: 'Started Development', value: '2019' },
  { label: 'Background', value: 'Luxury jewelry (Tiffany & Co.)' },
  { label: 'Own Products', value: 'FlipOps, Infinet' },
  { label: 'AWS Certifications', value: 'Cloud Practitioner, Solutions Architect' },
  { label: 'Approach', value: 'Research-driven, industry-agnostic' },
]

const workSpans = [
  {
    title: 'Web Design and Development',
    description: 'For businesses that have outgrown their templates or need something built right from the start',
  },
  {
    title: 'SaaS Products',
    description: 'Like FlipOps, a real estate investment platform I own and operate, which gave me firsthand experience building software that real users depend on daily',
  },
  {
    title: 'Web Applications',
    description: 'With custom dashboards, user portals, integrations, and the kind of functionality that template builders cannot touch',
  },
  {
    title: 'AI Integration',
    description: 'Including conversational interfaces, recommendation engines, and workflow automation that actually saves time',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] font-bold tracking-tight text-text-primary">
                About Tanner Carlson
              </h1>
              <div className="mt-4 h-1 w-16 bg-gradient-to-r from-accent to-purple-500" />

              <p className="mt-10 text-xl leading-relaxed text-text-secondary">
                I build websites, web applications, and SaaS platforms for businesses that need
                enterprise-quality work without enterprise budgets or timelines. Based in Lexington,
                Kentucky, working with clients everywhere.
              </p>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border">
                <Image
                  src="/tanner.jpg"
                  alt="Tanner Carlson"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-2xl bg-accent/10 border border-accent/20 -z-10" />
              <div className="absolute -top-4 -right-4 h-16 w-16 rounded-xl bg-purple-500/10 border border-purple-500/20 -z-10" />
            </div>
          </div>
        </Container>
      </section>

      {/* The Full Story */}
      <section className="bg-surface/30 py-24 md:py-32">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-tight text-text-primary">
              How I Got Here
            </h2>
            <div className="mt-4 h-1 w-16 bg-gradient-to-r from-accent to-purple-500" />

            <div className="mt-10 space-y-6 text-lg leading-relaxed text-text-secondary">
              <p>
                I started building websites in 2019 while working full-time in luxury retail.
                What began as a side project helping small businesses get online turned into
                something I could not stop thinking about. Every spare hour went into learning
                new frameworks, studying what makes websites actually convert, and taking on
                projects that pushed me to figure things out.
              </p>
              <p>
                For several years, I balanced development work with my role at Tiffany & Co.,
                where I worked as a setter crafting fine jewelry. That experience shaped how I
                approach digital work in ways I did not expect. In luxury jewelry, there is no
                "good enough." Every detail matters because the finished piece will be examined
                closely by people who know quality when they see it. A setting that is 95% right
                is not acceptable when someone is spending thousands of dollars on a piece they
                will wear for decades.
              </p>
              <p>
                I brought that same standard to development. The websites I build are not templates
                with logos swapped out. They are crafted for each client's specific situation, with
                attention paid to details most people never notice but everyone feels.
              </p>
              <p>
                When I made the decision to leave Tiffany and go full-time with development, it was
                because I saw a gap in the market that frustrated me. Small and mid-sized businesses
                were stuck choosing between expensive agencies that charged enterprise rates or cheap
                template solutions that limited their growth. The businesses that needed professional
                digital presence the most were the ones least able to afford it.
              </p>
              <p className="text-xl font-display text-accent">
                I started Clarity Digital Services to close that gap.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* What I Actually Do */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-tight text-text-primary">
              What I Actually Do
            </h2>
            <div className="mt-4 h-1 w-16 bg-gradient-to-r from-accent to-purple-500" />

            <div className="mt-10 space-y-6 text-lg leading-relaxed text-text-secondary">
              <p>
                I help businesses build their digital infrastructure. Sometimes that means a marketing
                website that converts visitors into customers. Sometimes it means a web application with
                user accounts, dashboards, and complex business logic. Sometimes it means a full SaaS
                product from idea to launch.
              </p>
              <p>
                The common thread is building things that work. Not things that just look good in a
                portfolio screenshot, but things that actually perform for the businesses using them.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {workSpans.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/50"
                >
                  <h3 className="text-lg font-semibold text-text-primary">{item.title}</h3>
                  <p className="mt-2 text-text-secondary">{item.description}</p>
                </div>
              ))}
            </div>

            <p className="mt-10 text-lg leading-relaxed text-text-secondary">
              I have built for real estate investors, automotive shops, wellness businesses, luxury goods
              retailers, cigar companies, and gemstone marketplaces. Not because I specialize in those
              industries, but because I know how to research a market, understand what customers in that
              space need, and build accordingly.
            </p>
            <p className="mt-4 text-xl font-display text-accent">
              Your industry might be new to me, but it will not be by the time we launch.
            </p>
          </div>
        </Container>
      </section>

      {/* Why I Work Differently */}
      <section className="bg-surface/30 py-24 md:py-32">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-tight text-text-primary">
              Why I Work Differently
            </h2>
            <div className="mt-4 h-1 w-16 bg-gradient-to-r from-accent to-purple-500" />

            <div className="mt-10 space-y-12">
              {/* Enterprise Quality */}
              <div>
                <h3 className="text-xl font-semibold text-text-primary">
                  Enterprise Quality, Accessible Pricing
                </h3>
                <div className="mt-4 space-y-4 text-lg leading-relaxed text-text-secondary">
                  <p>
                    The tools and technologies I use are the same ones powering applications at Netflix,
                    Stripe, and Vercel. Next.js, React, TypeScript, PostgreSQL, modern deployment
                    infrastructure. This is not a compromise or a budget option. It is genuinely the
                    best way to build for the web right now.
                  </p>
                  <p>
                    What makes my pricing accessible is not cutting corners on technology. It is efficiency.
                    I have spent years refining my process, building reusable systems, and learning what
                    actually matters versus what is just busywork.
                  </p>
                </div>
              </div>

              {/* Faster Delivery */}
              <div>
                <h3 className="text-xl font-semibold text-text-primary">
                  Faster Delivery Through Better Tools
                </h3>
                <div className="mt-4 space-y-4 text-lg leading-relaxed text-text-secondary">
                  <p>
                    I leverage state-of-the-art AI and agentic development tools throughout my workflow.
                    This is not about replacing craftsmanship with automation. It is about eliminating
                    the tedious parts of development so more time goes into the work that actually
                    requires human judgment.
                  </p>
                  <p>
                    Tasks that used to take days now take hours. Boilerplate code that used to be written
                    line by line gets generated and refined. Research that used to require endless browser
                    tabs happens in focused sessions. The result is faster delivery without sacrificing quality.
                  </p>
                  <p className="text-text-primary font-medium">
                    When I quote a timeline, I hit it. When I say something will be done, it gets done.
                  </p>
                </div>
              </div>

              {/* Research First */}
              <div>
                <h3 className="text-xl font-semibold text-text-primary">
                  Research First, Always
                </h3>
                <div className="mt-4 space-y-4 text-lg leading-relaxed text-text-secondary">
                  <p>
                    Every project starts with understanding. Who are your customers? What do your competitors
                    do well? What do they get wrong? What does success look like for your specific situation?
                  </p>
                  <p>
                    This is not a checkbox exercise. It is how I make sure what I build actually serves
                    your business instead of just looking like it should.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Tech Stack */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-tight text-text-primary">
              The Technical Side
            </h2>
            <div className="mt-4 h-1 w-16 bg-gradient-to-r from-accent to-purple-500" />

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">Frontend</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {techStack.frontend.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-text-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">Backend</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {techStack.backend.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-text-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">Infrastructure</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {techStack.infrastructure.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-text-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">AI & Automation</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {techStack.ai.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-text-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-10 text-text-tertiary">
              I pick tools based on what the project needs, not what is trendy. Everything I use has
              been battle-tested across multiple client projects and my own products.
            </p>
          </div>
        </Container>
      </section>

      {/* Beyond the Work */}
      <section className="bg-surface/30 py-24 md:py-32">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-tight text-text-primary">
              Beyond the Work
            </h2>
            <div className="mt-4 h-1 w-16 bg-gradient-to-r from-accent to-purple-500" />

            <div className="mt-10 space-y-6 text-lg leading-relaxed text-text-secondary">
              <p>
                I am based in Lexington, Kentucky. When I am not building software, I am probably
                working on my RS7, exploring what AI can do that it could not do last month, or
                helping my partner Hailey with her photography business.
              </p>
              <p>
                I run multiple businesses alongside Clarity Digital, including FlipOps and an
                automation service for real estate investors. Building my own products keeps me
                sharp and gives me perspective that pure client work would not. I understand what
                it means to depend on software because I depend on software I built.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* What Working Together Looks Like */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-tight text-text-primary">
              What Working Together Looks Like
            </h2>
            <div className="mt-4 h-1 w-16 bg-gradient-to-r from-accent to-purple-500" />

            <div className="mt-10 space-y-6 text-lg leading-relaxed text-text-secondary">
              <p>
                I take on a limited number of projects at a time because I would rather do fewer
                things well than many things poorly. If we work together, you get my actual attention,
                not a handoff to junior developers or offshore teams.
              </p>
              <p>
                Communication is direct. I will tell you what I think, flag problems early, and
                explain decisions in terms that make sense whether you are technical or not. No
                jargon for the sake of jargon.
              </p>
              <p className="text-text-primary font-medium">
                Timelines are realistic and honored. Budgets are respected. Deliverables are what
                we agreed they would be.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Quick Facts */}
      <section className="bg-surface/30 py-24 md:py-32">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-tight text-text-primary">
              Quick Facts
            </h2>
            <div className="mt-4 h-1 w-16 bg-gradient-to-r from-accent to-purple-500" />

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {quickFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-xl border border-border bg-surface p-5"
                >
                  <p className="text-sm font-medium text-text-tertiary">{fact.label}</p>
                  <p className="mt-1 text-lg font-semibold text-text-primary">{fact.value}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <MegaCta
        headline="If that sounds like what you're looking for"
        subheadline="Let's talk about your project."
      />
    </>
  )
}
