import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";

const Layout = ({ children }) => {
  return <div className="bg-cream-50 h-screen">{children}</div>;
};

export default Layout;
