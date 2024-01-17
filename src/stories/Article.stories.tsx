import Article, { ArticleProps } from "@/components/Article";
import { readMarkdownFile } from "@/lib/markdown";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Article> = {
  component: Article,
  title: "Article",
};

export default meta;
type Story = StoryObj<typeof Article>;

export const Default: Story = {
  args: {
    title: "Hello World :)",
    date: new Date(2021, 2, 1),
    content: "Here we go, programming is great!",
  },
};
