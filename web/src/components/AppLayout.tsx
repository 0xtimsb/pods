import { Redirect, Route, Switch } from "react-router-dom";

// Graphql
import { MeQuery } from "../generated/graphql";

// Routes
import { HOME, POD } from "../constants/routes";

// Components
import Home from "../pages/user/Home";
import Overview from "../pages/pod/Overview";

interface AppLayoutProps {}

const AppLayout: React.FC<AppLayoutProps> = () => {
  return (
    <Switch>
      <Route exact path={HOME} render={() => <Home />} />
      <Route exact path={POD} render={() => <Overview />} />
      {/* <Route exact path={POD_BOARD} render={() => <SignUp />} />
      <Route exact path={POD_SETTINGS} render={() => <SignUp />} />  */}
      <Redirect to={HOME} />
    </Switch>
  );
};

export default AppLayout;
