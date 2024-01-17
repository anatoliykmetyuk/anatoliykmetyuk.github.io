import fs from 'fs';
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

export type BlogPostSource = {
  slug: string;
  title: string;
  date: Date;
  content: string;
  excerpt: string;
  description?: string;
  tags?: string[];
}

export function readMarkdownFile(slug: string): BlogPostSource {
  const filePath = `posts/${slug}.md`;
  const source = fs.readFileSync(filePath, 'utf-8');
  const { data, content, excerpt } = matter(source, { excerpt: true });
  return {
    slug,
    title: data.title,
    date: data.date,
    content,
    description: data.description,
    tags: data.tags,
    excerpt: excerpt!,
  };
}

export function getBlogPostSlugs() {
  const postFileNames = fs.readdirSync('posts');
  return postFileNames.map(fileName => fileName.replace(/\.md$/, ''));
}

export async function markdownToHtml(markdown: string) {
  const processor = remark().use(remarkHtml);
  const vfile = await processor.process(markdown);
  return vfile.toString();
}
