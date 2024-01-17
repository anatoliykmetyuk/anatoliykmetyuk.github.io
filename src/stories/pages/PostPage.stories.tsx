import RootLayout from "@/app/layout";
import PostPage from "@/app/posts/[slug]/page";
import type { Meta, StoryObj } from "@storybook/react";
import { dummyPosts } from "../util/dummy-data";

const meta: Meta<typeof PostPage> = {
  component: PostPage,
  title: "Pages/PostPage",
  decorators: [
    (Story) => (
      <RootLayout>
        <Story />
      </RootLayout>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof PostPage>;

export const Default: Story = {
  args: {
    article: dummyPosts[0],
    articleHtml: "<p>Hello world!</p>",
  },
};

export const ReallyLongContents: Story = {
  args: {
    article: dummyPosts[0],
    articleHtml: "<p>Hello world!</p>".repeat(100),
  },
}
