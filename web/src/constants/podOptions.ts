import { BookIcon, GearIcon, ProjectIcon } from "@primer/octicons-react";

import { POD, POD_PROJECT, POD_SETTINGS } from "./routes";

export default [
  { name: "Overview", route: POD, icon: BookIcon },
  { name: "Project", route: POD_PROJECT, icon: ProjectIcon },
  { name: "Settings", route: POD_SETTINGS, icon: GearIcon },
];
