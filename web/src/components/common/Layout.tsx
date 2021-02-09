// Graphql
import { MeQuery } from "../../generated/graphql";

// Components
import Navbar from "./Navbar";

interface LayoutProps {
  me: MeQuery["me"];
}

const Layout: React.FC<LayoutProps> = ({ children, me }) => {
  return (
    <div className="h-screen bg-white flex flex-col">
      <Navbar me={me} />
      {children}
    </div>
  );
};

export default Layout;
