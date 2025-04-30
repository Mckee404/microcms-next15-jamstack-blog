import React from "react";
import BlogCard from "@/components/BlogCard/BlogCard";
import { getAllTagIds, getTagById } from "@/lib/api/microcms/handler/get_tags";
import MainAndAside from "@/components/Aside/MainAndAside";
import { BLOG_CARD_FIELDS } from "@/lib/api/microcms/query";
import { getBlogs } from "@/lib/api/microcms/handler/get_blogs";

export default async function CategoryPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params; // `params` から `id` を取得

	const posts = await getBlogs({
		queries: {
			fields: BLOG_CARD_FIELDS,
			filters: `tags[contains]${id}`,
		},
	});

	const { tag } = await getTagById({ id }); // タグ名を取得

	return (
		<MainAndAside>
			<h2 className="mx-8 text-2xl font-bold mb-2">{`「${tag}」タグ（ ${posts.totalCount}件 ）`}</h2>
			<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-8 s:mx-0 mt-8">
				{posts.contents.map((post) => (
					<li key={post.id}>
						<BlogCard {...post} />
					</li>
				))}
			</ul>
		</MainAndAside>
	);
}

// 動的なページを作成
export const generateStaticParams = async () => {
	const tagList = await getAllTagIds();

	const paths = tagList.map((id) => ({
		id, // タグのIDを使用
	}));

	return paths;
};
