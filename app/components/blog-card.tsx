import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Tag, Folder } from 'lucide-react';
import { BlogCardProps } from '@/lib/microcms';


export function BlogCard({
  title,
  overview,
  imageUrl,
  tags,
  category,
  id,
  updatedAt,
}: BlogCardProps) {
  // 表示するタグの最大数
  const MAX_TAGS = 4;

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
        <CardHeader className="flex-none rounded-xl">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Folder className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{category}</span>
              </div>
              <span className="text-sm text-muted-foreground">{updatedAt}</span>
            </div>
            <h3 className="font-semibold leading-tight tracking-tight line-clamp-2">
              {title}
            </h3>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-3">{overview}</p>
        </CardContent>
        <CardFooter className="flex-none h-16">
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, MAX_TAGS).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="flex items-center gap-1 text-neutral-600 bg-neutral-200 rounded-full"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </Badge>
            ))}
            {/* タグが多い場合は "..." を表示 */}
            {tags.length > MAX_TAGS && (
              <span className="text-sm text-neutral-500">...他 {tags.length - MAX_TAGS} 件</span>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}