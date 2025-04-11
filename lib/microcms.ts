// libs/microcms.ts
import { createClient } from "microcms-js-sdk";
import { PER_PAGE } from "../app/config";
import { formatDate } from "@/app/utils/dateFormatter";

// 環境変数にMICROCMS_SERVICE_DOMAINが設定されていない場合はエラーを投げる
if (!process.env.MICROCMS_SERVICE_DOMAIN) {
	throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

// 環境変数にMICROCMS_API_KEYが設定されていない場合はエラーを投げる
if (!process.env.MICROCMS_API_KEY) {
	throw new Error("MICROCMS_API_KEY is required");
}

// Client SDKの初期化を行う
export const client = createClient({
	serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
	apiKey: process.env.MICROCMS_API_KEY,
});

export type BlogCardProps = {
	title: string;
	overview: string;
	imageUrl: string;
	tags: { title: string; id: string }[];
	category: { title: string; id: string };
	id: string;
	updatedAt: string;
};

export async function getBlogPostsForCardsByPage(
	page: number
): Promise<{ posts: BlogCardProps[]; totalCount: number }> {
	const data = await client.get({
		endpoint: "blog", // 'blog'はmicroCMSのエンドポイント名
		queries: {
			fields: "id,title,thumbnail,updatedAt,tags,category,overview",
			offset: (page - 1) * PER_PAGE, // ページネーションのためのオフセット
			limit: PER_PAGE, // 1ページあたりの表示件数
			orders: "-updatedAt", // 更新日の降順で取得
		},
	});
	data.contents = data.contents.map(
		(
			post: {
				thumbnail: { url: string };
				tags: { tag: string; id: string }[];
				category: { category: string; id: string };
				updatedAt: string;
			} & BlogCardProps
		) =>
			({
				...post,
				imageUrl: post.thumbnail.url,
				tags: post.tags.map((tag: { tag: string; id: string }) => ({
					title: tag.tag,
					id: tag.id,
				})),
				category: {
					title: post.category.category,
					id: post.category.id,
				},
				updatedAt: formatDate(post.updatedAt),
			} as BlogCardProps)
	) as BlogCardProps[]; // contentsをBlogCardProps型に変換
	return { posts: data.contents, totalCount: data.totalCount }; // contentsを返す
}

export async function getBlogPostsForCardsById(
	id: string
): Promise<BlogCardProps> {
	const data = await client.get({
		endpoint: `blog/${id}`, // 'blog'はmicroCMSのエンドポイント名
		queries: {
			fields: "id,title,thumbnail,updatedAt,tags.id,tags.tag,category,overview",
		},
	});
	const returnData = {
		...data,
		tags: data.tags.map((tag: { tag: string; id: string }) => ({
			title: tag.tag,
			id: tag.id,
		})),
		imageUrl: data.thumbnail.url,
		category: data.category.category,
		updatedAt: formatDate(data.updatedAt),
	} as BlogCardProps;
	return returnData;
}

export type BlogPageProps = {
	title: string;
	imageUrl: string;
	tags: { title: string; id: string }[];
	category: { title: string; id: string };
	id: string;
	updatedAt: string;
	body: string;
	related: string[];
};

// microCMSから特定の記事を取得
export async function getBlogPost(id: string): Promise<BlogPageProps> {
	const data = await client.get({
		endpoint: `blog/${id}`,
	});
	data.imageUrl = data.thumbnail.url; // サムネイルのURLを取得
	data.tags = data.tags.map((tag: { tag: string; id: string }) => ({
		title: tag.tag,
		id: tag.id,
	})); // タグを取得
	data.category = { title: data.category.category, id: data.category.id }; // カテゴリを取得
	data.updatedAt = formatDate(data.updatedAt); // 更新日をフォーマット
	data.related = data.related.map((related: { id: string }) => related.id); // 関連記事のIDを取得
	return data as BlogPageProps;
}

export async function searchBlogPostsByQuery(
	query: string
): Promise<{ posts: BlogCardProps[]; totalCount: number }> {
	const data = await client.get({
		endpoint: "blog",
		queries: {
			q: query,
			fields: "id,title,thumbnail,updatedAt,tags,category,overview",
			limit: 100,
		},
	});
	data.contents = data.contents.map(
		(
			post: {
				thumbnail: { url: string };
				tags: { tag: string }[];
				category: { category: string };
				updatedAt: string;
			} & BlogCardProps
		) => ({
			...post,
			imageUrl: post.thumbnail.url,
			tags: post.tags.map((tag: { tag: string }) => tag.tag),
			category: post.category.category,
			updatedAt: formatDate(post.updatedAt),
		})
	) as BlogCardProps[];
	return { posts: data.contents, totalCount: data.totalCount };
}

export async function getTagList(): Promise<
	{ tag: string; id: string; totalCount: number }[]
> {
	const data = await client.get({
		endpoint: "tags",
		queries: {
			fields: "tag,id",
			limit: 100,
		},
	});
	const returnData = [] as { tag: string; id: string; totalCount: number }[];
	for (const content of data.contents) {
		const tag = content.tag as string;
		const totalCount = await client.get({
			endpoint: "blog",
			queries: { filters: `tags[contains]${content.id}`, limit: 100 },
		});
		returnData.push({
			tag,
			id: content.id,
			totalCount: totalCount.totalCount,
		});
	}
	return returnData;
}

export async function getCategoryList(): Promise<
	{ category: string; id: string; totalCount: number }[]
> {
	const data = await client.get({
		endpoint: "category",
		queries: {
			fields: "category,id",
			limit: 100,
		},
	});
	const returnData = [] as {
		category: string;
		id: string;
		totalCount: number;
	}[];
	for (const content of data.contents) {
		const category = content.category as string;
		const totalCount = await client.get({
			endpoint: "blog",
			queries: { filters: `category[equals]${content.id}`, limit: 100 },
		});
		returnData.push({
			category,
			id: content.id,
			totalCount: totalCount.totalCount,
		});
	}
	return returnData;
}
