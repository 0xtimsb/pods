// Graphql
import { MeQuery } from "../../generated/graphql";

// Components
import Navbar from "./Navbar";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen bg-white flex flex-col">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
