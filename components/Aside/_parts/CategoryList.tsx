import React from "react";
import { Folder } from "lucide-react";
import Link from "next/link";
import {
	getAllCategories,
	getReferenceCountOfCategory,
} from "@/lib/api/microcms/handler/get_categories";
import { CategoryModel } from "@/lib/api/microcms/models";

export default async function CategoryList() {
	const categoryList = await createCategoryList(); // タグリストを取得
	return (
		<div className="flex flex-wrap gap-2">
			{categoryList.map((e) => (
				<Link
					key={e.category.id}
					href={`/category/${e.category.id}`}
					className="hover:underline"
				>
					<span
						key={e.category.id}
						className="flex items-center gap-1 text-xs px-2 py-1 text-neutral-800"
					>
						<Folder className="h-4 w-4 text-muted-foreground" />
						{e.category.category + " (" + e.totalCount + ")"}
					</span>
				</Link>
			))}
		</div>
	);
}

async function createCategoryList(): Promise<CategoryModelWithCount[]> {
	const categories = await getAllCategories({ fields: ["id", "category"] });
	const categoryList: CategoryModelWithCount[] = await Promise.all(
		categories.map(async (category) => {
			const totalCount = await getReferenceCountOfCategory({categoryId: category.id});
			return {
				category: category,
				totalCount: totalCount,
			};
		})
	);
	return categoryList;
}

type CategoryModelWithCount = {
	category: CategoryModel;
	totalCount: number;
};