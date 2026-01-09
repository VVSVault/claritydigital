import { PortableText } from '@portabletext/react'

interface CaseStudyContentProps {
  title: string
  content: string | unknown[]
}

export function CaseStudyContent({ title, content }: CaseStudyContentProps) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-text-primary">
        {title}
      </h2>
      <div className="mt-4 text-text-secondary">
        {typeof content === 'string' ? (
          <p>{content}</p>
        ) : (
          <PortableText value={content as never} />
        )}
      </div>
    </div>
  )
}
