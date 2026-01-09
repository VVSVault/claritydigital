import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get('secret')

    // Validate the secret
    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
    }

    const body = await request.json()
    const { _type } = body

    // Revalidate based on document type
    switch (_type) {
      case 'project':
        revalidateTag('projects')
        break
      case 'service':
        revalidateTag('services')
        break
      case 'testimonial':
        revalidateTag('testimonials')
        break
      case 'industry':
        revalidateTag('industries')
        break
      case 'siteSettings':
        revalidateTag('settings')
        break
      default:
        // Revalidate all if type is unknown
        revalidateTag('projects')
        revalidateTag('services')
        revalidateTag('testimonials')
        revalidateTag('industries')
        revalidateTag('settings')
    }

    return NextResponse.json({
      revalidated: true,
      type: _type,
      now: Date.now(),
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { error: 'Failed to revalidate' },
      { status: 500 }
    )
  }
}
