'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send, Loader2, CheckCircle, XCircle, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { MagneticButton } from '@/components/ui/magnetic-button'
import {
  contactSchema,
  type ContactFormData,
  roleOptions,
  industryOptions,
  projectTypeOptions,
  existingWebsiteOptions,
  projectDriverOptions,
  timelineOptions,
  budgetOptions,
  referralSourceOptions,
  getLabelFromValue,
} from '@/lib/validations/contact'

interface SuccessData {
  firstName: string
  projectType: string
}

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [successData, setSuccessData] = useState<SuccessData | null>(null)
  const [formStartTime] = useState(() => Date.now())

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors, isSubmitted },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      projectDrivers: [],
    },
    shouldFocusError: true,
  })

  const hasErrors = Object.keys(errors).length > 0

  const hasExistingWebsite = watch('hasExistingWebsite')

  const onSubmit = async (data: ContactFormData) => {
    // Time-based spam check (reject if submitted in under 3 seconds)
    if (Date.now() - formStartTime < 3000) {
      setSubmitStatus('error')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Failed to send message')

      const firstName = data.fullName.split(' ')[0]
      const projectTypeLabel = getLabelFromValue(projectTypeOptions, data.projectType)

      setSuccessData({ firstName, projectType: projectTypeLabel })
      setSubmitStatus('success')
      reset()
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClasses = cn(
    'w-full rounded-xl border px-4 py-3',
    'bg-surface text-text-primary placeholder-text-tertiary',
    'transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-accent/50'
  )

  const labelClasses = 'mb-2 block text-sm font-medium text-text-primary'
  const errorClasses = 'mt-1 text-sm text-error'
  const sectionTitleClasses = 'mb-6 text-sm font-semibold uppercase tracking-wider text-accent'

  // Success state
  if (submitStatus === 'success' && successData) {
    return (
      <div className="rounded-2xl border border-success/30 bg-success/5 p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
          <CheckCircle className="h-8 w-8 text-success" />
        </div>
        <h3 className="text-2xl font-bold text-text-primary">Message Sent Successfully</h3>
        <p className="mt-3 text-text-secondary">
          Thanks, {successData.firstName}! I've received your inquiry about your {successData.projectType} project.
        </p>

        <div className="mt-8 text-left">
          <p className="mb-4 font-medium text-text-primary">What happens next:</p>
          <ul className="space-y-3 text-text-secondary">
            <li className="flex items-start gap-3">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              I'll review your project details
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              Research your industry and current site
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              Get back to you within 24 hours
            </li>
          </ul>
        </div>

        <p className="mt-8 text-sm text-text-tertiary">
          Check your inbox for a confirmation email.
        </p>

        <div className="mt-8 border-t border-border pt-8">
          <p className="mb-4 text-text-secondary">Want to get started faster?</p>
          <MagneticButton
            variant="outline"
            size="lg"
            onClick={() => window.open('https://cal.com/claritydigital', '_blank')}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Book a Call Now
          </MagneticButton>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      {/* Validation Error Summary */}
      {isSubmitted && hasErrors && (
        <div className="rounded-xl border border-error/30 bg-error/10 p-4">
          <div className="flex items-start gap-3">
            <XCircle className="h-5 w-5 shrink-0 text-error mt-0.5" />
            <div>
              <p className="font-medium text-error">Please fix the following errors:</p>
              <ul className="mt-2 space-y-1 text-sm text-error/80">
                {errors.fullName && <li>Full Name: {errors.fullName.message}</li>}
                {errors.email && <li>Email: {errors.email.message}</li>}
                {errors.companyName && <li>Company Name: {errors.companyName.message}</li>}
                {errors.role && <li>Role: {errors.role.message}</li>}
                {errors.industry && <li>Industry: {errors.industry.message}</li>}
                {errors.projectType && <li>Project Type: {errors.projectType.message}</li>}
                {errors.hasExistingWebsite && <li>Existing Website: {errors.hasExistingWebsite.message}</li>}
                {errors.projectDrivers && <li>Project Drivers: {errors.projectDrivers.message}</li>}
                {errors.timeline && <li>Timeline: {errors.timeline.message}</li>}
                {errors.budget && <li>Budget: {errors.budget.message}</li>}
                {errors.projectDescription && <li>Project Description: {errors.projectDescription.message}</li>}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Honeypot field - hidden from users */}
      <input
        type="text"
        {...register('honeypot')}
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Section 1: About You */}
      <div>
        <h3 className={sectionTitleClasses}>About You</h3>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className={labelClasses}>
              Full Name *
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="John Smith"
              className={cn(
                inputClasses,
                errors.fullName ? 'border-error' : 'border-border hover:border-border-hover focus:border-accent'
              )}
              {...register('fullName')}
            />
            {errors.fullName && (
              <p className={errorClasses}>{errors.fullName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className={labelClasses}>
              Email *
            </label>
            <input
              id="email"
              type="email"
              placeholder="john@company.com"
              className={cn(
                inputClasses,
                errors.email ? 'border-error' : 'border-border hover:border-border-hover focus:border-accent'
              )}
              {...register('email')}
            />
            {errors.email && (
              <p className={errorClasses}>{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className={labelClasses}>
              Phone <span className="text-text-tertiary">(optional)</span>
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="(555) 123-4567"
              className={cn(
                inputClasses,
                'border-border hover:border-border-hover focus:border-accent'
              )}
              {...register('phone')}
            />
          </div>

          {/* Company Name */}
          <div>
            <label htmlFor="companyName" className={labelClasses}>
              Company / Business Name *
            </label>
            <input
              id="companyName"
              type="text"
              placeholder="Acme Corp"
              className={cn(
                inputClasses,
                errors.companyName ? 'border-error' : 'border-border hover:border-border-hover focus:border-accent'
              )}
              {...register('companyName')}
            />
            {errors.companyName && (
              <p className={errorClasses}>{errors.companyName.message}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label htmlFor="role" className={labelClasses}>
              Your Role *
            </label>
            <select
              id="role"
              className={cn(
                inputClasses,
                'cursor-pointer appearance-none',
                errors.role ? 'border-error' : 'border-border hover:border-border-hover focus:border-accent'
              )}
              {...register('role')}
            >
              <option value="">Select your role</option>
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.role && (
              <p className={errorClasses}>{errors.role.message}</p>
            )}
          </div>

          {/* Industry */}
          <div>
            <label htmlFor="industry" className={labelClasses}>
              Industry *
            </label>
            <select
              id="industry"
              className={cn(
                inputClasses,
                'cursor-pointer appearance-none',
                errors.industry ? 'border-error' : 'border-border hover:border-border-hover focus:border-accent'
              )}
              {...register('industry')}
            >
              <option value="">Select your industry</option>
              {industryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.industry && (
              <p className={errorClasses}>{errors.industry.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Section 2: About Your Project */}
      <div>
        <h3 className={sectionTitleClasses}>About Your Project</h3>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Project Type */}
          <div>
            <label htmlFor="projectType" className={labelClasses}>
              Project Type *
            </label>
            <select
              id="projectType"
              className={cn(
                inputClasses,
                'cursor-pointer appearance-none',
                errors.projectType ? 'border-error' : 'border-border hover:border-border-hover focus:border-accent'
              )}
              {...register('projectType')}
            >
              <option value="">Select project type</option>
              {projectTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.projectType && (
              <p className={errorClasses}>{errors.projectType.message}</p>
            )}
          </div>

          {/* Existing Website */}
          <div>
            <label htmlFor="hasExistingWebsite" className={labelClasses}>
              Do you have an existing website? *
            </label>
            <select
              id="hasExistingWebsite"
              className={cn(
                inputClasses,
                'cursor-pointer appearance-none',
                errors.hasExistingWebsite ? 'border-error' : 'border-border hover:border-border-hover focus:border-accent'
              )}
              {...register('hasExistingWebsite')}
            >
              <option value="">Select an option</option>
              {existingWebsiteOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.hasExistingWebsite && (
              <p className={errorClasses}>{errors.hasExistingWebsite.message}</p>
            )}
          </div>
        </div>

        {/* Current Website URL - conditional */}
        {hasExistingWebsite === 'yes' && (
          <div className="mt-6">
            <label htmlFor="currentWebsiteUrl" className={labelClasses}>
              Current Website URL
            </label>
            <input
              id="currentWebsiteUrl"
              type="url"
              placeholder="https://yoursite.com"
              className={cn(
                inputClasses,
                errors.currentWebsiteUrl ? 'border-error' : 'border-border hover:border-border-hover focus:border-accent'
              )}
              {...register('currentWebsiteUrl')}
            />
            {errors.currentWebsiteUrl && (
              <p className={errorClasses}>{errors.currentWebsiteUrl.message}</p>
            )}
          </div>
        )}

        {/* Project Drivers - Multi-select */}
        <div className="mt-6">
          <label className={labelClasses}>
            What's driving this project? * <span className="text-text-tertiary">(Select all that apply)</span>
          </label>
          <Controller
            name="projectDrivers"
            control={control}
            render={({ field }) => (
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {projectDriverOptions.map((option) => {
                  const isSelected = field.value?.includes(option.value)
                  return (
                    <label
                      key={option.value}
                      className={cn(
                        'flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-200',
                        isSelected
                          ? 'border-accent bg-accent/10 text-text-primary'
                          : 'border-border bg-surface text-text-secondary hover:border-border-hover'
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => {
                          const newValue = e.target.checked
                            ? [...(field.value || []), option.value]
                            : (field.value || []).filter((v) => v !== option.value)
                          field.onChange(newValue)
                        }}
                        className="sr-only"
                      />
                      <span
                        className={cn(
                          'flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors',
                          isSelected
                            ? 'border-accent bg-accent text-white'
                            : 'border-border bg-surface'
                        )}
                      >
                        {isSelected && (
                          <CheckCircle className="h-3.5 w-3.5" />
                        )}
                      </span>
                      <span className="text-sm">{option.label}</span>
                    </label>
                  )
                })}
              </div>
            )}
          />
          {errors.projectDrivers && (
            <p className={errorClasses}>{errors.projectDrivers.message}</p>
          )}
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {/* Timeline */}
          <div>
            <label htmlFor="timeline" className={labelClasses}>
              Timeline *
            </label>
            <select
              id="timeline"
              className={cn(
                inputClasses,
                'cursor-pointer appearance-none',
                errors.timeline ? 'border-error' : 'border-border hover:border-border-hover focus:border-accent'
              )}
              {...register('timeline')}
            >
              <option value="">Select a timeline</option>
              {timelineOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.timeline && (
              <p className={errorClasses}>{errors.timeline.message}</p>
            )}
          </div>

          {/* Budget */}
          <div>
            <label htmlFor="budget" className={labelClasses}>
              Budget Range *
            </label>
            <select
              id="budget"
              className={cn(
                inputClasses,
                'cursor-pointer appearance-none',
                errors.budget ? 'border-error' : 'border-border hover:border-border-hover focus:border-accent'
              )}
              {...register('budget')}
            >
              <option value="">Select a budget range</option>
              {budgetOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.budget && (
              <p className={errorClasses}>{errors.budget.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Section 3: Tell Me More */}
      <div>
        <h3 className={sectionTitleClasses}>Tell Me More</h3>

        {/* Project Description */}
        <div>
          <label htmlFor="projectDescription" className={labelClasses}>
            Tell me about your project *
          </label>
          <textarea
            id="projectDescription"
            rows={5}
            placeholder="What are you looking to build? What problems are you trying to solve? The more context you share, the more prepared I'll be for our conversation."
            className={cn(
              inputClasses,
              'resize-none',
              errors.projectDescription ? 'border-error' : 'border-border hover:border-border-hover focus:border-accent'
            )}
            {...register('projectDescription')}
          />
          {errors.projectDescription && (
            <p className={errorClasses}>{errors.projectDescription.message}</p>
          )}
        </div>

        {/* Additional Notes */}
        <div className="mt-6">
          <label htmlFor="additionalNotes" className={labelClasses}>
            Anything else I should know? <span className="text-text-tertiary">(optional)</span>
          </label>
          <textarea
            id="additionalNotes"
            rows={3}
            placeholder="Goals, concerns, examples of sites you like..."
            className={cn(
              inputClasses,
              'resize-none',
              'border-border hover:border-border-hover focus:border-accent'
            )}
            {...register('additionalNotes')}
          />
        </div>

        {/* Referral Source */}
        <div className="mt-6">
          <label htmlFor="referralSource" className={labelClasses}>
            How did you hear about me? <span className="text-text-tertiary">(optional)</span>
          </label>
          <select
            id="referralSource"
            className={cn(
              inputClasses,
              'cursor-pointer appearance-none',
              'border-border hover:border-border-hover focus:border-accent'
            )}
            {...register('referralSource')}
          >
            <option value="">Select an option</option>
            {referralSourceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Error Message */}
      {submitStatus === 'error' && (
        <div className="flex items-center gap-3 rounded-xl border border-error/30 bg-error/10 p-4 text-error">
          <XCircle className="h-5 w-5 shrink-0" />
          <span>Something went wrong. Please try again or email directly.</span>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <MagneticButton
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Submit Request
              <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </MagneticButton>

        <p className="text-sm text-text-tertiary">
          By submitting, you agree to receive a response via email.
        </p>
      </div>
    </form>
  )
}
