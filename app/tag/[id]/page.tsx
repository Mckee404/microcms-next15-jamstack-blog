import React from "react";
import {
	getBlogPostsForCardsByTagId,
	getTagById,
	getTagList,
} from "../../../lib/microcms";
import { BlogCard } from "@/app/components/blog-card";
import TagList from "@/app/components/TagList";
import CategoryList from "@/app/components/CategoryList";

export default async function CategoryPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params; // `params` から `id` を取得
	const { tag } = await getTagById(id);

	if (!tag) {
		return (
			<main className="sm:container mx-auto">
				<h2>{"一致するタグが存在しません。"}</h2>
			</main>
		);
	}

	const { posts } = await getBlogPostsForCardsByTagId(id);

	return (
		<div className="container mx-auto px-4 flex flex-col lg:flex-row lg:gap-4">
			<main className="w-full lg:w-3/4">
				<h2 className="mx-8 text-2xl font-bold mb-2">{`「${tag}」タグ（ ${posts.length}件 ）`}</h2>
				<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-8 s:mx-0 mt-8">
					{posts.map((post) => (
						<li key={post.id}>
							<BlogCard {...post} />
						</li>
					))}
				</ul>
			</main>
			<aside className="lg:w-1/4 mt-8 lg:mt-0">
				<div className="mt-8 lg:mt-2 px-4 gap-4 flex flex-col">
					<div>
						<h3 className="text-xl font-bold mb-2">カテゴリー</h3>
						<CategoryList />
					</div>
					<div>
						<h3 className="text-xl font-bold mb-2">タグ</h3>
						<TagList />
					</div>
				</div>
			</aside>
		</div>
	);
}

// 動的なページを作成
export const generateStaticParams = async () => {
	const tagList = await getTagList();

	const paths = tagList.map((tag) => ({
		id: tag.id, // タグのIDを使用
	}));

	return paths;
};
