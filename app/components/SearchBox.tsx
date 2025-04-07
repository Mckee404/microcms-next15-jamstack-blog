"use client";

import { Search } from "lucide-react";
import React, { useState } from "react";

export default function SearchBox() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim() !== "") {
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative w-64 flex items-center">
      <input
        type="text"
        placeholder="Search"
        className="border border-neutral-300 rounded-full px-4 py-2 text-sm w-full pl-10"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
    </div>
  );
}