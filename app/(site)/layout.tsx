import { FloatingNav } from '@/components/layout/floating-nav'
import { Footer } from '@/components/layout/footer'
import { ScrollProgress } from '@/components/ui/scroll-progress'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ScrollProgress variant="line" position="top" />
      <FloatingNav />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  )
}
