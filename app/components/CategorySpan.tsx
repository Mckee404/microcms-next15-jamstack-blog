"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Folder } from "lucide-react";

export default function CategorySpan(category: { title: string; id: string }) {
	const router = useRouter();

	return (
		<span
			onClick={(e) => {
				e.preventDefault();
				router.push(`/category/${category.id}`);
			}}
			className="hover:underline"
		>
			<div className="flex items-center gap-2">
				<Folder className="h-4 w-4 text-muted-foreground" />
				<span className="text-sm text-muted-foreground">
					{category.title}
				</span>
			</div>
		</span>
	);
}
