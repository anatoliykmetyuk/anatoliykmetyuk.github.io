import Index from "@/app/page";
import type { Meta, StoryObj } from "@storybook/react";
import { dummyPosts } from "../util/dummy-data";
import RootLayout from "@/app/layout";

const meta: Meta<typeof Index> = {
  component: Index,
  title: "Pages/Index",
  decorators: [
    (Story) => (
      <RootLayout>
        <Story />
      </RootLayout>
    ),
  ],
  parameters: {
    layout: "fullscreen"
  },
};

export default meta;
type Story = StoryObj<typeof Index>;

export const Default: Story = {
  args: {
    articles: dummyPosts,
  },
};

export const ALotOfPosts: Story = {
  args: {
    articles: [...dummyPosts, ...dummyPosts, ...dummyPosts],
  },
};