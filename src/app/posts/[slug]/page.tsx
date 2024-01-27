import Article from '@/components/Article'
import { BlogPostSource, markdownToHtml, readMarkdownFile } from '@/lib/markdown'
import React from 'react'

type PostPageProps = {
  testArticle?: BlogPostSource,
  testArticleHtml?: string,
  params: {
    slug: string
  }
}

const PostPage = async ({ testArticle, testArticleHtml, params: { slug } }: PostPageProps) => {
  const article = testArticle || readMarkdownFile(slug);
  const articleHtml = testArticleHtml || await markdownToHtml(article.content);

  return (
    <Article title={article.title} date={article.date} content={articleHtml} />
  )
}

export default PostPage