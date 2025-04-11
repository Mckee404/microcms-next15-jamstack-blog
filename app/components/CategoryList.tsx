import React from "react";
import { getCategoryList } from "@/lib/microcms";
import { Folder } from "lucide-react";
import Link from "next/link";

export default async function TagList() {
  const tagList = await getCategoryList(); // タグリストを取得
  return (
    <div className="flex flex-wrap gap-2">
      {tagList.map((category) => (
        <Link key={category.id} href={`/category/${category.id}`} className="hover:underline">
          <span
            key={category.id}
            className="flex items-center gap-1 text-xs px-2 py-1 text-neutral-800"
          >
            <Folder className="h-4 w-4 text-muted-foreground" />
            {category.category + " (" + category.totalCount + ")"}
          </span>
        </Link>
      ))}
    </div>
  );
}