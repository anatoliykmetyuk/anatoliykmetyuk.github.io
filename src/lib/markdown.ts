import fs from 'fs';
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

export type BlogPostSource = {
  slug: string;
  title: string;
  date: Date;
  content: string;
  description?: string;
  tags?: string[];
}

export function readMarkdownFile(slug: string): BlogPostSource {
  const filePath = `posts/${slug}.md`;
  const source = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(source);
  return {
    slug,
    title: data.title,
    date: getBlogPostDate(slug),
    content,
    description: data.description,
    tags: data.tags,
  };
}

function getBlogPostSlugs() {
  const postFileNames = fs.readdirSync('posts');
  return postFileNames.map(fileName => fileName.replace(/\.md$/, ''));
}

function getBlogPostDate(slug: string): Date {
  const dateStr = slug.slice(0, 10);
  return new Date(dateStr);
}

export function getBlogPostSources(): BlogPostSource[] {
  const slugs = getBlogPostSlugs();
  return slugs.map(slug => readMarkdownFile(slug));
}

export async function markdownToHtml(markdown: string) {
  const processor = remark().use(remarkHtml);
  const vfile = await processor.process(markdown);
  return vfile.toString();
}
