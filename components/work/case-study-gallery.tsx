'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Container } from '@/components/ui/container'
import { urlFor } from '@/lib/sanity/client'
import type { SanityImage } from '@/types'

interface CaseStudyGalleryProps {
  images: SanityImage[]
  title: string
}

export function CaseStudyGallery({ images, title }: CaseStudyGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<SanityImage | null>(null)

  if (!images || images.length === 0) return null

  return (
    <section className="py-16 md:py-24">
      <Container>
        <h2 className="font-display text-2xl font-bold tracking-tight text-text-primary md:text-3xl mb-8">
          Project Gallery
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {images.map((image, index) => (
            <button
              key={image.asset._ref || index}
              onClick={() => setSelectedImage(image)}
              className="group relative overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            >
              <Image
                src={urlFor(image).width(800).height(500).url()}
                alt={image.alt || `${title} screenshot ${index + 1}`}
                width={800}
                height={500}
                className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-sm text-white">{image.caption}</p>
                </div>
              )}
            </button>
          ))}
        </div>
      </Container>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            aria-label="Close gallery"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <Image
            src={urlFor(selectedImage).width(1600).height(1000).url()}
            alt={selectedImage.alt || title}
            width={1600}
            height={1000}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
