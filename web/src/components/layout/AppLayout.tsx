import { Redirect, Route, Switch } from "react-router-dom";

// Routes
import { HOME, POD, POD_PROJECT, POD_SETTINGS } from "../../constants/routes";

// Pages
import Home from "../../pages/user/Home";
import Project from "../../pages/pod/Project";
import Discussion from "../../pages/pod/Discussion";
import Settings from "../../pages/pod/Settings";

const AppLayout: React.FC = () => {
  return (
    <Switch>
      <Route exact path={HOME} component={Home} />

      <Route exact path={POD} component={Discussion} />
      <Route exact path={POD_PROJECT} component={Project} />
      <Route exact path={POD_SETTINGS} component={Settings} />
      <Redirect to={HOME} />
    </Switch>
  );
};

export default AppLayout;
