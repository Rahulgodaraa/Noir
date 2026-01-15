import NoirHomeClient from "./component/NoirHomeClient";
import { Metadata } from "next";

// 1. Static Metadata for SEO
export const metadata: Metadata = {
  title: "Noir Essence | Luxury Fragrances & Refined Home Candles",
  description: "Experience the Noir Universe. Discover signature fragrances and hand-poured candles designed to elevate your space and presence.",
  keywords: ["luxury fragrance", "designer perfume", "noir essence", "hand-poured candles"],
  openGraph: {
    title: "Noir Essence",
    description: "Wrap yourself in Noir elegance.",
    url: "https://your-noir-site.com",
    siteName: "Noir Essence",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
};

export default function Page() {
  // 2. Structured Data (JSON-LD) for Google "Rich Results"
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Brand",
    "name": "Noir Essence",
    "url": "https://your-noir-site.com",
    "logo": "https://your-noir-site.com/images/Logo.png",
    "description": "A luxury fragrance brand creating sensory experiences for space and presence.",
  };

  return (
    <>
      {/* Inject Structured Data into the <head> */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NoirHomeClient />
    </>
  );
}