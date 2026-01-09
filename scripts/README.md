# Scripts

Automation scripts for Clarity Digital portfolio management.

## Upload Projects

Bulk upload portfolio projects to Sanity CMS.

### Usage

```bash
npm run upload-projects
```

### What it does

1. Reads project data from `seed-projects.json`
2. Uploads all images to Sanity CDN
3. Creates project documents with metadata
4. Links images to gallery and featured image fields

### Project Data Structure

Edit `seed-projects.json` to add/modify projects:

```json
{
  "title": "Project Name",
  "slug": "project-slug",
  "excerpt": "Short description (max 160 chars)",
  "client": "Client Name",
  "serviceType": "Web Design | Web Development | SaaS Platform | E-Commerce | SEO",
  "industry": "Industry Name",
  "featured": true,
  "order": 1,
  "images": {
    "landing": "filename-lp.png",
    "dashboard": "filename-dashboard.png"
  },
  "challenge": "What problem needed solving",
  "approach": "How you approached it",
  "techStack": ["nextjs", "typescript", "tailwind"],
  "completedAt": "2025-12-01"
}
```

### Image Requirements

Place images in `public/projects/` before running the script:

- **Format:** PNG preferred
- **Naming:** Use descriptive kebab-case names
- **Size:** Optimize images (recommended < 500KB each)

### Environment Variables Required

Ensure `.env.local` contains:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-write-token
```

### Post-Upload Steps

1. Visit Sanity Studio at `/studio`
2. Review all uploaded projects
3. Click "Publish" on each project
4. Add additional details:
   - Results/metrics
   - Client testimonials
   - Project URLs
   - Expanded solution descriptions

### Troubleshooting

**"Configuration must contain projectId"**
- Make sure `.env.local` exists with Sanity credentials
- Restart the script

**"File not found"**
- Verify images exist in `public/projects/`
- Check filenames in `seed-projects.json` match exactly

**Upload succeeds but images don't show**
- Images uploaded to Sanity CDN
- Check Sanity Studio to confirm asset upload
- May need to publish projects in Studio

### Current Portfolio

7 projects uploaded:
- Bluegrass Precision Motorwerks (Web Design | Automotive)
- FlipOps (SaaS Platform | Real Estate)
- Sold By You (Web Development | Real Estate)
- Infinet (SaaS Platform | AI Technology)
- Lim & Carlson (E-Commerce | Luxury Retail)
- Kentucky Gentlemen Cigars (E-Commerce | Tobacco Retail)
- CAID (SaaS Platform | AI Technology)

---

## Update Project Descriptions

Update existing projects in Sanity with improved content without re-uploading images.

### Usage

```bash
npm run update-descriptions
```

### What it does

1. Reads updated content from `seed-projects.json`
2. Finds existing projects in Sanity by slug
3. Updates text fields (excerpt, challenge, approach, industry, serviceType, techStack)
4. Preserves all images and other metadata
5. No re-upload of assets required

### When to use this

- After refining project descriptions
- When correcting industry classifications
- When adding missing tech stack items
- After gathering more detailed project information
- When improving excerpt/taglines

### What gets updated

- `excerpt` - Project tagline
- `challenge` - Problem statement
- `approach` - Solution description
- `industry` - Industry classification
- `serviceType` - Service type category
- `techStack` - Technologies used

### What stays the same

- Images (featured image and gallery)
- Project URLs
- Completion dates
- Featured status
- Display order
- Client testimonials

### Post-Update Steps

1. Visit Sanity Studio at `/studio`
2. Review updated content
3. Re-publish projects if needed
4. Check live site for improved descriptions

### Recent Updates

**January 2026:** Updated all 7 projects with:
- Professional taglines
- Detailed challenge/approach descriptions
- Corrected industry classifications (Infinet → AI Technology, Lim & Carlson → Luxury Retail, etc.)
- Complete tech stack information
