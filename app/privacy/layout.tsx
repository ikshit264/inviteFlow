import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    const baseUrl = process.env.BASE_URL || 'https://inviteflow.ai';

    return {
        title: "Privacy Policy | InviteFlow.ai",
        description: "Learn how InviteFlow.ai handles your data and protects your privacy while generating personalized invitations.",
        alternates: {
            canonical: `${baseUrl}/privacy`,
        },
        robots: {
            index: true,
            follow: true,
        }
    };
}

export default function PrivacyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
