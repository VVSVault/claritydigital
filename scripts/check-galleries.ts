import { config } from 'dotenv'
import { createClient } from '@sanity/client'

config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
})

async function main() {
  const projects = await client.fetch(`
    *[_type == "project"] | order(order asc) {
      title,
      "hasGallery": defined(gallery) && count(gallery) > 0,
      "galleryCount": count(gallery)
    }
  `)

  console.log('\nProject Gallery Status:\n')
  projects.forEach((p: any) => {
    const status = p.hasGallery ? '✓' : '✗'
    console.log(`${status} ${p.title}: ${p.galleryCount || 0} images`)
  })
}

main()
