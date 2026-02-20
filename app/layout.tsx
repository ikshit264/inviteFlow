import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";
import UpvoteWidgetWrapper from "@/components/UpvoteWidgetWrapper";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const baseUrl = process.env.BASE_URL || "https://inviteflow.ai";

export const metadata: Metadata = {
  title: {
    default: "InviteFlow.ai | AI-Powered Personalized Invitation Generator",
    template: "%s | InviteFlow.ai"
  },
  description: "End the drag-and-drop struggle. Generate thousands of personalized, code-first event invitations in seconds using context-aware AI. Perfect for weddings, corporate events, and tech launches.",
  keywords: ["AI invitations", "personalized event invites", "bulk invitation generator", "automated event design", "InviteFlow", "AI event planning"],
  authors: [{ name: "InviteFlow Team" }],
  creator: "InviteFlow.ai",
  publisher: "InviteFlow.ai",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "InviteFlow.ai | The End of Drag & Drop Invitations",
    description: "Intelligent design engine for bulk personalized invitations. Paste an email, get 1,000 unique invites.",
    url: baseUrl,
    siteName: "InviteFlow.ai",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "InviteFlow.ai | AI-Powered Personalized Invitations",
    description: "Generate 1,000 personalized invites in the time it takes to make one. Code-first design engine for modern hosts.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "InviteFlow.ai",
    "operatingSystem": "Web",
    "applicationCategory": "DesignApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "AI-powered engine for generating personalized event invitations from unstructured text data.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "10000"
    }
  };

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "InviteFlow.ai",
    "url": baseUrl,
    "logo": `${baseUrl}/favicon.ico`,
    "sameAs": [
      "https://twitter.com/inviteflowai",
      "https://linkedin.com/company/inviteflow"
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body
        className={`${outfit.variable} ${spaceGrotesk.variable} antialiased`}
      >
        {children}
        <UpvoteWidgetWrapper />
      </body>
    </html>
  );
}
