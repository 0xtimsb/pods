import {
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";

// Routes
import { HOME, POD, POD_PROJECT, POD_SETTINGS } from "../constants/routes";

// Pages
import { Pod, usePodQuery } from "../generated/graphql";
import Discussion from "../pages/pod/Discussion";
import Settings from "../pages/pod/Settings";
import Board from "./project/Board";

interface MatchParams {
  id: string;
}

const PodPage: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => {
  const { data, loading, error } = usePodQuery({
    variables: {
      id: parseInt(match.params.id),
    },
  });

  if (loading) return <p>Loading...</p>;

  if (error || !data || !data.pod) return <p>Error occured</p>;

  return (
    <Switch>
      <Route exact render={() => <Discussion />} />
      <Route
        exact
        path={POD_PROJECT}
        render={() => <Board pod={data.pod as Pod} />}
      />
      <Route exact path={POD_SETTINGS} render={() => <Settings />} />
      <Redirect to={POD} />
    </Switch>
  );
};

export default PodPage;
