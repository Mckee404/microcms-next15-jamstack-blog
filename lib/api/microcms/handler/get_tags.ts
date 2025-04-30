import { client } from "./client";
import { TagSchema } from "@/lib/api/microcms/models/schema/tag_schema";
import { getCount } from "./get_blogs";
import { TagModel } from "../models";

const endpoint = "tags";

export async function getTagById({
	id,
	fields,
}: {
	id: string;
	fields?: string | string[];
}): Promise<TagModel> {
	const tag = await client.getListDetail<TagSchema>({
		endpoint,
		contentId: id,
		queries: { fields },
	});
	return tag;
}

export async function getAllTags({
	orders,
	fields,
}: {
	orders?: string;
	fields?: string | string[];
}): Promise<TagModel[]> {
	const tags = await client.getAllContents<TagSchema>({
		endpoint,
		queries: { orders, fields },
	});
	return tags;
}

export async function getAllTagIds(): Promise<string[]> {
	const tagIds = await client.getAllContentIds({
		endpoint,
	});
	return tagIds;
}

export async function getReferenceCountOfTag({
	tagId,
}: {
	tagId: string;
}): Promise<number> {
	const totalCount = await getCount({
		filters: `tags[contains]${tagId}`,
	});
	return totalCount;
}
