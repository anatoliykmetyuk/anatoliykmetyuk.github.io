import Article from "@/components/Article";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Article> = {
  component: Article,
  title: "Components/Article",
  decorators: [
    (Story) => (
      <div className="card h-screen overflow-hidden">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
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

export const ReallyLongContents: Story = {
  args: {
    title: "Hello World :)",
    date: new Date(2021, 2, 1),
    content: "Here we go, programming is great!".repeat(100),
  },
};
