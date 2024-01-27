import { formatDate } from '@/lib/utils'
import React from 'react'
import { Badge } from './ui/badge'
import Link from 'next/link'

type ArticlePreviewProps = {
  date: Date,
  title: string,
  slug: string,
  tags?: string[],
}

const ArticlePreview = ({ date, title, slug, tags }: ArticlePreviewProps) => {
  return (
    <div className="border border-dashed border-foreground rounded-md p-3 flex flex-col w-full gap-2">
      <Link href={`/posts/${slug}`}>
        <div className="flex flex-row items-center gap-2 w-full">
          <span className="text-muted-foreground flex-shrink-0">
            {formatDate(date)}
          </span>
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
      </Link>
      <p className="text-base">
        <Link
          href={`/posts/${slug}`}
          className="text-purple-950 hover:text-purple-800 ml-1"
        >
          Read more...
        </Link>
      </p>
      <div className="flex flex-row gap-2 flex-wrap mt-3">
        {tags?.map((tag) => (
          <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`}>
            <Badge
              key={tag}
              className="hover:cursor-pointer bg-purple-950 hover:bg-purple-800"
            >
              {tag}
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ArticlePreview