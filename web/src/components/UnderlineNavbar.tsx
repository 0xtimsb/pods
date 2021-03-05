import {
  generatePath,
  Link as RouterLink,
  useLocation,
} from "react-router-dom";
import { IconProps } from "@primer/octicons-react";
import {
  BorderBox,
  Box,
  Flex,
  Heading,
  SelectMenu,
  StyledOcticon,
  Text,
  UnderlineNav,
} from "@primer/components";

// Image
import Profile from "../images/profile.png";

// Components
import Container from "./Container";

// Graphql
import { MeQuery } from "../generated/graphql";
import { RiArrowDropDownFill } from "react-icons/ri";

interface UnderlineNavbarProps {
  me: NonNullable<MeQuery["me"]>;
  navItems: { name: string; route: string; icon: React.FC<IconProps> }[];
  id?: number;
}

const UnderlineNavbar: React.FC<UnderlineNavbarProps> = ({
  navItems,
  id,
  me,
}) => {
  const location = useLocation();
  return (
    <BorderBox
      bg="gray.0"
      borderRadius={0}
      borderWidth={0}
      borderBottomWidth={1}
      style={{ position: "sticky", top: 0 }}
    >
      <Container justifyContent="space-between" alignItems="center">
        <Flex>
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
        </Flex>
        <SelectMenu style={{ zIndex: 999 }}>
          <summary>
            <Flex alignItems="center" style={{ cursor: "pointer" }}>
              <img
                src={Profile}
                alt={me.username}
                width={32}
                height={32}
                style={{ borderRadius: 3 }}
              />
              <Text fontWeight="bold" ml={2}>
                {me.username}
              </Text>
              <RiArrowDropDownFill fontSize={25} />
            </Flex>
          </summary>
          <SelectMenu.Modal width={150}>
            <SelectMenu.List>
              <SelectMenu.Divider>Pages</SelectMenu.Divider>
              <SelectMenu.Item href="#">Home</SelectMenu.Item>
              <SelectMenu.Item href="#">Settings</SelectMenu.Item>
              <SelectMenu.Divider>Account</SelectMenu.Divider>
              <SelectMenu.Item href="#">Logout</SelectMenu.Item>
            </SelectMenu.List>
          </SelectMenu.Modal>
        </SelectMenu>
      </Container>
    </BorderBox>
  );
};

export default UnderlineNavbar;
