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

export const NoTitle: Story = {
  args: {
  },
};

export const CustomTitle: Story = {
  args: {
    title: "Nice blog post!",
  },
};

export const ReallyLongTitle: Story = {
  args: {
    title: "Towards a better understanding of the role of the CTO in a startup",
  },
};