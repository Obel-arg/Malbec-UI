import { addons } from "storybook/manager-api";
import { create } from "storybook/theming/create";
import pkg from "../package.json";

addons.setConfig({
  theme: create({
    base: "dark",
    brandTitle: `Malbec UI v${pkg.version}`,
    brandUrl: "https://github.com/Obel-arg/malbec-ui",
    brandTarget: "_blank",
    appBg: "#111827",
  }),
  sidebar: {
    showRoots: true,
  },
});
