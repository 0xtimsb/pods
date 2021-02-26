import {
  generatePath,
  Link as RouterLink,
  RouteComponentProps,
  useLocation,
} from "react-router-dom";
import { IconProps } from "@primer/octicons-react";
import {
  BorderBox,
  StyledOcticon,
  Text,
  UnderlineNav,
} from "@primer/components";

import Container from "./Container";

interface UnderlineNavbarProps {
  navItems: { name: string; route: string; icon: React.FC<IconProps> }[];
  id?: number;
}

const UnderlineNavbar: React.FC<UnderlineNavbarProps> = ({ navItems, id }) => {
  const location = useLocation();
  return (
    <BorderBox
      bg="gray.0"
      borderRadius={0}
      borderWidth={0}
      borderBottomWidth={1}
      style={{ position: "sticky", top: 0 }}
    >
      <Container flexDirection="row">
        {navItems.map(({ name, route, icon }, index) => (
          <UnderlineNav.Link
            as={RouterLink}
            to={generatePath(route, { id })}
            key={index}
            selected={location.pathname === generatePath(route, { id })}
          >
            <StyledOcticon icon={icon} mr={2} />
            <Text
              fontWeight={
                location.pathname === generatePath(route, { id })
                  ? "bold"
                  : "normal"
              }
            >
              {name}
            </Text>
          </UnderlineNav.Link>
        ))}
      </Container>
    </BorderBox>
  );
};

export default UnderlineNavbar;
