import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    const baseUrl = process.env.BASE_URL || 'https://inviteflow.ai';

    return {
        title: "About Us | Product Info | InviteFlow.ai",
        description: "Discover InviteFlow.ai - the future of event invitations. Learn about our mission and the technology behind our AI design engine.",
        alternates: {
            canonical: `${baseUrl}/info`,
        },
        robots: {
            index: true,
            follow: true,
        }
    };
}

export default function InfoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
