import {
	client,
	getBlogPostsForCardsByPagination,
} from "../../../../lib/microcms";
import { BlogCard } from "../../../components/blog-card";
import { Pagination } from "../../../components/Pagination";
import { PER_PAGE } from "@/app/config";
import NotFound from "../../../not-found";

import React from "react";

export default async function BlogPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	// `params.id` を非同期で処理
	const { id } = await params; // `params` から `id` を取得
	const page = parseInt(id, 10); // `id` を整数に変換
	const { posts, totalCount } = await getBlogPostsForCardsByPagination(page);

	if (posts.length === 0) {
		return <NotFound />;
	}

	return (
		<main className="sm:container mx-auto">
			<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-8 s:mx-0">
				{posts.map((post) => (
					<li key={post.id}>
						<BlogCard {...post} />
					</li>
				))}
			</ul>
			<Pagination totalCount={totalCount} />
		</main>
	);
}

// 動的なページを作成
export const generateStaticParams = async () => {
	const repos = await client.get({ endpoint: "blog" });

	const range = (start: number, end: number) =>
		[...Array(end - start + 1)].map((_, i) => start + i);

	const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map(
		(page) => ({
			id: page.toString(), // ページ番号を文字列として設定
		})
	);

	return paths;
};
