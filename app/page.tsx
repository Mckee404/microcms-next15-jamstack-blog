// app/page.tsx
import { getBlogPostsForCardsByPage } from '../lib/microcms';
import { BlogCard } from './components/blog-card';
import { Pagination } from './components/Pagination';
import React from 'react';
import TagList from './components/TagList';
import CategoryList from './components/CategoryList';

export default async function Home() {
  const { posts, totalCount } = await getBlogPostsForCardsByPage(1);

  return (
    <div className="container mx-auto px-4 flex flex-col lg:flex-row lg:gap-4">
      <main className='w-full lg:w-3/4'>
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