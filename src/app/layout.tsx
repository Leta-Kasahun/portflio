import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono, Instrument_Serif } from "next/font/google";
import { getProfile } from "@/features/profile/queries";
import { getAllSocialLinks } from "@/features/social-links/queries";
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

type SiteMetadata = {
  name: string;
  jobTitle: string;
  title: string;
  description: string;
  dynamicImageUrl: string;
  sameAs: string[];
  location: string;
  twitterHandle: string;
};

async function getResolvedSiteData(): Promise<SiteMetadata> {
  const [profile, socialLinks] = await Promise.all([
    getProfile().catch(() => null),
    getAllSocialLinks().catch(() => []),
  ]);

  const name = profile?.name || "Leta Kasahun";
  const jobTitle = profile?.title || "Full-Stack Developer";
  const title = profile?.title
    ? `${name} | ${profile.title}`
    : "Leta Kasahun | Full-Stack Developer & Software Engineering Student";

  const description =
    profile?.bio ||
    profile?.about?.slice(0, 160) ||
    "Leta Kasahun is a Software Engineering student at Debre Birhan University and a Full-Stack Developer based in Addis Ababa, Ethiopia, passionate about scalable software, DevOps, and Artificial Intelligence.";

  const rawImage = profile?.imageUrl || "/images/1789473878333_hero.png" || "/images/hero.JPG";
  const dynamicImageUrl = rawImage.startsWith("http") ? rawImage : `${siteUrl}${rawImage}`;

  const defaultSocialLinks = [
    "https://github.com/Leta-Kasahun",
    "https://linkedin.com/in/lkasahun",
    "https://x.com/Lkasahun",
  ];

  const sameAs =
    socialLinks.length > 0
      ? socialLinks.map((link) => link.url)
      : defaultSocialLinks;

  const twitterLink = socialLinks.find((link) =>
    link.platform.toLowerCase().includes("twitter") || link.platform.toLowerCase().includes("x")
  );
  let twitterHandle = "@Lkasahun";
  if (twitterLink?.url) {
    const handleMatch = twitterLink.url.split("/").filter(Boolean).pop();
    if (handleMatch) {
      twitterHandle = handleMatch.startsWith("@") ? handleMatch : `@${handleMatch}`;
    }
  }

  return {
    name,
    jobTitle,
    title,
    description,
    dynamicImageUrl,
    sameAs,
    location: profile?.location || "Addis Ababa",
    twitterHandle,
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getResolvedSiteData();

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: data.title,
      template: `%s | ${data.name}`,
    },
    description: data.description,
    keywords: [
      data.name,
      data.jobTitle,
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
    authors: [{ name: data.name, url: siteUrl }],
    creator: data.name,
    publisher: data.name,
    alternates: {
      canonical: "/",
    },
    category: "technology",
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteUrl,
      title: data.title,
      description: data.description,
      siteName: `${data.name} Portfolio`,
      images: [
        {
          url: data.dynamicImageUrl,
          width: 1200,
          height: 630,
          alt: `${data.name} - ${data.jobTitle}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      images: [data.dynamicImageUrl],
      creator: data.twitterHandle,
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
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
        { url: data.dynamicImageUrl, sizes: "any" },
      ],
      apple: [
        { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
        { url: data.dynamicImageUrl, sizes: "180x180" },
      ],
      shortcut: [data.dynamicImageUrl, "/favicon.ico"],
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
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getResolvedSiteData();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: data.name,
        jobTitle: data.jobTitle,
        url: siteUrl,
        image: {
          "@type": "ImageObject",
          "@id": `${siteUrl}/#personimage`,
          url: data.dynamicImageUrl,
          caption: data.name,
        },
        sameAs: data.sameAs,
        address: {
          "@type": "PostalAddress",
          addressLocality: data.location,
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
        description: data.description,
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: `${data.name} Portfolio`,
        inLanguage: "en-US",
        publisher: {
          "@id": `${siteUrl}/#person`,
        },
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        url: siteUrl,
        name: data.title,
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        about: {
          "@id": `${siteUrl}/#person`,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: data.dynamicImageUrl,
        },
        image: data.dynamicImageUrl,
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} ${instrumentSerif.variable} dark h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png" />
        <link rel="image_src" href={data.dynamicImageUrl} />
        <meta name="thumbnail" content={data.dynamicImageUrl} />
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
