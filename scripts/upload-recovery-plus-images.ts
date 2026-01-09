/**
 * Upload Recovery Plus images to Sanity
 * Run with: npx tsx scripts/upload-recovery-plus-images.ts
 */

import { config } from 'dotenv'
import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { join } from 'path'

config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
})

async function uploadImage(imagePath: string, filename: string) {
  console.log(`Uploading ${filename}...`)
  const imageBuffer = readFileSync(imagePath)
  const asset = await client.assets.upload('image', imageBuffer, { filename })
  console.log(`Uploaded ${filename}`)
  return asset
}

async function main() {
  const projectsDir = join(process.cwd(), 'public', 'projects')

  // Find Recovery Plus project
  const project = await client.fetch(
    `*[_type == "project" && slug.current == "recovery-plus"][0]{ _id, title }`
  )

  if (!project) {
    console.error('Recovery Plus project not found in Sanity')
    process.exit(1)
  }

  console.log(`Found project: ${project.title} (${project._id})`)

  // Upload images
  const landingPath = join(projectsDir, 'recovery-plus-lp.png')
  const dashboardPath = join(projectsDir, 'recovery-plus-dashboard.png')

  const landingAsset = await uploadImage(landingPath, 'recovery-plus-lp.png')
  const dashboardAsset = await uploadImage(dashboardPath, 'recovery-plus-dashboard.png')

  // Update project with images
  const gallery = [
    {
      _type: 'image',
      _key: 'landing',
      asset: { _type: 'reference', _ref: landingAsset._id },
      alt: 'Recovery Plus landing page',
      caption: 'Landing page',
    },
    {
      _type: 'image',
      _key: 'dashboard',
      asset: { _type: 'reference', _ref: dashboardAsset._id },
      alt: 'Recovery Plus dashboard',
      caption: 'Dashboard',
    },
  ]

  await client
    .patch(project._id)
    .set({
      featuredImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: landingAsset._id },
        alt: 'Recovery Plus featured image',
      },
      gallery,
    })
    .commit()

  console.log('Recovery Plus images uploaded and project updated!')
}

main().catch(console.error)
