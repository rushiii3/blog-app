/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; // ✅ This must be a Client Component

import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef, useEffect } from "react";
import BlogCard from "@/components/blog-card";
import { useSearchParams } from "next/navigation";
import LoadingUI from "./loadingUi";

// Fetch blogs dynamically with search query
async function fetchBlogs({ pageParam = 1, query = "" }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/blog?page=${pageParam}&q=${query}`
  );
  return res.json();
}

export default function BlogList() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || ""; // Get search query from URL

  console.log(searchQuery);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
  } = useInfiniteQuery({
    queryKey: ["blogs", searchQuery], // ✅ Include search query in queryKey
    queryFn: ({ pageParam }) => fetchBlogs({ pageParam, query: searchQuery }),
    initialPageParam: 1,
    // initialData: searchQuery
    //   ? undefined
    //   : { pages: [initialData], pageParams: [1] }, // ✅ Use only when there's no search
    getNextPageParam: (lastPage, allPages) =>
      lastPage?.length > 0 ? allPages.length + 1 : undefined, // ✅ Handle pagination properly
  });
  const loadMoreRef = useRef(null);

  // Intersection Observer to auto-load more posts
  useEffect(() => {
    if (!loadMoreRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);
  const blogs = data?.pages.flatMap((page) => page.blogs) || [];

  if (isPending) return <LoadingUI />;
  if (isError) return <p>Failed to load posts</p>;

  return (
    <div className="space-y-8">
      {blogs.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          {blogs?.map((post, index) => (
            <BlogCard key={index} post={post} />
          ))}
        </div>
      ) : (
        <p>No blogs found</p>
      )}

      {/* Load More Trigger (Hidden Element for Intersection Observer) */}
      <div ref={loadMoreRef} className="h-10"></div>

      {/* Optional Button (for manual load) */}
      {!isFetchingNextPage && hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Load More
        </button>
      )}

      {isFetchingNextPage && <LoadingUI />}
    </div>
  );
}
