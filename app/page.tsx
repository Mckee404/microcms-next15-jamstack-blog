// app/page.tsx
import { client, getBlogPostsForCardsByPage } from '../lib/microcms';
import { BlogCard } from './components/blog-card';
import { Pagination } from './components/Pagination';
import { PER_PAGE } from '@/app/config';
import { formatDate } from './utils/dateFormatter';

// ブログ記事の型定義
type Thumbnail = {
  url: string;
  height: number;
  width: number;
};

export default async function Home() {
  const { posts, totalCount } = await getBlogPostsForCardsByPage(1);

  return (
    <main className='sm:container mx-auto'>
      <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4  mx-8 s:mx-0'>
        {posts.map((post) => (
          <li key={post.id}>
            <BlogCard
              {...post}
            />
          </li>
        ))}
      </ul>
      <Pagination totalCount={totalCount} />
    </main>
  );
}