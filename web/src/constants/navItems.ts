import {
  GearIcon,
  HomeIcon,
  BookIcon,
  ProjectIcon,
} from "@primer/octicons-react";
import { POD, POD_PROJECT, POD_SETTINGS, HOME, SETTINGS } from "./routes";

export const homeNavItems = [
  { name: "Home", route: HOME, icon: HomeIcon },
  { name: "Settings", route: SETTINGS, icon: GearIcon },
];

export const podNavItems = [
  { name: "Overview", route: POD, icon: BookIcon },
  { name: "Project", route: POD_PROJECT, icon: ProjectIcon },
  { name: "Settings", route: POD_SETTINGS, icon: GearIcon },
];

export default {};
