import Sidebar from "@/components/Sidebar";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Sidebar> = {
  component: Sidebar,
  title: "Components/Sidebar",
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  args: {
  },
};

export const Constrained: Story = {
  args: {
  },
  decorators: [
    (Story) => (
      <div className="h-[300px] overflow-hidden">
        <Story />
      </div>
    ),
  ],
};