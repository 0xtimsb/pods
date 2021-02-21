import {
  Redirect,
  Route,
  Switch,
  useLocation,
  useParams,
} from "react-router-dom";

// Routes
import { HOME, POD, POD_PROJECT, POD_SETTINGS } from "../constants/routes";

// Pages
import { Pod, usePodQuery } from "../generated/graphql";
import Discussion from "../pages/pod/Discussion";
import Settings from "../pages/pod/Settings";
import Board from "./project/Board";

const PodPage: React.FC = () => {
  let { id } = useParams<{ id: string }>();
  const { data, loading, error } = usePodQuery({
    variables: {
      id: parseInt(id),
    },
  });

  if (loading) return <p>Loading...</p>;

  if (error || !data || !data.pod) return <p>Error occured</p>;

  return (
    <Switch>
      <Route exact path={POD} render={() => <Discussion />} />
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
