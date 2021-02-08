import { ApolloProvider } from "@apollo/client";

// Apollo client
import client from "../lib/apolloClient";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="h-screen bg-white">
        <div className="sticky top-0 h-16 flex justify-center border-b border-gray-200">
          <div className="w-full max-w-6xl px-16 flex items-center">
            <div className="text-gray-900 text-sm cursor-pointer">Login</div>
            <div className="bg-gray-900 text-white px-2.5 py-2 rounded border border-gray-900 text-sm cursor-pointer hover:bg-white hover:text-black">
              Sign Up
            </div>
          </div>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
