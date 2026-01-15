export const mainNavigation = [
  {
    title: 'Work',
    href: '/work',
  },
  {
    title: 'Services',
    href: '/services',
    children: [
      { title: 'Web Design', href: '/services/web-design' },
      { title: 'Web Development', href: '/services/web-development' },
      { title: 'SaaS Creation', href: '/services/saas-creation' },
      { title: 'SEO Solutions', href: '/services/seo' },
    ],
  },
  {
    title: 'About',
    href: '/about',
  },
  {
    title: 'Contact',
    href: '/contact',
  },
]

export const footerNavigation = {
  navigation: [
    { title: 'Work', href: '/work' },
    { title: 'About', href: '/about' },
    { title: 'Contact', href: '/contact' },
  ],
  services: [
    { title: 'Web Design', href: '/services#web-design' },
    { title: 'Development', href: '/services#development' },
    { title: 'SaaS', href: '/services#saas' },
    { title: 'SEO', href: '/services#seo' },
  ],
  // Social links - uncomment and update with real profile URLs when available
  // Placeholder links (e.g., github.com without a username) are a negative SEO signal
  connect: [] as { title: string; href: string }[],
  // Example when ready:
  // connect: [
  //   { title: 'GitHub', href: 'https://github.com/claritydigital' },
  //   { title: 'LinkedIn', href: 'https://linkedin.com/company/claritydigital' },
  //   { title: 'Twitter', href: 'https://twitter.com/claritydigital' },
  // ],
}
