import { ApolloProvider } from "@apollo/client";

// Apollo client
import client from "../lib/apolloClient";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="h-screen bg-white">
        <div className="h-16 flex justify-center border-b border-gray-200">
          <div className="w-full max-w-6xl px-16 flex items-center">
            <div>Button</div>
          </div>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
