import { CategoryModel, TagModel, BlogModel } from "..";

export interface BlogSchema {
	title: string;
	body: string;
	tags: TagModel[];
	thumbnail: ThumnbnailModel;
	overview: string;
	related: BlogModel[];
	category: CategoryModel;
}

interface ThumnbnailModel {
	url: string;
	height: number;
	width: number;
}
