import { gql, useApolloClient } from "@apollo/client";
import { Redirect, Route, Switch } from "react-router-dom";

// Routes
import { HOME, POD } from "../../constants/routes";

// Pages
import Home from "../../pages/user/Home";

import { MeQuery } from "../../generated/graphql";

import PodPage from "../PodPage";

const AppLayout: React.FC = () => {
  const client = useApolloClient();

  const data = client.readQuery<MeQuery>({
    query: gql`
      query Me {
        me {
          id
          username
          pods {
            id
            name
            joined
          }
        }
      }
    `,
  });

  return (
    <Switch>
      <Route
        exact
        path={HOME}
        render={() => <Home me={data!.me!} pods={data!.me!.pods} />}
      />
      <Route path={POD} render={(props) => <PodPage {...props} />} />
      <Redirect to={HOME} />
    </Switch>
  );
};

export default AppLayout;
