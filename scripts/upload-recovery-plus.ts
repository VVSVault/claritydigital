/**
 * Upload Recovery Plus project to Sanity
 * Run with: npx tsx scripts/upload-recovery-plus.ts
 */

import { config } from 'dotenv'
import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { join } from 'path'

// Load environment variables from .env.local
config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
})

async function uploadImage(imagePath: string, filename: string) {
  console.log(`📤 Uploading ${filename}...`)

  const imageBuffer = readFileSync(imagePath)
  const asset = await client.assets.upload('image', imageBuffer, {
    filename,
  })

  console.log(`✅ Uploaded ${filename}`)
  return asset
}

async function uploadRecoveryPlus() {
  console.log('🚀 Starting Recovery Plus upload...\n')

  try {
    const projectsDir = join(process.cwd(), 'public', 'images', 'projects')

    // Upload landing page image
    const landingPath = join(projectsDir, 'recovery-plus-lp.png')
    const landingAsset = await uploadImage(landingPath, 'recovery-plus-lp.png')

    // Upload dashboard image
    const dashboardPath = join(projectsDir, 'recovery-plus-dashboard.png')
    const dashboardAsset = await uploadImage(dashboardPath, 'recovery-plus-dashboard.png')

    // Create gallery array
    const gallery = [
      {
        _type: 'image',
        _key: 'landing',
        asset: {
          _type: 'reference',
          _ref: landingAsset._id,
        },
        alt: 'Recovery Plus landing page',
        caption: 'Landing page',
      },
      {
        _type: 'image',
        _key: 'dashboard',
        asset: {
          _type: 'reference',
          _ref: dashboardAsset._id,
        },
        alt: 'Recovery Plus dashboard',
        caption: 'Dashboard',
      },
    ]

    // Create project document
    const project = {
      _type: 'project',
      title: 'Recovery Plus',
      slug: {
        _type: 'slug',
        current: 'recovery-plus',
      },
      excerpt: 'Science-based recovery with data-driven personalization',
      client: 'Recovery Plus',
      serviceType: 'SaaS Platform',
      industry: 'Wellness',
      featuredImage: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: landingAsset._id,
        },
        alt: 'Recovery Plus featured image',
      },
      gallery,
      challenge: 'Recovery Plus had an existing website built on a templated platform that created friction at every step. Navigation was confusing, booking a session required too many clicks, and there was no system in place to track client progress over time. Coaches had no centralized way to view client histories, monitor improvements, or make informed recommendations about which modalities or session types would benefit each individual. For a business built around personalized recovery guidance, the digital experience was completely disconnected from the service experience.',
      approach: 'I delivered a complete platform redesign that transformed Recovery Plus from a templated site into a comprehensive client management and engagement system. The public-facing website was rebuilt for conversion with streamlined booking. The real transformation happened behind the login—I built customized client dashboards where members can track recovery progress, view session history, and connect wearable devices. For coaches, I created a dedicated dashboard that fundamentally changes how they interact with their client base, with full client profiles, session history, health markers from wearables, and data-driven recommendations.',
      techStack: ['nextjs', 'typescript', 'tailwind', 'postgresql', 'supabase'],
      featured: true,
      order: 4,
      completedAt: '2025-11-01',
    }

    console.log('\n🏗️  Creating Recovery Plus project document...')
    const result = await client.create(project)
    console.log('✅ Created project: Recovery Plus')
    console.log(`📄 Project ID: ${result._id}`)

    console.log('\n✨ Recovery Plus uploaded successfully!')
    console.log('\n📝 Next steps:')
    console.log('1. Check your site at http://localhost:3002')
    console.log('2. Recovery Plus should appear in position 4 on the homepage')
    console.log('3. Update Infinet in Sanity Studio to set "Featured on Homepage" to No')
  } catch (error) {
    console.error('\n❌ Error uploading Recovery Plus:', error)
    process.exit(1)
  }
}

uploadRecoveryPlus()
