import Navbar from "./Navbar";

const Layout: React.FC = ({ children }) => {
  return (
    <div className="bg-cream-50 h-screen">
      <Navbar />
      <div>{children}</div>
      <div className="">Footer</div>
    </div>
  );
};

export default Layout;
