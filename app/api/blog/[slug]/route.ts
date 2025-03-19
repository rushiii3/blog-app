import { createClient } from "@/utlis/supabase/server";
import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(req: Request, context: any) {
  try {
    const { slug } = await context.params; // ✅ Correct way to get params in API route

    console.log("Slug:", slug);
    
    const supabase = await createClient(); // No need for `await`

    const {data, error} = await supabase
      .from("blog")
      .select("title, slug, description, image, read_time, created_at, author_name, author_avatar, content")
      .eq("slug", slug)
      .single(); // Get a single post

    if (error) {
      return NextResponse.json({ error: "No blog found with the slug" }, { status: 400 });
    }    
    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
