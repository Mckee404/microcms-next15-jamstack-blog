"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Folder } from "lucide-react";
import { CategoryModel } from "@/lib/api/microcms/models";

export default function CategorySpan({category}: {category: CategoryModel}) {
	const router = useRouter();

	return (
		<span
			onClick={(e) => {
				e.preventDefault();
				router.push(`/category/${category.id}`);
			}}
		>
			<div className="inline-flex items-center gap-2 cursor-pointer hover:underline">
				<Folder className="h-4 w-4 text-muted-foreground" />
				<span className="text-sm text-muted-foreground ">
					{category.category}
				</span>
			</div>
		</span>
	);
}
