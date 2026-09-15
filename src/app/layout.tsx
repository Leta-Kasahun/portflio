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
    default: "Leta Kasahun | Full-Stack Developer & Software Engineering Student",
    template: "%s | Leta Kasahun",
  },
  description:
    "Leta Kasahun is a Software Engineering student at Debre Birhan University and a Full-Stack Developer based in Addis Ababa, Ethiopia, passionate about scalable software, DevOps, and Artificial Intelligence.",
  keywords: [
    "Leta Kasahun",
    "Full-Stack Developer",
    "Software Engineering Student",
    "Software Engineer",
    "Backend Developer",
    "Web Developer",
    "DevOps",
    "Artificial Intelligence",
    "Addis Ababa",
    "Debre Birhan",
    "Debre Birhan University",
    "Ethiopia",
  ],
  authors: [{ name: "Leta Kasahun", url: siteUrl }],
  creator: "Leta Kasahun",
  publisher: "Leta Kasahun",
  alternates: {
    canonical: "/",
  },
  category: "technology",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Leta Kasahun | Full-Stack Developer & Software Engineering Student",
    description:
      "Leta Kasahun is a Software Engineering student at Debre Birhan University and a Full-Stack Developer based in Addis Ababa, Ethiopia, passionate about scalable software, DevOps, and Artificial Intelligence.",
    siteName: "Leta Kasahun Portfolio",
    images: [
      {
        url: "/images/hero.JPG",
        width: 1200,
        height: 630,
        alt: "Leta Kasahun - Full-Stack Developer & Software Engineering Student",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leta Kasahun | Full-Stack Developer & Software Engineering Student",
    description:
      "Leta Kasahun is a Software Engineering student at Debre Birhan University and a Full-Stack Developer based in Addis Ababa, Ethiopia, passionate about scalable software, DevOps, and Artificial Intelligence.",
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
      "_zlsFf-2bPmzKSdCoAMjb4MZ96xpUjZWPyqkFc7IgWI",
    other: {
      "msvalidate.01":
        process.env.NEXT_PUBLIC_BING_VERIFICATION ||
        "90D8A26E82FA8A2826696C74A63BA2D5",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Leta Kasahun",
      jobTitle: "Full-Stack Developer",
      url: siteUrl,
      image: `${siteUrl}/images/hero.JPG`,
      sameAs: [
        "https://github.com/Leta-Kasahun",
        "https://linkedin.com/in/letakasahun",
        "https://x.com/letakasahun",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Addis Ababa",
        addressCountry: "Ethiopia",
      },
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Debre Birhan University",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Debre Birhan",
          addressCountry: "Ethiopia",
        },
      },
      knowsAbout: [
        "Full-Stack Development",
        "Backend Development",
        "DevOps",
        "Artificial Intelligence",
        "Python",
        "JavaScript",
        "TypeScript",
        "RESTful APIs",
        "Docker",
      ],
      description:
        "Leta Kasahun is a Software Engineering student at Debre Birhan University and a Full-Stack Developer based in Addis Ababa, Ethiopia, passionate about scalable software, DevOps, and Artificial Intelligence.",
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Leta Kasahun Portfolio",
      inLanguage: "en-US",
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
