import {
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  Link,
  generatePath,
} from "react-router-dom";
import { Box, Breadcrumb, Text } from "@primer/components";

// Routes
import { HOME, POD, POD_PROJECT, POD_SETTINGS } from "../constants/routes";

// Graphql
import { Pod, usePodQuery } from "../generated/graphql";

// Pages
import Loading from "./Loading";
import Discussion from "../pages/pod/Discussion";
import Settings from "../pages/pod/Settings";
import Board from "./project/Board";
import UnderlineNavbar from "./UnderlineNavbar";

// Constants
import { podNavItems } from "../constants/navItems";
import Container from "./Container";

interface MatchParams {
  id: string;
}

const PodPage: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => {
  const id = parseInt(match.params.id);
  const { data, loading, error } = usePodQuery({
    variables: { id },
  });

  if (loading) return <Loading />;

  if (error || !data || !data.pod) return <p>Error occured</p>;

  const pod = data.pod;

  return (
    <Box>
      <Container mb={2} mt={3}>
        <Breadcrumb>
          <Breadcrumb.Item as={Link} to={HOME}>
            <Text fontSize={2} fontWeight="bold">
              Home
            </Text>
          </Breadcrumb.Item>
          <Breadcrumb.Item as={Link} to={generatePath(POD, { id: pod.id })}>
            <Text fontSize={2} fontWeight="bold">
              {data.pod.name}
            </Text>
          </Breadcrumb.Item>
        </Breadcrumb>
      </Container>
      <UnderlineNavbar navItems={podNavItems} id={pod.id} />
      <Switch>
        <Route
          exact
          path={POD}
          render={() => <Discussion pod={pod as Pod} />}
        />
        <Route
          exact
          path={POD_PROJECT}
          render={() => <Board pod={pod as Pod} />}
        />
        <Route exact path={POD_SETTINGS} render={() => <Settings />} />
        <Redirect to={POD} />
      </Switch>
    </Box>
  );
};

export default PodPage;
