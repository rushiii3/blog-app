/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { formatDistance } from "date-fns";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
type Params = {
  params: Promise<{
    slug: string;
  }>;
};

interface Post {
  title: string;
  slug: string;
  description: string;
  image: string;
  read_time: string;
  created_at: string;
  author_name: string;
  author_avatar: string;
  content: string;
}
// export const revalidate = 60;
export const dynamicParams = true; // or false, to 404 on unknown paths

async function getPost(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL!}/api/blog/${slug}`, {
      next: { revalidate: 60 }, // Fetches fresh data every 60 seconds
    });

    if (!res.ok) {
      console.error(`Error fetching post: ${res.status}`);
      return notFound();
    }

    const post: Post = await res.json();
    return post;
  } catch (error) {
    console.error("Fetch failed in getPost:", error);
    return notFound();
  }
}



export async function generateStaticParams() {
  return []; // Let Next.js generate pages dynamically
}


export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const post: Post = await getPost(params.slug);

  if (!post) {
    return notFound();
  }

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_URL!),
    title: post.title,
    description: post.description,
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`${post.image}`],
      creator: post.author_name,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${process.env.NEXT_PUBLIC_URL!}`,
      siteName: "SecureBlog",
      images: [
        {
          url: post.image, // Must be an absolute URL
        },
      ],
      locale: "en_US",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_URL!}/blog/${post.slug}`,
    },
  };
}
export default async function BlogPost(props: Params) {
  // const params = useParams();
  const params = await props.params;
  // const router = useRouter();

  const post = await getPost(params.slug);

  if (!post) {
    return null;
  }

  return (
    <main className="min-h-screen bg-background max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link href="/blog" className="inline-block mb-8">
        <Button variant="outline" className="cursor-pointer">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </Link>
      <article>
        <div className="relative h-[400px] rounded-lg overflow-hidden mb-8">
          <Image
            src={post.image}
            alt={post.title}
            className="object-cover w-full h-full"
            height={300}
            width={300}
          />
        </div>

        <div className="flex items-center gap-4 mb-8">
          <Image
            src={post.author_avatar}
            alt={post.author_name}
            className="w-12 h-12 rounded-full object-cover"
            height={100}
            width={100}
          />
          <div>
            <h3 className="font-medium">{post.author_name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{formatDistance(post.created_at, new Date())}</span>
              <span>•</span>
              <span>{post.read_time} read</span>
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-bold tracking-tight mb-8">{post.title}</h1>

        <div className="prose prose-lg max-w-none">
          {post.content.split("\n").map((paragraph, index) => (
            <p
              key={index}
              className="mb-6 text-muted-foreground leading-relaxed text-justify"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </main>
  );
}
