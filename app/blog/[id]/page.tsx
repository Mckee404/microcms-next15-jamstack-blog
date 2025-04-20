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
import {
	microCMSRichEditorHandler,
	syntaxHighlightingByShikiTransformer,
} from "microcms-rich-editor-handler";

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

	const { html: transformedHtml } = await microCMSRichEditorHandler(
		post.body,
		{
			transformers: [
				syntaxHighlightingByShikiTransformer({
					highlightOptions: {
						javascript: {
							lang: "javascript",
							theme: "github-dark",
						},
					},
					defaultHighlightOptions: {
						lang: "text",
						theme: "github-dark",
					},
				}),
			],
		}
	);

	return (
		<div className="container mx-auto px-4 flex flex-col lg:flex-row lg:gap-4">
			<main className="w-full lg:w-3/4">
				<h1 className="text-4xl mb-6 mt-16">{post.title}</h1>{" "}
				{/* タイトルを表示 */}
				<div className="mb-12">
					<CategorySpan
						title={post.category.title}
						id={post.category.id}
					/>
					<span className="block text-sm text-muted-foreground">
						最終更新日 : {post.updatedAt}
					</span>
				</div>
				<div
					className="prose max-w-none prose-h1:mt-12 prose-h1:mb-4 prose-h1:border-b-2 prose-h1:pb-2 prose-blue"
					dangerouslySetInnerHTML={{ __html: transformedHtml }}
				/>
				<div className="mt-8">
					<TagSpan tagList={post.tags} /> {/* タグを表示 */}
				</div>
				{relatedPosts.length > 0 && (
					<>
						<h2 className="text-2xl font-bold mt-8 mb-4">
							関連記事
						</h2>
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
					</>
				)}
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
