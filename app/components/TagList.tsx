import React from "react";
import { getTagList } from "@/lib/microcms";
import { Tag } from "lucide-react";
import Link from "next/link";

export default async function TagList() {
  const tagList = await getTagList(); // タグリストを取得
  return (
    <div className="flex flex-wrap gap-2">
      {tagList.map((tag) => (
        <Link key={tag.id} href={`/tag/${tag.id}`} className="hover:underline decoration-neutral-600">
            {/* タグ名をクリック可能にする */}
            <span
              key={tag.id}
              className="flex items-center gap-1 text-neutral-600 bg-neutral-200 rounded-full text-xs px-2 py-1 hover:bg-neutral-300"
            >
            <Tag className="h-3 w-3" />
            {tag.tag + " (" + tag.totalCount + ")"}
          </span>
        </Link>
      ))}
    </div>
  );
}