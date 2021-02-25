import { Link } from "react-router-dom";
import { Avatar, Flex, Header, StyledOcticon } from "@primer/components";
import { BellIcon, PlusIcon } from "@primer/octicons-react";

// Graphql
import { MeQuery } from "../generated/graphql";
import Container from "./Container";

interface NavbarProps {
  me: MeQuery["me"];
}

const Navbar: React.FC<NavbarProps> = ({ me }) => {
  return (
    <Header>
      <Container flexDirection="row" justifyContent="space-between">
        <Header.Item>
          <Header.Link as={Link} to="/" fontSize={2}>
            ZenMode
          </Header.Link>
        </Header.Item>
        {me ? (
          <Flex>
            <Header.Item>
              <StyledOcticon icon={BellIcon} />
            </Header.Item>
            <Header.Item>
              <StyledOcticon icon={PlusIcon} />
            </Header.Item>
            <Header.Item>
              <Header.Link as={Link} to="/">
                Home
              </Header.Link>
            </Header.Item>
          </Flex>
        ) : (
          <Flex>
            <Header.Item>
              <Header.Link as={Link} to="/signup">
                Signup
              </Header.Link>
            </Header.Item>
            <Header.Item>
              <Header.Link as={Link} to="/login">
                Login
              </Header.Link>
            </Header.Item>
          </Flex>
        )}
      </Container>
    </Header>
  );
};

export default Navbar;
