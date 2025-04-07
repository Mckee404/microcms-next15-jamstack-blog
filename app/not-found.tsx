// app/not-found.tsx
export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-8">ページが見つかりませんでした。</p>
      <a
        href="/"
        className="px-6 py-3 bg-neutral-500 text-white rounded-lg hover:bg-neutral-600 transition"
      >
        ホームに戻る
      </a>
    </main>
  );
}