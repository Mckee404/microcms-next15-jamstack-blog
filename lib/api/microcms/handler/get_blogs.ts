import { client } from "./client";
import { BlogModel } from "../models";
import { BlogSchema } from "../models/schema/blog_schema";
import { MicroCMSListResponse, MicroCMSQueries } from "microcms-js-sdk";

const endpoint = "blog";

export async function getBlogs({
	queries,
}: {
	queries?: MicroCMSQueries;
}): Promise<MicroCMSListResponse<BlogSchema>> {
	const blogs = await client.getList<BlogSchema>({
		endpoint,
		queries,
	});
	return blogs;
}

export async function getAllBlogIds(): Promise<string[]> {
	const blogIds = await client.getAllContentIds({
		endpoint,
	});
	return blogIds;
}

export async function getAllBlogs({
	orders,
	fields,
}: {
	orders?: string;
	fields?: string | string[];
}): Promise<BlogModel[]> {
	const blogs = await client.getAllContents<BlogSchema>({
		endpoint,
		queries: { orders, fields },
	});
	return blogs;
}

export async function getBlogById({
	id,
	fields,
}: {
	id: string;
	fields?: string | string[];
}): Promise<BlogModel> {
	const blog = await client.getListDetail<BlogSchema>({
		endpoint,
		contentId: id,
		queries: { fields },
	});
	return blog;
}

export async function getCount({
	filters,
}: {
	filters?: string;
}): Promise<number> {
	const totalCount = (
		await client.getList<BlogSchema>({
			endpoint,
			queries: { filters, limit: 0 },
		})
	).totalCount;
	return totalCount;
}
