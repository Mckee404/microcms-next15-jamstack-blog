"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CategoryList from "../../components/Aside/_parts/CategoryList";
import TagList from "../../components/Aside/_parts/TagList";

export default function SearchPage() {
	const searchParams = useSearchParams();
	const q = (searchParams.get("q") ?? "").trim();
	const [data, setData] = useState<blogCard[] | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	type response = {
		contents: blogCard[];
		totalCount: number;
		offset: number;
	};

	type blogCard = {
		id: string;
		updatedAt: string;
		title: string;
		tags: tag[];
		category: category;
		thumbnail: thumbnail;
		overview: string;
	};

	type category = {
		id: string;
		category: string;
	};

	type tag = {
		id: string;
		tag: string;
	};

	type thumbnail = {
		url: string;
		width: number;
		height: number;
	};

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
				const json = (await res.json()) as response;
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

	if (q === "") {
		return <div>Queryがない</div>;
	}

	let content;

	if (data == null) content = <div>データがありません</div>;
	else if (loading) return <div>Loading...</div>;
	else if (error) return <div>Error: {error}</div>;

	return (
		<div className="container mx-auto px-4 flex flex-col lg:flex-row lg:gap-4">
			<main className="w-full lg:w-3/4">{content}</main>
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
