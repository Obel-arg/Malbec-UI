import { defineConfig } from "vitest/config";

// Separate from vite.config.ts so tests don't run the library build plugins (dts, tailwind).
export default defineConfig({
  test: {
    environment: "jsdom",
    include: ["lib/**/*.test.{ts,tsx}"],
    setupFiles: ["./vitest.setup.ts"],
  },
});
