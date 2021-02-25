import { Redirect, Route, Switch } from "react-router-dom";

// Routes
import { LOGIN, SIGNUP } from "../../constants/routes";

// Components
import LogIn from "../../pages/auth/LogIn";
import SignUp from "../../pages/auth/SignUp";

const AuthLayout = () => {
  return (
    <Switch>
      <Route exact path={LOGIN} render={() => <LogIn />} />
      <Route exact path={SIGNUP} render={() => <SignUp />} />
      <Redirect to={LOGIN} />
    </Switch>
  );
};

export default AuthLayout;
