"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [, setDebouncedQuery] = useState(query);

  // Update input field when URL search params change
  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  // Debounce input changes to reduce unnecessary updates
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query);
      const params = new URLSearchParams(searchParams);
      if (query) {
        params.set("q", query);
      } else {
        params.delete("q");
      }
      replace(`${pathname}?${params.toString()}`);
    }, 1000); // Adjust debounce time as needed

    return () => clearTimeout(timeout);
  }, [query, pathname, replace, searchParams]);

  return (
    <form
      onSubmit={(e) => e.preventDefault()} // Prevent form submission from reloading page
      className="relative w-full max-w-full"
    >
      <div className="relative">
        {/* Search Icon */}
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />

        {/* Search Input */}
        <Input
          type="search"
          placeholder="Search articles..."
          className="pl-10 w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search articles"
        />
      </div>

      {/* Search Button (optional, for accessibility) */}
      <Button
        type="submit"
        className="absolute right-1 top-1/2 -translate-y-1/2 h-8"
        variant="ghost"
      >
        Search
      </Button>
    </form>
  );
}
