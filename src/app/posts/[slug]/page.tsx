import Article from '@/components/Article'
import { BlogPostSource, markdownToHtml, readMarkdownFile } from '@/lib/markdown'
import { GetServerSideProps } from 'next'
import React from 'react'

type PostPageProps = {
  article: BlogPostSource,
  articleHtml: string,
}

const PostPage = ({ article, articleHtml }: PostPageProps) => {
  return (
    <Article title={article.title} date={article.date} content={articleHtml} />
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const markdownFile = readMarkdownFile(params?.slug as string);
  const articleHtml = await markdownToHtml(markdownFile.content);

  return {
    props: {
      params,
      article: markdownFile,
      articleHtml,
    },
  };
};

export default PostPage