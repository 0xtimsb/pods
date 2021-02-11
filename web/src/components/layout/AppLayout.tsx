import { Redirect, Route, Switch } from "react-router-dom";

// Routes
import {
  HOME,
  POD,
  POD_BOARD,
  POD_DISCUSSION,
  POD_SETTINGS,
} from "../../constants/routes";

// Pages
import Home from "../../pages/user/Home";
import Board from "../../pages/pod/Board";
import Discussion from "../../pages/pod/Discussion";
import Overview from "../../pages/pod/Overview";
import Settings from "../../pages/pod/Settings";

const AppLayout: React.FC = () => {
  return (
    <Switch>
      <Route exact path={HOME} component={Home} />
      <Route exact path={POD} component={Overview} />
      <Route exact path={POD_DISCUSSION} component={Discussion} />
      <Route exact path={POD_BOARD} component={Board} />
      <Route exact path={POD_SETTINGS} component={Settings} />
      <Redirect to={HOME} />
    </Switch>
  );
};

export default AppLayout;
