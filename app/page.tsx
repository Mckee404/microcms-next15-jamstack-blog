import React from "react";

import MainAndAside from "@/components/Aside/MainAndAside";
import BlogCard from "@/components/BlogCard/BlogCard";
import Pagination from "@/components/Pagenation/Pagination";

import { getBlogs } from "@/lib/api/microcms/handler/get_blogs";
import { BLOGS_PER_PAGE } from "./config";
import { BLOG_CARD_FIELDS } from "@/lib/api/microcms/query";

export default async function Home() {
	const { contents: posts, totalCount } = await getBlogs({
		queries: { limit: BLOGS_PER_PAGE, fields: BLOG_CARD_FIELDS },
	});
	return (
		<MainAndAside>
			<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4  mx-8 s:mx-0 mt-8">
				{posts.map((post) => (
					<li key={post.id}>
						<BlogCard {...post} />
					</li>
				))}
			</ul>
			<Pagination totalCount={totalCount} />
		</MainAndAside>
	);
}
