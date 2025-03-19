import { Suspense } from "react";
import SearchBar from "./search-bar";
import BlogList from "./blog-list";

export default async function Page() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Our Blog</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover the latest insights, tutorials, and updates from our team of
          experts.
        </p>
      </header>

      <div className="mb-8">
        <Suspense>
          <SearchBar />
        </Suspense>
      </div>
      <Suspense>
        <BlogList />
      </Suspense>
    </div>
  );
}

export async function generateMetadata() {
  const siteUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
  return {
    metadataBase: new URL(siteUrl),
    title: "Explore Insightful Blogs | Stay Updated & Inspired",
    description:
      "Discover a variety of insightful blogs on diverse topics, from tech trends to lifestyle tips. Stay informed, entertained, and inspired.",
    alternates: {
      canonical: `${siteUrl}/blog`,
    },
    openGraph: {
      title: "Explore Insightful Blogs | Stay Updated & Inspired",
      description:
        "Discover a variety of insightful blogs on diverse topics, from tech trends to lifestyle tips. Stay informed, entertained, and inspired.",
      url: `${siteUrl}/blog`,
      siteName: "SecureBlog",
      type: "website",
      images: [
        {
          url: `${siteUrl}/web-app-manifest-512x512.png`,
          width: 1200,
          height: 630,
          alt: "Explore Insightful Blogs",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Explore Insightful Blogs | Stay Updated & Inspired",
      description:
        "Stay informed with the latest blogs on technology, health, lifestyle, and more. Get inspired and explore new ideas.",
      images: [`${siteUrl}/web-app-manifest-512x512.png`],
    },
  };
}
