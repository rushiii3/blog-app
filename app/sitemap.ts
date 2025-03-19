import { MetadataRoute } from "next";
export const dynamic = 'force-dynamic'
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_URL! || "http://localhost:3000";

  // Fetch blog posts from your API
  const posts = await fetch(`${siteUrl}/api/blog`,{next:{revalidate: 60* 1000}}).then((res) => res.json());

  // Static pages
  const pages = ["/","/blog"].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  // Blog post pages
  const blogPages = posts.blogs.map((post: { slug: string }) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date().toISOString(),
  }));

  return [...pages, ...blogPages];
}
