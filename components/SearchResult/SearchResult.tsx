"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { BlogModel } from "@/lib/api/microcms/models";
import BlogCard from "../BlogCard/BlogCard";

export default function SearchResult() {
	const searchParams = useSearchParams();
	const q = (searchParams.get("q") ?? "").trim();

	if (q === "") {
		return <div>Queryがない</div>;
	}

	const [posts, setData] = useState<BlogModel[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (q === "") {
			return;
		}

		const fetchData = async () => {
			setLoading(true);
			try {
				const res = await fetch(
					`https://search-blogs.aws.mckee-tech.com/?q=${encodeURIComponent(
						q
					)}`
				);
				if (!res.ok) {
					throw new Error("Failed to fetch data");
				}
				const json = await res.json();
				const blogCards = json.contents;
				setData(blogCards);
			} catch (err: unknown) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError("An unknown error occurred");
				}
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [q]);

	if (loading) {
		return (
			<div className="flex justify-center my-20">
				<div
					className="w-10 h-10 rounded-full border-4 border-neutral-400 animate-spin"
					style={{ borderTopColor: "transparent" }}
				/>
			</div>
		);
	}
	if (error) {
		return <div>予期しないエラーが発生しました。</div>;
	}
	if (!posts || posts.length === 0) {
		return (
			<h2 className="text-2xl mt-4 font-bold">
				「{q}」の検索結果は0件です。
			</h2>
		);
	}
	return (
		<>
			<h2 className="text-2xl mt-4 font-bold">
				「{q}」の検索結果は{posts.length}件です。
			</h2>
			<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4  mx-8 s:mx-0 mt-8">
				{posts.map((post) => (
					<li key={post.id}>
						<BlogCard {...post} />
					</li>
				))}
			</ul>
		</>
	);
}
