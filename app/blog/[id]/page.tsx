import Image from "next/image";
import {
	client,
	getBlogPost,
	getBlogPostsForCardsById,
} from "../../../lib/microcms";
import { BlogCard } from "@/app/components/blog-card";

import React from "react";
import TagList from "@/app/components/TagList";
import CategoryList from "@/app/components/CategoryList";
import TagSpan from "@/app/components/TagSpan";
import CategorySpan from "@/app/components/CategorySpan";

// 記事詳細ページの生成
export default async function BlogPostPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params; // IDを取得
	const post = await getBlogPost(id);
	const relatedPosts = await Promise.all(
		post.related.map(
			async (relatedId) => await getBlogPostsForCardsById(relatedId)
		)
	); // 関連記事を取得
	return (
		<div className="container mx-auto px-4 flex flex-col lg:flex-row lg:gap-4">
			<main className="w-full lg:w-3/4">
				<div className="relative aspect-[1.96/1] mb-4">
					<Image
						src={post.imageUrl}
						alt={post.title}
						priority
						fill
						className="object-cover rounded-lg"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
				</div>
				<h1 className="text-3xl font-bold mb-2">{post.title}</h1>{" "}
				{/* タイトルを表示 */}
				<div className="flex items-center justify-between mb-4">
					<CategorySpan
						title={post.category.title}
						id={post.category.id}
					/>
					<span className="text-sm text-muted-foreground">
						{post.updatedAt}
					</span>
				</div>
				<div
					className="prose max-w-none"
					dangerouslySetInnerHTML={{ __html: post.body }}
				/>
				<div className="mt-8">
					<TagSpan tagList={post.tags} /> {/* タグを表示 */}
				</div>
				<h2 className="text-2xl font-bold mt-8 mb-4">関連記事</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{relatedPosts.map((relatedPost) => (
						<BlogCard
							key={relatedPost.id}
							id={relatedPost.id}
							title={relatedPost.title}
							imageUrl={relatedPost.imageUrl}
							tags={relatedPost.tags}
							category={relatedPost.category}
							updatedAt={relatedPost.updatedAt}
							overview={relatedPost.overview}
						/>
					))}
				</div>
			</main>
			<aside className="lg:w-1/4">
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

// 静的パスを生成
export async function generateStaticParams() {
	const data = await client.get({
		endpoint: "blog",
		queries: { fields: "id" },
	});

	return data.contents.map((content: { id: string }) => ({
		id: content.id, // 各記事のIDをパラメータとして返す
	}));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const post = await getBlogPostsForCardsById(id);

	return {
		title: post.title,
		description: post.overview,
		openGraph: {
			title: post.title,
			description: post.overview,
			images: [
				{
					url: post.imageUrl,
					width: 1200,
					height: 630,
				},
			],
			url: `https://mckee-tech-blog.pages.dev//blog/${post.id}`,
			type: "website",
		},
	};
}
