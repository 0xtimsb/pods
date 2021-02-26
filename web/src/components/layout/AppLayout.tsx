import { gql, useApolloClient } from "@apollo/client";
import { Redirect, Route, Switch } from "react-router-dom";

// Routes
import { HOME, POD, SETTINGS } from "../../constants/routes";

// Pages
import Home from "../../pages/Home";

// Generated
import { MeQuery } from "../../generated/graphql";

import PodPage from "../PodPage";

interface AppLayoutProps {
  me: NonNullable<MeQuery["me"]>;
}

const AppLayout: React.FC<AppLayoutProps> = ({ me }) => {
  return (
    <Switch>
      <Route
        exact
        path={HOME}
        render={(props) => <Home me={me} {...props} />}
      />
      <Route
        exact
        path={SETTINGS}
        render={(props) => <Home me={me} {...props} />}
      />
      <Route path={POD} render={(props) => <PodPage {...props} />} />
      <Redirect to={HOME} />
    </Switch>
  );
};

export default AppLayout;
