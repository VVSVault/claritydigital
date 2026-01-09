import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function updateProjects() {
  try {
    // 1. Find and update Bluegrass Precision challenge text
    const bluegrass = await client.fetch(
      `*[_type == "project" && slug.current == "bluegrass-precision-motorwerks"][0]`
    )

    if (bluegrass) {
      const newChallenge = "Despite offering world-class service with dealer-level diagnostic capabilities, Bluegrass Precision Motorwerks had a website that didn't reflect their premium positioning. The existing site lacked clear service information, had poor mobile responsiveness, and minimal SEO presence. For a business serving clients who own six-figure vehicles, the digital experience needed to match the caliber of service they provide in the shop."

      await client
        .patch(bluegrass._id)
        .set({ challenge: newChallenge })
        .commit()

      console.log('Updated Bluegrass Precision challenge text')
    } else {
      console.log('Bluegrass Precision project not found')
    }

    // 2. Find FlipOps and update order to 1
    const flipops = await client.fetch(
      `*[_type == "project" && slug.current == "flipops"][0]`
    )

    if (flipops) {
      await client
        .patch(flipops._id)
        .set({ order: 1 })
        .commit()

      console.log('Updated FlipOps order to 1')
    } else {
      console.log('FlipOps project not found')
    }

    // 3. Update Bluegrass order to 2
    if (bluegrass) {
      await client
        .patch(bluegrass._id)
        .set({ order: 2 })
        .commit()

      console.log('Updated Bluegrass Precision order to 2')
    }

    console.log('\nAll updates complete!')

  } catch (error) {
    console.error('Error updating projects:', error)
    process.exit(1)
  }
}

updateProjects()
