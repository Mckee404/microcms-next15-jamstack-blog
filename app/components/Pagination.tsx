//components/Pagination.js
import Link from 'next/link';
import { PER_PAGE } from '@/app/config';

export const Pagination = ({ totalCount }: { totalCount: number }) => {

  const range = (start: number, end: number) =>
        [...Array(end - start + 1)].map((_, i) => start + i)

  return (
    <ul className="flex justify-center items-center gap-2 mt-4">
      {range(1, Math.ceil(totalCount / PER_PAGE)).map((number) => (
        <li key={number}>
          <Link
            href={number===1?"/":`/blog/page/${number}`}
            className="flex items-center justify-center w-10 h-10 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition"
          >
            {number}
          </Link>
        </li>
      ))}
    </ul>
  );
};