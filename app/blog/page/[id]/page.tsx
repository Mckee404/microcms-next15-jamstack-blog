import BlogCard from "@/components/BlogCard/BlogCard";
import Pagination from "@/components/Pagenation/Pagination";
import { BLOGS_PER_PAGE } from "@/app/config";

import React from "react";
import { getAllBlogIds, getBlogs } from "@/lib/api/microcms/handler/get_blogs";
import { BLOG_PAGE_FIELDS } from "@/lib/api/microcms/query";

export default async function BlogPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	// `params.id` を非同期で処理
	const { id } = await params; // `params` から `id` を取得
	const page = parseInt(id, 10); // `id` を整数に変換
	const { contents: posts, totalCount } = await getBlogs({
		queries: {
			fields: BLOG_PAGE_FIELDS,
			limit: BLOGS_PER_PAGE,
			offset: (page - 1) * BLOGS_PER_PAGE,
		},
	});

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
	const totalCount = (await getAllBlogIds()).length;

	const range = (start: number, end: number) =>
		[...Array(end - start + 1)].map((_, i) => start + i);

	const paths = range(1, Math.ceil(totalCount / BLOGS_PER_PAGE)).map(
		(page) => ({
			id: page.toString(), // ページ番号を文字列として設定
		})
	);

	return paths;
};
