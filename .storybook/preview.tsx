import type { Preview } from "@storybook/react";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        className={cn(
          "min-h-screen bg-background",
          inter
        )}
      >
        <Story />
      </div>
    ),
  ],
};

export default preview;
