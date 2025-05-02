import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import CategorySpan from "@/components/Spans/CategorySpan";
import TagSpan from "@/components/Spans/TagSpan";
import { BlogModel } from "@/lib/api/microcms/models";
import { formatDate } from "@/app/utils/dateFormatter";

export default function BlogCard(blogModel: BlogModel) {
	const { id, title, overview, category, tags } = blogModel;
	const imageUrl = blogModel.thumbnail.url;
	const updatedAt = formatDate(blogModel.updatedAt);
	return (
		<Link href={`/blog/${id}`}>
			<Card className="overflow-hidden transition-all duration-200 hover:shadow-lg flex flex-col">
				<div className="relative aspect-[1.96/1]">
					<Image
						src={imageUrl}
						alt={title}
						fill
						className="object-cover"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
				</div>
				<CardHeader className="flex-none">
					<div className="space-y-1">
						<div className="flex items-center justify-between">
							<CategorySpan category={category} />
							<span className="text-sm text-muted-foreground">
								{updatedAt}
							</span>
						</div>
						<h3 className="font-semibold leading-tight tracking-tight line-clamp-2 pt-1">
							{title}
						</h3>
					</div>
				</CardHeader>
				<CardContent className="flex-grow">
					<p className="text-sm text-muted-foreground line-clamp-3">
						{overview}
					</p>
				</CardContent>
				<CardFooter className="flex-none h-20">
					<div className="flex flex-wrap gap-2">
						<TagSpan tagList={tags} />
					</div>
				</CardFooter>
			</Card>
		</Link>
	);
}
