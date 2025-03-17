// import blogPosts from "../data.json"; // Adjust path accordingly
import { createClient } from "@/utlis/supabase/server";
import { NextRequest } from "next/server";

export async function GET(request:NextRequest) {
    const searchParams = new URL(request.url).searchParams;
    const limit = 10;
    const page = Number(searchParams.get("page")) || 1; // Default page is 1
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit - 1;
  
    const supabase = await createClient();
  
    const { data: blog, error } = await supabase
      .from("blog")
      .select("title,slug,description,image,read_time,created_at")
      .range(startIndex, endIndex);
  
    if (error) {
      return new Response(JSON.stringify(error), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  
    return new Response(JSON.stringify(blog), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
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
