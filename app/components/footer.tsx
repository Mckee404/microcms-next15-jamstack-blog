import { Github, Twitter } from "lucide-react";
import SearchBox from "./SearchBox";

export default function Footer() {
  return (
    <footer className="bg-neutral-100 border-t border-neutral-200 py-6 mt-8">
      <div className="container mx-auto flex flex-col items-center gap-4">
        {/* ブログタイトル */}
        <h2 className="text-xl font-bold">My Blog</h2>

        {/* 検索ボックス */}
        {/* <SearchBox /> */}

        {/* ソーシャルボタン */}
        <div className="flex gap-4">
          <a
            href="https://github.com/Mckee404"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-600 hover:text-black"
          >
            <Github className="h-6 w-6" />
          </a>
          <a
            href="https://x.com/Mckee_403"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-600 hover:text-blue-500"
          >
            <Twitter className="h-6 w-6" />
          </a>
        </div>

        {/* コピーライト */}
        <p className="text-sm text-neutral-500">
          © {new Date().getFullYear()} My Blog. All rights reserved.
        </p>
      </div>
    </footer>
  );
}