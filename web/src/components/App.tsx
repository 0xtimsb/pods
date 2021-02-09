import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";

// Graphql
import { useMeQuery } from "../generated/graphql";

// Components
import Layout from "./common/Layout";
import AuthLayout from "./AuthLayout";
import AppLayout from "./AppLayout";
import Navbar from "./common/Navbar";

function App() {
  const { data, loading, error } = useMeQuery();

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error occured...</div>;

  return (
    <BrowserRouter>
      <Switch>
        <Layout me={data?.me}>
          {data && data.me ? (
            <Route exact render={() => <AppLayout />} />
          ) : (
            <Route exact render={() => <AuthLayout />} />
          )}
        </Layout>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
