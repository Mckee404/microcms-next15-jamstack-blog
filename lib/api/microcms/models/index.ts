import { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import { TagSchema } from "./schema/tag_schema";
import { CategorySchema } from "./schema/category_schema";
import { BlogSchema } from "./schema/blog_schema";

export type TagModel = TagSchema & MicroCMSContentId & MicroCMSDate;

export type CategoryModel = CategorySchema & MicroCMSContentId & MicroCMSDate;

export type BlogModel = BlogSchema & MicroCMSContentId & MicroCMSDate;
