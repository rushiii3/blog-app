import { queryOptions } from "@tanstack/react-query";

async function fetchBlogs() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/blog?page=1`, {
      cache: "force-cache", // Always fetch fresh data (SSR)
    });
    return res.json();
  }

export const useBlogListQuery = queryOptions({
    queryKey: ["blogs", ""],
    queryFn: fetchBlogs,
    staleTime: 60 * 1000,
  })