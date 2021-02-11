import { Redirect, Route, Switch } from "react-router-dom";

// Graphql
import { MeQuery } from "../generated/graphql";

// Routes
import { HOME, POD } from "../routes";

// Components
import Home from "../pages/Home";
import Overview from "../pages/pod/Overview";

interface AppLayoutProps {
  me: MeQuery["me"];
}

const AppLayout: React.FC<AppLayoutProps> = ({ me }) => {
  return (
    <Switch>
      <Route exact path={HOME} render={() => <Home me={me} />} />
      <Route exact path={POD} render={() => <Overview />} />
      {/* <Route exact path={POD_BOARD} render={() => <SignUp />} />
      <Route exact path={POD_SETTINGS} render={() => <SignUp />} />  */}
      <Redirect to={HOME} />
    </Switch>
  );
};

export default AppLayout;
