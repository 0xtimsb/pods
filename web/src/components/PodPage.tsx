import {
  generatePath,
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  Link,
} from "react-router-dom";
import {
  Box,
  Breadcrumb,
  Text,
  StyledOcticon,
  UnderlineNav,
  Flex,
} from "@primer/components";

import podOptions from "../constants/podOptions";

// Routes
import { POD, POD_PROJECT, POD_SETTINGS } from "../constants/routes";

// Pages
import { Pod, usePodQuery } from "../generated/graphql";
import Discussion from "../pages/pod/Discussion";
import Settings from "../pages/pod/Settings";
import Board from "./project/Board";
import Container from "./Container";

interface MatchParams {
  id: string;
}

const PodPage: React.FC<RouteComponentProps<MatchParams>> = ({
  match,
  location,
}) => {
  const id = parseInt(match.params.id);
  const { data, loading, error } = usePodQuery({
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;

  if (error || !data || !data.pod) return <p>Error occured</p>;

  return (
    <Box>
      <UnderlineNav bg="gray.0">
        <Container>
          <Breadcrumb>
            <Breadcrumb.Item as={Link} to="/">
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item selected>Pod Name</Breadcrumb.Item>
          </Breadcrumb>
          <Flex>
            {podOptions.map(({ name, route, icon }, index) => (
              <UnderlineNav.Link
                as={Link}
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
        </Container>
      </UnderlineNav>

      <Switch>
        <Route
          exact
          path={POD}
          render={() => <Discussion pod={data.pod as Pod} />}
        />
        <Route
          exact
          path={POD_PROJECT}
          render={() => <Board pod={data.pod as Pod} />}
        />
        <Route exact path={POD_SETTINGS} render={() => <Settings />} />
        <Redirect to={POD} />
      </Switch>
    </Box>
  );
};

export default PodPage;
