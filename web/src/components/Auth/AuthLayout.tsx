import { ApolloQueryResult } from "@apollo/client";
import { Redirect, Route, Switch } from "react-router-dom";

// Routes
import { FORGOT_PASSWORD, LOGIN, RESET_PASSWORD, SIGNUP } from "../../routes";

// Graphql
import { Exact } from "../../generated/graphql";

// Components
import LogIn from "../../pages/auth/LogIn";
import SignUp from "../../pages/auth/SignUp";

const AuthLayout = ({ refetch }: any) => {
  return (
    <Switch>
      <Route exact path={LOGIN} render={() => <LogIn refetch={refetch} />} />
      <Route exact path={SIGNUP} render={() => <SignUp refetch={refetch} />} />
      {/* <Route exact path={FORGOT_PASSWORD} component={<div>Peee</div>} />
      <Route exact path={RESET_PASSWORD} render={() => <ResetPassword refetch={refetch} />} /> */}
      <Redirect to={LOGIN} />
    </Switch>
  );
};

export default AuthLayout;
