import React, { Suspense } from "react";
import MainAndAside from "@/components/Aside/MainAndAside";
import SearchResult from "@/components/SearchResult/SearchResult";

export default function SearchPage() {
	return (
		<MainAndAside>
			<Suspense
				fallback={
					<div className="flex justify-center my-20">
						<div
							className="w-10 h-10 rounded-full border-4 border-neutral-400 animate-spin"
							style={{ borderTopColor: "transparent" }}
						/>
					</div>
				}
			>
				<SearchResult />
			</Suspense>
		</MainAndAside>
	);
}
