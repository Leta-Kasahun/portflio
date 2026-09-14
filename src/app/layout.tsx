import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://letakasahun.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Leta Kasahun | Software Engineer & Full-Stack Developer",
    template: "%s | Leta Kasahun",
  },
  description:
    "Software Engineering student and Full-Stack Developer skilled in Python, JavaScript, backend APIs, Docker, Kubernetes, and AI-driven web applications.",
  keywords: [
    "Leta Kasahun",
    "Software Engineer",
    "Full-Stack Developer",
    "Python",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Docker",
    "Kubernetes",
    "AI Engineering",
    "REST APIs",
  ],
  authors: [{ name: "Leta Kasahun", url: siteUrl }],
  creator: "Leta Kasahun",
  publisher: "Leta Kasahun",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Leta Kasahun | Software Engineer & Full-Stack Developer",
    description:
      "Software Engineering student and Full-Stack Developer skilled in Python, JavaScript, backend APIs, Docker, Kubernetes, and AI-driven web applications.",
    siteName: "Leta Kasahun Portfolio",
    images: [
      {
        url: "/images/hero.JPG",
        width: 1200,
        height: 630,
        alt: "Leta Kasahun - Software Engineer & Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leta Kasahun | Software Engineer & Full-Stack Developer",
    description:
      "Software Engineering student and Full-Stack Developer skilled in Python, JavaScript, backend APIs, Docker, Kubernetes, and AI-driven web applications.",
    images: ["/images/hero.JPG"],
    creator: "@letakasahun",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
      "googlee101f3b8908da623",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Leta Kasahun",
      jobTitle: "Software Engineer & Full-Stack Developer",
      url: siteUrl,
      image: `${siteUrl}/images/hero.JPG`,
      sameAs: [
        "https://github.com/Leta-Kasahun",
        "https://linkedin.com/in/lkasahun",
        "https://x.com/letakasahun",
      ],
      description:
        "Software Engineering student and Full-Stack Developer skilled in Python, JavaScript, backend APIs, Docker, Kubernetes, and AI-driven web applications.",
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Leta Kasahun Portfolio",
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} ${instrumentSerif.variable} dark h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
