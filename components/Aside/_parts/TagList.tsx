import React from "react";
import {
	getAllTags,
	getReferenceCountOfTag,
} from "@/lib/api/microcms/handler/get_tags";
import { Tag } from "lucide-react";
import Link from "next/link";

export default async function TagList() {
	const tagList = await getTagList(); // タグリストを取得
	return (
		<div className="flex flex-wrap gap-2">
			{tagList.map((e) => (
				<Link
					key={e.tag.id}
					href={`/tag/${e.tag.id}`}
					className="hover:underline decoration-neutral-600"
				>
					{/* タグ名をクリック可能にする */}
					<span
						key={e.tag.id}
						className="flex items-center gap-1 text-neutral-600 bg-neutral-200 rounded-full text-xs px-2 py-1 hover:bg-neutral-300"
					>
						<Tag className="h-3 w-3" />
						{e.tag.tag + " (" + e.totalCount + ")"}
					</span>
				</Link>
			))}
		</div>
	);
}

async function getTagList(): Promise<TagModelWithCount[]> {
	const tags = await getAllTags({ fields: ["id", "tag"] });
	const tagList: TagModelWithCount[] = await Promise.all(
		tags.map(async (tag) => {
			const totalCount = await getReferenceCountOfTag({ tagId: tag.id });
			return {
				tag: tag,
				totalCount: totalCount,
			};
		})
	);
	return tagList;
}

type TagModelWithCount = {
	tag: { id: string; tag: string };
	totalCount: number;
};
