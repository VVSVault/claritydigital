/**
 * Update existing projects in Sanity with improved descriptions
 * Run with: npm run update-descriptions
 */

import { config } from 'dotenv'
import { createClient } from '@sanity/client'
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
  challenge: string
  approach: string
  industry: string
  serviceType: string
  techStack?: string[]
}

async function updateProject(projectData: ProjectData) {
  console.log(`\n🔄 Updating project: ${projectData.title}`)

  try {
    // Find the project by slug
    const query = `*[_type == "project" && slug.current == $slug][0]`
    const params = { slug: projectData.slug }
    const existingProject = await client.fetch(query, params)

    if (!existingProject) {
      console.log(`⚠️  Project not found: ${projectData.title}`)
      return
    }

    // Update the project with new descriptions
    const result = await client
      .patch(existingProject._id)
      .set({
        excerpt: projectData.excerpt,
        challenge: projectData.challenge,
        approach: projectData.approach,
        industry: projectData.industry,
        serviceType: projectData.serviceType,
        techStack: projectData.techStack || [],
      })
      .commit()

    console.log(`✅ Updated: ${projectData.title}`)
    return result
  } catch (error) {
    console.error(`❌ Error updating ${projectData.title}:`, error)
  }
}

async function main() {
  console.log('🚀 Starting project description updates...\n')
  console.log(`📝 Found ${projectsData.length} projects to update\n`)

  try {
    for (const projectData of projectsData as ProjectData[]) {
      await updateProject(projectData)
    }

    console.log('\n✨ All projects updated successfully!')
    console.log('\n📝 Next steps:')
    console.log('1. Visit Sanity Studio to review updated descriptions')
    console.log('2. Re-publish projects if needed')
    console.log('3. Check the live site to see improved content')
  } catch (error) {
    console.error('\n❌ Error updating projects:', error)
    process.exit(1)
  }
}

main()
