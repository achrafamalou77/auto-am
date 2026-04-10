export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'], // Protect admin panel and api routes
    },
    sitemap: 'https://www.sarl2sauto.dz/sitemap.xml',
  }
}
