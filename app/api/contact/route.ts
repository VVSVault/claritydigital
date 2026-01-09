import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import {
  contactSchema,
  getLabelFromValue,
  roleOptions,
  industryOptions,
  projectTypeOptions,
  existingWebsiteOptions,
  projectDriverOptions,
  timelineOptions,
  budgetOptions,
  referralSourceOptions,
} from '@/lib/validations/contact'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = contactSchema.parse(body)

    const resend = new Resend(process.env.RESEND_API_KEY)

    // Get display labels for all fields
    const roleLabel = getLabelFromValue(roleOptions, validated.role)
    const industryLabel = getLabelFromValue(industryOptions, validated.industry)
    const projectTypeLabel = getLabelFromValue(projectTypeOptions, validated.projectType)
    const existingWebsiteLabel = getLabelFromValue(existingWebsiteOptions, validated.hasExistingWebsite)
    const timelineLabel = getLabelFromValue(timelineOptions, validated.timeline)
    const budgetLabel = getLabelFromValue(budgetOptions, validated.budget)
    const referralLabel = validated.referralSource
      ? getLabelFromValue(referralSourceOptions, validated.referralSource)
      : 'Not specified'

    // Get driver labels
    const driverLabels = validated.projectDrivers
      .map((driver) => getLabelFromValue(projectDriverOptions, driver))

    const firstName = validated.fullName.split(' ')[0]

    // Send notification email to Tanner
    const notificationResult = await resend.emails.send({
      from: 'Clarity Digital <noreply@claritydigital.dev>',
      to: process.env.CONTACT_EMAIL || 'tanner@claritydigital.dev',
      subject: `New Lead: ${validated.companyName} - ${projectTypeLabel}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <div style="background: #6366F1; padding: 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">New Project Inquiry</h1>
          </div>

          <div style="padding: 32px;">
            <!-- Contact Section -->
            <h2 style="color: #171717; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 2px solid #6366F1;">Contact</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
              <tr>
                <td style="padding: 8px 0; color: #737373; width: 140px;">Name</td>
                <td style="padding: 8px 0; color: #171717; font-weight: 500;">${validated.fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #737373;">Email</td>
                <td style="padding: 8px 0;"><a href="mailto:${validated.email}" style="color: #6366F1; text-decoration: none;">${validated.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #737373;">Phone</td>
                <td style="padding: 8px 0; color: #171717;">${validated.phone || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #737373;">Company</td>
                <td style="padding: 8px 0; color: #171717; font-weight: 500;">${validated.companyName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #737373;">Role</td>
                <td style="padding: 8px 0; color: #171717;">${roleLabel}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #737373;">Industry</td>
                <td style="padding: 8px 0; color: #171717;">${industryLabel}</td>
              </tr>
            </table>

            <!-- Project Details Section -->
            <h2 style="color: #171717; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 2px solid #6366F1;">Project Details</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 8px 0; color: #737373; width: 140px;">Type</td>
                <td style="padding: 8px 0; color: #171717; font-weight: 500;">${projectTypeLabel}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #737373;">Existing Website</td>
                <td style="padding: 8px 0; color: #171717;">${existingWebsiteLabel}</td>
              </tr>
              ${validated.currentWebsiteUrl ? `
              <tr>
                <td style="padding: 8px 0; color: #737373;">Current URL</td>
                <td style="padding: 8px 0;"><a href="${validated.currentWebsiteUrl}" style="color: #6366F1; text-decoration: none;">${validated.currentWebsiteUrl}</a></td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 8px 0; color: #737373;">Timeline</td>
                <td style="padding: 8px 0; color: #171717;">${timelineLabel}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #737373;">Budget</td>
                <td style="padding: 8px 0; color: #171717; font-weight: 500;">${budgetLabel}</td>
              </tr>
            </table>

            <!-- What's Driving This -->
            <div style="margin-bottom: 32px;">
              <h3 style="color: #171717; font-size: 14px; font-weight: 600; margin: 0 0 12px 0;">What's Driving This:</h3>
              <ul style="margin: 0; padding: 0 0 0 20px; color: #525252;">
                ${driverLabels.map(driver => `<li style="padding: 4px 0;">${driver}</li>`).join('')}
              </ul>
            </div>

            <!-- Project Description -->
            <h2 style="color: #171717; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 2px solid #6366F1;">Project Description</h2>
            <p style="color: #525252; line-height: 1.6; white-space: pre-wrap; margin: 0 0 32px 0;">${validated.projectDescription}</p>

            ${validated.additionalNotes ? `
            <!-- Additional Notes -->
            <h2 style="color: #171717; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 2px solid #6366F1;">Additional Notes</h2>
            <p style="color: #525252; line-height: 1.6; white-space: pre-wrap; margin: 0 0 32px 0;">${validated.additionalNotes}</p>
            ` : ''}

            <!-- Referral Source -->
            <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin-top: 24px;">
              <p style="margin: 0; color: #737373; font-size: 14px;">
                <strong>Referral Source:</strong> ${referralLabel}
              </p>
            </div>
          </div>

          <div style="background: #f5f5f5; padding: 16px; text-align: center;">
            <p style="margin: 0; color: #a3a3a3; font-size: 12px;">
              Submitted ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
            </p>
          </div>
        </div>
      `,
    })

    console.log('Notification email result:', notificationResult)

    if (notificationResult.error) {
      console.error('Failed to send notification email:', notificationResult.error)
      throw new Error(`Notification email failed: ${notificationResult.error.message}`)
    }

    // Send confirmation email to the lead
    const confirmationResult = await resend.emails.send({
      from: 'Tanner at Clarity Digital <tanner@claritydigital.dev>',
      to: validated.email,
      subject: "Got it! I'll be in touch soon.",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <div style="padding: 32px;">
            <p style="color: #171717; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
              Hi ${firstName},
            </p>

            <p style="color: #525252; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
              Thanks for reaching out about your ${projectTypeLabel.toLowerCase()} project. I've received your inquiry and will review everything you shared.
            </p>

            <p style="color: #171717; font-size: 16px; font-weight: 600; margin: 0 0 16px 0;">
              Here's what happens next:
            </p>

            <ol style="color: #525252; font-size: 16px; line-height: 1.8; margin: 0 0 24px 0; padding: 0 0 0 20px;">
              <li>I'll review your project details (usually within a few hours)</li>
              <li>I'll do some initial research on your industry and current site</li>
              <li>You'll hear back from me within 24 hours with thoughts and suggested next steps</li>
            </ol>

            <p style="color: #525252; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0;">
              If your project is time-sensitive or you'd prefer to jump on a quick call first, you can book time directly here:
            </p>

            <div style="text-align: center; margin: 0 0 32px 0;">
              <a href="https://cal.com/claritydigital" style="display: inline-block; background: #6366F1; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 500;">
                Schedule a Call
              </a>
            </div>

            <p style="color: #525252; font-size: 16px; line-height: 1.6; margin: 0 0 8px 0;">
              Talk soon,
            </p>

            <p style="color: #171717; font-size: 16px; font-weight: 600; margin: 0 0 4px 0;">
              Tanner Carlson
            </p>
            <p style="color: #737373; font-size: 14px; margin: 0 0 4px 0;">
              Clarity Digital Services
            </p>
            <p style="margin: 0;">
              <a href="mailto:tanner@claritydigital.dev" style="color: #6366F1; text-decoration: none; font-size: 14px;">tanner@claritydigital.dev</a>
            </p>
          </div>

          <div style="background: #f5f5f5; padding: 16px; text-align: center;">
            <p style="margin: 0; color: #a3a3a3; font-size: 12px;">
              You're receiving this because you submitted an inquiry at claritydigital.dev
            </p>
          </div>
        </div>
      `,
    })

    console.log('Confirmation email result:', confirmationResult)

    if (confirmationResult.error) {
      console.error('Failed to send confirmation email:', confirmationResult.error)
      // Don't throw - notification was sent, just log the error
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
