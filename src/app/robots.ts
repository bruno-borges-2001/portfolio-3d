import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/studio/']
    },
    sitemap: process.env.NEXT_PUBLIC_METABASE + '/sitemap.xml'
  }
}