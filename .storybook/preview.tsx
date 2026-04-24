import type { Preview } from "@storybook/react-vite";
import "@fontsource-variable/inter";
import { MalbecThemeProvider } from "../lib/theme/MalbecThemeProvider";
import {
  booking,
  live,
  malbecRecords,
  management,
  publishing,
} from "../lib/theme/presets";
import type { ThemeConfig, ThemeMode } from "../lib/theme/tokens";
import "../lib/styles.css";

const presetMap: Record<string, ThemeConfig> = {
  malbecRecords,
  publishing,
  management,
  booking,
  live,
};

const preview: Preview = {
  globalTypes: {
    malbecTheme: {
      description: "Malbec OS product palette (accent, primary, backgrounds)",
      defaultValue: "malbecRecords",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        dynamicTitle: true,
        items: [
          { value: "malbecRecords", title: "Records" },
          { value: "publishing", title: "Publishing" },
          { value: "management", title: "Management" },
          { value: "booking", title: "Booking" },
          { value: "live", title: "Live" },
        ],
      },
    },
    malbecMode: {
      description: "Light / dark / system color scheme",
      defaultValue: "light",
      toolbar: {
        title: "Scheme",
        icon: "mirror",
        dynamicTitle: true,
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
          { value: "system", title: "System" },
        ],
      },
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const themeKey =
        (context.globals.malbecTheme as string | undefined) ??
        (context.parameters.malbecTheme as string | undefined) ??
        "malbecRecords";
      const theme = presetMap[themeKey] ?? malbecRecords;
      const mode =
        (context.globals.malbecMode as ThemeMode | undefined) ??
        (context.parameters.malbecMode as ThemeMode | undefined) ??
        "light";
      return (
        <MalbecThemeProvider
          key={`${themeKey}-${mode}`}
          theme={theme}
          defaultMode={mode}
        >
          <div className="malbec-font-sans ui:min-h-[calc(100svh-40px)] ui:bg-background-100 ui:p-8 ui:min-w-[calc(100svw-40px)] ui:flex ui:items-center ui:justify-center">
            <Story />
          </div>
        </MalbecThemeProvider>
      );
    },
  ],
};

export default preview;
