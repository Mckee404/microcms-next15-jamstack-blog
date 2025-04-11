import React from "react";
import { getBlogPostsForCardsByCategoryId, getCategoryById } from "../../../lib/microcms";
import { BlogCard } from "@/app/components/blog-card";

export default async function CategoryPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params; // `params` から `id` を取得
	const { category } = await getCategoryById(id);

	if(!category) {
		return (
			<main className="sm:container mx-auto">
				<h2>{"一致するカテゴリーが存在しません。"}</h2>
			</main>
		);
	}


	const { posts } = await getBlogPostsForCardsByCategoryId(id);
	
	return (
		<main className="sm:container mx-auto mt-8">
			<h2 className="mx-8 text-2xl font-bold mb-2">{`「${category}」カテゴリー（ ${posts.length}件 ）`}</h2>
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
