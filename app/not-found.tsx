import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <Container size="sm" className="text-center">
        <h1 className="text-display-lg font-bold text-neutral-900 dark:text-white">
          404
        </h1>
        <p className="mt-4 text-xl text-neutral-600 dark:text-neutral-400">
          Page not found
        </p>
        <p className="mt-2 text-neutral-500">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8">
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </Container>
    </main>
  )
}
