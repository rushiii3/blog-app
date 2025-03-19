import { formatDistance } from "date-fns/formatDistance";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


interface BlogPost {
  title: string;
  created_at: string;
  image: string;
  description:string;
  read_time:string;
  slug:string;
}

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border bg-background shadow-sm transition-all hover:shadow-md">
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 z-10"></div>
        <Image
          src={post.image}
          alt={post.title}
          width={400}
          height={200}
          className="h-48 w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold tracking-tight">{post.title}</h3>
        <p className="mt-2 line-clamp-3 text-muted-foreground">
          {post.description}
        </p>
        <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
          <span>
            {formatDistance(new Date(post.created_at), new Date())}
          </span>
          <span>•</span>
          <span>{post.read_time} read</span>
        </div>
        <div className="mt-6 flex items-center text-sm font-medium text-primary">
          Read article
          <ArrowRight className="ml-1 h-4 w-4" />
        </div>
      </div>
      <Link
        href={`/blog/${post.slug}`}
        className="absolute inset-0"
        aria-hidden="true"
      />
    </article>
  );
}
