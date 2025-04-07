// libs/microcms.ts
import { createClient } from 'microcms-js-sdk';
import { PER_PAGE } from '../app/config';
import { formatDate } from '@/app/utils/dateFormatter';

// 環境変数にMICROCMS_SERVICE_DOMAINが設定されていない場合はエラーを投げる
if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}

// 環境変数にMICROCMS_API_KEYが設定されていない場合はエラーを投げる
if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required');
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
  tags: string[];
  category: string;
  id: string;
  updatedAt: string;
}

// ブログ記事の型定義
type Thumbnail = {
  url: string;
  height: number;
  width: number;
};

export async function getBlogPostsForCardsByPage(page: number): Promise<{ posts: BlogCardProps[]; totalCount: number }> {
  const data = await client.get({
    endpoint: 'blog', // 'blog'はmicroCMSのエンドポイント名
    queries: {
      fields: 'id,title,thumbnail,updatedAt,tags,category,overview',
      offset: (page - 1) * PER_PAGE, // ページネーションのためのオフセット
      limit: PER_PAGE, // 1ページあたりの表示件数
      orders: '-updatedAt', // 更新日の降順で取得
    },
  });
  data.contents = data.contents.map((post: any) => ({
    ...post,
    imageUrl: post.thumbnail.url,
    tags: post.tags.map((tag: any) => tag.tag),
    category: post.category.category,
    updatedAt: formatDate(post.updatedAt),
  })) as BlogCardProps[]; // contentsをBlogCardProps型に変換
  return { posts: data.contents, totalCount: data.totalCount }; // contentsを返す
}

export async function getBlogPostsForCardsById(id: string): Promise<  BlogCardProps> {
  const data = await client.get({
    endpoint: `blog/${id}`, // 'blog'はmicroCMSのエンドポイント名
    queries: {
      fields: 'id,title,thumbnail,updatedAt,tags,category,overview',
    },
  });
  const returnData = {
    ...data,
    imageUrl: data.thumbnail.url,
    tags: data.tags.map((tag: any) => tag.tag),
    category: data.category.category,
    updatedAt: formatDate(data.updatedAt),
  } as BlogCardProps;
  return returnData;
}

export type BlogPageProps = {
  title: string;
  imageUrl: string;
  tags: string[];
  category: string;
  id: string;
  updatedAt: string;
  body: string;
  related: string[];
}

// microCMSから特定の記事を取得
export async function getBlogPost(id: string): Promise<BlogPageProps> {
  const data = await client.get({
    endpoint: `blog/${id}`,
  });
  data.imageUrl = data.thumbnail.url; // サムネイルのURLを取得
  data.tags = data.tags.map((tag: any) => tag.tag); // タグを取得
  data.category = data.category.category; // カテゴリを取得
  data.updatedAt = formatDate(data.updatedAt); // 更新日をフォーマット
  data.body = data.body.replace(/<img[^>]*src="([^"]*)"[^>]*>/g, '<img src="$1" loading="lazy" />'); // 画像の読み込みを遅延させる
  data.related = data.related.map((related: any) => related.id); // 関連記事のIDを取得
  return data as BlogPageProps;
}

export async function searchBlogPostsByQuery(query: string): Promise<{ posts: BlogCardProps[]; totalCount: number }> {
  const data = await client.get({
    endpoint: 'blog',
    queries: {
      q: query,
      fields: 'id,title,thumbnail,updatedAt,tags,category,overview',
      limit: 100,
    },
  });
  data.contents = data.contents.map((post: any) => ({
    ...post,
    imageUrl: post.thumbnail.url,
    tags: post.tags.map((tag: any) => tag.tag),
    category: post.category.category,
    updatedAt: formatDate(post.updatedAt),
  })) as BlogCardProps[];
  return { posts: data.contents, totalCount: data.totalCount };
}