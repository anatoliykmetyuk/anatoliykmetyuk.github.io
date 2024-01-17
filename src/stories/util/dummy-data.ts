import { BlogPostSource } from "@/lib/markdown";

export const dummyPosts: BlogPostSource[] = [
  {
    title: "A blog post",
    slug: "a-blog-post",
    date: new Date("2020-01-01"),
    tags: ["tag1", "tag2"],
    content: "This is a blog post",
    excerpt: "This is a blog post, and it's really good!",
  },
  {
    title: "Another blog post",
    slug: "another-blog-post",
    date: new Date("2020-01-02"),
    tags: ["tag1", "tag3"],
    content: "This is another blog post",
    excerpt: "This is another blog post, and it's really good!",
  },
  {
    title: "Yet another blog post",
    slug: "yet-another-blog-post",
    date: new Date("2020-01-03"),
    tags: ["tag2", "tag3"],
    content: "This is yet another blog post",
    excerpt: "This is yet another blog post, and it's really good!",
  },
];
