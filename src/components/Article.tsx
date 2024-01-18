import { formatDate } from '@/lib/utils'
import { Home } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { ScrollArea } from './ui/scroll-area'

type ArticleProps = {
  title: string
  date: Date
  content: string
}

const Article = ({ title, date, content }: ArticleProps) => {
  return (
    <div className="w-full flex flex-col items-center h-full">
      <ScrollArea className="flex flex-col items-center gap-3 w-full max-w-3xl">
        <div className="flex flex-row w-full justify-between p-2">
          <span className="text-muted-foreground">{formatDate(date)}</span>
          <Link href="/">
            <Home />
          </Link>
        </div>
        <h1 className="text-3xl font-semibold">{title}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          className="prose w-full"
        />
      </ScrollArea>
    </div>
  );
}

export default Article