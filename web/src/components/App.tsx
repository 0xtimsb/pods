import { Route, BrowserRouter, Switch } from "react-router-dom";

// Graphql
import { useMeQuery } from "../generated/graphql";

// Components
import AuthLayout from "./layout/AuthLayout";
import AppLayout from "./layout/AppLayout";

function App() {
  const { data, loading, error } = useMeQuery();

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error occured.....</div>;

  const me = data?.me;

  return (
    <BrowserRouter>
      <Switch>
        {me ? (
          <Route exact render={() => <AppLayout me={me} />} />
        ) : (
          <Route exact render={() => <AuthLayout />} />
        )}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
