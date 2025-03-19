import {ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import BlogCard from "./blog-card";

interface Article {
  title: string;
  slug: string;
  description: string;
  image: string;
  read_time: string;
  created_at: string;
}

async function getArticles() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL!}/api`, {
      cache: "no-store", // Ensures fresh data on each request
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.statusText}`);
    }

    return response.json();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // console.error("Error fetching articles:", error);
    return []; // Return an empty array to prevent rendering errors
  }
}

export default async function ArticleSection() {
  const posts: Article[] = await getArticles();

  return (
    posts.length > 0 && (
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Latest Articles
            </h2>
            <p className="max-w-[85%] text-muted-foreground md:text-xl">
              Explore our most recent publications on cybersecurity topics.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-2">
            {posts.map((article) => (
              <BlogCard key={article.slug} post={article} />
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <Button variant="outline" size="lg" className="rounded-full px-8">
              View All Articles
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    )
  );
}
