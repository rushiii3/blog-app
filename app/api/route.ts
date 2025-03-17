import { createClient } from "@/utlis/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const { data: blog, error } = await supabase
    .from("blog")
    .select("title,slug,description,image,read_time,created_at")
    .range(0, 3);

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
