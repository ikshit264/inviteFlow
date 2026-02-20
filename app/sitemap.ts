import { MetadataRoute } from 'next';
import useCases from '@/lib/seo-data/use-cases.json';
import competitors from '@/lib/seo-data/competitors.json';
import features from '@/lib/seo-data/features.json';
import industryData from '@/lib/seo-data/industries.json';
import solutionData from '@/lib/seo-data/solutions.json';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.BASE_URL || 'https://inviteflow.ai';

    const useCaseRoutes = useCases.map((uc) => ({
        url: `${baseUrl}/use-cases/${uc.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    const comparisonRoutes = competitors.map((comp) => ({
        url: `${baseUrl}/vs/${comp.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    const featureRoutes = features.map((f) => ({
        url: `${baseUrl}/features/${f.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    const industryRoutes = industryData.map((ind) => ({
        url: `${baseUrl}/industries/${ind.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    const solutionRoutes = solutionData.map((sol) => ({
        url: `${baseUrl}/solutions/${sol.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.75,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${baseUrl}/auth`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/info`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/use-cases`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/solutions`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/industries`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/vs`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        ...useCaseRoutes,
        ...comparisonRoutes,
        ...featureRoutes,
        ...industryRoutes,
        ...solutionRoutes,
    ];
}
