import { GearIcon, HomeIcon } from "@primer/octicons-react";

import { HOME, SETTINGS } from "./routes";

export default [
  { name: "Home", route: HOME, icon: HomeIcon },
  { name: "Settings", route: SETTINGS, icon: GearIcon },
];
