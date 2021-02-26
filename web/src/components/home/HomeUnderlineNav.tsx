import { Flex, StyledOcticon, Text, UnderlineNav } from "@primer/components";
import { Link as RouterLink, useLocation } from "react-router-dom";

import mainOptions from "../../constants/mainOptions";
import Container from "../Container";

const HomeUnderlineNav: React.FC = () => {
  const location = useLocation();

  return (
    <UnderlineNav bg="gray.0">
      <Container>
        <Flex>
          {mainOptions.map(({ name, route, icon }, index) => (
            <UnderlineNav.Link
              as={RouterLink}
              to={route}
              key={index}
              selected={location.pathname === route}
            >
              <StyledOcticon icon={icon} mr={2} />
              <Text
                fontWeight={location.pathname === route ? "bold" : "normal"}
              >
                {name}
              </Text>
            </UnderlineNav.Link>
          ))}
        </Flex>
      </Container>
    </UnderlineNav>
  );
};

export default HomeUnderlineNav;
