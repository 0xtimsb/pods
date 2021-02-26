import { Route, BrowserRouter, Switch } from "react-router-dom";

// Graphql
import { useMeQuery } from "../generated/graphql";

// Components
import AuthLayout from "./layout/AuthLayout";
import AppLayout from "./layout/AppLayout";
import Navbar from "./Navbar";
import { Box } from "@primer/components";

function App() {
  const { data, loading, error } = useMeQuery();

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error occured.....</div>;

  return (
    <BrowserRouter>
      <Navbar me={data?.me} />
      <Switch>
        {data && data.me ? (
          <Route exact render={() => <AppLayout me={data.me} />} />
        ) : (
          <Route exact render={() => <AuthLayout />} />
        )}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
