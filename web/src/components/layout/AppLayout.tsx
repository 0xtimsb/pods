import { gql, useApolloClient } from "@apollo/client";
import { Redirect, Route, Switch } from "react-router-dom";

// Routes
import { HOME } from "../../constants/routes";

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
      <Route exact path={HOME} render={() => <Home pods={data!.me!.pods} />} />
      <Route exact component={PodPage} />
      <Redirect to={HOME} />
    </Switch>
  );
};

export default AppLayout;
