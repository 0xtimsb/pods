import { POD, POD_BOARD, POD_DISCUSSION, POD_SETTINGS } from "./routes";

export default [
  { name: "Overview", route: POD },
  { name: "Discussion", route: POD_DISCUSSION },
  { name: "Board", route: POD_BOARD },
  { name: "Settings", route: POD_SETTINGS },
];
