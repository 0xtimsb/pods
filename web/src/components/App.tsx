import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";

// Graphql
import { useMeQuery } from "../generated/graphql";

// Components
import Layout from "./Layout";
import AuthLayout from "./layout/AuthLayout";
import AppLayout from "./layout/AppLayout";
import Navbar from "./Navbar";

function App() {
  const { data, loading, error } = useMeQuery();

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error occured...</div>;

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        {data && data.me ? (
          <Route exact render={() => <AppLayout />} />
        ) : (
          <Route exact render={() => <AuthLayout />} />
        )}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
