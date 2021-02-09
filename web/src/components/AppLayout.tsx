import { Redirect, Route, Switch } from "react-router-dom";

// Routes
import { HOME } from "../routes";

// Components
import Home from "../pages/Home";

const AppLayout: React.FC = () => {
  return (
    <Switch>
      <Route exact path={HOME} render={() => <Home />} />
      {/* <Route exact path={POD} render={() => <SignUp />} />
      <Route exact path={POD_BOARD} render={() => <SignUp />} />
      <Route exact path={POD_SETTINGS} render={() => <SignUp />} /> */}
      <Redirect to={HOME} />
    </Switch>
  );
};

export default AppLayout;
