import BlogCard from "@/components/BlogCard/BlogCard";

import React from "react";
import TagSpan from "@/components/Spans/TagSpan";
import CategorySpan from "@/components/Spans/CategorySpan";
import {
	codeBlockFileNameTransformer,
	microCMSRichEditorHandler,
	syntaxHighlightingByShikiTransformer,
} from "microcms-rich-editor-handler";
import {
	getAllBlogIds,
	getBlogById,
} from "@/lib/api/microcms/handler/get_blogs";
import MainAndAside from "@/components/Aside/MainAndAside";

import {
	BLOG_CARD_FIELDS,
	BLOG_META_FIELDS,
	BLOG_PAGE_FIELDS,
} from "@/lib/api/microcms/query";
import { formatDate } from "@/app/utils/dateFormatter";

// 記事詳細ページの生成
export default async function BlogPostPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params; // IDを取得
	const post = await getBlogById({ id, fields: BLOG_PAGE_FIELDS });
	const relatedPosts = await Promise.all(
		post.related.map(
			async (related) =>
				await getBlogById({ id: related.id, fields: BLOG_CARD_FIELDS })
		)
	); // 関連記事を取得

	const { html: transformedHtml } = await microCMSRichEditorHandler(
		post.body,
		{
			transformers: [
				codeBlockFileNameTransformer(),
				syntaxHighlightingByShikiTransformer({
					highlightOptions: {
						javascript: {
							lang: "javascript",
							theme: "github-dark",
						},
						go: {
							lang: "go",
							theme: "github-dark",
						},
						dockerfile: {
							lang: "dockerfile",
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
		<MainAndAside>
			<>
				<h1 className="text-4xl mb-6 mt-16">{post.title}</h1>
				{/* タイトルを表示 */}
				<div className="mb-12">
					<CategorySpan category={post.category} />
					<span className="block text-sm text-muted-foreground">
						最終更新日 : {formatDate(post.updatedAt)}
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
									{...relatedPost}
								/>
							))}
						</div>
					</>
				)}
			</>
		</MainAndAside>
	);
}

// 静的パスを生成
export async function generateStaticParams() {
	const blogIds = await getAllBlogIds();

	return blogIds.map((id: string) => ({
		id, // 各記事のIDをパラメータとして返す
	}));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const post = await getBlogById({ id, fields: BLOG_META_FIELDS });

	return {
		title: post.title,
		description: post.overview,
		openGraph: {
			title: post.title,
			description: post.overview,
			images: [
				{
					url: post.thumbnail.url,
					width: 1200,
					height: 630,
				},
			],
			url: `https://mckee-tech.com/blog/${post.id}`,
			type: "website",
		},
	};
}
