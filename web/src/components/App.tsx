import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";

// Graphql
import { useMeQuery } from "../generated/graphql";

// Components
import Layout from "./common/Layout";
import AuthLayout from "./auth/AuthLayout";
import { HOME } from "../routes";

function App() {
  const { data, loading, error } = useMeQuery();

  if (loading) return <Layout>Loading...</Layout>;

  if (error || !data) return <Layout>Error occured: {error}</Layout>;

  return (
    <BrowserRouter>
      <Switch>
        {data.me ? (
          <Route exact render={() => <div>Hiii your are here</div>} />
        ) : (
          <Route exact render={() => <AuthLayout />} />
        )}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
