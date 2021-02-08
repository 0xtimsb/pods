import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <div className="sticky top-0 h-16 flex justify-center border-b border-gray-200">
      <div className="w-full max-w-6xl px-20 flex items-center justify-between">
        <div className="flex items-center space-x-5">
          <Link to="/" className="text-gray-900 text-3xl font-extrabold">
            Pods
          </Link>
        </div>
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
      </div>
    </div>
  );
};

export default Navbar;
