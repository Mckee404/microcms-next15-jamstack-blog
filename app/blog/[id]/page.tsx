import { Badge, Folder, Tag } from 'lucide-react';
import Image from 'next/image';
import { client, getBlogPost,getBlogPostsForCardsById } from '../../../lib/microcms';
import { BlogCard } from '@/app/components/blog-card';
import NotFound from '../../not-found';

// 記事詳細ページの生成
export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // IDを取得
  const post = await getBlogPost(id);
  const relatedPosts = await Promise.all(post.related.map(async (relatedId) => await getBlogPostsForCardsById(relatedId))); // 関連記事を取得

  return (
    <main className="container mx-auto px-4">
      <div className="relative aspect-[1.96/1] mb-4">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1> {/* タイトルを表示 */}
      <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Folder className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{post.category}</span>
          </div>
        <span className="text-sm text-muted-foreground">{post.updatedAt}</span>
      </div>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.body }}
      /> {/* 記事本文を表示 */}
      <div className="flex flex-wrap gap-2 mt-4">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 text-neutral-600 bg-neutral-200 rounded-full text-xs px-2 py-1"
          >
            <Tag className="h-3 w-3" />
            {tag}
          </span>
        ))}
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
  );
}

// 静的パスを生成
export async function generateStaticParams() {
  const data = await client.get({
    endpoint: 'blog',
    queries: { fields: 'id' },
  });

  return data.contents.map((content: { id: string }) => ({
    id: content.id, // 各記事のIDをパラメータとして返す
  }));
}