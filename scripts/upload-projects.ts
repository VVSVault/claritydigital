/**
 * Upload project images to Sanity and create project documents
 * Run with: npm run upload-projects
 */

import { config } from 'dotenv'
import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { join } from 'path'
import projectsData from './seed-projects.json'

// Load environment variables from .env.local
config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
})

interface ProjectData {
  title: string
  slug: string
  excerpt: string
  client: string
  serviceType: string
  industry: string
  featured: boolean
  order: number
  images: {
    landing: string
    dashboard: string | null
  }
  challenge?: string
  approach?: string
  techStack?: string[]
  completedAt?: string
}

async function uploadImage(imagePath: string, filename: string) {
  console.log(`📤 Uploading ${filename}...`)

  const imageBuffer = readFileSync(imagePath)
  const asset = await client.assets.upload('image', imageBuffer, {
    filename,
  })

  console.log(`✅ Uploaded ${filename}`)
  return asset
}

async function createProject(projectData: ProjectData) {
  console.log(`\n🏗️  Creating project: ${projectData.title}`)

  const projectsDir = join(process.cwd(), 'public', 'projects')

  // Upload landing page image
  const landingPath = join(projectsDir, projectData.images.landing)
  const landingAsset = await uploadImage(landingPath, projectData.images.landing)

  // Upload dashboard image if exists
  let dashboardAsset = null
  if (projectData.images.dashboard) {
    const dashboardPath = join(projectsDir, projectData.images.dashboard)
    dashboardAsset = await uploadImage(dashboardPath, projectData.images.dashboard)
  }

  // Create gallery array
  const gallery = [
    {
      _type: 'image',
      _key: 'landing',
      asset: {
        _type: 'reference',
        _ref: landingAsset._id,
      },
      alt: `${projectData.title} landing page`,
      caption: 'Landing page',
    },
  ]

  if (dashboardAsset) {
    gallery.push({
      _type: 'image',
      _key: 'dashboard',
      asset: {
        _type: 'reference',
        _ref: dashboardAsset._id,
      },
      alt: `${projectData.title} dashboard`,
      caption: 'Dashboard',
    })
  }

  // Create project document
  const project = {
    _type: 'project',
    title: projectData.title,
    slug: {
      _type: 'slug',
      current: projectData.slug,
    },
    excerpt: projectData.excerpt,
    client: projectData.client,
    serviceType: projectData.serviceType,
    industry: projectData.industry,
    featuredImage: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: landingAsset._id,
      },
      alt: `${projectData.title} featured image`,
    },
    gallery,
    challenge: projectData.challenge,
    approach: projectData.approach,
    techStack: projectData.techStack || [],
    featured: projectData.featured,
    order: projectData.order,
    completedAt: projectData.completedAt,
  }

  const result = await client.create(project)
  console.log(`✅ Created project: ${projectData.title}`)
  return result
}

async function main() {
  console.log('🚀 Starting project upload...\n')
  console.log(`📁 Found ${projectsData.length} projects to upload\n`)

  try {
    for (const projectData of projectsData as ProjectData[]) {
      await createProject(projectData)
    }

    console.log('\n✨ All projects uploaded successfully!')
    console.log('\n📝 Next steps:')
    console.log('1. Visit your Sanity Studio to review projects')
    console.log('2. Add additional details, results, testimonials')
    console.log('3. Publish the projects to make them live')
  } catch (error) {
    console.error('\n❌ Error uploading projects:', error)
    process.exit(1)
  }
}

main()
