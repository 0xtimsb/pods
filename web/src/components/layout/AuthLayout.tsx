import { Redirect, Route, Switch } from "react-router-dom";

// Routes
import { LOGIN, SIGNUP } from "../../constants/routes";

// Components
import LogIn from "../../pages/LogIn";
import SignUp from "../../pages/SignUp";

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
