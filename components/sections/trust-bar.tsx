import { Container } from '@/components/ui/container'

export function TrustBar() {
  return (
    <section className="border-y border-border-subtle bg-surface/30 py-8">
      <Container>
        <div className="flex flex-col items-center justify-center gap-6 text-center md:flex-row md:gap-12">
          <p className="text-sm font-medium text-text-secondary">
            Trusted by businesses in
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-text-tertiary md:gap-8">
            <span>Real Estate</span>
            <span className="hidden md:inline">|</span>
            <span>Wellness</span>
            <span className="hidden md:inline">|</span>
            <span>Photography</span>
            <span className="hidden md:inline">|</span>
            <span>Luxury Retail</span>
          </div>
        </div>
      </Container>
    </section>
  )
}
