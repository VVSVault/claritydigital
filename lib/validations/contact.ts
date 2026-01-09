import { z } from 'zod'

// Role options
export const roleOptions = [
  { value: 'founder-owner', label: 'Founder / Owner' },
  { value: 'ceo-executive', label: 'CEO / Executive' },
  { value: 'marketing-director', label: 'Marketing Director / Manager' },
  { value: 'operations-manager', label: 'Operations Manager' },
  { value: 'project-manager', label: 'Project Manager' },
  { value: 'other', label: 'Other' },
]

// Industry options
export const industryOptions = [
  { value: 'real-estate', label: 'Real Estate / Property' },
  { value: 'professional-services', label: 'Professional Services (Legal, Accounting, Consulting)' },
  { value: 'healthcare', label: 'Healthcare / Medical' },
  { value: 'retail-ecommerce', label: 'Retail / E-Commerce' },
  { value: 'food-hospitality', label: 'Food & Beverage / Hospitality' },
  { value: 'automotive', label: 'Automotive' },
  { value: 'construction', label: 'Construction / Trades' },
  { value: 'fitness-wellness', label: 'Fitness / Wellness' },
  { value: 'technology', label: 'Technology / Software' },
  { value: 'finance-insurance', label: 'Finance / Insurance' },
  { value: 'education', label: 'Education' },
  { value: 'nonprofit', label: 'Nonprofit' },
  { value: 'creative-agency', label: 'Creative / Agency' },
  { value: 'other', label: 'Other' },
]

// Project type options
export const projectTypeOptions = [
  { value: 'new-website', label: 'New Website' },
  { value: 'website-redesign', label: 'Website Redesign' },
  { value: 'web-application', label: 'Web Application / Portal' },
  { value: 'saas-product', label: 'SaaS Product' },
  { value: 'ecommerce', label: 'E-Commerce Store' },
  { value: 'landing-page', label: 'Landing Page / Campaign Site' },
  { value: 'seo-marketing', label: 'SEO / Marketing Only' },
  { value: 'not-sure', label: 'Not Sure Yet' },
]

// Existing website options
export const existingWebsiteOptions = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'yes-starting-fresh', label: 'Yes, but starting fresh' },
]

// Project drivers (multi-select)
export const projectDriverOptions = [
  { value: 'outdated', label: 'Current site is outdated' },
  { value: 'not-generating-leads', label: 'Not generating leads or sales' },
  { value: 'difficult-to-manage', label: 'Difficult to update or manage' },
  { value: 'poor-mobile', label: 'Poor mobile experience' },
  { value: 'new-business', label: 'Launching a new business' },
  { value: 'new-product', label: 'Launching a new product or service' },
  { value: 'rebranding', label: 'Rebranding' },
  { value: 'competitor-better', label: 'Competitor has better site' },
  { value: 'need-functionality', label: 'Need specific functionality we do not have' },
  { value: 'seo-issues', label: 'SEO / search visibility issues' },
  { value: 'other', label: 'Other' },
]

// Timeline options
export const timelineOptions = [
  { value: 'asap', label: 'ASAP (within 2-4 weeks)' },
  { value: '1-2-months', label: '1-2 months' },
  { value: '3-6-months', label: '3-6 months' },
  { value: 'no-rush', label: 'No rush, just exploring' },
  { value: 'depends', label: 'Depends on the right fit' },
]

// Budget options
export const budgetOptions = [
  { value: 'under-3k', label: 'Under $3,000' },
  { value: '3k-7.5k', label: '$3,000 - $7,500' },
  { value: '7.5k-15k', label: '$7,500 - $15,000' },
  { value: '15k-30k', label: '$15,000 - $30,000' },
  { value: '30k-plus', label: '$30,000+' },
  { value: 'not-sure', label: 'Not sure yet' },
]

// Referral source options
export const referralSourceOptions = [
  { value: 'google', label: 'Google Search' },
  { value: 'referral', label: 'Referral from someone' },
  { value: 'social-media', label: 'Social Media' },
  { value: 'portfolio', label: 'Saw your work (portfolio)' },
  { value: 'other', label: 'Other' },
]

// Validation schema
export const contactSchema = z.object({
  // Section 1: About You
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  companyName: z.string().min(1, 'Company name is required'),
  role: z.string().min(1, 'Please select your role'),
  industry: z.string().min(1, 'Please select your industry'),

  // Section 2: About Your Project
  projectType: z.string().min(1, 'Please select a project type'),
  hasExistingWebsite: z.string().min(1, 'Please select an option'),
  currentWebsiteUrl: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  projectDrivers: z.array(z.string()).min(1, 'Please select at least one option'),
  timeline: z.string().min(1, 'Please select a timeline'),
  budget: z.string().min(1, 'Please select a budget range'),

  // Section 3: Additional Context
  projectDescription: z.string().min(50, 'Please provide at least 50 characters'),
  additionalNotes: z.string().optional(),
  referralSource: z.string().optional(),

  // Spam prevention
  honeypot: z.string().max(0, 'Bot detected').optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>

// Helper to get label from value
export function getLabelFromValue(
  options: { value: string; label: string }[],
  value: string
): string {
  return options.find((opt) => opt.value === value)?.label || value
}
