/**
 * Update Infinet project to not be featured on homepage
 * Run with: npx tsx scripts/update-infinet.ts
 */

import { config } from 'dotenv'
import { createClient } from '@sanity/client'

// Load environment variables from .env.local
config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
})

async function updateInfinet() {
  console.log('🔍 Finding Infinet project...\n')

  try {
    // Find Infinet project
    const query = '*[_type == "project" && slug.current == "infinet"][0]'
    const infinet = await client.fetch(query)

    if (!infinet) {
      console.log('⚠️  Infinet project not found in Sanity')
      console.log('   This is okay - it means it was never uploaded or already deleted')
      return
    }

    console.log(`✅ Found Infinet project (ID: ${infinet._id})`)
    console.log(`   Current featured status: ${infinet.featured}`)

    // Update to not be featured
    console.log('\n📝 Updating featured status to false...')
    await client
      .patch(infinet._id)
      .set({ featured: false, order: 8 })
      .commit()

    console.log('✅ Updated Infinet project')
    console.log('   Featured: false')
    console.log('   Order: 8')
    console.log('\n✨ Infinet will now only appear in the work section, not on homepage!')
  } catch (error) {
    console.error('\n❌ Error updating Infinet:', error)
    process.exit(1)
  }
}

updateInfinet()
