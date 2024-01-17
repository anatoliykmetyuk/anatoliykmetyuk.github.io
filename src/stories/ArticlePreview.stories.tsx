import ArticlePreview from "@/components/ArticlePreview";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ArticlePreview> = {
  component: ArticlePreview,
  title: "ArticlePreview",
  decorators: [
    (Story) => (
      <div className="card">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ArticlePreview>;

export const Default: Story = {
  args: {
    date: new Date(2021, 3, 20),
    title: 'Effect Extensions Pattern',
    excerpt: 'When programming in a purely functional style, we aim to reify side effects into data structures called *effect types*. An effect type you are using should be the same throughout the entire application so that different parts of the application are composable.',
    slug: '2018-08-18-effect-extensions-pattern',
    tags: ['scala','programming','functional programming','category theory','effect type','side effect','effect','typelevel','cats','monad','monad transformer']
  },
};
