import React from "react";
import { getBlogPostsForCardsByTagId, getTagById } from "../../../lib/microcms";
import { BlogCard } from "@/app/components/blog-card";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ tagId: string }>;
}) {
  const { tagId } = await params; // `params` から `id` を取得
  const { tag } = await getTagById(tagId);

  if(!tag) {
    return (
      <main className="sm:container mx-auto">
        <h2>{"一致するタグが存在しません。"}</h2>
      </main>
    );
  }


  const { posts } = await getBlogPostsForCardsByTagId(tagId);
  
  return (
    <main className="sm:container mx-auto mt-8">
      <h2 className="mx-8 text-2xl font-bold mb-2">{`「${tag}」タグ（ ${posts.length}件 ）`}</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-8 s:mx-0 mt-8">
        {posts.map((post) => (
          <li key={post.id}>
            <BlogCard {...post} />
          </li>
        ))}
      </ul>
    </main>
  );
}
