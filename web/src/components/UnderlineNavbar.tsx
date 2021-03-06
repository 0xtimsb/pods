import { generatePath, NavLink, useLocation, Link } from "react-router-dom";
import { IconProps } from "@primer/octicons-react";
import {
  BorderBox,
  Flex,
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
import { HOME, SETTINGS } from "../constants/routes";

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
    >
      <Container justifyContent="space-between" alignItems="center">
        <Flex>
          <UnderlineNav aria-label="Main">
            {navItems.map(({ name, route, icon }, index) => (
              <UnderlineNav.Link
                as={(props) => <NavLink exact {...props} />}
                key={index}
                to={generatePath(route, { id })}
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
          </UnderlineNav>
        </Flex>
        <SelectMenu>
          <summary>
            <Flex alignItems="center" style={{ cursor: "pointer" }}>
              <img
                src={Profile}
                alt={me.username}
                width={24}
                height={24}
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
              <Link to={HOME}>
                <SelectMenu.Item>Home</SelectMenu.Item>
              </Link>
              <Link to={SETTINGS}>
                <SelectMenu.Item href="#">Settings</SelectMenu.Item>
              </Link>
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
