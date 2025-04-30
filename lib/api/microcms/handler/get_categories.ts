import { client } from "./client";
import { CategorySchema } from "@/lib/api/microcms/models/schema/category_schema";
import { getCount } from "./get_blogs";
import { CategoryModel } from "../models";

const endpoint = "category";

export async function getCategoryById({
	id,
	fields,
}: {
	id: string;
	fields?: string | string[];
}): Promise<CategoryModel> {
	const category = await client.getListDetail<CategorySchema>({
		endpoint: endpoint,
		contentId: id,
		queries: { fields },
	});
	return category;
}

export async function getAllCategories({
	orders,
	fields,
}: {
	orders?: string;
	fields?: string | string[];
}): Promise<CategoryModel[]> {
	const categories = await client.getAllContents<CategorySchema>({
		endpoint,
		queries: { orders, fields },
	});
	return categories;
}

export async function getAllCategoryIds(): Promise<string[]> {
	const categories = await client.getAllContentIds({ endpoint });
	return categories;
}

export async function getReferenceCountOfCategory({
	categoryId,
}: {
	categoryId: string;
}): Promise<number> {
	const totalCount = await getCount({
		filters: `category[equals]${categoryId}`,
	});
	return totalCount;
}
