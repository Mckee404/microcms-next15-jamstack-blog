"use client";

import React, { useState } from "react";
import Link from "next/link";
// import { Search } from "lucide-react";
// import SearchBox from "./SearchBox"; // SearchBoxコンポーネントをインポート

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-neutral-200 shadow-sm p-4 mb-4 ">
      <div className="sm:container mx-auto flex justify-between items-center">
        {/* ロゴ */}
      <h1 className="text-2xl font-bold">
        <Link href="/">Mckee Tech Blog</Link>
      </h1>

      {/* ナビゲーション */}
      <nav className="hidden md:flex gap-8 items-center">
        <Link href="/" className="font-medium hover:text-blue-500">
          Home
        </Link>
        <Link href="/about" className="font-medium hover:text-blue-500">
          About
        </Link>
        {/* <SearchBox /> */}
      </nav>

      {/* ハンバーガーメニュー */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-2xl"
        >
          ☰
        </button>
      </div>

      {/* モバイルメニュー */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center gap-8 p-4">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 right-4 text-2xl font-bold"
          >
            ✕
          </button>
          <nav className="flex flex-col items-center gap-8">
            <Link
              href="/"
              className="text-lg font-medium hover:text-blue-500"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-lg font-medium hover:text-blue-500"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <div className="relative w-64">
            {/* <SearchBox /> */}
        </div>
          </nav>
        </div>
      )}
      </div>
      
    </header>
  );
}