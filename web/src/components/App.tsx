import { Route, BrowserRouter, Switch } from "react-router-dom";

// Graphql
import { useMeQuery } from "../generated/graphql";

// Components
import Layout from "./common/Layout";
import AuthLayout from "./auth/AuthLayout";

function App() {
  const { data, loading, error, refetch } = useMeQuery();

  if (loading) return <Layout>Loading...</Layout>;

  if (error || !data) return <Layout>Error occured: {error}</Layout>;

  return (
    <BrowserRouter>
      <Switch>
        {data.me ? (
          <Route exact render={() => <div>Hiii your are here</div>} />
        ) : (
          <Route exact render={() => <AuthLayout refetch={refetch} />} />
        )}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
