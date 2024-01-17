import { Home } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type ArticleProps = {
  title: string
  date: Date
  content: string
}

function formatDate(date: Date) {
  return date.toISOString().split('T')[0]
}

const Article = ({ title, date, content }: ArticleProps) => {
  return (
    <div className="card w-full flex flex-col items-center">
      <div className="flex flex-col items-center gap-3 w-full max-w-3xl">
        <div className="flex flex-row w-full justify-between p-2">
          <span className="text-slate-400">{formatDate(date)}</span>
          <Link href="/">
            <Home />
          </Link>
        </div>
        <h1 className="text-3xl font-semibold">{title}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          className="prose w-full"
        />
      </div>
    </div>
  );
}

export default Article