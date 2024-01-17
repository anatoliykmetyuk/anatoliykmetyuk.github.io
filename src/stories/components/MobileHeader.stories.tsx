import MobileHeader from "@/components/MobileHeader";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof MobileHeader> = {
  component: MobileHeader,
  title: "Components/MobileHeader",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof MobileHeader>;

export const Default: Story = {
  args: {
  },
};