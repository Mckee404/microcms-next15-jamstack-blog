// app/page.tsx
import { getBlogPostsForCardsByPage } from '../lib/microcms';
import { BlogCard } from './components/blog-card';
import { Pagination } from './components/Pagination';
import React from 'react';

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