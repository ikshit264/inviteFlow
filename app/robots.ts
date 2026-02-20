import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.BASE_URL || 'https://inviteflow.ai';

    return {
        rules: {
            userAgent: '*',
            allow: [
                '/',
                '/auth',
                '/privacy',
                '/info',
                '/use-cases',
                '/vs',
                '/features',
                '/industries',
                '/solutions'
            ],
            disallow: ['/dashboard', '/workspace', '/api', '/dashboard/event/'],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
