import React from "react";

import TagList from "@/components/Aside/_parts/TagList";
import CategoryList from "@/components/Aside/_parts/CategoryList";

export default function MainAndAside({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="container mx-auto px-4 flex flex-col lg:flex-row lg:gap-4">
			<main className="w-full lg:w-3/4">{children}</main>
			<aside className="lg:w-1/4 mt-8 lg:mt-0">
				<div className="mt-8 lg:mt-2 px-4 gap-4 flex flex-col">
					<div>
						<h3 className="text-xl font-bold mb-2">カテゴリー</h3>
						<CategoryList />
					</div>
					<div>
						<h3 className="text-xl font-bold mb-2">タグ</h3>
						<TagList />
					</div>
				</div>
			</aside>
		</div>
	);
}
