import { ApolloQueryResult } from "@apollo/client";
import { Redirect, Route, Switch } from "react-router-dom";

// Routes
import { FORGOT_PASSWORD, LOGIN, RESET_PASSWORD, SIGNUP } from "../routes";

// Graphql
import { Exact } from "../generated/graphql";

// Components
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";

const AuthLayout = () => {
  return (
    <Switch>
      <Route exact path={LOGIN} render={() => <LogIn />} />
      <Route exact path={SIGNUP} render={() => <SignUp />} />
      {/* <Route exact path={FORGOT_PASSWORD} component={<div>Peee</div>} />
      <Route exact path={RESET_PASSWORD} render={() => <ResetPassword refetch={refetch} />} /> */}
      <Redirect to={LOGIN} />
    </Switch>
  );
};

export default AuthLayout;
