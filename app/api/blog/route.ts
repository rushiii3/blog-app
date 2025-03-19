// import blogPosts from "../data.json"; // Adjust path accordingly
import { createClient } from "@/utlis/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const query = searchParams.get("q") || ""; // Get search query
    const limit = 10;
    const page = Math.max(Number(searchParams.get("page")) || 1, 1);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit - 1;

    const supabase = await createClient();

    let blogQuery = supabase
      .from("blog")
      .select("title, slug, description, image, read_time, created_at")
      .order("created_at", { ascending: false })
      .range(startIndex, endIndex);

    // Apply search filter if query exists
    if (query) {      
      blogQuery = blogQuery.or(
        `title.ilike.%${query}%,description.ilike.%${query}%`
      );
    }

    const { data: blogs, error } = await blogQuery;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Check if more pages exist
    const { count } = await supabase
      .from("blog")
      .select("*", { count: "exact", head: true });

    const hasNextPage = endIndex + 1 < (count || 0);

    return NextResponse.json({ blogs, hasNextPage }, { status: 200 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  // Parse the request body
  const body = await request.json();
  const { name } = body;

  // e.g. Insert new user into your DB
  const newUser = { id: Date.now(), name };

  return new Response(JSON.stringify(newUser), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
