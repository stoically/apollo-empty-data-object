import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  gql,
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  useQuery,
} from "@apollo/client";

const client = new ApolloClient({
  link: createHttpLink({
    uri: "http://localhost:4000",
  }),
  cache: new InMemoryCache(),
});

function Component() {
  const [id, setId] = useState("1");

  const { data, loading, error } = useQuery(
    gql`
      query Books($id: ID) {
        books(id: $id) {
          title
        }
      }
    `,
    {
      variables: { id },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "network-only",
    }
  );
  console.log(data, loading, error);

  return <button onClick={() => setId("2")}>change id</button>;
}

const App = (
  <ApolloProvider client={client}>
    <Component></Component>
  </ApolloProvider>
);

ReactDOM.render(App, document.getElementById("app"));
