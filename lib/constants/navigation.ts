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
  connect: [
    { title: 'GitHub', href: 'https://github.com' },
    { title: 'LinkedIn', href: 'https://linkedin.com' },
    { title: 'Twitter', href: 'https://twitter.com' },
  ],
}
