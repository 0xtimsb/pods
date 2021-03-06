import {
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  Link,
  generatePath,
} from "react-router-dom";
import { Box, Breadcrumb, Flex, Text } from "@primer/components";

// Routes
import { HOME, POD, POD_PROJECT, POD_SETTINGS } from "../constants/routes";

// Graphql
import { MeQuery, Pod, usePodQuery } from "../generated/graphql";

// Pages
import Loading from "./Loading";
import Discussion from "../pages/pod/Discussion";
import Settings from "../pages/pod/Settings";
import Board from "./project/Board";
import UnderlineNavbar from "./UnderlineNavbar";

// Constants
import { podNavItems } from "../constants/navItems";
import Container from "./Container";
import Layout from "./Layout";

interface MatchParams {
  id: string;
}

interface PodPageInterface extends RouteComponentProps<MatchParams> {
  me: NonNullable<MeQuery["me"]>;
}

const PodPage: React.FC<PodPageInterface> = ({ match, me }) => {
  const id = parseInt(match.params.id);
  const { data, loading, error } = usePodQuery({
    variables: { podId: id },
  });

  if (loading) return <Loading />;

  if (error || !data || !data.pod) return <p>Error occured</p>;

  const pod = data.pod;

  return (
    <Layout>
      <Switch>
        <Route
          exact
          path={POD}
          render={(props) => <Discussion me={me} pod={pod} {...props} />}
        />
        <Route
          exact
          path={POD_PROJECT}
          render={(props) => <Board me={me} pod={pod} {...props} />}
        />
        <Redirect to={POD} />
      </Switch>
    </Layout>
  );
};

export default PodPage;
