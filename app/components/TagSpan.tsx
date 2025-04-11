"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Tag } from "lucide-react";

export default function TagSpan({
	tagList,
}: {
	tagList: { title: string; id: string }[];
}) {
	const router = useRouter();
	const MAX_TAGS = 4; // 表示するタグの最大数

	return (
		<div className="flex flex-wrap gap-2">
			{tagList.map((tag) => (
				<span
					key={tag.id}
					onClick={(e) => {
						e.preventDefault();
						router.push(`/tag/${tag.id}`);
					}}
					className="hover:underline"
				>
					<span
						className="flex items-center gap-1 text-neutral-600 bg-neutral-200 rounded-full text-xs px-2 py-1 hover:bg-neutral-300"
					>
						<Tag className="h-3 w-3" />
						{tag.title}
					</span>
				</span>
			))}
			{/* タグが多い場合は "..." を表示 */}
			{tagList.length > MAX_TAGS && (
				<span className="text-sm text-neutral-500">
					...他 {tagList.length - MAX_TAGS} 件
				</span>
			)}
		</div>
	);
}
