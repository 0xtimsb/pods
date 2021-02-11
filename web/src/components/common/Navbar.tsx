import { Link, useLocation } from "react-router-dom";

// Graphql
import { MeQuery } from "../../generated/graphql";

// Routes
import { HOME, POD } from "../../routes";

interface NavbarProps {
  me: MeQuery["me"];
}

const Navbar: React.FC<NavbarProps> = ({ me }) => {
  const location = useLocation();
  const pageLinks = ["Overview", "Discussion", "Board", "Settings"];

  return (
    <div className="sticky top-0 flex justify-center border-b border-gray-200">
      <div className="w-full max-w-6xl px-2 space-y-1">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center space-x-5">
            <Link to="/" className="text-gray-900 text-3xl font-extrabold">
              Pods
            </Link>
          </div>
          {me ? (
            <div>Heee</div>
          ) : (
            <div className="flex items-center space-x-5">
              <Link to="/login" className="text-gray-900 text-sm">
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-gray-900 text-white px-2.5 py-2 rounded border border-gray-900 text-sm hover:bg-white hover:text-black"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
        {me && location.pathname.includes(POD) && (
          <div className="flex space-x-6">
            {pageLinks.map((pageLink, index) => (
              <Link
                to={HOME}
                key={index}
                className="text-gray-500 border-b-2 text-sm hover:border-gray-900 border-transparent hover:text-gray-900 pb-2.5"
              >
                {pageLink}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
