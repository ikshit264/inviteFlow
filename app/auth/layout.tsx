import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    const baseUrl = process.env.BASE_URL || 'https://inviteflow.ai';

    return {
        title: "Login & Signup | InviteFlow.ai",
        description: "Securely access your InviteFlow.ai dashboard. Start generating personalized AI invitations for your next event.",
        alternates: {
            canonical: `${baseUrl}/auth`,
        },
    };
}

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
