import { PrettyList, PrettyListItem } from "@/components/PrettyList";
import type { Meta, StoryObj } from "@storybook/react";
import { Cat, Computer, Github } from "lucide-react";

const meta: Meta<typeof PrettyList> = {
  component: PrettyList,
  title: "PrettyList",
};

export default meta;
type Story = StoryObj<typeof PrettyList>;

export const Default: Story = {
  args: {
    children: [
      <PrettyListItem key="1" icon={<Computer />}>
        Computers are great. They are the best. They bring a lot of postive stuff to the world.
      </PrettyListItem>,
      <PrettyListItem key="2" icon={<Github />}>
        Github empowers people to write great software.
      </PrettyListItem>,
      <PrettyListItem key="3" icon={<Cat />}>
        Cats are the best.
      </PrettyListItem>,
    ]
  },
};

export const Styled: Story = {
  args: {
    className: "bg-card border border-none rounded-lg shadow-md p-3 flex flex-col items-center gap-3 max-w-sm",
    children: Default.args?.children,
  },
}
