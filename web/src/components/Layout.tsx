import { Flex } from "@primer/components";

const Layout: React.FC = ({ children }) => {
  return (
    <Flex flexDirection="column" height="100vh">
      {children}
    </Flex>
  );
};

export default Layout;
