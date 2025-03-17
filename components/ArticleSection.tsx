import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { formatDistance } from "date-fns";
import Image from "next/image";
import Link from "next/link";

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
          {
            posts.map((article) => (
              <article
                key={article.slug}
                className="group relative flex flex-col overflow-hidden rounded-2xl border bg-background shadow-sm transition-all hover:shadow-md"
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 z-10"></div>
                  <Image
                    src={article.image}
                    alt={article.title}
                    width={400}
                    height={200}
                    className="h-48 w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-bold tracking-tight">
                    {article.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-muted-foreground">
                    {article.description}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{formatDistance(new Date(article.created_at), new Date())}</span>
                    <span>•</span>
                    <span>{article.read_time} read</span>
                  </div>
                  <div className="mt-6 flex items-center text-sm font-medium text-primary">
                    Read article
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
                <Link
                  href={`/blog/${article.slug}`}
                  className="absolute inset-0"
                  aria-hidden="true"
                />
              </article>
            ))
        }
        </div>

        <div className="mt-16 flex justify-center">
          <Button variant="outline" size="lg" className="rounded-full px-8">
            View All Articles
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>)
  );
}
